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
  watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || 'CitizenLove - Get help in your neighbourhood';
                this.$analytics.logEvent("page_view",{page_title: to.meta.title});
            }
        }
  },
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
  #app {
    background-image: url("./assets/header-asset-background.jpg") !important;
    background-size: cover;
  }
  .desktop--app-wrapper {
    position: absolute;
    top: 10%;
    left: 10%;
    right: 10%;
    background-color: white;
    box-shadow: 1px 1px 3px #c0c0c0;
    max-height: 90vh;
    border-radius: 4px;
    padding-top: 25px !important;
    overflow-y: scroll;
  }

  .desktop--app-wrapper::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    background-color: #f5f5f5;
  }

  .desktop--app-wrapper::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f538;
  }

  .desktop--app-wrapper::-webkit-scrollbar-thumb {
    border-radius: 2px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #FA4659;
  }
}
</style>
