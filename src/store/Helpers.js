import HelperService from "../services/HelperService";

export const name = "helpers";
/**
 * Vuex store module to fetch all helpers near you within given radius.
 * Does not require logging in to fetch this data
 */

const state = {
  // to get all user profiles
  helperProfiles: [],
  error: null,

  // Single profile (not own)
  openProfile: null,
  profileError: null
};

const getters = {
  helperProfiles(state) {
    return state.helperProfiles;
  }
};

const mutations = {
  GET_HELPERS(state, data) {
    state.helperProfiles = data;
  },
  GET_HELPERS_FAILED(state, error) {
    state.error = error;
  },
  GET_HELPER(state, data) {
    state.openProfile = data;
  },
  GET_HELPER_FAILED(state, error) {
    state.error = error;
  }
};

const actions = {
  fetchAllUsers({ commit }) {
    HelperService.getAllHelpers(this.coordinates, this.radius)
      .then(response => {
        commit("GET_HELPERS", response);
      })
      .catch(error => {
        commit("GET_HELPERS_FAILED", error);
      });
  },

  fetchUserById({ commit }, userId) {
    HelperService.getHelper(userId)
      .then(response => {
        console.log(response);
        commit("GET_HELPER", response);
      })
      .catch(error => {
        commit("GET_HELPER_FAILED", error);
      });
  }
};
export const module = {
  state,
  mutations,
  actions,
  getters
};
