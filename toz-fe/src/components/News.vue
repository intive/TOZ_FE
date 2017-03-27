<template>
  <div>
    <h1>{{ $route.params.id }}</h1>
    <h3>{{ $route.params.title }}</h3>
    <h3>{{ $route.params.dateDay }}-{{ $route.params.dateMonth }}-{{ $route.params.dateYear }}</h3>
    <h3>{{ $route.params.longContent }}</h3>
    <router-link to="/">Powrót do strony głównej</router-link>
  </div>
</template>

<script>
  export default {
    name: 'News',
    data () {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
