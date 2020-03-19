<template>
  <div class="component">
    <div>
      <v-icon size="160px" color="green">mdi-check-circle-outline</v-icon>
    </div>
    <h1>Great success!</h1>
    <h2>Our helpers will contact you shortly by e-mail!</h2>
    <p>You will receive an e-mail to XXX with a copy of your request.</p>
    <p>
      <v-btn :to="{name: 'Home'}" color="primary">
        Back to Start
      </v-btn>
    </p>
  </div>
</template>

<script>
  export default {
    name: "Confirmation"
  }
</script>

<style scoped lang="scss">

  .component {
    text-align: center;
    padding-top: 20vh;
  }
</style>