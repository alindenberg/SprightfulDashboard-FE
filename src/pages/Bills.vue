<template>
  <b-row>
    <b-col md="2" lg="3" />
    <b-col md="8" lg="6">
      <b-list-group>
        <b-list-group-item
          v-for="(bill, index) in bills"
          :key="index"
          to="/"
          class="d-flex w-100 justify-content-between"
        >
          <div class="flex-column d-flex align-items-start">
            <h3>{{bill.month}}</h3>
            <small>{{formatDate(bill.start_date)}} - {{formatDate(bill.end_date)}}</small>
          </div>
          <h3 class="h-100 d-flex align-items-center">${{bill.cost.toFixed(2)}}</h3>
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col md="2" lg="3" />
  </b-row>
</template>
<script>
var moment = require("moment-timezone");
export default {
  name: "BillPage",
  data() {
    return {
      bills: []
    };
  },
  created() {
    this.bills = require("../mock/Bills").Bills;
    // TODO - Load actual bill data
  },
  methods: {
    formatDate(date) {
      return moment(date)
        .tz("America/New_York")
        .format("MM/DD/YYYY");
    }
  }
};
</script>