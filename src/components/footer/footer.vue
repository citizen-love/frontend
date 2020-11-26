<template>
  <v-row class="footer--row">
    <v-col
      cols="2"
      sm="2"
      class="footer--sm-wrapper">
    <!--
      <img src="../../assets/facebook-mini.svg"/>
      <img src="../../assets/instagram-mini.svg"/>
      <img src="../../assets/twitter-mini.svg"/>
    -->
      <a href="https://github.com/citizen-love/"><img src="../../assets/github-mini.svg"/></a>
    </v-col>
    <v-col
      cols="10"
      sm="4"
      class="footer--lang-wrapper">
      <span>{{ $t("general.language") }}: </span>
            <router-link
        :to="{ name: 'SelectLanguage'}"
        v-on="on"
        class="overlay--row--languageitem"
      >{{ languages.find( l => l.locale === $i18n.locale).name }}</router-link>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      class="footer--url-wrapper">
      <router-link :to="{name:'PrivacyPolicy'}">{{ $t("index.privacyPolicy") }}</router-link>
      <router-link :to="{name:'Imprint'}">{{ $t("index.imprint") }}</router-link>
      <router-link :to="{name: 'About'}">{{ $t("index.contactUs") }}</router-link>
    </v-col>
  </v-row>
</template>

<script>
import {LANGUAGES} from "../../assets/data/languages";

export default {
  name: "Footer",
      data() {
      return {
        languages: LANGUAGES,
      }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.footer--row {
  border-top: 1px solid #d3d3d3;
  height: 50px;
  & > div {
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.25px;
  }
}
.footer--sm-wrapper {
    & > img, & > a img {
      cursor: pointer;
      height: 17px;
      margin: 0 8px;
    }
}
.footer--url-wrapper {
    & > a{
      color: #000;
    }
  display: flex;
  justify-content: space-between;
}
.overlay--row--languageitem{
  padding-left: 4px;
}
</style>