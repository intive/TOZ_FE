<template>
  <div>
    <div v-if="loading" class="sk-fading-circle">
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    </div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <carousel v-else
      :navigationEnabled="true"
      :paginationEnabled="false"
      :navigationClickTargetSize="0"
      :perPageCustom="responsiveBreakpoints"
      class="carousel">
      <slide v-for="pet in petsList" :key="pet.id" >
        <router-link :to="{name: 'petDetails', params: { id: pet.id }}">
          <div class="sliderContent">
            <img src="http://lorempixel.com/200/200/" alt="pet photo">
            <h2>{{ $t("petDetails.name") }}: {{ pet.name }}</h2>
            <h2>{{ $t("petDetails.type") }}: {{ pet.type }}</h2>
            <h2>{{ $t("petDetails.sex") }}: {{ pet.sex }}</h2>
          </div>
        </router-link>
      </slide>
    </carousel>
    <router-link to="/pets">{{ $t("petsCarousel.fullGallery") }}</router-link>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  data () {
    return {
      petsList: [],
      errors: [],
      responsiveBreakpoints: [[768, 3], [1024, 5]],
      loading: true
    }
  },
  created () {
    // this.$http.get('http://dev.patronage2017.intive-projects.com/pets')
    this.$http.get('/pets')
    .then(response => {
      this.petsList = response.data
      this.loading = false
    })
    .catch(error => {
      this.errors.push(error)
      this.loading = false
    })
  },
  components: {
    Carousel,
    Slide
  }
}
</script>
<style>
@import "../assets/styles/loader.css";

.VueCarousel {
  width: 90%;
  margin: 0 auto;
}
</style>
