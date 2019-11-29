module.exports = class InputException extends Error {
  constructor(message, missingInput) {
    super(message)
    this.name = 'InputException'
    this.missingInput = missingInput
  }
}