<template>
  <table height="100vh" width="100vh">
    <thead>
      <tr>
        <th></th>
        <th v-for="period in periods" :key="period.id">
          {{ period.start_time }} - {{ period.end_time }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="day in days" :key="day.id">
        <td>{{ day.name }}</td>
        <td v-for="period in periods" :key="period.id">
          <tr v-for="card in cards" :key="card.id">
            <td
              v-if="
                day.id == card.day_id &&
                period.id == card.period_id &&
                card.lesson.stage_id == '25a7f5b9-6f76-47a2-a404-023c371b3ed2'
              "
            >
            
            </td>
          </tr>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

export default Vue.extend({
  data() {
    return {
      schedule: {},
      days: [],
      periods: [],
      cards: [],
    };
  },
  async created() {
    await axios
      .get("https://csuot.herokuapp.com/v1/schedule/")
      .then((response) => {
        this.schedule = response.data;
        this.days = response.data.days;
        this.periods = response.data.periods;
        this.cards = response.data.cards;
      });
  },
});
</script>











  <style >
table {
  border: 1px solid #ddd;
  border-collapse: separate;
  border-left: 0;
  border-radius: 10px;
  border-spacing: 0px;
  width: 100%;
  height: 100%;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  border-collapse: separate;
}

th {
  color: black;
}

tr {
  display: table-row;
  height: 16.666666666666668%;
  vertical-align: inherit;
  border-color: inherit;
}

th,
td {
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: middle;
  vertical-align: middle;
  border-left: 1px solid #ddd;
}

td {
  border-top: 1px solid #ddd;
  text-align: center;
}
</style>