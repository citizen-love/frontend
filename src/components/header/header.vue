<template>
  <v-container class="header" v-if="$route.path === '/'">
    <div class="header--static-row">
      <img src="../../assets/logo.svg" alt="citizen love" />
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
    </div>
    <div class="header--copy-row">
      <h1>{{ $t("index.main_headline") }}</h1>
      <p>{{ $t("index.teaser") }}</p>
    </div>
    <div class="header--button-row">
      <v-btn @click.native="logEvent('New need')" color="primary" block x-large :to="{name: 'ReceiveHelp'}">{{ $t("index.need_help") }}</v-btn>
      <v-btn @click.native="logEvent('New helper')" class="helper-register" color="green" block x-large :to="{name: 'RegisterForHelp'}">{{ $t("index.offer_help") }}</v-btn>
    </div>
  </v-container>
</template>

<script>
import {LANGUAGES} from "../../assets/data/languages";
import firebase from 'firebase';

export default {
    name: "Header",
  data() {
      return {
        languages: LANGUAGES,
      }
  },
  methods: {
    logEvent(event_name){
        firebase.analytics().logEvent('button_click',{name:event_name, device: 'Mobile', lang: this.$i18n.locale});
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

@media only screen and (max-width: 650px) {
  .header {
  background-size: cover;
  background-image: url("../../assets/header-asset-background.jpg");
  }
}

.helper-register{
  margin-top: 20px;
}

.header {
  display: grid;
  padding: 30px;
  color: white;
  border-radius: 0 0 5px 5px;
  min-height: 50vh;
  &--static-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
     a {
      color: white;
      text-transform: uppercase;
    }
  }
  &--copy-row {
    width: 70%;
    margin-top: 38px;
    margin-bottom: 18px;
    & > h1 {
      font-size: 24px;
      line-height: 28px;
      color: #FFFFFF;
    }
    & > p {
      font-size: 10px;
      line-height: 16px;
      margin-top: 8px;
      opacity: 0.87;
    }
  }
}
</style>