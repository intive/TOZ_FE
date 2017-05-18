<template>
  <div class="container comment">
    <button v-if="isAuthor" @click="editFlag = false">Edytuj</button>
    <span>{{convertTimeStamp}}</span>
    <h6>{{currentUser.name}} {{currentUser.surname}}</h6>
    <textarea cols="40" rows="5" maxlength="500" :disabled="editFlag" v-model="newContents"></textarea>
    <div v-if="!editFlag">
      <button @click="saveEditedComment">Zapisz</button>
      <button>Anuluj</button>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        newContents: this.comment.contents,
        currentUser: {
          name: '',
          surname: ''
        },
        isAuthor: false,
        editFlag: true,
        errors: []
      }
    },
    props: ['comment'],
    computed: {
      convertTimeStamp () {
        const date = moment(this.comment.created).locale(this.$t('common.code'))
        return date.format(this.$t('common.dateFormat'))
      },
      createTimeStamp () {
        return moment().unix() * 1000
      }
    },
    created () {
      this.$http.get(this.apiUrl + 'users/' + this.comment.userUuid)
        .then(response => {
          this.currentUser.name = response.data.name
          this.currentUser.surname = response.data.surname
          this.loading = false
        })
        .catch(error => {
          this.errors.push(error)
          this.loading = false
        })
      this.checkCommentAuthor()
    },
    methods: {
      checkCommentAuthor () {
        const con = (sessionStorage.getItem('userId') === this.comment.userUuid) ? this.isAuthor = true : this.isAuthor = false
        return con
      },
      saveEditedComment () {
        const editedComment = {
          id: this.comment.id,
          contents: this.newContents,
          userUuid: this.comment.userUuid,
          petUuid: this.comment.petUuid,
          state: 'ACTIVE',
          created: this.comment.created,
          lastModified: this.createTimeStamp
        }
        console.log(editedComment)
        this.$http.put(this.apiUrl + 'comments/' + this.comment.id, editedComment)
          .catch(error => console.log(error))
      }
    }
  }

</script>
<style lang="sass" scoped>
  @import "../assets/styles/variables.sass"
  .comment
    width: 50%
    height: 30%
    border: 0.1em solid lightgray
    margin: 1em auto
  textarea
    resize: none
    outline: none
    font: $font-stack
    font-size: 2em
    &:disabled
      background-color: #fff
      border: 0
      font: $font-stack
      font-size: 2em
</style>
