<template>
  <div>
    <form v-on:submit.prevent="handleSubmit" class="col-md-8 col-lg-4">
      <div class="form-group">
        <label for="oldPassword">{{ $t("accountPassword.oldPassword") }}</label>
        <input type="password" class="form-control" :placeholder="$t('accountPassword.oldPassword')" maxlength="24" required>
      </div>
      <div class="form-group">
        <label for="newPassword">{{ $t("accountPassword.newPassword") }}</label>
        <input type="password" class="form-control" :placeholder="$t('accountPassword.newPassword')" maxlength="24" required>
      </div>
      <div class="form-group">
        <label for="confirmNewPassword">{{ $t("accountPassword.confirmNewPassword") }}</label>
        <input type="password" class="form-control" :placeholder="$t('accountPassword.confirmNewPassword')" maxlength="24" required>
      </div>
      <div class="form-group">
        <input type="submit" class="btn btn-outline-success my-2" :value="$t('common.button.ok')">
        <router-link to="/account" class="btn btn-outline-success my-2">{{ $t('common.button.cancel') }}</router-link>
      </div>
    </form>
  </div>
</template>


<script>

export default {
  name: 'AccountPassword',
  methods: {
    handleSubmit () {
    }
  }
}
</script>
