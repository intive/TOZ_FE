<template>
  <nav class="navbar navbar-toggleable-md navbar-inverse">
    <a class="navbar-brand" href="#">
      <img src="../assets/toz_app_logo.svg" class="d-inline-block align-top" alt="">
     </a>
     <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>
    <div class="collapse navbar-collapse" id="navbarToggler">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">{{ $t("navbar.home") }}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/pets" class="nav-link">{{ $t("navbar.petsGallery") }}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/help" class="nav-link">{{ $t("navbar.help") }}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">{{ $t("nav.aboutUs") }}</router-link>
        </li>
        <li class="nav-item" v-if="volunteer.authenticated">
          <router-link to="/calendar" class="nav-link">{{ $t("navbar.schedule") }}</router-link>
        </li>
        <li class="nav-item" v-if="volunteer.authenticated">
          <router-link to="/account" class="nav-link">{{ $t("navbar.accountLink") }}</router-link>
        </li>
        <li class="nav-item" v-if="!volunteer.authenticated">
            <router-link to="/sign-in" class="nav-link">{{ $t("navbar.signIn") }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import auth from '../auth.js'

export default {
  data () {
    return {
      volunteer: auth.user
    }
  }
}
</script>

<style lang="sass">
  @import "../assets/styles/variables.sass"

  nav
    background-color: $black

  @media (min-width: 992px)
    nav
      height: 70px

  ul li a
    font-size: 24px

</style>
