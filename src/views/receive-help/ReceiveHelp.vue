<template>
  <div class="has-wizard">
    <wizard-step-header current-step="1" max-steps="2" class="step-header" />
    <h1>{{ $t('receiveHelp.mainTitle')}}</h1>
    <div class="adress-part">
      <span>{{ $t("receiveHelp.mainDescription") }}</span>
      <AutoComplete v-bind:updateLocation="getAddressData" />
    </div>
    <h5 class="categories-heading">{{ $t('receiveHelp.categoryTitle')}}</h5>
    <div class="categories">
      <span>{{ $t("receiveHelp.categoryDescription") }}</span>
      <v-btn
        v-for="category in categories"
        v-bind:key="category.key"
        :outlined="selected.indexOf(category.key) === -1"
        color="primary"
        large
        @click="toggle(category.key)"
      >
        <v-icon>{{ category.icon }}</v-icon>
        {{ category.displayName }}
      </v-btn>
      <v-text-field
        ref="customCategory"
        class="custom-category"
        v-if="showOtherCategory"
        outlined
        v-model="customCategory"
        :placeholder="$t('receiveHelp.otherCategoryPlaceholder')"
      />
    </div>
    <wizard-next-button
      class="next"
      @click.native="next"
      :disabled="!isFormValid"
    >{{ $t("receiveHelp.nextButton")}}</wizard-next-button>
  </div>
</template>

<script>
import WizardStepHeader from "../../components/WizardStepHeader";
import WizardNextButton from "../../components/WizardNextButton";
import AutoComplete from "../../components/autoComplete/autoComplete";
import { mapMutations } from "vuex";
import * as helpRequestWizardState from "../../store/HelpRequestWizardState";
import categories from "../../utils/categories";

export default {
  name: "ReceiveHelp",
  components: { WizardNextButton, WizardStepHeader, AutoComplete },
  data() {
    const state = this.$store.state[helpRequestWizardState.name];
    return {
      categories: categories,
      selected: state.category,
      location: state.location,
      customCategory: state.customCategory,
      country: state.country,
      community: state.community,
      inputShownAddress: "",
      locationRules: [
        v => !!v || this.$t("request_help_process.step2.title_error_missing")
      ]
    };
  },
  computed: {
    isFormValid() {
      return this.selected.length >= 1 && this.location;
    },
    showOtherCategory() {
      return this.selected.indexOf("else") !== -1;
    }
  },
  methods: {
    toggle(categoryKey) {
      const arrayIndex = this.selected.indexOf(categoryKey);
      if (arrayIndex === -1) {
        this.selected.push(categoryKey);
      } else {
        this.selected = this.selected.filter(elem => elem !== categoryKey);
      }
    },
    getAddressData({
      locality = "",
      country = "",
      latitude = 0,
      longitude = 0
    }) {
      this.community = locality;
      this.country = country;
      this.location = `${latitude},${longitude}`;
    },
    next() {
      if (!this.isFormValid) {
        return;
      }
      this.updateStore({
        location: this.location,
        category: this.selected,
        country: this.country,
        community: this.community,
        customCategory: this.customCategory
      });
      this.$router.push({ name: "ReceiveHelp2" });
    },
    ...mapMutations(helpRequestWizardState.name, {
      updateStore: "set"
    })
  }
};
</script>

<style scoped lang="scss">
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
  width: calc(50% - 39px);
  margin-top: 24px;
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
}
.adress-part {
  display: flex;
  flex-direction: column;
  & > span {
    display: block;
    width: 90%;
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 12px;
  }
}
.categories-heading {
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.5px;
  color: #000000;
}
.categories {
  & > span {
    display: block;
    width: 90%;
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 12px;
    margin-bottom: 24px;
  }
  .v-btn {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.custom-category {
  max-width: 600px;
}
</style>