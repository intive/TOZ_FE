<template>
  <div class="container">
    <h1>{{ $t("firstSignIn.message.firstSignIn") }}</h1>
    <p>{{ $t("firstSignIn.message.info") }}</p>
  <form>
    <div class="form-group row">
      <label for="inputEmail" class="col-sm-2 col-form-label">{{ $t("firstSignIn.label.login") }}</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="inputEmail">
      </div>
    </div>
    <div class="form-group row">
      <label for="inputPassword" class="col-sm-2 col-form-label">{{ $t("firstSignIn.label.password") }}</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword" :placeholder="$t('firstSignIn.placeholder')">
      </div>
    </div>
    <div class="form-group row">
      <label for="inputPassword2" class="col-sm-2 col-form-label">{{ $t("firstSignIn.label.confirmPassword") }}</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword2" :placeholder="$t('firstSignIn.placeholder')">
      </div>
    </div>
    <div class="form-group row">
      <div class="offset-sm-2 col-sm-10">
        <a href="#">{{ $t("common.button.cancel") }}</a>
        <button type="submit" class="btn btn-secondary">{{ $t("common.button.ok") }}</button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
export default {
}
</script>

<style>
.btn {
  border-radius: 0;
}
</style>
