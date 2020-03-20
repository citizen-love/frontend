<!-- we should utilize the skeleton loader methods from vuetify: https://vuetifyjs.com/en/components/skeleton-loaders/ -->

<template>
  <div class="center">
    <h1>Hilfe einfach gemacht</h1>
    <p>CitizenLove verbinden Hifeanbietende ganz einfach mit Leuten, welche Hilfe benötigen.</p>
    <div class="button-container">
      <v-btn color="primary" outlined block x-large :to="{name: 'ReceiveHelp'}">I need help</v-btn>
      <v-btn color="primary" outlined block x-large>I want to help</v-btn>
    </div>
  </div>
</template>

<script>

export default {
  name: "Index",
  components: {
  },
};
</script>

<style scoped lang="scss">

  .button-container {
    margin-top: 20px;

    .v-btn {
      margin: 20px 0;
    }
  }
  h1 {
    margin: 20vh 0 20px 0
  }
</style>