import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import ar from "@/i18n/vuetify/ar";
import en from "@/i18n/vuetify/en";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ar, en },
    current: "ar",
  },
  rtl: true,
  icons: {
    iconfont: "mdi",
  },
  theme: {
    dark: true,

    themes: {
      light: {
        primary: "#3f51b5",
        secondary: "#705573",
        accent: "#dae2f9",
        error: "#b71c1c",
        background: "#ffffff",
      },
      dark: {
        primary: "#3f51b5",
        secondary: "#debce0",
        accent: "#3f4759",
        error: "#b71c1c",
        background: "#1b1b1d",
      },
    },
  },
});
