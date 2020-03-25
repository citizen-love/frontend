<template>
  <div class="has-wizard">
    <wizard-step-header current-step="1" max-steps="2" class="step-header" />
    <h1>{{ $t('request_help_process.step1.headline')}}</h1>
    <div class="adress-part">
      <span>{{ $t("request_help_process.step1.location_explained") }}</span>
      <AutoComplete
        v-bind:updateLocation="getAddressData"
        v-bind:defaultValue="inputShownAddress"
      />
    </div>
    <h5 class="categories-heading">{{ $t('request_help_process.step1.where_do_you_need_help')}}</h5>
    <div class="categories">
      <span>{{ $t("request_help_process.step1.select_category") }}</span>
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
        :placeholder="$t('request_help_process.step1.other_category_placeholder')"
      />
    </div>
    <wizard-next-button
      class="next"
      @click.native="next"
      :disabled="!isFormValid"
    >{{ $t("request_help_process.step1.next")}}</wizard-next-button>
  </div>
</template>

<script>
import WizardStepHeader from "../../components/WizardStepHeader";
import WizardNextButton from "../../components/WizardNextButton";
import AutoComplete from "../../components/autoComplete/autoComplete";
import { mapMutations } from "vuex";
import * as helpRequestWizardState from "../../store/HelpRequestWizardState";

import GeoLocation from "../../services/GeoLocation/GeoLocation";

export default {
  name: "ReceiveHelp",
  components: { WizardNextButton, WizardStepHeader, AutoComplete },
  data() {
    const state = this.$store.state[helpRequestWizardState.name];
    return {
      categories: [
        {
          key: "groceries",
          displayName: this.$t("categories.groceries"),
          icon: "mdi-cart-outline"
        },
        {
          key: "washing",
          displayName: this.$t("categories.washing"),
          icon: "mdi-washing-machine"
        },
        {
          key: "babysitting",
          displayName: this.$t("categories.babysitting"),
          icon: "mdi-baby-bottle"
        },
        {
          key: "transport",
          displayName: this.$t("categories.transport"),
          icon: "mdi-car-hatchback"
        },
        {
          key: "loneliness",
          displayName: this.$t("categories.loneliness"),
          icon: "mdi-emoticon-sad"
        },
        {
          key: "childcare",
          displayName: this.$t("categories.childcare"),
          icon: "mdi-human-female-girl"
        },
        {
          key: "pets",
          displayName: this.$t("categories.pets"),
          icon: "mdi-dog-side"
        },
        { key: "else", displayName: this.$t("categories.other"), icon: "" }
      ],
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
  async mounted(){
      const fullAddress = await GeoLocation.getReverseLocation();
      this.inputShownAddress = fullAddress;
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
      longitude = 0,
      ...rest
    }) {
      console.log(rest);
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
    font-size: 10px;
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
    font-size: 10px;
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

/*.autocomplete-input {
   padding: 9px 6px 9px 0px;
    margin-top: 10px;
    margin-bottom: 25px;
    font-size: 1em;
    border: 0;
    border-bottom: 0.5px solid #B5B5B5;
    width: 45%;
    outline: none;
         & :placeholder{
                font-family: Work Sans;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 20px;
                letter-spacing: 0.25px;
      }
  }*/
</style>