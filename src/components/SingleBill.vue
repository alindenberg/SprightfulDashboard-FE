<template>
  <b-col>
    <h1 class="text-nowrap">{{bill.month}}</h1>
    <label>({{formatDate(bill.start_date)}} - {{formatDate(bill.end_date)}})</label>
    <b-row>
      <b-col lg="5">
        <h3>
          <u>Cost: ${{bill.cost}}</u>
        </h3>
        <!-- <performance-chart -->
        <energy-breakdown
          :on_peak_consumption="on_peak_consumption"
          :off_peak_consumption="off_peak_consumption"
          :on_peak_generation="on_peak_generation"
          :off_peak_generation="off_peak_generation"
        />
        <div class="d-none d-md-block">
          <p style="color: red">Text that should disappear on small screen size</p>
        </div>
      </b-col>
      <b-col lg="7">
        <bar-chart
          :if="generation_chart_data"
          :title="'Generation'"
          :data="generation_chart_data.values"
          :labels="generation_chart_data.labels"
        />
        <bar-chart
          :if="consumption_chart_data"
          :title="'Consumption'"
          :data="consumption_chart_data.values"
          :labels="consumption_chart_data.labels"
        />
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
import EnergyBreakdown from "./EnergyBreakdown";
import PerformanceChart from "./charts/PerformanceChart";
import BarChart from "./charts/BarChart";
const moment = require("moment-timezone");

export default {
  name: "SingleBill",
  components: {
    "energy-breakdown": EnergyBreakdown,
    "performance-chart": PerformanceChart,
    "bar-chart": BarChart
  },
  data() {
    return {
      neurio_data: [],
      on_peak_generation: 0,
      off_peak_generation: 0,
      on_peak_consumption: 0,
      off_peak_consumption: 0,
      generation_chart_data: null,
      consumption_chart_data: null
    };
  },
  props: {
    bill: {
      month: String,
      start_date: String,
      end_date: String
    }
  },
  methods: {
    formatDate(date) {
      return moment(date)
        .tz("America/New_York")
        .format("MMM Do YYYY");
    }
  },
  created() {
    console.log("single bill component created");
    // Load Neurio data using dates associated with the bill - mocked w/ random values for now
    // axios.get(API).then(data => {this.neurio_data = data})

    // MOCK
    let start_date = moment(this.bill.start_date).tz("America/New_York");
    let end_date = moment(this.bill.end_date).tz("America/New_York");
    while (start_date.isBefore(end_date)) {
      let mock_data = {
        date: start_date.format("MMM Do"),
        on_peak_generation: Math.random() * 100,
        off_peak_generation: Math.random() * 100,
        on_peak_consumption: Math.random() * 100,
        off_peak_consumption: Math.random() * 100
      };
      this.neurio_data.push(mock_data);
      start_date.add(1, "days");
    }
    // console.log("Mocked neurio data for single bill is ", this.neurio_data);
    // Now manipulate array we would get back from API into generation arrays, consumption arrays, and totals
    let chart_labels = [];
    let generation_chart_values = [];
    let consumption_chart_values = [];
    for (let i = 0; i < this.neurio_data.length; i++) {
      // Totals for energy breakdown component & pie chart
      this.on_peak_generation += this.neurio_data[i].on_peak_generation;
      this.off_peak_generation += this.neurio_data[i].off_peak_generation;
      this.on_peak_consumption += this.neurio_data[i].on_peak_consumption;
      this.off_peak_consumption += this.neurio_data[i].off_peak_consumption;

      // Arrays for bar chart data
      chart_labels.push(this.neurio_data[i].date);
      generation_chart_values.push(
        this.neurio_data[i].on_peak_generation +
          this.neurio_data[i].off_peak_generation
      );
      consumption_chart_values.push(
        this.neurio_data[i].on_peak_consumption +
          this.neurio_data[i].off_peak_consumption
      );
    }

    this.generation_chart_data = {
      labels: chart_labels,
      values: generation_chart_values
    };
    this.consumption_chart_data = {
      labels: chart_labels,
      values: consumption_chart_values
    };
  }
};
</script>