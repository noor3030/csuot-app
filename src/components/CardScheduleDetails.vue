<template>
  <div
    @click="clicked"
    class="
      d-flex
      flex-column
      card-div
      justify-content-between
    "
    v-if="card != null"
    :style="{
      'background-color': card.lesson.teacher.color,
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
      type: Object ,
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
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");

.card-div {
  height: 100%;
}
.card-div:hover {
  height: 100%;
  outline: 5px solid !important;
}

.justify-content-between {
    justify-content: space-between!important;
}

p,
div {
  font-family: "Tajawal", sans-serif !important;
}
</style>