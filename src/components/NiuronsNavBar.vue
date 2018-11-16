<template>
  <div class=" columns is-multiline is-mobile  sticky has-background-white ">

    <div class="column is-full">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link :to="{ name: 'Landing' }" class="navbar-item">
            <img src="static/logo-niurons.png " class='img-50'>
          </router-link>
          <a role="button" class="navbar-burger burger" :class=" { 'is-active': navBar==true } " @click="navBar =  !navBar "
            aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="niu-nav-bar" class="navbar-menu animated fadeIn " :class=" { 'is-active': navBar==true } ">
          <div class="navbar-start">
            <a class="navbar-item" href="https://bulma.io/">
              Home
            </a>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link" href="https://bulma.io/documentation/overview/start/">
                Docs
              </a>
              <div class="navbar-dropdown is-boxed">
                <a class="navbar-item" href="https://bulma.io/documentation/overview/start/">
                  Overview
                </a>
                <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                  Modifiers
                </a>
                <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                  Columns
                </a>
                <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
                  Layout
                </a>
                <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
                  Form
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
                  Elements
                </a>
                <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
                  Components
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <login-modal></login-modal>
            </div>
          </div>
        </div>

      </nav>
    </div>

    <div class="column is-full is-hidden-touch ">
      <nav-categories v-bind:categories="categories">
      </nav-categories>
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
        navBar: false,
        title: ' Barra de navegacion '
      }
    },
  }

</script>

<style>
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .relative {
    position: relative;
  }

</style>
