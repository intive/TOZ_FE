import Vue from 'vue'
import AccountPassword from '@/components/AccountPassword'

describe('AccountPassword.vue', () => {
  it('Should render proper change password form', () => {
    const Constructor = Vue.extend(AccountPassword)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelector('#oldPasswordGroup label').textContent).to.equal('Stare hasło')
    expect(vm.$el.querySelector('#oldPassword').placeholder).to.equal('Stare hasło')
    expect(vm.$el.querySelector('#oldPassword').type).to.equal('password')

    expect(vm.$el.querySelector('#newPasswordGroup label').textContent).to.equal('Nowe hasło')
    expect(vm.$el.querySelector('#newPassword').placeholder).to.equal('Nowe hasło')
    expect(vm.$el.querySelector('#newPassword').type).to.equal('password')

    expect(vm.$el.querySelector('#confirmNewPasswordGroup label').textContent).to.equal('Potwierdź nowe hasło')
    expect(vm.$el.querySelector('#confirmNewPassword').placeholder).to.equal('Potwierdź nowe hasło')
    expect(vm.$el.querySelector('#confirmNewPassword').type).to.equal('password')
  })
})
