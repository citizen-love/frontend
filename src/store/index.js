import Vue from 'vue'
import Vuex from 'vuex'
import * as helpRequestWizardState from './HelpRequestWizardState'
import auth from "./auth"
import user from "./user"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    [helpRequestWizardState.name]: helpRequestWizardState.module,
    auth,
    user
  },
})
