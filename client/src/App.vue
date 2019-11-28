<template>
  <div id="app">
    <Header />
    <main>
      <Carousel />
    </main>
    <Footer />
  </div>
</template>

<script>
import 'normalize.css'
import Carousel from './components/Carousel.vue'
import Header from './components/fragments/Header.vue'
import Footer from './components/fragments/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Carousel,
    Footer
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
