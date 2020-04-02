import axios from "axios";

const axiosAuth = axios.create({
  baseURL: process.env.VUE_APP_FIREBASE_URL
});

axiosAuth.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    // return error message of error
    return Promise.reject(getErrorMessage(error.response.data.error));
  }
);

export default axiosAuth;

function getErrorMessage(error) {
  return AUTH_ERRORS[error.message]
    ? AUTH_ERRORS[error.message]
    : AUTH_ERRORS.DEFAULT;
}

/** Firebase common error messages codes
 * [https://firebase.google.com/docs/reference/rest/auth#section-create-email-password](documentation)
 */
export const AUTH_ERRORS = {
  DEFAULT: "Unkown error occured. Please try again.",
  EMAIL_EXISTS: "The email address is already in use by another account.",
  OPERATION_NOT_ALLOWED: "Password sign-in is disabled for this project.",
  TOO_MANY_ATTEMPTS_TRY_LATER: "Too many attempts. Try again later.",
  EMAIL_NOT_FOUND: "There is no user corresponding to this email.",
  INVALID_PASSWORD: "The password is invalid.",
  USER_DISABLED: "The user account has been disabled by an administrator."
};
