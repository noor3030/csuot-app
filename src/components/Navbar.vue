<template>
  <nav class="navbar px-7 fixed-top" :class="{ change_color: scrollPosition > 50 }" v-scroll="handleScroll">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-8 col-centered">
        <div class="maintxt">
          <img src="../assets/p2.png" width="50" class="mr-2" />
          <span class="overlay-text">computer science</span>
        </div>
      </div>
    </div>

    <v-spacer></v-spacer>
    <div class="form-check form-switch">
      <v-btn icon @click="switchTheme">
        <v-icon color="var(--secondary)">{{ currentTheme == 'light'? 'mdi-lightbulb' : 'mdi-lightbulb-outline'}}</v-icon>

      </v-btn>

    </div>

   

    <button type="button" class="telegram-btn px-4 py-2" @click="telegramBot">
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
.telegram-btn {
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
      currentTheme: localStorage.getItem("theme-color") || "light",
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    switchTheme() {
      const storedTheme = localStorage.getItem("theme-color");
      const app = document.getElementById("app");

      if (storedTheme === "dark") {
        localStorage.setItem("theme-color", "light");
        this.currentTheme = localStorage.getItem("theme-color")!;

        app?.classList.remove("dark");
        app?.classList.add("light");
      } else {
        localStorage.setItem("theme-color", "dark");
        this.currentTheme = localStorage.getItem("theme-color")!;

        app?.classList.remove("light");
        app?.classList.add("dark");

      }
    },
    telegramBot(){
      location.href = "https://t.me/CsUotBot";
    }
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
});
</script>