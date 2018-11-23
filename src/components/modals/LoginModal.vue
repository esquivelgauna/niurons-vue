<template>
  <div>
    <div v-if=" session.name "> 
      <ul class="columns is-variable is-2">

        <li class="column ">
          <div class="dropdown is-right is-hoverable ">
            <div class="dropdown-trigger">


              <div class=" is-text " aria-haspopup="true" aria-controls="dropdown-menu-blog">
                <span>
                  <i class="niu-icon icon-nav-var-top icon-blog-niu"> </i>
                </span>
              </div>
            </div>
            <div class="dropdown-menu" id="dropdown-menu-blog" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                  Dropdown item
                </a>
                <a class="dropdown-item">
                  Other dropdown item
                </a>
                <a href="#" class="dropdown-item is-active">
                  Active dropdown item
                </a>
                <a href="#" class="dropdown-item">
                  Other dropdown item
                </a>
                <hr class="dropdown-divider">
                <a href="#" class="dropdown-item">
                  With a divider
                </a>
              </div>
            </div>
          </div>
        </li>

        <li class="column ">
          <div class="dropdown is-right is-hoverable ">
            <div class="dropdown-trigger">
              <div class=" is-text " aria-haspopup="true" aria-controls="dropdown-menu-works">
                <span>
                  <i class="niu-icon icon-nav-var-top icon-necktie-niu"> </i>
                </span>
              </div>
            </div>
            <div class="dropdown-menu" id="dropdown-menu-works" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                  Dropdown item
                </a>
                <a class="dropdown-item">
                  Other dropdown item
                </a>
                <a href="#" class="dropdown-item is-active">
                  Active dropdown item
                </a>
                <a href="#" class="dropdown-item">
                  Other dropdown item
                </a>
                <hr class="dropdown-divider">
                <a href="#" class="dropdown-item">
                  With a divider
                </a>
              </div>
            </div>
          </div>
        </li>

        <li class="column ">
          <div class="dropdown  is-right is-hoverable ">
            <div class="dropdown-trigger">
              <div class=" is-text " aria-haspopup="true" aria-controls="dropdown-menu-messages">
                <span>
                  <i class="niu-icon icon-nav-var-top icon-msg-niu"> </i>
                </span>
              </div>
            </div>
            <div class="dropdown-menu" id="dropdown-menu-messages" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                  Dropdown item
                </a>
                <a class="dropdown-item">
                  Other dropdown item
                </a>
                <a href="#" class="dropdown-item is-active">
                  Active dropdown item
                </a>
                <a href="#" class="dropdown-item">
                  Other dropdown item
                </a>
                <hr class="dropdown-divider">
                <a href="#" class="dropdown-item">
                  With a divider
                </a>
              </div>
            </div>
          </div>
        </li>

        <li class="column ">
          <div class="dropdown is-right is-hoverable ">
            <div class="dropdown-trigger">
              <div class=" is-text " aria-haspopup="true" aria-controls="dropdown-menu-notifications">
                <span>
                  <i class="niu-icon icon-nav-var-top icon-bell-niu"> </i>
                </span>
              </div>
            </div>
            <div class="dropdown-menu" id="dropdown-menu-notifications" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                  Dropdown item
                </a>
                <a class="dropdown-item">
                  Other dropdown item
                </a>
                <a href="#" class="dropdown-item is-active">
                  Active dropdown item
                </a>
                <a href="#" class="dropdown-item">
                  Other dropdown item
                </a>
                <hr class="dropdown-divider">
                <a href="#" class="dropdown-item">
                  With a divider
                </a>
              </div>
            </div>
          </div>
        </li>

        <li class="column ">
          <div class="dropdown is-right is-hoverable ">
            <div class="dropdown-trigger">
              <div class=" is-text " aria-haspopup="true" aria-controls="dropdown-menu-user">
                <span>
                  <img :src=" $host + session.img " alt="" id="img-profile" > 
                </span>
              </div>
            </div>
            <div class="dropdown-menu" id="dropdown-menu-user" role="menu">
              <div class="dropdown-content has-text-primary">

                <router-link :to="{ name: 'Profile' }" class="dropdown-item">
                  <fa-i icon='user'></fa-i>
                  <span>Perfil</span>
                </router-link>
                <router-link :to="{ name: 'Profile' }" class="dropdown-item">
                  <fa-i icon='cogs'></fa-i>
                  <span>Configuración</span>
                </router-link>

                <a href="#" class="dropdown-item  ">
                  <fa-i icon='hand-holding-heart'></fa-i>
                  <span> LYF´s</span>
                </a>
                <a href="#" class="dropdown-item">
                  <fa-i icon='briefcase'></fa-i>
                  <span> Trabajos</span>
                </a>
                <router-link :to="{ name: 'Purchases' }" class="dropdown-item">
                  <fa-i icon='shopping-cart'></fa-i>
                  <span>Compras</span>
                </router-link>

                <router-link :to="{ name: 'Sales' }" class="dropdown-item">
                  <fa-i icon='money-bill-wave'></fa-i>
                  <span>Ventas</span>
                </router-link>
 
                <a href="#" class="dropdown-item">
                  <fa-i icon='chart-line'></fa-i>
                  <span> Finanzas </span>
                </a>

                <hr class="dropdown-divider">
                <a href="/" class="dropdown-item" @click="LogOut()">
                  <fa-i icon='share-square'></fa-i>
                  <span>Salir</span>
                </a>
              </div>
            </div>
          </div>
        </li>


      </ul>
    </div>
    <div v-else>
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
          <form   @submit=" logIn() " >
            <div class="columns is-centered ">
              <div class=" column  is-8 ">
                <div class="field">
                  <p class="control has-icons-left has-icons-right ">
                    <input class="input" type="email" placeholder="Correo" v-model=" loginData.email ">
                    <span class="icon is-small is-left has-text-primary ">
                      <fa-i icon='envelope'> </fa-i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model=" loginData.password ">
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
          </form>

        </section>
        <footer class="modal-card-foot">
          <div class="column is-full">
            <div class="columns is-centered ">
              <div class=" column  is-8 ">

                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <button class="button " @click=" login = false ">Cancelar</button>
                    </div>
                  </div>

                  <div class="level-rigth">
                    <div class="level-item">
                      <button class="button is-success" @click=" logIn() ">Iniciar Sesion</button>
                    </div>
                  </div>

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

        <section class=" modal-card-body ">

          <div class="columns is-centered ">
            <div class=" column  is-8 ">
              <label for="register_email"> Correo </label>
              <div class="field">
                <p class="control has-icons-left has-icons-right ">
                  <input class="input" type="email" placeholder="Correo" id="register_email" required>
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
                  <input class="input" type="password" placeholder="Contraseña" id="register_pas1" v-model="reg_pass1"
                    required>
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

          <div class="column is-full">
            <div class="columns is-centered ">
              <div class=" column  is-8 ">

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
            </div>
          </div>
        </footer>

      </div>
      <button class="modal-close is-large" aria-label="close" @click=" register = false "></button>
    </div>
  </div>

