<template>
  <div class="component center">
    <div>
      <v-icon size="160px" color="green">mdi-check-circle-outline</v-icon>
    </div>
    <h1>{{ $t("registerHelpConfirm.mainTitle") }}</h1>
    <h2> {{ $t("registerHelpConfirm.mainDescription") }}</h2>
    <i18n tag="p" path="registerHelpConfirm.mainExplanation">
      <strong place="email">{{ email }}</strong>
    </i18n>
    <p>
      <v-btn :to="{name: 'Home'}" color="primary">
        {{ $t("registerHelpConfirm.backToButton")}}
      </v-btn>
    </p>
  </div>
</template>

<script>
  export default {
    name: "Confirm",
    data() {
      const request = this.$route.params.request;

      return {
        email: request.email,
      }
    }
  }
</script>

<style scoped lang="scss">

  .component {
    text-align: center;
    padding-top: 20vh;
  }
</style>