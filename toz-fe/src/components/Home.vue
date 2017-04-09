<template>
  <div>
    <News></News>
    <div class="carousel">
      <h1>Galeria</h1>
      <PetsCarousel></PetsCarousel>
    </div>
  </div>
</template>

<script>
import PetsCarousel from '@/components/PetsCarousel'
import News from '@/components/News'

export default {
  name: 'Home',
  data () {
    return {}
  },
  components: {
    PetsCarousel,
    News
  }
}
</script>

<style scoped>
</style>
