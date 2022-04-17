<template>
  <v-card v-if="card == null" outlined min-height="250" class="pa-5 rounded">
    <h2>{{ $vuetify.lang.t("$vuetify.clickToShowDetails") }}</h2>
  </v-card>
  <v-card v-else min-height="250" class="px-5 py-2" outlined>
    <h1 style="text-align: end">{{ day.name }}</h1>
    <p style="text-align: end">
      {{ formatPeriod(period.start_time) }} -
      {{ formatPeriod(period.end_time) }}
    </p>
    <v-container
      rounded-pill
      :style="{ 'background-color': card.lesson.teacher.color }"
    >
      <h2 style="text-align: center; color: #000000">
        {{ card.lesson.subject.name }}
      </h2>
    </v-container>
    <p style="text-align: end">{{ card.lesson.teacher.name }}</p>
    <p style="text-align: end">{{ card.lesson.room.name }}</p>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";

import { formatPeriod } from "@/utils/DateTimeUtils";

export default Vue.extend({
  props: {
    card: {
      type: Object,
    },
    period: {
      type: Object,
    },
    day: {
      type: Object,
    },
  },
  methods: {
    formatPeriod,
  },
  computed: {
    sheet() {
      return this.$vuetify.breakpoint.lg;
    },
  },
});
</script>
<style scoped>
p {
  font-size: 20px;
}
</style>