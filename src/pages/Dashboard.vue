<template>
  <b-row class="dashboard">
    <b-col md="6">
      <!-- Header bar -->
      <b-row class="d-flex justify-content-between">
        <b-col sm="6">
          <h2 style="float: left">Energy Performance</h2>
        </b-col>
        <b-col sm="6">
          <b-row class="justify-content-center">
            <button
              type="button"
              style="color: grey; float: left"
              class="btn btn-link btn-lg"
              v-on:click="loadPreviousDay"
            >
              <span class="fa fa-arrow-left" />
            </button>
            <datepicker
              style="width: 60%"
              :format="'MM/dd/yyyy'"
              :disabled-dates="disabled_dates"
              @selected="date_changed"
              typeable="true"
              bootstrap-styling="true"
              :value="calendar_date"
            ></datepicker>
            <button
              type="button"
              style="color: grey"
              class="btn btn-link btn-lg"
              v-on:click="loadNextDay"
            >
              <span class="fa fa-arrow-right" />
            </button>
          </b-row>
        </b-col>
      </b-row>
      <!-- Below header bar w/ date selection -->
      <performance-chart :data="data[selected_date]" />
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
    loadPreviousDay() {
      console.log("Load previous day");
      this.selected_date = moment(this.selected_date)
        .tz("America/New_York")
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.calendar_date = moment(this.selected_date)
        .tz("America/New_York")
        .format("MM/DD/YYYY");
    },
    loadNextDay() {
      console.log("Load next day");
      this.selected_date = moment(this.selected_date)
        .tz("America/New_York")
        .add(1, "days")
        .format("YYYY-MM-DD");
      this.calendar_date = moment(this.selected_date)
        .tz("America/New_York")
        .format("MM/DD/YYYY");
    }
  }
};
</script>

<style scoped>
.energy_component {
  margin-bottom: 2%;
}
</style>