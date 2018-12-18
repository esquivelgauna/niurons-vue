<template>
  <div class="container ">
    <div class="columns is-mobile is-centered has-margin-y-4">
      <div class="column is-8-desktop is-10-tablet is-11-mobile  is-rounded has-shadow has-padding-3   ">
        <div>
          <div class=" relative ">
            <progress class="progress is-primary" :value="Lyfprogress" max="100" id="lyf-progress"> </progress>

          </div>
          <ul class="level is-mobile ">
            <li class="level-item  ">
              <button class=" button is-primary is-circle ">
                <fa-i icon='list-alt'></fa-i>
              </button>
            </li>
            <li class=" level-item ">
              <button class=" button is-primary is-circle ">
                <fa-i icon='question'></fa-i>
              </button>
            </li>
            <li class=" level-item ">
              <button class=" button is-primary is-circle ">
                <fa-i icon='image'></fa-i>
              </button>
            </li>
            <li class=" level-item ">
              <button class=" button is-primary is-circle ">
                <fa-i icon='boxes'></fa-i>
              </button>
            </li>
            <li class=" level-item ">
              <button class=" button is-primary is-circle ">
                <fa-i icon='magic'></fa-i>
              </button>
            </li>
            <li class=" level-item ">
              <button class=" button is-primary is-circle ">
                <fa-i icon='flag'></fa-i>
              </button>

            </li>
          </ul>

        </div>
        <!-- Generals -->
        <div :class=" { 'has-none ':Lyfprogress > 8 } " class=" animated fadeIn ">
          <h4 class="is-size-4 has-text-primary "> Datos generales del Lyf </h4>
          <div class="columns is-multiline is-mobile">
            <div class="column is-full ">
              <div class="field">
                <label class="label">Título</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Título" v-model="myLyf.generals.title">
                </div>
                <div class="level is-mobile">
                  <div class="level-left">
                    <span class="help is-primary ">Mínimo 10 caracteres </span>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="help "> {{ myLyf.generals.title.length }} /50 </span>
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
                <b-select placeholder="Selecciona una Subcategoría " v-model="subcategorie" expanded>
                  <option v-for=" subC in ordSubCats " :value="subC.id" :key="subC.id">
                    {{ subC.alias }}
                  </option>
                </b-select>
              </b-field>

            </div>
            <div class="column is-full ">
              <div class="field">
                <label class="label">Descripción</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Descripción" v-model="myLyf.generals.description"></textarea>
                </div>
                <div class="level is-mobile">
                  <div class="level-left">
                    <span class="help is-primary ">Mínimo 30 caracteres </span>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="help "> {{ myLyf.generals.description.length }} /2000 </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-full ">
              <b-field label="Palabras clave">
                <b-taginput v-model="myLyf.generals.tags" ellipsis maxtags="10" maxlength="10" icon="label" placeholder="Agrega palabra/s clave">
                </b-taginput>
              </b-field>

            </div>
            <div class="column is-full ">
              <div class="field">
                <label class="label">Requerimientos</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Requerimientos" v-model="myLyf.generals.req"></textarea>
                </div>
                <div class="level is-mobile ">
                  <div class="level-left">
                    <span class="help is-primary ">Agrega al menos un requerimiento </span>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="help "> {{ myLyf.generals.req.length }} /500 </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class=" has-margin-y-3">
          <div class="level is-mobile ">
            <div class="level-left">
            </div>
            <div class="level-right">
              <div class="level-item">
                <button class="button is-primary is-rounded " @click=" SaveGenerals() " :class="{'is-loading':isLoading} ">
                  <fa-i icon='save'></fa-i> <span class="has-margin-x-2"> Siguiente </span>
                </button>
              </div>
            </div>
          </div>

        </div>
        <!-- ['Modal', 'Title', 'Icon', 'Errors'], -->
        <modal-errors :Modal.sync="modalError" Title='Errores del Lyf ' Icon='exclamation-circle' @close=" modalError = false "
          :Errors='errors'></modal-errors>
      </div>
    </div>
  </div>
