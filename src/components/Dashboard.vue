<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <neurio-data class="col-sm" v-bind="neurio_data"></neurio-data>
    <fpl-data class="col-sm" v-bind="fpl_data"></fpl-data>
  </div>
</template>

<script>
import axios from "axios";
import NeurioData from "./NeurioData";
import FplData from "./FplData";
export default {
  name: "Dashboard",
  components: {
    "neurio-data": NeurioData,
    "fpl-data": FplData
  },
  data() {
    return {
      neurio_data: {},
      fpl_data: {}
    };
  },
  created() {
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/locations/f8128cc4-6c70-4458-9f1f-b1d185f3014e/fpl_info`,
        {
          method: "GET"
        }
      )
      .then(res => {
        this.fpl_data = res.data;
        this.get_neurio_data(res.data.readingFrom, res.data.readingTo);
      });
  },
  methods: {
    get_neurio_data(start, end) {
      axios
        .get(
          `${process.env.VUE_APP_API_URL}/locations/f8128cc4-6c70-4458-9f1f-b1d185f3014e/neurio_info?start=${start}&end=${end}`,
          {
            method: "GET"
          }
        )
        .then(res => {
          console.log("NEURIO RESPONSE DATA ", res.data);
          this.neurio_data = {
            readingFrom: start,
            readingTo: end,
            ...res.data
          };
        });
    }
  }
};
</script>

<style scoped>
</style>