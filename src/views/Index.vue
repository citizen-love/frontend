<template>
  <div>
    <v-row class="">
      <v-col cols="12">
        <h1>Citizen help citizen</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi architecto beatae, consequatur cum eum
          expedita facilis hic magnam minima minus provident, quas quos similique soluta tempora voluptates
          voluptatibus. Omnis.</p>
      </v-col>
    </v-row>
    <v-row class="">
      <v-col cols="6">
        <v-card hover>
          <v-card-title>I need help!</v-card-title>
          <v-card-subtitle>groceries, babysitting, children sitting</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card hover>
          <v-card-title>I can help!</v-card-title>
          <v-card-subtitle>groceries, babysitting, children sitting</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        //Todo: cards interactive & dynamic content</v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: "Index.vue"
  }
</script>

<style scoped>

</style>