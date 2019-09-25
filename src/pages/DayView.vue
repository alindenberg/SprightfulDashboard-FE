<template>
  <div>
    <h1>{{date}}</h1>
    <b-row>
      <b-col lg="6">
        <performance-chart :data="energyTotals" :generationGoal="generationGoal" />
        <energy-breakdown
          style="margin-top: 5%"
          :on_peak_consumption="energyTotals.on_peak_consumption"
          :off_peak_consumption="energyTotals.off_peak_consumption"
          :on_peak_generation="energyTotals.on_peak_generation"
          :off_peak_generation="energyTotals.off_peak_generation"
        />
      </b-col>
      <b-col lg="6">
        <consumption-bar-chart :data="hourlyData" />
        <generation-bar-chart :data="hourlyData" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import PerformanceChart from "../components/charts/PerformanceChart";
import ConsumptionBarChart from "../components/charts/ConsumptionBarChart";
import GenerationBarChart from "../components/charts/GenerationBarChart";
import EnergyBreakdown from "../components/EnergyBreakdown";
export default {
  name: "DayView",
  components: {
    "performance-chart": PerformanceChart,
    "energy-breakdown": EnergyBreakdown,
    "consumption-bar-chart": ConsumptionBarChart,
    "generation-bar-chart": GenerationBarChart
  },
  data() {
    return {
      generationGoal: 100,
      date: null,
      hourlyData: [],
      energyTotals: null
    };
  },
  mounted() {
    this.date = this.$route.query.date;
    // Regardless if we pass data in, we need to get hourly data from neurio for bar charts.
    // query for that here - assuming we pass in data that's day-level
    this.getHourlyData();
  },
  methods: {
    getHourlyData() {
      let energyTotals = {
        on_peak_generation: 0,
        off_peak_generation: 0,
        on_peak_consumption: 0,
        off_peak_consumption: 0
      };
      // mock getting of hourly data
      const hourLabels = [
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
      ];
      for (let i = 0; i < hourLabels.length; i++) {
        let mock_data = {
          timestamp: hourLabels[i],
          on_peak_generation: Math.random() * 50,
          off_peak_generation: Math.random() * 50,
          on_peak_consumption: Math.random() * 100,
          off_peak_consumption: Math.random() * 100
        };
        // push data to hourly array
        this.hourlyData.push(mock_data);
        // add data to totals object
        energyTotals.on_peak_generation += mock_data.on_peak_generation;
        energyTotals.on_peak_consumption += mock_data.on_peak_consumption;
        energyTotals.off_peak_generation += mock_data.off_peak_generation;
        energyTotals.off_peak_consumption += mock_data.off_peak_consumption;
      }

      this.energyTotals = energyTotals;
    }
  }
};
</script>