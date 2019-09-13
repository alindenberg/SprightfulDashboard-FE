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
        "12:00am",
        "1:00am",
        "2:00am",
        "3:00am",
        "4:00am",
        "5:00am",
        "6:00am",
        "7:00am",
        "8:00am",
        "9:00am",
        "10:00am",
        "11:00am",
        "12:00pm",
        "1:00pm",
        "2:00pm",
        "3:00pm",
        "4:00pm",
        "5:00pm",
        "6:00pm",
        "7:00pm",
        "8:00pm",
        "9:00pm",
        "10:00pm",
        "11:00pm"
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