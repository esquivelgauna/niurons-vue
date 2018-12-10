<template>

  <div class="container ">
    <div class="columns ">
      <div class="column has-text-centered">
        <h3 class="is-size-3">Servicios </h3>
      </div>
    </div>
    <ul class=" columns is-multiline is-centered is-mobile ">
      <li v-for=" service in services  " :key=" service.url " class=" column is-4-mobile is-3-tablet is-one-fifth-desktop has-text-centered">

        <router-link :to="{ name: 'Categorie', params: { cat: service.url , alias: service.alias }}">
          <div class="columns">
            <div class="column">
              <i :class="  'niu-icon service_' + service.url "></i>

            </div>
          </div>

          <div class="columns">
            <div class="column is-paddingless">
              <h4 class=" is-size-4">
                {{ service.alias }}

              </h4>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>


</template>


<script>
  export default {
    props:['services'], 
  }

</script>
 
