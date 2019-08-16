<template>
  <div class="neurio_data col-sm">
    <b-card title="Neurio Data" :sub-title="date_string">
      <b-card-text>Some Neurio Data.</b-card-text>
      <b-card-text>Flat Rate Price: {{total_flat_rate_price}}</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "NeurioData",
  props: {
    readingFrom: String,
    readingTo: String,
    total_flat_rate_price: Number
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