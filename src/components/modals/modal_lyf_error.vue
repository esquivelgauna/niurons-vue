<template>
  <div class="modal" :class=" { 'is-active':Modal == true}">
    <div class="modal-background" @click=" $emit('close') "></div>
    <div class="modal-card">
      <header class="modal-card-head has-text-centered has-background-danger  ">
        <p class="modal-card-title is-size-3 has-text-white">
          <fa-i :icon=' Icon'></fa-i> {{Title}}
        </p>
        <button class="delete" aria-label="close" @click=" $emit('close') "></button>
      </header>
      <section class="modal-card-body">

        <div class="columns is-multiline is-mobile ">

          <div class="column is-full">
            <h4 class=" has-text-danger is-size-4">Errores:</h4>
            <!-- {{ Errors }} -->
            <div class="content">
              <ul>
                <li v-for=" (error,index) in Errors " :key=" index ">
                  {{ error[0] }}
                </li>
              </ul>
            </div>


          </div>


        </div>
      </section>

      <footer class="modal-card-foot  columns">

        <div class="column">
          <div class="level is-mobile ">
            <div class="level-left ">
            </div>
            <div class="level-right">
              <button class="button is-rounded is-danger " @click=" $emit('close') ">Salir</button>
            </div>
          </div>

        </div>

      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['Modal', 'Title', 'Icon', 'Errors'],
    data() {
      return {}
    },
  }

</script>
