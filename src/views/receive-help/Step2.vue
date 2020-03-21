<template>
  <div class="has-wizard">
    <wizard-step-header current-step="2" max-steps="2"/>
    <h1>
      {{ $t("request_help_process.step2.headline")}}</h1>
    <form ref="form">
      <h2>
        {{ $t("request_help_process.step2.title")}}</h2>
      <span>
      {{ $t("request_help_process.step2.title_explained")}}</span>
      <v-text-field
        required
        v-model="formData.title"
        :placeholder="$t('request_help_process.step2.title_placeholder')"/>
      <h2>{{ $t("request_help_process.step2.desc") }}</h2>
      <span>{{ $t("request_help_process.step2.desc_explained") }}</span>
      <v-textarea
        v-model="formData.description"
        :placeholder="$t('request_help_process.step2.desc_placeholder')"
        required/>

      <h2>{{ $t("request_help_process.step2.email") }}</h2>
      <span>{{ $t("request_help_process.step2.email_explained") }}</span>
      <v-text-field
        required
        email
        v-model="formData.email"
        :placeholder="$t('request_help_process.step2.email_placeholder')"/>
    </form>
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
        isBusy: false,
        formData: {
          description: state.description,
          title: state.title,
          email: state.email,
        }
      }
    },
    mounted() {
    },
    computed: {
      isFormValid() {
        const formData = this.formData;
        return formData.description && formData.title && formData.email;
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

        HelpRequestService.createHelpRequest(payload)
          .then(() => {
            this.isBusy = false;
            this.updateStore(helpRequestWizardState.getPlainState());
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