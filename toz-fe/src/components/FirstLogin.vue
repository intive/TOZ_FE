<template>
  <div class="container">
    <h1>{{ $t("message.firstLogin") }}</h1>
    <p>{{ $t("message.firstLoginInfo") }}</p>
  <form>
    <div class="form-group row">
      <label for="inputEmail3" class="col-sm-2 col-form-label">{{ $t("labels.login") }}</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
      </div>
    </div>
    <div class="form-group row">
      <label for="inputPassword" class="col-sm-2 col-form-label">{{ $t("labels.newPassword") }}</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword" :placeholder="$t('placeholder.password')">
      </div>
    </div>
    <div class="form-group row">
      <label for="inputPassword2" class="col-sm-2 col-form-label">{{ $t("labels.repeatPassword") }}</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword2" :placeholder="$t('placeholder.password')">
      </div>
    </div>
    <div class="form-group row">
      <div class="offset-sm-2 col-sm-10">
        <a href="#">{{ $t("button.cancel") }}</a>
        <button type="submit" class="btn btn-secondary">{{ $t("button.ok") }}</button>
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
