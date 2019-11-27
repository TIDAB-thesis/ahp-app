const { create, all } = require('mathjs');
const numeric = require('numeric');
const math = create(all);
math.import(numeric, { wrap: true, silent: true })

const dataModels = require('./DataModels.js')
const assessments = require('./Assessments')
const matrixMath = require('./MatrixMath.js')
let MatrixMath = matrixMath.MatrixMath

function sortResult(resultMatrix) {
  const combinedMatrix = _combineResultWithModel(resultMatrix)
  return combinedMatrix.sort(_compare)
}

function _combineResultWithModel(resultMatrix) {
  const sortedResult = []
  for(key in resultMatrix) {
    sortedResult[key] = {"name": dataModels[key], "result": resultMatrix[key]}
  }
  return sortedResult
}

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

function getFractionizedMatrix(matrix) {
  const fractionizedMatrix = []
  for(keyLvl1 in matrix) {
    const fractionizedRow = math.fraction(matrix[keyLvl1])
    fractionizedMatrix.splice(keyLvl1, 0, fractionizedRow)
  }
  return new MatrixMath(math.matrix(fractionizedMatrix))
}

function getAssessmentAsNormalized() {
  const normalizedMatrix = []
  for(let assessment in assessments) {
    let obj = math.matrix(assessments[assessment])
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
  getAssessmentAsNormalized
}