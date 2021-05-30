<template>
    <v-card 
        class="text-center pa-2"
        elevation="2">
        <v-icon size="100" color="red" >mdi-alert-circle</v-icon>
        <v-card-title class="justify-center">Are you sure you delete this Post?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-badge
                    icon="mdi-delete-alert"
                    color="error"
                    overlap>
                    <v-btn
                        color="red darken-1"
                        text 
                        @click="deleteConfirm">
                        Delete
                    </v-btn>
                </v-badge>
                <v-spacer></v-spacer>
            </v-card-actions>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'DeleteBlogs',
    data(){
        return {
            apiDomain: 'https://demo-api-vue.sanbercloud.com', 
        }
    },
    methods:{
        ...mapActions({
            setAlert: 'alert/set',

        }),
        close(){
            this.$emit('closed', false)
        },
        deleteConfirm(){
            const config = {
                method: 'POST', 
                url: this.apiDomain + `/api/v2/blog/${this.params.id}`,
                params: {
                '_method': 'DELETE'
                },
                headers:{
                    'Authorization': 'Bearer ' + this.token
                }
            }
            this.axios(config).then(
                () => {
                    this.close()
                    this.setAlert({
                        status: true,
                        color: 'success', 
                        text: 'Delete post Success'
                    })
                    this.$router.go()
                })
                .catch(()=> {
                    this.setAlert({
                        status: true,
                        color: 'error', 
                        text: 'Delete post Failed'
                    })
                })
        }
    }, 
    computed: {
        ...mapGetters({
            params: 'dialog/params', 
            token : 'auth/token' 
        })
    }
}
</script>