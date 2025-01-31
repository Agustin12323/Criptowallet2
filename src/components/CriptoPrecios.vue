<template>
    <div>
      <h1>Precios de Criptomonedas</h1>
      <div v-if="cargando">Cargando precios...</div>
      <div v-else>
        <div v-for="cripto in precios" :key="cripto.nombre" class="precio">
          <h2>{{ cripto.nombre }}</h2>
          <p>Precio en {{ cripto.moneda }}: ${{ cripto.precio }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { obtenerPrecio } from "@/services/criptoYaService";
  
  export default {
    name: "CriptoPrecios",
    data() {
      return {
        precios: [], // Lista para guardar los precios
        cargando: true, // Estado de carga
      };
    },
    async created() {
      // Cargar precios al crear el componente
      try {
        const monedas = ["btc", "eth", "usdc"]; // Las criptomonedas a manejar
        const exchange = "satoshitango"; // Puedes cambiarlo por otro
  
        const resultados = await Promise.all(
          monedas.map(async (cripto) => {
            const precioData = await obtenerPrecio(exchange, cripto, "ars");
            return {
              nombre: cripto.toUpperCase(),
              moneda: "ARS",
              precio: precioData.totalAsk, // Precio de compra (ask) según la API
            };
          })
        );
  
        this.precios = resultados;
      } catch (error) {
        console.error("Error al cargar los precios:", error);
      } finally {
        this.cargando = false;
      }
    },
  };
  </script>
  
  <style scoped>
  .precio {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  </style>
  