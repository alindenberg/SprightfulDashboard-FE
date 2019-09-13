<template>
  <b-row class="d-flex justify-content-center">
    <b-col lg="8">
      <ecobee />
      <!-- Account card -->
      <account style="margin-top: 2%" />
      <!-- Contact card -->
      <contact style="margin-top: 2%" />
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