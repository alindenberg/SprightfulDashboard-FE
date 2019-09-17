<template>
  <div>
    <h6>
      <u>Pie Chart Legend</u>
    </h6>
    <b-row>
      <b-col sm="6" v-for="(data, index) in legend" :key="index">
        <span>
          <svg width="30" height="12">
            <rect width="30" height="12" :style="`fill:${data.color}`" />
          </svg>
          {{data.value}}
        </span>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "PieChartLegend",
  data() {
    return {
      legend: [
        {
          value: "On-Peak Generation",
          color: "#00ff00"
        },
        {
          value: "Off-Peak Generation",
          color: "#00b300"
        },
        {
          value: "On-Peak Consumption",
          color: "#ff0000"
        },
        {
          value: "Off-Peak Consumption",
          color: "#cc0000"
        }
      ]
    };
  }
};
</script>