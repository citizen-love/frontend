<template>
<div class="auth">
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
        <span v-if="newUser">
          <small>{{$t('auth.alreadyAccount')}}</small><br/>{{$t('auth.login')}}
        </span>
        <span v-else><small>{{$t('auth.noAccount')}}</small><br/>{{$t('auth.signup')}}</span>
      </button>
    </div>
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
      this.$router.push("/profile");
      return
    }
    if(this.$route.query.type == "signup") {
      this.newUser = true
    }

  },
  components: {
    appLogin: Login,
    appSignup: SignUp
  }
};
</script>

<style lang="scss" scoped>
.auth {
  background-image: url("../../assets/background-hd-min.jpg");
  background-size: cover;
}

.auth-container {
  min-height: 105vh;
  padding-top: 7em;
  max-width: 500px;
  margin: auto;
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
  outline: none;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  top: 10%;
  position: absolute;
  right: 10%;
  font-size: 1em;
  -webkit-box-shadow: 4px -4px 0px 0px rgba(255, 255, 255, 0.5);
  -moz-box-shadow: 4px -4px 0px 0px rgba(255, 255, 255, 0.5);
  box-shadow: 4px -4px 0px 0px rgba(255, 255, 255, 0.5);
  color: $_color_primary;
  background-color: rgba(255, 255, 255, 1);
  border: none;
  transition: 1s;
  &.new-user {
    left: 10%;
    color: $_color_primary;
    background-color: rgba(255, 255, 255, 1);;
    -webkit-box-shadow: 4px -4px 0px 0px rgba(255, 255, 255, 0.5);
    -moz-box-shadow: 4px -4px 0px 0px rgba(255, 255, 255, 0.5);
    box-shadow: 4px -4px 0px 0px rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
  }
}
</style>