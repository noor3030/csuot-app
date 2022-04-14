<template>
  <v-app-bar absolute scroll-target="#scrolling" elevate-on-scroll>
    <AppLogo />
    <v-toolbar-title>Computer science</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn icon @click="switchTheme">
      <v-icon>{{
        $vuetify.theme.dark ? "mdi-lightbulb-outline" : "mdi-lightbulb"
      }}</v-icon>
    </v-btn>
    <v-btn rounded medium color="secondary">
      Open telegram
      <v-icon right dark> mdi-arrow-right </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import AppLogo from "./AppLogo.vue";

export default Vue.extend({
  components: { AppLogo },
  data() {
    return {
      collapseOnScroll: true,
      stage: JSON.parse(localStorage.getItem("stage")!),
    };
  },
  computed: {
    changeTheme() {
      return this.$store.state.currentTheme;
    },
  },

  methods: {
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },

    telegramBot() {
      location.href = "https://t.me/CsUotBot";
    },
  },
});
</script>