<template>
  <div class=" container ">
    <h3 class="is-size-3">Busqueda</h3>
    <!-- {{ $route.params }} -->
    <div class="columns">
      <div class="column is-6-mobile is-4-tablet  ">
        <div class="field">
          <label for="cat_search"> Palabras clave </label>
          <div class="control">
            <input class="input" type="text" placeholder="¿ Qué buscas ?" id="cat_search" v-model="search ">
          </div>
        </div>
        <div v-for=" categorie in orderedCategories " :key=" categorie.id ">
          <b-checkbox :native-value="categorie.id " v-model="checkboxGroup">
            {{categorie.alias}}
          </b-checkbox>
        </div>
        <div class="columns">
          <div class="column is-6 ">
            <div class="field">
              <label for=" "> Min ${{min}} </label>
              <div class="control">
                <input class="input" type="range" :min="rMin" :max="rMax" step="1" v-model="min">
              </div>
            </div>

          </div>
          <div class="column is-6">
            <div class="field">
              <label for=" "> Max ${{max}} </label>
              <div class="control">
                <input class="input disabled " type="range" :min="min" :max="rMax" step="1" v-model="max"  value="max" >
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class=" button input is-success " @click=" searchWords() ">
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div class="column is-6 ">
        <h3 class="is-size-3">Resultados</h3>
      </div>

    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        min: 0,
        max: 200,
        rMin: 0,
        rMax: 200,
        search: null,
        categories: [],
        checkboxGroup: []
      }
    },
    methods: {
      setWords: function () {
        if (this.$route.params.words) {
          this.search = this.$route.params.words;
        }
      },
      searchWords: function () {
        let data = {};
        data.min = this.min;
        data.max = this.max;
        data.words = this.search;
        data.categories = this.checkboxGroup;
        console.log(data);
      }
         
    },
    mounted() {
      this.setWords();
    },
    watch: {
      min(newMin) {
        if (this.max < newMin) {
          console.log(newMin)
          this.max = newMin;
        }
      },
      '$route.params.words'(words) {
        console.log('route.params.words ',  words);
        this.setWords();
      },
    },
    computed: {
      orderedCategories: function () {
        return _.sortBy(this.$parent.categories, 'alias');
      }
    },
  }

</script>