</template>

<script>
  import JWT from 'jsonwebtoken'
  export default {
    data() {
      return {
        loginData: {
          email: null,
          password: null,
        },
        session: this.$parent.session,
        reg_pass1: null,
        reg_pass2: null,
        login: false,
        register: false
      }
    },

    methods: {
      LogOut() {
        localStorage.removeItem('token');
        this.session = {};
      },
      loginSuccess(message) {
        this.$snackbar.open({
          message: message,
          type: 'is-success',
          position: 'is-top',
          indefinite: true,
        })
      },
      loginWarning(message) {
        this.$snackbar.open({
          message: message,
          type: 'is-warning',
          position: 'is-top',
          indefinite: true,
        })
      },

      logIn: function () {
        console.log(this.$parent.session);
        console.log(this.loginData);
        this.$http.post('Login', this.loginData).then(response => {

          if (response.body.status) {
            localStorage.setItem('token', response.body.token);
            let tokenDecoded = JWT.decode(response.body.token);

            console.log(' Login ', tokenDecoded);
            this.session = tokenDecoded;

            this.loginSuccess(response.body.message);
            this.login = false;
          } else {
            this.loginWarning(response.body.message);

          }

        }, response => {
          // error callback
          console.log('Error:', response);
        });

      },
      signIn: function () {

      }


    }



  }

</script>
<style>
  .modal-content {
    z-index: 100;
  }
  #img-profile{
    height: 30px;
    border-radius: 50% 50%;
  }

</style>
