<!-- we should utilize the skeleton loader methods from vuetify: https://vuetifyjs.com/en/components/skeleton-loaders/ -->

<template>
  <div class="center">
    <div class="autosuggest-container">
      <h1>{{relevantRequests.length}} {{ $t('index.amount_people_need_help')}}</h1>
      <AutoComplete v-bind:updateLocation="updateLocation"/>
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
        v-bind:mobile="mobile"
        />
    </div>
  </div>
</template>

<script>

import HelpRequestCard from "../components/helpRequestCard/helpRequestCard"
import AutoComplete from "../components/autoComplete/autoComplete"

import GeoLocationService from "../services/GeoLocation/GeoLocation"
import HelpRequestRealTime from "../services/HelpRequestRealTime"

export default {
  name: "Index",
  components: {HelpRequestCard, AutoComplete},
  data() {
    return {
      relevantRequests: [],
      mobile:window.innerWidth <= 650
    }
  },
  async mounted() {
    const { lat, lon } = await GeoLocationService.getIpAddress()
    const getRelevantRequests = await HelpRequestRealTime.getAllRequests(
      { lat: parseFloat(lat), lon: parseFloat(lon)},
      100)
    this.relevantRequests = getRelevantRequests
  },
    created(){
  addEventListener('resize', () => {
    this.mobile = innerWidth <= 650
  })
},
  methods: {
    async updateLocation({ latitude, longitude }){
      const getRelevantRequests = await HelpRequestRealTime.getAllRequests(
      { lat: latitude, lon: longitude},
      100)
    this.relevantRequests = getRelevantRequests
    }
  }
};
</script>

<style scoped lang="scss">

  .autosuggest-container {
    text-align: left;
    max-width: 350px;
    margin: auto;
  }

  @media only screen and (min-width: 650px) {
    .requests-container {
      display: block!important;
      & > :last-child {
        border: 0!important;
      }
    }
  }

  .requests-container {
    display: flex;   
    overflow: hidden;
    flex-wrap: wrap;
    justify-content:center;
  }
</style>