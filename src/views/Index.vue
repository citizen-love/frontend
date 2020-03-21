<!-- we should utilize the skeleton loader methods from vuetify: https://vuetifyjs.com/en/components/skeleton-loaders/ -->

<template>
  <div class="center">
    <h1>{{ $t("index.main_headline") }} </h1>
    <p>{{ $t("index.teaser") }}</p>
    <div class="button-container">
      <v-btn color="primary" outlined block x-large :to="{name: 'ReceiveHelp'}">{{ $t("index.need_help") }}</v-btn>
      <v-btn color="primary" outlined block x-large>{{ $t("index.can_help") }}</v-btn>
    </div>
    <div class="requests-container">
        <HelpRequestCard
        v-for="request in relevantRequests" :key="request.id"
        v-bind:coordinates="request.data.coordinates"
        v-bind:community="request.data.community"
        v-bind:category="request.data.category"
        v-bind:title="request.data.title"
        v-bind:description="request.data.description"
        v-bind:id="request.id"
        />
    </div>
  </div>
</template>

<script>

import HelpRequestCard from "../components/helpRequestCard/helpRequestCard"

import GeoLocationService from "../services/GeoLocation/GeoLocation"
import HelpRequestRealTime from "../services/HelpRequestRealTime"

export default {
  name: "Index",
  components: {HelpRequestCard},
  data() {
    return {
      relevantRequests: []
    }
  },
  async mounted() {
    const { lat, lon } = await GeoLocationService.getIpAddress()
    const getRelevantRequests = await HelpRequestRealTime.getAllRequests(
      { lat: parseFloat(lat), lon: parseFloat(lon)},
      5)
    this.relevantRequests = getRelevantRequests
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

  .requests-container {
    display: flex;   
    overflow: hidden;
    flex-wrap: wrap;
    justify-content:center;
  }
</style>