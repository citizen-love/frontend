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
    <Header v-if="mobile"/>
    <v-tooltip left>
    <template v-slot:activator="{ on }">
      <div>
        <router-link
          :to="{ name: 'SelectLanguage'}"
          v-on="on">
          {{ languages.find( l => l.locale === $i18n.locale).name }}
        </router-link>
      </div>
    </template>
    <span>{{ $t("select_language.title") }}</span>
  </v-tooltip>
    <v-content class="desktop--app-wrapper">
      <v-container>
        <router-view></router-view>
      </v-container>
      <Footer v-if="!mobile"/>
    </v-content>
  </v-app>
</template>

<script>
import { LANGUAGES } from "@/assets/data/languages"

import Header from "./components/header/header"
import Footer from "./components/footer/footer"

/**
 * @description Root layout of the application
 * On start screen header is displayed with logo and possibility to change language of the app
 *
export default {
  name: "App",
  components: {Header, Footer},
  languages: LANGUAGES
  data: () => ({
    drawer: false,
    mobile:window.innerWidth <= 650
  }),
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    }
  },
  created(){
  addEventListener('resize', () => {
    this.mobile = innerWidth <= 650
  })
}
};
</script>

<style lang="scss">
@import "./styles/globals";

@media only screen and (min-width: 650px) {
  #app {
  background-image: url("./assets/header-asset-background.jpg")!important;
  background-size: cover;
}
.desktop--app-wrapper {
  position: absolute;
  top: 10%;
  left: 10%;
  right: 10%;
  background-color:white;
  box-shadow: 1px 1px 3px #c0c0c0;
  max-height: 90vh;
  border-radius: 4px;
  overflow-y: scroll;
}
}

</style>
