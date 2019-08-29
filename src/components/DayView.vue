<template>
  <performance-chart />
</template>
<script>
import PerformanceChart from "./charts/PerformanceChart";
export default {
  name: "DayView",
  components: {
    "performance-chart": PerformanceChart
  }
};
</script>