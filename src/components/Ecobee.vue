<template>
  <div class="card">
    <div class="card-header">
      <h3 style="float: left">Ecobee</h3>
    </div>
    <b-row class="card-body justify-content-center">
      <b-row class="flex-nowrap">
        <button
          type="button"
          style="color: grey"
          class="btn btn-link btn-lg"
          v-on:click="display_temperature--"
        >
          <span class="fa fa-minus" />
        </button>
        <h1>{{display_temperature}}</h1>
        <button
          type="button"
          style="color: grey"
          class="btn btn-link btn-lg"
          v-on:click="display_temperature++"
        >
          <span class="fa fa-plus" />
        </button>
      </b-row>
      <b-row v-if="display_temperature != ecobee_temperature" class="w-100 justify-content-center">
        <button
          type="button"
          style="color: red"
          class="btn btn-link btn-lg"
          v-on:click="display_temperature = ecobee_temperature"
        >
          <span class="fa fa-times" />
        </button>
        <button
          type="button"
          style="color: green"
          class="btn btn-link btn-lg"
          v-on:click="save_temperature"
        >
          <span class="fa fa-check" />
        </button>
      </b-row>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "EcobeeModule",
  data() {
    return {
      ecobee_temperature: 78,
      display_temperature: 78
    };
  },
  methods: {
    save_temperature() {
      console.log(
        `Updating ecobee temperature to ${this.display_temperature} from ${this.ecobee_temperature}`
      );
      this.ecobee_temperature = this.display_temperature;
    }
  }
};
</script>