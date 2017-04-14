<template>
  <div>
     <ul class="navbar-nav mr-1">
       <li class="nav-item">
         <router-link to="/accountPassword" class="nav-link">Zmień hasło</router-link>
       </li>
     </ul>
  </div>
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
