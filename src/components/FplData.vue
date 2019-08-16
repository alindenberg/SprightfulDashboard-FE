<template>
  <div class="fpl_data col-sm">
    <b-card title="FPL Data" :sub-title="date_string">
      <b-card-text>Total Bill cost: {{billingCharge}}</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "NeurioData",
  props: {
    readingFrom: String,
    readingTo: String,
    billingCharge: Number
  },
  computed: {
    date_string: function() {
      return `${this.readingFrom} - ${this.readingTo}`;
    }
  }
};
</script>

<style scoped>
</style>