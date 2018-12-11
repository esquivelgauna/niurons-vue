<template>
  <div class="container">
    <div class="column is-full " >
      <h3> Categoria: {{ $route.params.alias }} </h3>
      <p>
        <strong>Descripcion: </strong>
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Aspernatur, amet ex! Quos perspiciatis
        inventore nisi. Ipsum deleniti sint doloribus obcaecati, fugiat nulla
        minima reprehenderit quidem incidunt! Illo in molestias iure.
      </p>

    </div>

    <div class="column">

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
            <div v-for=" subCat in orderedSubCat  " :key=" subCat.url ">
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
              <button class="button is-text is-hidden" @click=" checkboxGroup =[]">Limpiar</button>
            </div>
            <div class="control">
              <button class="button is-success ">Buscar</button>
            </div>
          </div>


        </div>

        <div class="column is-6  is-9-tablet is-9-desktop " v-if=" condition ">
          <h3 class=" is-size-3 ">Lifs </h3>
          <div class="columns is-multiline ">

            <div class="column is-3 has-shadow " v-for=" Lyf in Lyfs " :key=" Lyf.idLyf " >
              <niu-lyf v-bind:Lyf ="Lyf"  >
              </niu-lyf>
            </div>

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
    components:{
      'niu-lyf': Lyfv
    },
    data() {
      return {
        Data : {},
        Lyfs : [],
        noLyfs: false,
        condition: false,
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
      },
      getLyfs: function( ) {
        
        this.$http.get('Lyfs/Categorie', {
          params: {
            id: this.$route.params.id
          }
        }).then(response => {
          console.log('Lyfs-Categorie:', response.body.lyfs);
          if( response.body.lyfs.length > 0 ){
            this.Lyfs = response.body.lyfs;
            this.condition = true;
          }else{
            
            this.noLyfs = true;
          }
          
        }, response => {
          console.log('Error:', response);
        });
      }

    },
    computed: {
      orderedSubCat: function () {
        return _.sortBy(this.subCategories, 'alias');
      }
    },
    mounted() {
      
      this.getSubCategories();
      this.getLyfs();
    },
    watch: {
      '$route'(to, from) {
        this.Lyfs = [];
        this.condition = false;
        this.noLyfs = false;
        // this.Data.Lyfs = [];
        this.getSubCategories();
        this.getLyfs();
        console.log( this.$route.params );

      }
    }


  }

</script>