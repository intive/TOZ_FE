import Vue from 'vue'
import Transfer from '@/components/Transfer'

describe('Transfer.vue', () => {
  const Constructor = Vue.extend(Transfer)
  const vm = new Constructor().$mount()
  it('should render correct contents', done => {
    vm.transferData = {
      receiver: {
        name: 'Towarzystwo Opieki nad Zwierzętami',
        address1: 'ul. Ojca Beyzyma 17',
        address2: '70-001 Szczecin'
      },
      account: {
        name: 'PKO BO II O/Szczecin',
        number: '63102047950000940201035419'
      }
    }
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('.transfer-data h2')[0].textContent)
          .to.equal('Towarzystwo Opieki nad Zwierzętami')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[1].textContent)
          .to.equal('ul. Ojca Beyzyma 17')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[2].textContent)
          .to.equal('70-001 Szczecin')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[3].textContent)
          .to.equal('PKO BO II O/Szczecin')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[4].textContent)
          .to.equal('63 1020 4795 0000 9402 0103 5419')
      done()
    })
  })
  it('formattedAcountNumber should return proper format', done => {
    const accountNumber = vm.transferData.account.number
    const string = `${accountNumber.substr(0, 2)} ${accountNumber.substr(2, 4)} ${accountNumber.substr(6, 4)} ${accountNumber.substr(10, 4)} ${accountNumber.substr(14, 4)} ${accountNumber.substr(18, 4)} ${accountNumber.substr(22, 4)}`
    expect(string).to.equal('63 1020 4795 0000 9402 0103 5419')
    done()
  })
})
