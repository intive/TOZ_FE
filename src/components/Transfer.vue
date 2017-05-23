<template>
  <div class="transfer">
    <img src="../assets/financialSupport.jpg" alt="" class="logo">
    <h2>{{ $t("transfer.header") }}</h2>
    <loader v-if="loading"></loader>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error in errors">{{ error.message }}</h2>
    </div>
    <div class="transfer-data" v-else-if="!loading">
      <p>{{ howToHelp }} </p>
      <span class="transferDetails">{{ transferData.name }}</span>
      <span class="transferDetails">{{ transferData.address.street }} {{ transferData.address.houseNumber }}/{{ transferData.address.apartmentNumber }}</span>
      <span class="transferDetails">{{ transferData.address.postCode }} {{ transferData.address.city }}</span>
      <span class="transferDetails">{{ transferData.address.country }}</span>
      <span class="transferDetails">{{ transferData.bankAccount.bankName }}</span>
      <span class="transferDetails">{{ formattedAccountNumber }}</span>
    </div>
    <router-link to="/help" class="routerLink">{{ $t("common.back") }}</router-link>
  </div>
</template>

<script>
import Loader from './Loader'

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
      loadingInfo: true,
      loadingHowToDonate: true,
      loading: true,
      howToHelp: ''
    }
  },
  computed: {
    formattedAccountNumber () {
      const accountNumber = this.transferData.bankAccount.number
      return `${accountNumber.substr(0, 2)} ${accountNumber.substr(2, 4)} ${accountNumber.substr(6, 4)} ${accountNumber.substr(10, 4)} ${accountNumber.substr(14, 4)} ${accountNumber.substr(18, 4)} ${accountNumber.substr(22, 4)}`
    }
  },
  created () {
    this.$http.get(this.apiUrl + 'organization/info')
      .then(response => {
        this.transferData.address = {...response.data.address}
        this.transferData.bankAccount = {...response.data.bankAccount}
        this.transferData.contact = {...response.data.contact}
        this.transferData.name = response.data.name
        this.loadingInfo = false
        !this.loadingHowToDonate && !this.loadingInfo ? this.loading = false : ''
      })
      .catch(error => {
        this.errors.push(error)
        this.loadingInfo = false
        !this.loadingHowToDonate && !this.loadingInfo ? this.loading = false : ''
      })
    this.$http.get(this.apiUrl + 'organization/howtodonate')
      .then(response => {
        this.howToHelp = response.data.howToHelpDescription
        this.loadingHowToDonate = false
        !this.loadingHowToDonate && !this.loadingInfo ? this.loading = false : ''
      })
      .catch(error => {
        this.errors.push(error)
        this.loadingHowToDonate = false
        !this.loadingHowToDonate && !this.loadingInfo ? this.loading = false : ''
      })
  },
  components: {
    Loader
  }
}
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .logo {
    margin: 2.5em 0;
    border: 2em solid #fff;
    box-shadow: 1em 1em 3.5em #888;
    transform: rotate(2deg);
  }
  .transferDetails {
    margin: 0.1em;
    font-size: 2em;
    font-weight: bold;
    display: block;
  }
  .routerLink {
    font-size: 1.5em;
  }
</style>
