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
  </div>
</template>


<script>

export default {
  name: 'Account',
  methods: {
    handleSubmit () {
    }
  }
}
</script>
