<template>
  <b-row class="d-flex justify-content-center" style="margin-top: 2%;">
    <b-col class="col-6">
      <h4>
        <u>Generation</u>
      </h4>
      <h5>On-Peak: {{on_peak_generation.toFixed(2)}} kWh</h5>
      <h5>Off-Peak: {{off_peak_generation.toFixed(2)}} kWh</h5>
      <h5>Total: {{(off_peak_generation + on_peak_generation).toFixed(2)}} kWh</h5>
    </b-col>
    <b-col class="col-6">
      <h4>
        <u>Consumption</u>
      </h4>
      <h5>On-Peak: {{on_peak_consumption.toFixed(2)}} kWh</h5>
      <h5>Off-Peak: {{off_peak_consumption.toFixed(2)}} kWh</h5>
      <h5>Total: {{(off_peak_consumption + on_peak_consumption).toFixed(2)}} kWh</h5>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "PerformanceBreakdown",
  props: {
    on_peak_consumption: Number,
    off_peak_consumption: Number,
    on_peak_generation: Number,
    off_peak_generation: Number
  }
};
</script>