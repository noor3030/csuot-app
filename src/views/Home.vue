<template>
  <div class="row px-7 py-14">
    <div class="col-lg-3 col-sm-12">
      <CardDetails
        :card="selectedCard"
        :day="selectedDay"
        :period="selectedPeriod"
        class="test"
      />

      <div class="pt-5">
        <v-autocomplete
          :items="schedules.stages"
          label="جدول المراحل"
          item-text="name"
          item-value="id"
          @change="onStageChange"
          v-model="stage_id"
          filled
          color="var(--on-surface-variant)"
          background-color="var(--surface-background)"
          item-color="var(--on-surface-variant)"
          class="select-item-text"
        />
        <v-autocomplete
          @change="onTeacherChange"
          v-model="teacher_id"
          filled
          :items="schedules.teachers"
          label="جدول الاساتذة"
          item-text="name"
          item-value="id"
          color="var(--on-surface-variant)"
          background-color="var(--surface-background)"
          item-color="var(--on-surface-variant)"
          class="select-item-text"
        />
        <v-autocomplete
          filled
          :items="schedules.subjects"
          label="جدول المواد"
          item-text="name"
          item-value="id"
          color="var(--on-surface-variant)"
          background-color="var(--surface-background)"
          item-color="var(--on-surface-variant)"
          class="select-item-text"
          @change="onSubjectChange"
          v-model="subject_id"
        />
        <v-autocomplete
          filled
          :items="schedules.classrooms"
          label="جدول الغرف"
          item-text="name"
          item-value="id"
          color="var(--on-surface-variant)"
          background-color="var(--surface-background)"
          item-color="var(--on-surface-variant)"
          class="select-item-text"
        />
      </div>
    </div>
    <div class="col-lg-9 col-sm-12">
      <p style="color: var(--on-background); font-size: 40px">
        {{ schedule.item.name }}
      </p>

      <TimeTable :schedule="schedule" @onCardClick="onCardClick" />
      <MySchedule @clicked2="saveSchedule" />
      <FabDownload />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import CardDetails from "@/components/CardDetails.vue";
import FabDownload from "@/components/FabDownload.vue";
import MySchedule from "@/components/MySchedule.vue";
import {
  ScheduleDetails,
  DaySchedule,
  PeriodSchedule,
  CardScheduleDetails as CardSchedule,
} from "@/client";
import formatPeriod from "@/utils/DateTimeUtils";
import { BASE_URL } from "@/utils/config";
import { MY_SCHEDULE } from "@/utils/keys";
import addHashToLocation from "@/utils/route";
import TimeTable from "@/components/TimeTable.vue";
export default Vue.extend({
  data() {
    return {
      stage_id: null as any,
      teacher_id: null as any,
      subject_id: null as any,

      selectedCard: null as null | CardSchedule,
      selectedDay: null as null | DaySchedule,
      selectedPeriod: null as null | PeriodSchedule,

      schedule: {} as ScheduleDetails,
      schedules: {} as any,
    };
  },
  created() {
    this.stage_id = this.$route.query.stage_id;
    this.teacher_id = this.$route.query.teacher_id;
    this.subject_id = this.$route.query.subject_id;

    this.getAll();
    this.getCurrentSchedule(this.stage_id);
  },
  methods: {
    saveSchedule() {
      localStorage.setItem(MY_SCHEDULE, JSON.stringify(this.schedule));
      console.log("my");
    },
    getSchedule(
      stage_id?: string | null,
      teacher_id?: string | null,
      subject_id?: string | null
    ) {
      axios
        .get(`${BASE_URL}/schedule/`, {
          params: {
            stage_id: stage_id,
            teacher_id: teacher_id,
            subject_id: subject_id,
          },
        })
        .then((response) => {
          this.schedule = response.data;
          this.selectedCard = null;
        });
    },
    getCurrentSchedule(id: string) {
      if (id != null) {
        this.getSchedule(id);
      } else if (localStorage.getItem(MY_SCHEDULE) != null) {
        this.schedule = JSON.parse(localStorage.getItem(MY_SCHEDULE)!);
      } else {
        this.getSchedule(id);
      }
    },

    onStageChange(stage_id: string) {
      this.getSchedule(stage_id);
      this.teacher_id = null;
      this.subject_id = null;
      this.addHashToLocation(`?stage_id=${stage_id}`);
    },

    onTeacherChange(teacher_id: string) {
      this.getSchedule(null, teacher_id);
      this.stage_id = null;
      this.subject_id = null;
      this.addHashToLocation(`?teacher_id=${teacher_id}`);
    },
    onSubjectChange(subject_id: string) {
      this.getSchedule(null, null, subject_id);
      this.stage_id = null;
      this.teacher_id = null;
      this.addHashToLocation(`?subject_id=${subject_id}`);
    },
    getAll() {
      axios.get(`${BASE_URL}/schedule/all`).then((response) => {
        this.schedules = response.data;
      });
    },
    onCardClick(card: CardSchedule, day: DaySchedule, period: PeriodSchedule) {
      this.selectedCard = card;
      this.selectedDay = day;
      this.selectedPeriod = period;
    },

    formatPeriod,
    addHashToLocation,
  },
  components: { CardDetails, FabDownload, MySchedule, TimeTable },
});
</script>
<style  scoped>
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");

h2,
th,
p {
  font-family: "Tajawal", sans-serif !important;
  text-align: center;
  color: var(--on-background);
}

.test {
  margin-top: 75px;
  position: relative;
}
.tertiary--text {
  color: var(--on-tertiary) !important;
  caret-color: var(--on-tertiary) !important;
}
.v-label .v-label--active {
  color: red !important;
}
</style>