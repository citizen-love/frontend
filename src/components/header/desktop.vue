<template>
    <div class="header--copy-row">
      <div class="header--text-box">
      <h1>{{ $t("index.main_headline") }}</h1>
      <p>{{ $t("index.teaser") }}</p>
      </div>
      <div class="header--button-box">
      <v-btn color="primary" x-large :to="{name: 'ReceiveHelp'}">{{ $t("index.need_help") }}</v-btn>
      <v-btn color="primary" x-large outlined :to="{name: 'RegisterForHelp'}">{{ $t("index.offer_help") }}</v-btn>
      </div>
    </div>
</template>

<script>

export default {
    name: "Header"
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