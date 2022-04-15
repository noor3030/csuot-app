<template>
  <v-row class="ma-4">
    <v-col lg="3" sm="12" :class="{ 'skip-title': $vuetify.breakpoint.lg }" >
      <v-bottom-sheet
        v-if="$vuetify.breakpoint.smAndDown"
        hide-overlay
        persistent
        v-model="showCardDetails"
      >
        <v-card>
          <v-card-actions>
            <v-btn
              align="end"
              outlined
              large
              fab
              @click="showCardDetails = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>

          <CardDetails
            :card="selectedCard"
            :day="selectedDay"
            :period="selectedPeriod"
          />
        </v-card>
      </v-bottom-sheet>
      <CardDetails
        v-else
        :card="selectedCard"
        :day="selectedDay"
        :period="selectedPeriod"
        class="mb-4"
      />

      <v-autocomplete
        :items="schedules.stages"
        label="جدول المراحل"
        item-text="name"
        item-value="id"
        @change="onStageChange"
        v-model="stageId"
        filled
      />
      <v-autocomplete
        @change="onTeacherChange"
        v-model="teacherId"
        filled
        :items="schedules.teachers"
        label="جدول الاساتذة"
        item-text="name"
        item-value="id"
      />
      <v-autocomplete
        filled
        :items="schedules.subjects"
        label="جدول المواد"
        item-text="name"
        item-value="id"
        @change="onSubjectChange"
        v-model="subjectId"
      />
      <v-autocomplete
        filled
        :items="schedules.classrooms"
        label="جدول الغرف"
        item-text="name"
        item-value="id"
        @change="onRoomChange"
        v-model="classroomId"
      />
    </v-col>
    <v-col lg="9" sm="12">
      <p style="font-size: 40px">
        {{ schedule.item.name }}
      </p>

      <TimeTable :schedule="schedule" @onCardClick="onCardClick" />
      <v-row class="mt-2 px-3">
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
import { BASE_URL } from "@/utils/config";
import { MY_SCHEDULE } from "@/utils/keys";
import { downloadImage } from "@/utils/download";
import addHashToLocation from "@/utils/route";
import TimeTable from "@/components/TimeTable.vue";
export default Vue.extend({
  data() {
    return {
      stageId: null as any,
      teacherId: null as any,
      subjectId: null as any,
      classroomId: null as any,

      showCardDetails: false,
      downloadLoading: false,

      selectedCard: null as any,
      selectedDay: null as any,
      selectedPeriod: null as any,

      schedule: {} as ScheduleDetails,
      schedules: {} as any,
    };
  },
  created() {
    this.stageId = this.$route.query.stage_id;
    this.teacherId = this.$route.query.teacher_id;
    this.subjectId = this.$route.query.subject_id;
    this.classroomId = this.$route.query.classroomId;

    this.getAll();
    this.getCurrentSchedule(this.stageId);
  },
  methods: {
    saveSchedule() {
      localStorage.setItem(MY_SCHEDULE, JSON.stringify(this.schedule));
    },
    getSchedule(
      stage_id?: string | null,
      teacher_id?: string | null,
      subject_id?: string | null,
      room_id?: string | null
    ) {
      this.stageId = stage_id;
      this.teacherId = teacher_id;
      this.subjectId = subject_id;
      this.classroomId = room_id;
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
      this.showCardDetails = true;
    },
    async download() {
      this.downloadLoading = true;

      await axios
        .get(`${BASE_URL}/schedule/image`, {
          params: {
            stage_id: this.stageId,
            teacher_id: this.teacherId,
            subject_id: this.subjectId,
            classroom_id: this.classroomId,
          },
        })
        .then(async (response) => {
          await downloadImage(response.data.url, this.schedule.item.name);
        });
      this.downloadLoading = false;
    },

    addHashToLocation,
  },
  components: { CardDetails, TimeTable },
});
</script>
<style  scoped>
.skip-title {
  margin-top: 75px; 
}
</style>