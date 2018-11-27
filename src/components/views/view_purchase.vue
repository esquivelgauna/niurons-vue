<template>
  <router-link :to="{ name: 'Purchase', params: { id: Purchase.id }}" class=" level has-text-primary has-background-light">
    <img :src=" $host + Purchase.img  " alt="" class=" img-100 ">
    <h4 class=" level-item"> {{ Purchase.title }} </h4>
    <span class=" level-item"> {{ Purchase.cost }} </span>
    <span class=" level-item"> {{ Purchase.status }} </span>
    <!-- {{ Purchase }} -->
  </router-link>


</template>

<script>
  export default {
    props: ['Purchase'],
    data() {
      return {

      }
    },
  }

</script>

<style>

</style>
