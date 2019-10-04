<template>
  <b-row>
    <b-col class="col-12">
      <h3 style="float: left; margin-top: 1%">Account</h3>
    </b-col>
    <b-col class="col-12">
      <h6 style="color: red" v-if="errorMessage != null">
        Error:
        <i>{{errorMessage}}</i>
      </h6>
      <h6 v-if="successMessage != null">
        <i>{{successMessage}}</i>
      </h6>
    </b-col>
    <b-col
      v-if="!(changeEmail || changePassword) && email != null"
      class="d-flex flex-column align-items-center"
      style="margin-bottom: 2%"
    >
      <div style="width: 80%">
        <b-row class="align-items-center justify-content-between text-nowrap">
          <span>Email: {{email}}</span>
          <button type="button" class="btn btn-link" v-on:click="changeEmail = true">Change Email</button>
        </b-row>
        <b-row class="align-items-center justify-content-between text-nowrap">
          <span>Password: **********</span>
          <button
            type="button"
            class="btn btn-link"
            v-on:click="changePassword = true"
          >Change Password</button>
        </b-row>
        <!-- location list -->
        <b-row
          class="align-items-center justify-content-between text-nowrap"
          v-for="location in locations"
          :key="location.location_id"
        >
          <span>{{location.name}}</span>
          <button type="button" class="btn btn-link">Edit Location</button>
        </b-row>
      </div>
    </b-col>
    <!-- Loading -->
    <b-col class="d-flex flex-column align-items-center" v-if="email == null">
      <h2>Loading...</h2>
    </b-col>
    <!-- Change email -->
    <b-col v-if="changeEmail" class="d-flex flex-column align-items-center">
      <input
        style="width: 60%"
        type="text"
        id="email_input"
        class="form-control"
        placeholder="New Email"
      />
      <b-row class="align-items-center justify-content-center">
        <button type="button" class="btn btn-lg btn-link" v-on:click="saveEmail">Save</button>
        <button type="button" class="btn btn-lg btn-link" v-on:click="changeEmail=false">Cancel</button>
      </b-row>
    </b-col>
    <!-- Change Password -->
    <b-col v-if="changePassword" class="d-flex flex-column align-items-center">
      <input
        style="width: 60%"
        type="password"
        id="password_input"
        placeholder="New Password"
        class="form-control"
      />
      <input
        style="width: 60%; margin-top: 2%"
        type="password"
        id="confirm_password_input"
        class="form-control"
        placeholder="Confirm Password"
      />
      <b-row class="align-items-center justify-content-center">
        <button type="button" class="btn btn-lg btn-link" v-on:click="savePassword">Save</button>
        <button type="button" class="btn btn-lg btn-link" v-on:click="changePassword=false">Cancel</button>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import axios from "axios";
export default {
  name: "AccountSettings",
  data() {
    return {
      locations: [],
      changeEmail: false,
      changePassword: false,
      errorMessage: null,
      successMessage: null
    };
  },
  props: {
    email: String
  },
  watch: {
    email: function() {}
  },
  created() {
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/locations?userId=${this.$session.get(
          "userId"
        )}`
      )
      .then(res => {
        this.locations = res.data;
      });
  },
  methods: {
    saveEmail() {
      this.errorMessage = null;

      const email = document.getElementById("email_input").value;

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      const validEmail = emailRegex.test(email);

      if (validEmail) {
        // logic to update email
        axios
          .put(
            `${process.env.VUE_APP_API_URL}/users/${this.$session.get(
              "userId"
            )}/email`,
            {
              email: email
            }
          )
          .then(res => {
            if (res.status == 200) {
              this.setSuccessMessage("Successfully updated email");
              this.email = email;
              this.changeEmail = false;
            }
          })
          .catch(err => {
            this.setErrorMessage(`Error changing email: ${err}`);
          });
      } else {
        this.setErrorMessage("Invalid email entered!");
      }
    },
    savePassword() {
      const newPassword = document.getElementById("password_input").value;
      const confirmPassword = document.getElementById("confirm_password_input")
        .value;

      if (newPassword != confirmPassword) {
        this.setErrorMessage("Passwords do not match");
      } else if (newPassword.length < 8) {
        this.setErrorMessage("Password must be at least 8 characters long");
      } else {
        // logic to update password
        this.setSuccessMessage("Successfully updated password");
        this.changePassword = false;
      }
    },
    setErrorMessage(msg) {
      this.errorMessage = msg;
      let vm = this;
      setTimeout(function() {
        vm.errorMessage = null;
      }, 3000);
    },
    setSuccessMessage(msg) {
      this.successMessage = msg;
      let vm = this;
      setTimeout(function() {
        vm.successMessage = null;
      }, 3000);
    }
  }
};
</script>