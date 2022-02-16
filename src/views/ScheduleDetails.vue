<template>
  <div class="row pl-5">
    <div class="col-9">
      <h1 style="text-align: center" class="pb-3">ثالث برمجيات صباحي</h1>

      <table>
        <thead>
          <tr>
            <th></th>
            <th v-for="period in schedule.periods" :key="period.id">
              {{ formatPeriod(period.start_time) }} -
              {{ formatPeriod(period.end_time) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in schedule.days" :key="day.id">
            <td>
              <h2>{{ day.name }}</h2>
            </td>
            <td v-for="period in schedule.periods" :key="period.id">
              <CardScheduleDetails :card="getCard(period.id, day.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-3">
      <CardDetails />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import types from "@/CardTypes";
import formatPeriod from "@/utils/DateTimeUtils";
import CardScheduleDetails from "@/components/CardScheduleDetails.vue";
import CardDetails from "@/components/CardDetails.vue";
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
    formatPeriod,
  },
  components: { CardScheduleDetails, CardDetails },
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");
th {
  padding: 5px;
}
td {
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: middle;
  width: 12.5%;

  height: 16.666666666666668%;
  vertical-align: middle;
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

h2,
h1 {
  font-family: "Tajawal", sans-serif !important;
}

table {
  height: 50%;
}
</style>