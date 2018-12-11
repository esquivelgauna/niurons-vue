<template>
  <div>
    <img :src=" $host + Lyf.imgPerfil " alt="" class=" img-100 ">
    <router-link :to="{ name: 'ProfileUser', params: { nickname: Lyf.nickName }}"  
      class=" has-text-grey is-text  ">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <img :src=" $host + Lyf.imgPerfil " alt="" class=" img-20 is-circle ">
          </div>
          <div class="level-item">
            <h4 class=" is-size-6 ">
              {{ Lyf.nickName }}
            </h4>

          </div>
        </div>
      </div>

    </router-link>

    <p>
      {{Lyf.titulo }}
    </p>
    <hr>
    <div class="level">
      <div class="level-left">
        <fa-i icon='star'>
        </fa-i>
        <fa-i icon='star'>
        </fa-i>
        <fa-i icon='star'>
        </fa-i>
        <fa-i icon='star'>
        </fa-i>
        <fa-i icon='star'>
        </fa-i>
      </div>
      <div class="level-rigth">
        <div class="level-item">
          $ {{ Lyf.costo }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['Lyf']
  }

</script>

<style>

</style>
