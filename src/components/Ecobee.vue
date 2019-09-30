<template>
  <b-row>
    <b-col class="col-12" style="margin-top: 1%">
      <h3 style="float: left">Ecobee Climates</h3>
    </b-col>
    <b-col class="justify-content-center" style="margin-bottom: 2%">
      <b-row class="justify-content-center align-items-center">
        <h4 style="margin-right: 5%">Home:</h4>
        <b-row>
          <button
            type="button"
            style="color: grey"
            class="btn btn-link btn-lg"
            v-on:click="home_temperature--"
          >
            <span class="fa fa-minus" />
          </button>
          <h1>{{home_temperature}}</h1>
          <button
            type="button"
            style="color: grey"
            class="btn btn-link btn-lg"
            v-on:click="home_temperature++"
          >
            <span class="fa fa-plus" />
          </button>
        </b-row>
      </b-row>
      <b-row class="justify-content-center align-items-center">
        <h4 style="margin-right: 5%">Away:</h4>
        <b-row>
          <button
            type="button"
            style="color: grey"
            class="btn btn-link btn-lg"
            v-on:click="away_temperature--"
          >
            <span class="fa fa-minus" />
          </button>
          <h1>{{away_temperature}}</h1>
          <button
            type="button"
            style="color: grey"
            class="btn btn-link btn-lg"
            v-on:click="away_temperature++"
          >
            <span class="fa fa-plus" />
          </button>
        </b-row>
      </b-row>
      <b-row class="justify-content-center align-items-center">
        <h4 style="margin-right: 5%">Sleep:</h4>
        <b-row>
          <button
            type="button"
            style="color: grey"
            class="btn btn-link btn-lg"
            v-on:click="sleep_temperature--"
          >
            <span class="fa fa-minus" />
          </button>
          <h1>{{sleep_temperature}}</h1>
          <button
            type="button"
            style="color: grey"
            class="btn btn-link btn-lg"
            v-on:click="sleep_temperature++"
          >
            <span class="fa fa-plus" />
          </button>
        </b-row>
      </b-row>
      <b-row v-if="changesMade" class="justify-content-center" style="background-color: yellow">
        <button
          type="button"
          style="color: red"
          class="btn btn-link btn-lg"
          v-on:click="removeChanges"
        >
          <span class="fa fa-times" />
        </button>
        <button
          type="button"
          style="color: green"
          class="btn btn-link btn-lg"
          v-on:click="saveChanges"
        >
          <span class="fa fa-check" />
        </button>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "EcobeeModule",
  data() {
    return {
      home_ecobee_temperature: 78,
      home_temperature: 78,
      away_ecobee_temperature: 80,
      away_temperature: 80,
      sleep_ecobee_temperature: 72,
      sleep_temperature: 72
    };
  },
  computed: {
    changesMade: function() {
      return (
        this.home_ecobee_temperature != this.home_temperature ||
        this.away_ecobee_temperature != this.away_temperature ||
        this.sleep_ecobee_temperature != this.sleep_temperature
      );
    }
  },
  methods: {
    saveChanges() {
      this.home_ecobee_temperature = this.home_temperature;
      this.sleep_ecobee_temperature = this.sleep_temperature;
      this.away_ecobee_temperature = this.away_temperature;
    },
    removeChanges() {
      this.home_temperature = this.home_ecobee_temperature;
      this.away_temperature = this.away_ecobee_temperature;
      this.sleep_temperature = this.sleep_ecobee_temperature;
    }
  }
};
</script>