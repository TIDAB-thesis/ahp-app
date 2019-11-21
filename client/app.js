const math = require('mathjs');
const matrixUtils = require('../server/utils/MatrixUtils.js')
let MatrixUtils = matrixUtils.MatrixUtils

const m1 = math.matrix([
  [1,3,7,math.fraction(1,3),7],
  [math.fraction(1,3), 1, 5, math.fraction(1,5), 5],
  [math.fraction(1,7), math.fraction(1,5), 1, math.fraction(1,7), 1],
  [3, 5, 7, 1, 9],
  [math.fraction(1,7), math.fraction(1,5), 1, math.fraction(1,9), 1]
])

const matrix1 = new MatrixUtils(m1)

const eigenvector = matrix1.getEigenvector()

console.log(eigenvector)

const cr = matrix1.getCR()
console.log(cr)