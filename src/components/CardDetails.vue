<template>
  <v-card
    v-if="card == null"
    flat
    class="px-5 "
    outlined
    style="border-color: var(--outline)"
    color="var(--surface-background)"
    min-height="250"
    
  >
  
  <div class="row align-items-center">
    <div class="col">
    <h2 style="text-align: center; color: var(--on-surface-variant)">
      اضغط على الدرس لعرض التفاصيل
    </h2>
    </div>
  </div>
    
  </v-card>
  <v-card
    v-else
    flat
    class="px-5"
    outlined
    style="border-color: var(--outline)"
    color="var(--surface-background)"
  >
    <h1 style="text-align: end">{{ day.name }}</h1>
    <p style="text-align: end">
      {{ formatPeriod(period.start_time) }} -
      {{ formatPeriod(period.end_time) }}
    </p>
    <v-container
      class="container"
      :style="{ 'background-color': card.lesson.teacher.color_light }"
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

import formatPeriod from "@/utils/DateTimeUtils";

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
});
</script>
<style scoped>
h1,
h2,
p {
  font-family: "Tajawal", sans-serif !important;
  color: var(--on-surface);
}
.container {
  border-radius: 28px;
}
p {
  font-size: 20px;
}
</style>