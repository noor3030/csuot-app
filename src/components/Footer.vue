<template>
  <v-footer class="text-center ma-16 rounded-xl" color="accent">
    <v-container class="pa-4">
      <AppLogo :size="30" />
      <p>
        {{ $vuetify.lang.t("$vuetify.footerText") }}
      </p>
      <section>
        <a href="" class="link">GitHub</a>
        <a href="https://t.me/CsUotBot" class="link">Telegram bot</a>
        <a href="https://www.uotechnology.edu.iq/" class="link">UOT website</a>
      </section>
      <v-divider class="my-2"></v-divider>
      <section>
        <a href="https://t.me/CsUotBot"><b>By: @ConstructorTeam</b></a>
      </section>
    </v-container>
  </v-footer>
</template>
<script lang="ts">
import Vue from "vue";
import AppLogo from "@/components/AppLogo.vue";
export default Vue.extend({
  components: { AppLogo },
  computed: {
    changeTheme() {
      return this.$store.state.currentTheme;
    },
  },
});
</script>
<style>
.link {
  text-decoration: none;
  padding-right: 16px;
}
</style>