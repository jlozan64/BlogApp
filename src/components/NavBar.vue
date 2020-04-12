<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title class="font-weight-light">
      <span>My</span>
      <span class="font-weight-regular">Blog</span>
    </v-toolbar-title>

<v-spacer />
    <v-btn v-if="!user" to="/login" text>
      <span class="mr-2">Login</span>
    </v-btn>
    </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
 
export default {
  name: 'NavBar',
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  methods: {
    logOut() {
      this.$firebase.auth().signOut()
      this.setUser('')
      this.setIdToken('')
      this.$router.push('/')
    },
    ...mapActions(['setUser', 'setIdToken', 'showDialog']),
  }
}
</script>