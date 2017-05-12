<template>
  <nav class="navbar navbar-toggleable-md navbar-inverse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">{{ $t("navbar.home") }}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/pets" class="nav-link">{{ $t("navbar.petsGallery") }}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/transfer" class="nav-link">{{ $t("navbar.transferDetails") }}</router-link>
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
      <button class="btn"
            @click="logout"
            v-if="volunteer.authenticated">{{ $t("navbar.signOut") }}
      </button>
  </nav>
</template>

<script>
import auth from '../auth.js'

export default {
  data () {
    return {
      volunteer: auth.user
    }
  },
  methods: {
    logout () {
      auth.logout()
      this.$router.go('/')
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables.sass"
  nav
    height: 70px
    background-color: $black

  ul
    li
      a
        font-size: 24px

</style>
