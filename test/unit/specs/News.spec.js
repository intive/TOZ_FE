import Vue from 'vue'
import News from '@/components/News'

describe('News.vue', () => {
  const Constructor = Vue.extend(News)
  const vm = new Constructor().$mount()
  vm.news = [{
    id: 1,
    title: 'Komunikat 1',
    shortContent: 'Skrócona treść komunikatu 1.',
    longContent: 'Długa treść komunikatu 1.',
    date: {
      day: '01',
      month: '01',
      year: '2017'
    }
  }]
  it('should render proper content', () => {
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('h1')[0].textContent)
        .to.equal('Komunikat 1')
      expect(vm.$el.querySelectorAll('h1')[2].textContent)
        .to.equal('Skrócona treść komunikatu 1.')
    })
  })
  it('should link title', () => {
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('h1')[0].parentNode.tagName)
        .to.equal('ROUTER-LINK')
    })
  })
  it('should check if date is in proper format', () => {
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('h1')[1].textContent)
        .to.equal('01-01-2017')
    })
  })
})
