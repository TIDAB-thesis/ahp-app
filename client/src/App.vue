<template>
  <div id="app">
    <Header />
    <main>
      <Carousel @restart="reset" @result="displayResults" />
      <ResultsView v-if="results !== undefined" v-bind:results="results" />
    </main>
    <Footer />
  </div>
</template>

<script>
import 'normalize.css'
import Carousel from './components/Carousel.vue'
import ResultsView from './components/ResultsView.vue'
import Header from './components/fragments/Header.vue'
import Footer from './components/fragments/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Carousel,
    ResultsView,
    Footer
  },
  data() {
    return {
      results: undefined
    }
  },
  methods: {
    displayResults(results) {
      this.results = results
    },
    reset() {
      this.results = undefined
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    padding: 10px 40px;
    flex-grow: 1;
  }
</style>
