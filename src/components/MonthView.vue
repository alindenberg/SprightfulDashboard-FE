<template>
  <b-row>
    <b-col sm="3" xs="2" v-for="(data, index) in energyData" :key="index">
      <performance-chart :index="index" />
    </b-col>
  </b-row>
</template>
<script>
import PerformanceChart from "./charts/PerformanceChart";
export default {
  name: "MonthView",
  components: {
    "performance-chart": PerformanceChart
  },
  data() {
    return {
      energyData: [1, 2, 3, 4, 5, 6, 7]
    };
  }
};
</script>