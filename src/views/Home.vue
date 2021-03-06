<template>
  <v-row class="ma-4">
    <v-snackbar v-model="saveSnackbar">
      {{
        $vuetify.lang.t("$vuetify.saveAsYourSchedule", schedule.item.name || "")
      }}
    </v-snackbar>

    <v-snackbar v-model="showCopyMessage">
      {{ $vuetify.lang.t("$vuetify.copyUrlMessage") }}
    </v-snackbar>
    <v-col lg="9" sm="12">
      <v-row
        style="cursor: pointer"
        @mouseover="copyTitle = true"
        @mouseleave="copyTitle = false"
        justify="center"
        @click="copyTableUrl"
      >
        <v-slide-x-transition>
          <v-icon v-show="copyTitle">mdi-content-copy</v-icon>
        </v-slide-x-transition>

        <p style="font-size: 35px">
          {{ schedule.item.name }}
        </p>
      </v-row>

      <TimeTable :schedule="schedule" @onCardClick="onCardClick" />
      <v-row class="mt-2 px-3">
        <v-btn
          rounded
          class="secondary"
          :loading="downloadLoading"
          @click="download"
        >
          {{ $vuetify.lang.t("$vuetify.download") }}
          <v-icon medium>mdi-tray-arrow-down</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn rounded class="secondary" @click="saveSchedule">
          {{ $vuetify.lang.t("$vuetify.saveMySchedule") }}
          <v-icon medium>mdi-content-save</v-icon>
        </v-btn>
      </v-row>
    </v-col>
    <v-col lg="3" sm="12" :class="{ 'skip-title': $vuetify.breakpoint.lg }">
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
        :label="$vuetify.lang.t('$vuetify.stagesSchedule')"
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
        :label="$vuetify.lang.t('$vuetify.teachersSchedule')"
        item-text="name"
        item-value="id"
      />
      <v-autocomplete
        filled
        :items="schedules.subjects"
        :label="$vuetify.lang.t('$vuetify.subjectsSchedule')"
        item-text="name"
        item-value="id"
        @change="onSubjectChange"
        v-model="subjectId"
      />
      <v-autocomplete
        filled
        :items="schedules.classrooms"
        :label="$vuetify.lang.t('$vuetify.classroomsSchedule')"
        item-text="name"
        item-value="id"
        @change="onRoomChange"
        v-model="classroomId"
      />
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
import { addIdToUrl } from "@/utils/route";
import TimeTable from "@/components/TimeTable.vue";
export default Vue.extend({
  data() {
    return {
      stageId: null as any,
      teacherId: null as any,
      subjectId: null as any,
      classroomId: null as any,

      saveSnackbar: false,
      showCardDetails: false,
      downloadLoading: false,

      selectedCard: null as any,
      selectedDay: null as any,
      selectedPeriod: null as any,
      showCopyMessage: false as boolean,
      copyTitle: false as boolean,

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
      this.saveSnackbar = true;
      localStorage.setItem(MY_SCHEDULE, JSON.stringify(this.schedule));
    },
    copyUrl(_path: string): void {
      navigator.clipboard.writeText(_path);
    },
    copyTableUrl() {
      this.showCopyMessage = true;
      const path: string = this.addIdToUrl(this, this.schedule.item);
      this.copyUrl(`${window.location.origin}${path}`);
    },
    async getSchedule(
      stageId?: string | null,
      teacherId?: string | null,
      subjectId?: string | null,
      classroomId?: string | null
    ) {
      this.stageId = stageId;
      this.teacherId = teacherId;
      this.subjectId = subjectId;
      this.classroomId = classroomId;
      await axios
        .get(`${BASE_URL}/schedule/`, {
          params: {
            stage_id: stageId,
            teacher_id: teacherId,
            subject_id: subjectId,
            classroom_id: classroomId,
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

    async onStageChange(stageId: string) {
      await this.getSchedule(stageId);
      this.addIdToUrl(this, this.schedule.item);
    },
    async onTeacherChange(teacherId: string) {
      await this.getSchedule(null, teacherId);
      this.addIdToUrl(this, this.schedule.item);
    },
    async onSubjectChange(subjectId: string) {
      await this.getSchedule(null, null, subjectId);
      this.addIdToUrl(this, this.schedule.item);
    },
    async onRoomChange(roomId: string) {
      await this.getSchedule(null, null, null, roomId);
      this.addIdToUrl(this, this.schedule.item);
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

    addIdToUrl,
  },
  components: { CardDetails, TimeTable },
});
</script>
<style  scoped>
.skip-title {
  margin-top: 70px;
}
</style>