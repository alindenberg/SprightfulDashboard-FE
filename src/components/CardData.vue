<template>
  <b-col>
    <b-card-text class="card_text">Consumption: {{consumption.toFixed(2)}} kWh</b-card-text>
    <b-card-text class="card_text">Generation: {{generation.toFixed(2)}} kWh</b-card-text>
    <b-card-text class="card_text">Cost: ${{cost.toFixed(2)}}</b-card-text>
  </b-col>
</template>
<script>
export default {
  name: "CardData",
  props: {
    consumption: Number,
    generation: Number,
    cost: Number
  }
};
</script>
<style scoped>
.card_text {
  margin: 0;
  padding: 0;
  white-space: nowrap;
}
</style>