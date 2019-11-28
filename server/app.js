const coolMath = require('./mathUtils/CoolMath')
const CRException = require('./exception/CRException')
const data = require('./utils/data.json')

const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(require('cors')())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

app.get('/getAssessment', (req, res) => {
  const userPreference = req.body.userPreference
  const force = req.body.force

  try {
    const result = coolMath.getAssessment(userPreference, force)
    console.log(result)
    res.send(result)
  } catch (err) {
    if (err instanceof CRException) {
      // Work in progress at least
      //TODO: Fix so it send the error to client
      console.log(err.name)
    }
  }
})

app.get('/criteria', (req, res) => {
  res.json(data)
})

app.post('/getAssessment', (req, res) => {

  const userPreference = req.body.userPreference
  const force = req.body.force

  try {
    const result = coolMath.getAssessment(userPreference, force)
    console.log(result)
    res.send(result)
  } catch (err) {
    if (err instanceof CRException) {
      // Work in progress at least
      //TODO: Fix so it send the error to client
      console.log(err.name)
    }
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

