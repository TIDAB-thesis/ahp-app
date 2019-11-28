<template>
  <div>
    <h2>How important is {{ main.name }} compared to {{ secondary.name }}?</h2>
    <div id="carousel">
      <Alternative v-bind:name="main.name" v-bind:description="main.description" />
      <Slider @assessment="rate" />
      <Alternative v-bind:name="secondary.name" v-bind:description="secondary.description" />
    </div>
  </div>
</template>

<script>
import Alternative from './Alternative'
import Slider from './Slider'
import Assesser from '../logic/Asesser'

export default {
  name: 'Carousel',
  components: {
    Alternative,
    Slider
  },
  data() {
    return {
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
    this.assesser = new Assesser()
    const { mainCriteria, secondaryCriteria } = this.assesser.getNextPair()
    this.main = mainCriteria
    this.secondary = secondaryCriteria
  },
  methods: {
    next: function() {
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
          this.assesser.assessAll(this.assessments)
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
</style>