const dummyData = [
  {
    name: 'Data Model',
    description: 'What characteristics that the data model should be good at.',
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
];

export default class Asesser {

  constructor(criteria) {
    this.criteria = criteria || dummyData
    if (this.criteria.length < 2) {
      throw new Error('Each level of criteria must be at least of length 2')
    }
    this.assessmentList = this._getComparisonList(new Array(), this.criteria)
    // DEBUG
    this.assessmentList.forEach(ele => {
      console.log(ele.mainCriteria.name, 'vs' ,ele.secondaryCriteria.name)
    });
    this.index = 0
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
    console.log('GET NEXT PAIR ---')
    const comparisonPair = {
      mainCriteria: {
        name: this.assessmentList[this.index].mainCriteria.name,
        description: this.assessmentList[this.index].mainCriteria.description
      },
      secondaryCriteria: {
        name: this.assessmentList[this.index].secondaryCriteria.name,
        description: this.assessmentList[this.index].secondaryCriteria.description
      }
    }
    console.log('====>index:',this.index)
    this.index++
    console.log('index:',this.index)
    return comparisonPair
  }

  hasNext() {
    return this.index < this.assessmentList.length
  }
}