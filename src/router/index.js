import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Confirmation from "../views/receive-help/Confirmation";
import Step2 from "../views/receive-help/Step2";
import Step3 from "../views/receive-help/Step3";
import ReceiveHelp from "../views/receive-help/ReceiveHelp";
import MyRequest from "../views/my-request/MyRequest";
import DetailedHelpRequest from "../views/detailed-help/DetailedHelpRequest";
import SelectLanguage from "@/views/SelectLanguage";
import Register from "../views/helper/Register";
import Confirm from "../views/helper/Confirm";
// import i18n from '../plugins/i18n';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index,
    meta: {
      title: 'index.page_title'
    }
  },
  {
    path: "/my-request/:requesthash",
    name: "MyRequest",
    component: MyRequest,
    meta: {
      title: 'request_help_process.my_request.page_title'
    },
  },
  {
    path: "/help/:helprequestid",
    name: "DetailedHelpRequest",
    component: DetailedHelpRequest,
    meta: {
      title: 'request_help_process.detailed_request.page_title'
    },
  },
  {
    path: "/receive-help/new",
    name: "ReceiveHelp",
    component: ReceiveHelp,
    meta: {
      title: 'request_help_process.step1.page_title'
    },
  },
  {
    path: "/receive-help/new/2",
    name: "ReceiveHelp2",
    component: Step2,
    meta: {
      title: 'request_help_process.step2.page_title'
    }
  },
  {
    path: "/receive-help/new/3",
    name: "ReceiveHelp3",
    component: Step3,
    meta: {
      title: 'request_help_process.step3.page_title'
    }
  },
  {
    path: "/receive-help/confirm",
    name: "ReceiveHelpConfirm",
    component: Confirmation,
    meta: {
      title: 'request_help_process.confirm.page_title'
    }
  },
  {
    path: "/select-language",
    name: "SelectLanguage",
    component: SelectLanguage,
    meta: {
      title: 'select_language.page_title',
    }
  },
  {
    path: "/help/register",
    name: "RegisterForHelp",
    component: Register,
    meta: {
      title: 'register_as_helper.register.page_title'
    }
  },
  {
    path: "/help/register/confirm",
    name: "RegisterForHelpConfirm",
    component: Confirm,
    meta: {
      title:'register_as_helper.register.confirm'
    }
  },
  {
    path: "/about",
    name: "About",
    meta: {
      title: 'about.page_title',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/helloworld",
    name: "helloworld",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
