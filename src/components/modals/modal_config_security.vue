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
        <b-tabs v-model="activeTab" type="is-boxed">
          <b-tab-item label="Correo">
            <h6 class="is-size-6"> Cambia tu correo </h6>
            <b-field label="Add some tags">
              <b-taginput v-model="tags" ellipsis icon="label" placeholder="Agrega una habilidad  ">
              </b-taginput>
            </b-field>
          </b-tab-item>

          <b-tab-item label="Contraseña">
            <h6 class="is-size-6"> Cambia tu contraseña </h6>

            <div class="field">
              <div class="control">
                <textarea class="textarea" placeholder="Descripción"></textarea>
              </div>
            </div>
          </b-tab-item>


          <b-tab-item label="Preguntas">

            <h6 class="is-size-6"> Preguntas de Seguridad </h6>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Facebook</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input class="input" type="text" placeholder="Facebook/nickname">
                    <span class="icon is-small is-left">
                      <fa-i icon='facebook-square'></fa-i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Twitter</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input class="input" type="text" placeholder="Facebook/nickname">
                    <span class="icon is-small is-left">
                      <fa-i icon='facebook-square'></fa-i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Linkedin</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input class="input" type="text" placeholder="Facebook/nickname">
                    <span class="icon is-small is-left">
                      <fa-i icon='facebook-square'></fa-i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Google</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input class="input" type="text" placeholder="Facebook/nickname">
                    <span class="icon is-small is-left">
                      <fa-i icon='facebook-square'></fa-i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>

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
        activeTab: 1,
        showBooks: false,
        session: this.$parent.session,
      }
    },
  }

</script>

<style>

</style>
