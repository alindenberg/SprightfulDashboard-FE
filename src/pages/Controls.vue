<template>
  <b-row class="d-flex justify-content-center">
    <b-col md="10" lg="8" xl="6">
      <ecobee class="control_div" />
      <!-- Account card -->
      <account class="control_div" />
      <!-- Contact card -->
      <contact class="control_div" />
    </b-col>
  </b-row>
</template>
<script>
import AccountComponent from "../components/AccountSettings";
import EcobeeComponent from "../components/Ecobee";
import ContactComponent from "../components/Contact";
export default {
  name: "ControlsPage",
  components: {
    ecobee: EcobeeComponent,
    account: AccountComponent,
    contact: ContactComponent
  }
};
</script>
<style scoped>
.control_div {
  background-color: #131313;
  border: 1px solid white;
  margin-bottom: 2%;
}
</style>