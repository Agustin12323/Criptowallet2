<template>
  <div class="login-container">
    <h2>Iniciar sesión</h2>
    <input v-model="userId" type="text" placeholder="Ingrese su ID" />
    <button @click="iniciarSesion">Entrar</button>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const userId = ref("");

    const iniciarSesion = () => {
      if (userId.value.trim()) {
        authStore.login(userId.value);
        router.push("/CriptoPrecios");
      } else {
        alert("Por favor, ingrese un ID válido.");
      }
    };

    return {
      userId,
      iniciarSesion,
    };
  },
};
</script>
