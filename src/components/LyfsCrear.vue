<template>
  <div class="container ">

    <!-- <h3 class="is-size-3 ">Crea tu Lyf</h3> -->
    <div class="columns is-centered has-margin-y-4">
      <div class="column is-8 is-rounded has-shadow has-padding-3   ">
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

        <div :class=" { 'has-none ':Lyfprogress > 8 } " class=" animated fadeIn ">
          <h4 class="is-size-4 has-text-primary "> Datos generales del Lyf </h4>
          <div class="columns is-multiline ">
            <div class="column is-full ">
              <div class="field">
                <label class="label">Título</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Título" v-model="myLyf.title">
                </div>
                <div class="level is-mobile">
                  <div class="level-left">
                    <span class="help is-primary ">Ponle un titulo llamativo a tu servicio </span>
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
                <div class="level is-mobile">
                  <div class="level-left">
                    <span class="help is-primary ">Mínimo 30 caracteres </span>
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
                    <span class="help is-primary ">Agrega al menos un requerimiento </span>
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
                    <span class="help is-primary "> Minimo 5 caracteres </span>
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
                    <span class="help is-primary "> Minimo 5 caracteres </span>
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
                <fa-i icon='image'></fa-i> <strong class=" has-text-primary "> Buscar imágenes </strong> o arrastra y
                sueltalas aquí.
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

        <div :class=" { 'has-none ':Lyfprogress < 48 || Lyfprogress > 64   } " class=" animated fadeIn ">
          <h4 class="is-size-4 has-text-primary "> Paquetes </h4>
          <small>
            <p>
              Selecciona los paquetes que deseas crear (selecciona almenos uno).
            </p>
          </small>

          <div class="buttons is-centered has-margin-y-3 ">
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

          <div class="columns is-multiline animated fadeIn " :class=" { 'has-none ':myLyf.packages.type != 1 } ">
            <div class="column is-full">
              <hr class=" has-margin-y-1 ">
              <div class="level is-marginless">
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
                    <span class="help is-primary "> Ponle un subtitulo llamativo a tu servicio , mínimo 5 caracteres
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
                  <input class="input" type="number" min="1" placeholder="Tiempo de entrega" v-model="myLyf.packages.basic.package.time">
                </div>
                <div class="level is-mobile">
                  <div class="level-left">
                    <span class="help is-primary "> Mínimo 1 día , Maximo 30 días </span>
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
                  <textarea class="textarea is-primary" placeholder="Descripción" v-model="myLyf.packages.basic.package.description"></textarea>
                </div>
                <div class="level is-mobile">
                  <div class="level-left">
                    <span class="help is-primary "> Caracteristicas del servicio o producto, minimo 10 caracteres
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

          <div class="columns is-multiline animated fadeIn " :class=" { 'has-none ':myLyf.packages.type != 2  } ">
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

          <div class="columns is-multiline animated fadeIn " :class=" { 'has-none ':myLyf.packages.type != 3  } ">
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
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click=" SavePackages() ">
                Siguiente
              </a>
            </p>
          </div>


        </div>

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
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary is-rounded" @click=" SaveExtras() ">
                <fa-i icon='save'></fa-i> <small class="has-margin-x-2 has-small">FINALIZAR</small>
              </a>
            </p>
          </div>
        </div>
        <div :class=" { 'has-none ':Lyfprogress < 80 || Lyfprogress > 100  } " class=" animated fadeIn ">
          <span> imagen lyf </span>
          <h4 class="is-size-4 has-text-primary "> !Genial, has terminado de crear tu LYF¡ </h4>
          <button> Ver mi lyf </button>
          <p>
            Ve a la <strong class="is-primary"> sección de LYF's </strong> para consultar, editar, cambiar el estatus o
            eliminar tus LYF's.
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
        myLyf: {
          title: '',
          categorie: null,
          subcat: null,
          description: '',
          tags: null,
          req: '',
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
        question: '',
        answer: '',
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
        condition: true,
        Lyfprogress: 70,
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

          // Check Packages 
          let condition = true
          if (condition) {
            this.Lyfprogress += 16;
          }

        }
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
        this.myLyf.categorie = idCat;
        this.GetSubCategories(idCat);

      },
      subcategorie: function (idSubcat) {

        this.myLyf.subcat = idSubcat;

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
