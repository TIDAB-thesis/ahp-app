const math = require('mathjs');
module.exports = {
  "manyToMany": [
    [1, 1, math.fraction(1,5), 1, math.fraction(1,9)],
    [1, 1, math.fraction(1,5), 1, math.fraction(1,9)],
    [5, 5, 1, 5, math.fraction(1,4)],
    [1, 1, math.fraction(1,5), 1, math.fraction(1,9)],
    [9, 9, 4, 9, 1]
  ],
  "oneToMany": [
    [1, 9, 3, 7, 1],
    [math.fraction(1,9), 1, math.fraction(1,5), math.fraction(1,3), math.fraction(1,9)],
    [math.fraction(1,3), 5, 1, 5, math.fraction(1,3)],
    [math.fraction(1,7), 3, math.fraction(1,5), 1, math.fraction(1,7)],
    [1, 9, 3, 7, 1]
  ],
  "flexibility": [
    [1, 1, 7, 1, 7],
    [1, 1, 7, 1, 7],
    [math.fraction(1,7), math.fraction(1,7), 1, math.fraction(1,7), math.fraction(1,7)],
    [1, 1, 7, 1, 7],
    [1, 1, 7, 1, 7],
  ],
  "read": [
    [1, 5, 1, 1, 5],
    [math.fraction(1,5), 1, math.fraction(1,5), math.fraction(1,5), 1],
    [1, 5, 1, 1, 5],
    [1, 5, 1, 1, 1],
    [math.fraction(1,5), 1, math.fraction(1,5), 1, 1]
  ],
  "writeUpdate": [
    [1, 1, 5, 1, 9],
    [1, 1, 5, 1, 9],
    [math.fraction(1,5), math.fraction(1,5), 1, math.fraction(1,5), 5],
    [1, 1, 5, 1, 9],
    [math.fraction(1,9), math.fraction(1,9), math.fraction(1,5), math.fraction(1,9), 1]
  ],
  "scalability": [
    [1, 1, 9, 1, 2],
    [1, 1, 9, 1, 2],
    [math.fraction(1,9), math.fraction(1,9), 1, math.fraction(1,9), math.fraction(1,7)],
    [1, 1, 9, 1, 2],
    [math.fraction(1,2), math.fraction(1,2), 7, math.fraction(1,2), 1],
  ],
  "transaction": [
    [1, 9, 1, 1, 1],
    [1, 9, 1, 1, 1],
    [math.fraction(1,9), 1, math.fraction(1,9), math.fraction(1,9), math.fraction(1,9)],
    [1, 9, 1, 1, 1],
    [1, 9, 1, 1, 1]
  ]
}