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
        <div class="notification has-text-centered is-primary " @click=" modals.studies = true " >
          <fa-i icon='graduation-cap'></fa-i>
          <h3>Educación</h3>
        </div>

      </div>
      <div class="column is-narrow is-5-mobile is-3-tablet is-4-desktop  ">
        <div class="notification has-text-centered is-primary " @click=" modals.cert = true " >
          <fa-i icon='bookmark'></fa-i>
          <h3>Certificaciones</h3>
        </div>
      </div>
      <div class="column is-narrow is-5-mobile is-3-tablet is-4-desktop  ">
        <div class="notification has-text-centered is-primary " @click=" modals.lan = true " >
          <fa-i icon='language'></fa-i>
          <h3>Idiomas </h3>
        </div>
      </div>
    </div>

    <!-- * /* /* /* * /* /* /* / modals */ */ */* /* / */ */ -->
    <modal-generals :Modal.sync ="modals.general"  Title='Generales '      Icon='user'        @close = " modals.general = false "   ></modal-generals>
    <modal-about    :Modal.sync ="modals.about"    Title='Acerca de mí '   Icon='user-circle'  @close = " modals.about = false "  ></modal-about>
    <modal-home     :Modal.sync ="modals.home"     Title='Domicilio Actual ' Icon='map-marker-alt'  @close = " modals.home = false "  ></modal-home>
    <modal-security :Modal.sync ="modals.security" Title='Seguridad '        Icon='shield-alt'  @close = " modals.security = false "  ></modal-security>
    <modal-fiscal   :Modal.sync ="modals.fiscal"   Title='Datos Fiscales '   Icon='briefcase'  @close = " modals.fiscal = false "  ></modal-fiscal>
    <modal-studies   :Modal.sync ="modals.studies"   Title=' Estudios  '   Icon='graduation-cap'  @close = " modals.studies = false "  ></modal-studies>
    <modal-cert   :Modal.sync ="modals.cert"   Title='Certificaciones '   Icon='bookmark'  @close = " modals.cert = false "  ></modal-cert>
    <modal-lan   :Modal.sync ="modals.lan"   Title='Idiomas '   Icon='language'  @close = " modals.lan = false "  ></modal-lan>
    
  </div>

</template>
<script>

import modal_generals from '@/components/modals/modal_config_generals.vue'
import modal_about from '@/components/modals/modal_config_about.vue'
import modal_home from '@/components/modals/modal_config_home.vue'
import modal_security from '@/components/modals/modal_config_security.vue'
import modal_fiscal from '@/components/modals/modal_config_fiscal.vue'
//Academics
import modal_studies from '@/components/modals/modal_config_studies.vue'
import modal_cert from '@/components/modals/modal_config_certifications.vue'
import modal_lan from '@/components/modals/modal_config_languages.vue'
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
          studies: false,
          cert: false,
          lan: false,
        },
      }
    },
    components: {
      'modal-generals': modal_generals, 
      'modal-about': modal_about, 
      'modal-home': modal_home, 
      'modal-security': modal_security, 
      'modal-fiscal': modal_fiscal, 

      'modal-studies': modal_studies, 
      'modal-cert': modal_cert, 
      'modal-lan': modal_lan, 
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
