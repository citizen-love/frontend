<template>
  <vuetify-google-autocomplete
    id="map"
    append-icon="mdi-map-marker"
    class="autocomplete-input"
    :placeholder="$t('receiveHelp.locationPlaceholder')"
    v-on:placechanged="getAddressData"
    :value="defaultValue"
  />
</template>


<style lang="scss" scoped>
.autocomplete-input {
  padding: 9px 0px 9px 0px;
  margin-top: 10px;
  margin-bottom: 25px;
  font-size: 1em;
  border: 0;
  max-width: 350px;
  width: 100%;
}
</style>


<script>

export default {
  props: ["updateLocation", "defaultValue"],
  methods: {
    getAddressData(data) {
      this.updateLocation(data);
    }
  }
};
</script>