import axios from "axios";

/* User information related data */

const state = {
  firstName: null,
  lastName: null,
  email: null,
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
  }
};

const mutations = {
  SET_USER_DATA(state, data) {
    if (data) {
      state.firstName = data.firstName;
      state.lastName = data.lastName;
      state.email = data.email;
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
  CLEAR_USER_INFO(state) {
    state.firstName = null;
    state.lastName = null;
    state.funds = null;
    state.stocks = null;
    state.error = null;
  }
};

const actions = {
  addUser({ commit, rootState }, userObj) {
    if (!rootState.auth.idToken) {
      return;
    }
    /** using unique `localId`s as identifiers, we can fetch single data without requesting firebase generated ids separately
     * localId is returned by auth endpoint and saved in store/modules/auth as `userId`
     * See more [https://firebase.google.com/docs/database/rest/save-data](documentation)
     * NOTE! To avoid auto generated ids in firebase, use PUT not POST
     */
    const userData = {
      email: userObj.email,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      funds: 10000, // on default all users have 10000 USD in the simulation
      portfolio: [] // bought stocks will be in portfolio
    };

    axios
      .put(
        `/users/${rootState.auth.userId}.json?auth=${rootState.auth.idToken}`,
        userData
      )
      .then(response => {
        if (response) {
          commit("SET_USER_DATA", userObj);
        }
      })
      .catch(error => {
        commit("SET_USER_DATA_FAILED", error);
      });
  },

  /** Fetched user data by localId provided by Firebase auth endpoint, saved in login/signup as `userId` to vuex */
  fetchUserData({ rootState, commit, dispatch }) {
    if (!rootState.auth.idToken) {
      return;
    }
    axios
      .get(
        `/users/${rootState.auth.userId}.json?auth=${rootState.auth.idToken}`
      )
      .then(response => {
        commit("SET_USER_DATA", response.data);
      })
      .catch(error => {
        commit("GET_USER_DATA_FAILED", error);
        // logout user if 401 (not authenticated or token expired)
        dispatch("signOutUser");
      });
  },

  /** update user data by localId provided by Firebase auth endpoint, saved in login/signup as `userId` to vuex,
   * note that to update data on Firebase REST API without verwriting, you have to use PATCH
   * see more [https://firebase.google.com/docs/database/rest/save-data](here)
   */
  updateUserData({ rootState, state, commit }) {
    if (!rootState.auth.idToken) {
      return;
    }
    axios
      .patch(
        `/users/${rootState.auth.userId}.json?auth=${rootState.auth.idToken}`,
        {
          stocks: state.stocks,
          funds: Number(state.funds).toFixed(2)
        }
      )
      .then(response => {
        commit("SET_USER_DATA", response.data);
      })
      .catch(error => {
        commit("EDIT_USER_DATA_FAILED", error);
      });
  },
  clearUserInfo({ commit }) {
    commit("CLEAR_USER_INFO");
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};