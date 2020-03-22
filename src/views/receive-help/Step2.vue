<template>
  <div>
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
      <v-textarea v-model="formData.description" required/>

      <h2>Your E-mail</h2>
      <span>You will receive help offers on this e-mail address.</span>
      <v-text-field
        required
        email
        v-model="formData.email"
        placeholder="Your E-Mail"/>
    </form>


    <wizard-next-button id="step-2-button" :to="{name : 'ReceiveHelpConfirm'}" :disabled="!isFormValid" />
  </div>
</template>

<script>
  import WizardStepHeader from "../../components/WizardStepHeader";
  import WizardNextButton from "../../components/WizardNextButton";

  export default {
    name: "Step2",
    created: function(){
      this.$root.$on('next-click',function(){
        this.$analytics.logEvent('button_click',{name:'request-next-step-2'});
      });
    },
    components: {WizardNextButton, WizardStepHeader},
    data(){
      return {
        isMounted: false,
        formData: {
          description: undefined,
          title: undefined,
          email: undefined,
        }
      }
    },
    mounted(){
      this.isMounted = true;
    },
    computed: {
      isFormValid() {
        const formData = this.formData;
        return formData.description && formData.title && formData.email;
      }
    },
    methods: {
      // logEvent(){
      //   this.$analytics.logEvent('button_click',{name:'request-next-step-2'});
      // }
    }
  }
</script>

<style scoped>

</style>