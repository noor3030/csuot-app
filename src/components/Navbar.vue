<template>
  <nav
    class="navbar px-7 fixed-top"
    :class="{ change_color: scrollPosition > 50 }"
  >
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-8 col-centered">
        <div class="maintxt">
          <img
            v-if="changeTheme == 'light'"
            src="../assets/light.png"
            width="50"
            class="mr-2"
          />
          <img v-else src="../assets/dark.png" alt="" width="30" class="mr-2" />
          <span class="overlay-text">computer science</span>
        </div>
      </div>
    </div>

    <v-spacer></v-spacer>
    <div class="form-check form-switch">
      <v-btn icon @click="switchTheme">
        <v-icon color="var(--secondary)">{{
          changeTheme == "light" ? "mdi-lightbulb" : "mdi-lightbulb-outline"
        }}</v-icon>
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

span,
h2 {
  font-family: "Tajawal", sans-serif !important;

  color: var(--on-background);
}
span {
  font-size: 25px;
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

      stage: JSON.parse(localStorage.getItem("stage")!),
    };
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  computed: {
    changeTheme() {
      return this.$store.state.currentTheme;
    },
  },

  methods: {
    switchTheme() {
      this.$store.commit("switchTheme");
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },

    telegramBot() {
      location.href = "https://t.me/CsUotBot";
    },
  },
});
</script>