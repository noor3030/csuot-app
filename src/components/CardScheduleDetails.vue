<template>
  <div
    @click="clicked"
    class="
      d-flex
      align-items-center
      flex-column
      card-div
      border 
      border-1
      justify-content-between
    "
    v-if="card != null"
    :style="{
      'background-color': card.lesson.teacher.color_light,
      'border-color': 'red!important',
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
//import { Fragment } from "vue-fragment";
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
  },
  
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");

.card-div {
  height: 100%;
}

p,
div {
  font-family: "Tajawal", sans-serif !important;
}
</style>