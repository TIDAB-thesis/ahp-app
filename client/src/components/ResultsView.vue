<template>
  <div class="container">
    <div>
      <h2>Results:</h2>
      <ol class="result-list">
        <li v-for="result in results" v-bind:key="result.name">{{ result.name }}: {{ result.result.toFixed(3) }}</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsView',
  props: {
    results: Array
  }
}
</script>

<style scoped>
  .result-list {
    text-align: left;
  }

  .result-list > li:first-child {
    font-size: 2em;
    font-weight: bold;
    color: green;
  }

  .result-list > li:nth-child(2) {
    font-size: 1.5em;
    font-weight: bold;
    color: orange;
  }

  .result-list > li {
    font-weight: bold;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>