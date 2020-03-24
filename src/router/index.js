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
// import i18n from '../plugins/i18n';

Vue.use(VueRouter)
// console.log(this.$i18n.locale)


const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'index.page_title'
    },
    component: Index
  }, {
    path: '/receive-help/new',
    name: 'ReceiveHelp',
    meta: {
      title: 'request_help_process.step1.page_title'
    },
    component: ReceiveHelp
  }, {
    path: '/receive-help/new/2',
    name: 'ReceiveHelp2',
    meta: {
      title: 'request_help_process.step2.page_title'
    },
    component: Step2
  }, {
    path: '/receive-help/new/3',
    name: 'ReceiveHelp3',
    meta: {
      title: 'request_help_process.step3.page_title'
    },
    component: Step3
  }, {
    path: '/receive-help/confirm',
    name: 'ReceiveHelpConfirm',
    meta: {
      title: 'request_help_process.confirm.page_title'
    },
    component: Confirmation
  },
  {
    path: '/select-language',
    name: 'SelectLanguage',
    meta: {
      title: 'select_language.page_title',
    },
    component: SelectLanguage
  },
  {
    path: '/help/register',
    name: 'RegisterForHelp',
    meta: {
      title: 'register_as_helper.register.page_title'
    },
    component: Register,
  },
  {
    path: '/help/register/confirm',
    name: 'RegisterForHelpConfirm',
    meta: {
      title:'register_as_helper.register.confirm'
    },
    component: Confirm,
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: 'about.page_title',
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
