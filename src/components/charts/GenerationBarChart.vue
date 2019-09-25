<template>
  <div>
    <canvas id="generation_chart"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
export default {
  name: "BarChart",
  data() {
    return {
      chart: null,
      on_peak_data: [],
      off_peak_data: [],
      labels: []
    };
  },
  props: {
    data: Array,
    title: String
  },
  mounted() {
    this.getChartValues();
    this.createGraph();
  },
  watch: {
    data: function() {
      this.getChartValues();
      this.chart.destroy();
      this.createGraph();
    }
  },
  methods: {
    getChartValues() {
      this.on_peak_data = [];
      this.off_peak_data = [];
      this.labels = [];
      for (let i = 0; i < this.data.length; i++) {
        this.on_peak_data.push(this.data[i].on_peak_consumption);
        this.off_peak_data.push(this.data[i].off_peak_consumption);
        this.labels.push(this.data[i].timestamp);
      }
    },
    createGraph() {
      var ctx = document.getElementById(`generation_chart`).getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.labels ? this.labels : this.hourLabels,
          datasets: [
            {
              data: this.on_peak_data,
              backgroundColor: "#00ff00",
              // fill: false,
              label: "On-Peak Generation"
            },
            {
              data: this.off_peak_data,
              backgroundColor: "#00b300",
              // fill: false,
              label: "Off-Peak Generation"
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          legend: {
            display: true,
            labels: {
              fontColor: "#f4f4f4"
            }
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                barPercentage: 0.8,
                ticks: {
                  fontColor: "#f4f4f4"
                }
              }
            ],
            yAxes: [
              {
                stacked: true,
                scaleLabel: {
                  display: true,
                  labelString: "Kilowatt-Hours",
                  fontColor: "#f4f4f4"
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: "#f4f4f4"
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