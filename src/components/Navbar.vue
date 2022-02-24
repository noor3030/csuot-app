<template>
  <nav
    class="navbar px-5 fixed-top"
    :class="{ change_color: scrollPosition > 50 }"
    v-scroll="handleScroll"
  >
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-8 col-centered">
        <div class="maintxt">
          <img src="../assets/p2.png" width="50" class="mr-2" />
          <span class="overlay-text">computer science</span>
        </div>
      </div>
    </div>
    <div class="form-check form-switch">
      <v-btn icon @click="switchTheme"
        >
        <v-icon color="var(--on-surface)">{{ currentTheme == 'dark'? 'mdi-lightbulb' : 'mdi-lightbulb-outline'}}</v-icon>
        
        
      </v-btn>
    </div>
    <v-spacer></v-spacer>
    <button type="button" class="btn">
      open telegram bot
      <v-icon color="var(--on-tertiary)">mdi-arrow-right-thin</v-icon>
    </button>
  </nav>
</template>
<style >
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");

span {
  font-family: "Tajawal", sans-serif !important;
  font-size: 25px;
  color: var(--on-background);
}
.btn {
  font-family: "Tajawal", sans-serif !important;
  background-color: var(--tertiary);
  border-radius: 28px;
  color: var(--on-tertiary) !important;
}
.change_color {
  background-color: var(--secondary-container);
}
</style>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      scrollPosition: null as any,
      currentTheme: localStorage.getItem("theme-color"),
    };
  },
  computed: () => ({
    currentTheme: localStorage.getItem("theme-color"),
  }),
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    switchTheme() {
      const storedTheme = localStorage.getItem("theme-color");

      if (storedTheme === "dark") {
        localStorage.setItem("theme-color", "light");
        this.currentTheme = localStorage.getItem("theme-color");
        document.getElementById("app")?.classList.remove("light");
        document.getElementById("app")?.classList.add("dark");
      } else {
        localStorage.setItem("theme-color", "dark");
        this.currentTheme = localStorage.getItem("theme-color");
        document.getElementById("app")?.classList.remove("dark");
        document.getElementById("app")?.classList.add("light");
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
});
</script>