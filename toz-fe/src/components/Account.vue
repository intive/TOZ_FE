<template>
  <form v-on:submit.prevent="handleSubmit" class="col-md-8 col-lg-4">
    <div class="form-group">
      <label for="oldPassword">{{ $t("account.oldPassword") }}</label>
      <input type="password" class="form-control" id="oldPassword" :placeholder="$t('account.oldPassword')" maxlength="24" required>
    </div>
    <div class="form-group">
      <label for="newPassword">{{ $t("account.newPassword") }}</label>
      <input type="password" class="form-control" id="newPassword" :placeholder="$t('account.newPassword')" maxlength="24" required>
    </div>
    <div class="form-group">
      <label for="confirmNewPassword">{{ $t("account.confirmNewPassword") }}</label>
      <input type="password" class="form-control" id="confirmNewPassword" :placeholder="$t('account.confirmNewPassword')" maxlength="24" required>
    </div>
    <div class="form-group">
      <input type="submit" class="btn btn-outline-success my-2" :value="$t('button.ok')">
    </div>
  </form>
</template>


<script>

export default {
  name: 'Account',
  data () {
    return {}
  },
  methods: {
    handleSubmit () {
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>
