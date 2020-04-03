// import axios from "axios";
import UserService from "../services/UserService";

/*export const axios = Axios.create({
  // Double check this, should we use firebase REST API or not?
  baseURL: process.env.VUE_APP_FIREBASE_REST_API_URL
});*/

/* User information related data */

// const rootUrl = process.env.VUE_APP_API_URL;
// const endpoint = "/users";

const state = {
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
  isHelper: null,
  helperCategories: [],
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
  isHelper(state) {
    return state.isHelper;
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
    state.error = null;
  }
};

const actions = {
  async addUser({ rootState }, userObj) {
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
      phoneNumber: userObj.phoneNumber,
      isHelper: userObj.isHelper
    };

    console.log("creating user", userData);
    UserService.createUser(userData);
    /*try {
      const { data } = await axios({
        method: "POST",
        url: rootUrl + endpoint,
        data: userData
      });
      console.log(data);
      if (data) {
        commit("SET_USER_DATA", data);
      }
      return data;
    } catch (error) {
      commit("SET_USER_DATA_FAILED", error);
      // return Promise.reject(e);
    }*/

    /*axios
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
      });*/
  },

  /** Fetched user data by localId provided by Firebase auth endpoint, saved in login/signup as `userId` to vuex */
  fetchUserData({ rootState }) {
    if (!rootState.auth.idToken) {
      return;
    }
    UserService.getUser(rootState.auth.idToken);
    /*axios
      .get(
        `/users/${rootState.auth.userId}.json?auth=${rootState.auth.idToken}`
      )
      .then(response => {
        commit("SET_USER_DATA", response.data);
      })
      .catch(error => {
        commit("GET_USER_DATA_FAILED", error);
        // logout user if 401 (not authenticated or token expired)
        // dispatch("signOutUser");
      });*/
  },

  /** update user data by localId provided by Firebase auth endpoint, saved in login/signup as `userId` to vuex,
   * note that to update data on Firebase REST API without verwriting, you have to use PATCH
   * see more [https://firebase.google.com/docs/database/rest/save-data](here)
   */
  updateUserData({ rootState }) {
    if (!rootState.auth.idToken) {
      return;
    }
    UserService.updateUser();
    /*axios
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
      });*/
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
