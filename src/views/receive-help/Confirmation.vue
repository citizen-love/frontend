<template>
  <div class="component">
    <div>
      <v-icon size="160px" color="green">mdi-check-circle-outline</v-icon>
    </div>
    <h1>{{ $t("request_help_process.confirm.title") }}</h1>
    <h2> {{ $t("request_help_process.confirm.subtitle") }}</h2>
    <i18n tag="p" path="request_help_process.confirm.text">
      <strong place="email">{{ email }}</strong>
    </i18n>
    <p>
      <v-btn :to="{name: 'Home'}" color="primary">
        {{ $t("request_help_process.confirm.back_to_start_btn")}}
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