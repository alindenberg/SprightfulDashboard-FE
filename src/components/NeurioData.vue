<template>
  <div class="neurio_data col-lg">
    <b-card title="Neurio Data">
      <b-row v-if="!is_tou">
        <card-data
          v-bind:consumption="total_consumption"
          v-bind:generation="total_generation"
          v-bind:cost="total_flat_rate_price"
        />
      </b-row>
      <b-row v-if="is_tou">
        <b-col style="padding-bottom: 5%" lg="6">
          <h6>
            <u>On Peak</u>
          </h6>
          <card-data
            v-bind:consumption="on_peak_energy_consumed"
            v-bind:generation="on_peak_energy_generated"
            v-bind:cost="on_peak_price"
          />
        </b-col>
        <b-col style="padding-bottom: 5%" lg="6">
          <h6>
            <u>Off Peak</u>
          </h6>
          <card-data
            v-bind:consumption="off_peak_energy_consumed"
            v-bind:generation="off_peak_energy_generated"
            v-bind:cost="off_peak_price"
          />
        </b-col>
        <b-col md="12">
          <h6>
            <u>Total</u>
          </h6>
          <card-data
            v-bind:consumption="total_consumption"
            v-bind:generation="total_generation"
            v-bind:cost="total_tou_price"
          />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import CardData from "./CardData";
export default {
  name: "NeurioData",
  components: {
    "card-data": CardData
  },
  props: {
    on_peak_energy_generated: Number,
    on_peak_energy_consumed: Number,
    off_peak_energy_generated: Number,
    off_peak_energy_consumed: Number,
    total_generation: Number,
    total_consumption: Number,
    on_peak_price: Number,
    off_peak_price: Number,
    total_flat_rate_price: Number,
    total_tou_price: Number,
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