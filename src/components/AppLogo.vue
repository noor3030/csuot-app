<template>
  <div>
    <img
      v-if="$vuetify.theme.dark"
      src="@/assets/dark.png"
      :width="size"
      :height="size"
      class="mt-2 mx-2"
    />
    <img
      v-else
      src="@/assets/light.png"
      :width="size"
      :height="size"
      class="mt-2 mr-2"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    size: { type: Number, required: true },
  },
});
</script>
