import Vue from 'vue'
import Calendar from '@/components/Calendar'

describe('Calendar.vue', () => {
  const Constructor = Vue.extend(Calendar)
  const vm = new Constructor().$mount()
  it('should create two dateInWeek object  (function: setDayAndDateInWeekWithOneMonth(periodName))', () => {
    vm.currentDate = new Date(2017, 3, 10)
    vm.dateInWeekMorning.splice(0, vm.dateInWeekMorning.length)
    vm.mondayDate = 10
    vm.dayInMonth = 30
    vm.setDayAndDateInWeekWithOneMonth('morning')
    expect(vm.dateInWeekMorning.length).to.equal(7)
    expect(vm.dateInWeekMorning[0].day).to.equal('10')
    expect(vm.dateInWeekMorning[1].day).to.equal('11')
    expect(vm.dateInWeekMorning[2].day).to.equal('12')
    expect(vm.dateInWeekMorning[3].day).to.equal('13')
    expect(vm.dateInWeekMorning[4].day).to.equal('14')
    expect(vm.dateInWeekMorning[5].day).to.equal('15')
    expect(vm.dateInWeekMorning[6].day).to.equal('16')
    expect(vm.dateInWeekAfternoon.length).to.equal(7)
    expect(vm.dateInWeekAfternoon[0].weekDay).to.equal(1)
    expect(vm.dateInWeekAfternoon[1].weekDay).to.equal(2)
    expect(vm.dateInWeekAfternoon[2].weekDay).to.equal(3)
    expect(vm.dateInWeekAfternoon[3].weekDay).to.equal(4)
    expect(vm.dateInWeekAfternoon[4].weekDay).to.equal(5)
    expect(vm.dateInWeekAfternoon[5].weekDay).to.equal(6)
    expect(vm.dateInWeekAfternoon[6].weekDay).to.equal(0)
  })
  it('should create two dateInWeek object  (function: setDayAndDateInWeekWithTwoMonths(periodName))', () => {
    vm.currentDate = new Date(2017, 2, 28)
    vm.dateInWeekMorning.splice(0, vm.dateInWeekMorning.length)
    vm.dateInWeekAfternoon.splice(0, vm.dateInWeekAfternoon.length)
    vm.mondayDate = 27
    vm.dayInMonth = 31
    vm.setDayAndDateInWeekWithTwoMonths(2, 'morning')
    vm.setDayAndDateInWeekWithTwoMonths(2, 'afternoon')
    expect(vm.dateInWeekMorning.length).to.equal(7)
    expect(vm.dateInWeekMorning[0].day).to.equal('27')
    expect(vm.dateInWeekMorning[1].day).to.equal('28')
    expect(vm.dateInWeekMorning[2].day).to.equal('29')
    expect(vm.dateInWeekMorning[3].day).to.equal('30')
    expect(vm.dateInWeekMorning[4].day).to.equal('31')
    expect(vm.dateInWeekMorning[5].day).to.equal('01')
    expect(vm.dateInWeekMorning[6].day).to.equal('02')
    expect(vm.dateInWeekAfternoon.length).to.equal(7)
    expect(vm.dateInWeekAfternoon[0].month).to.equal(2)
    expect(vm.dateInWeekAfternoon[1].month).to.equal(2)
    expect(vm.dateInWeekAfternoon[2].month).to.equal(2)
    expect(vm.dateInWeekAfternoon[3].month).to.equal(2)
    expect(vm.dateInWeekAfternoon[4].month).to.equal(2)
    expect(vm.dateInWeekAfternoon[5].month).to.equal(3)
    expect(vm.dateInWeekAfternoon[6].month).to.equal(3)
  })
  it('should return number of days in february (function: howMuchDayInPreviousMonth())', () => {
    expect(vm.howMuchDayInPreviousMonth(2017, 2)).to.equal(28)
  })
  it('should set monday and sunday date (function: setMondayDate()', () => {
    vm.currentDate = new Date(2017, 3, 10)
    vm.setMondayDate()
    expect(vm.mondayDate).to.equal(10)
    expect(vm.sundayDate).to.equal(16)
  })
  it('should set date a week ago (function: previousWeekDate())', () => {
    vm.currentDate = new Date(2017, 3, 10)
    vm.previousWeekDate()
    expect(vm.currentDate.getDate()).to.equal(new Date(2017, 3, 3).getDate())
  })
  it('should set date in one week (function: nextWeekDate())', () => {
    vm.currentDate = new Date(2017, 3, 10)
    vm.nextWeekDate()
    expect(vm.currentDate.getDate()).to.equal(new Date(2017, 3, 17).getDate())
  })
  it('should set string `Kwiecień 10-16`', () => {
    vm.mondayDate = 10
    vm.sundayDate = 16
    vm.monthNumber = 3
    expect(vm.formatedStringWithDate).to.equal(`${vm.$t('calendar.months[3]')} 10-16`)
  })
})
