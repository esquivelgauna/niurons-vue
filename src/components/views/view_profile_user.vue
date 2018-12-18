<template>
  <div class=" columns ">
    <div class="column is-full">
      <div class="level is-marginless">
        <div class="level-item">
          <img :src=" $host + user.imagen_perfil " alt="" class=" img-150 is-circle niu-profile-image has-border ">
        </div>
      </div>
      <div class="level">
        <div class="level-item">
          <h4 class=" is-size-4  "> {{user.nickname}} </h4>
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
        {{ user.descripcion_laboral }}
      </p>
      <h5 class=" is-size-6 has-text-primary ">Habilidades</h5>
      <div class="buttons">
        <span class=" button is-rounded is-small has-shadow  " v-for=" skill in getSkills " :key="skill">
          {{ skill }}
        </span>
      </div>
      <div v-if=" type == 'complete'">

        <hr class=" has-margin-y-4 ">
        <h5 class=" is-size-6 has-text-primary ">Idiomas:</h5>
        <div class="columns is-multiline">
          <div class="column is-12  has-text-grey " v-for=" langage in user.languages " :key="langage.Idioma">
            <h4 class="is-size-6 "> {{ langage.Idioma }} </h4>
            <P> Lectura: {{ langage.Lectura }} </P>
            <P> Escritura: {{ langage.Escritura }} </P>
            <P> Conversacional: {{ langage.Conversasional }} </P>

          </div>
        </div>
        <hr class=" has-margin-y-4 ">
        <h5 class=" is-size-6 has-text-primary ">Estudios</h5>
        <div class="columns is-multiline">
          <div class="column is-12 has-text-grey " v-for=" studie in user.studies " :key="studie.Carrera">
            <h4 class="is-size-6 "> {{ studie.Carrera }} </h4>
            <P> {{ studie.Escuela }} </P>
            <P> {{ studie.Pais }} </P>

          </div>
        </div>
        <hr class=" has-margin-y-4 ">
        <h5 class=" is-size-6 has-text-primary ">Certificaciones</h5>
        <div class="columns is-multiline">
          <div class="column is-12 has-text-grey " v-for=" cert in user.certifications " :key="cert.nombre">
            <h4 class="is-size-6 "> {{ cert.nombre }} </h4>
            <P> {{ cert.institucion }} </P>
            <P> {{ cert.fecha }} </P>

          </div>
        </div>
      </div>


      <hr class=" has-margin-y-4 ">
      <h5 class=" is-size-6 has-text-primary ">Redes Sociales</h5>

    </div>


  </div>

</template>

<script>
  export default {
    props: ['id', 'nickname', 'profile', 'type'],
    data() {
      return {
        user: {},
      }
    },
    methods: {
      GetProfileById: function () {
        if (this.id != null) {
          this.$http.get('User/Id', {
            params: {
              idUser: this.id
            }
          }).then(response => {
            console.log('Profile:', response.body.profile);
            if (response.body.profile) {
              this.user = response.body.profile;
            }
          }, response => {
            console.log('Error:', response);
          });
        } else {
          alert('Falta el id del lyf');
        }
      },
      GetProfileByNickname: function () {
        if (!isNull(this.id)) {
          this.$http.get('User/Nickname', {
            params: {
              nickname: this.nickname
            }
          }).then(response => {
            console.log('Profile:', response.body.profile);
            if (response.body.profile) {
              this.user = response.body.profile;
            }

          }, response => {
            console.log('Error:', response);
          });
        } else {
          alert('Falta el id del lyf');
        }


      },
    },
    computed: {
      getSkills: function () {
        if (this.user.skills) {
          console.log(this.user.skills.split(','));
          return this.user.skills.split(',');
        }
        return [];
      }
    },
    mounted() {
      if (this.id == null) {
        this.GetProfileByNickname();
      } else {
        this.GetProfileById();
      }
    }

  }

</script>
