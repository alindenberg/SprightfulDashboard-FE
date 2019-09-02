<template>
  <b-row class="dashboard">
    <b-col md="6">
      <!-- Header bar -->
      <b-row class="d-flex justify-content-between" style="margin-left: 2%; margin-right: 2%">
        <h2>Energy Performance</h2>
        <b-row class="d-flex justify-content-between">
          <b-dropdown right class="btn-sm" variant="info" :text="timeRangeSelection">
            <b-dropdown-item @click="timeRangeSelected('Day')">Day</b-dropdown-item>
            <b-dropdown-item @click="timeRangeSelected('Month')">Month</b-dropdown-item>
          </b-dropdown>
          <b-dropdown
            right
            class="btn-sm"
            variant="info"
            :text="selectedMonth.month"
            v-if="timeRangeSelection=='Month'"
          >
            <b-dropdown-item
              v-for="(val, index) in data"
              @click="monthSelected(index)"
              :key="index"
            >{{val.month}}</b-dropdown-item>
          </b-dropdown>
          <!-- Day view date-iterator div -->
          <div
            style="text-align: center"
            class="d-flex align-items-center"
            v-if="timeRangeSelection=='Day'"
          >
            <button
              type="button"
              v-on:click="loadPreviousDay"
              class="btn btn-link fa fa-angle-left"
            />
            <h5
              style="margin-top: 10px; padding-left: 4px; padding-right: 4px"
            >{{selectedMonth.data[dayIndex].timestamp}}</h5>
            <button type="button" v-on:click="loadNextDay" class="btn btn-link fa fa-angle-right" />
          </div>
        </b-row>
      </b-row>
      <!-- Below header bar w/ date selection -->
      <!-- Day View -->
      <performance-chart :data="selectedMonth.data[dayIndex]" v-if="timeRangeSelection=='Day'" />
      <!-- Month View -->
      <b-row class="w-100" v-if="timeRangeSelection=='Month'">
        <b-col class="col-4" md="3" v-for="(data, index) in selectedMonth.data" :key="index">
          <div v-on:click="daySelected(index)">
            <performance-chart :data="data" :index="index" />
          </div>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="6">
      <consumption-chart />
      <generation-chart />
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";
import datepicker from "vuejs-datepicker";
import PerformanceChart from "../components/charts/PerformanceChart";
import ConsumptionChart from "../components/charts/ConsumptionChart";
import GenerationChart from "../components/charts/GenerationChart";
import { mdbIcon } from "mdbvue";
const moment = require("moment-timezone");

export default {
  name: "Dashboard",
  components: {
    datepicker,
    mdbIcon,
    "performance-chart": PerformanceChart,
    "consumption-chart": ConsumptionChart,
    "generation-chart": GenerationChart
  },
  data() {
    return {
      dayIndex: 0,
      selectedMonth: null,
      timeRangeSelection: "Day",
      data: [],
      date: moment()
        .tz("America/New_York")
        .format("MM/DD/YYYY")
    };
  },
  created() {
    var jsonData = require("../mock/EnergyData.json").data;
    // Simulate loading initial month data, then loading other month data
    this.data.push(...jsonData);
    this.selectedMonth = jsonData[0];
  },
  methods: {
    timeRangeSelected(value) {
      this.timeRangeSelection = value;
      switch (value) {
        case "Day":
          console.log("Day selected");
          // this.$set(this, "energyData", [1]);
          break;
        case "Month":
          console.log("Month selected");
          // this.$set(this, "energyData", [1, 2]);
          break;
      }
    },
    monthSelected(index) {
      this.selectedMonth = this.data[index];
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
        this.dayIndex = this.data.length - 1;
      }
    },
    loadNextDay() {
      // Replace energyData with currentMonthData.date
      if (this.dayIndex < this.selectedMonth.data.length - 1) {
        this.dayIndex++;
      } else {
        // else we are going to next month - load data of first data from next month
        // TODO - swap out month data
        this.dayIndex = 0;
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