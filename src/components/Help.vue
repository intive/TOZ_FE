<template>
  <div class="container">
    <router-link to="/transfer" class="btn btn-nav">{{ $t("help.transfer") }}</router-link>
    <router-link to="/help-info" class="btn btn-nav">{{ $t("help.volunteer") }}</router-link>

    <router-link to="/" class="routerLink">{{ $t("common.backHome") }}</router-link>
  </div>
</template>

<style scoped>
  .btn-nav {
    display: block;
    margin: 1em auto 1em auto;
    width: 25em;
  }
  .routerLink {
    font-size: 1.8em;
  }
</style>
