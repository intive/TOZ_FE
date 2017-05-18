<template>
  <div class="container comment">
    <div v-if="loading" class="loader"></div>
    <div class="errors" v-if="errors.length">
      <h2 v-for="error of errors">{{ error.message }}</h2>
    </div>
    <button v-if="isAuthor" @click="editFlag = false">Edytuj</button>
    <span>{{convertTimeStamp}}</span>
    <h6>{{currentUser.name}} {{currentUser.surname}}</h6>
    <textarea cols="40" rows="5" maxlength="500" spellcheck="false" :disabled="editFlag" v-model="newContents"></textarea><br>
    <span v-show="errorFlag" class="error">Pole komentarza nie może być puste</span>
    <div v-if="!editFlag">
      <button @click="saveEditedComment">Zapisz</button>
      <button @click="cancelEdit">Anuluj</button>
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
        errorFlag: false,
        loading: true,
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
      cancelEdit () {
        this.editFlag = !this.editFlag
        this.newContents = this.comment.contents
      },
      saveEditedComment () {
        if (this.checkIfEmpty()) {
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
            .then(() => {
              this.editFlag = true
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
      checkIfEmpty () {
        if (this.newContents === '') {
          this.errorFlag = true
          return false
        } else {
          this.errorFlag = false
          return true
        }
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
    text-align: center
    &:disabled
      background-color: #fff
      border: 0
      font: $font-stack
      font-size: 2em
  .error
    color: red
    font: $font-stack
</style>
