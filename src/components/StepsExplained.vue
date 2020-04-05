<template>
  <div>
    <h2>{{$t('stepsExplained.title')}}</h2>
    <v-container>
      <v-row>
        <v-col cols="12" md="3" sm="6" class="step">
          <div class="img-container"><img alt="request help" src="../assets/illustrations/sign_up.svg"/></div>
          <br/>
          <div class="line"><div/></div>
          <b>{{$t('stepsExplained.1.title')}}</b>
          <br/>{{$t('stepsExplained.1.text')}}
        </v-col>
        <v-col cols="12" md="3" sm="6" class="step">
          <div class="img-container"><img alt="matching need and help" src="../assets/illustrations/request_offer_help.svg"/></div>
          <br/>
          <div class="line"><div/></div>
          <b>{{$t('stepsExplained.2.title')}}</b>
          <br/>{{$t('stepsExplained.2.text')}}
        </v-col>
        <v-col cols="12" md="3" sm="6" class="step">
          <div class="img-container"><img alt="request help" src="../assets/illustrations/get_in_touch.svg"/></div>
          <br/>
          <div class="line"><div/></div>
          <b>{{$t('stepsExplained.3.title')}}</b>
          <br/>{{$t('stepsExplained.3.text')}}
        </v-col>
        <v-col cols="12" md="3" sm="6" class="step">
          <div class="img-container"><img alt="request help" src="../assets/illustrations/be_fulfilled.svg"/></div>
          <br/>
          <div class="line"><div/></div>
          <b>{{$t('stepsExplained.4.title')}}</b>
          <br/>{{$t('stepsExplained.4.text')}}
          <br/>
          <br/><i>{{$t('stepsExplained.4.quote')}}</i>
          <br/>-Marie Curie
        </v-col>
      </v-row>
          <br/>
    </v-container>
  </div>
</template>

<script>
/** Responsive static component showing steps with illustrations how the app works */
export default {
  name: "StepsExplained"
}
</script>

<style lang="scss" scoped>
@import "../styles/_globals";

  .step {
    
    .img-container {
      background-color: rgb(247, 247, 247);
      padding: 1em;
      vertical-align: middle;
      text-align: center;
      display: inline-block;
      width: 100%;
      margin-bottom: 1em;

      img {
        width: auto;
        height: 80px;
      }
    }
   
    
    .line {
      margin-bottom: 1em;
      border-top: 1px solid $_color-primary;

      div {
        position: relative;
        top: -5px;
        left: -15px;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color:  $_color-primary;
        content: "";
        padding-right:5px;
      }
    }
  }
</style>