<template>
  <div>
    <niurons-nav-bar></niurons-nav-bar>
    <h1>Bienvenidos a Niurons en Vue.js</h1>
    <div> {{message}} </div>
  </div>
</template>

<script>
  export default {
    name: 'Landing',
    data() {
      return {
        message: 'Hola a todos'
      }
    }
  }

</script>

<style>

</style>
