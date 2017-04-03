import Vue from 'vue'
import Router from 'vue-router'
import Transfer from '@/components/Transfer'
import PetsGallery from '@/components/PetsGallery'
import Home from '@/components/Home'
import paths from './paths'
import petDetails from '@/components/PetDetails'
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
      component: PetsGallery
    },
    {
      path: paths.petDetails,
      name: 'petDetails',
      component: petDetails
    }
  ]
})
