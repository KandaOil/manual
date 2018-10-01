import Vue from "vue";
import Router from "vue-router";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import NewManual from "@/components/NewManual";
import ViewManual from "@/components/ViewManual";
import EditManual from "@/components/EditManual";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingPage
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/new",
      name: "new-manual",
      component: NewManual
    },
    {
      path: "/edit/:project_id",
      name: "edit-manual",
      component: EditManual
    },
    {
      path: "/:project_id",
      name: "view-manual",
      component: ViewManual
    }
  ]
});
