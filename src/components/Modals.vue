<template>
  <div class="modal-mask">
    <div class="modal-wrapper"
      v-bind:class="{ modalWrapperBorder: isOk }">
      <div class="modal-container">
        <slot name="header"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modals',
    props: [ 'isError' ],
    data () {
      return {
        isOk: this.isError
      }
    }
  }
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    display: block;
  }
  .modal-wrapper {
    display: block;
    margin: 5% 8% 70% 70%;
    border-bottom: 0.4em solid #4CD374;
  }
  .modal-container {
    min-width: 300px;
    max-width: 550px;
    height: 90px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .modalWrapperBorder {
    border-bottom: 0.4em solid #f54b5e;
  }
</style>
