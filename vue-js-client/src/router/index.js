import Vue from 'vue'
import VueRouter from 'vue-router'
import Tutorials from '../views/Tutorials.vue'
import AddTutorial from '../views/AddTutorial.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/tutorials',
    name: 'tutorials',
    component: Tutorials
  },
  {
    path: '/add',
    name: 'add',
    component: AddTutorial
  },
  {
    path: '/edit-tutorial/:id',
    name: 'edit-tutorial',
    component: () => import("../views/EditTutorial")
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router