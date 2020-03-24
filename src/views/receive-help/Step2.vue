<template>
  <div class="has-wizard">
    <wizard-step-header current-step="2" max-steps="2"/>
    <h1>
      {{ $t("request_help_process.step2.headline")}}</h1>
    <v-form v-model="isFormValid">
      <h2>
        {{ $t("request_help_process.step2.title")}}</h2>
      <span>
      {{ $t("request_help_process.step2.title_explained")}}</span>
      <v-text-field
        required
        v-model="formData.title"
        :rules="titleRules"
        :placeholder="$t('request_help_process.step2.title_placeholder')"/>
      <h2>{{ $t("request_help_process.step2.desc") }}</h2>
      <span>{{ $t("request_help_process.step2.desc_explained") }}</span>
      <v-textarea
        v-model="formData.description"
        :placeholder="$t('request_help_process.step2.desc_placeholder')"
        counter="500"
        :rules="descRules"
        required/>

      <h2>{{ $t("request_help_process.step2.email") }}</h2>
      <span>{{ $t("request_help_process.step2.email_explained") }}</span>
      <v-text-field
        required
        v-model="formData.email"
        :rules="emailRules"
        :placeholder="$t('request_help_process.step2.email_placeholder')"/>
    </v-form>
    <wizard-next-button
      @click.native="next"
      :loading="isBusy"
      :disabled="!isFormValid">
      {{ $t("request_help_process.step2.next")}}
    </wizard-next-button>
  </div>
</template>

<script>
  import WizardStepHeader from "../../components/WizardStepHeader";
  import WizardNextButton from "../../components/WizardNextButton";
  import {mapMutations} from 'vuex';
  import * as helpRequestWizardState from '../../store/HelpRequestWizardState';
  import HelpRequestService from "../../services/HelpRequestService";

  export default {
    name: "Step2",
    components: {WizardNextButton, WizardStepHeader},
    data() {
      const state = this.$store.state[helpRequestWizardState.name];
      return {
        isFormValid: false,
        isBusy: false,
        formData: {
          description: state.description,
          title: state.title,
          email: state.email,
        },
        emailRules: [
          v => !!v || this.$t('request_help_process.step2.email_error_missing'),
          v => /[^@\s]+@[^@\s]+\.[^@\s]/.test(v) || this.$t('request_help_process.step2.email_error_wrong'),
        ],
        descRules: [
          v => !!v || this.$t('request_help_process.step2.desc_error_missing'),
        ],
        titleRules: [
          v => !!v || this.$t('request_help_process.step2.title_error_missing'),
        ]
      }
    },
    methods: {
      next() {
        if (!this.isFormValid) {
          return;
        }
        this.isBusy = true;
        this.updateStore({
          description: this.formData.description,
          title: this.formData.title,
          email: this.formData.email,
        });
        const payload = Object.assign({}, this.$store.state[helpRequestWizardState.name]);
        payload.language = this.$i18n.locale;

        this.$analytics.logEvent('button_click',{name:'create-help-request'});

        HelpRequestService.createHelpRequest(payload)
          .then(() => {
            this.isBusy = false;
            this.updateStore(helpRequestWizardState.getPlainState());
            this.$analytics.logEvent('action',{name:'Help request registered'});
            this.$router.push({name: 'ReceiveHelpConfirm', params: {request: payload}})
          }).catch(e => {
          this.isBusy = false;
          window.alert(e);
        });
      },
      ...mapMutations(helpRequestWizardState.name, {
        updateStore: 'set'
      })
    }
  }
</script>

<style scoped>

</style>