<template>
  <footer class="footer has-background-primary has-text-white has-padding-3 has-margin-t-3 ">
    <div class="columns is-mobile is-multiline ">
      <div class="column is-6-mobile is-3-tablet ">
        <h4 class=" is-size-4 "> Categorias </h4>
        <ul class=" ">
          <li class=" has-margin-y-2 " v-for=" cat in  orderedCat " :key="cat.alias">
            <router-link :to="{ name: 'Categorie', params: { cat: cat.url , alias: cat.alias }}" class=" has-text-white is-text  ">
              {{ cat.alias }}</router-link>
          </li>
        </ul>

      </div>
      <div class="column is-6-mobile is-3-tablet ">
        <h4 class=" is-size-4 "> Acerca de </h4>
        <ul class=" ">
          <li class=" has-margin-y-2 ">
            <router-link :to="{ name: 'Acerca', params: { section: 'Quienes-Somos' , alias: 'Quiénes Somos' }}" class=" has-text-white is-text  ">
              Quiénes Somos </router-link>
          </li>
          <li class=" has-margin-y-2 ">
            <router-link :to="{ name: 'Acerca', params: { section: 'Politicas-y-Terminos' , alias: 'Políticas y Términos de Uso' }}"
              class=" has-text-white is-text  ">
              Políticas y Términos de Uso </router-link>
          </li>
          <li class=" has-margin-y-2 ">
            <router-link :to="{ name: 'Acerca', params: { section: 'Mapa-del-Sitio' , alias: 'Mapa del Sitio' }}" class=" has-text-white is-text  ">
              Mapa del Sitio </router-link>
          </li>
        </ul>
      </div>
      <div class="column is-6-mobile is-3-tablet ">
        <h4 class=" is-size-4 "> Ayuda </h4>
        <ul>
          <li class=" has-margin-y-2 ">
            <router-link :to="{ name: 'Acerca', params: { section: 'Politicas-y-Terminos' , alias: 'Políticas y Términos de Uso' }}"
              class=" has-text-white is-text  ">
              Soporte</router-link>
          </li>
          <li class=" has-margin-y-2 ">
            <router-link :to="{ name: 'Acerca', params: { section: 'Mapa-del-Sitio' , alias: 'Mapa del Sitio' }}" class=" has-text-white is-text  ">
              Chat </router-link>
          </li>
        </ul>
      </div>
      <div class="column is-6-mobile is-3-tablet ">
        <h4 class=" is-size-4 "> Otros </h4>
        <ul>
          <li class=" has-margin-y-2 ">
            <router-link :to="{ name: 'Acerca', params: { section: 'Politicas-y-Terminos' , alias: 'Políticas y Términos de Uso' }}"
              class=" has-text-white is-text  ">
              <fa-i icon='store'></fa-i> Tienda de Promocionales
            </router-link>
          </li>
          <li class=" has-margin-y-2 ">
            <router-link :to="{ name: 'Acerca', params: { section: 'Mapa-del-Sitio' , alias: 'Mapa del Sitio' }}" class=" has-text-white is-text  ">
              <fa-i icon='user-circle'></fa-i> Contacto Comercial
            </router-link>
          </li>
          <li class=" has-margin-y-2 ">
            <router-link :to="{ name: 'Acerca', params: { section: 'Politicas-y-Terminos' , alias: 'Políticas y Términos de Uso' }}"
              class=" has-text-white is-text  ">
              <fa-i icon='envelope'></fa-i> Buzón de Sugerencias
            </router-link>
          </li>
          <li class=" has-margin-y-2 ">
            <router-link :to="{ name: 'Acerca', params: { section: 'Mapa-del-Sitio' , alias: 'Mapa del Sitio' }}" class=" has-text-white is-text  ">
              <fa-i icon='book-open'></fa-i> Noticias
            </router-link>
          </li>

        </ul>
      </div>
    </div>
    <div class="content has-text-centered has-background-warning has-text-danger ">
      <p>
        <strong> Pagina en construcción, Niurons en Vue.js</strong>
      </p>
    </div>
  </footer>
</template>

<script>
  export default {
    data() {
      return ({
        // categories: this.$parent.categories
      });
    },
    computed: {
      orderedCat: function () {
        return _.sortBy(this.$parent.categories, 'alias');
      }
    },
  }

</script>
