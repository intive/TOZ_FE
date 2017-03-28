// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import petsTable from './petsMock'

Vue.config.productionTip = false
Vue.prototype.$http = axios

let mock = new MockAdapter(axios)
mock.onGet('/petsInfo').reply(200, petsTable)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
