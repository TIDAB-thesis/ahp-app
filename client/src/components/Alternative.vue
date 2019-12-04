<template>
  <div class="alternative">
    <h1>{{ name }}</h1>
    <p>{{ description }}</p>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'Alternative',
  props: {
    name: String,
    description: String
  }
}
</script>
<style scoped>
  .alternative {
    text-align: center;
    padding: 40px;
  }
</style>