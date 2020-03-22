<template>
  <div class="overlay--row">
    <img src="../../assets/logo.svg" alt="citizen love" />
    <div>
      <router-link
        :to="{ name: 'SelectLanguage'}"
        v-on="on"
        class="overlay--row--languageitem"
      >{{ languages.find( l => l.locale === $i18n.locale).name }}</router-link>
    </div>
  </div>
</template>

<script>
import {LANGUAGES} from "../../assets/data/languages";

export default {
  name: "OverlayText",
    data() {
      return {
        languages: LANGUAGES,
      }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.overlay--row {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    margin-top: 24px;
    &--languageitem {
        text-transform: uppercase;
        color: #fff;
    }
}
</style>