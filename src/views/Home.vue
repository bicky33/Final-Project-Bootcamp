<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(blog, index) in blogs"
        :key="index"
        cols="12"
        md="3">
          <Blog :blog="blog" class="ma-2"/>
        </v-col>
    </v-row>
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
          @input="go" 
          :length="pageCount"
      ></v-pagination>
    </div>
  </v-container>
</template>
<script>
import Blog from '../components/Blogs'
export default {
  components:{
    Blog
  },
    data: () => ({
        page: 1,
        pageCount: 0,
        apiDomain : 'http://demo-api-vue.sanbercloud.com',
        blogs:[],
    }),
    
  methods : {
    go(){
      const config = {
          method: 'GET', 
          url: this.apiDomain + '/api/v2/blog',
          params: {
          'page': this.page
          }
      }
      this.axios(config).then(
          response => {
          let { blogs } = response.data
          this.blogs = blogs.data
          this.page = blogs.current_page
          this.pageCount = blogs.last_page
          })
          .catch(error=> console.log(error))
      },
    },
    created(){
      this.go()
    }
 
};
</script>