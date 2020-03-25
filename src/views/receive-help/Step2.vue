<template>
  <div class="has-wizard">
    <wizard-step-header current-step="2" max-steps="2" class="step-header" />
    <h1>{{ $t("request_help_process.step2.headline")}}</h1>
    <v-form v-model="isFormValid">
      <h5>{{ $t("request_help_process.step2.title")}}</h5>
      <span>{{ $t("request_help_process.step2.title_explained")}}</span>
      <v-text-field
        class="text-input"
        required
        v-model="formData.title"
        :rules="titleRules"
        :placeholder="$t('request_help_process.step2.title_placeholder')"
      />
      <h5>{{ $t("request_help_process.step2.desc") }}</h5>
      <span>{{ $t("request_help_process.step2.desc_explained") }}</span>
      <v-textarea
        class="text-area"
        v-model="formData.description"
        :placeholder="$t('request_help_process.step2.desc_placeholder')"
        counter="500"
        :rules="descRules"
        required
      />

      <h5>{{ $t("request_help_process.step2.email") }}</h5>
      <span>{{ $t("request_help_process.step2.email_explained") }}</span>
      <v-text-field
        class="text-input"
        required
        v-model="formData.email"
        :rules="emailRules"
        :placeholder="$t('request_help_process.step2.email_placeholder')"
      />
    </v-form>
    <wizard-next-button
      class="next"
      @click.native="next"
      :loading="isBusy"
      :disabled="!isFormValid"
    >{{ $t("request_help_process.step2.next")}}</wizard-next-button>
  </div>
</template>

<script>
import WizardStepHeader from "../../components/WizardStepHeader";
import WizardNextButton from "../../components/WizardNextButton";
import { mapMutations } from "vuex";
import * as helpRequestWizardState from "../../store/HelpRequestWizardState";
import HelpRequestService from "../../services/HelpRequestService";

export default {
  name: "Step2",
  components: { WizardNextButton, WizardStepHeader },
  data() {
    const state = this.$store.state[helpRequestWizardState.name];
    return {
      isFormValid: false,
      isBusy: false,
      formData: {
        description: state.description,
        title: state.title,
        email: state.email
      },
      emailRules: [
        v => !!v || this.$t("request_help_process.step2.email_error_missing"),
        v =>
          /[^@\s]+@[^@\s]+\.[^@\s]/.test(v) ||
          this.$t("request_help_process.step2.email_error_wrong")
      ],
      descRules: [
        v => !!v || this.$t("request_help_process.step2.desc_error_missing")
      ],
      titleRules: [
        v => !!v || this.$t("request_help_process.step2.title_error_missing")
      ]
    };
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
        email: this.formData.email
      });
      const payload = Object.assign(
        {},
        this.$store.state[helpRequestWizardState.name]
      );
      payload.language = this.$i18n.locale;

      HelpRequestService.createHelpRequest(payload)
        .then(() => {
          this.isBusy = false;
          this.updateStore(helpRequestWizardState.getPlainState());
          this.$router.push({
            name: "ReceiveHelpConfirm",
            params: { request: payload }
          });
        })
        .catch(e => {
          this.isBusy = false;
          window.alert(e);
        });
    },
    ...mapMutations(helpRequestWizardState.name, {
      updateStore: "set"
    })
  }
};
</script>

<style scoped lang='scss'>
.has-wizard {
  width: 90%;
  margin: auto;
  & > h1 {
    margin-left: -4px;
  }
}
.step-header {
  margin-bottom: 24px;
}
.next {
  position: relative;
  padding: 0;
  width: calc(60% - 39px);
  margin-top: 24px;
}
.text-area {
  width: 60%;
  & :placeholder {
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
  }
}
.text-input {
  width: 60%;
  & :placeholder {
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
  }
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
    width: 60%;
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 12px;
  }
}

@media only screen and (max-width: 650px) {
  .text-input {
    width: 100%;
  }

  .text-area {
    width: 100%;
  }
}
</style>