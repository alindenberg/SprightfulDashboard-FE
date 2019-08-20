<template>
  <div class="fpl_data col-sm">
    <b-card title="FPL Data">
      <b-card-text class="card_text" v-if="is_tou">On-Peak Consumption: {{on_peak_consumption}} kWh</b-card-text>
      <b-card-text
        class="card_text"
        v-if="is_tou"
      >Off-Peak Consumption: {{off_peak_consumption}} kWh</b-card-text>
      <b-card-text class="card_text">Total Consumption: {{total_consumption}} kWh</b-card-text>
      <b-card-text class="card_text">Bill Cost: ${{charge}}</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "NeurioData",
  props: {
    on_peak_consumption: Number,
    off_peak_consumption: Number,
    total_consumption: Number,
    charge: Number,
    start_date: String,
    end_date: String,
    is_tou: Boolean
  }
};
</script>

<style scoped>
.card_text {
  margin: 0;
  padding: 0;
}
</style>