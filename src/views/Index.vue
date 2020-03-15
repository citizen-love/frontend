<!-- we should utilize the skeleton loader methods from vuetify: https://vuetifyjs.com/en/components/skeleton-loaders/ -->

<template>
  <div>
    <helptypeNavigation></helptypeNavigation>
    <v-row>
      <v-col cols="12">
        <v-card
          v-for="entry in helpNeeds"
          v-bind:key="entry.id"
          v-bind:title="entry.title"
          v-bind:details="entry.details"
          v-bind:category="entry.category"
          v-bind:zipcode="entry.zipcode"
          v-bind:city="entry.city"
          v-bind:latlng="entry.latlng"
          v-bind:helpcount="entry.helpcount"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ entry.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ entry.category }} in {{ entry.zipcode }} {{ entry.city }}</v-list-item-subtitle>
              <v-card-text>{{ entry.details }}</v-card-text>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn outlined small>Hilfe anbieten ({{entry.helpcount}})</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import helptypeNavigation from "@/components/helptypeNavigation.vue";

export default {
  name: "Index",
  components: {
    helptypeNavigation
  },
  data: function() {
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
  }
};
</script>

<style scoped>
</style>