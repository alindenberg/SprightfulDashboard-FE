<template>
  <b-navbar v-if="$route.path != '/login'" class="justify-content-between">
    <b-navbar-nav>
      <b-nav-item :active="$route.path =='/'" to="/">Home</b-nav-item>
      <b-nav-item :active="$route.path == '/bills'" to="/bills">Bills</b-nav-item>
      <b-nav-item :active="$route.path == '/controls'" to="/controls">Controls</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav>
      <b-nav-item-dropdown
        v-if="locations.length > 1"
        right
        :text="locations[locationIndex]"
        toggle-class="link_span"
      >
        <b-dropdown-item
          v-on:click="$emit('LocationChanged', index)"
          :disabled="locationIndex == index"
          v-for="(location, index) in locations"
          :key="index"
        >{{location}}</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item :active="true" v-if="locations.length == 1">{{locations[0]}}</b-nav-item>
      <b-nav-item v-on:click="removeJwt" to="/login">Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      locations: ["Weston Home"]
    };
  },
  props: {
    locationIndex: Number
  },
  methods: {
    removeJwt() {
      localStorage.removeItem("token");
    }
  }
};
</script>
<style>
a {
  color: #f4f4f4 !important;
}
.dropdown-item {
  color: black !important;
}
.dropdown-item.disabled {
  color: grey !important;
}
.active {
  color: grey !important;
}
</style>