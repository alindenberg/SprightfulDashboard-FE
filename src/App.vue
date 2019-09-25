<template>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  </head>
  <nav-bar v-on:LocationChanged="locationChanged" :locationIndex="locationIndex" />
  <b-container fluid id="app" style="margin-top: 5px; margin-bottom: 5%">
    <keep-alive exclude="DayView">
      <router-view :locationIndex="locationIndex"></router-view>
    </keep-alive>
  </b-container>
</html>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: {
    "nav-bar": Navbar
  },
  data() {
    return {
      locationIndex: 0
    };
  },
  methods: {
    locationChanged(index) {
      this.locationIndex = index;
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
body {
  background-color: #131313;
  color: #f4f4f4;
}
</style>
