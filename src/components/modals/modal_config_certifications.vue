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
          <div class="column is-4-tablet">
            <div class="field">
              <label class="label">
                <fa-i icon='id-card'></fa-i> Nombre
              </label>
              <div class="control">
                <input class="input" type="text" placeholder="Estado">
              </div>
            </div>
          </div>
          <div class="column is-4-tablet">
            <div class="field">
              <label class="label">
                <fa-i icon='graduation-cap'></fa-i> Institución
              </label>
              <div class="control">
                <input class="input" type="text" placeholder="Colonia">
              </div>
            </div>
          </div>
          <div class="column is-4-tablet">
            <div class="field">
              <label class="label">
                <fa-i icon='clock'></fa-i> Fecha
              </label>
              <div class="control">
                <input class="input" type="text" placeholder="Número">
              </div>
            </div>
          </div>
          <div class="column is-12-tablet">
            <div class="field">
              <label class="label">
                <fa-i icon='file-image'></fa-i> Certificado
              </label>
              <div class="control">
                <b-field>
                  <b-upload v-model="dropFiles" multiple drag-drop class="hero">
                    <section class="section">
                      <div class="content has-text-centered">
                        <p>
                          <fa-i icon="upload" size="is-large">
                          </fa-i >
                        </p>
                        <p>Drop your files here or click to upload</p>
                      </div>
                    </section>
                  </b-upload>
                </b-field>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="modal-card-foot  columns">

        <div class="column">
          <div class="level is-mobile ">
            <div class="level-left ">
              <button class="button" @click=" $emit('close') "> Cancelar </button>
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
