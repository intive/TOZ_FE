<template>
  <nav class="navbar navbar-toggleable-md navbar-inverse">
    <div class="bar">
      <a class="navbar-brand" href="#">
        <img src="../assets/toz_app_logo.svg" class="d-inline-block align-top">
      </a>
      <button class="navbar-toggler navbar-toggler-right"
              type="button"
              @click="showNav = !showNav">
        <span class="fa fa-bars fa-2x" aria-hidden="true"></span>
      </button>
    </div>
    <transition name="slide-left">
      <div v-show="showNav" @click="showNav = false" class="collapse navbar-collapse" :class="{ 'show': showNav }">
        <ul class="navbar-nav ml-auto">
          <li v-if="volunteer.authenticated" id="username" class="nav-item hidden-lg-up">{{ loggedUser }}</li>
          <router-link to="/" tag="li" class="nav-item" active-class="active" exact>
            <a class="nav-link">{{ $t("navbar.home") }}</a>
          </router-link>
          <router-link to='/pets' tag="li" class="nav-item" active-class="active">
            <a class="nav-link">{{ $t("navbar.petsGallery") }}</a>
          </router-link>
          <router-link to="/help" tag="li" class="nav-item" active-class="active" exact>
            <a class="nav-link">{{ $t("navbar.help") }}</a>
          </router-link>
          <router-link to="/calendar" v-if="volunteer.authenticated" tag="li" class="nav-item" active-class="active" exact>
            <a class="nav-link">{{ $t("navbar.schedule") }}</a>
          </router-link>
          <router-link to="/account" v-if="volunteer.authenticated" tag="li" class="nav-item" active-class="active" exact>
            <a class="nav-link">{{ $t("navbar.accountLink") }}</a>
          </router-link>
          <router-link to="/sign-in" v-if="!volunteer.authenticated" tag="li" class="nav-item">
            <a class="nav-link" id="login-btn">{{ $t("navbar.signIn") }}</a>
          </router-link>
          <li v-if="volunteer.authenticated" id="sign-out" class="nav-item" @click="logout">{{ $t("navbar.signOut") }}</li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script>
import auth from '../auth.js'

export default {
  data () {
    return {
      volunteer: auth.user,
      showNav: false
    }
  },
  computed: {
    loggedUser () {
      return `${sessionStorage.getItem('name')} ${sessionStorage.getItem('surname')}`
    }
  },
  methods: {
    logout () {
      auth.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass">
  @import "../assets/styles/variables.sass"

  .navbar-inverse
    background-color: $black
    .navbar-brand
      padding-top: 0
      padding-bottom: 0
      margin-right: 0
    img
      width: 54px
      height: 54px
    .navbar-nav
      .active
        .nav-link
          color: $green
      .nav-link
        font-family: $font-stack
        font-weight: 400
        font-size: 14px
        color: $gray

  #login-btn
    background-color: $orange
    font-weight: 800
    text-transform: uppercase

  #sign-out
    font-size: 14px
    padding: 7px 0
    color: #eee
    font-weight: 800
    text-transform: uppercase
    cursor: pointer

  @media (min-width: 992px)
    nav
      height: 70px
    .navbar
      padding: 8px 112px
    .navbar-toggleable-md .navbar-nav .nav-link
      padding-right: 14px
      padding-left: 14px
    #login-btn
      margin-left: 21px
    #sign-out
      margin-left: 46px
      margin-right: 20px

  @media (max-width: 991px)
    .navbar
      position: fixed
      top: 0
      left: 0
      right: 0
      padding: 0
      z-index: 1000
    .navbar-inverse
      background-color: transparent
      .navbar-nav .nav-link:focus,
      .navbar-nav .nav-link:hover
        color: $silver
    .navbar-brand
      float: left
    .navbar-toggler
      border: none
    .bar
      background-color: $black
      padding: 8px
    .navbar-collapse.show
      padding-left: 101px
      background-color: transparent
      .navbar-nav
        position: relative
        padding-top: 35px
        height: calc(100vh - 70px)
        background-color: #fff
      .nav-item
        height: 62px
        margin: 0 19px
      .nav-link
        line-height: 14px
        padding-top: 24px
        padding-bottom: 24px
        border-bottom: 1px #eee solid
        color: $black
    #username
      height: 47px
      font-size: 12px
      line-height: 12px
      color: $orange
      border-bottom: 1px solid $orange
    #login-btn
      position: absolute
      left: 50%
      transform: translate(-50%, 0)
      bottom: 35px
      padding: 1em 1em
      color: $gray
    #sign-out
      padding: 26px 0 0 0
      color: $silver

  .slide-left-enter-active
    transition: all .5s ease

  .slide-left-enter
    transform: translateX(150px)
    opacity: 0

</style>
