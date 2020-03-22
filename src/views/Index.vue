<!-- we should utilize the skeleton loader methods from vuetify: https://vuetifyjs.com/en/components/skeleton-loaders/ -->

<template>
  <div>
    <h2>Hilfe einfach gemacht</h2>
    <p>CitizenLove verbinden Hifeanbietende ganz einfach mit Leuten, welche Hilfe benötigen.</p>
    <div class="button-container">
      <v-btn color="primary" outlined block x-large v-on:click.native="logEvent('New need')" :to="{name: 'ReceiveHelp'}">I need help</v-btn>
      <v-btn color="primary" outlined block x-large v-on:click.native="logEvent('New help')">I want to help</v-btn>
    </div>
  </div>
</template>

<script>

export default {
  name: "Index",
  components: {
  },
  data: function() {
    // dummy call, currently only for debugging
    return {
      helpNeeds: [
        {
          id: 1,
          title: "Hilfe beim Wäschewaschen",
          details:
            "I'm baby swag 8-bit shaman mlkshk sustainable, poutine blog cloud bread fanny live-edge af XOXO roof party hoodie. ",
          category: "Hausarbeit",
          zipcode: "8004",
          city: "Zurich",
          latlng: "47.378594, 8.510398",
          helpcount: 3
        },
        {
          id: 2,
          title: "Brauche jemanden der für mich Einkaufen geht",
          details:
            "nackwave kombucha viral roof party art party pop-up yuccie activated charcoal celiac enamel pin street art tote bag thundercats before they sold out church-key",
          category: "Einläufe erledigen",
          zipcode: "8004",
          city: "Zurich",
          latlng: "47.378594, 8.510398",
          helpcount: 3
        },
        {
          id: 3,
          title: "Babysitting an Nachmittagen",
          details:
            " Man bun DIY migas normcore chambray chartreuse try-hard yuccie hammock.",
          category: "Kinderbetreuung",
          zipcode: "8004",
          city: "Zurich",
          latlng: "47.378594, 8.510398",
          helpcount: 3
        }
      ]
    };
  },
  methods: {
    logEvent(event_name){
        this.$analytics.logEvent('button_click',{name:event_name});
    }
  }
};
</script>

<style scoped lang="scss">

  .button-container {
    padding-top: 20px;

    .v-btn {
      margin: 20px 0;
    }


  }

  img {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>