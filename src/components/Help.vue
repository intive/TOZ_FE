<template>
  <div class="container" id="help">
    <div class="row mt-5">
      <div class="col-12 col-lg-4 py-5">
        <router-link to="/transfer" class="help-link">
          <span class="fa fa-heart fa-large"></span>
          <button class="btn">{{ $t("help.transfer") }}</button>
        </router-link>
      </div>
      <div class="col-12 col-lg-4 py-5">
        <router-link to="/help-info" class="help-link">
          <span class="fa fa-user-plus fa-large"></span>
          <button class="btn">{{ $t("help.volunteer") }}</button>
        </router-link>
      </div>
      <div class="col-12 col-lg-4 py-5">
        <router-link to="/" class="help-link">
          <span class="fa fa-reply fa-large"></span>
          <button class="btn">{{ $t("common.backHome") }}</button>
        </router-link>
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

  .help-link:hover,
  .help-link:focus
    text-decoration: none


</style>
