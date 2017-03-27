import Vue from 'vue'
import Router from 'vue-router'
import Transfer from '@/components/Transfer'
import NewsDetails from '@/components/NewsDetails'
import Home from '@/components/Home'
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
    }
  ]
})
