<template>
  <div class="component center">
    <div>
      <v-icon size="160px" color="green">mdi-check-circle-outline</v-icon>
    </div>
    <h1>{{ $t("register_as_helper.confirm.title") }}</h1>
    <h2> {{ $t("register_as_helper.confirm.subtitle") }}</h2>
    <i18n tag="p" path="request_help_process.confirm.text">
      <strong place="email">{{ email }}</strong>
    </i18n>
    <p>
      <v-btn :to="{name: 'Home'}" color="primary">
        {{ $t("register_as_helper.confirm.back_to_start_btn")}}
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