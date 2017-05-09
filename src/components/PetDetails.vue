<template>
  <div id="petDetails">
    <div class="loader" v-if="loading"></div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <div id="pet-container" v-else-if="!loading">
      <div id="swiper-wrapper">
      <swiper :options="swiperOption">
        <swiper-slide style="background-image:url(http://lorempixel.com/1000/500/)" v-for="n in range" :key="n">
         <div class="slide-content" @click="openModal"></div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      </div>
      <Modal v-if="showModal" @close="showModal = false" class="modal"></Modal>
      <div class="petInfo">
        <ul class="list-group pet-ul">
          <li class="pet-li">
            <div class="float-left-span backgroundImg circle"></div>
              <div class="center-span float-left-span">
                <span>{{petDetails.name}}</span>
                <span class="li-span-name">{{$t('petDetails.name')}}</span>
              </div>
          </li>
          <li class="pet-li">
            <div class="float-left-span backgroundImg dog"></div>
            <div class="name-wrapper float-left-span">
              <span>{{petDetails.type}}</span>
              <span class="center-span li-span-dog">{{$t('petDetails.type')}}</span>
            </div>
            <div class="sex-wrapper">
              <div class="float-left-span backgroundImg sex"></div>
              <span class="center-span">{{petDetails.sex}}</span>
              <span class="center-span li-span-sex">{{$t('petDetails.sex')}}</span>
            </div>
          </li>
          <li class="pet-li">
            <div class="float-left-span backgroundImg calendar"></div>
            <div class="float-left-span center-span">
              <span>{{convertTimeStamp}}</span>
              <span class="li-span-calendar center-span">{{$t('petDetails.creationDate')}}</span>
            </div>
          </li>
        </ul>
      </div>
        <div class="description-container">
          <h2>{{petDetails.description}}</h2>
        </div>
        <router-link to="/" class="help-link">{{$t('common.button.help')}}</router-link>
    </div>
    <router-link to="/">{{ $t("common.backHome") }}</router-link>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import moment from 'moment'

  export default {
    data () {
      return {
        showModal: false,
        id: this.$route.params.id,
        petDetails: {},
        errors: [],
        range: 10,
        swiperOption: {
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          pagination: '.swiper-pagination',
          paginationType: 'fraction'
        },
        loading: true
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    created () {
      this.fetchData()
    },
    methods: {
      openModal () {
        this.showModal = true
      },
      fetchData () {
        this.$http.get(this.apiUrl + '/pets/' + this.id)
          .then(response => {
            this.petDetails = {...response.data}
            this.loading = false
          })
          .catch(error => {
            this.errors.push(error)
            this.loading = false
          })
      }
    },
    computed: {
      convertTimeStamp () {
        const date = moment(this.petDetails.created).locale(this.$t('petDetails.code'))
        return date.format(this.$t('petDetails.dateFormat'))
      }
    }
  }
</script>
<style>
@import "../assets/styles/loader.css";

#petDetails{
  margin-top: 1em;
}
.petInfo{
  margin-left: 20%;
  width: 60%;
  display: block;
}
.description-container{
  margin-left: 20%;
  width: 60%;
  display: block;
  margin-bottom: 2em;
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
  display: flex;
  flex-direction: row;
}
.help-link{
  font:22px arial,sans-serif;
  font-weight: bold;
  margin-left: 20%;
  padding: 0.5em;
  width: 60%;
  height: 2.2em;
  display: flex;
  justify-content: center;
  background-color: lightgray;
  border-radius: 1px;
}
.sex-wrapper{
  width: 50%;
  float:right;
  margin-left: 15vw;
}
.center-span{
  flex-direction: column;
  display: flex;
  text-align: left;
}
.li-span-dog{
  font-size: 14px;
  color: gray;
  margin-top: 1.5em;
}
.li-span-sex{
  font-size: 14px;
  color: gray;
  margin-top: 1.5em;
  margin-right: 2.0em;
}
.li-span-name{
  font-size: 14px;
  color: gray;
  margin-top: 1.5em;
  float: left;
}
.li-span-calendar{
  font-size: 14px;
  color: gray;
  margin-top: 1.5em;
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
.circle{
  background: url("../assets/circle-outline.png") center;
}
.dog{
  background: url("../assets/jack-russell-terrier.png") center;
}
.sex{
  background: url("../assets/gender.png") center;
}
.calendar{
   background: url("../assets/calendar.png") center;
}
.backgroundImg{
  border: 0;
  width: 65px;
  height: 65px;
  background-size: contain;
  background-repeat: no-repeat;
}
/* MEDIA QUERIES */
@media only screen and (max-width: 450px){
  #swiper-wrapper{
    width: 90%;
    margin: 0 auto;
  }
  .slide-content{
    width: 700px;
    height: 250px;
    margin: 0 auto;
  }
  .petInfo{
    margin: 0 auto;
    width: 90%;
    display: block;
  }
  .pet-li{
    width: 100%;
    padding: 10px;
    border: 0;
    border-bottom: 1px solid lightgray;
    font:14px arial,sans-serif;
    font-weight: bold;
  }
  .pet-ul{
    margin: 1.0em 0 1.0em 0 ;
    list-style-type: none;
  }
  .float-right-span{
    margin-left:30% ;
  }
  .sex-wrapper{
    width: 40vw;
  }
}

</style>
