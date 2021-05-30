<template>
    <div>
        <v-toolbar
        flat
      >
        <v-toolbar-title>Blog List</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
            <v-btn
                color="primary"
                dark
                class="mb-2"
                @click="newPost"
                >
                <v-icon 
                    dark
                    left>
                    mdi-note-plus</v-icon>
                New Item
            </v-btn>    
      </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="blogs"
            :items-per-page="4"
            disable-pagination
            hide-default-footer
            class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    class="mr-2"
                    @click="uploadItem(item)"
                >
                    mdi-image
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        <div class="text-center pt-2">
            <v-pagination
                v-model="page"
                 @input="go" 
                 :length="pageCount"
            ></v-pagination>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'UserBlogs', 
    data:()=>({
        page: 1,
        pageCount: 0,
        apiDomain: 'https://demo-api-vue.sanbercloud.com', 
        headers: [
          {
            text: 'Title',
            align: 'start',
            value: 'title',
          },
         { text: 'Actions', value: 'actions', sortable: false },
        ],
        blogs: [],
    }), 
    methods:{
        ...mapActions({
            setComponent: 'dialog/setComponent',
        }),
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
        newPost(){
            this.setComponent({component: 'newBlog',})
        },
        uploadItem(item){
            this.setComponent({component: 'photoBlog', params: item })
        },
        editItem(item){
            this.setComponent({component: 'editBlog', params: item })
        },
        deleteItem(item){
            this.setComponent({component: 'deleteBlog', params: item })
        }
    }, 
    created(){
        this.go()
    }
    
}
</script>