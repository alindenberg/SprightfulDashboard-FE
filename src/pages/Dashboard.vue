<template>
  <b-row class="dashboard">
    <b-col md="6">
      <!-- Header bar -->
      <b-row class="d-flex justify-content-between">
        <b-col sm="4">
          <h2>Energy Performance</h2>
        </b-col>
        <b-col sm="8">
          <b-row class="flex-nowrap justify-content-center">
            <datepicker
              style="width: 60%; color: black"
              :format="'MM/dd/yyyy'"
              :disabled-dates="disabled_dates"
              @selected="start_date_changed"
              typeable="true"
              bootstrap-styling="true"
              :value="calendar_start_date"
            ></datepicker>
            <datepicker
              style="width: 60%; color: black"
              :format="'MM/dd/yyyy'"
              :disabled-dates="disabled_dates"
              @selected="end_date_changed"
              typeable="true"
              bootstrap-styling="true"
              :value="calendar_end_date"
            ></datepicker>
          </b-row>
        </b-col>
      </b-row>
      <!-- Below header bar w/ date selection -->
      <performance-chart :data="energyTotals" />
      <energy-breakdown
        style="margin-top: 2%"
        :on_peak_consumption="energyTotals.on_peak_consumption"
        :off_peak_consumption="energyTotals.off_peak_consumption"
        :on_peak_generation="energyTotals.on_peak_generation"
        :off_peak_generation="energyTotals.off_peak_generation"
      />
    </b-col>
    <b-col md="6">
      <consumption-bar-chart :data="data" />
      <generation-bar-chart :data="data" />
    </b-col>
    <b-col md="6">
      <performance-chart-legend />
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
      billingCycle: null,
      start_date: null,
      end_date: null,
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
    const now = moment().tz("America/New_York");
    this.billingCycle = {
      start: now.subtract(28, "days").format("MM/DD/YYYY"),
      end: now.add(28, "days").format("MM/DD/YYYY")
    };
    this.start_date = this.billingCycle.start;
    this.end_date = this.billingCycle.end;

    // THEN load data from neurio (mocked)
    let start_date = moment(this.start_date).tz("America/New_York");
    let end_date = moment(this.end_date).tz("America/New_York");
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
  },
  computed: {
    calendar_start_date: function() {
      return new Date(this.start_date);
    },
    calendar_end_date: function() {
      return new Date(this.end_date);
    },
    energyTotals: function() {
      let on_peak_consumption = 0;
      let off_peak_consumption = 0;
      let on_peak_generation = 0;
      let off_peak_generation = 0;

      for (let i = 0; i < this.data.length; i++) {
        const energyData = this.data[i];
        on_peak_consumption += energyData.on_peak_consumption;
        off_peak_consumption += energyData.off_peak_consumption;
        on_peak_generation += energyData.on_peak_generation;
        off_peak_generation += energyData.off_peak_generation;
      }

      return {
        on_peak_consumption,
        off_peak_consumption,
        on_peak_generation,
        off_peak_generation
      };
    }
  },
  methods: {
    start_date_changed(value) {
      this.start_date = moment(value)
        .tz("America/New_York")
        .format("YYYY-MM-DD");
    },
    end_date_changed(value) {
      this.end_date = moment(value)
        .tz("America/New_York")
        .format("YYYY-MM-DD");
    }
  }
};
</script>

<style scoped>
.energy_component {
  margin-bottom: 2%;
}
</style>