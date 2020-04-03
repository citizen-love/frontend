import router from "../router";
import axiosAuth from "../auth";
import { Date } from "core-js";

export const name = "auth";

/** See details [https://firebase.google.com/docs/reference/rest/auth?hl=en#section-create-email-password](Firebase) */
const FIREBASE_API_KEY = process.env.VUE_APP_FIREBASE_KEY;

const state = {
  userId: null,
  idToken: null,
  authErrorMessage: null,
  loginErrorMessage: null
};

const getters = {
  /** @returns user info if available, if not returns `null` */
  user: state => {
    return state.user;
  },
  authErrorMessage: state => {
    return state.authErrorMessage;
  },
  loginErrorMessage: state => {
    return state.loginErrorMessage;
  },
  isAuthenticated: state => {
    return state.idToken !== null;
  }
};

const mutations = {
  AUTHENTICATE_USER(state, user) {
    state.userId = user.localId;
    state.idToken = user.idToken;
    state.authErrorMessage = null;
    state.loginErrorMessage = null;
  },
  CREATE_USER_FAILED(state, error) {
    state.authErrorMessage = error;
  },
  LOGIN_USER_FAILED(state, error) {
    state.loginErrorMessage = error;
  },
  SIGN_OUT_USER(state) {
    state.userId = null;
    state.idToken = null;
    // redirect to front page after logout
    router.push("/");
    // clear local storage to prevent auto login too
    localStorage.removeItem("localId");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
  }
};

const actions = {
  setLogoutTimer: ({ commit }, expirationTime) => {
    setTimeout(() => {
      commit("SIGN_OUT_USER");
      // transfer firebase token expiration time (s) to milliseconds
    }, expirationTime * 1000);
  },

  signUpUser: ({ commit, dispatch }, userObj) => {
    axiosAuth
      .post(`/accounts:signUp?key=${FIREBASE_API_KEY}`, {
        email: userObj.email,
        password: userObj.password,
        returnSecureToken: true // Firebase's own field
      })
      .then(response => {
        // add successfully signed up user info to helper db
        dispatch("addUser", {
          firstName: userObj.firstName,
          lastName: userObj.lastName,
          email: userObj.email,
          /* phoneNumber: userObj.phoneNumber,
          notifyBySMS: userObj.notifyBySMS,
          isAvailable: userObj.isAvailable,
          bio: userObj.bio,
          categories: userObj.categories,
          reviews: [],
          coordinates: userObj.coordinates,
          radius: userObj.radius, //km
          language: userObj.language,
          avatar: userObj.avatar,*/
          uid: response.data.localId
        });
        dispatch("onAuthenticateSuccess", response);
        // redirect to user profile once finished registration
        router.push("/profile");
      })
      .catch(error => {
        commit("CREATE_USER_FAILED", error);
      });
  },

  onAuthenticateSuccess: ({ commit, dispatch }, response) => {
    commit("AUTHENTICATE_USER", response.data);
    dispatch("setLogoutTimer", response.data.expiresIn);
    dispatch("fetchUserData");
    /* save credentials to localStorage so that user won't have to login always on page refresh */
    const nowInMilliseconds = new Date().getTime();
    const expiration = new Date(
      nowInMilliseconds + response.data.expiresIn * 1000
    );
    localStorage.setItem("token", response.data.idToken);
    localStorage.setItem("expirationDate", expiration);
    localStorage.setItem("localId", response.data.localId);
  },

  loginUser: ({ commit, dispatch }, userObj) => {
    axiosAuth
      .post(`/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
        email: userObj.email,
        password: userObj.password,
        returnSecureToken: true // Firebase's own field
      })
      .then(response => {
        dispatch("onAuthenticateSuccess", response);
        // redirect to user profile once authenticated
        router.push("/profile");
      })
      .catch(error => {
        commit("LOGIN_USER_FAILED", error);
      });
  },

  tryAutoLogin: ({ commit }) => {
    const idToken = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    if (!idToken || new Date() >= expirationDate) {
      return;
    }
    const localId = localStorage.getItem("localId");
    console.log("auto logging in via localStorage", localId, idToken);
    commit("AUTHENTICATE_USER", { localId, idToken });
  },

  logoutUser: ({ commit }) => {
    commit("LOGOUT_USER");
  },

  signOutUser: ({ commit, dispatch }) => {
    commit("SIGN_OUT_USER");
    dispatch("clearUserInfo");
  }
};

export const module = {
  state,
  mutations,
  actions,
  getters
};
