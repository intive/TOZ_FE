<template>
  <div class="container">
    <img src="../assets/sadDog.jpg">
    <h1>{{ $t("activationLinkExpired.message.linkExpired") }}</h1>
    <h1>{{ $t("activationLinkExpired.message.contactAdmin") }}</h1>
    <button type="button" name="button" class="btn btn-secondary">
      <router-link to="/" class="nav-link">{{ $t("common.backHome") }}</router-link>
    </button>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  h1 {
    text-align: center;
  }
  img {
    max-height: 300px;
    max-width: 100%;
    margin: 0 auto;
  }
  .container {
    width: 100%;
    margin-bottom: 2em;
  }
  .btn {
    border-radius: 0;
  }
</style>
