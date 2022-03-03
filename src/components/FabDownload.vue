<template>
  <div>
    <button class=" download-btn px-4 py-2 ">
      <v-icon class="pr-2" color="var(--primary)">mdi-tray-arrow-down</v-icon>
      Download
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>
<style>
.download-btn {
  font-family: "Tajawal", sans-serif !important;
  background-color: var(--primary-container);
  color: var(--primary);
  border-radius: 28px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(27, 15, 15, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
}
</style>