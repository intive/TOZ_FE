<template>
  <div id="app">
    <navbar></navbar>
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import Navigation from './components/Nav'

  export default {
    name: 'app',
    components: {
      Navbar,
      Navigation
    }
  }
</script>

<style src="./assets/styles/global.sass" lang="sass"></style>
