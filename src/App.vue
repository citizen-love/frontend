<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      overflow
      app
    >
      <v-list dense>
        <v-list-item router v-bind:to="{name: 'Home'}">
          <v-list-item-action>
            <v-icon>mdi-inbox</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router v-bind:to="{name: 'About'}">
          <v-list-item-action>
            <v-icon>mdi-email-open</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router v-bind:to="{name: 'HelloWorld'}">
          <v-list-item-action>
            <v-icon>mdi-email-open</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Generated Hello World example</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>CitizenLove</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link :to="{name:'Home'}">
        <v-btn
          href="#"
          text
        >
          Home
        </v-btn>
      </router-link>
      <router-link :to="{name:'About'}">
        <v-btn
          href="#"
          text
        >
          About
        </v-btn>
      </router-link>
      <v-btn
        href="#"
        text
      >
        EN
      </v-btn>
      <v-btn
        href="#"
        text
      >
        FR
      </v-btn>
      <v-btn
        href="#"
        text
      >
        IT
      </v-btn>
      <v-btn
        href="#"
        text
      >
        DE
      </v-btn>
    </v-app-bar>

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
    })
  };
</script>

<style lang="scss" scoped>

</style>
