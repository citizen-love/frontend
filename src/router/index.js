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
import Authentication from "@/views/authentication/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index
  },
  {
    path: "/my-request/:requesthash",
    name: "MyRequest",
    component: MyRequest
  },
  {
    path: "/help/:helprequestid",
    name: "DetailedHelpRequest",
    component: DetailedHelpRequest
  },
  {
    path: "/receive-help/new",
    name: "ReceiveHelp",
    component: ReceiveHelp
  },
  {
    path: "/receive-help/new/2",
    name: "ReceiveHelp2",
    component: Step2
  },
  {
    path: "/receive-help/new/3",
    name: "ReceiveHelp3",
    component: Step3
  },
  {
    path: "/receive-help/confirm",
    name: "ReceiveHelpConfirm",
    component: Confirmation
  },
  {
    path: "/select-language",
    name: "SelectLanguage",
    component: SelectLanguage
  },
  {
    path: "/helpforce/register",
    name: "RegisterForHelp",
    component: Register
  },
  {
    path: "/helpforce/register/confirm",
    name: "RegisterForHelpConfirm",
    component: Confirm
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/imprint",
    name: "Imprint",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Imprint.vue")
  },
  {
    path: "/privacy",
    name: "PrivacyPolicy",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PrivacyPolicy")
  },
  {
    path: "/helloworld",
    name: "helloworld",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue")
  },
  {
    path: "/authentication",
    name: "authentication",
    component: Authentication
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
