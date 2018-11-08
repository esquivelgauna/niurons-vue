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
          <div class="buttons">
            <router-link :to=" {name: 'Login'} " class=" button  is-primary is-outlined "> <strong>Iniciar Sesion</strong>
            </router-link>
            <router-link :to=" {name: 'Register'} " class=" button is-primary  is-outlined "> <strong>Registrarse</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'NiuronsNavBar',
    data() {
      return {
        title: ' Barra de navegacion ',
      }
    }
  }

</script>
