<template>
  <vuetify-google-autocomplete
    id="map"
    append-icon="mdi-map-marker"
    class="autocomplete-input"
    :placeholder="$t('request_help_process.step1.location_placeholder')"
    v-on:placechanged="getAddressData"
  />
</template>


<style lang="scss" scoped>
.autocomplete-input {
  padding: 9px 0px 9px 0px;
  margin: auto;
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
  props: ["updateLocation"],
  methods: {
    getAddressData(data) {
      this.updateLocation(data);
    }
  }
};
</script>