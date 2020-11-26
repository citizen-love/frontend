<template>
    <div class="header--copy-row">
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: "Header",
    methods: {
      logEvent(event_name){
          firebase.analytics().logEvent('button_click',{name:event_name, device: 'Desktop', lang: this.$i18n.locale});
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.header {
  &--text-box {
    width: 90%;
    margin: auto;
    text-align: left;
  }
    &--button-box {
      display: flex;
      width: 90%;
      margin: auto;
      & > a {
        width: 48%;
        margin: auto;
      }
  }
}


  .header--copy-row {
    width: 100%;
    & > h1 {
      font-size: 24px;
      line-height: 28px;
    }
    & > p {
      font-size: 10px;
      line-height: 16px;
      margin-top: 8px;
      opacity: 0.87;
    }
  }
</style>