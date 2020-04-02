<template>
  <div class="login-container">
    <div class="login">
      <div class="img-container">
        <app-heart/>
      </div>
      <br />
  
      <h1>{{$t('auth.loginTitle')}}</h1>

      <div class="app-alert" v-if="loginErrorMessage">
        <span class="light-text">{{ loginErrorMessage }}</span>
      </div>
      <br />
      <div class="input-container">
        <label for="email">Email</label>
        <br />
        <input id="email" type="email" v-model="email" />
      </div>
      <br />
      <div class="input-container">
        <label for="password">{{$t('auth.password')}}</label>
        <br />
        <input id="password" :type="passwordType" v-model="password" />
        <button
          variant="info"
          class="password-mask-button"
          @click="passwordType === 'password' ? passwordType = 'text' : passwordType = 'password'"
        >
        <v-icon v-if="passwordType === 'password'">mdi-eye-outline</v-icon>
        <v-icon v-else>mdi-eye-off-outline</v-icon>
        </button>
      </div>
      <br />

      <v-btn
        class="mb-2 mt-4 p-1 btn-block"
        style="maxWidth: 300px;"
        variant="success"
        @click="login"
        size="sm"
      >{{$t('auth.login')}}</v-btn>
      <br />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppHeart from "@/components/Heart"

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      passwordType: "password"
    };
  },
  computed: {
    ...mapGetters(["loginErrorMessage"])
  },
  methods: {
    ...mapActions(["loginUser"]),
    login() {
      this.loginUser({
        email: this.email,
        password: this.password
      });
    }
  },
  components: {
    AppHeart
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.app-alert {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5em;
  margin: 1em auto;
}
.login-container {
  text-align: center;
  margin: auto;
  width: 100%;
  padding: 1em;
  .login {
    text-align: center;
    margin: auto;
    max-width: 300px;
    .input-container {
      text-align: left;
      position: relative;
      input {
        width: 100%;
        background: white;
        color: gray;
        border: none;
        border-radius: 3px;
        padding: 5px 10px;

        &:focus {
          outline: none;
        }
      }
      .password-mask-button {
        position: absolute;
        right: -5px;
        top: 27.5px;
        width: 40px;
        text-align: center;
        vertical-align: middle;
        margin: auto;
        height: 40px;
        border-radius: 50%;
         &:focus {
            outline:none;
          }
        i {
          margin-left: -2.5px;
          margin-top: -15px;
          
        }
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .login-container {
    margin-top: 90px;
  }
}
</style>