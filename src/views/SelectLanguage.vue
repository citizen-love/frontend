<template>
  <div>
    <v-container>
      <a href="/" class="close">X</a>
      <h1>{{ $t("select_language.title") }}</h1>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="lang in languages"
          :key="lang.locale"
          cols="6"
          sm="4"
          lg="3"
          class="center"
        >
          <v-btn 
            color="primary"
            outlined
            x-large 
            class="ma-2 language-btn"
            @click="selectNewLanguage(lang.locale)">
              {{ lang.name }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/** 
 * @description Page to select language to be used in the app
 * Unlike other text in the app, text on this page is always written on the original language
 * If language is currently selected, check icon is displayed next to it
 * @TODO check that these translations are correct
 */
export default {
  name: "selectLanguage",
  data: function() {
    return {
      languages: [
        { locale: "en", name: "English" },
        { locale: "de", name: "Deutsch" },
        { locale: "fr", name: "Français" },
        { locale: "it", name: "Italiano" },
        { locale: "rm", name: "Română"}
        // add new languages here
      ]
    }
  },
  computed: {
    currentLocale: function() {
      return this.$i18n.locale
    }
  },
  methods: {
    selectNewLanguage(newLocale) {
      // not working yet
      this.$i18n.locale = newLocale
    }
  }
}
</script>

<style lang="scss" scoped>
  .center {
    text-align: center;
  }

  .close {
    color: gray;
    text-decoration: none;
    font-size: 1.5em;
    margin: 0.5em 0;
  }

  .v-btn.v-size--x-large.language-btn {
    margin:  1em;
    min-width: 140px;
  }
</style>