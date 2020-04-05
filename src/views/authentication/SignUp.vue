<template>
  <div class="sign-up-container">
    <div class="sign-up">
      <div class="img-container">
        <app-heart/>
      </div>
      <br />

      <h1>{{$t('auth.signupTitle')}}</h1>
      <br />

      <div class="app-alert" v-if="authErrorMessage && !showMissingFieldsError">
        <span class="light-text">{{ authErrorMessage }}</span>
      </div>

      <div class="input-container">
        <label for="firstName">{{$t('auth.firstName')}}</label>
        <br />
        <input id="firstName" type="firstName" v-model="firstName" />
      </div>

      <div class="input-container">
        <label for="lastName">{{$t('auth.lastName')}}</label>
        <br />
        <input id="lastName" type="lastName" v-model="lastName" />
      </div>

      <div class="input-container">
        <label for="email">{{$t('auth.email')}}</label>
        <br />
        <input id="email" type="email" v-model="email" />
      </div>

      <div class="input-container">
        <label for="password">{{$t('auth.password')}}</label><br/>
        <small>{{$t('auth.passwordExplanation')}}</small>
        <br />
        <input
          id="password"
          :type="passwordType"
          v-model="password"
        />
        <button
          variant="info"
          class="password-mask-button"
          @click="passwordType === 'password' ? passwordType = 'text' : passwordType = 'password'"
        >
          <v-icon v-if="passwordType === 'password'">mdi-eye-outline</v-icon>
          <v-icon v-else>mdi-eye-off-outline</v-icon>
        </button>
      </div>
      <div class="app-alert" v-if="showMissingFieldsError">
        <span class="light-text">{{ $t('auth.missingFieldsError') }}</span>
      </div>
      <br v-else/>
      <v-btn @click="signUp">{{$t('auth.signup')}}</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppHeart from "@/components/Heart";

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      passwordType: "password",
      showMissingFieldsError: false
    };
  },
  computed: {
    ...mapGetters(["authErrorMessage"])
  },
  methods: {
    ...mapActions(["signUpUser"]),
    signUp() {
      this.showMissingFieldsError = false
      if(this.email && this.password && this.firstName && this.lastName) {
        this.signUpUser({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
        });
        this.showMissingFieldsError = false
        return
      }
      this.showMissingFieldsError = true
    },
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
.sign-up-container {
  text-align: center;
  margin: auto;
  padding: 1em;
  width: 100%;
  .sign-up {
    text-align: center;
    margin: auto;
    max-width: 300px;
    .input-container {
      text-align: left;
      position: relative;
      padding-bottom: 10px;
      input {
        background: white;
        color: gray;
        width: 100%;
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
        top: 50px;
        width: 40px;
        text-align: center;
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
  .sign-up-container {
    margin-top: 90px;
  }
}
</style>