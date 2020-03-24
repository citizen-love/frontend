<template>
  <div>
    <div v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-if="hasError">
      <p>{{ $t("offerHelp.error_happened_notfound") }}</p>
    </div>

    <div v-else>
      <wizard-step-header current-step="1" max-steps="1" toHome="true" />
      <div>
        <v-img v-bind:src="help.mapSource"></v-img>
        <p>{{help.timeOfCreation}}</p>
      </div>

      <div>
        <p>{{help.title}}</p>
        <p>{{help.description}}</p>
        <p>{{help.community}}</p>
      </div>

      <v-form v-model="isOfferValid">
        <h2>{{ $t("offerHelp.phone_label") }}</h2>
        <v-text-field v-model="offer.phone" :placeholder="$t(`offerHelp.phone_placeholder`)" />
        <h2>{{ $t("offerHelp.message_label") }}</h2>
        <v-textarea
          required
          counter="500"
          v-model="offer.offerBody"
          :rules="descRules"
          :placeholder="$t(`offerHelp.message_placeholder`)"
        />
        <h2>{{ $t("offerHelp.email_label") }}</h2>
        <v-text-field
          required
          v-model="offer.email"
          :rules="emailRules"
          :placeholder="$t(`offerHelp.email_placeholder`)"
        />

        <wizard-next-button
          @click.native="send"
          :disabled="!isOfferValid"
          :loading="isButtonLoading"
        >{{ $t("offerHelp.send_offer") }}</wizard-next-button>
      </v-form>
    </div>
  </div>
</template>

<script>
import WizardNextButton from "../../components/WizardNextButton";
import WizardStepHeader from "../../components/WizardStepHeader";

import HelpRequestDirectService from "../../services/HelpRequestRealTime";
import HelpOfferService from "../../services/HelpOfferService";
import MapSnapshot from "../../services/MapSnapshot";

import humanTime from "../../utils/timestampToDate";

export default {
  name: "MyRequest",
  components: { WizardNextButton, WizardStepHeader },
  data() {
    return {
      requestId: this.$route.params.helprequestid,
      loading: true,
      isButtonLoading: false,
      hasError: false,
      help: {},
      offer: {
        phone: "",
        offerBody: "",
        email: ""
      },
      isOfferValid: false,
      emailRules: [
        v => !!v || this.$t("request_help_process.step2.email_error_missing"),
        v =>
          /[^@\s]+@[^@\s]+\.[^@\s]/.test(v) ||
          this.$t("request_help_process.step2.email_error_wrong")
      ],
      descRules: [
        v => !!v || this.$t("request_help_process.step2.desc_error_missing")
      ]
    };
  },
  async mounted() {
    try {
      const requestObject = await HelpRequestDirectService.getSingleRequest(
        this.requestId
      );
      console.log(requestObject);
      this.help = {
        ...requestObject,
        timeOfCreation: humanTime(requestObject.createdAt),
        mapSource: MapSnapshot.getStaticUrl(
          {
            lat: requestObject.coordinates.latitude,
            lon: requestObject.coordinates.longitude
          },
          14,
          "340x160"
        )
      };
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.hasError = true;
    }
  },
  methods: {
    async send() {
      if (!this.isOfferValid) {
        return;
      }
      try {
        this.isButtonLoading = true;
        await HelpOfferService.createHelpOffer(
          this.requestId,
          this.offer
        );
        this.$router.push({name: 'HelpGivingConfirmation'});
        return;
      } catch (e) {
      this.isButtonLoading = false;
      this.hasError = true;
      }
    }
  }
};
</script>
