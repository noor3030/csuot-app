<template>
  <div class="row px-7 py-5">
    <div class="col-9">
      <div class="table-responsive">
        <table class="table table-bordered align-middle mt-16">
          <thead>
            <tr>

              <th scope="col"></th>
              <th v-for="period in schedule.periods" :key="period.id" scope="col" class="align-middle">
                {{ formatPeriod(period.start_time) }} -
                {{ formatPeriod(period.end_time) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="day in schedule.days" :key="day.id">
              <td class="align-middle">
                <h2>{{ day.name }}</h2>
              </td>
              <td v-for="period in schedule.periods" :key="period.id" class="align-middle" width="12.5%" style="vertical-align: middle">
                <CardScheduleDetails :card="getCard(period.id, day.id)" :period="period" :day="day" @clicked="onCardClick" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <FabDownload />
    </div>
    <div class="col-3">
      <CardDetails :card="selectedCard" :day="selectedDay" :period="selectedPeriod" />
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
import { BASE_URL } from "@/utils/config"

export default Vue.extend({
  data() {
    return {

      id: "",
      selectedCard: null,
      selectedDay: null,
      selectedPeriod: null,
      schedule: {} as types.Schedule,
    };
  },
  created() {
    this.id = this.$route.params.id;
    axios
      .get(`${BASE_URL}/schedule/?stage_id=${this.id}`)
      .then((response) => {
        this.schedule = response.data;

        console.log(this.schedule.periods);
      });
  },
  methods: {
    getCard(period_id: string, day_id: string) {
      for (let card of this.schedule.cards) {
        if (card.period_id === period_id && card.day_id === day_id) return card;
      }
    },

    onCardClick(card: any, day: any, period: any) {
      console.log(card);
      this.selectedCard = card;
      this.selectedDay = day;
      this.selectedPeriod = period;
    },

    formatPeriod,


  },
  components: { CardScheduleDetails, CardDetails, FabDownload },
});
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");

h2,
th {
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
</style>