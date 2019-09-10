<template>
  <div>
    <canvas id="generationGraph"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
export default {
  name: "SolarChart",
  data() {
    return {
      chart: null
    };
  },
  props: {
    data: [Number]
  },
  watch: {
    data: function(newData, oldData) {
      this.data = newData;
      this.chart.destroy();
      this.createGenerationGraph();
    }
  },
  mounted() {
    this.createGenerationGraph();
  },
  methods: {
    createGenerationGraph() {
      var ctx = document.getElementById("generationGraph").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23
          ],
          datasets: [
            {
              data: this.data,
              backgroundColor: "#33ff33",
              fill: false,
              label: "Generation"
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            xAxes: [
              {
                barPercentage: 0.4
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return tooltipItem.value + " kWh";
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