<template>
    <!-- App.vue -->

  <v-app>
    <Alert/>
    <Dialog/>
    <v-navigation-drawer app v-model="drawer">  
      <!-- sidebar -->
      <v-list
        nav 
        dense>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in menus"
            :key="i"
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <!-- -->
      <v-app-bar-nav-icon @click="drawer = !drawer" v-show="!guest"></v-app-bar-nav-icon>
      <v-toolbar-title >BlogU</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="guest">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              text
              depressed
            >
              Login
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                >
                </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                  v-model="password"
                  label="Password"
                  :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'"
                  :type="showPassword? 'text': 'password'"
                  @click:append="showPassword = !showPassword"
                  required
                >
                </v-text-field>
              </v-list-item>
            </v-list>
            
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="login"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
            <v-btn light @click="register">
              Register
            </v-btn>
      </div>
      <div v-if="!guest">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              x-large
              v-on="on"
            >
              <v-avatar size="48">
                <img :src="user.photo_profile? apiDomain+user.photo_profile : 'https://i.pravatar.cc/300'">
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center pa-2">
              <div class="mx-auto text-center">
                <v-avatar class="mb-2">
                    <img :src="user.photo_profile? apiDomain+user.photo_profile : 'https://i.pravatar.cc/300'">
                </v-avatar>
                <h4>{{ user.name }}</h4>
                <p class="caption mt-1">{{ user.email }}</p>
                <v-divider class="my-3"></v-divider>
                <v-badge
                  bordered
                  color="error"
                  icon="mdi-lock"
                  overlap
                >
                  <v-btn
                    class="white--text"
                    color="error"
                    depressed
                    text
                    @click="logout"
                  >
                    Logout
                  </v-btn>
                </v-badge>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>

    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer
      v-bind="localAttrs"
      padless
    >
      <v-card
        flat
        tile
        width="100%"
        class="primary text-center"
        dark
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer> 
  </v-app>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Alert from './components/Alert'
import Dialog from './components/Dialog'
export default {
  components:{
    Alert,
    Dialog
  },
  data:() => ({
    drawer: false,
    menu  : false,
    icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    padless: false,
    email: '',
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    showPassword: false,
    password: '',
    apiDomain: 'https://demo-api-vue.sanbercloud.com', 
    menus: [
      {name: 'Home', icon:'mdi-home', path:'/'},
      {name: 'Blogs', icon:'mdi-blogger', path:'/user/blog'},
    ],
    selectedItem: 1,
  }), 
  methods:{
    ...mapActions({
      setToken: 'auth/setToken', 
      setAlert: 'alert/set',
      setCheckToken: 'auth/checkToken',
      setComponent: 'dialog/setComponent'
    }),
    ...mapMutations({
      setUser: 'auth/setUser'
    }), 

    login(){
      const config = {
        url: this.apiDomain + '/api/v2/auth/login',
        method: 'POST',
        data: {
          email: this.email, 
          password: this.password,
        }
      }
      this.axios(config)
        .then((response)=>{
            this.setToken(response.data.access_token)
            this.setAlert({
                status: true,
                color: 'success', 
                text: 'Login Success'
            })
            this.$router.push({name:'UserBlog'})
        }).catch(()=>{
            this.setAlert({
                status: true,
                color: 'error', 
                text: 'Failed Login'
            })
        })
    },
    logout(){
      const config = {
        method: 'POST', 
        url: this.apiDomain+'/api/v2/auth/logout',
        headers:{
            'Authorization': 'Bearer ' + this.token
        }
      }
      this.axios(config)
        .then(()=>{
          this.setToken('')
          this.setUser({})
          this.drawer = false
          this.setAlert({
            status: true, 
            color: 'success',
            text: 'Anda berhasil Logout',
          })
        }).catch((error)=>{
          console.log(error);
          this.setAlert({
            status: true, 
            color: 'success',
            text: 'Cie gagal logout',
          })
        })
    },
    register(){
      this.setComponent({ component: 'register' })
    }
  },
  computed:{
    ...mapGetters({
      guest : 'auth/guest',
      user  : 'auth/user',
      token : 'auth/token'
    }),
    localAttrs () {
        const attrs = {}

        if (this.variant === 'default') {
          attrs.absolute = false
          attrs.fixed = false
        } else {
          attrs[this.variant] = true
        }
        return attrs
      },
  },
  mounted(){
    if(this.token){
      this.setCheckToken(this.token)
    }
  }
}
</script>