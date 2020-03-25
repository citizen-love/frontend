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
    <Header v-if="mobile" />
    <OverlayText v-if="!mobile" />
    <v-content class="desktop--app-wrapper">
      <v-container>
        <router-view></router-view>
      </v-container>
      <Footer v-if="!mobile" />
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import OverlayText from "./components/header/overlay";

/**
 * @description Root layout of the application
 * On start screen header is displayed with logo and possibility to change language of the app
 *
 * */
export default {
  name: "App",
  components: { Header, Footer, OverlayText },
  data: () => ({
    drawer: false,
    mobile: window.innerWidth <= 650
  }),
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    }
  },
  created() {
    addEventListener("resize", () => {
      this.mobile = innerWidth <= 650;
    });
  }
};
</script>

<style lang="scss">
@import "./styles/globals";

@media only screen and (min-width: 650px) {
  html {
    background: url("./assets/background-hd-min.jpg") no-repeat center
      center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  #app {
    background: 0!important;
  }
  #app > .v-application--wrap {
    height: 100%;
  }
  .desktop--app-wrapper {
    position: absolute;
    top: 10%;
    right: 10%;
    left: 15%;
    width: 70%;
    background-color: #fafafa;
    box-shadow: 0 1px 3px #c0c0c0;
    //min-height: 90vh;
    border-radius: 5px;
    padding-top: 25px !important;
  }
}
</style>
