<template>
  <v-app
    id="app"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <v-card class="overflow-hidden">
      <Navbar />

      <v-main>
        <router-view />
      </v-main>

      <Footer />
    </v-card>
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
  created() {
    window.addEventListener("keydown", this.escapeListener);
  },
  // make sure you remove the listener when the component is no longer visible
  destroyed() {
    window.removeEventListener("keydown", this.escapeListener);
  },
  data: () => ({
    currentTheme: localStorage.getItem(THEME) || "light",
  }),
  methods: {
    escapeListener(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "b") {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      }
    },
  },
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