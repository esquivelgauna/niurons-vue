<template>
  <div>
    <div>
      <button class=" button is-light has-text-primary   " @click=" login = true "> Iniciar Sesion </button>
      <button class=" button is-light has-text-primary   " @click=" register = true "> Registrarse </button>
    </div>


    <div class="modal animated fadeIn " :class=" { 'is-active':login == true}">
      <div class="modal-background  " @click=" login = false "></div>
      <div class="modal-card ">
        <header class=" modal-card-head   ">
          <div class="column is-full ">
            <div class="columns is-centered ">
              <div class="column is-half">
                <h3 class="subtitle has-text-centered "> Iniciar Sesion </h3>
              </div>
            </div>
          </div>


        </header>
        <section class=" modal-card-body  ">
          <div class="columns is-centered ">
            <div class=" column  is-8 ">
              <div class="field">
                <p class="control has-icons-left has-icons-right ">
                  <input class="input" type="email" placeholder="Correo">
                  <span class="icon is-small is-left has-text-primary ">
                    <fa-i icon='envelope'> </fa-i>
                  </span>
                  <span class="icon is-small is-right has-text-success">
                    <fa-i icon='check'> </fa-i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input class="input" type="password" placeholder="Password">
                  <span class="icon is-small is-left has-text-primary ">
                    <fa-i icon='key'> </fa-i>
                  </span>
                </p>
              </div>
              <div class="level">

                <div class="level-rigth">
                  <a> ¿ Olvidaste tu contraseña ? </a>
                </div>
              </div>
              <div class="level">
                <div class="level-item">
                  <p @click=" login = false, register=true ">
                    ¿Aún no tienes cuenta? <a> Registrate Aqui <fa-i icon='external-link-alt'></fa-i> </a>
                  </p>
                </div>
              </div>
              <hr>
              <div class="level">
                <div class="level-item">

                  <p> Al iniciar sesion aceptas los
                    <router-link :to="{ name: 'TermsAndConditions'}" @click=" login = false "> <strong> Términos y
                        Condiciones</strong> </router-link>
                  </p>
                </div>
              </div>

            </div>
          </div>


        </section>
        <footer class="modal-card-foot">
          <div class="column is-full ">

            <div class="level">

              <div class="level-left">
                <div class="level-item">
                  <button class="button " @click=" login = false ">Cancelar</button>

                </div>
              </div>

              <div class="level-rigth">
                <div class="level-item">
                  <button class="button is-success ">Iniciar Sesion</button>

                </div>
              </div>

            </div>
          </div>

        </footer>
      </div>
      <button class="modal-close is-large " aria-label="close" @click=" login = false "></button>
    </div>





    <div class="modal animated fadeIn " :class="{ 'is-active':register == true}">
      <div class="modal-background" @click=" register = false "></div>
      <div class="modal-card ">
        <header class=" modal-card-head   ">
          <div class="column is-full ">
            <div class="columns is-centered ">
              <div class="column is-half">
                <h3 class="subtitle has-text-centered "> Registro </h3>
              </div>
            </div>
          </div>


        </header>
        <section class=" modal-card-body  ">
          <div class="columns is-centered ">
            <div class=" column  is-8 ">
              <label for="register_email"> Correo </label>
              <div class="field">
                <p class="control has-icons-left has-icons-right ">
                  <input class="input" type="email" placeholder="Correo" id="register_email">
                  <span class="icon is-small is-left has-text-primary ">
                    <fa-i icon='envelope'> </fa-i>
                  </span>
                  <span class="icon is-small is-right has-text-success">
                    <fa-i icon='check'> </fa-i>
                  </span>
                </p>
              </div>
              <label for="register_pas1"> Contraseña </label>
              <div class="field">
                <p class="control has-icons-left">
                  <input class="input" type="password" placeholder="Contraseña" id="register_pas1" v-model="reg_pass1">
                  <span class="icon is-small is-left has-text-primary ">
                    <fa-i icon='key'> </fa-i>
                  </span>
                </p>
              </div>
              <label for="register_pas2"> Confirma tu contraseña </label>
              <div class="field">
                <p class="control has-icons-left">
                  <input class="input" type="password" placeholder="Contraseña" id="register_pas2" v-model="reg_pass2">
                  <span class="icon is-small is-left has-text-primary ">
                    <fa-i icon='key'> </fa-i>
                  </span>
                </p>
                <p class="help is-danger " :class=" {'is-hidden':reg_pass1 == reg_pass2} ">Las contraseñas no coinciden
                </p>
              </div>


              <div class="level">
                <div class="level-item">
                  <p @click=" login = true , register = false ">
                    ¿Ya estas registrado? <a> Inicia sesión aquí <fa-i icon='external-link-alt'></fa-i> </a>
                  </p>
                </div>
              </div>
              <hr>
              <div class="level">
                <div class="level-item">
                  <p> Al registrarte aceptas los
                    <router-link :to="{ name: 'TermsAndConditions'}" @click=" login = false "> <strong> Términos y
                        Condiciones</strong> </router-link>
                  </p>
                </div>
              </div>

            </div>
          </div>


        </section>
        <footer class="modal-card-foot">
          <div class="column is-full ">

            <div class="level">

              <div class="level-left">
                <div class="level-item">
                  <button class="button " @click=" register = false ">Cancelar</button>

                </div>
              </div>

              <div class="level-rigth">
                <div class="level-item">
                  <button class="button is-success ">
                    <span> Enviar </span>
                    <fa-i icon='sign-in-alt'></fa-i>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </footer>
      </div>
      <button class="modal-close is-large" aria-label="close" @click=" register = false "></button>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        reg_pass1: null,
        reg_pass2: null,
        login: false,
        register: false
      }
    }
  }

</script>
<style>
  .modal-content {
    z-index: 100;
  }

</style>
