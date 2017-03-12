import Vue from 'vue'
import Router from 'vue-router'
import Transfer from '@/components/Transfer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Transfer',
      component: Transfer
    }
  ]
})
