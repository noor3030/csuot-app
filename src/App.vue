<template>
  <v-app>
    <nav class="navbar px-5">
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-8 col-centered">
          <div class="maintxt">
            <img src="./assets/AppLogo.png" width="60" class="mr-2" />
            <span class="overlay-text">computer science</span>
          </div>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="#705573" class="btn white--text" rounded size="20px"
        >open telegram bot</v-btn
      >
    </nav>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import "bootstrap/dist/css/bootstrap.min.css";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");
span {
  font-family: "Tajawal", sans-serif !important;
  font-size: 25px;
}
.btn {
  font-family: "Tajawal", sans-serif !important;
  
}
</style>