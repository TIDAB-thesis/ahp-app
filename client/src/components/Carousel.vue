<template>
  <div>
    <h1>KARUSELL</h1>
    <div id="carousel">
      <Alternative v-bind:name="currentMain" />
      <button @click="next()">Next choice</button>
      <Alternative v-bind:name="currentSecondary" />
    </div>
  </div>
</template>

<script>
import Alternative from './Alternative'
import Assesser from '../logic/Asesser'

export default {
  name: 'Carousel',
  components: {
    Alternative
  },
  data() {
    return {
      assesser: null,
      currentMain: '...',
      currentSecondary: '...'
  }
  },
  created() {
    this.assesser = new Assesser()
    const {mainCriteria, secondaryCriteria} = this.assesser.getNextPair()
    this.currentMain = mainCriteria.name
    this.currentSecondary = secondaryCriteria.name
  },
  methods: {
    next: function() {
      if (this.assesser.hasNext()) {
        const {mainCriteria, secondaryCriteria} = this.assesser.getNextPair()
        this.currentMain = mainCriteria.name
        this.currentSecondary = secondaryCriteria.name
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
</style>