<template>
  <b-row class="d-flex justify-content-center">
    <b-col md="8" lg="6" v-if="selected_bill == null">
      <b-list-group>
        <b-list-group-item
          v-for="(bill, index) in bills"
          :key="index"
          to="/bills"
          v-on:click="bill_selected(index)"
          style="background-color: #131313; border: 1px solid #f4f4f4"
        >
          <b-row>
            <b-col sm="9" class="d-flex flex-column align-items-sm-start">
              <h3>{{bill.month}}</h3>
              <label
                style="cursor: pointer"
                class="text-nowrap"
              >{{formatDate(bill.start_date)}} - {{formatDate(bill.end_date)}}</label>
            </b-col>
            <b-col sm="3" class="d-flex flex-column justify-content-center align-items-center">
              <h2>${{bill.cost.toFixed(2)}}</h2>
            </b-col>
          </b-row>
          <!-- <div class="flex-column d-flex align-items-start">
            <h3>{{bill.month}}</h3>
            <small
              class="text-nowrap"
            >{{formatDate(bill.start_date)}} - {{formatDate(bill.end_date)}}</small>
          </div>
          <h3 class="h-100 d-flex align-items-center">${{bill.cost.toFixed(2)}}</h3>-->
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col sm="12" v-if="selected_bill">
      <single-bill v-on:go_back="selected_bill = null" v-bind:bill="selected_bill" />
    </b-col>
  </b-row>
</template>
<script>
import { mdbIcon } from "mdbvue";
import SingleBill from "../components/SingleBill";
var moment = require("moment-timezone");
export default {
  name: "BillPage",
  components: {
    mdbIcon,
    "single-bill": SingleBill
  },
  data() {
    return {
      location: null,
      bills: [],
      selected_bill: null
    };
  },
  props: {
    locationId: Number
  },
  watch: {
    locationId: function() {
      loadLocation();
      //TODO - Load new location bills
    }
  },
  created() {
    if (this.locationId) {
      loadLocation();
    }
    this.bills = require("../mock/Bills").Bills;
    // TODO - Load actual bill data
  },
  methods: {
    loadLocation() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/locations/${this.locationId}`)
        .then(res => {
          this.location = res.data;
        });
    },
    formatDate(date) {
      return moment(date)
        .tz("America/New_York")
        .format("MMM Do YYYY");
    },
    bill_selected(index) {
      this.selected_bill = this.bills[index];
      scrollTo(0, 0);
    }
  }
};
</script>
<style>
</style>