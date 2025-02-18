<template>
  <div>
    <CriptoPrecios />

    <!-- Mostrar los precios si existen -->
    <div v-if="precios.length">
      <div v-for="cripto in precios" :key="cripto.nombre" class="precio">
        <h2>{{ cripto.nombre }}</h2>
        <p>Precio en {{ cripto.moneda }}: ${{ cripto.precio }}</p>
      </div>
    </div>
    <div v-else>
      <p>Cargando datos...</p>
    </div>

    <!-- Selección de moneda -->
    <div>
      <label for="moneda">Selecciona una moneda:</label>
      <select v-model="monedaSeleccionada" id="moneda">
        <option
          v-for="cripto in precios"
          :key="cripto.nombre"
          :value="cripto.nombre"
        >
          {{ cripto.nombre }}
        </option>
      </select>
    </div>

	<label class="label-css">Exchange </label>
		<select @change="calcularPrecio" class="select-css" v-model="exchange">
		  <option disabled value="">Seleccione una opcion</option>
		  <option value="satoshitango">SatoshiTango</option>
		  <option value="buenbit">BuenBit</option>
		  <option value="criptofacil">CriptoFacil</option>
		  <option value="letsbit">Let'sBit</option>
	</select>
    <div>
      <label for="cantidad">Cantidad</label>
      <input type="number" name="cantidad" id="cantidad" v-model="cantidad" />
      <button @click="calcularPrecio">Calcular precio</button>
      <p>Precio total: ${{ calcularPrecio() }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore"; // Importamos el store de autenticación
import CriptoPrecios from "@/components/CriptoPrecios.vue";

export default {
  name: "CriptoPreciosView",
  components: {
    CriptoPrecios,
  },
  data() {
    return {
      precios: [],
      cantidad: 0,
      monedaSeleccionada: "", // Establecer un valor por defecto
    };
  },
  async created() {
    await this.obtenerPrecios();
  },
  methods: {
    calcularPrecio() {
      const criptoSeleccionado = this.precios.find(
        (cripto) => cripto.nombre === this.monedaSeleccionada
      );
      if (criptoSeleccionado) {
        return criptoSeleccionado.precio * this.cantidad;
      }
      return 0;
    },
    async obtenerPrecios() {
      try {
        const authStore = useAuthStore();
        const userId = authStore.userId; // Obtener el ID del usuario

        if (!userId) {
          console.error("No hay un ID de usuario disponible.");
          return;
        }

        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "bitcoin,ethereum,dogecoin",
              vs_currencies: "ars",
            },
          }
        );

        // Formateamos los datos de la API para que coincidan con la estructura deseada
        this.precios = [
          {
            nombre: "Bitcoin",
            moneda: "ARS",
            precio: response.data.bitcoin.ars,
          },
          {
            nombre: "Ethereum",
            moneda: "ARS",
            precio: response.data.ethereum.ars,
          },
          {
            nombre: "Dogecoin",
            moneda: "ARS",
            precio: response.data.dogecoin.ars,
          },
        ];
      } catch (error) {
        console.error("Error al obtener precios:", error);
      }
    },
  },
};
</script>

<style scoped>
.precios .precio {
  border: 1px solid black;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
}
</style>
