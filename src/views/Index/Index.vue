<!-- we should utilize the skeleton loader methods from vuetify: https://vuetifyjs.com/en/components/skeleton-loaders/ -->

<template>
  <div>
    <div class="hero">
      <v-row class="category-row">
        <v-col
          cols="12"
          d-xs-none
          offset="0"
          md="10"
          offsetMd="1"
          class="category-columns d-none d-md-block">
          <categories/>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          md="5"
          lg="5"
          offsetSm="1"
          sm="8"
          xs="12"
          offsetXs="0"
          class="hero-text">
          <h1>{{ $t("index.mainTitle") }}</h1>
          <p>{{ $t("index.mainDescription") }}</p>
          <p class="center">
            <v-btn
              color="primary"
              class="ma-1"
              large
              :to="{name: 'ReceiveHelp'}">{{ $t("index.buttonNeedHelp") }}
            </v-btn>
            <v-btn
            color="primary"
            class="ma-1"
            large
            outlined
            :to="{name: 'JoinHelpForce'}">{{ $t("index.buttonNotifyMe") }}
            </v-btn>
          </p>
        </v-col>
      </v-row>
    </div>
    <div class="image d-sm-none">
      <img src="../../assets/hero/hero_image_homepage_700.jpg"/>
    </div>
    <div class="desktop--header">
      <div class="autosuggest-container">
        <h1>{{relevantRequests.length}} {{ $t('index.peopleAroundYou')}}</h1>
        <AutoComplete v-bind:updateLocation="updateLocation" v-bind:defaultValue="inputShownAddress"/>
      </div>
    </div>
    <div class="requests-container">
      <v-row>
        <v-col
          v-for="request in relevantRequests"
          :key="request.id"
          xs="12"
          sm="6"
          md="4"
        >
          <HelpRequestCard
            v-bind:coordinates="request.data.coordinates"
            v-bind:community="request.data.community"
            v-bind:category="request.data.category"
            v-bind:title="request.data.title"
            v-bind:description="request.data.description"
            v-bind:id="request.id"
            v-bind:mobile="mobile"
          />
        </v-col>

      </v-row>

    </div>
  </div>
</template>

<script>
  import HelpRequestCard from "../../components/helpRequestCard/helpRequestCard";
  import AutoComplete from "../../components/autoComplete/autoComplete";

  import GeoLocationService from "../../services/GeoLocation/GeoLocation";
  import HelpRequestRealTime from "../../services/HelpRequestRealTime";
  import Categories from "./CategoryTabs";

  export default {
    name: "Index",
    components: {Categories, HelpRequestCard, AutoComplete},
    data() {
      return {
        relevantRequests: [],
        mobile: window.innerWidth <= 650,
        inputShownAddress: "",
      };
    },
    async mounted() {
      const {lat, lon} = await GeoLocationService.getIpAddress();
      const fullAddress = await GeoLocationService.getReverseLocation();
      const getRelevantRequests = await HelpRequestRealTime.getAllRequests(
        {lat: parseFloat(lat), lon: parseFloat(lon)},
        100
      );
      this.relevantRequests = getRelevantRequests;
      this.inputShownAddress = fullAddress;
    },
    created() {
      addEventListener("resize", () => {
        this.mobile = innerWidth <= 650;
      });
    },
    methods: {
      async updateLocation({latitude, longitude}) {
        const getRelevantRequests = await HelpRequestRealTime.getAllRequests(
          {lat: latitude, lon: longitude},
          100
        );
        this.relevantRequests = getRelevantRequests;
      }
    }
  };
</script>

<style scoped lang="scss">


  .hero {
    background-position: left;
    background-repeat: no-repeat;
    background-size: cover;
  }

  @media (min-width: 600px) {
    .hero {
      background-image: url('../../assets/hero/hero_image_homepage_2500.jpg');
      margin: -12px;
      padding: 12px;
    }
    .category-columns {
      padding: 0;
      margin-top: 3vw;
    }
    .hero-text {
      background: #fefefe;
      margin-bottom: 20vh;
      padding: 30px;
    }
  }

  div.image {
    margin: -12px;

    img {
      width: 100%;
    }
  }

  .autosuggest-container {
    text-align: left;
    max-width: 350px;
    margin: auto;
    margin-top: 25px;

    & > h1 {
      font-size: 24px;
      line-height: 28px;
      color: #000000;
      font-family: Work Sans;
      font-style: normal;
      font-weight: normal;
    }
  }

  @media only screen and (min-width: 650px) {
    .autosuggest-container {
      margin-left: 5%;
      margin-top: 42px;
    }
  }
</style>