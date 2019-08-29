<template>
  <b-navbar variant="light">
    <b-navbar-nav>
      <b-nav-item :active="$route.path =='/'" to="/">Home</b-nav-item>
      <b-nav-item :active="$route.path == '/bills'" to="/bills">Bills</b-nav-item>
      <b-nav-item :active="$route.path == '/controls'" to="/controls">Controls</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar"
};
</script>