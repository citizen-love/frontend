import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Confirmation from "../views/receive-help/Confirmation";
import Step2 from "../views/receive-help/Step2";
import Step3 from "../views/receive-help/Step3";
import ReceiveHelp from "../views/receive-help/ReceiveHelp";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },  {
    path: '/receive-help/new',
    name: 'ReceiveHelp',
    component: ReceiveHelp
  },  {
    path: '/receive-help/new/2',
    name: 'ReceiveHelp',
    component: Step2
  },{
    path: '/receive-help/new/3',
    name: 'HelloWorld',
    component: Step3
  },{
    path: '/receive-help/confirm',
    name: 'HelloWorld',
    component: Confirmation
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/helloworld',
    name: 'helloworld',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
