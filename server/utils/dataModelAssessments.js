const math = require('mathjs');
module.exports = {
  "manyToMany": [
    [1, 1, math.fraction(1,5), 3, math.fraction(1,7)],
    [1, 1, math.fraction(1,5), 3, math.fraction(1,7)],
    [5, 5, 1, 7, math.fraction(1,4)],
    [math.fraction(1,3), math.fraction(1,3), math.fraction(1,7), 1, math.fraction(1,9)],
    [7, 7, 4, 9, 1]
  ],
  "oneToMany": [
    [1, 7, 3, 9, 1],
    [math.fraction(1,7), 1, math.fraction(1,3), 6, math.fraction(1,7)],
    [math.fraction(1,3), 3, 1, 8, math.fraction(1,3)],
    [math.fraction(1,9), math.fraction(1,6), math.fraction(1,8), 1, math.fraction(1,9)],
    [1, 7, 3, 9, 1]
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
    [1, 5, 5, 1, 9],
    [math.fraction(1,5), 1, 1, math.fraction(1,5), 5],
    [math.fraction(1,5), 1, 1, math.fraction(1,5), 5],
    [1, 5, 5, 1, 9],
    [math.fraction(1,9), math.fraction(1,5), math.fraction(1,5), math.fraction(1,9), 1]
  ],
  "scalability": [
    [1, 1, 9, 1, 1],
    [1, 1, 9, 1, 1],
    [math.fraction(1,9), math.fraction(1,9), 1, math.fraction(1,9), math.fraction(1,9)],
    [1, 1, 9, 1, 1],
    [1, 1, 9, 1, 1],
  ],
  "transaction": [
    [1, 9, 1, 1, 1],
    [1, 9, 1, 1, 1],
    [math.fraction(1,9), 1, math.fraction(1,9), math.fraction(1,9), math.fraction(1,9)],
    [1, 9, 1, 1, 1],
    [1, 9, 1, 1, 1]
  ]
}