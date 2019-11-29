const coolMath = require('./mathUtils/coolMath')
const CRException = require('./exception/crException')
const InputException = require('./exception/inputException')
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

app.get('/criteria', (req, res) => {
  res.json(data)
})

app.post('/getAssessment', (req, res) => {

  const userPreference = req.body.userPreference
  const force = req.body.force

  try {
    checkValidity(userPreference.level1, 'Level 1')
    checkValidity(userPreference.level2Data, 'Level 2 Data model')
    checkValidity(userPreference.level2Performance, 'Level 2 Performance')
    checkValidity(force)

    const finalAssessment = coolMath.getAssessment(userPreference, force)

    res.send(finalAssessment)
  } catch (err) {
    if (err instanceof CRException) {
      crExceptionMessage = {
        "level": err.offendee,
        "crIndex": err.crIndex
      }
      
      res.status(400).json(crExceptionMessage)
    }
    if(err instanceof InputException) {
      inputMissingException = {
        "missingInput": err.missingInput
      }

      res.status(400).json(inputMissingException)
    }
    res.status(500)
  }
})

function checkValidity(input, inputName) {
  if (input === undefined) {
    throw new InputException('Missing input', inputName)
  }
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

