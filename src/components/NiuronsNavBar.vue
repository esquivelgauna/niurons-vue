<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'Landing' }" class="navbar-item">
        <img src="static/logo-niurons.png ">
      </router-link>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <login-modal></login-modal>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import LoginModal from '@/components/modals/LoginModal'
  export default {
    name: 'NiuronsNavBar',
    components: {
      'login-modal': LoginModal
    },
    data() {
      return {
        title: ' Barra de navegacion ',
      }
    }
  }

</script>
