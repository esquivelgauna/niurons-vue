<template>
  <div>
    <div class="column notification ">
      <h3 class=" is-size-5 "> {{ Lyf.titulo }} </h3>
      <div v-if=" Lyf.img=='' ">
        <img :src=" $host + '/imgLyf/default.png' " alt="" class=" img-lyf ">
      </div>
      <div v-else>
        <img :src=" $host + '/imgLyf/' + Lyf.img " alt="" class="img-lyf">
      </div>

      <!-- <img :src=" $host + '/imgLyf/' + Lyf.img " alt=""> -->
      <strong>Descripción:</strong>
      <p v-html=" Lyf.descripcion " class="lyf-description">
      </p>
    </div>
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
