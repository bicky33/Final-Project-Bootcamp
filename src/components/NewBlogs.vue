<template>
    <v-card
    elevation="2">
        <v-toolbar dark color="primary">
            <v-btn @click.native="close" icon dark >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>
                New Post
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-container>
                <v-form>
                    <v-text-field
                        label="Title"
                        required
                        :rules="titleRules"
                        v-model="title"
                    ></v-text-field>
                    <v-textarea
                        v-model="description"
                        label="description"
                        :rules="descriptionRules"
                    >
                    </v-textarea>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red darken-1"
                            text
                            @click="close"
                        >
                            Close
                        </v-btn>
                        <v-badge
                            icon="mdi-file-edit"
                            color="primary"
                            overlap
                            >
                            <v-btn
                                color="blue darken-1"
                                text 
                                @click="newPost"
                                >
                                Post
                            </v-btn>
                        </v-badge>
                    </v-card-actions>
                </v-form>
            </v-container>
        </v-card-text>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name:'EditBlogs',
    data(){
        return {
            title: '',
            description: '',
            apiDomain: 'https://demo-api-vue.sanbercloud.com', 
            titleRules: [
                v => !!v || 'Title is required',
            ],
            descriptionRules: [
                v => !!v || 'Description is required',
            ],
        }
    }, 
    methods: {
        ...mapActions({
            setAlert: 'alert/set'
        }),
        newPost(){
            const config = {
                method: 'POST', 
                url: this.apiDomain + `/api/v2/blog`,
                headers:{
                    'Authorization': 'Bearer ' + this.token
                },
                data: {
                    title: this.title,
                    description: this.description
                }
            }
            this.axios(config).then(
                () => {
                    this.close()
                    this.setAlert({
                        status: true,
                        color: 'success', 
                        text: 'Update post Success'
                    })
                    this.$router.go()
                })
                .catch(()=> {
                    this.close()
                    this.setAlert({
                        status: true,
                        color: 'error', 
                        text: 'Update post Failed'
                    })
                })
        },
        close(){
            this.$emit('closed', false)
        },
    }, 
    computed:{
        ...mapGetters({
            params: 'dialog/params', 
            token : 'auth/token'
        }),
    }, 

}
</script>