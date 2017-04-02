<!-- template for the modal component -->
<template>
  <transition name="booking">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <slot name="header"></slot>
          <slot name="date"></slot>
          <slot name="body"></slot>
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Booking'
  }
</script>
 
<style scoped>
  .modal-mask {
    position: absolute;
    z-index: 9999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    display: table;
    transition: opacity .3s ease;
  }
 .modal-wrapper {
   display: table-cell;
   vertical-align: middle;
 }
  .modal-container {
    min-width: 300px;
    max-width: 550px;
    min-height: 200px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .modal-body {
    margin: 20px 0;
  }
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
