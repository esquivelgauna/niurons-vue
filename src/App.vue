<template>
  <div id="app" class=" hero is-fullheight ">
    <niurons-nav-var></niurons-nav-var>
    <router-view />
    <niurons-footer></niurons-footer>
  </div>
</template>

<script>
  import NiuronsNavBar from '@/components/NiuronsNavBar.vue'
  import NiuronsFooter from '@/components/NiuronsFooter.vue'
  export default {
    name: 'App',
    components: {
      'niurons-nav-var': NiuronsNavBar,
      'niurons-footer': NiuronsFooter
    }
  }

</script>


<style lang="scss">
@import "./assets/Niurons";
@import "./assets/Icons";
</style>
