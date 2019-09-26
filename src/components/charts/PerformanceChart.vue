<template>
  <div id="chart_div">
    <canvas :id="`graph-${index}`"></canvas>
    <label v-if="index != null" style="margin-top: 2%">{{this.date}}</label>
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
    },
    totalGeneration: function() {
      return this.data.on_peak_generation + this.data.off_peak_generation;
    },
    onPeakConsumptionPercentage: function() {
      return (
        (this.data.on_peak_consumption /
          (this.data.on_peak_consumption + this.data.off_peak_consumption)) *
        100
      );
    }
  },
  props: {
    index: Number,
    generationGoal: Number,
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
                this.onPeakConsumptionPercentage.toFixed(0),
                (100 - this.onPeakConsumptionPercentage).toFixed(0)
              ],
              backgroundColor: [
                this.onPeakConsumptionPercentage > 75 ? "#ff0000" : "green",
                "black"
              ],
              labels: ["On-Peak Consumption", "Off-Peak Consumption"]
            },
            {
              data: [
                this.totalGeneration.toFixed(0),
                (this.generationGoal - this.totalGeneration).toFixed(0)
              ],
              backgroundColor: ["#00ff00", "red"],
              labels: ["Generation Achieved", "Remaining in Goal"]
            }
          ]
        },
        options: {
          responsive: true,
          cutoutPercentage: this.index != null ? 10 : 40,
          legend: {
            display: true
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var index = tooltipItem.index;
                return dataset.data[index] + " kWh";
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
canvas {
  cursor: pointer;
}
</style>