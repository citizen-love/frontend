import Vue from "vue";
import Vuex from "vuex";
import * as helpRequestWizardState from "./HelpRequestWizardState";
import * as auth from "./Authentication";
import * as user from "./User";
import * as helpers from "./Helpers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    [helpRequestWizardState.name]: helpRequestWizardState.module,
    [auth.name]: auth.module,
    [user.name]: user.module,
    [helpers.name]: helpers.module
  }
});
