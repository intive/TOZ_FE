<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <slot name="header"></slot>
        <slot name="slot1"></slot>
        <slot name="slot2"></slot>
        <slot name="slot3"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Booking'
  }
</script>

<style lang="sass" scoped>

.modal-mask
  position: fixed
  z-index: 9999
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  width: 100%
  height: 100%
  display: table

.modal-wrapper
  display: table-cell
  vertical-align: middle

.modal-container
  min-width: 30em
  max-width: 55em
  height: 28em
  margin: 0 auto
  padding: 2em 3em
  background-color: #fff
  border-radius: 2px
  box-shadow: 0 .2em .8em rgba(0, 0, 0, .33)
  transition: all .3s ease
  font-family: Helvetica, Arial, sans-serif

.modal-body
  margin: 2em 0

.modal-enter
  opacity: 0

.modal-leave-active
  opacity: 0

.modal-enter .modal-container,
.modal-leave-active .modal-container
  -webkit-transform: scale(1.1)
  transform: scale(1.1)

</style>
