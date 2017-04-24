<template>
  <div class="container">
    <router-link to="/transfer" class="btn btn-info">{{ $t("help.transfer") }}</router-link>
    <router-link to="/help/info" class="btn btn-info">{{ $t("help.volunteer") }}</router-link>

    <router-link to="/">{{ $t("navigation.back.home") }}</router-link>
  </div>
</template>

<style scoped>
.btn-info {
  display: block;
  margin: 1em auto 1em auto;
  width: 25em;
}
</style>
