import Vue from 'vue'
import Router from 'vue-router'
import Transfer from '@/components/Transfer'
import PetsList from '@/components/PetsList'
import paths from './paths'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: paths.transfer,
      name: 'transfer',
      component: Transfer
    },
    {
      path: paths.home,
      name: 'home',
      component: PetsList
        // template: '<router-link to="/transfer">Kliknij tutaj, aby wyświetlić dane do przelewu</router-link>'
    }
  ]
})
