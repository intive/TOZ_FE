<template>
  <nav class="navbar navbar-toggleable-md navbar-inverse">
      <ul class="nav mr-auto">
        <li class="nav-item">
          <a href="#" class="nav-link"><i class="fa fa-facebook-official fa-2x"></i></a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link"><i class="fa fa-instagram fa-2x"></i></a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link"><i class="fa fa-twitter fa-2x"></i></a>
        </li>
      </ul>
      <ul class="navbar-nav mr-1">
        <li class="nav-item">
          <router-link to="/account" class="nav-link">{{ $t("navbar.accountLink") }}</router-link>
        </li>
        <li v-if="logged">
          <h6>Logged as {{ email }}</h6>
        </li>
      </ul>
      <form v-if="!logged" @submit.prevent class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2"
               type="email"
               :placeholder="$t('navbar.placeholder.login')"
               v-model="email">
        <input class="form-control mr-sm-2"
               type="password"
               :placeholder="$t('navbar.placeholder.password')"
               v-model="password">
        <button class="btn my-2 my-sm-0"
                type="submit"
                @click="signIn">{{ $t("common.button.signIn") }}</button>
      </form>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar',
    data () {
      return {
        email: '',
        password: '',
        emailWarning: '',
        logged: false
      }
    },
    methods: {
      validateEmail () {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if (!emailRegex.test(this.email)) {
          this.emailWarning = this.$t('navbar.invalidLogin')
          return false
        }
        this.emailWarning = ''
        return true
      },
      signIn () {
        if (!this.validateEmail()) {
          return false
        }
        this.$http.post(this.apiUrl + 'tokens/acquire', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response)
          sessionStorage.setItem('token', response.data.jwt)
          this.logged = true
        })
         .catch(error => {
           console.log(error)
         })
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables.sass"
  nav
    height: 70px
    background-color: $black

</style>
