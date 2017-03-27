<template>
  <div>
    <router-link to="/transfer">Kliknij tutaj, aby wyświetlić dane do przelewu</router-link>
    <News></News>
  </div>
</template>

<script>
  import News from './News'
  export default {
    name: 'Home',
    data () {
      return {
      }
    },
    components: {
      News
    }
  }
</script>

<style scoped>
</style>
