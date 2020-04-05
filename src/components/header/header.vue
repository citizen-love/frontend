<template>
  <v-container class="header" v-if="$route.path === '/'">
    <div class="header--static-row">
      <img src="../../assets/logo.svg" alt="citizen love" />
      <span>{{ $t("general.language") }}</span>
    </div>
    <div class="header--copy-row">
      <h1>{{ $t("index.mainTitle") }}</h1>
      <p>{{ $t("index.mainDescription") }}</p>
    </div>
    <div class="header--button-row">
      <v-btn color="primary" block x-large :to="{name: 'ReceiveHelp'}">{{ $t("index.buttonNeedHelp") }}</v-btn>
      <v-btn class="helper-register" color="green" x-large :to="{name: 'RegisterForHelp'}">{{ $t("index.buttonNotifyMe") }}</v-btn>
    </div>
  </v-container>
</template>

<script>
import {LANGUAGES} from "../../assets/data/languages";

export default {
    name: "Header",
  data() {
      return {
        languages: LANGUAGES,
      }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

@media only screen and (max-width: 650px) {
  .header {
  background-size: cover;
  background-image: url("../../assets/header-asset-background.jpg");
  }
}

.helper-register{
  margin-top: 20px;
  overflow: hidden;
  width: 100%;
}

.header {
  padding: 30px;
  color: white;
  border-radius: 0 0 5px 5px;
  min-height: 50vh;
  &--static-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
     a {
      color: white;
      text-transform: uppercase;
    }
  }
  &--copy-row {
    width: 90%;
    margin-top: 38px;
    margin-bottom: 18px;
    & > h1 {
      font-size: 24px;
      line-height: 28px;
      color: #FFFFFF;
    }
    & > p {
      font-size: 16px;
      line-height: 16px;
      margin-top: 8px;
      opacity: 0.87;
    }
  }
}
</style>