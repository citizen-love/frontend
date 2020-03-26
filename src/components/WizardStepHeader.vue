<template>
  <div>
    <div>
      <v-btn icon x-large @click="navigate">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <span>
      {{
      $t('general.step_x_out_of_y', {
        current: currentStep,
        max : maxSteps
      })
      }}
      </span>
  </div>
</template>

<script>
  export default {
    name: "WizardStepHeader",
    props: ['currentStep', 'maxSteps', 'toHome'],
    methods: {
      navigate() {
        return this.toHome ? this.$router.push("/") : this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
.v-btn{
  margin-left: -2%;
}
</style>