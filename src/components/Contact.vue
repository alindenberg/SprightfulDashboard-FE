<template>
  <div class="card">
    <div class="card-header">
      <h3 style="float: left">Contact us</h3>
    </div>
    <b-row class="card-body">
      <b-col>
        <div style="display: block; margin-bottom: 2%">
          <textarea id="textarea" class="form-control" aria-label="With textarea"></textarea>
          <button
            style="margin-top: 2%"
            type="submit"
            v-on:click="submit"
            class="btn btn-primary"
          >Submit</button>
        </div>
        <label style="color: red" v-if="error">Error: {{error}}</label>
        <label v-if="message">{{message}}</label>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "Contact",
  data() {
    return {
      message: null,
      error: null
    };
  },
  methods: {
    submit() {
      let text = document.getElementById("textarea");
      if (text.value.length > 0) {
        text.value = "";
        this.display_message("Message Sent!");
      } else {
        this.display_error("Cannot send blank message");
      }
    },
    display_message(msg) {
      this.message = msg;
      let vm = this;
      setTimeout(function() {
        vm.message = null;
      }, 4000);
    },
    display_error(err) {
      this.error = err;
      let vm = this;
      setTimeout(function() {
        vm.error = null;
      }, 4000);
    }
  }
};
</script>