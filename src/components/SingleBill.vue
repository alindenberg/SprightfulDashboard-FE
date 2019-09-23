<template>
  <b-col>
    <b-row class="d-flex justify-content-center">
      <button
        type="button"
        style="color: grey;"
        class="btn btn-link btn-lg"
        v-on:click="$emit('go_back')"
      >
        <span class="fa fa-arrow-left" />
      </button>
      <h1 class="text-nowrap">{{bill.month}}</h1>
    </b-row>
    <!-- <label>({{formatDate(bill.start_date)}} - {{formatDate(bill.end_date)}})</label> -->
    <b-row>
      <b-col md="8">
        <b-row class="d-none d-sm-flex">
          <b-col xl="2" sm="3" v-for="(data, index) in neurio_data" :key="index">
            <performance-chart style="width: 100%; height: 100%" :index="index" :data="data" />
          </b-col>
        </b-row>
        <!-- Iterable pie charts on reduced screen size -->
        <div class="d-sm-none d-block" style="margin-bottom: 2%">
          <b-row>
            <b-col
              class="col-6"
              v-for="(data, index) in neurio_data.slice(startIndex, endIndex)"
              :key="index"
            >
              <performance-chart style="width: 100%; height: 100%" :index="index+100" :data="data" />
            </b-col>
          </b-row>
          <b-row class="justify-content-center flex-nowrap align-items-center">
            <button
              type="button"
              style="color: grey;"
              class="btn btn-link btn-lg"
              :disabled="startIndex == 0"
              v-on:click="decrementIndexes"
            >
              <span class="fa fa-arrow-left" />
            </button>
            {{start_label}} - {{end_label}}
            <button
              type="button"
              style="color: grey;"
              class="btn btn-link btn-lg"
              :disabled="endIndex >= neurio_data.length"
              v-on:click="incrementIndexes"
            >
              <span class="fa fa-arrow-right" />
            </button>
          </b-row>
        </div>
      </b-col>
      <b-col md="4">
        <energy-breakdown
          :on_peak_consumption="on_peak_consumption"
          :off_peak_consumption="off_peak_consumption"
          :on_peak_generation="on_peak_generation"
          :off_peak_generation="off_peak_generation"
        />
        <!-- Bill breakdown table -->
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">
                <i>Bill Details</i>
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Cost</th>
              <td>
                <strong>${{bill.cost}}</strong>
              </td>
            </tr>
            <tr>
              <th scope="row">Bill Savings</th>
              <td>$41.50</td>
            </tr>
            <tr>
              <th scope="row">YTD Savings</th>
              <td>$250.67</td>
            </tr>
            <tr>
              <th scope="row">Savings Share</th>
              <td>???</td>
            </tr>
          </tbody>
        </table>
        <!-- End bill breakdown table -->
        <performance-chart-legend style="margin-top 3%; margin-bottom: 3%" />
      </b-col>
    </b-row>
    <!-- </b-col> -->
    <b-row class="d-none d-sm-flex">
      <b-col md="6">
        <generation-bar-chart :data="neurio_data" />
      </b-col>
      <b-col md="6">
        <consumption-bar-chart :title="'Consumption'" :data="neurio_data" />
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
import EnergyBreakdown from "./EnergyBreakdown";
import PerformanceChart from "./charts/PerformanceChart";
import PerformanceChartLegend from "./charts/PerformanceChartLegend";
import ConsumptionBarChart from "./charts/ConsumptionBarChart";
import GenerationBarChart from "./charts/GenerationBarChart";
const moment = require("moment-timezone");

export default {
  name: "SingleBill",
  components: {
    "energy-breakdown": EnergyBreakdown,
    "performance-chart": PerformanceChart,
    "performance-chart-legend": PerformanceChartLegend,
    "generation-bar-chart": GenerationBarChart,
    "consumption-bar-chart": ConsumptionBarChart
  },
  data() {
    return {
      neurio_data: [],
      on_peak_generation: 0,
      off_peak_generation: 0,
      on_peak_consumption: 0,
      off_peak_consumption: 0,
      generation_chart_data: null,
      consumption_chart_data: null,
      startIndex: 0,
      endIndex: 6
    };
  },
  props: {
    bill: {
      month: String,
      start_date: String,
      end_date: String
    }
  },
  computed: {
    energy_totals: function() {
      return {
        on_peak_generation: this.on_peak_generation,
        off_peak_generation: this.off_peak_generation,
        on_peak_consumption: this.on_peak_consumption,
        off_peak_consumption: this.off_peak_consumption
      };
    },
    start_label: function() {
      return this.neurio_data[this.startIndex].timestamp;
    },
    end_label: function() {
      let index =
        this.endIndex <= this.neurio_data.length
          ? this.endIndex - 1
          : this.neurio_data.length - 1;
      return this.neurio_data[index].timestamp;
    }
  },
  methods: {
    formatDate(date) {
      return moment(date)
        .tz("America/New_York")
        .format("MMM Do YYYY");
    },
    decrementIndexes() {
      this.startIndex -= 6;
      this.endIndex -= 6;
    },
    incrementIndexes() {
      this.startIndex += 6;
      this.endIndex += 6;
    }
  },
  created() {
    // Load Neurio data using dates associated with the bill - mocked w/ random values for now
    // axios.get(API).then(data => {this.neurio_data = data})

    // MOCK
    let start_date = moment(this.bill.start_date).tz("America/New_York");
    let end_date = moment(this.bill.end_date).tz("America/New_York");
    while (start_date.isBefore(end_date)) {
      let mock_data = {
        timestamp: start_date.format("MM/DD/YYYY"),
        on_peak_generation: Math.random() * 100,
        off_peak_generation: Math.random() * 100,
        on_peak_consumption: Math.random() * 100,
        off_peak_consumption: Math.random() * 100
      };
      this.neurio_data.push(mock_data);
      start_date.add(1, "days");
    }
    // console.log("Mocked neurio data for single bill is ", this.neurio_data);
    // Now manipulate array we would get back from API into generation arrays, consumption arrays, and totals
    let chart_labels = [];
    let generation_chart_values = [];
    let consumption_chart_values = [];
    for (let i = 0; i < this.neurio_data.length; i++) {
      // Totals for energy breakdown component & pie chart
      this.on_peak_generation += this.neurio_data[i].on_peak_generation;
      this.off_peak_generation += this.neurio_data[i].off_peak_generation;
      this.on_peak_consumption += this.neurio_data[i].on_peak_consumption;
      this.off_peak_consumption += this.neurio_data[i].off_peak_consumption;
    }
  }
};
</script>
<style>
th,
td {
  color: #f4f4f4;
}
</style>