import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,

    themes: {
      light: {
        primary: "#3f51b5",
        secondary: "#705573",
        accent: "#8c9eff",
        error: "#b71c1c",
        background: "#ffffff",
      },
      dark: {
        primary: "#3f51b5",
        secondary: "#debce0",
        accent: "#8c9eff",
        error: "#b71c1c",
        background: "#000000",
      },
    },
  },
});
