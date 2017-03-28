import Vue from 'vue'
import Router from 'vue-router'
import Transfer from '@/components/Transfer'
import PetsList from '@/components/PetsList'
import Home from '@/components/Home'
import paths from './paths'
import petDetails from '@/components/petDetails'
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
      component: Home
        // template: '<router-link to="/transfer">Kliknij tutaj, aby wyświetlić dane do przelewu</router-link>'
    },
    {
      path: paths.pets,
      name: 'pets',
      component: PetsList
    },
    {
      path: paths.petDetails,
      name: 'petDetails',
      component: petDetails
    }
  ]
})
