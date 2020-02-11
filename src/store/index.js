import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: false,
    snackbarText: "",
  },
  mutations: {
    showSnackBar(state, text){
      state.snackbarText=text;
      state.snackbar=true;
    }
  },
  actions: {
  },
  modules: {
  }
})
