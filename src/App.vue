<template>
  <v-app>
    <vue-headful
      title="CitizenLove - Get help in your neighbourhood"
      description="Need groceries? Babysitting? Put your help request on our app and we'll find help for you in no time!"
      keywords="TODO"
      image="TODO"
      lang="TODO"
      ogLocale="TODO"
      url="TODO"
    />
    <v-app-bar
      app
      color="primary">
      <router-link to="/">
        <img src="./assets/logo.svg" alt="logo">
      </router-link>
      <v-spacer/>
      <v-btn
        dark
        text
        class="d-none d-sm-inline-flex"
        :to="{ name: 'SelectLanguage'}">
        <v-icon class="mr-1">mdi-earth</v-icon>
        {{ languages.find( l => l.locale === $i18n.locale).name }}
      </v-btn>
      <v-btn
        class="mr-2"
        v-if="!isAuthenticated"
        dark
        text :to="{name: 'authentication'}">
        <v-icon class="mr-1">mdi-account-circle-outline</v-icon>
        {{ $t("auth.login") }}
      </v-btn>
      <v-btn
        depressed
        color="white"
        :to="{name: 'JoinHelpForce'}"
      >{{ $t('index.startHelping') }}
      </v-btn>
      <v-btn
        v-if="isAuthenticated"
        color="secondary"
        class="ma-1"
        @click="signOutUser">{{ $t("auth.logout") }}
      </v-btn>

    </v-app-bar>
    <!--<OverlayText v-if="!mobile" />-->
    <v-content>
      <v-container class="content pa-0">
        <router-view></router-view>
        <Footer/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Footer from "./components/footer/footer";
import { mapActions, mapGetters } from 'vuex';
import {LANGUAGES} from "./assets/data/languages";

/**
 * @description Root layout of the application
 * On start screen header is displayed with logo and possibility to change language of the app
 *
 * */
export default {
  name: "App",
  components: { Footer },
  data: () => ({
    drawer: false,
    mobile: window.innerWidth <= 650,
    languages: LANGUAGES
  }),
  computed: {
      ...mapGetters(["isAuthenticated"]),
      isDevelopmentEnvironment() {
        return process.env.NODE_ENV === 'development';
      }
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    },
    ...mapActions({
      tryAutoLogin: "tryAutoLogin",
      signOutUser: "signOutUser",
    })
  },
  created() {
    addEventListener("resize", () => {
      this.mobile = innerWidth <= 650;
    });
    this.tryAutoLogin();
  }
};
</script>

<style lang="scss">
  @import "./styles/globals";

  @media only screen and (min-width: 650px) {
    html {
      //background: url("./assets/background-hd-min.jpg") no-repeat center
      // center fixed;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
    }
    #app {
      background: 0 !important;
    }
    #app > .v-application--wrap {
      height: 100%;
    }
    .content {
      max-width: 1200px;

    }

    .dev-notice {
      text-align: center;
      background: rgba(255, 255, 0, 0.5);
      color: white;
    }
  }
</style>
