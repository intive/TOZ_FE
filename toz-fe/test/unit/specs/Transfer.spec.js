import Vue from 'vue'
import Transfer from '@/components/Transfer'

describe('Transfer.vue', () => {
  const Constructor = Vue.extend(Transfer)
  const vm = new Constructor().$mount()
  vm.transferData = {
    address: {
      apartmentNumber: 0,
      city: 'string',
      country: 'string',
      houseNumber: 0,
      postCode: '02-123',
      street: 'string'
    },
    bankAccount: {
      bankName: 'string',
      number: '61109010140000071219812874'
    },
    contact: {
      email: 'mail@example.com',
      fax: '+48123123123',
      phone: '+48123123123',
      website: 'http://example.com/'
    },
    name: 'string'
  }
  it('should render correct contents', () => {
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('.transfer-data h2')[0].textContent)
        .to.equal('string')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[1].textContent)
        .to.equal('0')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[2].textContent)
        .to.equal('string')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[3].textContent)
        .to.equal('string')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[4].textContent)
        .to.equal('0')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[5].textContent)
        .to.equal('02-123')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[6].textContent)
        .to.equal('string')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[7].textContent)
        .to.equal('string')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[8].textContent)
        .to.equal('61 1090 1014 0000 0712 1981 2874')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[9].textContent)
        .to.equal('mail@example.com')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[10].textContent)
        .to.equal('+48123123123')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[11].textContent)
        .to.equal('+48123123123')
      expect(vm.$el.querySelectorAll('.transfer-data h2')[12].textContent)
        .to.equal('http://example.com/')
    })
  })
  it('should set formattedAcountNumber return value in proper format', () => {
    Vue.nextTick(() => {
      expect(vm.formattedAccountNumber).to.equal('61 1090 1014 0000 0712 1981 2874')
    })
  })
})
