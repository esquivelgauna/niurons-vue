<template>
  <div class="container ">

    <!-- <h3 class="is-size-3 ">Crea tu Lyf</h3> -->
    <div class="columns is-centered has-margin-y-4">
      <div class="column is-8 is-rounded has-shadow has-padding-3   ">
        <progress class="progress is-primary" value="20" max="100"> </progress>
        <h4 class="is-size-4 has-text-primary "> Datos generales del Lyf </h4>
        <div class="columns is-multiline ">
          <div class="column is-full ">
            <div class="field">
              <label class="label">Título</label>
              <div class="control">
                <input class="input" type="text" placeholder="Título" v-model="title">
              </div>
              <div class="level">
                <div class="level-left">
                  <span class="help is-success ">Ponle un titulo llamativo a tu servicio </span>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <span class="help ">  {{ title.length }} /50  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-6 ">

            <b-field label="Categoría">
              <b-select placeholder="Selecciona una Categoría " v-model="categorie" expanded>
                <option v-for="categorie in ordCat " :value="categorie.id" :key="categorie.id">
                  {{ categorie.alias }}
                </option>
              </b-select>
            </b-field>

          </div>
          <div class="column is-6 ">
            <b-field label="Subcategoría">
              <b-select placeholder="Selecciona una Subcategoría " v-model="subcat" expanded>
                <option v-for="subcat in ordSubCats " :value="subcat.id" :key="subcat.id">
                  {{ subcat.alias }}
                </option>
              </b-select>
            </b-field>

          </div>
          <div class="column is-full ">
            <div class="field">
              <label class="label">Descripción</label>
              <div class="control">
                <textarea class="textarea" placeholder="Descripción" v-model="description"></textarea>
              </div>
              <div class="level">
                <div class="level-left">
                  <span class="help is-success ">Mínimo 30 caracteres </span>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <span class="help ">  {{ description.length }} /2000  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-full ">
            <b-field label="Palabras clave">
              <b-taginput v-model="tags" ellipsis maxtags="10" maxlength="20" icon="label" placeholder="Agrega palabra/s clave">
              </b-taginput>
            </b-field>

          </div>
          <div class="column is-full ">
            <div class="field">
              <label class="label">Requerimientos</label>
              <div class="control">
                <textarea class="textarea" placeholder="Requerimientos" v-model="req"></textarea>
              </div>
              <div class="level">
                <div class="level-left">
                  <span class="help is-success ">Agrega al menos un requerimiento </span>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <span class="help ">  {{ req.length }} /500  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class=" has-margin-y-3">
        <div class="field is-grouped is-grouped-right">
          <p class="control">
            <a class="button is-primary">
              Siguiente
            </a>
          </p>
        </div>
      </div>


    </div>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        // Lyf: {
        title: '',
        categorie: null,
        subcat: null,
        description: '',
        tags: null,
        req: '',
        // },
        categories: this.$parent.categories,
        subCats: [],
        condition: true,
      }
    },
    methods: {
      GetSubCategories: function (idCat) {
        this.subcat = null;
        for (let index in this.categories) {
          if (idCat == this.categories[index]['id']) {
            // console.log( this.categories[index]['id'] );
            this.subCats = this.categories[index]['subCats'];
            break;
          }
        }
      },
    },
    computed: {
      ordCat: function () {
        return _.sortBy(this.categories, 'alias');
      },

      ordSubCats: function () {
        return _.sortBy(this.subCats, 'alias');
      }

    },
    watch: {
      categorie: function (idCat) {
        // console.log(idCat);
        this.GetSubCategories(idCat);
      }
    },

  }

</script>
<style>
</style>
