<template>
  <v-app :class="currentTheme" style="background-color: var(--background);transition: background 500ms ease-in-out, color 1000ms ease-in-out;" id="app">
    <Navbar />
    
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import "./assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default Vue.extend({
  name: "App",

  data: () => ({
  
  }),


  methods: {
    
  },
  components: { Navbar, Footer },
});
</script>
<style >
</style>