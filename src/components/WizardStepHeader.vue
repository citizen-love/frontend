<template>
  <div>
    <div>
      <v-btn icon x-large @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <span>Step {{ currentStep }} of {{ maxSteps }}</span>
  </div>
</template>

<script>
  export default {
    name: "WizardStepHeader",
    props: ['currentStep', 'maxSteps']
  }
</script>

<style scoped>

</style>