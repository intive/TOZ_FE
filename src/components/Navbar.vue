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
      </ul>
      <form @submit.prevent class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2"
               type="email"
               :placeholder="$t('navbar.placeholder.login')"
               v-model="email">
               <h6 if="emailWarning" class="text-danger">{{ emailWarning }}</h6>
        <input class="form-control mr-sm-2"
               type="password"
               maxlength="30"
               :placeholder="$t('navbar.placeholder.password')">
        <button class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                @click="validateEmail">{{ $t("common.button.signIn") }}</button>
      </form>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar',
    data () {
      return {
        email: '',
        emailWarning: ''
      }
    },
    methods: {
      validateEmail () {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        !emailRegex.test(this.email) ? this.emailWarning = this.$t('navbar.invalidLogin') : this.emailWarning = ''
      }
    }
  }
</script>
