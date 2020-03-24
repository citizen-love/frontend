import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Confirmation from "../views/receive-help/Confirmation";
import Step2 from "../views/receive-help/Step2";
import Step3 from "../views/receive-help/Step3";
import ReceiveHelp from "../views/receive-help/ReceiveHelp";
import SelectLanguage from "@/views/SelectLanguage";
import Register from "../views/helper/Register";
import Confirm from "../views/helper/Confirm";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'CitizenLove - Get help in your neighbourhood',
    },
    component: Index
  }, {
    path: '/receive-help/new',
    name: 'ReceiveHelp',
    meta: {
      title: 'CitizenLove - Receive Help Step 1',
    },
    component: ReceiveHelp
  }, {
    path: '/receive-help/new/2',
    name: 'ReceiveHelp2',
    meta: {
      title: 'CitizenLove - Receive Help Step 2',
    },
    component: Step2
  }, {
    path: '/receive-help/new/3',
    name: 'ReceiveHelp3',
    meta: {
      title: 'CitizenLove - Receive Help Step 3',
    },
    component: Step3
  }, {
    path: '/receive-help/confirm',
    name: 'ReceiveHelpConfirm',
    meta: {
      title: 'CitizenLove - Receive Help Confirmation',
    },
    component: Confirmation
  },
  {
    path: '/select-language',
    name: 'SelectLanguage',
    meta: {
      title: 'CitizenLove - Language selection',
    },
    component: SelectLanguage
  },
  {
    path: '/help/register',
    name: 'RegisterForHelp',
    meta: {
      title: 'CitizenLove - Give a helping hand: register now!',
    },
    component: Register,
  },
  {
    path: '/help/register/confirm',
    name: 'RegisterForHelpConfirm',
    meta: {
      title: 'CitizenLove - Give a helping hand: Confirmation',
    },
    component: Confirm,
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: 'CitizenLove - About',
    },
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
