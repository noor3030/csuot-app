<template>
  <v-container style="height: 100%; width: 100%">
    <v-select
      v-model="stage"
      :items="schedule.stages"
      label="Stage"
      item-text="name"
      return-object
      v-on:change="changeStage"
    ></v-select>

    <table height="80%">
     
      <tbody>
        <tr v-for="day in schedule.days" :key="day.id">
          <td>{{ day.name }}</td>
          <td v-for="period in schedule.periods" :key="period.id">
            <CardSchedule
              v-if="getCard(period.id, day.id) != null"
              :card="getCard(period.id, day.id)"
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

      stage: {} as types.Stage,
    };
  },
  async created() {
    await axios
      .get("https://csuot.herokuapp.com/v1/schedule/")
      .then((response) => {
        this.schedule = response.data as types.Schedule;
        this.changeStage(this.schedule.stages[0]);
      });
  },
  methods: {
    getCard(period_id: string, day_id: string) {
      for (let card of this.schedule.cards) {
        let lesson = this.getLesson(card.lesson_id);

        if (
          card.period_id === period_id &&
          card.day_id === day_id &&
          lesson?.stages.includes([{ id: this.stage.id }])
        ) {
          card.lesson = lesson;
        
          return card;
        }
      }
    },
    getLesson(id: string) {
      for (let lesson of this.schedule.lessons) {
        if (lesson.id == id) {
          
          return lesson;
        }
      }
    },
    changeStage(stage: types.Stage) {
      this.stage = stage;
    },
  },
  components: { CardSchedule },
});
</script>

