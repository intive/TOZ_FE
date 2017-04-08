<template id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h3 class="modal-default-button" @click="$emit('close')" >X</h3>
          <div class="modal-body">
              <swiper :options="swiperOption">
                <swiper-slide  v-for="n in 10" :key="n">
                  <div style="background-image:url(http://lorempixel.com/1000/700/)" class="modal-content"></div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'Modal',
    data () {
      return {
        swiperOption: {
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          pagination: '.swiper-pagination',
          paginationType: 'fraction'
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  margin: 8% 0 0 11%;
  display: block;
}
.modal-body {
  width: 1000px;
  height: 200px;
  margin:0;
  padding:0;
}
.modal-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h3 {
  padding: 0.1em;
  color: #42b983;
}
.modal-default-button {
  padding: 0;
  margin:0 0 0 73%;
  color: darkred;
  font: 38px arial, sans-serif;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-content {
  margin: 0;
  padding: 0;
  width: 1000px;
  height: 700px;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
}
.swiper-pagination {
  color:#fff;
  font: 18px arial, sans-serif;
}
/* MEDIA QUERIES */
@media only screen and (min-width: 320px) {
  .modal-wrapper {
      margin: 45% 0 auto;
  }
  .modal-default-button {
      padding: 0;
      margin:0 0 0 90%;
  }
  .modal-body{
      width: 980px;
  }
}

</style>
