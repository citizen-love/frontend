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
    <Header/>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import Header from "./components/header/header"

export default {
  name: "App",
  components: {Header},
  data: () => ({
    drawer: false
  }),
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    }
  }
};
</script>

<style lang="scss">
@import "./styles/globals";
</style>
