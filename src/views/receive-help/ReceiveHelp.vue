<template>
  <div class="has-wizard">
    <wizard-step-header current-step="1" max-steps="2"/>
    <h1>{{ $t('request_help_process.step1.headline')}}</h1>
    <div>
      <span>{{ $t("request_help_process.step1.location_explained") }}</span>
      <vue-google-autocomplete
        id="map"
        class="autocomplete-input"
        enable-geolocation
        :placeholder="$t('request_help_process.step1.location_placeholder')"
        v-on:placechanged="getAddressData"
      />
    </div>
    <h2>{{ $t('request_help_process.step1.where_do_you_need_help')}}</h2>
    <div class="categories">
      <p>{{ $t("") }}</p>
      <v-btn v-for="category in categories"
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
      @click.native="next"
      :disabled="!isFormValid">
      {{ $t("request_help_process.step1.next")}}
    </wizard-next-button>
  </div>
</template>

<script>

  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import WizardStepHeader from "../../components/WizardStepHeader";
  import WizardNextButton from "../../components/WizardNextButton";
  import {mapMutations} from 'vuex';
  import * as helpRequestWizardState from '../../store/HelpRequestWizardState';

  export default {
    name: "ReceiveHelp",
    components: {WizardNextButton, WizardStepHeader, VueGoogleAutocomplete},
    data() {
      const state = this.$store.state[helpRequestWizardState.name];
      return {
        categories: [
          {key: 'groceries', displayName: this.$t('categories.groceries'), icon: 'mdi-cart-outline'},
          {key: 'washing', displayName: this.$t('categories.washing'), icon: 'mdi-washing-machine'},
          {key: 'babysitting', displayName: this.$t('categories.babysitting'), icon: 'mdi-baby-bottle'},
          {key: 'transport', displayName: this.$t('categories.transport'), icon: 'mdi-car-hatchback'},
          {key: 'loneliness', displayName: this.$t('categories.loneliness'), icon: 'mdi-emoticon-sad'},
          {key: 'childcare', displayName: this.$t('categories.childcare'), icon: 'mdi-human-female-girl'},
          {key: 'pets', displayName: this.$t('categories.pets'), icon: 'mdi-dog-side'},
          {key: 'else', displayName: this.$t('categories.other'), icon: ''},
        ],
        selected: state.category,
        location: state.location,
        customCategory: state.customCategory,
        country: state.country,
        community: state.community,
        locationRules: [
          v => !!v || this.$t('request_help_process.step2.title_error_missing'),
        ]
      }
    },
    computed: {
      isFormValid() {
        return this.selected.length >= 1 && this.location;
      },
      showOtherCategory() {
        return this.selected.indexOf('else') !== -1;
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
                       locality = '',
                       country = '',
                       latitude = 0,
                       longitude = 0,
                     }) {
        this.community = locality;
        this.country = country;
        this.location = `${latitude},${longitude}`
      },
      next() {
        if (!this.isFormValid) {
          return
        }
        this.updateStore({
          location: this.location,
          category: this.selected,
          country: this.country,
          community: this.community,
          customCategory: this.customCategory,
        });
        this.$router.push({name: 'ReceiveHelp2'});
      },
      ...mapMutations(helpRequestWizardState.name, {
        updateStore: 'set'
      })
    }
  }
</script>

<style scoped lang="scss">

  .categories {
    .v-btn {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }

  .custom-category {
    max-width: 600px;
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