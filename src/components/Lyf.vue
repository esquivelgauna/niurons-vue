<template>
  <div class=" container   has-text-primary "> 
      <h3 class=" is-size-5 "> Lyf </h3>
      <img :src=" $host + '/imgLyf/default.png' " alt="" class=" img-lyf ">
  </div>

</template>


<script>
  export default {
    props: ['Lyf'],
    data() {
      return {

      }
    },
  }

</script>

<style>
  .lyf-description {
    word-break: break-all;
  }

  .img-lyf {
    height: 150px;
    width: 100%;
    object-position: center;
    object-fit: cover;
  }

</style>
