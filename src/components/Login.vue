<template>
  <div class="container  animated fadeIn ">
    <div class="column  is-half is-offset-one-quarter  ">
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
</template>

<script>
  export default {
    data() {
      return {
        title: ' Barra de navegacion ',
        categorias: [{
            name: 'Categoria 1 ',
            subcat: [{
                namesub: ' AA 1'
              },
              {
                namesub: ' AA 2'
              },
              {
                namesub: ' AA 3'
              },
              {
                namesub: ' AA 4'
              },
            ]
          },
          {
            name: 'Categoria 2 ',
            subcat: [{
                namesub: ' BBB 1'
              },
              {
                namesub: ' BBB 2'
              },
              {
                namesub: ' BBB 3'
              },
              {
                namesub: ' BBB 4'
              },
            ]
          },
          {
            name: 'Categoria 3 ',
            subcat: [{
                namesub: ' CC 1'
              },
              {
                namesub: ' CC 2'
              },
              {
                namesub: ' CC 3'
              },
              {
                namesub: ' CC 4'
              },
            ]
          },
          {
            name: 'Categoria 4 ',
            subcat: [{
                namesub: ' DD 1'
              },
              {
                namesub: ' DD 2'
              },
              {
                namesub: ' DD 3'
              },
              {
                namesub: ' DD 4'
              },
            ]
          }
        ]
      }
    }
  }

</script>
