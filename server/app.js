const coolMath = require('./utils/CoolMath')
const CRException = require('./exception/CRException')

const userPreference = {
  "level1": [
    ['1', '1/4', '5'],
    ['4', '1', '9'],
    ['1/5', '1/9', '1']
  ],
  "level2Data": [
    ['1', '1/9', '1/3'],
    ['9', '1', '5'],
    ['3', '1/5', '1']
  ],
  "level2Performance": [
    ['1', '7', '3'],
    ['1/7', '1', '1/5'],
    ['1/3', '5', '1']
  ]
}

const force = false

try {
  const result = coolMath.getAssessment(userPreference, force)
  console.log(result)
} catch (err) {
  if (err instanceof CRException) {
    // Work in progress at least
    console.log(err.name)
  }
}