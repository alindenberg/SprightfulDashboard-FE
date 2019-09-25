<template>
  <b-row class="dashboard">
    <b-col lg="6">
      <!-- Header bar -->
      <b-row class="d-flex justify-content-between">
        <b-col sm="4">
          <h2>Energy Performance</h2>
        </b-col>
        <b-col sm="8">
          <b-row class="flex-nowrap justify-content-center">
            <datepicker
              style="width: 40%; color: black; margin-right: 2%"
              :format="'MM/dd/yyyy'"
              :disabled-dates="start_datepicker_disabled_dates"
              @selected="start_date_changed"
              typeable="true"
              bootstrap-styling="true"
              :value="calendar_start_date"
            ></datepicker>
            <datepicker
              style="width: 40%; color: black"
              :format="'MM/dd/yyyy'"
              :disabled-dates="end_datepicker_disabled_dates"
              @selected="end_date_changed"
              typeable="true"
              bootstrap-styling="true"
              :value="calendar_end_date"
            ></datepicker>
          </b-row>
        </b-col>
      </b-row>
      <!-- Below header bar w/ date selection -->
      <b-row class="d-none d-sm-flex justify-content-center">
        <b-col xl="2" lg="4" md="2" sm="3" v-for="(energyData, index) in data" :key="index">
          <performance-chart style="width: 100%; height: 100%;" :index="index" :data="energyData" />
        </b-col>
      </b-row>
      <!-- Iterable pie charts on reduced screen size -->
      <div class="d-sm-none d-block" style="margin-bottom: 2%">
        <b-row>
          <b-col
            class="col-6"
            v-for="(energyData, index) in data.slice(startIndex, endIndex)"
            :key="index"
          >
            <performance-chart
              style="width: 100%; height: 100%"
              :index="index+100"
              :data="energyData"
            />
          </b-col>
        </b-row>
        <b-row class="justify-content-center flex-nowrap align-items-center">
          <button
            type="button"
            style="color: grey;"
            class="btn btn-link btn-lg"
            :disabled="startIndex == 0"
            v-on:click="decrementIndexes"
          >
            <span class="fa fa-arrow-left" />
          </button>
          {{start_label}} - {{end_label}}
          <button
            type="button"
            style="color: grey;"
            class="btn btn-link btn-lg"
            :disabled="endIndex >= data.length"
            v-on:click="incrementIndexes"
          >
            <span class="fa fa-arrow-right" />
          </button>
        </b-row>
      </div>
      <energy-breakdown
        style="margin-top: 2%"
        :on_peak_consumption="energyTotals.on_peak_consumption"
        :off_peak_consumption="energyTotals.off_peak_consumption"
        :on_peak_generation="energyTotals.on_peak_generation"
        :off_peak_generation="energyTotals.off_peak_generation"
      />
    </b-col>
    <b-col lg="6">
      <consumption-bar-chart :data="data" />
      <generation-bar-chart :data="data" />
    </b-col>
  </b-row>
</template> 

<script>
import axios from "axios";
import datepicker from "vuejs-datepicker";
import PerformanceChart from "../components/charts/PerformanceChart";
import PerformanceChartLegend from "../components/charts/PerformanceChartLegend";
import EnergyBreakdown from "../components/EnergyBreakdown";
import GenerationBarChart from "../components/charts/GenerationBarChart";
import ConsumptionBarChart from "../components/charts/ConsumptionBarChart";
import { mdbIcon } from "mdbvue";
const moment = require("moment-timezone");

