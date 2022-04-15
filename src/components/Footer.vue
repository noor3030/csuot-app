<template>
  <v-footer class="text-center ma-16 rounded-xl" color="accent">
    <v-container class="pa-4">
      <AppLogo :size="30" />
      <p>
        قراءة الجدول بابسط طريقة ممكنة وبوت تليكرام لتحسين تطبيق القسم<br />
        التطبيق مفتوح المصدر افتح رابط التليكرام لطريقة الاستخدام
      </p>
      <section>
        <a href="" class="link">GitHub</a>
        <a href="https://t.me/CsUotBot" class="link">Telegram bot</a>
        <a href="" class="link">Main website</a>
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
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");
p,
a {
  font-family: "Tajawal", sans-serif !important;
  font-size: 20px;
}

footer {
  background-color: var(--secondary-container);
  border-radius: 28px;
}
.link {
  text-decoration: none;
  padding-right: 16px;
  color: var(--primary);
}
</style>