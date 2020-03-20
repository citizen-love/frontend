<template>
  <div class="has-wizard">
    <wizard-step-header current-step="2" max-steps="2"/>
    <h1 ref="abasdf">Tell us a bit more...</h1>
    <form ref="form">
      <h2>What do you need in one sentence?</h2>
      <span>So that helpers immediately understand if the can help.</span>
      <v-text-field
        required
        v-model="formData.title"
        placeholder="e.g. Kinder hüten tagsüber Mittwoch & donnerstag"/>
      <h2>Details</h2>
      <span>Add the details of your needs here:</span>
      <v-textarea
        v-model="formData.description"
        placeholder="Weil ich Mittwoch & Donnerstag im Spital arbeiten muss, brauche ich jemanden der auf meine Kinder aufpasst. Games werden mitgeliefert."
        required/>

      <h2>Your E-mail</h2>
      <span>You will receive help offers on this e-mail address.</span>
      <v-text-field
        required
        email
        v-model="formData.email"
        placeholder="Your E-Mail"/>
    </form>


    <wizard-next-button
      @click.native="next"
      :loading="isBusy"
      :disabled="!isFormValid"/>
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