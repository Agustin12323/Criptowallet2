<template>
    <div>
      <h2>Historial de Operaciones</h2>
  
      <div v-if="historial.length">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Acción</th>
              <th>Moneda</th>
              <th>Exchange</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="operacion in historial" :key="operacion.id">
              <td>{{ operacion.id }}</td>
              <td>{{ operacion.accion }}</td>
              <td>{{ operacion.moneda }}</td>
              <td>{{ operacion.exchange }}</td>
              <td>{{ operacion.cantidad }}</td>
              <td>${{ operacion.total }}</td>
              <td>{{ operacion.fecha }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No hay operaciones registradas.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        historial: [],
      };
    },
    created() {
      // Obtener el historial del usuario actual desde localStorage
      const userId = localStorage.getItem("userId");
  
      if (userId) {
        this.historial = JSON.parse(localStorage.getItem(`historial_${userId}`)) || [];
      }
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
  </style>
  