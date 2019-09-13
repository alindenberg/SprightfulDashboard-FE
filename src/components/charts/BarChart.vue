<template>
  <div>
    <canvas :id="this.title"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
export default {
  name: "BarChart",
  data() {
    return {
      chart: null,
      hourLabels: [
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
      ]
    };
  },
  props: {
    data: Array,
    labels: Array,
    title: String
  },
  mounted() {
    this.createGraph();
  },
  watch: {
    data: function(newData, oldData) {
      this.data = newData;
      this.chart.destroy();
      this.createGraph();
    }
  },
  computed: {
    backgroundColor: function() {
      return this.title == "Consumption" ? "#ff6666" : "#33ff33";
    }
  },
  methods: {
    createGraph() {
      var ctx = document.getElementById(`${this.title}`).getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.labels ? this.labels : this.hourLabels,
          datasets: [
            {
              data: this.data,
              backgroundColor: this.backgroundColor,
              fill: false,
              label: this.title
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
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
              title: function(title, data) {
                let index = title[0].index;

                return index + (index < 12 ? " AM" : " PM");
              },
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