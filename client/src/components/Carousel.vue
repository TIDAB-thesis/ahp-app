<template>
  <div>
    <h2>How important is {{ main.name }} compared to {{ secondary.name }}?</h2>
    <div id="carousel">
      <Alternative v-bind:name="main.name" v-bind:description="main.description" />
      <Slider v-if="!done" @assessment="rate" />
      <button v-if="done" @click="restart">Restart?</button>
      <Alternative v-bind:name="secondary.name" v-bind:description="secondary.description" />
      <div v-if="errorMessage">
        <p id="error-display">
          {{ errorMessage }}.
        </p>
        Restart: <button @click="restart">Restart</button>
        See results anyway: <button @click="getAssessment(true)"></button>
      </div>
      
    </div>
  </div>
</template>

<script>
import Alternative from './Alternative'
import Slider from './Slider'
import Assesser from '../logic/Asesser'
import AssessmentService from '../services/AssessmentService'

export default {
  name: 'Carousel',
  components: {
    Alternative,
    Slider
  },
  data() {
    return {
      done: false,
      errorMessage: undefined,
      assesser: null,
      assessments: [],
      main: {
        name: '...',
        description: '......'
      },
      secondary: {
        name: '...',
        description: '......'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    restart() {
      this.done = false
      this.init()
      this.assessments = []
      this.$emit('restart')
    },
    init() {
      this.assesser = new Assesser()
      const { mainCriteria, secondaryCriteria } = this.assesser.getNextPair()
      this.main = mainCriteria
      this.secondary = secondaryCriteria
    },
    next() {
      if (this.assesser.hasNext()) {
        const {mainCriteria, secondaryCriteria} = this.assesser.getNextPair()
        this.main = mainCriteria
        this.secondary = secondaryCriteria
      } else {
        const err = new Error('Done assessing')
        err.done = true
        throw err
      }
    },
    rate(val) {
      this.assessments.push(val)
      try {
        this.next()
      } catch(err) {
        if (err.done) {
          this.getAssessment();
        }
      }
    },
    async getAssessment(force = false) {
      this.assesser.assessAll(this.assessments)
      const result = this.assesser.getAssessmentArrays()
      const netRes = await AssessmentService.getAssessment({
        userPreference: result,
        force
      })
      if (netRes.errorMessage) {
        this.errorMessage = `You had an inconsistency level of more than 0.1: ${netRes.crIndex} on your answers.`
      } else {
        this.$emit('result', netRes.data)
        this.done = true
      }
    }
  }
}
</script>

<style scoped>
  #carousel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  #carousel > * {
    flex-grow: 1;
    flex-basis: 0;
  }
</style>