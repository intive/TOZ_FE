/* global API_URL */

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Modal from './components/Modal.vue'
import i18n from './i18n.js'
import mock from '@/mockAdapter'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.apiUrl = API_URL

Vue.component('Modal', Vue.extend(Modal))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  mock,
  template: '<App/>',
  components: { App }
})
