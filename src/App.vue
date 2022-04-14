<template>
  <v-app
    id="app"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
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
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { THEME } from "./utils/keys";

export default Vue.extend({
  name: "App",
  data: () => ({
    currentTheme: localStorage.getItem(THEME) || "light",
  }),
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  components: { Navbar, Footer },
});
</script>
<style >
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");
#app {
  font-family: "Tajawal", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>