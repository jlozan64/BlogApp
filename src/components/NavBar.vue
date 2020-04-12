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
    <div v-else>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <span class="mr-2">{{ user.name }}</span>
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn block text @click="showDialog()">Add Post</v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn block text @click="logOut">Logout</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
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
  },
}
</script>