<template>
  <div>
    <div class="buttons">
      <button class=" button  is-primary is-outlined " @click=" login = true "> <strong>Iniciar Sesion</strong>
      </button>
      <button class=" button is-primary  is-outlined " @click=" register = true "> <strong>Registrarse</strong>
      </button>
    </div>


    <div class="modal animated fadeIn " :class=" { 'is-active':login == true}"   >
      <div class="modal-background  " @click=" login = false "></div>
      <div class="modal-content ">
        <div class="column  is-half is-offset-one-quarter has-background-white  ">
          <h3>Iniciar Sesion </h3>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="Email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="Contraseña">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-primary">
                Iniciar Sesion
              </button>
            </p>
          </div>

        </div>

      </div>
      <button class="modal-close is-large" aria-label="close" @click=" login = false "></button>
    </div>

    <div class="modal animated fadeIn " :class="{ 'is-active':register == true}">
      <div class="modal-background" @click=" register = false "></div>
      <div class="modal-content">
        <div class="column  is-half is-offset-one-quarter  ">
          <h3>Registrarse </h3>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="Email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="Contraseña">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-primary">
                Iniciar Sesion
              </button>
            </p>
          </div>

        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click=" register = false "></button>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        login: false,
        register: false
      }
    }
  }

</script>
