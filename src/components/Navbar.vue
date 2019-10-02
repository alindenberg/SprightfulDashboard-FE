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
        :text="locations[locationIndex].name"
        toggle-class="link_span"
      >
        <b-dropdown-item
          v-on:click="$emit('LocationChanged', location.id)"
          :disabled="location.id == locationId"
          v-for="location in locations"
          :key="location.id"
        >{{location.name}}</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item :active="true" v-if="locations.length == 1">{{locations[0].name}}</b-nav-item>
      <b-nav-item v-on:click="removeJwt" to="/login">Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar",
  props: {
    locationId: String,
    locations: Array
  },
  methods: {
    removeJwt() {
      localStorage.removeItem("token");
    }
  },
  watch: {
    locations: function() {
      console.log("Locations updated to ", this.locations);
    },
    locationId: function() {
      console.log("Location id updated to ", this.locationId);
    }
  },
  created() {
    console.log("Locations are ", this.locations);
  },
  computed: {
    locationIndex: function() {
      for (let i = 0; i < this.locations.length; i++) {
        if (this.locationId == this.locations[i].id) {
          return i;
        }
      }
      return 0;
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