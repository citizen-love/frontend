<template>
  <div class="has-wizard">
    <div>
      <v-btn class="arrow-left" icon x-large @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <v-form :v-model="isFormValid">
      <h1>{{ $t("register_as_helper.register.headline")}}</h1>
      <h5>{{ $t("register_as_helper.register.location")}}</h5>
      <span>{{ $t("register_as_helper.register.location_explained") }}</span>
      <div>
        <AutoComplete v-bind:updateLocation="getAddressData" />
      </div>
      <h5>{{ $t("register_as_helper.register.radius")}}</h5>
      <span>{{ $t("register_as_helper.register.radius_explained") }}</span>
      <v-slider
        class="slider"
        thumb-label="always"
        v-model="formData.radius"
        min="0"
        :thumb-size="40"
        max="30"
      >
        <template v-slot:thumb-label="{ value }">{{ value }} km</template>
      </v-slider>

      <h5>{{ $t("register_as_helper.register.email")}}</h5>
      <span>{{ $t("register_as_helper.register.email_explained") }}</span>
      <v-text-field
        class="text-input"
        required
        v-model="formData.email"
        :rules="emailRules"
        :placeholder="$t('request_help_process.step2.email_placeholder')"
      />
      <h5>{{ $t("register_as_helper.register.phone")}}</h5>
      <span>{{ $t("register_as_helper.register.phone_explained") }}</span>
      <v-text-field
        class="text-input"
        v-model="formData.phone"
        :placeholder="$t('register_as_helper.register.phone_placeholder')"
      ></v-text-field>
    </v-form>

    <v-btn
      class="next-button"
      color="secondary"
      @click.native="registerHelper"
      :disabled="!isFormDataValid"
      :loading="isBusy"
      :placeholder="$t('request_help_process.step2.email_placeholder')"
    >{{ $t("register_as_helper.register.next")}}</v-btn>
  </div>
</template>

<script>
import AutoComplete from "../../components/autoComplete/autoComplete";
import HelperService from "../../services/HelperService";

export default {
  name: "Register",
  components: { AutoComplete },
  data() {
    return {
      isBusy: false,
      formData: {
        email: undefined,
        radius: 5,
        location: undefined,
        community: undefined,
        country: undefined
      },
      isFormValid: false,
      emailRules: [
        v => !!v || this.$t("request_help_process.step2.email_error_missing"),
        v =>
          /[^@\s]+@[^@\s]+\.[^@\s]/.test(v) ||
          this.$t("request_help_process.step2.email_error_wrong")
      ]
    };
  },
  computed: {
    isFormDataValid() {
      return !!(
        this.formData.location &&
        this.formData.radius &&
        this.formData.email
      );
    }
  },
  methods: {
    getAddressData({
      locality = "",
      country = "",
      latitude = 0,
      longitude = 0
    }) {
      this.formData.community = locality;
      this.formData.country = country;
      this.formData.location = `${latitude},${longitude}`;
    },
    registerHelper() {
      this.isBusy = true;
      const postObject = Object.assign({}, this.formData);
      postObject.language = this.$i18n.locale;
      HelperService.registerHelper(postObject)
        .then(() => {
          this.$router.push({
            name: "RegisterForHelpConfirm",
            params: { request: postObject }
          });
          this.isBusy = false;
        })
        .catch(e => {
          this.isBusy = false;
          window.alert(e);
        });
    }
  }
};
</script>

<style scoped lang="scss">

.has-wizard {
  width: 90%;
  margin: auto;
}
.v-form {
  width: 90%;
  & > h5 {
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    margin-top: 24px;
    margin-bottom: 12px;
  }
  & > span {
    display: block;
    width: 100%;
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 12px;
  }
}
.slider {
  margin-top: 60px;
  width: 100%;
}
.arrow-left {
  margin-left: -2%;
}
.text-input {
  width: 100%;
  & :placeholder {
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
  }
}
.next {
  position: relative;
  padding: 0;
  width: calc(50% - 39px);
}
.next-button {
  min-width: fit-content;
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: #ffffff;
  background-color: #3ea060;
  border-radius: 5px;
}

@media only screen and (max-width: 650px) {
  .v-form {
    width: 100%;
    & > h5,
    & > span {
      width: 100%;
    }
  }
  .slider {
    width: 100%;
  }
  .text-input {
    width: 100%;
  }
}


</style>