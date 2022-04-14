<template>
  <div>
    <img
      v-if="$vuetify.theme.dark"
      src="@/assets/dark.png"
      width="30"
      class="mr-2"
    />
    <img v-else src="@/assets/light.png" width="30" class="mr-2" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
</style>