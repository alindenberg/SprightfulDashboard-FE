<template>
  <b-row>
    <b-col md="2" lg="3" />
    <b-col md="8" lg="6">
      <b-list-group v-for="(bill, index) in bills" :key="index">
        <b-list-group-item>{{bill.month}} - {{bill.cost}}</b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col md="2" lg="3" />
  </b-row>
</template>
<script>
var mockBills = require("../mock/Bills").Bills;
export default {
  name: "BillPage",
  data() {
    return {
      bills: mockBills
    };
  }
};
</script>