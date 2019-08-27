<template>
  <!-- <canvas id="line-chart" height="800" width="800" style="border:1px solid #000000;"></canvas> -->
  <mdb-container id="graph-container">
    <mdb-line-chart :data="lineChartData" :options="lineChartOptions" :height="400" :width="400"></mdb-line-chart>
  </mdb-container>
</template>
<script>
import { mdbLineChart, mdbContainer } from "mdbvue";
export default {
  name: "SolarChart",
  components: {
    mdbLineChart,
    mdbContainer
  },
  data() {
    return {
      lineChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Consumption",
            backgroundColor: "rgba(255, 99, 132, 0.1)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 0.7,
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: "Generation",
            backgroundColor: "rgba(151,187,205,0.2)",
            borderColor: "rgba(151,187,205,1)",
            borderWidth: 0.8,
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ]
        }
      }
    };
  }
};
</script>