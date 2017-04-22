import PetsGallery from '@/components/PetsGallery'
import petsList from '@/mocks/petsMock'
import Vue from 'vue'

const Constructor = Vue.extend(PetsGallery)
const vm = new Constructor().$mount()
vm.petsList = petsList
vm.paginationConfig.numberOfPages = Math.ceil(vm.petsList.length / vm.itemsPerPage)

describe('PetsGallery.vue', () => {
  it('should change current page properly', () => {
    expect(vm.paginationConfig.numberOfPages).to.be.equal(2)
    expect(vm.currentPage).to.be.empty
    vm.changePage(1)
    expect(vm.currentPage).to.have.lengthOf(9)
    vm.changePage(2)
    expect(vm.currentPage).to.have.lengthOf(7)
  })
})
