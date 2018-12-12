<template>
  <div class="container ">

    <!-- <h3 class="is-size-3 ">Crea tu Lyf</h3> -->
    <div class="columns is-centered has-margin-y-4">
      <div class="column is-8 is-rounded has-shadow has-padding-3   ">
        <div>
          <div class=" relative ">
            <progress class="progress is-primary" :value="Lyfprogress" max="100" id="lyf-progress"> </progress>

          </div>
          <ul class="level">
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

        <div :class=" { 'has-none ':Lyfprogress > 8 } " class=" animated fadeIn ">
          <h4 class="is-size-4 has-text-primary "> Datos generales del Lyf </h4>
          <div class="columns is-multiline ">
            <div class="column is-full ">
              <div class="field">
                <label class="label">Título</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Título" v-model="myLyf.title">
                </div>
                <div class="level">
                  <div class="level-left">
                    <span class="help is-success ">Ponle un titulo llamativo a tu servicio </span>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="help "> {{ myLyf.title.length }} /50 </span>
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
                  <textarea class="textarea" placeholder="Descripción" v-model="myLyf.description"></textarea>
                </div>
                <div class="level">
                  <div class="level-left">
                    <span class="help is-success ">Mínimo 30 caracteres </span>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="help "> {{ myLyf.description.length }} /2000 </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-full ">
              <b-field label="Palabras clave">
                <b-taginput v-model="myLyf.tags" ellipsis maxtags="10" maxlength="20" icon="label" placeholder="Agrega palabra/s clave">
                </b-taginput>
              </b-field>

            </div>
            <div class="column is-full ">
              <div class="field">
                <label class="label">Requerimientos</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Requerimientos" v-model="myLyf.req"></textarea>
                </div>
                <div class="level">
                  <div class="level-left">
                    <span class="help is-success ">Agrega al menos un requerimiento </span>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="help "> {{ myLyf.req.length }} /500 </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class=" has-margin-y-3">
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click=" SaveGenerals() ">
                Siguiente
              </a>
            </p>
          </div>
        </div>

        <div :class=" { 'has-none ':Lyfprogress < 16 || Lyfprogress > 32  } " class=" animated fadeIn ">
          <h4 class="is-size-4 has-text-primary "> Preguntas frecuentes </h4>
          <small>
            <p>
              Agrega preguntas y respuestas que probalemente las personas harían sobre tu LYF.
            </p>
            <p>*Agrega al menos solo una (Máximo 5).</p>
          </small>

          <div class="columns is-multiline ">
            <div class="column is-full ">
              <div class="field">
                <label class="label">Pregunta</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Título" v-model="question">
                </div>
                <div class="level">
                  <div class="level-left">
                    <span class="help is-success "> Minimo 5 caracteres </span>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="help "> {{ question.length }} /100 </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-full ">
              <div class="field">
                <label class="label">Respuesta</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Título" v-model="answer">
                </div>
                <div class="level">
                  <div class="level-left">
                    <span class="help is-success "> Minimo 5 caracteres </span>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="help "> {{ answer.length }} /400 </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-full ">
              <div class="field is-grouped is-grouped-right">
                <p class="control">
                  <a class="button is-success is-rounded" @click=" AddQuestion() ">
                    Agregar
                  </a>
                </p>
              </div>
              <hr class="has-margin-y-2">
            </div>

            <!-- Questions and answers -->
            <div class="column is-full ">
              <div class="columns is-multiline ">

                <div class="column is-full " v-for=" (question, index ) in myLyf.questions " :key="question">
                  <div class="level">
                    <div class="level-lef">
                      <p>
                        <strong> Pregunta: </strong> {{ question.question }}
                        <br>
                        <strong> Respuesta: </strong> {{ question.answer }}
                      </p>
                    </div>
                    <div class="level-right">
                      <button @click=" DeleteQuestion (index ) ">
                        <fa-i icon='trash'></fa-i>
                      </button>
                    </div>
                  </div>
                  <hr class="has-margin-y-2">



                </div>
              </div>
            </div>



          </div>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click=" SaveQuestions() ">
                Siguiente
              </a>
            </p>
          </div>
        </div>
        <div :class=" { 'has-none ':Lyfprogress < 32 || Lyfprogress > 48  } " class=" animated fadeIn ">
          <h4 class="is-size-4 has-text-primary "> Galería </h4>
          <small>
            <p>
              Las imágenes que cargues, servirán de referencia para mostrar a las personas una muestra de tu trabajo,
              así que sube las mejores.
            </p>
            <p> Agrega al menos 1.Peso máximo por imagén 2 Mb.</p>
          </small>

          <section>
            <div class="dropbox is-rounded has-background-white-ter ">
              <input type="file" multiple @change="onFileChange($event);  " accept="image/*" class="input-file">
              <p>
                <fa-i icon='image'></fa-i> <strong class=" has-text-primary "> Buscar imágenes </strong> o arrastra y sueltalas aquí.
              </p>
            </div>
          </section>
          <br>
          <div class="columns is-multiline has-text-centered is-variable is-1">
            <div class="column is-3" v-for="img in myLyf.imgs" :key=" img.url ">
              <img :src="img.url" alt="" class=" img-w-100 is-rounded animated fadeIn ">
            </div>
          </div>


          <hr class=" has-margin-y-3 ">
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click=" SaveImages() ">
                Siguiente
              </a>
            </p>
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
        myLyf: {
          title: '',
          categorie: null,
          subcat: null,
          description: '',
          tags: null,
          req: '',
          questions: [],
          imgs: []
        },
        question: '',
        answer: '',
        categorie: null,
        subcategorie: null,
        categories: this.$parent.categories,
        subCats: [],
        condition: true,
        Lyfprogress: 48,
      }
    },
    methods: {
      GetSubCategories: function (idCat) {
        this.subcat = null;
        for (let index in this.categories) {
          if (idCat == this.categories[index]['id']) {
            // console.log( this.categories[index]['id'] );
            this.subCats = this.categories[index]['subCats'];
            // console.log( this.categories[index]['subCats'] );
            break;
          }
        }
      },
      SaveGenerals: function () {
        let devCon = {
          title: {
            presence: true,
            length: {
              minimum: 5,
              message: "Titulo: Minmo 20 Caracteres"
            }
          },
        }
        let constraints = {
          title: {
            presence: true,
            length: {
              minimum: 20,
              message: "Titulo: Minmo 20 Caracteres"
            }
          },
          categorie: {
            presence: {
              message: "Recuerda seleccionar una Categoria "
            },
          },
          subcat: {
            presence: {
              message: "Recuerda seleccionar una Subcategoria "
            },
          },
          description: {
            presence: {
              message: "Falta la decriipción "
            },
            length: {
              minimum: 20,
              message: "Minmo 20 Caracteres"
            }
          },
          tags: {
            presence: true,
          },
          req: {
            presence: true,
            length: {
              minimum: 20,
              message: "Requerimientos : Minmo 20 Caracteres"
            }
          }

        };
        validate.async(this.myLyf, devCon, {
          fullMessages: false
        }).then(
          (success) => {
            this.Lyfprogress += 16;
            console.info('Todo Bien');
            console.info(success);
          }, (error) => {
            console.error(error);
          }
        )

      },

      SaveQuestions: function () {
        if (this.myLyf.questions.length > 0) {
          this.Lyfprogress += 16;
        }
      },
      SaveImages: function () {
        console.log(this.myLyf.imgs);
        if (this.myLyf.imgs.length > 0) {
          this.Lyfprogress += 16;
        }
      },

      onFileChange: function (e) {

        for (let index in e.target.files) {
          if (e.target.files[index].size < 5000000) {
            this.myLyf.imgs.push({
              file: e.target.files[index],
              url: URL.createObjectURL(e.target.files[index])
            });
          }

          // this.myLyf.imgs[index].file = ;
          // this.myLyf.imgs[index].url  = URL.createObjectURL( e.target.files[index] );
        }
        console.log(e.target.files);

      },





      AddQuestion: function () {
        console.log(this.question, this.answer);
        this.myLyf.questions.push({
          question: this.question,
          answer: this.answer
        })
        this.answer = '';
        this.question = '';
        console.log(this.myLyf.questions);
      },

      DeleteQuestion: function (index) {
        this.myLyf.questions.splice(index, 1);
        console.log(this.myLyf.questions);
      }
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
        console.log
        this.myLyf.categorie = idCat;
        this.GetSubCategories(idCat);

      },
      subcategorie: function (idSubcat) {

        this.myLyf.subcat = idSubcat;

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
