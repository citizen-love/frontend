<template>
  <div class="has-wizard">
    <wizard-step-header current-step="1" max-steps="2"/>
    <h1>Where do you need help?</h1>
    <div>
      <v-text-field
        solo
        append-icon="mdi-map-marker"
        placeholder="Enter your location..."
        v-model="location">{{ location }}
      </v-text-field>
    </div>
    <h2>What do you need help with?</h2>
    <div class="categories">
      <p>Select one or more</p>
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
    </div>
    <wizard-next-button
      @click.native="next"
      :disabled="!isFormValid"/>
  </div>
</template>

<script>
  import WizardStepHeader from "../../components/WizardStepHeader";
  import WizardNextButton from "../../components/WizardNextButton";
  import {mapMutations} from 'vuex';
  import * as helpRequestWizardState from '../../store/HelpRequestWizardState';

  export default {
    name: "ReceiveHelp",
    components: {WizardNextButton, WizardStepHeader},
    data() {
      const state = this.$store.state[helpRequestWizardState.name];
      return {
        categories: [
          {key: 'groceries', displayName: 'Groceries', icon: 'mdi-cart-outline'},
          {key: 'washing', displayName: 'Washing', icon: 'mdi-washing-machine'},
          {key: 'babystitting', displayName: 'Babysitting', icon: 'mdi-baby-bottle'},
          {key: 'transport', displayName: 'Transport', icon: 'mdi-car-hatchback'},
          {key: 'lonliness', displayName: 'Lonliness', icon: 'mdi-emoticon-sad'},
          {key: 'childcare', displayName: 'Childcare', icon: 'mdi-human-female-girl'},
          {key: 'pets', displayName: 'Pets', icon: 'mdi-dog-side'},
          {key: 'else', displayName: 'Something else', icon: ''},
        ],
        selected: state.category,
        location: state.location,
        country: state.country || 'CH',
        community: state.community || 'District 10, Zürich',
      }
    },
    computed: {
      isFormValid() {
        return this.selected.length >= 1 && this.location;
      },
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
      getLocation(){

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


</style>