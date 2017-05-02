import Vue from 'vue'
import Account from '@/components/Account'

describe('Account.vue', () => {
  it('Should render proper link names', () => {
    const Constructor = Vue.extend(Account)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelectorAll('.nav-item .nav-link')[0].textContent).to.equal(vm.$t("account.changePassword"))
    expect(vm.$el.querySelectorAll('.nav-item .nav-link')[1].textContent).to.equal(vm.$t("common.backHome"))
  })
})
