<template>
  <div class=" relative ">
    <div class=" columns is-multiline " id="niu-navbar">
      <div class="column is-full">
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <router-link :to="{ name: 'Landing' }" class="navbar-item">
              <img src="static/logo-niurons.png " class='img-100'>
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
      </div>
      <div class="column if-full is-hidden-mobile">
        <nav-categories v-bind:categories="categories">
        </nav-categories>
      </div>

    </div>
  </div>


</template>

<script>
  import LoginModal from '@/components/modals/LoginModal'
  import Categories from '@/components/nav-bar/NavCategories'
  export default {
    name: 'NiuronsNavBar',
    props: ['categories'],
    components: {
      'login-modal': LoginModal,
      'nav-categories': Categories
    },
    data() {
      return {
        title: ' Barra de navegacion '
      }
    },
  }

</script>

<style>
  #niu-navbar {
    position: sticky;
  }
  .relative{
    position: relative;
  }

</style>
