<template>
  <v-row justify="center">
    <v-dialog v-model="open" max-width="680" persistent>
      <v-card>
        <v-card-title class="headline">Edit Post</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="title" :counter="30" :rules="titleRules" label="Title" required />
            <v-textarea v-model="content" rows="3" :rules="contentRules" label="Content" required></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancel">Cancel</v-btn>
          <v-btn color="success" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EditDialog',
  props: {
    post: {
      type: Object,
      default: () => {},
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
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
    ...mapGetters(['openEditDialog', 'getUser']),
  },
  mounted() {
    this.reset()
  },
  methods: {
    async save() {
      await this.$refs.form.validate()
      if (this.valid) {
        await this.$axios.put(`api/posts/${this.post.id}`, {
          post: {
            title: this.title,
            text: this.content,
            author: this.getUser.id.toString(),
          },
        })
        this.$emit('edited')
      }
    },
    async cancel() {
      await this.reset()
      this.$emit('cancel')
    },
    reset() {
      this.title = this.post.title
      this.content = this.post.text
    },
  },
}
</script>