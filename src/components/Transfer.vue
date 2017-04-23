<template>
  <div class="transfer">
    <h1>{{ $t("title.transfer") }}</h1>
    <div class="loader" v-if="loading"></div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div class="transfer-data" v-else-if="!loading">
      <h2>{{ transferData.name }}</h2>
      <h2>{{ transferData.address.street }} {{ transferData.address.houseNumber }}/{{ transferData.address.apartmentNumber }}</h2>
      <h2>{{ transferData.address.postCode }} {{ transferData.address.city }}</h2>
      <h2>{{ transferData.address.country }}</h2>
      <h2>{{ transferData.bankAccount.bankName }}</h2>
      <h2>{{ formattedAccountNumber }}</h2>
      <h2>{{ transferData.contact.email }}</h2>
      <h2>{{ transferData.contact.fax }}</h2>
      <h2>{{ transferData.contact.phone }}</h2>
      <h2>{{ transferData.contact.website }}</h2>
    </div>
    <router-link to="/">{{ $t("navigation.back.home") }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'transferData',
  data () {
    return {
      transferData: {
        name: '',
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
        }
      },
      errors: [],
      loading: true
    }
  },
  computed: {
    formattedAccountNumber () {
      const accountNumber = this.transferData.bankAccount.number
      return `${accountNumber.substr(0, 2)} ${accountNumber.substr(2, 4)} ${accountNumber.substr(6, 4)} ${accountNumber.substr(10, 4)} ${accountNumber.substr(14, 4)} ${accountNumber.substr(18, 4)} ${accountNumber.substr(22, 4)}`
    }
  },
  created () {
    this.$http.get('/transfer')
    // this.$http.get(`http://dev.patronage2017.intive-projects.com/organization/info`)
    .then(response => {
      this.transferData.address = {...response.data.transferData.address}
      this.transferData.bankAccount = {...response.data.transferData.bankAccount}
      this.transferData.contact = {...response.data.transferData.contact}
      this.transferData.name = response.data.transferData.name
      this.loading = false
    })
    .catch(error => {
      this.errors.push(error)
      this.loading = false
    })
  }
}
</script>

<style scoped>
@import "../assets/styles/loader.css";

h1, h2 {
  font-weight: normal;
}
</style>
