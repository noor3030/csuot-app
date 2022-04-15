<template>
  <v-app-bar absolute scroll-target="#scrolling" elevate-on-scroll>
    <AppLogo :size="30" />

    <v-toolbar-title>Computer science</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="switchTheme">
      <v-icon>{{
        $vuetify.theme.dark ? "mdi-lightbulb-outline" : "mdi-lightbulb"
      }}</v-icon>
    </v-btn>

    <v-btn v-if="mobile" icon @click="openTelegramBot">
      <v-icon medium>fa-brands fa-telegram</v-icon>
    </v-btn>
    <v-btn v-else rounded class="secondary" @click="openTelegramBot">
      Open telegram
      <v-icon medium>fa-brands fa-telegram</v-icon>
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
      stage: JSON.parse(localStorage.getItem("stage")!),
    };
  },
  computed: {
    changeTheme() {
      return this.$store.state.currentTheme;
    },
    mobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },

  methods: {
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },

    openTelegramBot() {
      location.href = "https://t.me/CsUotBot";
    },
  },
});
</script>