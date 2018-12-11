<template>
  <div class="container has-shadow ">
    <div class=" has-background-primary niu-profile-background ">
    </div>
    <div class="column">
      <div class="columns ">

        <div class="column is-5-tablet is-4-desktop ">
          <div class="level is-marginless">
            <div class="level-item">
              <img :src=" $host + Profile.imagen_perfil" alt="" class=" img-150 is-circle niu-profile-image has-border ">

            </div>
          </div>
          <div class="level">
            <div class="level-item">
              <h4 class=" is-size-4  "> {{Profile.nickname}} </h4>
            </div>
          </div>
          <div class="level">
            <div class="level-item">
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
          </div>
          <div class="buttons is-centered">
            <button class=" button is-outlined is-info is-rounded is-small ">
              <h6> <small>MENSAJE</small> </h6>
            </button>
            <button class=" button is-outlined is-success is-rounded  is-small ">
              <h6 class=""> <small>ORDEN</small> </h6>
            </button>
          </div>

          <hr class=" has-margin-y-4 ">
          <h5 class=" is-size-6 has-text-primary ">Descripción</h5>
          <p>
            {{ Profile.descripcion_laboral }}
          </p>
          <h5 class=" is-size-6 has-text-primary ">Habilidades</h5>
          <div class="buttons">
            <span class=" button is-rounded is-small has-shadow  " v-for=" skill in getSkills " :key="skill">
              {{ skill }}
            </span>
          </div>

          <hr class=" has-margin-y-4 ">
          <h5 class=" is-size-6 has-text-primary ">Idiomas:</h5>
          <div class="columns is-multiline">
            <div class="column is-12  has-text-grey " v-for=" langage in Profile.languages " :key="langage.Idioma">
              <h4 class="is-size-6 "> {{ langage.Idioma }} </h4>
              <P> Lectura: {{ langage.Lectura }} </P>
              <P> Escritura: {{ langage.Escritura }} </P>
              <P> Conversacional: {{ langage.Conversasional }} </P>

            </div>
          </div>
          <hr class=" has-margin-y-4 ">
          <h5 class=" is-size-6 has-text-primary ">Estudios</h5>
          <div class="columns is-multiline">
            <div class="column is-12 has-text-grey " v-for=" studie in Profile.studies " :key="studie.Carrera">
              <h4 class="is-size-6 "> {{ studie.Carrera }} </h4>
              <P> {{ studie.Escuela }} </P>
              <P> {{ studie.Pais }} </P>

            </div>
          </div>
          <hr class=" has-margin-y-4 ">
          <h5 class=" is-size-6 has-text-primary ">Certificaciones</h5>

          <div class="columns is-multiline">
            <div class="column is-12 has-text-grey " v-for=" cert in Profile.certifications " :key="cert.nombre">
              <h4 class="is-size-6 "> {{ cert.nombre }} </h4>
              <P> {{ cert.institucion }} </P>
              <P> {{ cert.fecha }} </P>

            </div>
          </div>
          <hr class=" has-margin-y-4 ">
          <h5 class=" is-size-6 has-text-primary ">Redes Sociales</h5>

        </div>

        <!-- <div class="column is-5-tablet is-3-desktop  has-background-light ">
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
      </div> -->
        <div class="column is-7-tablet is-8-desktop ">
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
        Profile: [],
        Lyfs: [],
        condition: true
      }
    },
    methods: {
      getLyfs: function () {
        console.log('geting lifs');
        this.$http.get('user/Profile/Lyfs').then(response => {
          console.log('OK API', response.body.lyfs);
          this.Lyfs = response.body.lyfs;

        }, response => {

          console.log('Error:', response);
        });
      },
      getProfile: function () {
        this.$http.get('Profile', {
          params: {
            nickanme: this.session.nickname
          }
        }).then(response => {
          console.log('Profile:', response.body.profile);
          if (response.body.profile) {
            this.Profile = response.body.profile;
          }


        }, response => {
          console.log('Error:', response);
        });
      },

    },
    beforeMount() {
      this.getLyfs();
      this.getProfile();
    },
    computed: {
      getSkills: function () {
        if (this.Profile.skills) {
          console.log(this.Profile.skills.split(','));
          return this.Profile.skills.split(',');
        }
        return [];
      }
    },
  }

</script>
<style>
  .niu-profile-background {
    height: 150px;
  }

  .niu-profile-image {
    margin-top: -75px;
    background-color: white;
  }

</style>
