import Vue from 'vue'
import Router from 'vue-router'
import Transfer from '@/components/Transfer'
import PetsGallery from '@/components/PetsGallery'
import petDetails from '@/components/PetDetails'
import NewsDetails from '@/components/NewsDetails'
import Home from '@/components/Home'
import FirstLogin from '@/components/FirstLogin'
import LinkExpired from '@/components/ActivationLinkExpired'
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
      path: paths.news,
      name: 'news',
      component: NewsDetails
    },
    {
      path: paths.home,
      name: 'home',
      component: Home
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
    },
    {
      path: paths.firstLogin,
      name: 'firstLogin',
      component: FirstLogin
    },
    {
      path: paths.linkExpired,
      name: 'activationLinkExpired',
      component: LinkExpired
    }
  ]
})
