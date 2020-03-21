<template>
  <div class="next">
    <v-btn
      color="primary"
      :disabled="disabled"
      large
      block
      :loading="loading"
      :to="to"
    ><slot />
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "WizardNextButton",
    props: ['disabled', 'to','loading']
  }
</script>

<style scoped lang="scss">
  .next {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    padding: 20px;

    .v-btn {
      width: 100%;
    }
  }
</style>