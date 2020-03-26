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

.offer--form {
  width: 65%;
  & > h2 {
    @include actionPage--title;
  }
  &--submitbutton {
    margin-bottom: 80px;
  }
}

.mobile--nav--icon {
  display: none;
}

@media only screen and (max-width: 650px) {
  .mobile--nav--icon {
    display: block;
  }
  .offer--form {
    width: 100%;
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

    <div v-else class="detailedview--root">
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

      <v-form v-model="isOfferValid" class="offer--form">
        <h2>{{ $t("offerHelp.phone_label") }}</h2>
        <v-text-field
          v-model="offer.phone"
          prepend-inner-icon="mdi-phone-outline"
          :placeholder="$t(`offerHelp.phone_placeholder`)"
        />
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

        <v-btn
          v-if="!operationFinished"
          large
          color="primary"
          class="offer--form--submitbutton"
          @click.native="send"
          :disabled="!isOfferValid"
          :loading="isButtonLoading"
        >{{ $t("offerHelp.send_offer") }}</v-btn>
      </v-form>
      <div v-if="operationFinished" class="detailedview--confirmation">
        <img src="../../assets/green-checkmark.svg" />
        <span>{{ $t("offerHelp.successfull_help") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import HelpRequestDirectService from "../../services/HelpRequestRealTime";
import HelpOfferService from "../../services/HelpOfferService";
import MapSnapshot from "../../services/MapSnapshot";

import humanTime from "../../utils/timestampToDate";

export default {
  name: "MyRequest",
  data() {
    return {
      requestId: this.$route.params.helprequestid,
      loading: true,
      isButtonLoading: false,
      operationFinished: false,
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
      this.help = {
        ...requestObject,
        timeOfCreation: humanTime(requestObject.createdAt),
        mapSource: MapSnapshot.getStaticUrl(
          {
            lat: requestObject.coordinates.latitude,
            lon: requestObject.coordinates.longitude
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
    async send() {
      if (!this.isOfferValid) {
        return;
      }
      try {
        this.isButtonLoading = true;
        await HelpOfferService.createHelpOffer(this.requestId, this.offer);
        this.operationFinished = true;
        return;
      } catch (e) {
        this.isButtonLoading = false;
        this.hasError = true;
      }
    },
    backToHome() {
      this.$router.push("/");
    }
  }
};
</script>
