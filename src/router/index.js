import Vue from "vue";
import VueRouter from "vue-router";
import group from "../components/Pages/group.vue";
import bloodType from "../components/Pages/blood.vue";
import donor from "../components/Pages/donor.vue";
import test from "../components/Pages/test.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Group",
    component: group
  },
  {
    path: "/blood-type",
    name: "Blood",
    component: bloodType
  },
  {
    path: "/donor",
    name: "Donor",
    component: donor
  },
  {
    path: "/test",
    name: "Test",
    component: test
  }
];

const router = new VueRouter({
  routes
});

export default router;
