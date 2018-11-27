<template>
  <router-link :to="{ name: 'Sale', params: { id: Sale.id }}" class=" level has-text-primary has-background-light">
    <img :src=" $host + Sale.img  " alt="" class=" img-100 ">
    <h4 class=" level-item"> {{ Sale.title }} </h4>
    <span class=" level-item"> {{ Sale.cost }} </span>
    <span class=" level-item"> {{ Sale.status }} </span>
    <!-- {{Sale}} -->
  </router-link>


</template>

<script>
  export default {
    props: ['Sale'],
    data() {
      return {

      }
    },
  }

</script>

<style>

</style>
