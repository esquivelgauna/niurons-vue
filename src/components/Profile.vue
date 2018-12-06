<template>
  <div class="container is-centered ">

    <div class="columns ">
      <div class="column is-5-tablet is-3-desktop  has-background-light ">
        <div class="levels">
          <div class="level-item">
            <img :src=" $host + session.img " alt="" id="profile-img" class="img-200">
          </div>
          <div class="level-item">
            <strong class="is-clipped"> {{ session.name +' '+ session.lastName }} </strong>
          </div>
          <div class="level-item">
            <p>Nickname: <strong> {{ session.nickname }} </strong> </p>
          </div>
          <div class="level-item">
            <div v-if=" session.seller ">
              <p> <strong class="has-text-success"> Eres vendedor </strong> </p>
            </div>
            <div v-else>
              <p> <strong class="has-text-primary"> Aun no eres vendedor </strong> </p>
            </div>

          </div>
          <div class="level-item">
            <p>E-mail: <strong> {{ session.email }} </strong> </p>

          </div>

        </div>
      </div>
      <div class="column is-7-tablet is-9-desktop ">
        <h4> Lif's </h4>
        <div v-if=" session.seller ">
          <div class="columns is-multiline ">
            <div class="column is-4" v-for=" lyf in Lyfs  " :key=" lyf ">
              <router-link :to="{ name: 'Lyf', params: { idLyf: lyf.id }}">
                <lyf-prev v-bind:Lyf="lyf">
                </lyf-prev>
              </router-link>
            </div>

            <div class="column is-12 has-text-centered has-text-primary has-background-grey-lighter ">
              <h4 v-if=" Lyfs.length > 9 && condition != fasle "> Ver más </h4>
              <h4 v-else>Son todos tus Lyf´s </h4>
            </div>
          </div>
        </div>
        <div v-else>
          <p><strong class="has-text-primary"> Aun no eres vendedor , <router-link> consulta las bases </router-link>
            </strong> </p>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Lyf from '@/components/Lyf_Prev'
  export default {
    components: {
      'lyf-prev': Lyf,
    },
    data() {
      return {
        session: this.$parent.session,
        Lyfs: [],
        condition: true
      }
    },
    methods: {
      getLyfs: function () {
        console.log('geting lifs');
        this.$http.get('user/lyfs').then(response => {
          console.log('OK API', response.body.lyfs);
          this.Lyfs = response.body.lyfs;

        }, response => {

          console.log('Error:', response);
        });
      }

    },
    beforeMount() {
      this.getLyfs();
    }
  }

</script>
<style>
  #profile-img {
    /* position: relative; */
    /* transform: translateY(-50%); */
    height: 150px !important;
    width: 150px !important;
    object-position: center;
    object-fit: cover;
    border-radius: 50% 50%;

  }

</style>
