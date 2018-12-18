<template>
  <div class=" animated fadeIn">
    <div class="columns">
      <div class="column is-full ">
        <h3 class=" is-size-3 "> {{ Lyf.generals.title }} </h3>
        <div>
          <fa-i icon='star'></fa-i>
          <fa-i icon='star'></fa-i>
          <fa-i icon='star'></fa-i>
          <fa-i icon='star'></fa-i>
          <fa-i icon='star'></fa-i>
          ( 0 Compras )
        </div>
        <div class="level">
          <div class="level-left">
            <div class="level-item has-text-primary  ">
              Diseño Gráfico / Tarjetas de Presentación
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <button class=" button is-rounded is-primary ">
                Comprar
              </button>
            </div>
          </div>

        </div>
        <!-- Image Cover -->
        <hr class=" has-margin-y-3">
        <img src="http://localhost:3000/assets/img/uploads/imglyf/thumb/1237VYJZX_lyf_16FGXA7DW.jpg" alt="" class="img-200  ">

        <!-- Images Slider  -->
        <hr class=" has-margin-y-3">
        <div class="level">
          <div class="level-item">

          </div>
        </div>
        <!-- Description and req , collapse  -->
        <div class="tabs has-margin-b-2">
          <ul>
            <li :class=" { 'is-active':tab == 0  } " @click=" tab = 0 ">
              <a>
                <h5 class=" is-size-5 ">
                  Descripción </h5>
              </a>

            </li>
            <li :class=" { 'is-active':tab == 1  } " @click=" tab = 1 ">
              <a>
                <h5 class=" is-size-5 ">
                  Requerimientos </h5>
              </a>
            </li>
          </ul>
        </div>

        <div class=" columns is-multiline ">
          <div class="column is-full animated fadeIn " :class=" { 'has-none':tab != 0  }" >
            Descripción dolor sit amet consectetur
             adipisicing elit. Iure omnis doloremque dolore esse 
             earum rerum minus? Pariatur possimus neque delectus,
              minus eligendi officia, hic non, quos cumque molestias esse nostrum!
          </div>
          <div class="column is-full animated fadeIn "  :class=" { 'has-none':tab != 1  }" >
            Requerimientos sit amet consectetur
             adipisicing elit. Iure omnis doloremque dolore esse 
             earum rerum minus? Pariatur possimus neque delectus,
              minus eligendi officia, hic non, quos cumque molestias esse nostrum!
          </div>
        </div>

        <!-- Packages  and extras  , collapse  -->
        <hr class=" has-margin-y-3">


        <!-- Questions   , collapse  -->
        <hr class=" has-margin-y-3">
        <h5 class=" is-size-5 has-text-primary has-margin-b-3 "> Preguntas frecuentes </h5>
        <b-collapse class="panel" :open.sync="isOpen">
          <div slot="trigger" class="panel-heading ">
                <strong class=" is-size-6  "> ¿Como queda al final?</strong>
            </div>
 
          <div class="panel-block">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
            Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus.
            <br />
            Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
          </div>
        </b-collapse>

        <!-- Tags   , collapse  -->
        <hr class=" has-margin-y-3">
        <b-taglist>
          <b-tag type=" " :rounded='true'>First</b-tag>
          <b-tag type=" " :rounded='true'>Second</b-tag>
          <b-tag type="is-info" :rounded='true'>Third</b-tag>
          <b-tag type="is-info" :rounded='true'>Fourth</b-tag>
          <b-tag type="is-info" :rounded='true'>Fifth</b-tag>
        </b-taglist>



      </div>


    </div>

  </div>
</template>

<script>
  export default {
    props: ['Lyf', 'Edit'],
    data() {
      return {
        isOpen: false,
        tab: 0,
      }
    }
  }

</script>

<style>

</style>
