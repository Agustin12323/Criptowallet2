import axios from "axios";

export default {
  name: "CriptoPreciosView",
  data() {
    return {
      precios: [],
    };
  },
  async created() {
    await this.obtenerPrecios();
  },
  methods: {
    async obtenerPrecios() {
      try {
        const response = await axios.get(
          "https://laboratorio3-f36a.restdb.io/rest/nombre-de-la-coleccion",
          {
            headers: {
              "Content-Type": "application/json",
              "x-apikey": "TU_API_KEY", // Reemplaza esto con tu clave API de restdb.io
            },
          }
        );
        this.precios = response.data;
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    },
  },
};
