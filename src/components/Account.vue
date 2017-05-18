<template>
  <div>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/account-password" class="nav-link">{{ $t("account.changePassword") }}</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link">{{ $t("common.backHome") }}</router-link>
      </li>
    </ul>
    <button class="btn" @click="logout">{{ $t("navbar.signOut") }}</button>
  </div>
</template>


<script>
import auth from '../auth.js'

export default {
  name: 'Account',
  methods: {
    logout () {
      auth.logout()
      this.$router.push('/')
    }
  }
}
</script>
