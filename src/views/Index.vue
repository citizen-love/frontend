<!-- we should utilize the skeleton loader methods from vuetify: https://vuetifyjs.com/en/components/skeleton-loaders/ -->

<template>
  <div class="center">
    <h1>{{ $t("index.main_headline") }} </h1>
    <p>{{ $t("index.teaser") }}</p>
    <div class="button-container">
      <v-btn color="primary" outlined block x-large :to="{name: 'ReceiveHelp'}">{{ $t("index.need_help") }}</v-btn>
      <v-btn color="primary" outlined block x-large>{{ $t("index.can_help") }}</v-btn>
    </div>
  </div>
</template>

<script>

import GeoLocationService from "../services/GeoLocation/GeoLocation"

export default {
  name: "Index",
  components: {
  },
  mounted() {
    GeoLocationService.getCoordinates((data) => {
      console.log(data)
    })
  }
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