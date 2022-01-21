<template>
  <v-container style="height: 100%; width: 100%">
    <table height="80%">
      <thead>
        <tr>
          <th></th>
          <th v-for="period in schedule.periods" :key="period.id">
            {{ period.start_time }} - {{ period.end_time }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="day in schedule.days" :key="day.id">
          <td>{{ day.name }}</td>
          <td v-for="period in schedule.periods" :key="period.id"></td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import types from "@/CardTypes";
export default Vue.extend({
  data() {
    return {
      id: "",
      Schedule: {} as types.Schedule,
    };
  },
  created() {
    this.id = this.$route.params.id;
    axios
      .get(`https://csuot.herokuapp.com/v1/schedule/stage/${this.id}`)
      .then((response) => {
        this.Schedule = response.data;
        console.log(this.Schedule);
      });
  },
});
</script>
