import Vue from 'vue'
import Router from 'vue-router'
import Transfer from '@/components/Transfer'
import PetsGallery from '@/components/PetsGallery'
import petDetails from '@/components/PetDetails'
import NewsDetails from '@/components/NewsDetails'
import Home from '@/components/Home'
import Calendar from '@/components/CalendarNow'
import Calendar2 from '@/components/Calendar2'
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
      path: paths.calendar2,
      name: 'calendar2',
      component: Calendar2
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
