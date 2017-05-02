import Vue from 'vue'
import DayItem from '@/components/DayItem'

describe('setDayShortcut()', () => {
  const Constructor = Vue.extend(DayItem)
  const vm = new Constructor().$mount()
  it('should set previousWeek as true and nextWeek as false', () => {
    vm.weekDay = 1
    vm.setDayShortcut()
    expect(vm.dayShortcut).to.equal('schedule.dayInWeek[0]')
  })
})
