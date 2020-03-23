<template>
  <div class="has-wizard">
    <div>
      <v-btn icon x-large @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <v-form :v-model="isFormValid">
      <h1>{{ $t("register_as_helper.register.headline")}}</h1>
      <h2>
        {{ $t("register_as_helper.register.location")}}
      </h2>
      <span>{{ $t("register_as_helper.register.location_explained") }}</span>
      <div>
        <vue-google-autocomplete
          id="map"
          class="autocomplete-input"
          enable-geolocation
          ref="locationField"
          :placeholder="$t('request_help_process.step1.location_placeholder')"
          v-on:placechanged="getAddressData"
        />
      </div>
      <h2>
        {{ $t("register_as_helper.register.radius")}}
      </h2>
      <span>{{ $t("register_as_helper.register.radius_explained") }}</span>
      <v-slider
        class="slider"
        thumb-label="always"
        v-model="formData.radius"
        min="0"
        :thumb-size="40"
        max="30"
      >
        <template v-slot:thumb-label="{ value }">
          {{ value }} km
        </template>
      </v-slider>

      <h2>
        {{ $t("register_as_helper.register.email")}}
      </h2>
      <span>{{ $t("register_as_helper.register.email_explained") }}</span>
      <v-text-field
        required
        v-model="formData.email"
        :rules="emailRules"
        :placeholder="$t('request_help_process.step2.email_placeholder')"/>
      <h2>
        {{ $t("register_as_helper.register.phone")}}
      </h2>
      <span>{{ $t("register_as_helper.register.phone_explained") }}</span>
      <v-text-field
        v-model="formData.phone"
        :placeholder="$t('register_as_helper.register.phone_placeholder')">

      </v-text-field>
    </v-form>

    <wizard-next-button
      @click.native="registerHelper"
      :disabled="!isFormDataValid"
      :loading="isBusy"
      :placeholder="$t('request_help_process.step2.email_placeholder')">
      {{ $t("register_as_helper.register.next")}}
    </wizard-next-button>

  </div>
</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import WizardNextButton from '../../components/WizardNextButton'
  import HelperService from "../../services/HelperService";

  export default {
    name: "Register",
    components: {VueGoogleAutocomplete, WizardNextButton},
    data() {
      return {
        isBusy: false,
        formData: {
          email: undefined,
          radius: 5,
          location: undefined,
          community: undefined,
          country: undefined,
        },
        isFormValid: false,
        emailRules: [
          v => !!v || this.$t('request_help_process.step2.email_error_missing'),
          v => /[^@\s]+@[^@\s]+\.[^@\s]/.test(v) || this.$t('request_help_process.step2.email_error_wrong'),
        ],
      }
    },
    computed: {
      isFormDataValid() {
        return !!(this.formData.location && this.formData.radius && this.formData.email);
      }
    },
    methods: {
      getAddressData({
                       locality = '',
                       country = '',
                       latitude = 0,
                       longitude = 0,
                     }) {
        this.formData.community = locality;
        this.formData.country = country;
        this.formData.location = `${latitude},${longitude}`
      },
      registerHelper() {
        this.isBusy = true;
        const postObject = Object.assign({}, this.formData)
        postObject.language = this.$i18n.locale;
        HelperService.registerHelper(postObject)
          .then(() => {
            this.$router.push({name: 'RegisterForHelpConfirm', params: {request: postObject}},);
            this.isBusy = false;
          })
          .catch((e) => {
            this.isBusy = false;
            window.alert(e);
          });

      },
    }
  }
</script>

<style scoped>

  .slider {
    margin-top: 60px;
  }

  .autocomplete-input {
    padding: 9px 6px 9px 24px;
    margin-top: 10px;
    margin-bottom: 25px;
    background-color: #fff;
    border-radius: 4px;
    font-size: 1em;
    border: 0;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
    width: 100%;
  }
</style>