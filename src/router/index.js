import Vue from 'vue'
import Router from 'vue-router'
import Transfer from '@/components/Transfer'
import PetsGallery from '@/components/PetsGallery'
import petDetails from '@/components/PetDetails'
import NewsDetails from '@/components/NewsDetails'
import Home from '@/components/Home'
import Calendar from '@/components/Calendar'
import Account from '@/components/Account'
import AccountPassword from '@/components/AccountPassword'
import FirstSignIn from '@/components/FirstSignIn'
import ActivationLinkExpired from '@/components/ActivationLinkExpired'
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
      path: paths.calendar,
      name: 'calendar',
      component: Calendar
    },
    {
      path: paths.account,
      name: 'account',
      component: Account
    },
    {
      path: paths.accountPassword,
      name: 'accountPassword',
      component: AccountPassword
    },
    {
      path: paths.linkExpired,
      name: 'activationLinkExpired',
      component: ActivationLinkExpired
    },
    {
      path: paths.firstSignIn,
      name: 'firstSignIn',
      component: FirstSignIn
    }
  ]
})
