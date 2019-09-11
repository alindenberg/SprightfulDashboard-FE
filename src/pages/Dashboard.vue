<template>
  <b-row class="dashboard">
    <b-col md="6">
      <!-- Header bar -->
      <b-row class="d-flex justify-content-between">
        <b-col sm="8">
          <h2 style="float: left">Energy Performance</h2>
        </b-col>
        <b-col sm="4">
          <datepicker
            :format="'MM/dd/yyyy'"
            :disabled-dates="disabled_dates"
            @selected="date_changed"
            typeable="true"
            bootstrap-styling="true"
            :value="calendar_date"
          ></datepicker>
        </b-col>
      </b-row>
      <!-- Below header bar w/ date selection -->
      <performance-chart :data="data[selected_date]" v-if="timeRangeSelection=='Day'" />
      <energy-breakdown
        :on_peak_consumption="data[selected_date].on_peak_consumption"
        :off_peak_consumption="data[selected_date].off_peak_consumption"
        :on_peak_generation="data[selected_date].on_peak_generation"
        :off_peak_generation="data[selected_date].off_peak_generation"
      />
    </b-col>
    <b-col md="6">
      <bar-chart :title="'Consumption'" :data="data[selected_date].consumption" />
      <bar-chart :title="'Generation'" :data="data[selected_date].generation" />
    </b-col>
  </b-row>
</template> 

<script>
import axios from "axios";
import datepicker from "vuejs-datepicker";
import PerformanceChart from "../components/charts/PerformanceChart";
import EnergyBreakdown from "../components/EnergyBreakdown";
import BarChart from "../components/charts/BarChart";
import { mdbIcon } from "mdbvue";
const moment = require("moment-timezone");

export default {
  name: "Dashboard",
  components: {
    datepicker,
    mdbIcon,
    "energy-breakdown": EnergyBreakdown,
    "performance-chart": PerformanceChart,
    "bar-chart": BarChart
  },
  data() {
    return {
      dayIndex: 0,
      monthIndex: -1,
      selectedMonth: null,
      timeRangeSelection: "Day",
      data: {},
      selected_date: moment()
        .tz("America/New_York")
        .format("YYYY-MM-DD"),
      calendar_date: new Date(
        moment()
          .tz("America/New_York")
          .format("MM/DD/YYYY")
      ),
      disabled_dates: {
        // TODO - Disable "to" (up-to) when the user first joined Neurio
        from: new Date(
          moment()
            .tz("America/New_York")
            .format("MM/DD/YYYY")
        )
      }
    };
  },
  created() {
    var jsonData = require("../mock/EnergyData.json").data;
    // Simulate loading initial month data, then loading other month data
    for (let i = 0; i < jsonData.length; i++) {
      let energyData = jsonData[i];
      energyData.generation = [];
      energyData.consumption = [];
      // Mock generation and consumption hourly data for now
      for (let j = 0; j < 24; j++) {
        energyData.generation.push(Math.random() * 100);
        energyData.consumption.push(Math.random() * 100);
      }
      this.data[energyData.timestamp] = energyData;
    }
  },
  methods: {
    date_changed(value) {
      this.selected_date = moment(value)
        .tz("America/New_York")
        .format("YYYY-MM-DD");
    },
    monthSelected(index) {
      this.monthIndex = index;
      this.selectedMonth = this.data[this.monthIndex];
    },
    daySelected(index) {
      this.dayIndex = index;
      this.date = moment(this.selectedMonth[this.dayIndex]).tz(
        "America/New_York"
      );
      this.timeRangeSelection = "Day";
    },
    loadPreviousDay() {
      if (this.dayIndex > 0) {
        this.dayIndex--;
      } else {
        // else we are going to previous month - load data of last day from previous month
        this.monthIndex--;
        this.selectedMonth = this.data[this.monthIndex];
        this.dayIndex = this.selectedMonth.data.length - 1;
      }
    },
    loadNextDay() {
      // Replace energyData with currentMonthData.date
      if (this.dayIndex < this.selectedMonth.data.length - 1) {
        this.dayIndex++;
      } else {
        // else we are going to next month - load data of first data from next month
        this.monthIndex++;
        this.dayIndex = 0;
        this.selectedMonth = this.data[this.monthIndex];
      }
    }
  }
};
</script>

<style scoped>
.energy_component {
  margin-bottom: 2%;
}
</style>