<template>
  <div>
    <div class="labels">
      <div class="label-container"><span class="label main">Extremely</span></div>
      <div class="label-container"><span class="label main">Very Strong</span></div>
      <div class="label-container"><span class="label main">Strong</span></div>
      <div class="label-container"><span class="label main">Moderate</span></div>
      <div class="label-container"><span class="label">Equal</span></div>
      <div class="label-container"><span class="label secondary">Moderate</span></div>
      <div class="label-container"><span class="label secondary">Storng</span></div>
      <div class="label-container"><span class="label secondary">Very Strong</span></div>
      <div class="label-container"><span class="label secondary">Extremely</span></div>
    </div>
    <input id="preference-slider" v-model="selectedValue" type="range" name="Hej" min="-8" max="8" step="1">
    <p class="selected-value">{{ selected }}</p>
    <button @click="selectAssessment">Choose</button>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data() {
    return {
      selectedValue: 0 // this will always be inverted (negative -> positive and so on)
    }
  },
  computed: {
    selected: function () {
      const assessmentNames = ['Equal', 'Moderate', 'Strong', 'Very Strong', 'Extremely']
      let index = Number.parseInt(this.selectedValue) * -1
      index = index >= 0 ? index + 1 : index -1
      index = Math.abs(index)
      let selectedString = ''
      if (index % 2 === 0) {
        selectedString = `${assessmentNames[(index - 2) / 2]}-${assessmentNames[index / 2]}`
      } else {
        selectedString = assessmentNames[Math.floor((index - 1) / 2)]
      }
      return selectedString
    }
  },
  methods: {
    selectAssessment() {
      let value = Number.parseInt(this.selectedValue) * -1
      value = value >= 0 ? value + 1 : value -1
      this.$emit('assessment', value)
      this.selectedValue = 0
    }
  }
}
</script>

<style scoped>
  input[type=range] {
    width: 100%;
  }

  .labels {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
  }

  .label-container {
    width: calc(100%/9);
  }

  .label {
    display: inline-block;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }

  .main {
    color: darkgreen;
    float: left;
  }

  .secondary {
    float: right;
    color: red;
  }

  .selected-value {
    font-weight: bold;
  }
</style>