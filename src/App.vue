<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <footer></footer>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'

  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>

<style lang="sass">
  @import "./assets/styles/global.sass"

  footer
    height: 48px
    width: 100%
    background-color: #000
    position: absolute
    bottom: 0

  @media (max-width: 991px)
    footer
      height: 20px
</style>
