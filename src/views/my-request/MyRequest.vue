<template>
<div>
  <div class="center" v-if="loading">
    <p>{{ $t("index.myrequests_pageloading") }}</p>
  </div>
  <div class="center" v-else-if="!hasError">
    <h1>{{ $t("index.myrequests_headline") }}</h1>
    <p>{{ $t("index.myrequests_teaser") }}</p>
    <div class="button-container">
      <v-btn v-on:click="changeRequestStatus('completed')" color="primary" outlined block x-large>{{ $t("myrequest.myrequests_fulfilled") }}</v-btn>
      <v-btn v-on:click="changeRequestStatus('cancelled')" color="secondary" outlined block x-large>{{ $t("myrequest.myrequests_cancelled") }}</v-btn>
    </div>
  </div>
    <div class="center" v-else>
    <p>{{ $t("index.myrequests_pagenotfound") }}</p>
  </div>
</div>
</template>

<script>
import HelpRequestService from "../../services/HelpRequestService";

export default {
  name: "MyRequest",
  components: {},
  data() {
    return {
      requestHash: this.$route.params.requesthash,
      loading: true,
      hasError: false,
      requestObject: {}
    };
  },
  async mounted() {
    try {
      const requestObject = await HelpRequestService.getHelpRequestData(
        this.requestHash
      );
      console.log(requestObject);
      this.requestObject = requestObject;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.hasError = true;
    }
  },
  methods: {
    async changeRequestStatus(status) {
      try {
        await HelpRequestService.updateHelpRequest(this.requestHash, status);
        this.loading = false;
      } catch (e) {
        this.loading = false;
        this.hasError = true;
      }
    }
  }
};
</script>
