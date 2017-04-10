import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Modal from './components/Modal.vue'
import i18n from './i18n.js'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.component('Modal', Vue.extend(Modal))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
