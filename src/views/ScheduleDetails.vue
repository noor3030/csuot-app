<template>
  <v-container style="height: 100%; width: 100%">
    <table height="100%" width="100%">
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
          <td v-for="period in schedule.periods" :key="period.id">
            <CardScheduleDetails :card="getCard(period.id, day.id)" />
          </td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import types from "@/CardTypes";
import CardScheduleDetails from "@/components/CardScheduleDetails.vue";
export default Vue.extend({
  data() {
    return {
      id: "",
      schedule: {} as types.Schedule,
    };
  },
  created() {
    this.id = this.$route.params.id;
    axios
      .get(`https://csuot.herokuapp.com/v1/schedule/stage/${this.id}`)
      .then((response) => {
        this.schedule = response.data;

        console.log(this.schedule.periods);
      });
  },
  methods: {
    getCard(period_id: string, day_id: string) {
      for (let card of this.schedule.cards) {
        if (card.period_id === period_id && card.day_id === day_id) return card;
      }
    },
  },
  components: { CardScheduleDetails },
});
</script>
<style scoped>
td {
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: middle;
  vertical-align: middle;
}
tr {
  display: table-row;
  height: 1px;
  vertical-align: inherit;
  border-color: inherit;
}
</style>