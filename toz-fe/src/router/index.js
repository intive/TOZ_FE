import Vue from 'vue'
import Router from 'vue-router'
import Transfer from '@/components/Transfer'
import News from '@/components/News'
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
      component: News
    },
    {
      path: paths.home,
      name: 'home',
      component: Home
    }
  ]
})
