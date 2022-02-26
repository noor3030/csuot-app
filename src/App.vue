<template>
  <v-app :class="currentTheme" style="background-color: var(--background);transition: background 500ms ease-in-out, color 1000ms ease-in-out;" id="app">
    <Navbar />
    <div class="row px-7 py-5">
      <div class="col-9">
        <v-main>
          <router-view />
        </v-main>
        <FabDownload />
      </div>
      <div class="col-3">
        <CardDetails />
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import "./assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import FabDownload from "@/components/FabDownload.vue";
import CardDetails from "@/components/CardDetails.vue"
export default Vue.extend({
  name: "App",
  data: () => ({
    currentTheme: localStorage.getItem("theme-color") || "light"
  }),
  components: { Navbar, Footer, FabDownload, CardDetails },
});
</script>
<style >

</style>