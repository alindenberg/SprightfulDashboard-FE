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
        <b-col xl="2" lg="3" md="2" sm="3" v-for="(energyData, index) in data" :key="index">
          <div v-on:click="goToDay(energyData)">
            <performance-chart
              style="width: 100%; height: 100%;"
              :index="index"
              :data="energyData"
              :generationGoal="generationGoal"
            />
          </div>
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
            <div v-on:click="goToDay(energyData)">
              <performance-chart
                style="width: 100%; height: 100%"
                :index="index+100"
                :data="energyData"
                :generationGoal="generationGoal"
              />
            </div>
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
        v-if="chartDisplay == 'kwh'"
        style="margin-top: 2%"
        :on_peak_consumption="energyTotals.on_peak_consumption"
        :off_peak_consumption="energyTotals.off_peak_consumption"
        :on_peak_generation="energyTotals.on_peak_generation"
        :off_peak_generation="energyTotals.off_peak_generation"
      />
      <savings-breakdown
        v-if="chartDisplay == 'cost'"
        style="margin-top: 2%"
        :on_peak_consumption_cost="savingTotals.on_peak_consumption_cost"
        :off_peak_consumption_cost="savingTotals.off_peak_consumption_cost"
        :on_peak_generation_savings="savingTotals.on_peak_generation_savings"
        :off_peak_generation_savings="savingTotals.off_peak_generation_savings"
      />
    </b-col>
    <b-col lg="6">
      <consumption-bar-chart :data="data" :displayKwh="chartDisplay == 'kwh'" />
      <generation-bar-chart :data="data" :displayKwh="chartDisplay == 'kwh'" />
      <b-row class="justify-content-center">
        <!-- <b-form-group class="d-flex flex-row"> -->
        <b-form-radio
          v-model="chartDisplay"
          style="margin-right: 2%"
          name="some-radios"
          value="kwh"
        >Kilowatt-Hours</b-form-radio>
        <b-form-radio v-model="chartDisplay" name="some-radios" value="cost">Cost</b-form-radio>
        <!-- </b-form-group> -->
      </b-row>
    </b-col>
  </b-row>
</template> 

<script>
import axios from "axios";
import datepicker from "vuejs-datepicker";
import PerformanceChart from "../components/charts/PerformanceChart";
import EnergyBreakdown from "../components/EnergyBreakdown";
import SavingsBreakdwon from "../components/SavingsBreakdown";
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
    "savings-breakdown": SavingsBreakdwon,
    "performance-chart": PerformanceChart,
    "generation-bar-chart": GenerationBarChart,
    "consumption-bar-chart": ConsumptionBarChart
  },
  data() {
    return {
      data: [],
      energyTotals: {},
      savingTotals: {},
      generationGoal: null,
      billingCycle: null,
      start_date: null,
      end_date: null,
      // Indexes for small-screen pie chart iterating
      startIndex: 0,
      endIndex: 6,
      chartDisplay: "cost"
    };
  },
  props: {
    locationId: String,
    userId: String
  },
  watch: {
    locationId: function() {
      this.loadEnergyInfo(this.locationId);
    },
    userId: function() {
      console.log("Dashboard page user id changed ", this.userId);
    }
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
      // TODO - Disable "to" 30(?) days behind end_datepicker date so that we dont
      // go overboard with neurio requests
      return {
        // to: new Date(moment(this.end_date).tz('America/New_York').subtract(60, 'days').format('MM/DD/YYYY')
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
    loadEnergyInfo(locationId) {
      console.log("loading energy info");
      // Get Current Billing Cycle (will be from location)
      const billingCycle = this.getCurrentBillingCycle();
      this.start_date = billingCycle.start;
      this.end_date = billingCycle.end;

      const start = moment(this.start_date)
        .tz("America/New_York")
        .toISOString();
      const end = moment(this.end_date)
        .tz("America/New_York")
        .toISOString();
      // Get energy data for current billing cycle
      axios
        .get(
          `${process.env.VUE_APP_API_URL}/locations/${locationId}/energy_info?start=${start}&end=${end}`
        )
        .then(res => {
          console.log("Location energy data ", res.data);
          const energy_data = res.data;
          this.data = energy_data;
          this.getTotals(this.data);
        });
      // Get current billing cycle and generation goal from location object
      // axios
      //   .get(`${process.env.VUE_APP_API_URL}/locations/${locationId}`)
      //   .then(location => {
      //     this.generationGoal = location.generationGoal;
      //   });
      this.generationGoal = 100;
    },
    async getNeurioData(start, end) {
      //mock data fetching for now
      this.data = [];
      let start_date = moment(start).tz("America/New_York");
      let end_date = moment(end).tz("America/New_York");
      while (start_date.isSameOrBefore(end_date)) {
        let mock_data = {
          timestamp: start_date.format("MM/DD/YYYY"),
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
        this.data.push(mock_data);
        start_date.add(1, "days");
      }
      this.getTotals(this.data);
      // console.log("API URL ", process.env.VUE_APP_API_URL);
      // await axios
      //   .get(
      //     `${process.env.VUE_APP_API_URL}/locations/f8128cc4-6c70-4458-9f1f-b1d185f3014e/energy_info?start=${start_date.toISOString()}&end=${end_date.toISOString()}`
      //   )
      //   .then(data => {
      //     console.log("data we get from backend ", data.data);
      //     this.data = data.data;
      //     this.getTotals(data.data);
      //   })
      //   .catch(err => {
      //     console.log("Error fetching dashboard data", err);
      //     this.data = [];
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
        on_peak_consumption,
        off_peak_consumption,
        on_peak_generation,
        off_peak_generation
      };

      this.savingTotals = {
        on_peak_consumption_cost,
        off_peak_consumption_cost,
        on_peak_generation_savings,
        off_peak_generation_savings
      };
    },
    getCurrentBillingCycle() {
      // Mocked
      const now = moment().tz("America/New_York");
      return {
        start: now.subtract(27, "days").format("MM/DD/YYYY"),
        end: now.add(27, "days").format("MM/DD/YYYY")
      };
      // axios.get(/location/{id}/billingCycles).then(logic to get current billing cycle)
    },
    goToDay(energyData) {
      this.$router.push({
        path: "/day",
        query: { date: energyData.timestamp }
      });
    }
  }
};
</script>

<style scoped>
.energy_component {
  margin-bottom: 2%;
}
</style>