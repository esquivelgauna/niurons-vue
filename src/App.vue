<template>
  <div id="app" class=" hero is-mobile ">
    <niurons-nav-var v-bind:categories="categories" v-bind:search.sync='search'></niurons-nav-var>
    <router-view />
    <niurons-footer></niurons-footer>
  </div>
</template>

<script>
  import NiuronsNavBar from '@/components/NiuronsNavBar.vue'
  import NiuronsFooter from '@/components/NiuronsFooter.vue'
  import JWT from 'jsonwebtoken'
  export default {
    name: 'App',
    data() {
      return {
        search: 'hell',
        categories: {},
        session: {}
      }
    },
    components: {
      'niurons-nav-var': NiuronsNavBar,
      'niurons-footer': NiuronsFooter
    },
    methods: {
      changeSearch: function (newSearch) {
        console.log('changeSearch', newSearch);

        this.search = newSearch;
      },
      getCategrories: function () {
        this.$http.get('Categories').then(response => {
          console.log('OK API', response);
          this.categories = response.body;

        }, response => {
          // error callback
          console.log('Error:', response);
        });
      },
      getInitials: function () {
        this.$http.get('user/Initials').then(response => {
          console.log('OK API', response);
          // this.initials = response.body;

        }, response => {
          // error callback
          console.log('Error:', response);
        });
      },
      LoadToken: function () {
        console.log('Loading Token ');
        if (localStorage.getItem('token')) {
          try {
            this.session = JWT.decode(localStorage.getItem('token'));
            this.getInitials();
            console.log(' Token Successful ');
          } catch (e) {
            console.log(' Not Token ');
            // localStorage.removeItem('token');
          }
        }
      },
    },
    created() {
      this.$on('SetSession', session => {
        console.log(' SetSession ', session);
        this.session = session;
      });
    },

    watch: {
      search(newSearch) {
        console.log('changeSearch', newSearch);

        this.search = newSearch;
      }
    },
    beforeMount() {
      this.LoadToken();
      if (localStorage.getItem('categories')) {
        try {
          this.categories = JSON.parse(localStorage.getItem('categories'));
        } catch (e) {
          localStorage.removeItem('categories');
        }
      } else {
        this.getCategrories();
      }


    },

    watch: {
      categories(newCategories) {
        localStorage.setItem('categories', JSON.stringify(newCategories));
      }
    },
  }

</script>
<style lang="scss">
  @import "./assets/Niurons";
  @import "./assets/Icons";
  @import "./assets/Spacing";
  @import "./assets/Borders";
  @import "./assets/Images-size";

</style>
