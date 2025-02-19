import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import CriptoPreciosView from "@/views/CriptoPreciosView.vue";
import HistorialView from "@/views/HistorialViews.vue";



const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('userId')) {
        next('/login'); // Si no está logueado, redirige al login
      } else {
        next(); // Si está logueado, continúa a la vista Home
      }
    },
  },
  {
    path: '/CriptoPrecios',
    name: 'CriptoPrecios',
    component: CriptoPreciosView, // Aquí deberías tener la vista de CriptoPrecios
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('userId')) {
        next('/login'); // Si no está logueado, redirige al login
      } else {
        next(); // Si está logueado, continúa
      }
    },
  },
  {
    path: '/Historial',
    name: 'Historial',
    component: HistorialView,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('userId')){
        next('/login')
      }else{
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// const routes = [
//   { path: "/", name: "Home", component: HomeView },
//   { path: "/login", name: "Login", component: LoginView },
//   { path: "/CriptoPrecios", name: "CriptoPrecios", component: CriptoPreciosView },
//   {path: "/Historial", component: HistorialView}
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
