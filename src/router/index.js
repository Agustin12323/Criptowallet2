import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import CriptoPreciosView from "@/views/CriptoPreciosView.vue";
import HistorialView from "@/views/HistorialViews.vue";


const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/CriptoPrecios", name: "CriptoPrecios", component: CriptoPreciosView },
  {path: "/Historial", component: HistorialView}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
