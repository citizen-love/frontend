<template>
  <div>
    <wizard-step-header current-step="1" max-steps="2" />
    <h1>Where do you need help?</h1>
    <div>
      <v-text-field
        solo
        append-icon="mdi-map-marker"
        placeholder="Enter your location..."
        v-model="location">{{ location }}</v-text-field>
    </div>
    <h2>What do you need help with?</h2>
    <div class="categories">
      <p>Select one or more</p>
      <v-btn v-for="category in categories"
             v-bind:key="category.key"
             :outlined="selected.indexOf(category.key) === -1"
             color="primary"
             large
             @click="toggle(category.key);logCategoryEvent(category.displayName)"
      >
        <v-icon>{{ category.icon }}</v-icon>
        {{ category.displayName }}
      </v-btn>

      <v-btn outlined color="primary" large>Something else</v-btn>
    </div>
    <wizard-next-button :to="{name : 'ReceiveHelp2', analytics_name: 'request-next-step-1'}" :disabled="!isFormValid" />
  </div>
</template>

<script>
  import WizardStepHeader from "../../components/WizardStepHeader";
  import WizardNextButton from "../../components/WizardNextButton";
  export default {
    name: "ReceiveHelp",
    components: {WizardNextButton, WizardStepHeader},
    data() {
      return {
        categories: [
          {key: 'groceries', displayName: 'Groceries', icon: 'mdi-cart-outline'},
          {key: 'washing', displayName: 'Washing', icon: 'mdi-washing-machine'},
          {key: 'babystitting', displayName: 'Babysitting', icon: 'mdi-baby-bottle'},
          {key: 'transport', displayName: 'Transport', icon: 'mdi-car-hatchback'},
          {key: 'lonliness', displayName: 'Lonliness', icon: 'mdi-emoticon-sad'},
          {key: 'childcare', displayName: 'Childcare', icon: 'mdi-human-female-girl'},
          {key: 'pets', displayName: 'Pets', icon: 'mdi-dog-side'},
        ],
        selected: [],
        location: undefined,
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
      logCategoryEvent(category){
        this.$analytics.logEvent('need_category_select',{name: category});
      }
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