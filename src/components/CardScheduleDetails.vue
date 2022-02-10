<template>
  <v-container
    v-if="card != null"
    :style="{ 'background-color': card.lesson.teacher.color_light }"
    class="card-div"
  >
    <p class="pt-5">{{ card.lesson.subject.name }}</p>
    <p v-if="card.lesson.room_id != null">
      <b>
        {{ card.lesson.room.name }}
      </b>
    </p>

    <p v-if="card.lesson.teacher_id != null">
      {{ card.lesson.teacher.name }}
    </p>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
//import { Fragment } from "vue-fragment";
export default Vue.extend({
  props: {
    card: {
      type: Object,
    },
  },
  //components: { Fragment },
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");

.card-div {
  height: 100%;
}

p {
  font-family: "Tajawal", sans-serif !important;
}
</style>