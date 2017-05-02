import Vue from 'vue'
import Calendar from '@/components/Calendar'

describe('displayWeekChangeButton()', () => {
  const Constructor = Vue.extend(Calendar)
  const vm = new Constructor().$mount()
  it('should set previousWeek as true and nextWeek as false', () => {
    vm.displayWeekChangeButton(true)
    expect(vm.previousWeek).to.equal(true)
    expect(vm.nextWeek).to.equal(false)
  })
  it('should set previousWeek as false', () => {
    vm.displayWeekChangeButton(false)
    expect(vm.previousWeek).to.equal(true)
  })
  it('should return correct value', () => {
    vm.displayWeekChangeButton('ala')
    expect(vm.nextWeek).to.equal(false)
  })
})

describe('setDate()', () => {
  const Constructor = Vue.extend(Calendar)
  const vm = new Constructor().$mount()
  beforeEach(() => {
    vm.currentDate = new Date(2017, 4, 2)
  })
  it('should set date before 7 days', () => {
    vm.setDate(false, 2, 31, 30)
    expect(vm.currentDate.getDate()).to.equal(new Date(2017, 3, 25).getDate())
  })
  it('should set date after 7 days', () => {
    vm.setDate(true, 9, 31, 30)
    expect(vm.currentDate.getDate()).to.equal(new Date(2017, 4, 9).getDate())
  })
  it('should return date of last day in current month', () => {
    vm.setDate(true, 32, 32, 32)
    expect(vm.currentDate.getMonth()).to.equal(new Date(2017, 5, 1).getMonth())
  })
})

describe('numbersOfDaysToAdd()', () => {
  const Constructor = Vue.extend(Calendar)
  const vm = new Constructor().$mount()
  it('should return 0', () => {
    vm.currentDate = new Date(2017, 3, 30)
    expect(vm.numbersOfDaysToAdd()).to.equal(0)
  })
  it('should return 6', () => {
    vm.currentDate = new Date(2017, 4, 1)
    expect(vm.numbersOfDaysToAdd()).to.equal(6)
  })
})

describe('setMondayDate()', () => {
  const Constructor = Vue.extend(Calendar)
  const vm = new Constructor().$mount()
  it('should set monday date as 29th and sunday date as 4th', () => {
    vm.currentDate = new Date(2017, 4, 31)
    vm.setMondayDate()
    expect(vm.mondayDate).to.equal(29)
    expect(vm.sundayDate).to.equal(4)
  })
  it('should set monday date as 1st and sunday date as 7th', () => {
    vm.currentDate = new Date(2017, 4, 1)
    vm.setMondayDate()
    expect(vm.mondayDate).to.equal(1)
    expect(vm.sundayDate).to.equal(7)
  })
})

describe('setMondayDateWhenWeekIsInOneMonth()', () => {
  const Constructor = Vue.extend(Calendar)
  const vm = new Constructor().$mount()
  it('should set monday date as 8th and sunday date as 14th', () => {
    vm.currentDate = new Date(2017, 4, 11)
    vm.setMondayDateWhenWeekIsInOneMonth(3)
    expect(vm.mondayDate).to.equal(8)
    expect(vm.sundayDate).to.equal(14)
  })
})

describe('loopCreateWeekDays()', () => {
  const Constructor = Vue.extend(Calendar)
  const vm = new Constructor().$mount()
  beforeEach(() => {
    vm.dateInWeekMorning.splice(0, vm.dateInWeekMorning.length)
  })
  it('should add 7 object with day properties to dayInWeekMorning', () => {
    vm.currentDate = new Date(2017, 4, 3)
    vm.loopCreateWeekDays(true, 1, 7, 0)
    expect(vm.dateInWeekMorning.length).to.equal(7)
    expect(vm.dateInWeekMorning[0].day).to.equal('01')
  })
  it('should add 4 object with day properties to dayInWeekMorning', () => {
    vm.currentDate = new Date(2017, 5, 1)
    vm.loopCreateWeekDays(true, 1, 4, 0)
    expect(vm.dateInWeekMorning.length).to.equal(4)
    expect(vm.dateInWeekMorning[0].day).to.equal('01')
  })
})
