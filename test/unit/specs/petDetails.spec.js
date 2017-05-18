import petsList from '@/mocks/petsMock'
import PetDetails from '@/components/PetDetails'
import Vue from 'vue'

const Constructor = Vue.extend(PetDetails)
const vm = new Constructor().$mount()
vm.petDetails = petsList[0]

describe('PetDetails.vue', () => {
  it('should render correct labels', () => {
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('.li-span-name').textContent).to.equal(vm.$t('pets.name'))
      expect(vm.$el.querySelectorAll('.li-span-sex').textContent).to.equal(vm.$t('pets.sex'))
      expect(vm.$el.querySelectorAll('.li-span-type').textContent).to.equal(vm.$t('pets.type'))
      expect(vm.$el.querySelectorAll('.li-span-calendar').textContent).to.equal(vm.$t('pets.creationDate'))
    })
  })
  it('should convert the date properly', () => {
    vm.petDetails.created = 1590694936013
    expect(vm.convertTimeStamp).to.equal('28.05.2020')
  })
})
