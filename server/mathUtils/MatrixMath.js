const { create, all } = require('mathjs');
const numeric = require('numeric');
const math = create(all);
math.import(numeric, { wrap: true, silent: true })

const RI = [0.5245, 0.8815, 1.1086, 1.2479, 1.3417, 1.4056, 1.4499]

class MatrixMath {
  constructor(matrix) {
    this.matrix = matrix
    this.dim = matrix._size[0]
    this.RI = RI[this.dim - 3]
  }

  /**
   * Calculates the eigenvector for a matrix
   * @return the normalized eigenvector
   */
  getNormalizedEigenvector() {
    this.maxEigenvalue = this._getEigenvalue()
    this.eigenvectors = math.evaluate(`eig(${this.matrix})`).E.x

    this.eigenvector = []
    this.sum = 0

    for(let i in this.eigenvectors) {
      this.eigenvector[i] = this.eigenvectors[i][this.maxEigenvalue.index] 
      this.sum += this.eigenvector[i]
    }

    for(let i in this.eigenvector) {
      this.eigenvector[i] = this.eigenvector[i] / this.sum
    }
    return this.eigenvector
  }

  /**
   * Calculates the CR index of a given matrix
   * @return the CR index
   */
  getCR() {
    this.CI = (this._getEigenvalue().maxEigenvalue - this.dim) / (this.dim - 1)
    this.CR = this.CI/this.RI

    return this.CR
  }

  /**
   * Calculates the eigenvalue of a matrix
   * @return an object with the maximum eigenvalue and which index the maximum eigenvalue is at
   */
  _getEigenvalue() {
    this.eigValueArray = math.evaluate(`eig(${this.matrix})`).lambda.x
    this.maxEigValue = Math.max(...this.eigValueArray)
    this.indexOfEig = this.eigValueArray.indexOf(this.maxEigValue)

    return {"maxEigenvalue": this.maxEigValue, "index": this.indexOfEig}
  }
}

module.exports = { MatrixMath }