<template>
  <div id="app">
    <nav>
      <!-- Botón Login solo visible si no está logueado -->
      <router-link v-if="!authStore.userId" to="/login">Login</router-link>

      <!-- Botones visibles solo si el usuario está logueado -->
      <router-link v-if="authStore.userId" to="/">Inicio</router-link>
      <router-link v-if="authStore.userId" to="/CriptoPrecios">Precios</router-link>

      <!-- Botón Cerrar sesión solo visible si el usuario está logueado -->
      <button v-if="authStore.userId" @click="cerrarSesion">Cerrar sesión</button>
    </nav>

    <router-view />
  </div>
</template>

<script>
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const cerrarSesion = () => {
      authStore.logout();
      router.push("/login"); // Redirigir al login
    };

    return {
      authStore,
      cerrarSesion,
    };
  },
};
</script>

<style>
nav {
  display: flex;
  gap: 15px;
}
button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
}
</style>
