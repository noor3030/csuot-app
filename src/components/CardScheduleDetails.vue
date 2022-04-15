<template>
  <div
    @click="clicked"
    class="d-flex flex-column card-div justify-content-between"
    v-if="card != null"
    :style="{
      'background-color': card.lesson.teacher.color || '#ffffff',
      'outline-color': `${increase_brightness(
        card.lesson.teacher.color,
        50
      )} !important`,
    }"
  >
    <div class="pt-2">{{ card.lesson.subject.name }}</div>
    <div v-if="card.lesson.room_id != null">
      <b>
        {{ card.lesson.room.name }}
      </b>
    </div>

    <div v-if="card.lesson.teacher_id != null" class="pb-2">
      {{ card.lesson.teacher.name }}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import increase_brightness from "@/utils/Colors";
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
    clicked() {
      this.$emit("clicked", this.card, this.day, this.period);
    },
    increase_brightness,
  },
});
</script>
<style>
.card-div {
  height: 100%;
  cursor: pointer;
}
.card-div:hover {
  height: 100%;
  outline: 10px solid !important;
  border-radius: 4px;
}

.justify-content-between {
  justify-content: space-between !important;
}
</style>