module.exports = class CRException extends Error {
  constructor(message, crIndex, offendee) {
    super(message)
    this.name = "CRException"
    this.crIndex = crIndex
    this.offendee = offendee
  }
}