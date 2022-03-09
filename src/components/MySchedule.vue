<template>
      <div>
    <button class="my-schedule px-4 py-2 float-right"  @click="clicked2">
      <v-icon class="pr-2" color="var(--on-tertiary)"
        >mdi-content-save</v-icon
      >
      Save My Schedule
    </button>
  </div>
</template>
  <script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
      methods:{
clicked2() {
      this.$emit("clicked2");
    },
      }
  })
  </script>
<style>
.my-schedule {
  font-family: "Tajawal", sans-serif !important;
  background-color: var(--tertiary);
  color: var(--on-tertiary);
  border-radius: 28px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(27, 15, 15, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
}
</style>