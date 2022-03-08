import Vue from 'vue'
import Vuex from 'vuex'
import {THEME} from '../utils/keys'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTheme: localStorage.getItem(THEME) || "light",
  },
  mutations: {
    switchTheme(state) {
      const storedTheme = localStorage.getItem(THEME);
      const app = document.getElementById("app");

      if (storedTheme === "dark") {
        localStorage.setItem(THEME, "light");
        state.currentTheme = localStorage.getItem(THEME)!;

        app?.classList.remove("dark");
        app?.classList.add("light");
      } else {
        localStorage.setItem(THEME, "dark");
        state.currentTheme = localStorage.getItem(THEME)!;

        app?.classList.remove("light");
        app?.classList.add("dark");

      }
    }

  },
  actions: {
  },
  modules: {
  },
  getters:{
   

  }
})
