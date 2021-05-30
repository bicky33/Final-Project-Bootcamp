<template>
     <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      :src="blog.photo? apiDomain+blog.photo :'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png'"
      height="200px"
    ></v-img>

    <v-card-title>
        {{ blog.title }}
    </v-card-title>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        @click="show = !show"
      >
        Read More
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
            {{ blog.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
    props: ["blog"],
    data(){
        return {
            show: false,
            apiDomain : 'http://demo-api-vue.sanbercloud.com',
        }
    }
}
</script>