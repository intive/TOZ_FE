<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <span class="fa fa-frown-o fa-large"></span>
        <h3>{{ $t("activationLinkExpired.message.linkExpired") }}</h3>
        <h3>{{ $t("activationLinkExpired.message.contactAdmin") }}</h3>
        <router-link to="/" class="btn my-3">{{ $t("common.backHome") }}</router-link>
      </div>
    </div>
  </div>
</template>
