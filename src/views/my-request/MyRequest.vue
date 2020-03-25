<style scoped lang="scss">
@import "../../styles/_typography";

.detailedview {
  &--center {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
  &--root {
    width: 96%;
    margin: auto;
  }
  &--confirmation {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10%;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  &--header {
    border-bottom: 1px solid #d3d3d3;
    & > p {
      @include actionPage--minorText;
    }
  }
  &--description {
    & > h3 {
      margin-top: 8px;
      @include actionPage--title;
    }
    & > p {
      @include actionPage--description;
    }
    &--community {
      @include actionPage--minorText;
    }
  }
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 16px;
      & > button {
      width: 40%;
    }
}

.mobile--nav--icon {
  display: none;
}

@media only screen and (max-width: 650px) {
  .mobile--nav--icon {
    display: block;
  }

  .button-container {
    display: grid;
    & > button {
      width: 100%;
      margin-top: 16px;
    }
  }
}
</style>

<template>
  <div>
    <div v-if="loading" class="detailedview--center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-if="hasError" class="detailedview--center">
      <p>{{ $t("offerHelp.error_happened_notfound") }}</p>
    </div>

    <div v-if="!loading && !hasError" class="detailedview--root">
      <v-btn icon x-large @click="backToHome" class="mobile--nav--icon">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div class="detailedview--header">
        <v-img v-bind:src="help.mapSource"></v-img>
        <p>{{help.timeOfCreation}}</p>
      </div>

      <div class="detailedview--description">
        <h3>{{help.title}}</h3>
        <p>{{help.description}}</p>
        <p class="detailedview--description--community">{{help.community}}</p>
      </div>
      <div class="button-container">
        <v-btn
          v-on:click="changeRequestStatus('completed')"
          color="primary"
          outlined
        >{{ $t("myrequest.myrequests_fulfilled") }}</v-btn>
        <v-btn
          v-on:click="changeRequestStatus('cancelled')"
          color="secondary"
          outlined
        >{{ $t("myrequest.myrequests_cancelled") }}</v-btn>
      </div>
    </div>
  </div>
</template>



<script>
import HelpRequestService from "../../services/HelpRequestService";
import MapSnapshot from "../../services/MapSnapshot";

import humanTime from "../../utils/timestampToDate";

export default {
  name: "MyRequest",
  components: {},
  data() {
    return {
      requestHash: this.$route.params.requesthash,
      loading: true,
      hasError: false,
      help: {}
    };
  },
  async mounted() {
    try {
      const help = await HelpRequestService.getHelpRequestData(
        this.requestHash
      );
      this.help = {
        ...help,
        timeOfCreation: humanTime(help.createdAt),
        mapSource: MapSnapshot.getStaticUrl(
          {
            lat: help.coordinates.latitude,
            lon: help.coordinates.longitude
          },
          14,
          "680x320"
        )
      };
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.hasError = true;
    }
  },
  methods: {
    async changeRequestStatus(status) {
      this.loading = true;
      try {
        await HelpRequestService.updateHelpRequest(this.requestHash, status);
        this.loading = false;
        this.$router.push("/");
      } catch (e) {
        this.loading = false;
        this.hasError = true;
      }
    },
    backToHome() {
      this.$router.push("/");
    }
  }
};
</script>
