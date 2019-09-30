<template>
  <b-col>
    <b-row class="d-flex justify-content-center">
      <button
        type="button"
        style="color: grey;"
        class="btn btn-link btn-lg"
        v-on:click="$emit('go_back')"
      >
        <span class="fa fa-arrow-left" />
      </button>
      <h1 class="text-nowrap">{{bill.month}}</h1>
    </b-row>
    <!-- <label>({{formatDate(bill.start_date)}} - {{formatDate(bill.end_date)}})</label> -->
    <b-row>
      <b-col md="8">
        <b-row class="d-none d-sm-flex">
          <b-col xl="2" sm="3" v-for="(data, index) in neurio_data" :key="index">
            <div v-on:click="goToDay(data.timestamp)">
              <performance-chart
                style="width: 100%; height: 100%"
                :index="index"
                :data="data"
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
              v-for="(data, index) in neurio_data.slice(startIndex, endIndex)"
              :key="index"
            >
              <div v-on:click="goToDay(data.timestamp)">
                <performance-chart
                  style="width: 100%; height: 100%"
                  :index="index+100"
                  :data="data"
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
              :disabled="endIndex >= neurio_data.length"
              v-on:click="incrementIndexes"
            >
              <span class="fa fa-arrow-right" />
            </button>
          </b-row>
        </div>
      </b-col>
      <b-col md="4">
        <energy-breakdown
          v-if="chartDisplay == 'kwh'"
          :on_peak_consumption="energyTotals.on_peak_consumption"
          :off_peak_consumption="energyTotals.off_peak_consumption"
          :on_peak_generation="energyTotals.on_peak_generation"
          :off_peak_generation="energyTotals.off_peak_generation"
        />
        <savings-breakdown
          v-if="chartDisplay == 'cost'"
          :on_peak_consumption_cost="savingTotals.on_peak_consumption_cost"
          :off_peak_consumption_cost="savingTotals.off_peak_consumption_cost"
          :on_peak_generation_savings="savingTotals.on_peak_generation_savings"
          :off_peak_generation_savings="savingTotals.off_peak_generation_savings"
        />
        <!-- Bill breakdown table -->
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">
                <i>Bill Details</i>
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Cost</th>
              <td>
                <strong>${{bill.cost}}</strong>
              </td>
            </tr>
            <tr>
              <th scope="row">Bill Savings</th>
              <td>$41.50</td>
            </tr>
            <tr>
              <th scope="row">YTD Savings</th>
              <td>$250.67</td>
            </tr>
            <tr>
              <th scope="row">Savings Share</th>
              <td>???</td>
            </tr>
          </tbody>
        </table>
        <!-- End bill breakdown table -->
      </b-col>
    </b-row>
    <!-- </b-col> -->
    <b-row>
      <b-col md="6">
        <generation-bar-chart :data="neurio_data" :displayKwh="chartDisplay == 'kwh'" />
      </b-col>
      <b-col md="6">
        <consumption-bar-chart :data="neurio_data" :displayKwh="chartDisplay == 'kwh'" />
      </b-col>
      <b-col sm="12" class="d-flex justify-content-center">
        <b-form-radio
          v-model="chartDisplay"
          style="margin-right: 2%"
          name="some-radios"
          value="kwh"
        >Kilowatt-Hours</b-form-radio>
        <b-form-radio v-model="chartDisplay" name="some-radios" value="cost">Cost</b-form-radio>
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
import EnergyBreakdown from "./EnergyBreakdown";
import SavingsBreakdown from "./SavingsBreakdown";
import PerformanceChart from "./charts/PerformanceChart";
import ConsumptionBarChart from "./charts/ConsumptionBarChart";
import GenerationBarChart from "./charts/GenerationBarChart";
const moment = require("moment-timezone");

export default {
  name: "SingleBill",
  components: {
    "energy-breakdown": EnergyBreakdown,
    "savings-breakdown": SavingsBreakdown,
    "performance-chart": PerformanceChart,
    "generation-bar-chart": GenerationBarChart,
    "consumption-bar-chart": ConsumptionBarChart
  },
  data() {
    return {
      neurio_data: [],
      generationGoal: 100,
      energyTotals: {},
      savingTotals: {},
      startIndex: 0,
      endIndex: 6,
      chartDisplay: "cost"
    };
  },
  props: {
    bill: {
      month: String,
      start_date: String,
      end_date: String
    }
  },
  computed: {
    start_label: function() {
      return this.neurio_data[this.startIndex].timestamp;
    },
    end_label: function() {
      let index =
        this.endIndex <= this.neurio_data.length
          ? this.endIndex - 1
          : this.neurio_data.length - 1;
      return this.neurio_data[index].timestamp;
    }
  },
  methods: {
    formatDate(date) {
      return moment(date)
        .tz("America/New_York")
        .format("MMM Do YYYY");
    },
    decrementIndexes() {
      this.startIndex -= 6;
      this.endIndex -= 6;
    },
    incrementIndexes() {
      this.startIndex += 6;
      this.endIndex += 6;
    },
    goToDay(date) {
      this.$router.push({ path: "/day", query: { date: date } });
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
        on_peak_consumption_cost = obj.on_peak.consumption_cost;
        off_peak_consumption_cost = obj.off_peak.consumption_cost;
        on_peak_generation_savings = obj.on_peak.generation_savings;
        off_peak_generation_savings = obj.off_peak.generation_savings;
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
    }
  },
  created() {
    // Load Neurio data using dates associated with the bill - mocked w/ random values for now
    // axios.get(API).then(data => {this.neurio_data = data})

    // MOCK
    let start_date = moment(this.bill.start_date).tz("America/New_York");
    let end_date = moment(this.bill.end_date).tz("America/New_York");
    while (start_date.isBefore(end_date)) {
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
      this.neurio_data.push(mock_data);
      start_date.add(1, "days");
    }

    this.getTotals(this.neurio_data);
  }
};
</script>
<style>
th,
td {
  color: #f4f4f4;
}
</style>