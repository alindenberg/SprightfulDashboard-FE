<template>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  </head>
  <nav-bar
    v-if="$route.path != '/login'"
    v-on:LocationChanged="locationChanged"
    :locations="locations"
    :locationId="locationId"
  />
  <b-container fluid id="app" style="margin-top: 5px; margin-bottom: 5%">
    <router-view :locationId="locationId" v-on:loggedIn="getUserLocations"></router-view>
  </b-container>
</html>
</template>

<script>
import axios from "axios";
import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: {
    "nav-bar": Navbar
  },
  data() {
    return {
      locations: [],
      locationId: null
    };
  },
  created() {
    // This is to happen when the page is refreshed during an
    // active session. We will still load data.
    if (
      this.$session.exists() &&
      this.$session.get("userId") &&
      this.$session.get("jwt")
    ) {
      axios.defaults.headers.common["jwt"] = this.$session.get("jwt");
      this.getUserLocations(this.$session.get("userId"));
    } else {
      this.$session.destroy();
      this.$router.push("/login");
    }
  },
  methods: {
    locationChanged(id) {
      this.locationId = id;
    },
    getUserLocations(userId) {
      axios
        .get(`${process.env.VUE_APP_API_URL}/locations?userId=${userId}`)
        .then(res => {
          // format locations to pass to navbar in object that holds (id, name)
          let formattedLocations = [];
          for (let i = 0; i < res.data.length; i++) {
            formattedLocations.push({
              id: res.data[i].location_id,
              name: res.data[i].name
            });
          }
          this.locations = formattedLocations;
          this.locationId =
            this.locations.length > 0 ? this.locations[0].id : null;
        })
        .catch(err => {
          if (err.response.status == 401) {
            this.$session.destroy();
          }
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
html {
  background-color: #131313;
  color: #f4f4f4;
}
</style>
