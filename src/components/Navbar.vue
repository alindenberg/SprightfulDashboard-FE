<template>
  <b-navbar class="justify-content-between">
    <b-navbar-nav>
      <b-nav-item :active="$route.path =='/'" to="/">Home</b-nav-item>
      <b-nav-item :active="$route.path == '/bills'" to="/bills">Bills</b-nav-item>
      <b-nav-item :active="$route.path == '/controls'" to="/controls">Controls</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav>
      <b-nav-item-dropdown right :text="locations[selected_location]">
        <b-dropdown-item
          :disabled="selected_location == index"
          v-for="(location, index) in locations"
          :key="index"
          v-on:click="selected_location = index"
        >{{location}}</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      selected_location: 0,
      locations: ["Weston Home", "Gainesville Home"]
    };
  }
};
</script>