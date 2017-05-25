<template>
  <div class="container" id="help">
    <div class="row mt-5">
      <div class="col-12 col-lg-4 py-5">
        <span class="fa fa-heart fa-large"></span>
        <router-link to="/transfer" class="btn">{{ $t("help.transfer") }}</router-link>
      </div>
      <div class="col-12 col-lg-4 py-5">
        <span class="fa fa-user-plus fa-large"></span>
        <router-link to="/help-info" class="btn">{{ $t("help.volunteer") }}</router-link>
      </div>
      <div class="col-12 col-lg-4 py-5">
        <span class="fa fa-reply fa-large"></span>
        <router-link to="/" class="btn">{{ $t("common.backHome") }}</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  @import "../assets/styles/variables"

  #help [class^="col-"]:hover
    .fa
      transform: scale(1.1)
      color: $green
      transition-duration: 0.3s

</style>
