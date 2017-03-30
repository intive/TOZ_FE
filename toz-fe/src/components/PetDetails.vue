<template>
  <div>
    <h2>Name: {{$route.params.name}}</h2>
    <h2>Description: {{$route.params.description}}</h2>
    <router-link to='/pets'>Go back</router-link>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style>

</style>
