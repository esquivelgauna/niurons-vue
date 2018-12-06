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
        <div class="columns is-multiline is-mobile ">

          <div class="column is-12 ">
            <div class="field">
              <label class="label"> <fa-i icon='map-marker'></fa-i> Domicilio Fiscal </label>
              <div class="control">
                <input class="input" type="text" placeholder="Domicilio actual" disabled>
              </div>
            </div>
          </div>
          <div class="column is-12 ">
            <div class="field">
              <label class="label"> Pais </label>
              <div class="control">
                <input class="input" type="text" placeholder="Domicilio actual">
              </div>
            </div>
          </div>

          <div class="column is-6">

            <div class="field">
              <label class="label"> Estado </label>
              <div class="control">
                <input class="input" type="text" placeholder="Estado">
              </div>
            </div>
            <div class="field">
              <label class="label"> Colonia </label>
              <div class="control">
                <input class="input" type="text" placeholder="Colonia">
              </div>
            </div>
            <div class="field">
              <label class="label">Número # </label>
              <div class="control">
                <input class="input" type="text" placeholder="Número">
              </div>
            </div>

          </div>

          <div class="column is-6">

            <div class="field">
              <label class="label"> Municipio (Ciudad) </label>
              <div class="control">
                <input class="input" type="text" placeholder=" Municipio (Ciudad) ">
              </div>
            </div>
            <div class="field">
              <label class="label"> Calle </label>
              <div class="control">
                <input class="input" type="text" placeholder="Calle">
              </div>
            </div>
            <div class="field">
              <label class="label"> Codigo Postal </label>
              <div class="control">
                <input class="input" type="text" placeholder=" Codigo Postal ">
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
