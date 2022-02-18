<template>
  <v-app>
    

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import "bootstrap/dist/css/bootstrap.min.css";

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
