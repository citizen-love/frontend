<template>
  <div class="next">
    <v-btn color="primary" :disabled="disabled" large block :to="to" @click.once="logNext(to)">Next</v-btn>
  </div>
</template>

<script>
  export default {
    name: "WizardNextButton",
    props: ['disabled', 'to'], 
    methods: {
      logNext: function(to){
        this.$analytics.logEvent('button_click',{name: to.analytics_name});
      }
    }
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