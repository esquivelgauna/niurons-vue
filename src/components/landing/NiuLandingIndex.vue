<template>
  <div>

    <div class="columns is-centered" id="Niurons">
      <div class="column is-three-quarters has-text-centered ">
        <i class=" niu-icon icon-niurons "></i>
        <h1 class=" is-size-1 has-text-white ">Niurons</h1>
        <h2 class=" is-size-2 has-text-white ">Servicios profesionales</h2>
        <br>
        <div class="columns is-centered is-mobile ">
          <div class="colimn is-quarer">
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="text" placeholder="Buscar">
              </div>
              <div class="control">
                <a class="button is-info">
                  <fa-icon icon="search"></fa-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
        <h4 class=" is-size-4 has-text-white  ">Apoyate en los expertos</h4>
      </div>
    </div>

    <niu-services></niu-services>

  </div>
</template>

<script>
  import Services from '@/components/landing/Services'

  export default {
    name: 'Landing',
    components: {
      'niu-services': Services
    },
    data() {
      return {
        message: 'Hola a todos'
      }
    }
  }

</script>

<style>
  #Niurons {
    background-image: url('../../assets/img/niu-banner-1.png');
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
  }

</style>
