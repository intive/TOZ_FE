// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Modal from './components/Modal.vue'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.component('Modal', Vue.extend(Modal))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
