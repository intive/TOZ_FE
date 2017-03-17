<template>
  <div class="transfer">
    <div class="errors" v-if="errors && errors.length">
    <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div class="transfer-data" v-else>
      <h1>Dane do przelewu</h1>
      <h2>{{ transferData.name }}</h2>
      <h2>{{ transferData.address.street }} {{ transferData.address.houseNumber }}</h2>
      <h2>{{ transferData.address.postCode }} {{ transferData.address.city }}</h2>
      <h2>{{ transferData.bankAccount.bankName }}</h2>
      <h2>{{ formattedAccountNumber }}</h2>
      <router-link to="/">Powrót do strony głównej</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transferData',
  data () {
    return {
      transferData: {
        address: {
          apartmentNumber: '',
          city: '',
          country: '',
          houseNumber: '',
          postCode: '',
          street: ''
        },
        bankAccount: {
          bankName: '',
          number: ''
        },
        contact: {
          email: '',
          fax: '',
          phone: '',
          website: ''
        },
        name: ''
      },
      errors: []
    }
  },
  computed: {
    formattedAccountNumber () {
      const accountNumber = this.transferData.bankAccount.number
      return `${accountNumber.substr(0, 2)} ${accountNumber.substr(2, 4)} ${accountNumber.substr(6, 4)} ${accountNumber.substr(10, 4)} ${accountNumber.substr(14, 4)} ${accountNumber.substr(18, 4)} ${accountNumber.substr(22, 4)}`
    }
  },
  created () {
    this.$http.get(`http://dev.patronage2017.intive-projects.com:2000/organization/info`)
    .then(response => {
      this.transferData = {...response.data}
    })
    .catch(error => {
      this.errors.push(error)
    })
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
