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

      <div class="table-responsive">
        <table class="table table-bordered align-middle">
          <thead>
            <tr>
              <th scope="col"></th>
              <th
                v-for="period in schedule.periods"
                :key="period.id"
                scope="col"
                class="align-middle"
              >
                {{ formatPeriod(period.start_time) }} -
                {{ formatPeriod(period.end_time) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="day in schedule.days" :key="day.id">
              <td class="align-middle td-width" width="12.5%">
                <h2>{{ day.name }}</h2>
              </td>
              <td
                v-for="period in schedule.periods"
                :key="period.id"
                width="12.5%"
                class="align-middle td-width"
                style="vertical-align: middle"
              >
                <CardScheduleDetails
                  :card="getCard(period.id, day.id)"
                  :period="period"
                  :day="day"
                  @clicked="onCardClick"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <MySchedule @clicked2="saveSchedule" />
      <FabDownload />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import CardDetails from "@/components/CardDetails.vue";
import CardScheduleDetails from "@/components/CardScheduleDetails.vue";
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
    getCard(period_id: string, day_id: string): CardSchedule | undefined {
      for (let card of this.schedule.cards) {
        if (card.period_id === period_id && card.day_id === day_id) return card;
      }
    },
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
  components: { CardScheduleDetails, CardDetails, FabDownload, MySchedule },
});
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table {
  width: 100%;
  max-width: 100%;
  border: 1px solid #ddd!important;
  border: 1px solid #ddd!important;
  border-radius: 15px!important;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
  display: table;
  border-collapse: separate;
  box-sizing: border-box;
  text-indent: initial;
  border-spacing: 0px;
}

.table > :not(caption) > * > * {
  padding: 0.5rem 0.5rem;
  border-right: 1px solid #ddd !important;
  border-bottom: 1px solid #ddd !important;
}
h2,
th,
p {
  font-family: "Tajawal", sans-serif !important;
  text-align: center;
  color: var(--on-background);
}
tr {
  border-width: 0 1px;
  border: 1px solid #ddd !important;
  line-height: 20px;
  min-height: 20px;
  height: 20px;
}

tr td {
  padding: 0 !important;
  margin: 0 !important;
  text-align: center;
}
td {
  height: 110px;
}

.v-list {
  background-color: var(--surface-background) !important;
}

@media (max-width: 800px) {
  .td-width {
    min-width: 150px !important;
  }
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