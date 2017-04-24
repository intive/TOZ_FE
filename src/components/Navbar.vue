<template>
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">{{ $t("navbar.home") }}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/pets" class="nav-link">{{ $t("navbar.petsGallery") }}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/calendar" class="nav-link">{{ $t("navbar.schedule") }}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/help" class="nav-link">{{ $t("navbar.help") }}</router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2"
               type="text"
               :placeholder="$t('placeholder.login')"
               disabled>
        <input class="form-control mr-sm-2"
               type="password"
               :placeholder="$t('placeholder.password')"
               disabled>
        <button class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                disabled>{{ $t("button.ok") }}</button>
      </form>
    </div>
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
  .navbar {
    margin-bottom: 50px;
  }
</style>
