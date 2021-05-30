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
                        disabled
                    ></v-text-field>
                    <div  class="pb-2">
                        <v-subheader>Previous Image: </v-subheader>
                        <v-img
                            class="mx-auto"
                            :aspect-ratio="4/3"
                            max-height="185"
                            max-width="301"
                            contain
                            :src="params.photo? apiDomain + params.photo: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png'"
                            >
                        </v-img>
                    </div>
                    <v-file-input
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Pick an photo"
                        prepend-icon="mdi-camera"
                        label="New Photo"
                        ref="upload"
                        v-model="upload"
                    ></v-file-input>
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
                            icon="mdi-image"
                            color="primary"
                            overlap>
                            <v-btn
                                color="blue darken-1"
                                text 
                                @click="uploadPhoto"
                                >
                                Upload Photo
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
            upload: null,
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
        uploadPhoto(){
            const file =  new FormData()
            file.append('photo', this.upload)
            const config = {
                method: 'POST', 
                url: this.apiDomain + `/api/v2/blog/${this.params.id}/upload-photo`,
                headers:{
                    'Authorization': 'Bearer ' + this.token
                },
                data: file
            }
            this.axios(config).then(
                () => {
                    this.close()
                    this.setAlert({
                        status: true,
                        color: 'success', 
                        text: 'Upload photo Success'
                    })
                    this.$router.go()
                })
                .catch(()=> {
                    this.close()
                    this.setAlert({
                        status: true,
                        color: 'error', 
                        text: 'Upload post Failed'
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
    }, 

}
</script>