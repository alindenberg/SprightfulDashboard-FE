<template>
  <b-row class="d-flex justify-content-center" style="margin-top: 2%;">
    <b-col sm="6" class="col-12">
      <h4>
        <u>Generation</u>
      </h4>
      <p>On-Peak: {{on_peak_generation.toFixed(2)}} kWh</p>
      <p>Off-Peak: {{off_peak_generation.toFixed(2)}} kWh</p>
      <p>Total: {{(off_peak_generation + on_peak_generation).toFixed(2)}} kWh</p>
    </b-col>
    <b-col sm="6" class="col-12">
      <h4>
        <u>Consumption</u>
      </h4>
      <p>On-Peak: {{on_peak_consumption.toFixed(2)}} kWh</p>
      <p>Off-Peak: {{off_peak_consumption.toFixed(2)}} kWh</p>
      <p>Total: {{(off_peak_consumption + on_peak_consumption).toFixed(2)}} kWh</p>
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