import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
})

class AssessmentService {
  static getCriteria() {
    return instance.get('/criteria')
  }

  static getAssessment(assessment) {
    return instance.post('/getAssessment', assessment)
  }
}

export default AssessmentService