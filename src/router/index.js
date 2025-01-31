import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import CriptoPreciosView from "@/views/CriptoPreciosView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/CriptoPrecios", name: "CriptoPrecios", component: CriptoPreciosView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
