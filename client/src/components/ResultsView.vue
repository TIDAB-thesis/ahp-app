<template>
  <div class="container">
    <div>
      <h1>Results:</h1>
      <div style="display: flex; flex-direction: row">
        <ol class="result-list">
          <li v-for="result in results" v-bind:key="result.name">{{ result.name }}</li>
        </ol>
        <ul class="result-list" style="list-style: none">
          <li v-for="result in results" v-bind:key="result.name">{{ result.result.toFixed(3) }}</li>
        </ul>
      </div>
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
    color: green;
    font-weight: bold;
  }

  .result-list > li:nth-child(2) {
    color: #ff8800;
    font-weight: bold;
  }

  .result-list > li {
    font-size: 1.5em;
    /* font-weight: bold; */
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>