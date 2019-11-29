const { create, all } = require('mathjs');
const numeric = require('numeric');
const math = create(all);
math.import(numeric, { wrap: true, silent: true })

const dataModels = require('../utils/dataModels.js')
const dataModelAssessments = require('../utils/dataModelAssessments')
const matrixMath = require('./matrixMath.js')
let MatrixMath = matrixMath.MatrixMath

/**
 * Combines the matrix first with its data model and then sorts it
 * @param {Matrix} resultMatrix 
 * @return the sorted result
 */
function sortResult(resultMatrix) {
  const combinedMatrix = _combineResultWithModel(resultMatrix)
  return combinedMatrix.sort(_compare)
}

/**
 * Combines the result of the assessment with the data models
 * @param {Matrix} resultMatrix the result of the assessment
 * @return An array containing object with the data model name and the result
 */
function _combineResultWithModel(resultMatrix) {
  const sortedResult = []
  for(key in resultMatrix) {
    sortedResult[key] = {"name": dataModels[key], "result": resultMatrix[key]}
  }
  return sortedResult
}

/**
 * Compares two values and returns which result is the largest
 * @param {Number} a 
 * @param {Number} b 
 */
function _compare(a, b) {
  const resultA = a.result
  const resultB = b.result
  if (resultA > resultB) {
    return -1
  }
  if (resultA < resultB) {
    return 1
  }
  return 0
}

/**
 * Returns a new matrix where the values are changed from string to fractions
 * @param {Matrix} matrix The raw matrix with values as strings
 */
function getFractionizedMatrix(matrix) {
  const fractionizedMatrix = []
  for(keyLvl1 in matrix) {
    const fractionizedRow = math.fraction(matrix[keyLvl1])
    fractionizedMatrix.splice(keyLvl1, 0, fractionizedRow)
  }
  return new MatrixMath(math.matrix(fractionizedMatrix))
}

/**
 * Returns the data model assessments as one normalized and transposed matrix.
 * @return the transposed normalized matrix
 */
function getDataModelWeightMatrix() {
  const normalizedMatrix = []
  for(let dataModelAssessment in dataModelAssessments) {
    let obj = math.matrix(dataModelAssessments[dataModelAssessment])
    const matrix = new MatrixMath(obj)
    const normalizedVector = matrix.getNormalizedEigenvector()
    normalizedMatrix.push(normalizedVector)
  }
  const normMatrix = math.matrix(normalizedMatrix)
  const transposedNorm = math.transpose(normMatrix)
  return transposedNorm
}

module.exports = {
  sortResult,
  _combineResultWithModel,
  _compare,
  getFractionizedMatrix,
  getDataModelWeightMatrix
}