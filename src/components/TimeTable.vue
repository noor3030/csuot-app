<template>
  <div class="table-responsive">
    <table class="table-bordered align-middle">
      <thead>
        <tr class="bottom-bordered">
          <th
            style="
              border-top: 0px solid #ddd !important;
              border-left: 0px solid #ddd !important;
            "
          ></th>
          <th
            v-for="period in _schedule.periods"
            :key="period.id"
            scope="col"
            style="border-top: 0px solid #ddd !important"
          >
            {{ formatPeriod(period.start_time) }} -
            {{ formatPeriod(period.end_time) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="day in _schedule.days" :key="day.id">
          <td
            class="align-middle td-width bordered"
            width="12.5%"
            style="border-left: 0px solid #ddd !important"
          >
            <h2>{{ day.name }}</h2>
          </td>
          <td
            v-for="period in _schedule.periods"
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
</template>

<script lang="ts">
import { formatPeriod } from "@/utils/DateTimeUtils";

import {
  DaySchedule,
  PeriodSchedule,
  CardScheduleDetails as CardSchedule,
  ScheduleDetails,
} from "@/client";
import Vue from "vue";
import CardScheduleDetails from "./CardScheduleDetails.vue";
export default Vue.extend({
  components: { CardScheduleDetails },
  data() {
    return {
      selectedCard: null as null | CardSchedule,
      selectedDay: null as null | DaySchedule,
      selectedPeriod: null as null | PeriodSchedule,
    };
  },
  methods: {
    getCard(period_id: string, day_id: string) {
      for (let card of this.schedule.cards) {
        if (card.period_id === period_id && card.day_id === day_id) return card;
      }
    },
    onCardClick(card: CardSchedule, day: DaySchedule, period: PeriodSchedule) {
      this.$emit("onCardClick", card, day, period);
      this.selectedCard = card;
      this.selectedDay = day;
      this.selectedPeriod = period;
    },
    formatPeriod,
  },
  props: {
    schedule: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // bad practice
    _schedule(): ScheduleDetails {
      return this.schedule;
    },
  },
});
</script>
<style>
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table-bordered {
  width: 100%;
  max-width: 100%;
  border: 1px solid #ddd !important;
  border-radius: 15px !important;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
  display: table;
  border-collapse: separate;
  box-sizing: border-box;
  text-indent: initial;
  border-spacing: 0px;
}

.table-bordered > :not(caption):not(.bottom-bordered) > * > * {
  padding: 0.5rem 0.5rem;
  border-top: 1px solid #ddd !important;
  border-left: 1px solid #ddd !important;
}
.bottom-bordered {
  border-top: 0px solid #ddd !important;
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



@media (max-width: 800px) {
  .td-width {
    min-width: 150px !important;
  }
}
</style>