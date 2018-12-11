<template>
  <div class=" container ">
    <h3 class="is-size-3">Busqueda</h3>
    <hr class=" has-margin-y-3 ">
    
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
              <label for=""> Min ${{min}} </label>
              <div class="control">
                <input class="input" type="number" :min="rMin" :max="rMax" v-model="min" value="0">
              </div>
            </div>

          </div>
          <div class="column is-6">
            <div class="field">
              <label for=" "> Max ${{max}} </label>
              <div class="control">
                <input class="input disabled " type="number" :min="rMin" :max="rMax" v-model="max" value="200">
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class=" button input is-success " @click=" SearchWords() ">
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div class="column is-6-mobile is-8-tablet ">
        <h3 class="is-size-4">Resultados</h3>
        <div class="columns is-multiline " v-if=" condition ">
          <div class="column is-12-mobile is-6-tablet is-4-desktop " v-for=" Lyf in Lyfs " :key=" Lyf.idLyf ">
            <niu-lyf v-bind:Lyf="Lyf">
            </niu-lyf>
          </div>
          <div class="column is-12 " v-if="moreLyfs">
            Cargar mas
          </div>
          <div class="column is-full has-text-centered has-background-grey " v-else>
            Son todos
          </div>
        </div>
        <div v-else>
          <div v-if=" condition == false && noLyfs == true ">
            <h3>No se encontraron Lyfs , crea uno Pulsando aqui </h3>
          </div>
          <div v-else>
            Cargando.....
          </div>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
  import Lyfv from '@/components/views/view_lyf.vue'
  export default {
    components: {
      'niu-lyf': Lyfv
    },
    data() {
      return {
        min: 0,
        max: 200,
        rMin: 0,
        rMax: 200,
        Lyfs: [],
        search: null,
        categories: [],
        checkboxGroup: [],
        noLyfs: false,
        condition: false,
        moreLyfs: true,
      }
    },
    methods: {
      SetWords: function () {
        if (this.$route.params.words) {
          this.search = this.$route.params.words;
        } else {
          this.search = '';
        }
        this.SearchWords();
      },
      SearchWords: function () {
        let data = {};

        if (this.min > this.max) {
          data.min = this.max;
          data.max = this.min;
        } else {
          data.min = this.min;
          data.max = this.max;
        }


        data.words = this.search;
        data.categories = this.checkboxGroup;

        this.condition = false;
        this.$http.get('Lyfs/Search/Categories', {
          params: {
            data
          }
        }).then(response => {
          console.log('Search Results :', response.body);
          if (response.body.lyfs.length > 0) {
            this.Lyfs = response.body.lyfs;
            this.condition = true;
            if (response.body.lyfs.length < 12) {
              this.moreLyfs = false;
            }
          } else {
            this.noLyfs = true;
            this.Lyfs = [];
          }

        }, response => {
          console.log('Error:', response);
        });

        console.log(data);
      }

    },
    beforeMount() {
      this.SetWords();
    },
    watch: {
      min(newMin) {
        if (newMin > 200) {
          this.min = 200;
          this.max = 200;
        } else {
          if (this.max < newMin) {
            console.log(newMin)
            this.min = this.max;
            this.max = newMin;
          }
        }

      },
      '$route.params.words'(words) {
        console.log('route.params.words ', words);
        this.SetWords();
      },
    },
    computed: {
      orderedCategories: function () {
        return _.sortBy(this.$parent.categories, 'alias');
      }
    },
  }

</script>
