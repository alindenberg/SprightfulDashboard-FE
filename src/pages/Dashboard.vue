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
            <b-dropdown-item @click="timeRangeSelected('Custom')">Custom</b-dropdown-item>
          </b-dropdown>
          <b-dropdown
            right
            class="btn-sm"
            variant="info"
            :text="monthSelection"
            v-if="timeRangeSelection=='Month'"
          >
            <b-dropdown-item v-for="(month, index) in months" :key="index">{{month}}</b-dropdown-item>
          </b-dropdown>
          <div
            style="text-align: center"
            class="d-flex align-items-center"
            v-if="timeRangeSelection=='Day'"
          >
            <button type="button" class="btn btn-link fa fa-angle-left" />
            <h5
              style="margin-top: 10px; padding-left: 4px; padding-right: 4px"
            >{{energyData[selectedIndex]}}</h5>
            <button type="button" class="btn btn-link fa fa-angle-right" />
          </div>
        </b-row>
      </b-row>
      <!-- Below header bar w/ date selection -->
      <performance-chart :timestamp="energyData[selectedIndex]" v-if="timeRangeSelection=='Day'" />
      <b-row v-if="timeRangeSelection=='Month'">
        <b-col sm="3" v-for="(data, index) in energyData" :key="index">
          <div v-on:click="clicked(index)">
            <performance-chart :timestamp="data" :index="index" />
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
import NeurioData from "../components/NeurioData";
import FplData from "../components/FplData";
// import DayPerformance from "../components/DayView";
// import MonthPerformance from "../components/MonthView";
import PerformanceChart from "../components/charts/PerformanceChart";
import ConsumptionChart from "../components/charts/ConsumptionChart";
import GenerationChart from "../components/charts/GenerationChart";
import { mdbIcon } from "mdbvue";
const moment = require("moment-timezone");

export default {
  name: "Dashboard",
  components: {
    mdbIcon,
    datepicker,
    "neurio-data": NeurioData,
    "fpl-data": FplData,
    "performance-chart": PerformanceChart,
    "consumption-chart": ConsumptionChart,
    "generation-chart": GenerationChart
  },
  data() {
    return {
      start_date: null,
      end_date: null,
      neurio_data: {},
      fpl_data: {},
      energyData: [
        "2019-01-01",
        "2019-01-02",
        "2019-01-03",
        "2019-01-04",
        "2019-01-05",
        "2019-01-06",
        "2019-01-07"
      ],
      selectedIndex: 1,
      months: ["August", "Sepetember", "October", "Novembor", "December"],
      monthSelection: moment()
        .tz("America/New_York")
        .format("MMMM"),
      timeRangeSelection: "Day",
      date: moment()
        .tz("America/New_York")
        .format("MM/DD/YYYY")
    };
  },
  created() {
    // On load: fetch data for current month
    // month_data = [
    //   {
    //     date: "2019-01-01",

    //   }
    // ]

    // axios
    //   .get(
    //     `${process.env.VUE_APP_API_URL}/locations/f8128cc4-6c70-4458-9f1f-b1d185f3014e/fpl_info`,
    //     {
    //       method: "GET"
    //     }
    //   )
    //   .then(res => {
    //     this.fpl_data = res.data;
    //     this.start_date = moment(res.data.readingFrom).format("MM/DD/YYYY");
    //     this.end_date = moment(res.data.readingTo).format("MM/DD/YYYY");
    //     this.get_neurio_data(res.data.readingFrom, res.data.readingTo);
    //   });
    this.fpl_data = {
      start_date: "2019-08-08T04:00:00.000Z",
      end_date: "2019-07-09T04:00:00.000Z",
      on_peak_consumption: 78,
      off_peak_consumption: 560,
      total_consumption: 638,
      charge: 53.07,
      is_tou: true
    };
    this.start_date = moment(this.fpl_data.readingFrom).format("MM/DD/YYYY");
    this.end_date = moment(this.fpl_data.readingTo).format("MM/DD/YYYY");
    this.get_neurio_data(null, null);
  },
  methods: {
    get_neurio_data(start, end) {
      this.neurio_data = {
        on_peak_energy_generated: 0,
        on_peak_energy_consumed: 67.0493861111111,
        off_peak_energy_generated: 0,
        off_peak_energy_consumed: 513.156685,
        total_generation: 0,
        total_consumption: 580.2060711111111,
        on_peak_price: 16.454589845527774,
        off_peak_price: 23.143366493500004,
        flat_rate_price: 61.89058160542222,
        total_tou_price: 47.877956339027776,
        total_flat_rate_price: 70.17058160542221,
        is_tou: true
      };
      // axios
      //   .get(
      //     `${process.env.VUE_APP_API_URL}/locations/f8128cc4-6c70-4458-9f1f-b1d185f3014e/neurio_info?start=${start}&end=${end}`,
      //     {
      //       method: "GET"
      //     }
      //   )
      //   .then(res => {
      //     console.log("NEURIO RESPONSE DATA ", res.data);
      //     this.neurio_data = res.data;
      //   })
      //   .catch(err => {
      //     console.log("Error getting neurio data ", err);
      //   });
    },
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
        case "Custom":
          console.log("Custom selected");
          // this.$set(this, "energyData", [1, 2, 3, 4, 5]);
          break;
      }
    },
    clicked(index) {
      console.log("Performance chart clicked with index: ", index);
      this.selectedIndex = index;
      this.date = moment(this.energyData[this.selectedIndex]).tz(
        "America/New_York"
      );
      this.timeRangeSelection = "Day";
    },
    iconClicked(value) {
      console.log(`${value} icon clicked`);
    }
  }
};
</script>

<style scoped>
.energy_component {
  margin-bottom: 2%;
}
</style>