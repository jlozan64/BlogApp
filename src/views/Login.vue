<template>
  <div id="firebaseui-auth-container" class="mt-8"></div>
</template>

<script>
export default {
  name: 'Login',
  mounted() {
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: async () => {
          const idToken = await this.$firebase.auth().currentUser.getIdToken()
          this.$store.dispatch('setIdToken', idToken)
          this.$axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`
          const { data } = await this.$axios('login')
          this.$store.dispatch('setUser', data)
          this.$router.push('/')
          return false
        },
      },
      signInOptions: [this.$firebase.auth.GoogleAuthProvider.PROVIDER_ID, this.$firebase.auth.EmailAuthProvider.PROVIDER_ID],
    }
    this.$firebaseui.start('#firebaseui-auth-container', uiConfig)
  },
}
</script>