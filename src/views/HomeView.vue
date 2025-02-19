<template>
  <div class="home-container">
    <h1>Bienvenido a CriptoWallet</h1>
    <p>Gestiona tus criptomonedas de manera fácil y segura.</p>

    <div class="buttons">
      <button @click="CriptoPrecios">Compra/Venta</button>
      <button @click="Historial">Historial</button>
      <button>Caja de Ahorro</button>
    </div>
  </div>
</template>

<script>

import { useRouter } from 'vue-router';

export default {
  name: "HomeView",
  setup(){
    const router = useRouter();
    const CriptoPrecios=()=>{
      router.push('/CriptoPrecios');
    };
    const Historial=()=>{
      router.push('/Historial');
    };
  return{
    CriptoPrecios,
    Historial,
  };
  },
};
</script>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 50px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #2980b9;
}
</style>
