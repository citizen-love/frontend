import Vue from 'vue'
import { VTextField } from 'vuetify/lib';
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n'
import vueHeadful from 'vue-headful';
import firebase from 'firebase'
import "firebase/analytics";

Vue.prototype.$analytics = firebase.analytics();

Vue.component('vue-headful', vueHeadful);
Vue.component('v-text-field', VTextField);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
