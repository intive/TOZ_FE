<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-12">
        <h3>{{ $t("accountActivated.message") }}</h3>
        <router-link to="/sign-in" class="btn my-4">{{ $t("common.button.signIn") }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
