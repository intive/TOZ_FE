import Vue from 'vue'
import Account from '@/components/Account'

const Constructor = Vue.extend(Account)
const vm = new Constructor().$mount()

describe('Account.vue', () => {
  it('Should render proper link names', () => {
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('.nav-item .nav-link')[0].textContent).to.equal(vm.$t('account.changePassword'))
      expect(vm.$el.querySelectorAll('.nav-item .nav-link')[1].textContent).to.equal(vm.$t('common.backHome'))
    })
  })
})
