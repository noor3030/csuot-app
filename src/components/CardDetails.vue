<template>
  <v-card flat class="px-5 mt-16 " outlined style="border-color: var(--outline);" color="var(--surface-background)">
    <h1 style="text-align: end">الاحد</h1>
    <p style="text-align: end">08:30 - 10:30</p>
    <v-container class="container" :style="{ 'background-color': card.lesson.teacher.color_light}">
      <h2 style="text-align: center; color:#000000">
        {{card.lesson.subject.name}}
      </h2>
    </v-container>
    <p style="text-align: end">{{card.lesson.teacher.name}}</p>
    <p style="text-align: end">{{card.lesson.room.name}}</p>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    card: {
      type: Object
    }
  }
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