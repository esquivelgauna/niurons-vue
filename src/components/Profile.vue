<template>
  <div class="containe is-centered ">

    <div class="columns ">
      <div class="column is-5-tablet is-3-desktop  has-background-light ">
        <div class="levels">
          <div class="level-item">
            <img :src=" $host + session.img " alt="" id="profile-img" class="img-200">
          </div>
          <!-- lastName
             nickname
             seller
             email -->
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
      <div class="column is-7 "> 
          <h4> Lif's </h4> 
        <div v-if=" session.seller ">
          <p> <strong class="has-text-success"> Eres vendedor , <router-link> consulta las bases </router-link>
            </strong> </p>
        </div>
        <div v-else>
          <p> <strong class="has-text-primary"> Aun no eres vendedor , <router-link> consulta las bases </router-link>
            </strong> </p>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {

    data() {
      return {
        session: this.$parent.session,
        Lyfs: []
      }
    },
    methods: {
      getLyfs: function () {
          console.log('geting lifs');
        this.$http.get('Lyfs').then(response => {
          console.log('OK API', respresponse.bodyonse);
          this.Lyfs = response.body;

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
