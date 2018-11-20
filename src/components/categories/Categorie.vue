<template>
  <div class="container">
    <h3> Categoria: {{ $route.params.alias }} </h3>
    <div class="column">
      <p>
        <strong>Descripcion: </strong>
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Aspernatur, amet ex! Quos perspiciatis
        inventore nisi. Ipsum deleniti sint doloribus obcaecati, fugiat nulla
        minima reprehenderit quidem incidunt! Illo in molestias iure.
      </p>
      <hr>
      <div class="columns">
        <div class="column is-4  is-3-tablet is-3-desktop">
          <div class="field">
            <label class=" is-size-3 " for="cat_search"><strong> Busqueda </strong> </label>
            <div class="control">
              <input class="input" type="text" placeholder="¿ Qué buscas ?" id="cat_search">
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Min</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" type="number" placeholder="0">
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Max</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" type="number" placeholder="999">
                </p>
              </div>
            </div>
          </div>

          <h4 class="  is-size-4 "> Subcategorías </h4>
          <section class=" column ">
            <div v-for=" subCat in orderedSubCat  " :key=" subCat ">
              <b-checkbox :native-value="subCat.url " v-model="checkboxGroup">
                {{subCat.alias}}
              </b-checkbox>
            </div>





            <p class="content">
              <b>Selection:</b>
              {{ checkboxGroup }}
            </p>
          </section>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-text is-hidden" @click=" checkboxGroup =[]" >Limpiar</button>
            </div>
            <div class="control">
              <button class="button is-success " >Buscar</button>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        subCategories: [],
        checkboxGroup: []
      }
    },
    methods: {
      getSubCategories: function () {
        this.checkboxGroup = [];
        for (let index in this.$parent.categories) {
          //   console.log(this.$route.params);
          // console.log(this.$parent.categories[index]['url'])
          if (this.$route.params.cat == this.$parent.categories[index]['url']) {
            this.subCategories = this.$parent.categories[index]['subCats'];
            break;
          }
        }


      }
    },
    computed: {
      orderedSubCat: function () {
        return _.sortBy(this.subCategories, 'alias');
      }
    },
    mounted() {
      this.getSubCategories();
    },
    watch: {
      '$route'(to, from) {
        //   console.log( to, from  );
        this.getSubCategories();
        // react to route changes...
      }
    }


  }

</script>

<style>

</style>
