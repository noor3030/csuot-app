<template>
  <div
    v-if="card != null"
    :style="{ 'background-color': card.lesson.teacher.color }"
    id="card-div"
  >
    <p v-if="card.lesson.teacher_id != null">
      {{ card.lesson.teacher.name }}
    </p>
    <p>
      {{ card.lesson.subject.name }}
    </p>
    <p v-if="card.lesson.room_id != null">
      {{ card.lesson.room.name }}
    </p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    card: {
      type: Object,
    },
  },
});
</script>
<style scoped>
#card-div {
  text-align: middle;
  height: 16.6%;
}
</style>