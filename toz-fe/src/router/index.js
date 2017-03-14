import Vue from 'vue'
import Router from 'vue-router'
import Transfer from '@/components/Transfer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer
    },
    {
      path: '/',
      name: 'home',
      component: {
        template: '<router-link to="/transfer">Kliknij tutaj, aby wyświetlić dane do przelewu</router-link>'
      }
    }
  ]
})
