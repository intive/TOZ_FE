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
          <router-link to="/account" class="nav-link">{{ $t("account.accountLink") }}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/calendar" class="nav-link">{{ $t("navbar.schedule") }}</router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2"
               type="email"
               :placeholder="$t('placeholder.login')">
        <input class="form-control mr-sm-2"
               type="password"
               :placeholder="$t('placeholder.password')">
        <button class="btn btn-outline-success my-2 my-sm-0"
                type="submit">{{ $t("button.ok") }}</button>
      </form>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar',
    data () {
      return {
      }
    }
  }
</script>

<style scoped>

</style>
