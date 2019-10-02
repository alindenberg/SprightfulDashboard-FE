<template>
  <div class="table-responsive-sm">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">
            <i>Savings Details</i>
          </th>
          <th scope="col">Generation Savings</th>
          <th scope="col">Consumption Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">On-Peak</th>
          <td>${{on_peak_generation_savings.toFixed(2)}}</td>
          <td>${{on_peak_consumption_cost.toFixed(2)}}</td>
        </tr>
        <tr>
          <th scope="row">Off-Peak</th>
          <td>${{off_peak_generation_savings.toFixed(2)}}</td>
          <td>${{off_peak_consumption_cost.toFixed(2)}}</td>
        </tr>
        <tr>
          <th scope="row">Total</th>
          <td>${{total_generation_savings.toFixed(2)}}</td>
          <td>${{total_consumption_cost.toFixed(2)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "SavingsBreakdown",
  props: {
    on_peak_consumption_cost: Number,
    off_peak_consumption_cost: Number,
    on_peak_generation_savings: Number,
    off_peak_generation_savings: Number
  },
  watch: {
    // on_peak_consumption_cost: function() {},
    // off_peak_consumption_cost: function() {},
    // on_peak_generation_savings: function() {},
    // off_peak_generation_savings: function() {}
  },
  computed: {
    total_generation_savings: function() {
      return this.on_peak_generation_savings + this.off_peak_generation_savings;
    },
    total_consumption_cost: function() {
      return this.on_peak_consumption_cost + this.off_peak_consumption_cost;
    }
  }
};
</script>
<style scoped>
td,
th {
  color: #f4f4f4;
}
</style>