import Vue from 'vue'
import Vuex from 'vuex'
import * as helpRequestWizardState from './HelpRequestWizardState'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    [helpRequestWizardState.name] : helpRequestWizardState.module
  },
})
