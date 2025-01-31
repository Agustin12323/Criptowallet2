import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    userId: localStorage.getItem("userId") || "", // Trae el ID del almacenamiento local
  }),

  actions: {
    login(userId) {
      this.userId = userId;
      localStorage.setItem("userId", userId); // Guardamos el ID en el almacenamiento local
    },
    logout() {
      this.userId = "";
      localStorage.removeItem("userId"); // Eliminamos el ID del almacenamiento local
    },
  },
});
  