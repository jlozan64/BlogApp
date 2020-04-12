<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <BlogPost v-for="blog in blogs" :key="blog.id" :blog="blog" @deleted="getBlogs" @edited="getBlogs" />
      </v-col>
    </v-row>
    <Dialog @added="getBlogs" />
  </v-container>
</template>

<script>
import BlogPost from '@/components/BlogPost.vue'
import Dialog from '@/components/Dialog.vue'
export default {
  name: 'Home',
  components: {
    BlogPost,
    Dialog,
  },
  data() {
    return {
      blogs: [],
    }
  },
  mounted() {
    this.getBlogs()
  },
  methods: {
    async getBlogs() {
      const response = await this.$axios('api/posts/')
      this.blogs = response.data
    },
  },
}
</script>