export default {
  name: "Dashboard",
  components: {
    datepicker,
    mdbIcon,
    "energy-breakdown": EnergyBreakdown,
    "performance-chart": PerformanceChart,
    "performance-chart-legend": PerformanceChartLegend,
    "generation-bar-chart": GenerationBarChart,
    "consumption-bar-chart": ConsumptionBarChart
  },
  data() {
    return {
      data: [],
      energyTotals: {},
      billingCycle: null,
      start_date: null,
      end_date: null,
      // Indexes for small-screen pie chart iterating
      startIndex: 0,
      endIndex: 6
    };
  },
  props: {
    locationIndex: Number
  },
  watch: {
    locationIndex: function() {
      console.log("Dashboard page location index changed ", this.locationIndex);
      //TODO - load new location index data
    }
  },
  created() {
    // Get Current Billing Cycle
    const billingCycle = this.getCurrentBillingCycle();
    console.log("Billing cycle is ", billingCycle);
    this.start_date = billingCycle.start;
    this.end_date = billingCycle.end;
    // THEN load data from neurio (mocked)
    this.getNeurioData(this.start_date, this.end_date);
  },
  computed: {
    calendar_start_date: function() {
      return new Date(
        moment(this.start_date)
          .tz("America/New_York")
          .format("MM/DD/YYYY")
      );
    },
    calendar_end_date: function() {
      return new Date(
        moment(this.end_date)
          .tz("America/New_York")
          .format("MM/DD/YYYY")
      );
    },
    start_label: function() {
      return moment(this.data[this.startIndex].timestamp)
        .tz("America/New_York")
        .format("MM/DD/YYYY");
    },
    end_label: function() {
      let index =
        this.endIndex <= this.data.length
          ? this.endIndex - 1
          : this.data.length - 1;
      return moment(this.data[index].timestamp)
        .tz("America/New_York")
        .format("MM/DD/YYYY");
    },
    start_datepicker_disabled_dates: function() {
      // TODO - Disable "to" (up-to) when the user first joined Neurio
      return {
        from: this.calendar_end_date
      };
    },
    end_datepicker_disabled_dates: function() {
      return {
        // Don't allow end of time range to be before the beginning of time range selected
        to: this.calendar_start_date,
        from: new Date(
          moment()
            .tz("America/New_York")
            .format("MM/DD/YYYY")
        )
      };
    }
  },
  methods: {
    start_date_changed(value) {
      this.start_date = moment(value)
        .tz("America/New_York")
        .format("YYYY-MM-DD");
      this.getNeurioData(this.start_date, this.end_date);
    },
    end_date_changed(value) {
      this.end_date = moment(value)
        .tz("America/New_York")
        .format("YYYY-MM-DD");
      this.getNeurioData(this.start_date, this.end_date);
    },
    decrementIndexes() {
      this.startIndex -= 6;
      this.endIndex -= 6;
    },
    incrementIndexes() {
      this.startIndex += 6;
      this.endIndex += 6;
    },
    getNeurioData(start, end) {
      //mock data fetching for now
      this.data = [];
      let start_date = moment(start).tz("America/New_York");
      let end_date = moment(end).tz("America/New_York");
      while (start_date.isSameOrBefore(end_date)) {
        let mock_data = {
          timestamp: start_date.format("MM/DD/YYYY"),
          on_peak_generation: Math.random() * 100,
          off_peak_generation: Math.random() * 100,
          on_peak_consumption: Math.random() * 100,
          off_peak_consumption: Math.random() * 100
        };
        this.data.push(mock_data);
        start_date.add(1, "days");
      }
      this.getEnergyTotals(this.data);
      //axios.get(...)
    },
    getEnergyTotals(data) {
      let on_peak_consumption = 0;
      let off_peak_consumption = 0;
      let on_peak_generation = 0;
      let off_peak_generation = 0;

      for (let i = 0; i < data.length; i++) {
        const energyData = data[i];
        on_peak_consumption += energyData.on_peak_consumption;
        off_peak_consumption += energyData.off_peak_consumption;
        on_peak_generation += energyData.on_peak_generation;
        off_peak_generation += energyData.off_peak_generation;
      }

      this.energyTotals = {
        on_peak_consumption,
        off_peak_consumption,
        on_peak_generation,
        off_peak_generation
      };
    },
    getCurrentBillingCycle() {
      // Mocked
      const now = moment().tz("America/New_York");
      return {
        start: now.subtract(28, "days").format("MM/DD/YYYY"),
        end: now.add(28, "days").format("MM/DD/YYYY")
      };
      // axios.get(/location/{id}/billingCycles).then(logic to get current billing cycle)
    }
  }
};
</script>

<style scoped>
.energy_component {
  margin-bottom: 2%;
}
</style>