const dummyData = [
  {
    name: 'Data Model',
    description: 'What structural characteristics that the data model have.',
    subcriteria: [
      {
        name: 'Many-to-many',
        description: 'How well many-to-many relationships (including entities with properties) are modelled.',
      },
      {
        name: 'One-to-many',
        description: 'How well one-to-many relationships (including entities with properties) are modelled.',
      },
      {
        name: 'Flexibility',
        description: 'If you need your data model to support schema on read flexilibity.',
      },
    ]
  },
  {
    name: 'Performance',
    description: 'How fast the database is and how much load it can take.',
    subcriteria: [
      {
        name: 'Read',
        description: 'How fast the data models reads data.',
      },
      {
        name: 'Write/Update',
        description: 'How fast the data models writes and updates data.',
      },
      {
        name: 'Scalability',
        description: 'How well the data model can scale up to support more intensive loads.',
      },
    ]
  },
  {
    name: 'Transactions',
    description: 'To what extent the data model can perform transactions, and how well those transactions perform.'
  },
]

// const exampleJSON = {
//   "userPreference": {
// 		"level1": [
// 				["1", "1/4", "5"],
// 				["4", "1", "9"],
// 				["1/5", "1/9", "1"]
// 		],
// 		"level2Data": [
// 			["1", "1/9", "1/3"],
// 			["9", "1", "5"],
// 			["3", "1/5", "1"]
// 		],
// 		"level2Performance": [
// 			["1", "7", "3"],
// 			["1/7", "1", "1/5"],
// 			["1/3", "5", "1"]
// 		]
// 	},
// 	"force": false
// }

export default class Asesser {

  constructor(criteria) {
    this.criteria = criteria || dummyData
    if (this.criteria.length < 2) {
      throw new Error('Each level of criteria must be at least of length 2')
    }
    this.criteriaList = this._getComparisonList(new Array(), this.criteria)
    this.assessment = {
      level1: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      level2Data: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      level2Performance: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    }
    for (const ass in this.assessment) {
      for (let arr in ass) {
        this.assessment[arr] = new Array(3).fill(0)
      }
    }
    this.index = 0
    this.assessed = true
  }

  _getComparisonList(arr, criteria) {
    for (let i = 0; i < criteria.length; i++) {
      for (let j = i + 1; j < criteria.length; j++) {
        arr.push({ mainCriteria: criteria[i], secondaryCriteria: criteria[j] });
      }
    }
    for (const crit of criteria) {
      if (crit.subcriteria) {
        arr.concat(this._getComparisonList(arr, crit.subcriteria))
      }
    }
    return arr
  }

  getNextPair() {
    if (!this.assessed) {
      throw new Error('You must asses the last pair before asking for the next one')
    }
    const comparisonPair = {
      mainCriteria: {
        name: this.criteriaList[this.index].mainCriteria.name,
        description: this.criteriaList[this.index].mainCriteria.description
      },
      secondaryCriteria: {
        name: this.criteriaList[this.index].secondaryCriteria.name,
        description: this.criteriaList[this.index].secondaryCriteria.description
      }
    }
    this.index++
    return comparisonPair
  }

  assessAll(ratings) {
    const stringRatings = ratings.map((e) => e < 0 ? `1/${Math.abs(e)}` : `${Math.abs(e)}`)
    for (let index = 0; index < stringRatings.length; index += 3) {
      if (index < 3) { // level1
        this._fillUpperTriangle(stringRatings.slice(0, 3), this.assessment.level1)
        
      } else if (index < 6) {
        this._fillUpperTriangle(stringRatings.slice(3, 6), this.assessment.level2Data)
      } else {
        this._fillUpperTriangle(stringRatings.slice(6, 9), this.assessment.level2Performance)
      }
    }
    this._completeArray(this.assessment.level1)
    this._completeArray(this.assessment.level2Data)
    this._completeArray(this.assessment.level2Performance)
  }

  getAssessmentArrays() {
    return {
      level1: this.assessment.level1,
      level2Data: this.assessment.level2Data,
      level2Performance: this.assessment.level2Performance
    }
  }

  _fillUpperTriangle(ratings, array) {
    let index = 0
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array[i].length; j++) {
        array[i][j] = ratings[index++]
      }
    }
  }
  
  _completeArray(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < i; j++) {
        const assessmentValue = array[j][i];
        if (assessmentValue.indexOf('/') >= 0) {
          array[i][j] = assessmentValue.substr(2,1)
        } else if (assessmentValue === '1') {
          array[i][j] = assessmentValue
        } else {
          array[i][j] = `1/${assessmentValue}`
        }
      }
    }
    for (let i = 0, j = 0; i < array.length; i++, j++) {
        array[i][j] = '1'
    }
  }

  hasNext() {
    return this.index < this.criteriaList.length
  }

  __printArray(arr, name) {
    console.log('ARRAY:', name)
    for (let i = 0; i < arr.length; i++) {
      const row = []
      for (let j = 0; j < arr[i].length; j++) {
        row.push(arr[i][j])
      }
      console.log(row);
    }
    console.log('============')
  }
}