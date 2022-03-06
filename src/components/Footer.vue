<template>
  <footer class="text-center ma-16">
    <div class="container p-4">
      <div class="row">
        <div class="maintxt">
          <img
            v-if="changeTheme == 'light'"
            src="../assets/light.png"
            width="50"
            class="mr-2"
          />
          <img v-else src="../assets/dark.png" alt="" width="30" class="mr-2" />
        </div>
      </div>
      <div class="row">
        <p style="color: var(--on-secondary-container)">
          قراءة الجدول بابسط طريقة ممكنة وبوت تليكرام لتحسين تطبيق القسم<br />
          التطبيق مفتوح المصدر افتح رابط التليكرام لطريقة الاستخدام
        </p>
      </div>
      <section>
        <a href="" class="link">GitHup</a>
        <a href="https://t.me/CsUotBot" class="link">Telegram bot</a>
        <a href="" class="link">Main website</a>
        <a href="https://www.uotechnology.edu.iq/" class="link">UOT website</a>
      </section>
      <v-divider style="color: var(--outline)"></v-divider>
      <v-row>
        <p style="color: var(--on-secondary-container)">
          <b>By: @Constroctor Team</b
          ><a
            href="https://t.me/CsUotBot"
            class="pl-3"
            style="color: var(--on-secondary-container)"
            ><b>Telegram</b></a
          >
        </p>
      </v-row>
    </div>
  </footer>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
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