<template>
  <v-container style="height: 100%; width: 100%">
    <v-select
      :items="schedule.stages"
      label="Stage"
      item-text="name"
      item-value="id"
      v-on:change="changeStageId"
    ></v-select>

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
          <td v-for="period in schedule.periods" :key="period.id">
            <CardSchedule
              v-if="getCard(period.id, day.id, stage_id) != null"
              :card="getCard(period.id, day.id, stage_id)"
              :teachers="schedule.teachers"
              :subjects="schedule.subjects"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import types from "@/ScheduleType";
import CardSchedule from "@/components/CardSchedule.vue";
export default Vue.extend({
  data() {
    return {
      schedule: {} as types.Schedule,

      stage_id: "",
    };
  },
  async created() {
    await axios
      .get("https://csuot.herokuapp.com/v1/schedule/")
      .then((response) => {
        this.schedule = response.data as types.Schedule;
        this.changeStageId(this.schedule.stages[0].id)
      });
  },
  methods: {
    getCard(period_id: string, day_id: string, stage_id: string) {
      for (let card of this.schedule.cards) {
        if (
          card.period_id === period_id &&
          card.day_id === day_id &&
          card.lesson.stage_id == stage_id
        ) {
          return card;
        }
      }
    },
    changeStageId(id: string) {
      this.stage_id = id;
      console.log(this.stage_id);
    },
  },
  components: { CardSchedule },
});
</script>

<style>
table {
  border: 1px solid #ddd;
  border-collapse: separate;
  border-left: 0;
  border-radius: 10px;
  border-spacing: 0px;
  width: 100%;
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