<template>
  <div>
    <v-card class="mb-6">
      <v-card-title>{{ blog.title }}</v-card-title>
      <v-card-subtitle>by {{ blog.author.name }}, {{ new Date(blog.created).toLocaleDateString() }}</v-card-subtitle>
      <v-card-text class="body-1 grey--text text--darken-4">{{ blog.text }}</v-card-text>
      <v-card-actions>
        <v-container>
          <v-row v-if="user.id === blog.author.id" cols="12">
            <div>
              <v-btn text color="yellow darken-3" @click="showEditDialog">Edit</v-btn>
              <v-btn text color="red" @click="deletePost(blog.id)">Delete</v-btn>
            </div>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
    <EditDialog :open="openEdit" :post="blog" @cancel="hideEditDialog" @edited="edited" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditDialog from '@/components/EditDialog.vue'
export default {
  name: 'BlogPost',
  components: {
    EditDialog,
  },
  props: {
    blog: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      openEdit: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  methods: {
    async deletePost(id) {
      await this.$axios.delete(`api/posts/${id}`)
      this.$emit('deleted')
    },
    showEditDialog() {
      this.openEdit = true
    },
    hideEditDialog() {
      this.openEdit = false
    },
    edited() {
      this.hideEditDialog()
      this.$emit('edited')
    },
  },
}
</script>