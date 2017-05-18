import Login from '@/components/Login'
import Vue from 'vue'

const Constructor = Vue.extend(Login)
const vm = new Constructor().$mount()

describe('Login.vue', () => {
  it('should validate email properly', () => {
    expect(vm.credentials.login).to.be.empty
    vm.credentials.login = 'test@gmail.com'
    expect(vm.validateEmail()).to.be.true
    vm.credentials.login = 'test@email.edu.uk'
    expect(vm.validateEmail()).to.be.true
    vm.credentials.login = 'test@email.management'
    expect(vm.validateEmail()).to.be.true
    vm.credentials.login = 'testgmail.com'
    expect(vm.validateEmail()).to.be.false
    vm.credentials.login = '@gmail.com'
    expect(vm.validateEmail()).to.be.false
    vm.credentials.login = 'email@gmail'
    expect(vm.validateEmail()).to.be.false
    vm.credentials.login = 'email@.com'
    expect(vm.validateEmail()).to.be.false
    vm.credentials.login = 'email@gmail.com.'
    expect(vm.validateEmail()).to.be.false
    vm.credentials.login = '.email@gmail.com'
    expect(vm.validateEmail()).to.be.false
    vm.credentials.login = 'email..@gmail.com'
    expect(vm.validateEmail()).to.be.false
    vm.credentials.login = 'mysite()*@gmail.com'
    expect(vm.validateEmail()).to.be.false
  })
})
