<template>
  <div class="transfer-data">
    <h1>Dane do przelewu</h1>
    <h2>{{ transferData.receiver.name }}</h2>
    <h2>{{ transferData.receiver.address1 }}</h2>
    <h2>{{ transferData.receiver.address2 }}</h2>
    <h2>{{ transferData.account.name }}</h2>
    <h2>{{ formattedAccountNumber }}</h2>
  </div>
</template>

<script>
export default {
  name: 'transferData',
  data () {
    return {
      transferData: {
        receiver: {
          name: '',
          address1: '',
          address2: ''
        },
        account: {
          name: '',
          number: ''
        }
      }
    }
  },
  computed: {
    formattedAccountNumber () {
      let accountNumber = this.transferData.account.number
      return accountNumber.substr(0, 2) + ' ' + accountNumber.substr(2, 4) + ' ' +
       accountNumber.substr(6, 4) + ' ' + accountNumber.substr(10, 4) + ' ' + accountNumber.substr(14, 4) +
        ' ' + accountNumber.substr(18, 4) + ' ' + accountNumber.substr(22, 4)
    }
  },
  created () {
    this.$http.get(`http://localhost:10010/transfers`)
    .then(response => {
      this.transferData.receiver.name = response.data.receiver.name
      this.transferData.receiver.address1 = response.data.receiver.address1
      this.transferData.receiver.address2 = response.data.receiver.address2
      this.transferData.account.name = response.data.account.name
      this.transferData.account.number = response.data.account.number
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
