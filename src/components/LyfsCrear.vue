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
        <!-- Questions -->
        <div :class=" { 'has-none ':Lyfprogress < 16 || Lyfprogress > 32  } " class=" animated fadeIn ">
          <h4 class="is-size-4 has-text-primary "> Preguntas frecuentes </h4>
          <small>
            <p>
              Agrega preguntas y respuestas que probalemente las personas harían sobre tu LYF.
            </p>
            <p>*Agrega al menos solo una (Máximo 5).</p>
          </small>

          <div class="columns is-multiline is-mobile ">
            <div class="column is-full ">
              <div class="field">
                <label class="label">Pregunta</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Pregunta" v-model="questions.question">
                </div>
                <div class="level is-mobile ">
                  <div class="level-left">
                    <span class="help is-primary "> Minimo 5 caracteres </span>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="help "> {{ questions.question.length }} /100 </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-full ">
              <div class="field">
                <label class="label">Respuesta</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Respuesta" v-model="questions.answer">
                </div>
                <div class="level is-mobile">
                  <div class="level-left">
                    <span class="help is-primary "> Minimo 5 caracteres </span>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="help "> {{ questions.answer.length }} /400 </span>
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
                        <strong> Pregunta: </strong> ¿ {{ question.question }} ?
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

          <div class="level is-mobile ">
            <div class="level-left">
              <div class="level-item">
                <button class="button is-rounded " @click=" LyfReturn() ">
                  <fa-i icon='arrow-left'></fa-i> <span class="has-margin-x-2"> Atrás </span>
                </button>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button class="button is-primary is-rounded " @click=" SaveQuestions() ">
                  <fa-i icon='save'></fa-i> <span class="has-margin-x-2"> Siguiente </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Images -->
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
                <fa-i icon='image'></fa-i> <strong class=" has-text-primary "> Buscar imágenes </strong> o arrastra y
                sueltalas aquí.
              </p>
            </div>
          </section>
          <br>
          <div class="columns is-multiline is-mobile has-text-centered is-variable is-1">
            <div class="column is-3" v-for="img in myLyf.imgs" :key=" img.url ">
              <img :src="img.url" alt="" class=" img-w-100 is-rounded animated fadeIn ">
            </div>
          </div>


          <hr class=" has-margin-y-3 ">
          <div class="level is-mobile ">
            <div class="level-left">
              <div class="level-item">
                <button class="button is-rounded " @click=" LyfReturn() ">
                  <fa-i icon='arrow-left'></fa-i> <span class="has-margin-x-2"> Atrás </span>
                </button>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button class="button is-primary is-rounded " @click=" SaveImages() ">
                  <fa-i icon='save'></fa-i> <span class="has-margin-x-2"> Siguiente </span>
                </button>
              </div>
            </div>
          </div>

        </div>
        <!-- Packages -->
        <div :class=" { 'has-none ':Lyfprogress < 48 || Lyfprogress > 64   } " class=" animated fadeIn ">
          <div class="columns is-mobile ">
            <div class="column is-full ">
              <h4 class="is-size-4 has-text-primary "> Paquetes </h4>
              <small>
                <p>
                  Selecciona los paquetes que deseas crear (selecciona almenos uno).
                </p>
              </small>

              <div class="buttons is-centered is-mobile has-margin-y-3 ">
                <span class="button is-rounded is-primary " @click=" myLyf.packages.type = 1, AddPackage('basic') ">
                  <strong>
                    BÁSICO</strong> </span>
                <span class="button is-rounded is-primary " @click=" myLyf.packages.type = 2, AddPackage('standard') ">
                  <strong>
                    ESTÁNDAR </strong> </span>
                <span class="button is-rounded is-primary " @click=" myLyf.packages.type = 3, AddPackage('premium') ">
                  <strong>
                    PREMIUM </strong> </span>
              </div>

              <div class="columns is-multiline is-mobile animated fadeIn " :class=" { 'has-none ':myLyf.packages.type != 1 } ">
                <div class="column is-full">
                  <hr class=" has-margin-y-1 ">
                  <div class="level is-marginless is-mobile">
                    <div class="level-left">
                      <div class="level-item">
                        <h4 class=" is-size-4  "> Básico </h4>
                      </div>
                    </div>
                    <div class="level-right">
                      <button class="button is-small is-circle  is-danger is-outlined " @click=" myLyf.packages.type = 4, DeletePackage('basic') ">
                        <fa-i icon='trash'></fa-i>
                      </button>

                    </div>
                  </div>
                  <hr class=" has-margin-y-1 ">
                </div>
                <div class="column is-full">
                  <div class="field">
                    <label class="label"> Subtitulo </label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Título" v-model="myLyf.packages.basic.package.subtitle">
                    </div>
                    <div class="level is-mobile ">
                      <div class="level-left">
                        <span class="help is-primary "> Mínimo 5 caracteres
                        </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                          <span class="help "> {{ myLyf.packages.basic.package.subtitle.length }} /50 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label"> Costo </label>
                    <div class="control">
                      <input class="input" type="number" min="5" max="20" placeholder="Título" v-model="myLyf.packages.basic.package.cost">
                    </div>
                    <div class="level">
                      <div class="level-left">
                        <span class="help is-primary "> $5 - $20 </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label"> Entrega (días) </label>
                    <div class="control">
                      <input class="input" type="number" min="1" placeholder="Tiempo de entrega" v-model="myLyf.packages.basic.package.time">
                    </div>
                    <div class="level is-mobile">
                      <div class="level-left">
                        <span class="help is-primary "> 1 - 30 días </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label"> Revisiones </label>
                    <div class="control">
                      <input class="input" type="number" min="1" placeholder="Revisiones" v-model="myLyf.packages.basic.package.revisions">
                    </div>
                    <div class="level">
                      <div class="level-left">
                        <span class="help is-primary "> Mínimo 1 </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-full">
                  <div class="field">
                    <label class="label"> Descripción </label>
                    <div class="control">
                      <textarea class="textarea is-primary" placeholder="Descripción" v-model="myLyf.packages.basic.package.description"></textarea>
                    </div>
                    <div class="level is-mobile">
                      <div class="level-left">
                        <span class="help is-primary "> Mínimo 10 caracteres
                        </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                          <span class="help "> {{ myLyf.packages.basic.package.description.length }} /200 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div class="columns is-multiline is-mobile animated fadeIn " :class=" { 'has-none ':myLyf.packages.type != 2  } ">
                <div class="column is-full">
                  <hr class=" has-margin-y-1 ">
                  <div class="level is-marginless">
                    <div class="level-left">
                      <div class="level-item">
                        <h4 class=" is-size-4  "> Estándar </h4>
                      </div>
                    </div>
                    <div class="level-right">
                      <button class="button is-small is-circle  is-danger is-outlined " @click=" myLyf.packages.type = 4 , DeletePackage('standard')  ">
                        <fa-i icon='trash'></fa-i>
                      </button>

                    </div>
                  </div>
                  <hr class=" has-margin-y-1 ">
                </div>
                <div class="column is-full">
                  <div class="field">
                    <label class="label"> Subtitulo </label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Título" v-model="myLyf.packages.standard.package.subtitle">
                    </div>
                    <div class="level">
                      <div class="level-left">
                        <span class="help is-primary "> Ponle un subtitulo llamativo a tu servicio </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                          <span class="help "> {{ myLyf.packages.standard.package.subtitle.length }} /50 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label"> Costo </label>
                    <div class="control">
                      <input class="input" type="number" min="5" max="20" placeholder="Título" v-model="myLyf.packages.standard.package.cost">
                    </div>
                    <div class="level">
                      <div class="level-left">
                        <span class="help is-primary "> Costo minimo: $5 , costo maximo: $20 </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label"> Tiempo de entrega (días) </label>
                    <div class="control">
                      <input class="input" type="number" min="1" placeholder="Tiempo de entrega" v-model="myLyf.packages.standard.package.time">
                    </div>
                    <div class="level">
                      <div class="level-left">
                        <span class="help is-primary "> Mínimo 1 día </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label"> Revisiones </label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Revisiones" v-model="myLyf.packages.standard.package.revisions">
                    </div>
                    <div class="level">
                      <div class="level-left">
                        <span class="help is-primary "> Mínimo 1 Revision </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-full">
                  <div class="field">
                    <label class="label"> Descripción </label>
                    <div class="control">
                      <textarea class="textarea is-primary" placeholder="Descripción" v-model="myLyf.packages.standard.package.description"></textarea>
                    </div>
                    <div class="level">
                      <div class="level-left">
                        <span class="help is-primary "> Caracteristicas del servicio o producto </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                          <span class="help "> {{ myLyf.packages.standard.package.description.length }} /200 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div class="columns is-multiline is-mobile animated fadeIn " :class=" { 'has-none ':myLyf.packages.type != 3  } ">
                <div class="column is-full">
                  <hr class=" has-margin-y-1 ">
                  <div class="level is-marginless">
                    <div class="level-left">
                      <div class="level-item">
                        <h4 class=" is-size-4  "> Premium </h4>
                      </div>
                    </div>
                    <div class="level-right">
                      <button class="button is-small is-circle  is-danger is-outlined " @click=" myLyf.packages.type = 4, DeletePackage('premium') ">
                        <fa-i icon='trash'></fa-i>
                      </button>

                    </div>
                  </div>
                  <hr class=" has-margin-y-1 ">
                </div>
                <div class="column is-full">
                  <div class="field">
                    <label class="label"> Subtitulo </label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Título" v-model="myLyf.packages.premium.package.subtitle">
                    </div>
                    <div class="level">
                      <div class="level-left">
                        <span class="help is-primary "> Ponle un subtitulo llamativo a tu servicio </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                          <span class="help "> {{ myLyf.packages.premium.package.subtitle.length }} /50 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label"> Costo </label>
                    <div class="control">
                      <input class="input" type="number" min="5" max="20" placeholder="Título" v-model="myLyf.packages.premium.package.cost">
                    </div>
                    <div class="level">
                      <div class="level-left">
                        <span class="help is-primary "> Costo minimo: $5 , costo maximo: $20 </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label"> Tiempo de entrega (días) </label>
                    <div class="control">
                      <input class="input" type="number" min="1" placeholder="Tiempo de entrega" v-model="myLyf.packages.premium.package.time">
                    </div>
                    <div class="level">
                      <div class="level-left">
                        <span class="help is-primary "> Mínimo 1 día </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label"> Revisiones </label>
                    <div class="control">
                      <input class="input" type="number" placeholder="Revisiones" v-model="myLyf.packages.premium.package.revisions">
                    </div>
                    <div class="level">
                      <div class="level-left">
                        <span class="help is-primary "> Mínimo 1 Revision </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-full">
                  <div class="field">
                    <label class="label"> Descripción </label>
                    <div class="control">
                      <textarea class="textarea is-primary" placeholder="Descripción" v-model="myLyf.packages.premium.package.description"></textarea>
                    </div>
                    <div class="level">
                      <div class="level-left">
                        <span class="help is-primary "> Caracteristicas del servicio o producto </span>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                          <span class="help "> {{ myLyf.packages.premium.package.description.length }} /200 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr class=" has-margin-y-3 ">
              <div class="level is-mobile ">
                <div class="level-left">
                  <div class="level-item">
                    <button class="button is-rounded " @click=" LyfReturn() ">
                      <fa-i icon='arrow-left'></fa-i> <span class="has-margin-x-2"> Atrás </span>
                    </button>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <button class="button is-primary is-rounded " @click=" SavePackages() ">
                      <fa-i icon='save'></fa-i> <span class="has-margin-x-2"> Siguiente </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
        <!-- Extras -->
        <div :class=" { 'has-none ':Lyfprogress < 64 || Lyfprogress > 80  } " class=" animated fadeIn ">
          <h4 class="is-size-4 has-text-primary "> Añadir extras (Opcional) </h4>
          <small>
            <p>
              Agrega extras que probalemente las personas comprarian sobre tu LYF.
            </p>
            <p>
              Maximo 5 extras.
            </p>
          </small>

          <div class="columns is-multiline ">
            <div class="column is-4 ">
              <div class="field">
                <label class="label">Título</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Título" v-model="extra.title">
                </div>
                <div class="level is-mobile ">
                  <div class="level-left">
                    <span class="help is-primary "> Minimo 5 caracteres </span>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="help "> {{ extra.title.length }} /100 </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-4 ">
              <div class="field">
                <label class="label">Descripción</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Descripción" v-model="extra.desc">
                </div>
                <div class="level is-mobile ">
                  <div class="level-left">
                    <span class="help is-primary "> Minimo 5 caracteres </span>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="help "> {{ extra.desc.length }} /400 </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-4 ">
              <div class="field">
                <label class="label">Costo</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Título" v-model="extra.cost">
                </div>
                <div class="level is-mobile ">
                  <div class="level-left">
                    <span class="help is-primary "> Minimo $7 </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="column is-full ">
              <div class="field is-grouped is-grouped-right">
                <p class="control">
                  <a class="button is-success is-rounded" @click=" AddExtra() ">
                    <fa-i icon='plus'></fa-i> <small class=" has-margin-x-2 "> AÑADIR </small>

                  </a>
                </p>
              </div>
              <hr class="has-margin-y-2">
            </div>

            <!-- Questions and answers -->
            <div class="column is-full ">
              <div class="columns is-multiline ">

                <div class="column is-full " v-for=" ( extra , index ) in myLyf.extras " :key="extra.desc">
                  <div class="level is-mobile">
                    <div class="level-lef">
                      <p>
                        <strong> Título: </strong> {{ extra.title }}
                        <br>
                        <strong> Descripción: </strong> {{ extra.desc }}
                        <br>
                        <strong> Costo: </strong> {{ extra.cost }}
                      </p>
                    </div>
                    <div class="level-right">
                      <button @click=" DeleteExtra (index ) ">
                        <fa-i icon='trash'></fa-i>
                      </button>
                    </div>
                  </div>
                  <hr class="has-margin-y-2">



                </div>
              </div>
            </div>



          </div>
          <div class="level is-mobile ">
            <div class="level-left">
              <div class="level-item">
                <button class="button is-rounded " @click=" LyfReturn() ">
                  <fa-i icon='arrow-left'></fa-i> <span class="has-margin-x-2"> Atrás </span>
                </button>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button class="button is-primary is-rounded " @click=" SaveExtras() ">
                  <fa-i icon='save'></fa-i> <span class="has-margin-x-2"> FINALIZAR </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Final -->
        <div :class=" { 'has-none ':Lyfprogress < 80 || Lyfprogress > 100  } " class=" animated fadeIn has-text-centered ">
          <div class="level">
            <div class="level-item">
              <!-- http://localhost:3000/assets/img/uploads/imgperfil/3WXOH5117_Avatar_44OMITBOL.jpg -->
              <img :src=" $host + '/assets/img/lyf_final.png' " alt="" class=" has-margin-y-3">
            </div>
          </div>
          <!-- <span> imagen lyf </span> -->
          <h4 class="is-size-4 has-text-primary "> !Genial, has terminado de crear tu LYF¡ </h4>
          <div class="level">
            <div class="level-item">

              <button class=" button is-primary is-rounded is-medium "> Ver mi lyf </button>
            </div>

          </div>
          <p>
            Ve a la <strong class="is-text-primary"> sección de LYF's </strong> para consultar, editar, cambiar el
            estatus o
            eliminar tus LYF's.
          </p>
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
            id: '',
            title: '',
            categorie: null,
            subcat: null,
            description: '',
            tags: null,
            req: '',
          },
          questions: [],
          imgs: [],
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
        questions: {
          question: '',
          answer: '',
        },
        extra: {
          title: '',
          desc: '',
          cost: 7,
        },
        categorie: null,
        subcategorie: null,
        categories: this.$parent.categories,
        subCats: [],
        package: {
          subtitle: '',
          cost: 5,
          time: 1,
          revisions: 1,
          description: '',
        },
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
                this.myLyf.generals.id = response.body.id;
              } else {
                alert('No se guardo , inenta de nuevo');
              }
              this.Lyfprogress += 16;
              this.isLoading = false;
              // console.info('Todo Bien');
              // console.info(success);
            }, err => {
              // error callback
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

      SaveQuestions: function () {
        let constraints = {
          questions: {
            presence: {
              message: "Agrega al menos solo una pregunta "
            },
            length: {
              minimum: 1,
              maximum: 5,
              message: " Mínimo 1 pregunta máximo 5 "
            }
          },
        };
        validate.async(this.myLyf, constraints, {
          fullMessages: false
        }).then(
          (success) => {
            this.Lyfprogress += 16;
            // console.info(' Pregunta correcta ');
            // console.info(success);
          }, (errors) => {
            this.modalError = true;
            this.errors = errors;
            console.error(errors);
          }
        );

      },
      SaveImages: function () {
        let constraints = {
          imgs: {
            presence: {
              message: "Agrega al menos solo una imagen "
            },
            length: {
              minimum: 1,
              maximum: 5,
              message: " Mínimo 1 imagen máximo 5 "
            }
          },
        };
        validate.async(this.myLyf, constraints, {
          fullMessages: false
        }).then(
          (success) => {
            console.log(this.myLyf.imgs);
            this.Lyfprogress += 16;
            // console.info(' Pregunta correcta ');
            // console.info(success);
          }, (errors) => {
            this.modalError = true;
            this.errors = errors;
            console.error(errors);
          }
        );

      },
      SavePackages: function () {
        console.log(this.myLyf.packages);

        if (this.myLyf.packages.list.length > 0) {
          this.Lyfprogress += 16;
        }
      },
      SaveExtras: function () {
        console.log(this.myLyf);

        if (this.myLyf.extras.length > 0) {
          this.Lyfprogress = 100;
        }
      },

      AddPackage: function (name) {
        console.log(name);
        if (!this.myLyf.packages.list.includes(name)) {
          this.myLyf.packages.list.push(name);
        }
      },

      DeletePackage: function (name) {
        console.log(name);
        if (this.myLyf.packages.list.includes(name)) {
          this.myLyf.packages.list.splice(this.myLyf.packages.list.indexOf(name), 1);

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
      LyfReturn: function () {
        this.Lyfprogress -= 16;
      },
      AddQuestion: function () {
        // console.log(this.questions);
        let constraints = {
          question: {
            presence: {
              message: "Falta la pregunta "
            },
            length: {
              minimum: 10,
              maximum: 50,
              message: "Pregunta: Mínimo 10 , Máximo 50 Caracteres"
            }
          },
          answer: {
            presence: {
              message: "Falta la respuesta "
            },
            length: {
              minimum: 5,
              maximum: 100,
              message: "Respuesta: Mínimo 5 , Máximo 100 Caracteres"
            }
          },
        };
        validate.async(this.questions, constraints, {
          fullMessages: false
        }).then(
          (success) => {
            this.myLyf.questions.push(_.clone(this.questions, true));
            this.questions.answer = '';
            this.questions.question = '';
            // console.info(' Pregunta correcta ');
            // console.info(success);
          }, (errors) => {
            this.modalError = true;
            this.errors = errors;
            console.error(errors);
          }
        );
      },

      DeleteQuestion: function (index) {
        this.myLyf.questions.splice(index, 1);
        console.log(this.myLyf.questions);
      },

      AddExtra: function () {
        console.log(this.extra);
        if (this.extra.title == '' || this.extra.title == '') {

        } else {
          this.myLyf.extras.push(_.clone(this.extra, true));
          this.extra.title = '';
          this.extra.desc = '';
          this.extra.cost = 7;
          console.log(this.myLyf.extras);
        }

      },

      DeleteExtra: function (index) {
        this.myLyf.extras.splice(index, 1);
        console.log(this.myLyf.extras);
      }
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
    beforeMount() {
      this.myLyf.packages.basic.package = _.clone(this.package, true);
      this.myLyf.packages.standard.package = _.clone(this.package, true);
      this.myLyf.packages.premium.package = _.clone(this.package, true);
    }

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
