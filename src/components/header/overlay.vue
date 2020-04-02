<template>
  <div class="overlay--row">
    <img src="../../assets/logo.svg" alt="citizen love" @click="navigateHome" />
    <div>
      <router-link
        :to="{ name: 'SelectLanguage'}"
        class="overlay--row--languageitem"
      >{{ languages.find( l => l.locale === $i18n.locale).name }}</router-link>
    </div>
      <div>
      <div v-if="isAuthenticated">
        <router-link
        :to="{ name: 'profile'}"
      >
        <v-btn>{{ $t("userProfile.profile")}}</v-btn>
      </router-link>
        <v-btn color="primary" @click="signOutUser">{{ $t("auth.logout")}}</v-btn>
      </div>
      <router-link
        v-else
        :to="{ name: 'authentication'}"
      >
        <v-btn>{{ $t("auth.signup")}}</v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import {LANGUAGES} from "../../assets/data/languages";
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "OverlayText",
    data() {
      return {
        languages: LANGUAGES,
      }
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    ...mapActions(["signOutUser"]),
    navigateHome(){
      this.$router.replace("/")
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.overlay--row {
    width: 70%;
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