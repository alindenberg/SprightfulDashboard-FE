<template>
<html>
  <nav-bar />
  <b-container fluid id="app" style="margin-top: 5px">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <router-view></router-view>
  </b-container>
</html>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: {
    "nav-bar": Navbar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
