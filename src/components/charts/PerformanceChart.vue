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
      onPeakConsumption: 100,
      offPeakConsumption: 150,
      onPeakGeneration: 200,
      offPeakGeneration: 250
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
              data: [this.onPeakConsumption, this.offPeakConsumption],
              backgroundColor: ["red", "green"],
              labels: [
                "On-Peak Consumption (kWh)",
                "Off-Peak Consumption (kWh)"
              ]
            },
            {
              data: [this.onPeakGeneration, this.offPeakGeneration],
              backgroundColor: ["blue", "yellow"],
              labels: ["On-Peak Generation", "Off-Peak Generation"]
            },
            {
              data: [100],
              backgroundColor: ["grey"],
              labels: ["Off-Peak Consumption"]
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