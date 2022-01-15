<template>
  <v-container style="height: 100%; width: 100%">
    <v-select :items="items" label="Standard"></v-select>

    <table height="80%">
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
            <div v-if="getCard(period.id, day.id, stage_id) != null">
              <p>
                {{
                  getTeacher(
                    getCard( 
                      period.id,
                      day.id,

                      stage_id
                    ).lesson.teacher_id
                  ).name
                }}
              </p>
            </div>
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

export default Vue.extend({
  data() {
    return {
      schedule: {} as types.Schedule,
      teachers: [] as types.Teacher[],
      days: [],
      periods: [],
      cards: [],
      stage_id: "5cd879ce-eafd-4997-8c91-b55df74563a1",
    };
  },
  async created() {
    await axios
      .get("https://csuot.herokuapp.com/v1/schedule/")
      .then((response) => {
        this.schedule = response.data;
        this.days = response.data.days;
        this.teachers = response.data.teachers as types.Teacher[];
        this.periods = response.data.periods;
        this.cards = response.data.cards;
      });
  },
  methods: {
    getTeacher(id: string) {
      for (let i of this.teachers) {
        console.log(i);
        if (i.id == id) {
          return i;
        }
      }
    },
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
  },
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