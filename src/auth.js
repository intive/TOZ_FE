export default {
  user: {
    authenticated: false,
    errorMessage: '',
    fetching: false
  },
  login (context, creds) {
    this.user.fetching = true
    context.$http.post(context.apiUrl + 'tokens/acquire', creds)
      .then(response => {
        console.log(response)
        sessionStorage.setItem('token', response.data.jwt)
        this.user.authenticated = true
        context.$http.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`
        this.user.fetching = false
        context.$router.go(-1)
      })
       .catch(error => {
         console.log(error)
         this.user.fetching = false
         this.user.errorMessage = error.message
       })
  },
  logout () {
    sessionStorage.removeItem('token')
    this.user.authenticated = false
    this.user.errorMessage = ''
  },
  checkAuth () {
    const jwt = sessionStorage.getItem('token')
    jwt ? this.user.authenticated = true : this.user.authenticated = false
  }
}
