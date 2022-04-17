<template>
  <v-app-bar flat>
    <AppLogo :size="30" />

    <v-toolbar-title>
      {{ $vuetify.lang.t("$vuetify.appName") }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="switchTheme">
      <v-icon>{{
        $vuetify.theme.dark ? "mdi-lightbulb-outline" : "mdi-lightbulb"
      }}</v-icon>
    </v-btn>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="$vuetify.breakpoint.xsOnly" icon v-bind="attrs" v-on="on">
          <v-icon medium color="secondary">mdi-web</v-icon>
        </v-btn>
        <v-btn v-else rounded text class="secondary" v-bind="attrs" v-on="on">
          Language
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title @click="test(item)">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn v-if="$vuetify.breakpoint.xsOnly" icon @click="openTelegramBot">
      <v-icon medium color="secondary">fa-brands fa-telegram</v-icon>
    </v-btn>
    <v-btn v-else rounded text class="secondary" @click="openTelegramBot">
      Open telegram
      <v-icon medium class="ms-1">fa-brands fa-telegram</v-icon>
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
      items: [
        { language: "ar", rtl: true, title: "العربية" },
        { language: "en", rtl: false, title: "الانكليزية" },
      ],
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
    changeRTL() {
      this.$vuetify.rtl = !this.$vuetify.rtl;
    },
    openTelegramBot() {
      location.href = "https://t.me/CsUotBot";
    },
    test(item: { language: string; rtl: boolean; title: string }) {
      this.$vuetify.rtl = item.rtl
      this.$vuetify.lang.current = item.language
    },
  },
});
</script>