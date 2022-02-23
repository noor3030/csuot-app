<template>
  <v-app class="light" style="background-color: var(--background)">
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
    //
  }),
  components: { Navbar, Footer },
});
</script>
