<template>
  <div>
    <v-row class>
      <v-col cols="6" align="center">
        <v-btn large block>Ich suche Hilfe!</v-btn>
      </v-col>
      <v-col cols="6" align="center">
        <v-btn large block v-bind:to="{name: 'Home'}">Ich biete Hilfe!</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "helpTypeNavigation"
};
</script>  