<template>
  <b-row style="height: 60vh">
    <b-col
      sm="12"
      class="d-flex flex-column align-items-center justify-content-center"
      style="height: 100%"
    >
      <h1>Sprightful Dashboard</h1>
      <div style="margin-top: 5%; width: 60%;" class="d-flex flex-column align-items-center">
        <h5 v-if="error" style="color: red">Error: {{error}}</h5>
        <input
          style="max-width: 440px"
          type="text"
          v-model="email"
          class="form-control"
          placeholder="Email"
        />
        <input
          style="max-width: 440px; margin-top: 2%"
          type="password"
          v-model="password"
          class="form-control"
          placeholder="Password"
        />
        <button
          type="button"
          class="btn btn-lg btn-link"
          :disabled="!email || !password"
          v-on:click="login"
        >Login</button>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      error: null,
      email: null,
      password: null
    };
  },
  methods: {
    login() {
      this.error = null;
      axios
        .post(`${process.env.VUE_APP_API_URL}/users/login`, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          const token = response.data.jwt;
          // default axios header for authorization
          axios.defaults.headers.common["jwt"] = token;
          // Start session
          this.$session.start();
          this.$session.set("jwt", token);
          this.$session.set("userId", response.data.user_id);
          // emit logged in event, app will load location data and route to dashboard
          this.$emit("loggedIn", response.data.user_id);
          this.$router.push("/");
        })
        .catch(err => {
          if (err.response != undefined) {
            this.error = err.response.data.error;
          } else {
            this.error = err;
          }
        });
    }
  }
};
</script>