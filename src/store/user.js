import HelperService from "../services/HelperService";

export const name = "user";

/**
 * Vuex store module for Helper profile
 * Requires logging in/signing up
 */

const state = {
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
  notifyBySMS: null,
  createdAt: null,
  isAvailable: null,
  bio: null,
  categories: [],
  reviews: [],
  coordinates: null,
  radius: null, //km
  language: null,
  avatar: null,

  // to display if fetching helper data went wrong
  error: null
};

const getters = {
  email(state) {
    return state.email;
  },
  firstName(state) {
    return state.firstName;
  },
  lastName(state) {
    return state.lastName;
  },
  phoneNumber(state) {
    return state.phoneNumber;
  },
  notifyBySMS(state) {
    return state.notifyBySMS;
  },
  isAvailable(state) {
    return state.isAvailable;
  },
  reviews(state) {
    return state.reviews;
  },
  coordinates(state) {
    return state.coordinates;
  },
  categories(state) {
    return state.categories;
  },
  bio(state) {
    return state.bio;
  },
  radius(state) {
    return state.radius;
  },
  language(state) {
    return state.language;
  },
  avatar(state) {
    return state.avatar;
  }
};

const mutations = {
  SET_USER_DATA(state, data) {
    if (data) {
      state.firstName = data.firstName;
      state.lastName = data.lastName;
      state.email = data.email;
      state.phoneNumber = data.phoneNumber;
      state.notifyBySMS = data.notifyBySMS;
      state.createdAt = data.createdAt;
      state.isAvailable = data.isAvailable;
      state.bio = data.bio;
      state.categories = data.categories;
      state.reviews = data.reviews;
      state.coordinates = data.coordinates;
      state.radius = data.radius; //km
      state.language = data.language;
      state.avatar = data.avatar;
    }
  },
  SET_USER_DATA_FAILED(state, error) {
    state.error = error;
  },
  GET_USER_DATA_FAILED(state, error) {
    state.error = error;
  },
  EDIT_USER_DATA_FAILED(state, error) {
    state.error = error;
  },
  CLEAR_USER_INFO() {
    state.firstName = null;
    state.lastName = null;
    state.email = null;
    state.phoneNumber = null;
    state.notifyBySMS = null;
    state.createdAt = null;
    state.isAvailable = null;
    state.bio = null;
    state.categories = [];
    state.reviews = [];
    state.coordinates = null;
    state.radius = null; //km
    state.language = null;
    state.avatar = null;
    state.error = null;
  }
};

const actions = {
  async addUser({ commit }, userObj) {
    console.log("adding new user", userObj);
    if (!userObj.uid) {
      console.error("new user must have uid");
      return;
    }
    console.log("registering");

    HelperService.registerHelper(userObj)
      .then(response => {
        if (response) {
          console.log(response);
          commit("SET_USER_DATA", response);
        }
      })
      .catch(error => {
        commit("SET_USER_DATA_FAILED", error);
      });
  },

  /**
   * Fetched user data by localId provided by Firebase auth endpoint,
   * saved in login/signup to vuex
   */
  fetchUserData({ rootState, commit }) {
    console.log("fetching current user data", rootState);

    if (!rootState.auth.idToken) {
      return;
    }

    HelperService.getHelper(rootState.auth.idToken)
      .then(response => {
        commit("SET_USER_DATA", response);
      })
      .catch(error => {
        commit("GET_USER_DATA_FAILED", error);
        // logout user if 401 (not authenticated or token expired)
        // dispatch("signOutUser");
      });
  },

  /**
   * update user data by current user uid (localId) provided by Firebase auth endpoint,
   */
  updateUserData({ rootState, commit }, payload) {
    if (!rootState.auth.idToken) {
      return;
    }
    HelperService.updateHelper(payload)
      .then(response => {
        commit("SET_USER_DATA", response.data);
      })
      .catch(error => {
        commit("EDIT_USER_DATA_FAILED", error);
      });
  },

  /**
   * Clears user data on logout for example
   * */
  clearUserInfo({ commit }) {
    commit("CLEAR_USER_INFO");
  }
};

export const module = {
  state,
  mutations,
  actions,
  getters
};
