import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/blog',
    name: 'UserBlog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserBlogs.vue'),
    beforeEnter: (to, from, next) => {
      console.log(store.getters['auth/token'])
      if(!store.getters['auth/token']) {
          next(from.fullPath);
      } else {
          next();
      }
    }
  },
  {
    path: '*',
    name: 'NotFound', 
    component: () =>import(/* webpackChunkName: "about" */ '../views/NotFound.vue'),
  },
  // {
  //   path: '/blog/:id',
  //   name: 'BlogsDetail',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/BlogDetail.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
