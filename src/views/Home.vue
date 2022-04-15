<template>
  <v-row>
    <v-col lg="3" sm="12">
      <CardDetails
        :card="selectedCard"
        :day="selectedDay"
        :period="selectedPeriod"
        class="test"
      />

      <v-autocomplete
        :items="schedules.stages"
        label="جدول المراحل"
        item-text="name"
        item-value="id"
        @change="onStageChange"
        v-model="stage_id"
        filled
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
        class="select-item-text"
      />
      <v-autocomplete
        filled
        :items="schedules.subjects"
        label="جدول المواد"
        item-text="name"
        item-value="id"
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
        class="select-item-text"
        @change="onRoomChange"
        v-model="room_id"
      />
    </v-col>
    <v-col lg="9" sm="12">
      <p style="font-size: 40px">
        {{ schedule.item.name }}
      </p>

      <TimeTable :schedule="schedule" @onCardClick="onCardClick" />
      <v-row class="mt-1">
        <v-btn
          rounded
          class="secondary"
          :loading="downloadLoading"
          @click="download"
        >
          Download
          <v-icon medium>mdi-tray-arrow-down</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn rounded class="secondary" @click="saveSchedule">
          save timetable
          <v-icon medium>mdi-content-save</v-icon>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import CardDetails from "@/components/CardDetails.vue";
import {
  ScheduleDetails,
  DaySchedule,
  PeriodSchedule,
  CardScheduleDetails as CardSchedule,
} from "@/client";
import { formatPeriod } from "@/utils/DateTimeUtils";
import { BASE_URL } from "@/utils/config";
import { MY_SCHEDULE } from "@/utils/keys";
import { downloadImage } from "@/utils/download";
import addHashToLocation from "@/utils/route";
import TimeTable from "@/components/TimeTable.vue";
export default Vue.extend({
  data() {
    return {
      stage_id: null as any,
      teacher_id: null as any,
      subject_id: null as any,
      room_id: null as any,

      downloadLoading: false,

      selectedCard: null as any,
      selectedDay: null as any,
      selectedPeriod: null as any,

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
      subject_id?: string | null,
      room_id?: string | null
    ) {
      axios
        .get(`${BASE_URL}/schedule/`, {
          params: {
            stage_id: stage_id,
            teacher_id: teacher_id,
            subject_id: subject_id,
            room_id: room_id,
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
      this.addHashToLocation(`?stage_id=${stage_id}`);
    },
    onTeacherChange(teacher_id: string) {
      this.getSchedule(null, teacher_id);
      this.addHashToLocation(`?teacher_id=${teacher_id}`);
    },
    onSubjectChange(subject_id: string) {
      this.getSchedule(null, null, subject_id);
      this.addHashToLocation(`?subject_id=${subject_id}`);
    },
    onRoomChange(room_id: string) {
      this.getSchedule(null, null, null, room_id);
      this.addHashToLocation(`?room_id=${room_id}`);
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
    async download() {
      this.downloadLoading = true;

      await axios
        .get(`${BASE_URL}/schedule/image`, {
          params: {
            stage_id: this.stage_id,
            teacher_id: this.teacher_id,
            subject_id: this.subject_id,
            classroom_id: this.room_id,
          },
        })
        .then(async (response) => {
          await downloadImage(response.data.url, this.schedule.item.name);
        });
      this.downloadLoading = false;
    },

    formatPeriod,
    addHashToLocation,
  },
  components: { CardDetails, TimeTable },
});
</script>
<style  scoped>
.test {
  margin-top: 75px;
  position: relative;
}
</style>