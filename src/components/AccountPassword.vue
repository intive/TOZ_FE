<template>
  <div>
    <form v-on:submit.prevent="handleSubmit" class="col-md-8 col-lg-4">
      <div id="oldPasswordGroup" class="form-group">
        <label for="oldPassword">{{ $t("account.oldPassword") }}</label>
        <input type="password" class="form-control" id="oldPassword" :placeholder="$t('account.oldPassword')" maxlength="24" required>
      </div>
      <div id="newPasswordGroup" class="form-group">
        <label for="newPassword">{{ $t("account.newPassword") }}</label>
        <input type="password" class="form-control" id="newPassword" :placeholder="$t('account.newPassword')" maxlength="24" required>
      </div>
      <div id="confirmNewPasswordGroup" class="form-group">
        <label for="confirmNewPassword">{{ $t("account.confirmNewPassword") }}</label>
        <input type="password" class="form-control" id="confirmNewPassword" :placeholder="$t('account.confirmNewPassword')" maxlength="24" required>
      </div>
      <div class="form-group">
        <input type="submit" class="btn btn-outline-success my-2" :value="$t('button.ok')">
        <router-link to="/account" class="btn btn-outline-success my-2">{{ $t("button.cancel") }}</router-link>
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
