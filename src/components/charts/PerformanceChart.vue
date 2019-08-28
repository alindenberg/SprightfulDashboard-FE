<template>
  <div>
    <canvas id="graph"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
export default {
  name: "SolarChart",
  data() {
    return {
      consumption: 150,
      consumptionGoal: 50,
      generation: 180,
      generationGoal: 70
    };
  },
  mounted() {
    this.createPerformanceGraph();
  },
  methods: {
    createPerformanceGraph() {
      var ctxD = document.getElementById("graph").getContext("2d");
      new Chart(ctxD, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [this.consumption, this.consumptionGoal],
              backgroundColor: ["red", "grey"],
              labels: [
                "On-Peak Consumption (kWh)",
                "Off-Peak Consumption (kWh)"
              ]
            },
            {
              data: [this.generation, this.generationGoal],
              backgroundColor: ["green", "grey"],
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