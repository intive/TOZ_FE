<template>
  <div class="transfer-data">
    <h1>Dane do przelewu</h1>
    <h2>{{transferData.name}}</h2>
    <h2>{{transferData.address.apartmentNumber}}</h2>
    <h2>{{transferData.address.city}}</h2>
    <h2>{{transferData.address.country}}</h2>
    <h2>{{transferData.address.houseNumber}}</h2>
    <h2>{{transferData.address.postCode}}</h2>
    <h2>{{transferData.address.street}}</h2>
    <h2>{{transferData.bankAccount.bankName}}</h2>
    <h2>{{ formattedAccountNumber }}</h2>
    <h2>{{transferData.contact.email}}</h2>
    <h2>{{transferData.contact.fax}}</h2>
    <h2>{{transferData.contact.phone}}</h2>
    <h2>{{transferData.contact.website}}</h2>
    <router-link to="/">Powrót do strony głównej</router-link>
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
      }
    }
  },
  computed: {
    formattedAccountNumber () {
      let accountNumber = this.transferData.bankAccount.number
      return `${accountNumber.substr(0, 2)} ${accountNumber.substr(2, 4)} 
        ${accountNumber.substr(18, 4)} ${accountNumber.substr(22, 4)}`
    }
  },
  created () {
    this.$http.get(`http://dev.patronage2017.intive-projects.com:2000/organization/info`)
    .then(response => {
      this.transferData.address.apartmentNumber = response.data.address.apartmentNumber
      this.transferData.address.city = response.data.address.city
      this.transferData.address.country = response.data.address.country
      this.transferData.address.houseNumber = response.data.address.houseNumber
      this.transferData.address.postCode = response.data.address.postCode
      this.transferData.address.street = response.data.address.street
      this.transferData.bankAccount.bankName = response.data.bankAccount.bankName
      this.transferData.bankAccount.number = response.data.bankAccount.number
      this.transferData.contact.email = response.data.contact.email
      this.transferData.contact.fax = response.data.contact.fax
      this.transferData.contact.phone = response.data.contact.phone
      this.transferData.contact.website = response.data.contact.website
      this.transferData.name = response.data.name
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
