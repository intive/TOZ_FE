<template>
  <div id="app">
    <nav class="navBar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/transfer">Dane do przelewu</router-link></li>
        <li><router-link to="/pets">Galeria</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  html,body{
    width: 100%;
    /*overflow: hidden;*/
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .navBar{
    top:0;
    height: 50px;
   }
  .navBar ul li{
    text-decoration: none;
    display: inline-block;
    padding: 0 20px;
  }
</style>
