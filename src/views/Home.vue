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
        <v-select
          :items="schedules.stages"
          :label="schedule.stage.name"
          item-text="name"
          item-value="id"
          v-on:change="onStageChange"
          filled
          color="var(--on-surface-variant)"
          background-color="var(--surface-background)"
          item-color="var(--on-surface-variant)"
          class="select-item-text"
        >
        </v-select>
      </div>
    </div>
    <div class="col-lg-9 col-sm-12">
      <p style="color: var(--on-background); font-size: 40px">
        {{ schedule.stage.name }}
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

      <FabDownload />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import types from "@/CardTypes";
import formatPeriod from "@/utils/DateTimeUtils";
import CardDetails from "@/components/CardDetails.vue";
import CardScheduleDetails from "@/components/CardScheduleDetails.vue";
import FabDownload from "@/components/FabDownload.vue";
import { BASE_URL } from "@/utils/config";
import { MY_SCHEDULE } from "@/utils/keys";
import addHashToLocation from "@/utils/route";

export default Vue.extend({
  data() {
    return {
      stage: {} as types.Stage,
      stage_id: null as any,
      selectedCard: null,
      selectedDay: null,
      selectedPeriod: null,
      schedule: {} as types.Schedule,
      schedules: {} as any,
    };
  },
  created() {
    this.schedule = JSON.parse(localStorage.getItem(MY_SCHEDULE)!);
    this.stage_id = this.$route.query.stage_id;
    this.getSchedule(this.stage_id);
    this.getAll();
  },
  methods: {
    getCard(period_id: string, day_id: string) {
      for (let card of this.schedule.cards) {
        if (card.period_id === period_id && card.day_id === day_id) return card;
      }
    },
    getSchedule(stage_id: string) {
      axios
        .get(`${BASE_URL}/schedule`, {
          params: { stage_id: stage_id, teacher_id: null },
        })
        .then((response) => {
          this.schedule = response.data;
          this.stage = this.schedule.stage;
          this.selectedCard = null;
          localStorage.setItem(MY_SCHEDULE, JSON.stringify(this.schedule));
        });
    },

    onStageChange(stage_id: string) {
      this.getSchedule(stage_id);
      this.addHashToLocation(`?stage_id=${stage_id}`);
    },

    getAll() {
      axios.get(`${BASE_URL}/schedule/all`).then((response) => {
        this.schedules = response.data;
      });
    },
    onCardClick(card: any, day: any, period: any) {
      this.selectedCard = card;
      this.selectedDay = day;
      this.selectedPeriod = period;
    },

    formatPeriod,
    addHashToLocation,
  },
  components: { CardScheduleDetails, CardDetails, FabDownload },
});
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");

h2,
th,
p {
  font-family: "Tajawal", sans-serif !important;
  text-align: center;
  color: var(--on-background);
}
tr {
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
table {
  background-color: var(--surface-background);
}
table.table-bordered {
  border-color: var(--outline);
}
table.table-bordered > thead > tr > th {
  border-color: var(--outline);
}

table.table-bordered > tbody > tr > td {
  border-color: var(--outline);
}
tbody {
  border-top: 1px !important;
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
</style>