<template>
  <div id="app" class=" hero is-fullheight">
    <niurons-nav-var v-bind:categories="categories"></niurons-nav-var>
    <router-view />
    <niurons-footer></niurons-footer>
  </div>
</template>

<script>
  import NiuronsNavBar from '@/components/NiuronsNavBar.vue'
  import NiuronsFooter from '@/components/NiuronsFooter.vue'
  export default {
    name: 'App',
    data() {
      return {
        categories: {}
      }
    },
    components: {
      'niurons-nav-var': NiuronsNavBar,
      'niurons-footer': NiuronsFooter
    },
    methods: {
      getCategrories: function () {
        this.$http.get('Categories').then(response => {
          console.log('OK API', response);
          this.categories = response.body;

        }, response => {
          // error callback
          console.log('Error:', response);
        });
      }
    },
    mounted() {
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
  @import "./assets/Images-size";

</style>
