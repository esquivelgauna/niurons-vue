<template>
  <div class="modal" :class=" { 'is-active':Modal == true}">
    <div class="modal-background" @click=" $emit('close') "></div>
    <div class="modal-card">
      <header class="modal-card-head has-text-centered has-background-primary  "> 
        <p class="modal-card-title is-size-3 has-text-white">
          <fa-i :icon=' Icon'></fa-i> {{Title}}
        </p>
        <button class="delete" aria-label="close" @click=" $emit('close') "></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column is-6">
            <div class="level is-marginless">
              <div class="level-item">
                <img :src=" $host + session.img " alt="" class="is-img-150 is-circle">
              </div>
            </div>

            <div class="field">
              <label class="label"> Nickname </label>
              <div class="control">
                <input class="input" type="text" placeholder="Nickname">
              </div>
            </div>
            <div class="field">
              <label class="label">Celular</label>
              <div class="control">
                <input class="input" type="text" placeholder="Celular">
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="field">
              <label class="label">Nombre</label>
              <div class="control">
                <input class="input" type="text" placeholder="Nombre">
              </div>
            </div>
            <div class="field">
              <label class="label">Apellido</label>
              <div class="control">
                <input class="input" type="text" placeholder="Apellido">
              </div>
            </div>
            <div class="field">
              <label class="label">Telefono fijo</label>
              <div class="control">
                <input class="input" type="text" placeholder="Telefono fijo">
              </div>
            </div>
            <div class="field">
              <label class="label">Miembro desde</label>
              <div class="control">
                <input class="input" type="text" placeholder="Miembro desde">
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer class="modal-card-foot  columns">

        <div class="column">
          <div class="level is-mobile ">
            <div class="level-left ">
              <button class="button" @click=" $emit('close') ">Cancel</button>
            </div>
            <div class="level-right">
              <button class="button is-success"> Guardar </button>
            </div>
          </div>

        </div>

      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['Modal', 'Title', 'Icon'],
    data() {
      return {
        session: this.$parent.session,
      }
    },
  }

</script>