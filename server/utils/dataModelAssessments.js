const math = require('mathjs');
module.exports = {
  "manyToMany": [
    [1, 1, math.fraction(1,5), 3, math.fraction(1,7)],
    [1, 1, math.fraction(1,5), 3, math.fraction(1,7)],
    [5, 5, 1, 7, math.fraction(1,5)],
    [math.fraction(1,3), math.fraction(1,3), math.fraction(1,7), 1, math.fraction(1,9)],
    [7, 7, 5, 9, 1]
  ],
  "oneToMany": [
    [1, 5, 6, 9, 1],
    [math.fraction(1,5), 1, 3, 7, math.fraction(1,2)],
    [math.fraction(1,6), math.fraction(1,3), 1, 7, math.fraction(1,3)],
    [math.fraction(1,9), math.fraction(1,7), math.fraction(1,7), 1, math.fraction(1,9)],
    [1, 2, 3, 9, 1]
  ],
  "flexibility": [
    [1, 3, 7, math.fraction(1,2), 3],
    [math.fraction(1,3), 1, 5, math.fraction(1,4), 1],
    [math.fraction(1,7), math.fraction(1,5), 1, math.fraction(1,9), math.fraction(1,5)],
    [2, 4, 9, 1, 4],
    [math.fraction(1,3), 1, 5, math.fraction(1,4), 1],
  ],
  "read": [
    [1, 5, 1, 1, 3],
    [math.fraction(1,5), 1, math.fraction(1,6), math.fraction(1,6), math.fraction(1,4)],
    [1, 6, 1, 1, 2],
    [1, 6, 1, 1, 3],
    [math.fraction(1,3), 4, math.fraction(1,2), math.fraction(1,3), 1]
  ],
  "writeUpdate": [
    [1, 4, 4, 1, 5],
    [math.fraction(1,4), 1, 1, math.fraction(1,4), 2],
    [math.fraction(1,4), 1, 1, math.fraction(1,4), 2],
    [1, 4, 4, 1, 7],
    [math.fraction(1,5), math.fraction(1,2), math.fraction(1,2), math.fraction(1,7), 1]
  ],
  "scalability": [
    [1, 1, 7, 1, 1],
    [1, 1, 7, 1, 1],
    [math.fraction(1,7), math.fraction(1,7), 1, math.fraction(1,7), math.fraction(1,7)],
    [1, 1, 7, 1, 1],
    [1, 1, 7, 1, 1],
  ],
  "transaction": [
    [1, 7, math.fraction(1,5), 1, math.fraction(1,5)],
    [math.fraction(1,7), 1, math.fraction(1,9), math.fraction(1,7), math.fraction(1,9)],
    [5, 9, 1, 5, 1],
    [1, 7, math.fraction(1,5), 1, math.fraction(1,3)],
    [5, 9, 1, 3, 1]
  ]
}