<template>
  <div class="container ">
    <div class="has-banner ">
      <img v-bind:src=" $host + '/imgcat/'+ $route.params.cat +'/banner.png' " alt="" class=" has-shadow img-w-200 ">
      <div class="container has-text-centered ">
        <h3 class=" has-text-white  is-size-3 is-size-3-tablet  is-size-4-mobile  "> Subcategoría: {{ subcategorie }}
        </h3>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-third is-5-tablet ">
        <h4 class=" is-size-4 is-size-4-tablet is-size-5-mobile  "> Filtrar resultados </h4>
        <hr class=" has-margin-y-2 ">
        <div class=" has-margin-l-4 ">
          <h5> Relaconados</h5>
          <ul class="has-margin-l-3">
            <li v-for=" (sub, index) in orderedSubCats " :key="index">
              <router-link :to="{ name: 'SubCategorie', params: { cat:  $route.params.cat , subCat: sub.url } }">
                {{sub.alias}} </router-link>
            </li>
          </ul>
          <hr class=" has-margin-y-2 ">
          <h5>Precio</h5>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static">
                      <fa-i icon='dollar-sign'></fa-i> Min
                    </a>
                  </p>
                  <p class="control is-expanded">
                    <input class="input" type="number" placeholder="5" min="5" max="200" v-model="search.min">
                  </p>
                </div>
              </div>

              <div class="field">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static">
                      <fa-i icon='dollar-sign' class=""></fa-i> Max
                    </a>
                  </p>
                  <p class="control is-expanded ">
                    <input class="input " type="number" placeholder="5" min="5" max="200" v-model="search.max">
                  </p>
                </div>
              </div>

              <div class="field ">
                <p class="control">
                  <button class=" button is-primary is-outlined is-circle " @click=" SearchLyfsSubcat() ">
                    <fa-i icon='search'></fa-i>
                  </button>
                </p>
              </div>


            </div>
          </div>

          <hr class=" has-margin-y-2 ">
          <div class=" has-text-centered ">
            <h5>Tiempo de entrega </h5>
            <small> De {{ search.timeRange }} días en adelante. </small>
            <div class="field">
              <div class="control">
                <input class="input has-margin-y-2 " type="range" placeholder="Text input" min="1" max="30" v-model=" search.timeRange">
              </div>
            </div>
          </div>


        </div>

      </div>
      <div class="column is-two-third is-7-tablet ">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h4 class=" is-size-4 is-size-4-tablet is-size-5-mobile  ">Lyfs</h4>

            </div>
          </div>
          <div class="level-left">
            <div class="level-item">
              <div class="field">
                <div class="control">
                  <div class="select is-rounded">
                    <select v-model="search.order" @change=" SearchLyfsSubcat() " >
                      <option :value="ttype.value" v-for=" (ttype,index) in  typeSelect" :key="index"> {{ ttype.name }}
                      </option>
                    </select>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <modal-errors :Modal.sync="modalError" Title='Errores de busqueda ' Icon='exclamation-circle' @close=" modalError = false "
      :Errors='errors'></modal-errors>

  </div>
</template>

<script>
  import modal_error from '@/components/modals/modal_lyf_error.vue'
  export default {
    data() {
      return {
        search: {
          min: 5,
          max: 200,
          time: 1,
          idSubcat: null,
          order: 'top',
        },
        typeSelect: [{
            name: 'Destacados',
            value: 'best'
          },
          {
            name: 'Más vendidos',
            value: 'top'
          },
        ],
        categorie: null,
        subcategorie: null,
        alias: null,
        subCategories: [],
        modalError: false,
        errors:null,
      }
    },
    components: {
      'modal-errors': modal_error,
    },

    methods: {
      GetSubCat: function () {
        for (let index in this.$parent.categories) {
          if (this.$route.params.cat == this.$parent.categories[index]['url']) {
            this.subCategories = this.$parent.categories[index]['subCats'];
            for (let subindex in this.$parent.categories[index]['subCats']) {
              if (this.$route.params.subCat == this.$parent.categories[index]['subCats'][subindex]['url']) {
                this.subcategorie = this.$parent.categories[index]['subCats'][subindex]['alias'];
                this.search.idSubcat = this.$parent.categories[index]['subCats'][subindex]['id'];
                break;
              }
            }
            break;
          }
        }
      },
      SearchLyfsSubcat() {
        let constraints = {

          idSubcat: {
            presence: {
              message: "ID: Recurda agregar el ID "
            }
          },
          min: {
            presence: {
              message: "Costo mínimo : Recurda agregar el precio "
            },
            numericality: {
              greaterThanOrEqualTo: 5,
              lessThanOrEqualTo: 200,
              notLessThanOrEqualTo: "Costo mínimo: Máximo $200 ",
              notGreaterThanOrEqualTo: "Costo mínimo: Mínimo $5 ",
            }
          },
          min: {
            presence: {
              message: "Costo maximo : Recurda agregar el precio "
            },
            numericality: {
              greaterThanOrEqualTo: 5,
              lessThanOrEqualTo: 20,
              notLessThanOrEqualTo: "Costo maximo: Máximo $200 ",
              notGreaterThanOrEqualTo: "Costo maximo: Mínimo $5 ",
            }
          },
          time: {
            presence: {
              message: "Entrega: Recuerda agregar el tiempo de entrega "
            },
            numericality: {
              greaterThanOrEqualTo: 1,
              lessThanOrEqualTo: 30,
              notLessThanOrEqualTo: "Entrega: Máximo 30 días ",
              notGreaterThanOrEqualTo: "Entrega: Mínimo  1 día ",
            }
          },
          order: {
            presence: {
              message: "Subtitulo: Recuerda agregar el titulo "
            },
            inclusion: {
              within: {
                "top": "top",
                "best": "best",
              },
              message: "^Orden no soportado:  %{value}"
            }
          },

        };
        validate.async(this.search, constraints, {
          fullMessages: false
        }).then(
          (success) => {
            console.log(success);
            this.$http.get('Lyfs/Search/Subcategorie', {
                params: {
                  search: this.search,
                }
              })
              .then(response => {

                console.log(response.body);

                if (response.body.status) {

                } else {
                  alert('Error al consultar');
                }
              }, err => {
                console.log('Error:', err);
              });
          },
          (errors) => {
            this.errors = errors;
            this.modalError = true;
            console.error(errors);
          }
        );

      },



    },
    computed: {
      orderedSubCats: function () {
        return _.sortBy(this.subCategories, 'alias');
      },
      orderCats: function () {
        return _.sortBy(this.$parent.categories, 'alias');
      }
    },
    mounted() {
    //   console.log(this.$route.params);
      this.GetSubCat();
    },
    watch: {
      '$route'(to, from) {
        this.GetSubCat();
        console.log(to, from);
        // this.GetSubCategories();
      }
    }


  }

</script>

<style>
  .has-banner {
    position: relative;
    /* width: 100%; */
  }

  .has-banner>.container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 0;
    height: 100%;
    width: 100%;
  }

  input[type=range] {
    -webkit-appearance: none;
    /* margin: 18px 0; */
    width: 100%;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: .25rem;
    cursor: pointer;
    animate: 0.2s;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    background: lightgrey;
    border-radius: .125rem;
    /* border: 0.2px solid #010101; */
  }

  input[type=range]::-webkit-slider-thumb {
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    /* border: 1px solid #000000; */
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    background: #008df0;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -.25rem;
  }

</style>
