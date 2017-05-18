<template>
  <div>
    <h4>Komentarze:</h4>
    <hr>
    <newComment :petId="petId" @newComment="updateComments"></newComment>
    <comment v-for="(item,index) in commentsTable" :comment="item" :key="item.id"></comment>
  </div>
</template>
<script>
  import comment from './SingleComment.vue'
  import newComment from './NewComment.vue'
  export default {
    data () {
      return {
        commentsTable: [],
        errors: []
      }
    },
    components: {
      comment,
      newComment
    },
    props: ['petId'],
    methods: {
      fetchData () {
        this.$http.get(this.apiUrl + '/comments?petUuid=' + this.petId + '&isShortened=false&state=ACTIVE')
          .then(response => {
            console.log(response.data)
            this.commentsTable = [...response.data]
            this.loading = false
          })
          .catch(error => {
            this.errors.push(error)
            this.loading = false
          })
      },
      updateComments (newComment) {
        this.commentsTable.unshift(newComment[0])
      }
    },
    created () {
      this.fetchData()
    }
  }
</script>
<style>

</style>
