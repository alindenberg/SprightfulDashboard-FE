<template>
  <b-row class="dashboard">
    <b-col md="6">
      <b-row class="d-flex justify-content-between">
        <h2>Energy Performance</h2>
        <div>
          <b-dropdown right variant="secondary" :text="timeRangeSelection">
            <b-dropdown-item @click="timeRangeSelected('Day')">Day</b-dropdown-item>
            <b-dropdown-item @click="timeRangeSelected('Month')">Month</b-dropdown-item>
            <b-dropdown-item @click="timeRangeSelected('Custom')">Custom</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-row>
      <div v-for="(val, idx) in energyPerformances" :key="idx">
        <performance-chart :index="idx" />
      </div>
    </b-col>
    <b-col md="6">
      <!-- <h2>Energy Data</h2>
      <h6>{{start_date}} - {{end_date}}</h6>
      <b-row class="energy_component">
        <neurio-data v-bind="neurio_data"></neurio-data>
      </b-row>
      <b-row class="energy_component">
        <fpl-data v-bind="fpl_data"></fpl-data>
      </b-row>-->
      <consumption-chart />
      <generation-chart />
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";
import NeurioData from "../components/NeurioData";
import FplData from "../components/FplData";
import PerformanceChart from "../components/charts/PerformanceChart";
import ConsumptionChart from "../components/charts/ConsumptionChart";
import GenerationChart from "../components/charts/GenerationChart";

const moment = require("moment-timezone");

export default {
  name: "Dashboard",
  components: {
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
      energyPerformances: [1],
      timeRangeSelection: "Day"
    };
  },
  created() {
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
          this.$set(this, "energyPerformances", [1]);
          break;
        case "Month":
          console.log("Month selected");
          this.$set(this, "energyPerformances", [1, 2]);
          break;
        case "Custom":
          console.log("Custom selected");
          this.$set(this, "energyPerformances", [1, 2, 3]);
          break;
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