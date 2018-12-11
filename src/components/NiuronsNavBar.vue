<template>
  <div class=" columns is-multiline is-mobile  sticky has-background-white ">

    <div class="column is-full">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link :to="{ name: 'Landing' }" class="navbar-item">
            <img src=" " class=' niu-icon icon-niurons-logo '>
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
            <div class="navbar-item">
              <div class="field has-addons">
                <div class="control">
                  <input class="input is-rounded" type="text" placeholder="Buscar" v-model="mySearch" @input=" $emit('update:search', mySearch)   ">
                </div>
                <div class="control">
                  <router-link :to="{ name: 'SearchW', params: { words:  mySearch }}" class=" button is-info is-rounded">
                    <fa-i icon="search"></fa-i>
                  </router-link>
 
                </div>
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
    props: ['categories', 'search'],
    components: {
      'login-modal': LoginModal,
      'nav-categories': Categories
    },
    data() {
      return {
        mySearch: this.search,
        session: this.$parent.session,
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
    z-index: 5;
  }

  .relative {
    position: relative;
  }

</style>