</template>
<script>
  import modal_error from '@/components/modals/modal_lyf_error.vue'
  import {
    error
  } from 'util';
  export default {
    data() {
      return {
        myLyf: {
          generals: {
            id: null,
            title: '',
            categorie: null,
            subcat: null,
            description: '',
            tags: null,
            req: '',
          },
          questions: [],
          images: {
            temp: [],
            up: [],
          },
          packages: {
            list: [],
            type: 4,
            basic: {
              condition: true,
              package: {},
            },
            standard: {
              condition: true,
              package: {},
            },
            premium: {
              condition: true,
              package: {},
            },
          },
          extras: [],
        },
        categorie: null,
        subcategorie: null,
        categories: this.$parent.categories,
        subCats: [],

        errors: [],
        modalError: false,
        isLoading: false,
        Lyfprogress: 8,
      }
    },
    components: {
      'modal-errors': modal_error,
    },
    methods: {
      GetSubCategories: function (idCat) {
        // this.subcategorie = null;
        for (let index in this.categories) {
          if (idCat == this.categories[index]['id']) {
            console.log( this.categories[index]['id'] );
            this.subCats = this.categories[index]['subCats'];
            this.subcategorie = this.categories[index]['subCats'][0].id;
            // console.log( this.categories[index]['subCats'] );
            break;
          }
        }
      },
      SaveGenerals: function () {
        this.isLoading = true;
        let constraints = {
          title: {
            presence: {
              message: "Falta el Título "
            },
            length: {
              minimum: 10,
              maximum: 50,
              message: "Título: Mínimo 10  , Máximo 50 Caracteres"
            }
          },
          categorie: {
            presence: {
              message: "Recuerda seleccionar una Categoría "
            },
          },
          subcat: {
            presence: {
              message: "Recuerda seleccionar una Subcategoría "
            },
          },
          description: {
            presence: {
              message: "Falta la descripción "
            },
            length: {
              minimum: 30,
              maximum: 500,
              message: "Descripción: Mínimo 30  , Máximo 500 Caracteres"
            }
          },
          tags: {
            presence: {
              message: "Faltan las palabras clave "
            },
            length: {
              minimum: 2,
              maximum: 10,
              message: "Palabras clave: Mínimo 2 , Máximo 10 "
            }
          },
          req: {
            presence: {
              message: "Faltan los requerimientos "
            },
            length: {
              minimum: 20,
              maximum: 500,
              message: "Requerimientos : Mínimo 20 , Máximo 500 Caracteres"
            }
          }

        };
        console.log(this.myLyf.generals);
        validate.async(this.myLyf.generals, constraints, {
          fullMessages: false
        }).then(
          (success) => {
            //
            this.$http.post('user/Lyf/Create/Generals', this.myLyf.generals).then(response => {
              console.log(response.body);
              if (response.body.status) {
                if (response.body.updated) {

                } else {
                  this.myLyf.generals.id = response.body.id;
                  this.$router.push({
                    name: 'Lyf/Edit',
                    params: {
                      id: response.body.id
                    }
                  });
                }
                this.Lyfprogress += 16;

              } else {
                alert('No se guardo , inenta de nuevo');
              }
              this.isLoading = false;

            }, err => {

              console.log('Error:', err);
              this.isLoading = false;
            });


          }, (errors) => {
            this.errors = errors;
            console.error(errors);
            this.isLoading = false;
            this.modalError = true;
          }
        );

      },
    },
    computed: {
      ordCat: function () {
        return _.sortBy(this.categories, 'alias');
      },

      ordSubCats: function () {
        return _.sortBy(this.subCats, 'alias');
      },
    },
    watch: {
      categorie: function (idCat) {
        console.log
        this.myLyf.generals.categorie = idCat;
        this.GetSubCategories(idCat);

      },
      subcategorie: function (idSubcat) {

        this.myLyf.generals.subcat = idSubcat;

      },
    },
  }

</script>

<style>
  #lyf-progress {
    position: absolute;
    transform: translateY(400%);
    height: 0.25rem;

  }

  .relative {
    position: relative;
  }

  .dropbox {
    border: 2px solid #bbb;
    border-style: dashed;
    /* outline-style: r */
    /* outline: 2px dashed grey; /* the dash box */
    /* outline-offset: -5px;  */
    min-height: 200px;
    /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0;
    /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue;
    /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

</style>
