<template>
    <div class="header--copy-row">
      <h1>{{ $t("index.main_headline") }}</h1>
      <p>{{ $t("index.teaser") }}</p>
      <v-btn color="primary" block x-large :to="{name: 'ReceiveHelp'}">{{ $t("index.need_help") }}</v-btn>
      <v-btn color="green" block x-large :to="{name: 'RegisterForHelp'}">{{ $t("index.need_help") }}</v-btn>
    </div>
</template>

<script>

export default {
    name: "Header"
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";


  .header--copy-row {
    width: 70%;
    text-align: left;
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