<template>
  <div class="footer--row">
    <div class="footer--sm-wrapper">
      <img src="../../assets/facebook-mini.svg"/>
      <img src="../../assets/instagram-mini.svg"/>
      <img src="../../assets/twitter-mini.svg"/>
      <img src="../../assets/github-mini.svg"/>
    </div>
    <div class="footer--lang-wrapper">
      <span>{{ $t("general.language") }}: </span>
            <router-link
        :to="{ name: 'SelectLanguage'}"
        v-on="on"
        class="overlay--row--languageitem"
      >{{ languages.find( l => l.locale === $i18n.locale).name }}</router-link>
    </div>
    <div class="footer--url-wrapper">
      <a>{{ $t("footer.privacyPolicy") }}</a>
      <a>{{ $t("footer.contactUs") }}</a>
    </div>
  </div>
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
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  & > div {
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Work Sans;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 0.25px;
  }
}
.footer--sm-wrapper {
    justify-content: flex-start!important;
}
.footer--url-wrapper {
    justify-content: space-around!important;
}
</style>