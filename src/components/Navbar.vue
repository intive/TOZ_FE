<template>
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
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
          <h6>Logged as {{ login }}</h6>
        </li>
      </ul>
      <form v-if="!logged" @submit.prevent class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2"
               type="email"
               :placeholder="$t('navbar.placeholder.login')"
               v-model="login">
        <input class="form-control mr-sm-2"
               type="password"
               :placeholder="$t('navbar.placeholder.password')"
               v-model="password">
        <button class="btn btn-outline-success my-2 my-sm-0"
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
        login: '',
        password: '',
        logged: false
      }
    },
    methods: {
      signIn () {
        this.$http.post(this.apiUrl + 'tokens/acquire', {
          email: this.login,
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
  @import "../assets/styles/global.sass"
  nav
    height: 70px
    background-color: $green

</style>
