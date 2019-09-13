<template>
  <div id="chart_div">
    <canvas :id="`graph-${this.index}`"></canvas>
    <!-- <label style="margin-top: 2%">{{this.date}}</label> -->
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
        .format("MMM Do");
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
                this.data.on_peak_consumption.toFixed(2),
                this.data.off_peak_consumption.toFixed(2)
              ],
              backgroundColor: ["#ff6666", "grey"],
              labels: ["On-Peak Consumption", "Off-Peak Consumption"]
            },
            {
              data: [
                this.data.on_peak_generation.toFixed(2),
                this.data.off_peak_generation.toFixed(2)
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
                return (
                  dataset.labels[index] + ": " + dataset.data[index] + " kWh"
                );
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
#chart_div canvas {
  z-index: 999;
}
</style>