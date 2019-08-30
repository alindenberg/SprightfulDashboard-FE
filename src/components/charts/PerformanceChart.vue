<template>
  <div>
    <canvas :id="`graph-${this.index}`"></canvas>
    <label>{{date}}</label>
  </div>
</template>
<script>
import Chart from "chart.js";
var moment = require("moment-timezone");
export default {
  name: "PerformanceChart",
  data() {
    return {
      consumption: 150,
      consumptionGoal: 50,
      generation: 180,
      generationGoal: 70,
      date: moment(this.timestamp).format("MM/DD/YYYY")
    };
  },
  props: {
    index: Number,
    timestamp: String
  },
  mounted() {
    this.createPerformanceGraph();
  },
  methods: {
    createPerformanceGraph() {
      var ctxD = document
        .getElementById(`graph-${this.index}`)
        .getContext("2d");
      new Chart(ctxD, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [this.consumption, this.consumptionGoal],
              backgroundColor: ["#ff6666", "grey"],
              labels: [
                "On-Peak Consumption (kWh)",
                "Off-Peak Consumption (kWh)"
              ]
            },
            {
              data: [this.generation, this.generationGoal],
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