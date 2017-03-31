import Vue from 'vue'
import Router from 'vue-router'
import Transfer from '@/components/Transfer'
import Home from '@/components/Home'
import Calendar from '@/components/CalendarNow'
import CalendarPrevious from '@/components/CalendarPrevious'
import CalendarNext from '@/components/CalendarNext'
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
      component: Home
    },
    {
      path: paths.calendar,
      name: 'calendar',
      component: Calendar
    },
    {
      path: paths.calendarPrevious,
      name: 'calendarPrevious',
      component: CalendarPrevious
    },
    {
      path: paths.calendarNext,
      name: 'calendarNext',
      component: CalendarNext
    }
  ]
})
