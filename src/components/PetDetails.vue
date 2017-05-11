<template>
  <div id="petDetails" class="container">
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
      <Modal v-if="showModal" @close="showModal = false" class="modal col-sm-12 col-lg-12"></Modal>
      <div class="petInfo">
        <ul class="list-group pet-ul col-sm-12">
          <li class="pet-li row">
            <div class="center-span col-sm-12 col-lg-6">
              <h6>{{petDetails.name}}</h6>
              <span class="li-span-name">{{$t('petDetails.name')}}</span>
            </div>
          </li>
          <li class="pet-li row">
            <div class="center-span col-sm-12 col-lg-6">
              <h6>{{petDetails.type}}</h6>
              <span class="li-span-dog">{{$t('petDetails.type')}}</span>
            </div>
            <div class="col-sm-12 col-lg-6">
              <h6 class="center-span">{{petDetails.sex}}</h6>
              <span class="center-span li-span-sex">{{$t('petDetails.sex')}}</span>
            </div>
          </li>
          <li class="pet-li row">
            <div class="center-span col-sm-12 col-lg-6">
              <h6>{{convertTimeStamp}}</h6>
              <span class="li-span-calendar center-span">{{$t('petDetails.creationDate')}}</span>
            </div>
          </li>
          <li class="pet-li row">
            <div class="description-container">
              <p>{{petDetails.description}}</p>
            </div>
          </li>
        </ul>
      </div>
      <a class="helpLink col-lg-12" :class="{disabled: isDisabled}" @click.prevent="switchFlags">{{$t('common.button.help')}}</a>
      <transfer class="col-sm-12 col-lg-12" v-show="showTransfer"></transfer>
    </div>
    <router-link to="/">{{ $t("common.backHome") }}</router-link>
  </div>
</template>
<script>
  import transfer from './Transfer.vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import moment from 'moment'
  export default {
    data () {
      return {
        showModal: false,
        showTransfer: false,
        isDisabled: false,
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
      swiperSlide,
      transfer
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
      },
      switchFlags () {
        this.isDisabled = true
        this.showTransfer = true
      }
    },
    computed: {
      convertTimeStamp () {
        const date = moment(this.petDetails.created).locale(this.$t('common.code'))
        return date.format(this.$t('common.dateFormat'))
      }
    }
  }
</script>
<style lang="sass">
  @import "../assets/styles/loader.css"
  @import "../assets/styles/variables.sass"
  #petDetails
    margin-top: 8em

  .petInfo
    margin: 2em auto
    width: 96em
    display: block

  .description-container
    margin: 0 auto
    width: 96em
    display: block

  .pet-ul
    width: 100%
    border-top: 0
    padding: 0
    margin: 3.0em 0 3.0em 0
    list-style-type: none

  .pet-li
    width: 100%
    padding: 1.5em 0
    border: 0
    border-bottom: 1px solid lightgray
    font-weight: bold
    display: flex
    flex-direction: row

  .helpLink
    font: $font-stack
    font-weight: bold
    margin: 2em auto
    padding: .8em
    width: 20em
    height: 3em
    display: flex
    justify-content: center
    background-color: $orange
    //color: #ffffff
    border-radius: 0.4em

  .disabled
    background-color: $silver
    &:hover
      background-color: $silver
  .sex-wrapper
    width: 50%
    float: right
    margin-left: 35vw

  .center-span
    flex-direction: column
    display: flex
    text-align: left

  .li-span-dog
    color: $black
    margin-top: .5em

  .li-span-sex
    color: $black
    margin-top: .9em

  .li-span-name
    color: $black
    margin-top: .5em
    float: left

  .li-span-calendar
    color: $black
    margin-top: .5em

  .float-left-span
    float: left
    margin-left: .5em

  .slide-content
    width: 96em
    height: 70em
    margin: 0 auto

  .swiper-slide
    background-position: center
    background-size: cover

  .swiper-pagination
    background-color: #000000
    opacity: 0.7
    font: $font-stack !important
    padding: 1em

  .swiper-pagination-fraction
    bottom: 0 !important
  #swiper-wrapper
    width: 96em
    margin: 0 auto

  /* MEDIA QUERIES */
  @media only screen and (max-width: 450px)
    #swiper-wrapper
      width: 100%
      margin: 0 auto

    .slide-content
      width: 34.5em
      height: 28.7em
      margin: 0 auto

    .petInfo
      margin: 0 auto
      width: 100%
      display: block

    .pet-li
      margin: 0 auto
      width: 100%

    .pet-ul
      margin: 1.0em 0 1.0em 0
      list-style-type: none

    .sex-wrapper
      border-top: 1px black solid
      width: 40vw

</style>
