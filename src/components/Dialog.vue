<template>
    <keep-alive>
        <v-dialog v-model="dialog" hide-overlay persistent max-width="500px" transition="dialog-bottom-transition">
            <component :is="currentComponent" @closed="setDialogStatus"/>
        </v-dialog>
    </keep-alive>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        login: ()=>import('./Login'),
        register: ()=>import('./Register'),
        deleteBlog: ()=>import('./DeleteBlogs'),
        editBlog: ()=>import('./EditBlogs'),
        photoBlog: ()=>import('./PhotoBlogs'),
        newBlog: ()=>import('./NewBlogs'),

    },
    computed:{
        ...mapGetters({
            dialogStatus: 'dialog/status',
            currentComponent: 'dialog/component',
        }),
        dialog:{
            get(){
                return this.dialogStatus
            },
            set(value){
                this.setDialogStatus(value)
            }
        }
    }, 
    methods:{
        ...mapActions({
            setDialogStatus: 'dialog/setStatus',
            setComponent: 'dialog/setComponent'
        }), 
    }

}
</script>