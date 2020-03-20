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
    <v-container class="header" v-if="$route.path === '/'">
      <div><img src="./assets/logo.svg" alt="citizen love"></div>
      <div><a href="#">Deutsch</a></div>
    </v-container>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    data: () => ({
      drawer: false
    }),
    methods: {
      changeLocale(locale){
        this.$i18n.locale = locale;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./styles/variables";

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $_color_primary;
    padding: 30px 10px ;
    color: white;
    border-radius: 0 0 5px 5px;

    img {
      width: 200px;
      vertical-align: middle;
    }

    a {
      color: white;
      text-transform: uppercase;
      margin-right: 20px;
    }
  }
</style>
