<template>
  <v-card flat class="mt-16 mr-16 px-5" outlined style="border-color: #ddd">
    <h1 style="text-align: end">الاحد</h1>
    <p style="text-align: end">08:30 - 10:30</p>
    <v-container class="container"
      ><h2 style="text-align: center; color: #00174b">
        حوسبة مرنة
      </h2></v-container
    >
    <p style="text-align: end">استاذ احمد طارق</p>
    <p style="text-align: end">قاعة 3</p>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style scoped>
h1,
h2,
p {
  font-family: "Tajawal", sans-serif !important;
}
.container {
  background-color: #dae2ff;
  border-radius: 28px;
}
</style>