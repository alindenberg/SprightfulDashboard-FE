<template>
  <div>
    <h1>{{date}}</h1>
    <b-row>
      <b-col lg="6">
        <performance-chart :data="energyTotals" :generationGoal="generationGoal" />
        <energy-breakdown
          v-if="chartDisplay == 'kwh'"
          style="margin-top: 5%"
          :on_peak_consumption="energyTotals.on_peak.consumption_kwh"
          :off_peak_consumption="energyTotals.off_peak.consumption_kwh"
          :on_peak_generation="energyTotals.on_peak.generation_kwh"
          :off_peak_generation="energyTotals.off_peak.generation_kwh"
        />
        <savings-breakdown
          v-if="chartDisplay == 'cost'"
          style="margin-top: 5%"
          :on_peak_consumption_cost="savingTotals.on_peak_consumption_cost"
          :off_peak_consumption_cost="savingTotals.off_peak_consumption_cost"
          :on_peak_generation_savings="savingTotals.on_peak_generation_savings"
          :off_peak_generation_savings="savingTotals.off_peak_generation_savings"
        />
      </b-col>
      <b-col lg="6">
        <consumption-bar-chart :data="hourlyData" :displayKwh="chartDisplay == 'kwh'" />
        <generation-bar-chart :data="hourlyData" :displayKwh="chartDisplay == 'kwh'" />
        <b-row class="justify-content-center">
          <b-form-radio
            v-model="chartDisplay"
            style="margin-right: 2%"
            name="some-radios"
            value="kwh"
          >Kilowatt-Hours</b-form-radio>
          <b-form-radio v-model="chartDisplay" name="some-radios" value="cost">Cost</b-form-radio>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from "axios";
const moment = require("moment-timezone");
import PerformanceChart from "../components/charts/PerformanceChart";
import ConsumptionBarChart from "../components/charts/ConsumptionBarChart";
import GenerationBarChart from "../components/charts/GenerationBarChart";
import EnergyBreakdown from "../components/EnergyBreakdown";
import SavingsBreakdown from "../components/SavingsBreakdown";
export default {
  name: "DayView",
  components: {
    "performance-chart": PerformanceChart,
    "energy-breakdown": EnergyBreakdown,
    "savings-breakdown": SavingsBreakdown,
    "consumption-bar-chart": ConsumptionBarChart,
    "generation-bar-chart": GenerationBarChart
  },
  data() {
    return {
      generationGoal: 100,
      date: null,
      hourlyData: [],
      energyTotals: {},
      savingTotals: {},
      chartDisplay: "cost"
    };
  },
  async created() {
    this.date = this.$route.query.date;
    // Regardless if we pass data in, we need to get hourly data from neurio for bar charts.
    // query for that here - assuming we pass in data that's day-level
    this.getHourlyData();
  },
  methods: {
    async getHourlyData() {
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
          on_peak: {
            generation_kwh: Math.random() * 50,
            generation_savings: Math.random() * 10,
            consumption_kwh: Math.random() * 100,
            consumption_cost: Math.random() * 10
          },
          off_peak: {
            generation_kwh: Math.random() * 50,
            generation_savings: Math.random() * 10,
            consumption_kwh: Math.random() * 100,
            consumption_cost: Math.random() * 10
          }
        };
        // push data to hourly array
        this.hourlyData.push(mock_data);
      }

      // Actually hit backend for data
      // let start = moment(this.date).tz("America/New_York");
      // const start_string = start.toISOString();
      // let end = start.add(1, "days");
      // const end_string = end.toISOString();
      // await axios
      //   .get(
      //     `${process.env.VUE_APP_API_URL}/locations/f8128cc4-6c70-4458-9f1f-b1d185f3014e/energy_info?start=${start_string}&end=${end_string}`
      //   )
      //   .then(data => {
      //     console.log("Day data we get back is ", data.data);
      //     this.hourlyData = data.data;
      //     this.getTotals(data.data);
      //   });
    },
    getTotals(data) {
      let on_peak_consumption = 0;
      let off_peak_consumption = 0;
      let on_peak_generation = 0;
      let off_peak_generation = 0;

      let on_peak_consumption_cost = 0;
      let off_peak_consumption_cost = 0;
      let on_peak_generation_savings = 0;
      let off_peak_generation_savings = 0;

      for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        // Energy totals
        on_peak_consumption += obj.on_peak.consumption_kwh;
        off_peak_consumption += obj.off_peak.consumption_kwh;
        on_peak_generation += obj.on_peak.generation_kwh;
        off_peak_generation += obj.off_peak.generation_kwh;

        // Saving totals
        on_peak_consumption_cost += obj.on_peak.consumption_cost;
        off_peak_consumption_cost += obj.off_peak.consumption_cost;
        on_peak_generation_savings += obj.on_peak.generation_savings;
        off_peak_generation_savings += obj.off_peak.generation_savings;
      }

      this.energyTotals = {
        on_peak: {
          consumption_kwh: on_peak_consumption,
          generation_kwh: on_peak_generation
        },
        off_peak: {
          consumption_kwh: off_peak_consumption,
          generation_kwh: off_peak_generation
        }
      };

      this.savingTotals = {
        on_peak_consumption_cost,
        off_peak_consumption_cost,
        on_peak_generation_savings,
        off_peak_generation_savings
      };
    }
  }
};
</script>