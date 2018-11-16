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
        <div class="column is-4 ">
          <div class="field">
            <label class=" is-size-3 " for="cat_search"><strong> Busqueda </strong> </label>
            <div class="control">
              <input class="input" type="text" placeholder="¿ Qué buscas ?" id="cat_search">
            </div>
          </div>
          <h4 class="  is-size-4 "> Subcategorias </h4>
          <section class=" column ">
            <div v-for=" subCat in orderedSubCat  " :key=" subCat " >
              <b-checkbox :native-value="subCat.url " v-model="checkboxGroup">
                {{subCat.alias}}
              </b-checkbox>
            </div>





            <p class="content">
              <b>Selection:</b>
              {{ checkboxGroup }}
            </p>
          </section>


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

        for (let index in this.$parent.categories) {
          //   console.log(this.$route.params);
          console.log(this.$parent.categories[index]['url'])
          if (this.$route.params.cat == this.$parent.categories[index]['url']) {
            this.subCategories = this.$parent.categories[index]['subCats']; 
            break;
          }
        }


      }
    },
    computed: {
      orderedSubCat: function () {
        return  _.sortBy(this.subCategories, 'alias');
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
