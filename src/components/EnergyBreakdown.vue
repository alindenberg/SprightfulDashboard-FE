<template>
  <!-- <b-row class="d-flex justify-content-center" style="margin-top: 2%;">
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
  </b-row>-->
  <div class="table-responsive-sm">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">
            <i>Energy Details</i>
          </th>
          <th scope="col">Generation (kWh)</th>
          <th scope="col">Consumption (kWh)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">On-Peak</th>
          <td>{{on_peak_generation.toFixed(2)}}</td>
          <td>{{on_peak_consumption.toFixed(2)}}</td>
        </tr>
        <tr>
          <th scope="row">Off-Peak</th>
          <td>{{off_peak_generation.toFixed(2)}}</td>
          <td>{{off_peak_consumption.toFixed(2)}}</td>
        </tr>
        <tr>
          <th scope="row">Total</th>
          <td>{{total_generation.toFixed(2)}}</td>
          <td>{{total_consumption.toFixed(2)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "PerformanceBreakdown",
  props: {
    on_peak_consumption: Number,
    off_peak_consumption: Number,
    on_peak_generation: Number,
    off_peak_generation: Number
  },
  computed: {
    total_generation: function() {
      return this.on_peak_generation + this.off_peak_generation;
    },
    total_consumption: function() {
      return this.on_peak_consumption + this.off_peak_consumption;
    }
  }
};
</script>