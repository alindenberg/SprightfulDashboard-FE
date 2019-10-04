<template>
  <b-row class="d-flex justify-content-center">
    <b-col md="10" lg="8" xl="6">
      <ecobee class="control_div" />
      <!-- Account card -->
      <account :email="user.email" class="control_div" />
      <!-- Contact card -->
      <contact class="control_div" />
    </b-col>
  </b-row>
</template>
<script>
import axios from "axios";
import AccountComponent from "../components/AccountSettings";
import EcobeeComponent from "../components/Ecobee";
import ContactComponent from "../components/Contact";
export default {
  name: "ControlsPage",
  components: {
    ecobee: EcobeeComponent,
    account: AccountComponent,
    contact: ContactComponent
  },
  props: {
    locationId: String
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    const userId = this.$session.get("userId");
    axios.get(`${process.env.VUE_APP_API_URL}/users/${userId}`).then(res => {
      this.user = res.data;
    });
    if (this.locationId != null) {
      this.loadLocationData();
    }
  },
  watch: {
    locationId: function() {
      console.log("Location id in controls is now ", this.locationId);
      this.loadLocationData();
    }
  },
  methods: {
    loadLocationData() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/locations/${this.locationId}`)
        .then(res => {
          console.log("Location response is ", res.data);
          this.location = res.data;
        });
    }
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