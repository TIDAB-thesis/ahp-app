const axios = require('axios')

class AssessmentService {
  static getCriteria() {
    return axios.get('/criteria')
  }

  static getAssessment(assessment) {
    return axios.get('/getAssessment', assessment)
  }
}

module.exports = { AssessmentService }