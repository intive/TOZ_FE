<template>
  <div class="container">
    <div v-if="loading" class="loader"></div>
    <div class="errors" v-if="errors.length">
      <h6 v-for="error of errors">{{ error.message }}</h6>
    </div>
    <div v-else-if="!loading">
    <newComment :petId="petId" @newComment="updateComments"></newComment>
    <comment v-for="item in currentPage" :comment="item" :key="item.id"></comment>
    <paginate v-if="paginatorFlag" class="paginator"
      :page-count="paginationConfig.numberOfPages"
      :container-class="paginationConfig.containerClass"
      :page-class="paginationConfig.pageClass"
      :page-link-class="paginationConfig.pageLinkClass"
      :prev-text="paginationConfig.prevText"
      :next-text="paginationConfig.nextText"
      :prev-class="paginationConfig.prevClass"
      :next-class="paginationConfig.nextClass"
      :click-handler="paginationConfig.clickCallback">
    </paginate>
    </div>
  </div>
</template>
<script>
  import comment from './SingleComment.vue'
  import newComment from './NewComment.vue'
  import Paginate from 'vuejs-paginate'
  export default {
    data () {
      return {
        id: this.petId,
        commentsTable: [],
        errors: [],
        currentPage: [],
        paginatorFlag: false,
        paginationConfig: {
          numberOfPages: 0,
          containerClass: 'pagination justify-content-center',
          pageClass: 'page-item',
          pageLinkClass: 'page-link',
          prevText: '<<',
          nextText: '>>',
          prevClass: 'page-link',
          nextClass: 'page-link',
          clickCallback: this.changePage
        },
        itemsPerPage: 20,
        loading: true
      }
    },
    components: {
      comment,
      newComment,
      Paginate
    },
    props: ['petId'],
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.$http.get(this.apiUrl + 'comments?petUuid=' + this.id + '&isShortened=false&state=ACTIVE')
          .then(response => {
            this.commentsTable = [...response.data]
            this.paginationConfig.numberOfPages = Math.ceil(this.commentsTable.length / this.itemsPerPage)
            this.changePage(1)
            this.checkLength()
            this.loading = false
          })
          .catch(error => {
            this.errors.push(error)
            this.loading = false
          })
      },
      updateComments (newComment) {
        this.commentsTable.unshift(newComment[0])
        this.changePage(1)
      },
      changePage (pageNum) {
        this.currentPage = this.commentsTable.slice((pageNum - 1) * this.itemsPerPage, (pageNum - 1) * this.itemsPerPage + this.itemsPerPage)
      },
      checkLength () {
        this.commentsTable.length > 20 ? this.paginatorFlag = true : this.paginatorFlag = false
      }
    }
  }
</script>
<style lang="sass">
  @import "../assets/styles/loader.css"
  @import "../assets/styles/variables"

  .paginator
    font: $font-stack
    margin-top: 10em
    @media screen and (max-width: 576px)
      float: left
      margin: 5em 0 10em 12em
</style>
