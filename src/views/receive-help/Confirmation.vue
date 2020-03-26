<template>
  <div class="component">
    <div>
      <v-icon size="160px" color="green">mdi-check-circle-outline</v-icon>
    </div>
    <h1>{{ $t("receiveHelpConfirm.mainTitle") }}</h1>
    <h2> {{ $t("receiveHelpConfirm.mainDescription") }}</h2>
    <i18n tag="p" path="receiveHelpConfirm.mainExplanation">
      <strong place="email">{{ email }}</strong>
    </i18n>
    <p>
      <v-btn :to="{name: 'Home'}" color="primary">
        {{ $t("receiveHelpConfirm.backToButton")}}
      </v-btn>
    </p>
  </div>
</template>

<script>
  export default {
    name: "Confirmation",
    data(){
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