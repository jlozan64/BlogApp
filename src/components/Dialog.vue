<template>
  <v-row justify="center">
    <v-dialog v-model="openDialog" max-width="680" persistent>
      <v-card>
        <v-card-title class="headline">Add new Post</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="title" :counter="30" :rules="titleRules" label="Title" required></v-text-field>
            <v-textarea v-model="content" rows="3" :rules="contentRules" label="Content" required></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancel">Cancel</v-btn>
          <v-btn color="success" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Dialog',
  data() {
    return {
      valid: true,
      title: '',
      titleRules: [v => !!v || 'Title is required', v => (v && v.length <= 30) || 'Title must be less than 30 characters'],
      content: '',
      contentRules: [v => !!v || 'Content is required'],
    }
  },
  computed: {
    ...mapGetters(['openDialog', 'getUser']),
  },
  methods: {
    async add() {
      await this.$refs.form.validate()
      if (this.valid) {
        await this.$axios.post('api/posts', {
          post: {
            title: this.title,
            text: this.content,
            author: this.getUser.id.toString(),
          },
        })
        await this.$refs.form.reset()
        this.$emit('added')
        this.hideDialog()
      }
    },
    async cancel() {
      await this.$refs.form.reset()
      this.hideDialog()
    },
    ...mapActions(['hideDialog']),
  },
}
</script>