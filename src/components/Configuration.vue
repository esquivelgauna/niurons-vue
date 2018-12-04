<template>
  <div class=" container ">
    <h3 class=" is-size-3 has-margin-y-3 "> Configuración </h3>
    <hr class=" is-marginless ">
    <h4 class=" is-size-4 has-margin-y-3 "> Generales </h4>

    <div class="columns is-mobile is-multiline is-centered  is-size-5-desktop is-size-6-mobile ">
      <div class="column is-narrow is-5-mobile is-3-tablet is-4-desktop  ">
        <div class="notification has-text-centered is-primary " @click=" modals.general = true ">
          <fa-i icon='user'></fa-i>
          <h3>Mis generales</h3>
        </div>

      </div>
      <div class="column is-narrow is-5-mobile is-3-tablet is-4-desktop  ">
        <div class="notification has-text-centered is-primary " @click=" modals.about = true ">
          <fa-i icon='user-circle'></fa-i>
          <h3>Acerca de mi</h3>
        </div>
      </div>
      <div class="column is-narrow is-5-mobile is-3-tablet is-4-desktop  ">
        <div class="notification has-text-centered is-primary " @click=" modals.home = true ">
          <fa-i icon='map-marker-alt'></fa-i>
          <h3>Mi Domicilio </h3>
        </div>

      </div>
      <div class="column is-narrow is-5-mobile is-3-tablet is-4-desktop  ">
        <div class="notification has-text-centered is-primary " @click=" modals.fiscal = true ">
          <fa-i icon='briefcase'></fa-i>
          <h3>Mis Fiscales</h3>
        </div>
      </div>
      <div class="column is-narrow is-5-mobile is-3-tablet is-4-desktop  ">
        <div class="notification has-text-centered is-primary " @click=" modals.security = true ">
          <fa-i icon='shield-alt'></fa-i>
          <h3>Seguridad</h3>
        </div>
      </div>
      <div class="column is-narrow is-5-mobile is-3-tablet is-4-desktop  ">
        <div class="notification   has-text-centered is-primary " @click=" modals.general = true ">
          <fa-i icon='file-alt'></fa-i>
          <h3 class=" s-size-5  ">Contrato</h3>
        </div>
      </div>

    </div>

    <hr class=" is-marginless ">
    <h4 class=" is-size-4 has-margin-y-3 "> Academicos </h4>

    <div class="columns is-mobile is-multiline is-centered  is-size-5-desktop is-size-6-mobile ">
      <div class="column is-narrow is-5-mobile is-3-tablet is-4-desktop  ">
        <div class="notification has-text-centered is-primary ">
          <fa-i icon='graduation-cap'></fa-i>
          <h3>Estudios</h3>
        </div>

      </div>
      <div class="column is-narrow is-5-mobile is-3-tablet is-4-desktop  ">
        <div class="notification has-text-centered is-primary ">
          <fa-i icon='bookmark'></fa-i>
          <h3>Certificaciones</h3>
        </div>
      </div>
      <div class="column is-narrow is-5-mobile is-3-tablet is-4-desktop  ">
        <div class="notification has-text-centered is-primary ">
          <fa-i icon='language'></fa-i>
          <h3>Idiomas </h3>
        </div>
      </div>
    </div>

    <!-- * /* /* /* * /* /* /* / modals */ */ */* /* / */ */ -->
    <modal-generals :Modal.sync ="modals.general"  Title='Generales '      Icon='user' @close = " modals.general = false "   ></modal-generals>
    <modal-about    :Modal.sync ="modals.about"    Title='Acerca de mí '   Icon='user-circle'  @close = " modals.about = false "  ></modal-about>
    <modal-home     :Modal.sync ="modals.home"     Title='Domicilio Actual ' Icon='map-marker-alt'  @close = " modals.home = false "  ></modal-home>
    <modal-security :Modal.sync ="modals.security" Title='Seguridad '        Icon='shield-alt'  @close = " modals.security = false "  ></modal-security>
    


    <div class="modal" :class=" { 'is-active':modals.generasadfdsl == true}">
      <div class="modal-background" @click=" modals.gensdfsderal = false "></div>
      <div class="modal-content ">
        <div class=" column is-rounded has-background-white ">
          <div class="level">
            <div class="level-item">
              <h3 class=" is-size-3 ">
                <fa-i icon='user'></fa-i> Generales
              </h3>
            </div>
          </div>

          <div class="columns">
            <div class="column is-6">
              <div class="level is-marginless">
                <div class="level-item">
                  <img :src=" $host + session.img " alt="" class="img-150 ">
                </div>
              </div>

              <div class="field">
                <label class="label"> Nickname </label>
                <div class="control">
                  <input class="input" type="text" placeholder="Nickname">
                </div>
              </div>
              <div class="field">
                <label class="label">Celular</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Celular">
                </div>
              </div>
            </div>
            <div class="column is-6">
              <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Nombre">
                </div>
              </div>
              <div class="field">
                <label class="label">Apellido</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Apellido">
                </div>
              </div>
              <div class="field">
                <label class="label">Telefono fijo</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Telefono fijo">
                </div>
              </div>
              <div class="field">
                <label class="label">Miembro desde</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Miembro desde">
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Any other Bulma elements you want -->
      </div>
      <button class="modal-close is-large" aria-label="close" @click=" modals.general = false "></button>
    </div>

  </div>

</template>
<script>

import modal_generals from '@/components/modals/modal_config_generals.vue'
import modal_about from '@/components/modals/modal_config_about.vue'
import modal_home from '@/components/modals/modal_config_home.vue'
import modal_security from '@/components/modals/modal_config_security.vue'
  export default {
    data() {
      return {
        session: this.$parent.session,
        modals: {
          general: false,
          about: false,
          home: false,
          fiscal: false,
          security: false,
        },
      }
    },
    components: {
      'modal-generals': modal_generals, 
      'modal-about': modal_about, 
      'modal-home': modal_home, 
      'modal-security': modal_security, 
    },
  }

</script>

<style scoped>

  

  .notification {
    padding: 1rem 1.25rem 1rem 1.25rem;
    /* border: 1px solid rgba(0, 0, 0, .1); */
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
    cursor: pointer;
    /* background-color: white; */
  }
  

</style>
