import Vue from 'vue'
import AccountPassword from '@/components/AccountPassword'

describe('AccountPassword.vue', () => {
  it('Should render proper change password form', () => {
    const Constructor = Vue.extend(AccountPassword)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelectorAll('.form-group label')[0].textContent).to.equal(vm.$t('accountPassword.oldPassword'))
    expect(vm.$el.querySelectorAll('.form-group .form-control')[0].placeholder).to.equal(vm.$t('accountPassword.oldPassword'))
    expect(vm.$el.querySelectorAll('.form-group .form-control')[0].type).to.equal('password')

    expect(vm.$el.querySelectorAll('.form-group label')[1].textContent).to.equal(vm.$t('accountPassword.newPassword'))
    expect(vm.$el.querySelectorAll('.form-group .form-control')[1].placeholder).to.equal(vm.$t('accountPassword.newPassword'))
    expect(vm.$el.querySelectorAll('.form-group .form-control')[1].type).to.equal('password')

    expect(vm.$el.querySelectorAll('.form-group label')[2].textContent).to.equal(vm.$t('accountPassword.confirmNewPassword'))
    expect(vm.$el.querySelectorAll('.form-group .form-control')[2].placeholder).to.equal(vm.$t('accountPassword.confirmNewPassword'))
    expect(vm.$el.querySelectorAll('.form-group .form-control')[2].type).to.equal('password')

    expect(vm.$el.querySelectorAll('.form-group .btn')[0].value).to.equal(vm.$t('common.button.ok'))
  })
})
