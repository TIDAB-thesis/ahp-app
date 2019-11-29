const { create, all } = require('mathjs');
const numeric = require('numeric');
const math = create(all);
math.import(numeric, { wrap: true, silent: true })
const matrixMath = require('./matrixMath.js')
let MatrixMath = matrixMath.MatrixMath
const CRException = require('../exception/crException')
const matrixUtils = require('./matrixUtils')

/**
 * Calculates which data model fits the user preference the best
 * @param {Object} userPreference contains the user preferences 
 * @param {Boolean} force if the user wants to consider the cr index or not
 * @return an sorted object with which data model fits the user preference the best
 */
function getAssessment(userPreference, force) {
  level1 = matrixUtils.getFractionizedMatrix(userPreference.level1)
  level2Data = matrixUtils.getFractionizedMatrix(userPreference.level2Data)
  level2Perf = matrixUtils.getFractionizedMatrix(userPreference.level2Performance)

  if(!force) {
    _calculateCR(level1, level2Data, level2Perf)
  }

  const weightLvl1 = new MatrixMath(math.matrix(level1.getNormalizedEigenvector()))
  const weightLvl2Data = new MatrixMath(math.matrix(level2Data.getNormalizedEigenvector()))
  const weightLvl2Perf = new MatrixMath(math.matrix(level2Perf.getNormalizedEigenvector()))

  const transposedAssessment = matrixUtils.getDataModelWeightMatrix()

  const weights = _flattenUserChoice(weightLvl1, weightLvl2Data, weightLvl2Perf)

  const result = math.multiply(transposedAssessment, weights)
  const sortedResult = matrixUtils.sortResult(result._data)
  return sortedResult
}

/**
 * Fetches the CR index for each user preference matrix. Throws exception if the CR index is larger than 10%
 * @param {Matrix} level1 user preference for criteria on level 1 
 * @param {Matrix} level2Data user preference for criteria on level 2 data model
 * @param {Matrix} level2Perf user preference for criteria on level 2 performance
 */
function _calculateCR(level1, level2Data, level2Perf) {
  level1CR = level1.getCR()
  level2DataCR = level2Data.getCR()
  level2PerfCR = level2Perf.getCR()

  if(level1CR > 0.1) {
    throw new CRException("CR out of control", level1CR, "Level 1")
  }

  if(level2DataCR > 0.1) {
    throw new CRException("CR out of control", level2DataCR, "Level 2 Data model")
  }
  
  if(level2PerfCR > 0.1) {
    throw new CRException("CR out of control", level2PerfCR, "Level 2 Performance")
  }
}

/**
 * Flattens the users preferences into one large matrix
 * @param {Matrix} lvl1Weight user preference for criteria on level 1
 * @param {Matrix} lvl2WeightData user preference for criteria on level 2 data model
 * @param {Matrix} lvl2WeightPerf user preference for criteria on level 2 performance 
 */
function _flattenUserChoice(lvl1Weight, lvl2WeightData, lvl2WeightPerf) {
  const newUserMatrix = []
  const lvl1Data = lvl1Weight.matrix._data[0]
  const lvl1Perf = lvl1Weight.matrix._data[1]
  
  const multipliedData = math.multiply(lvl2WeightData.matrix, lvl1Data)
  const multipliedPerf = math.multiply(lvl2WeightPerf.matrix, lvl1Perf)

  for(data of multipliedData._data){
    newUserMatrix.push(data)
  }
  for(performance of multipliedPerf._data){
    newUserMatrix.push(performance)
  }
  for(let i = 2; i < lvl1Weight.matrix._size; i++) {
    newUserMatrix.push(lvl1Weight.matrix._data[i])
  }
  return math.matrix(newUserMatrix)
} 

module.exports = { 
  getAssessment,
  _flattenUserChoice,
}