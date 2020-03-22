import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
import theme from './theme'

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyDkzusTIgoPXKQtAy3DiFgrQ4v6vwHWHfk'
});

Vue.use(Vuetify);

export default new Vuetify({
  theme: theme
});
