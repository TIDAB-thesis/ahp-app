<template>
  <div>
    <p class="progress-indicator">{{ currentIndex + 1 }}/{{ totalQuestions }}</p>
    <h2>How important is {{ main.name }} compared to {{ secondary.name }}?</h2>
    <div id="carousel">
      <Alternative v-bind:name="main.name" v-bind:description="main.description" />
      <Slider v-if="!done && !errorMessage" @assessment="rate" />
      <div v-if="errorMessage">
        <p class="error-message">
          {{ errorMessage }}
        </p>
        Restart: <button @click="restart">Restart</button>
        <br>
        <br>
        See results anyway: <button @click="getAssessment(true)">Send anyways</button>
      </div>
      <button v-if="done" @click="restart">Restart?</button>
      <Alternative v-bind:name="secondary.name" v-bind:description="secondary.description" />
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
      currentIndex: 0,
      totalQuestions: 0,
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
      this.errorMessage = undefined
      this.$emit('restart')
    },
    init() {
      this.assesser = new Assesser()
      this.currentIndex = 0
      this.totalQuestions = this.assesser.getNumberOfAssessments()
      const { mainCriteria, secondaryCriteria } = this.assesser.getNextPair()
      this.main = mainCriteria
      this.secondary = secondaryCriteria
    },
    next() {
      if (this.assesser.hasNext()) {
        const {mainCriteria, secondaryCriteria} = this.assesser.getNextPair()
        this.main = mainCriteria
        this.secondary = secondaryCriteria
        this.currentIndex++
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
      try {
        const resultData = await AssessmentService.getAssessment({
          userPreference: result,
          force
        })
        this.$emit('result', resultData.data)
        this.done = true
        this.errorMessage = undefined
      } catch (err) {
        if (err.response.status === 400) {
          const data = err.response.data
          this.errorMessage = `You had an inconsistency level of more than 0.1: ${data.crIndex.toFixed(3)} on your answers.`
        } else {
          alert('Bad server error >:(')
        }
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

  .error-message {
    font-weight: bold;
    color: darkred;
  }

  .progress-indicator {
    font-weight: lighter;
    font-style: italic;
  }
</style>