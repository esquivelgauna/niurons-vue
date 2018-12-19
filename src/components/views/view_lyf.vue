<template>
  <div class=" animated fadeIn">

    <div class="level">
      <div class="level-item">
        <router-link :to="{ name: 'Lyf/Buy', params: { id: Lyf.id }}" class=" has-text-grey is-text  ">
          <div v-if="Lyf.img != ''">
            <img :src=" $host + '/thumbs/'  + Lyf.img " alt="" class=" img-w-100 ">
          </div>
          <div v-else >
            <img :src=" $host + '/thumbs/default.png' " alt="" class=" img-w-100 ">
          </div>
        </router-link>
      </div>
    </div>
    <router-link :to="{ name: 'ProfileUser', params: { nickname: Lyf.nickname }}" class=" has-text-grey is-text  ">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <img :src=" $host + Lyf.img_user " alt="" class=" img-20 is-circle ">
          </div>
          <div class="level-item">
            <h4 class=" is-size-6 ">
              {{ Lyf.nickname }}
            </h4>

          </div>
        </div>
      </div>

    </router-link>
    <p>
      {{Lyf.title }}
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
          Comprar $ {{ Lyf.cost }}
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
