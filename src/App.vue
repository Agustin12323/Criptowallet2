<template>
  <div id="app">
    <nav>
     <button v-if="$route.name!=='Login'" @click="cerrarSesion">Cerrar sesión</button>
     <button v-if="$route.name!=='Home' && $route.name!=='Login'" @click="volverHome">Inicio</button> 
 
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      UserLogged: !!localStorage.getItem('userId'), 
    };
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem('userId'); 
      this.UserLogged = false; 
      this.$router.push("/login"); 
    },
    volverHome(){
      this.$router.push("/")
    }
  },
  created() {
    this.UserLogged = !!localStorage.getItem('userId');
  },
  watch: {
    UserLogged(newVal) {
      if (newVal) {
        localStorage.setItem('userId', ''); 
      } else {
        localStorage.removeItem('userId'); 
      }
    },
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
