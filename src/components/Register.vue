<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-btn @click.native="close" icon dark >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>
                Register
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-container>
                <v-form>
                    <v-text-field
                        label="Name"
                        required
                        :rules="nameRules"
                        v-model="name"
                    ></v-text-field>
                    <v-text-field
                        label="E-mail"
                        required
                        :rules="emailRules"
                        v-model="email"
                    >
                    </v-text-field>
                    <v-file-input
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Pick an avatar"
                        prepend-icon="mdi-camera"
                        label="Avatar"
                        ref="upload"
                        v-model="upload"
                    ></v-file-input>
                    <v-text-field
                        label="Password*"
                        required
                        :append-icon="showPassword? 'mdi-eye': 'mdi-eye-off'"
                        :type="showPassword? 'text': 'password'"
                        @click:append="showPassword = !showPassword"
                        :rules="passwordRules"
                        v-model="password"
                        ></v-text-field>
                    <v-text-field
                        label="Password Confirm*"
                        required
                        v-model="passwordConfirm"
                        :append-icon="showPasswordConfirm? 'mdi-eye': 'mdi-eye-off'"
                        :type="showPasswordConfirm? 'text': 'password'"
                        :rules="passwordConfirmRules"
                        @click:append="showPasswordConfirm = !showPasswordConfirm"
                    ></v-text-field>
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
                            icon="mdi-account-plus"
                            color="primary"
                            overlap>
                            <v-btn
                                color="blue darken-1"
                                text 
                                @click="register"
                                :disabled="valid">
                                Register
                            </v-btn>
                        </v-badge>
                    </v-card-actions>
                </v-form>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
    </v-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    name: 'Register',
    data(){
        return {
            name: '',
            nameRules: [
                v=>!!v || 'Name is required'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            password: '', 
            passwordRules: [
                v=>!!v || 'Passwod is required'
            ], 
            passwordConfirm: '',
            passwordConfirmRules: [
                v=>!!v || 'Password confirmation is required',
                v=> v === this.password || 'Password Confirmation is not match'
            ],
            showPassword: false,
            showPasswordConfirm: false,
            upload: null,
        }
    },
    methods: {
        ...mapActions({
            setAlert: 'alert/set'
        }),
        close(){
            this.$emit('closed', false)
        },
        register() {
            const data = new FormData()
            data.append("name", this.name)
            data.append("photo_profile", this.upload)
            data.append("email", this.email)
            data.append("password", this.password)
            const config = {
                url: 'http://demo-api-vue.sanbercloud.com/api/v2/auth/register',
                method: 'POST',
                data: data
            }
            this.axios(config)
                .then(()=>{
                    this.setAlert({
                        status: true,
                        color: 'success', 
                        text: 'Register Success'
                    })
                    this.close()
                })
                    .catch((error)=>{
                        console.log(error);
                        this.setAlert({
                            status: true,
                            color: 'error', 
                            text: 'Register Failed'
                        })
                        this.close()
                    })
        },
    },
    computed:{
        valid(){
            if(this.name && this.email && this.password && this.passwordConfirm === this.password){
                return false
            }else{
                return true
            }
        }
    }
}
</script>