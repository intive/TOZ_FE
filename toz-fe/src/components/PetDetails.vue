<template>
  <div id="petDetails">
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div id="swiper-wrapper">
    <swiper :options="swiperOption">
      <swiper-slide style="background-image:url(http://lorempixel.com/500/250/)" v-for="n in 10" :key="n">
       <div class="slide-content" @click="openModal"></div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    </div>
    <Modal v-if="showModal" @close="showModal = false"></Modal>
    <div class="petInfo">
      <ul class="list-group pet-ul">
        <li class="pet-li"><img class="float-left-span" src="../assets/circle-outline.png">
          <span class="float-left-span li-span-name center-span">{{$route.params.name}}</span>
        </li>
        <li class=" pet-li">
          <img class="float-left-span" src="../assets/jack-russell-terrier.png">
          <span class="float-left-span center-span li-span-dog">{{$route.params.type}}</span>
          <div class="sex-wrapper">
           <img class="float-left-span" src="../assets/gender.png">
           <span class=" li-span-sex center-span">{{$route.params.sex}}</span>
          </div>
        </li>
        <li class=" pet-li"><img class="float-left-span" src="../assets/calendar.png">
          <span class="li-span-calendar float-left-span center-span">{{$route.params.created}}</span>
        </li>
      </ul>
    </div>
    <h2>{{$route.params.description}}</h2>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data () {
      return {
        errors: [],
        swiperOption: {
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          pagination: '.swiper-pagination',
          paginationType: 'fraction'
        },
        showModal: false
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    methods: {
      openModal () {
        this.showModal = true
      }
    }
  }
</script>
<style>
  #petDetails{
    margin-top: 10%;
  }
  .petInfo{
    margin-left: 20%;
    width: 60%;
    display: block;
  }
  .pet-ul{
    width: 100%;
    border-top: 0;
    padding: 0;
    margin: 3.0em 0 3.0em 0 ;
    list-style-type: none;
  }
  .pet-li{
    width: 100%;
    padding: 10px;
    border: 0;
    border-bottom: 1px solid lightgray;
    font:22px arial,sans-serif;
    font-weight: bold;
  }
  .sex-wrapper{
    width: 50%;
    float:right;
  }
  .center-span{
    flex-direction: column;
    display: flex;
    text-align: left;
  }
  .li-span-dog:after{
    content: 'Typ';
    font-size: 14px;
    color: gray;
    margin-top: 1.0em;
  }
  .li-span-sex:after{
    content: 'Pleć';
    font-size: 14px;
    color: gray;
    margin-top: 1.0em;
    margin-right: 2.0em;
  }
  .li-span-name:after{
    content: 'Imie';
    font-size: 14px;
    color: gray;
    margin-top: 1.0em;
  }
  .li-span-calendar:after{
    content: 'Data dodania';
    font-size: 14px;
    color: gray;
    margin-top: 1.0em;
  }
  .float-left-span{
    float:left;
    margin-left: 5px;
  }
  .slide-content{
    width: 700px;
    height: 350px;
    margin: 0 auto;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
  }
  .swiper-pagination{
    color:#fff;
    font: 18px arial, sans-serif;
  }
  #swiper-wrapper{
    width: 60%;
    margin: 0 0 0 20%;
  }

</style>
