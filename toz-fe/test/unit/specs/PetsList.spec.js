import PetsList from '@/components/PetsCarousel'
import Vue from 'vue'

describe('PetsList.vue', () => {
  const Constructor = Vue.extend(PetsList)
  const vm = new Constructor().$mount()
  vm.petsList = [
    {
      id: '79ec8ac5-4ac7-40d1-824b-287a238f9bb8',
      name: 'Name:2',
      type: 'DOG',
      sex: 'MALE',
      description: 'description:2'
    },
    {
      id: 'b9a1dc63-5163-4397-b457-3f494e4c6b73',
      name: 'Name:3',
      type: 'CAT',
      sex: 'FEMALE',
      description: 'description:3'
    },
    {
      id: '94eb2c61-bc05-4f41-b646-bccb18a5178d',
      name: 'Name:4',
      type: 'DOG',
      sex: 'MALE',
      description: 'description:4'
    },
    {
      id: '198ffcdb-e1bc-4f74-a9fe-984de3911258',
      name: 'Name:0',
      type: 'DOG',
      sex: 'MALE',
      description: 'description:0'
    }
  ]
  it('should render correct content', () => {
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('.sliderContent img')).to.exist
      expect(vm.$el.querySelectorAll('.sliderContent h2')[0].textContent).to.equal('Name: Name:2')
      expect(vm.$el.querySelectorAll('.sliderContent h2')[1].textContent).to.equal('Type: DOG')
      expect(vm.$el.querySelectorAll('.sliderContent h2')[2].textContent).to.equal('Sex: MALE')
      expect(vm.$el.querySelectorAll('.sliderContent h2')[3].textContent).to.equal('Name: Name:3')
      expect(vm.$el.querySelectorAll('.sliderContent h2')[4].textContent).to.equal('Type: CAT')
      expect(vm.$el.querySelectorAll('.sliderContent h2')[5].textContent).to.equal('Sex: FEMALE')
      expect(vm.$el.querySelectorAll('.sliderContent h2')[6].textContent).to.equal('Name: Name:4')
      expect(vm.$el.querySelectorAll('.sliderContent h2')[7].textContent).to.equal('Type: DOG')
      expect(vm.$el.querySelectorAll('.sliderContent h2')[8].textContent).to.equal('Sex: MALE')
      expect(vm.$el.querySelectorAll('.sliderContent h2')[9].textContent).to.equal('Name: Name:0')
      expect(vm.$el.querySelectorAll('.sliderContent h2')[10].textContent).to.equal('Type: DOG')
      expect(vm.$el.querySelectorAll('.sliderContent h2')[11].textContent).to.equal('Sex: MALE')
    })
  })
})
