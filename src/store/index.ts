import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTheme: localStorage.getItem("theme-color") || "light",
  },
  mutations: {
    switchTheme(state) {
      const storedTheme = localStorage.getItem("theme-color");
      const app = document.getElementById("app");

      if (storedTheme === "dark") {
        localStorage.setItem("theme-color", "light");
        state.currentTheme = localStorage.getItem("theme-color")!;

        app?.classList.remove("dark");
        app?.classList.add("light");
      } else {
        localStorage.setItem("theme-color", "dark");
        state.currentTheme = localStorage.getItem("theme-color")!;

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
