<template>
    <v-card
    elevation="2">
        <v-toolbar dark color="primary">
            <v-btn @click.native="close" icon dark >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>
                Edit Post
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
                        :disabled="params.uploadItem"
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
                            v-show="params.editItem">
                            <v-btn
                                color="blue darken-1"
                                text 
                                @click="update"
                                >
                                Update
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
        update(){
            const config = {
                method: 'POST', 
                url: this.apiDomain + `/api/v2/blog/${this.params.id}`,
                params: {
                '_method': 'PUT'
                },
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
        title:{
            get(){
                return this.params.title ? this.params.title : ''
            }, 
            set(value){
                this.params.title  = value
            }
        }, 
        description:{
            get(){
                return this.params.description ? this.params.description : ''
            }, 
            set(value){
                this.params.description = value
            }
        }
    }, 

}
</script>