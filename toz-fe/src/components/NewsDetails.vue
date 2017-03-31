<template>
  <div>
    <h1>{{ $route.params.title }}</h1>
    <h1>{{ $route.params.dateDay }}-{{ $route.params.dateMonth }}-{{ $route.params.dateYear }}</h1>
    <h1>{{ $route.params.longContent }}</h1>
    <router-link to="/">Powrót do strony głównej</router-link>
  </div>
</template>

<script>
  export default {
    name: 'NewsDetails',
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
</style>
