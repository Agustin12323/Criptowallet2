<template>
  <div>
    <div v-if="precios.length">
      <div v-for="cripto in precios" :key="cripto.nombre" class="precio">
        <h2>{{ cripto.nombre }}</h2>
        <p>Precio en {{ cripto.moneda }}: ${{ cripto.precio }}</p>
      </div>
    </div>
    <div v-else>
      <p>Cargando datos...</p>
    </div>

    <div>
      <label for="accion">Selecciona una accion:</label>
      <select v-model="accion">
        <option value="comprar">Comprar</option>
        <option value="vender">Vender</option>
      </select>
    </div>
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

      <label class="label-css">Exchange </label>
      <select class="select-css" v-model="exchange">
        <option disabled value="">Seleccione una opcion</option>
        <option value="satoshitango">SatoshiTango</option>
        <option value="buenbit">BuenBit</option>
        <option value="criptofacil">CriptoFacil</option>
        <option value="letsbit">Let'sBit</option>
      </select>
    </div>

    <div>
      <label for="cantidad">Cantidad</label>
      <input type="number" name="cantidad" id="cantidad" v-model="cantidad" />
    </div>

        <div v-if="totalPreview">
      <p>Precio estimado: ${{ totalPreview }}</p>
    </div>

    <button @click="calcularPrecio">
      {{ accion === "vender" ? "Vender" : "Comprar" }}
    </button>

    <!-- Mensaje de confirmación -->
    <div v-if="mensajeConfirmacion">
      <p>{{ mensajeConfirmacion }}</p>
    </div>

    <router-link to="/Historial">
        <button>Ver Historial</button>
    </router-link>
  </div>
</template>


<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export default {
  name: "CriptoPreciosView",
  components: {},
  data() {
    return {
      precios: [],
      cantidad: 0,
      monedaSeleccionada: "",
      exchange: "",
      accion: "",
      totalPrecio: 0,
      mensajeConfirmacion: "",
    };
  },
  computed: {
    totalPreview() {
      const criptoSeleccionado = this.precios.find(
        (cripto) => cripto.nombre === this.monedaSeleccionada
      );
      return criptoSeleccionado ? criptoSeleccionado.precio * this.cantidad : 0;
    },
  },
  async created() {
    await this.obtenerPrecios();
  },
  methods: {
  calcularPrecio() {
    if (this.accion === "") {
      alert("Selecciona una acción");
      return;
    }
    if (this.monedaSeleccionada === "") {
      alert("Selecciona una moneda");
      return;
    }
    if (this.exchange === "") {
      alert("Selecciona un exchange");
      return;
    } else {
      const criptoSeleccionado = this.precios.find(
        (cripto) => cripto.nombre === this.monedaSeleccionada
      );
      if (criptoSeleccionado) {
        this.totalPrecio = criptoSeleccionado.precio * this.cantidad;
        this.mensajeConfirmacion = `${this.accion === "vender" ? "Venta" : "Compra"} realizada con éxito por $${this.totalPrecio}`;

        // Registrar la operación en el historial aquí
        const authStore = useAuthStore();
        const userId = authStore.userId;

        const nuevaOperacion = {
          id: new Date().getTime(),
          usuario: userId,
          accion: this.accion,
          moneda: this.monedaSeleccionada,
          exchange: this.exchange,
          cantidad: this.cantidad,
          total: this.totalPrecio,
          fecha: new Date().toLocaleString(),
        };

        // Obtener historial del usuario desde localStorage
        let historial = JSON.parse(localStorage.getItem(`historial_${userId}`)) || [];

        // Agregar la nueva operación
        historial.push(nuevaOperacion);

        // Guardar nuevamente en localStorage
        localStorage.setItem(`historial_${userId}`, JSON.stringify(historial));
      }
    }
  },
  async obtenerPrecios() {
    try {
      //const authStore = useAuthStore();
      const userId = localStorage.getItem("userId");

      //const userId = authStore.userId;

      if (!userId) {
        alert("No hay un usuario activo. Inicia sesión nuevamente.");
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
      this.precios = [
        { nombre: "Bitcoin", moneda: "ARS", precio: response.data.bitcoin.ars },
        { nombre: "Ethereum", moneda: "ARS", precio: response.data.ethereum.ars },
        { nombre: "Dogecoin", moneda: "ARS", precio: response.data.dogecoin.ars },
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