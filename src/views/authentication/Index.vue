<template>
  <div class="auth-container" :class="{'new-user': newUser }">
    <transition v-if="!newUser" enter-active-class="animated bounceInRight" mode="out-in">
      <app-login></app-login>
    </transition>

    <transition v-else enter-active-class="animated bounceInLeft" mode="out-in">
      <app-signup></app-signup>
    </transition>

    <div>
      <button
        class="auth-button float"
        :class="{'new-user': newUser }"
        variant="success"
        @click="newUser = !newUser"
      >
        {{!newUser ? $t('auth.signup') : $t('auth.login')
        }}
      </button>
    </div>
  </div>
</template>

<script>
import Login from "./Login";
import SignUp from "./SignUp";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      newUser: false
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push("/portfolio");
    }
  },
  components: {
    appLogin: Login,
    appSignup: SignUp
  }
};
</script>

<style lang="scss" scoped>

.auth-container {
  min-height: 105vh;
  padding-top: 7em;
  padding-bottom: 5em;
  background-color: $_color_primary;
  background-size: cover;
  color: white;
}
.img-container {
  max-width: 300px;
  text-align: center;
  margin: auto;
  padding: 1em 1em 3em 1em;
}
.auth-button {
  position: fixed;
  outline: none;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  bottom: 10%;
  right: 10%;
  font-size: 1em;
  -webkit-box-shadow: 4px -4px 0px 0px rgba(255, 255, 255, 0.5);
  -moz-box-shadow: 4px -4px 0px 0px rgba(255, 255, 255, 0.5);
  box-shadow: 4px -4px 0px 0px rgba(255, 255, 255, 0.5);
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  transition: 1s;
  &.new-user {
    left: 10%;
    color: $_color_primary;
    background-color: rgba(255, 255, 255, 0.8);;
    -webkit-box-shadow: 4px -4px 0px 0px rgba(255, 255, 255, 0.5);
    -moz-box-shadow: 4px -4px 0px 0px rgba(255, 255, 255, 0.5);
    box-shadow: 4px -4px 0px 0px rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
  }
}
@media screen and (max-width: 1024px) {
  .auth-button {
    top: 10%;
    position: absolute;
    right: 10%;
  }
}
</style>