<template>
  <div>
    <v-container class="header" primary>
    </v-container>
    <br/>
    <v-container>
      <router-link :to="{ name: 'Home'}" class="close"><b>X</b></router-link>
      <h1>{{ $t("select_language.title") }}</h1>
    </v-container>
    <div>
      <v-row>
        <v-col
          v-for="lang in languages"
          :key="lang.locale"
          cols="6"
          sm="4"
          class="center"
        >
          <v-btn 
            color="secondary"
            outlined
            :class="{'selected': lang.locale === $i18n.locale}"
            x-large 
            class="ma-2 language-btn"
            @click="selectNewLanguage(lang.locale)">
              {{ lang.name }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { LANGUAGES } from "@/assets/data/languages"

/** 
 * @description Page to select language to be used in the app.
 * Unlike other text in the app, text on this page is always written on the original language.
 * If language is currently selected, the button is outlined.
 * 
 * Once user clicks the new language, locale is changed globally and user will be returned to home page.
 */
export default {
  name: "selectLanguage",
  data: function() {
    return {
      languages: LANGUAGES
    }
  },
  methods: {
    selectNewLanguage(newLocale) {
      this.$i18n.locale = newLocale
      this.$router.push("/")
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    position: absolute;
    width: 100vw;
    left: 0;
    top: 0;
    right: 0;
    border-radius: 0 0 5px 5px;
  }

  .close {
    color: gray;
    text-decoration: none;
    font-size: 1.5em;
    margin: 3em 0em;
    padding-top: 1em;
  }

  .v-btn.v-size--x-large.v-btn--outlined.language-btn {
    margin:  1em 1em 1em 1em;
    min-width: 120px;

    &:not(.selected) {
      border: none;
    }
  }
</style>