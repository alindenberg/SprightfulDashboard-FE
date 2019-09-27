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
    const vm = this;
    return {
      chart: null,
      on_peak_data: [],
      off_peak_data: [],
      labels: [],

      callbacks: {
        label(tooltipItem) {
          if (vm.displayKwh) {
            return tooltipItem.value.split(".")[0] + " kWh";
          }
          return `$${tooltipItem.value}`;
        }
      }
    };
  },
  props: {
    data: Array,
    title: String,
    displayKwh: Boolean
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
    },
    displayKwh: function() {
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
      if (this.displayKwh) {
        for (let i = 0; i < this.data.length; i++) {
          this.on_peak_data.push(this.data[i].on_peak.generation_kwh);
          this.off_peak_data.push(this.data[i].off_peak.generation_kwh);
          this.labels.push(this.data[i].timestamp);
        }
      } else {
        for (let i = 0; i < this.data.length; i++) {
          this.on_peak_data.push(this.data[i].on_peak.generation_savings);
          this.off_peak_data.push(this.data[i].off_peak.generation_savings);
          this.labels.push(this.data[i].timestamp);
        }
      }
    },
    createGraph() {
      var ctx = document.getElementById(`generation_chart`).getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.labels,
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
                  labelString: this.displayKwh
                    ? "Kilowatt-Hours"
                    : "Savings ($)",
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
            callbacks: this.callbacks
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>