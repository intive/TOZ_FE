import petsList from '@/mocks/petsMock'
import PetDetails from '@/components/PetDetails'
import Vue from 'vue'

const Constructor = Vue.extend(PetDetails)
const vm = new Constructor().$mount()
vm.petDetails = petsList[0]

describe('PetDetails.vue', () => {
  it('should render correct labels', () => {
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('.li-span-name').textContent).to.equal($t('pets.name'))
      expect(vm.$el.querySelectorAll('.li-span-sex').textContent).to.equal($t('pets.sex'))
      expect(vm.$el.querySelectorAll('.li-span-type').textContent).to.equal($t('pets.type'))
      expect(vm.$el.querySelectorAll('.li-span-calendar').textContent).to.equal($t('pets.creationDate'))
    })
  })
  describe('Timestamp converter', () => {
    it('should append zero to first nine days', () => {
      vm.petDetails.created = 1491332517000
      expect(vm.convertTimeStamp).to.equal('04.04.2017')
    })
    it('should convert rest of the days in unchanged form', () => {
      vm.petDetails.created = 1493061386000
      expect(vm.convertTimeStamp).to.equal('24.04.2017')
    })
  })
})
