<template>
  <div>
    <canvas :id="`graph-${this.index}`"></canvas>
    <h4 style="margin-top: 2%">{{this.date}}</h4>
  </div>
</template>
<script>
import Chart from "chart.js";
var moment = require("moment-timezone");
export default {
  name: "PerformanceChart",
  data() {
    return {
      myChart: null
    };
  },
  watch: {
    data: function(newData, oldData) {
      this.data = newData;
      this.redrawGraph();
    }
  },
  computed: {
    date: function() {
      return moment(this.data.timestamp)
        .tz("America/New_York")
        .format("MM/DD/YYYY");
    }
  },
  props: {
    index: Number,
    data: {
      on_peak_consumption: Number,
      off_peak_consumption: Number,
      on_peak_generation: Number,
      off_peak_generation: Number,
      timestamp: String
    }
  },
  mounted() {
    this.createPerformanceGraph();
  },
  methods: {
    redrawGraph() {
      this.myChart.destroy();
      this.createPerformanceGraph();
    },
    createPerformanceGraph() {
      var ctxD = document
        .getElementById(`graph-${this.index}`)
        .getContext("2d");
      this.myChart = new Chart(ctxD, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [
                this.data.on_peak_consumption,
                this.data.off_peak_consumption
              ],
              backgroundColor: ["#ff6666", "grey"],
              labels: [
                "On-Peak Consumption (kWh)",
                "Off-Peak Consumption (kWh)"
              ]
            },
            {
              data: [
                this.data.on_peak_generation,
                this.data.off_peak_generation
              ],
              backgroundColor: ["#33ff33", "grey"],
              labels: ["On-Peak Generation", "Off-Peak Generation"]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var index = tooltipItem.index;
                return dataset.labels[index] + ": " + dataset.data[index];
              }
            }
          }
        }
      });
    }
  }
};
</script>
<style scoped>
</style>