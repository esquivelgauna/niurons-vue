<template>
  <div class="container ">
    <h3 class="is-size-3 ">Lyf´s</h3>
    <div class="level has-shadow has-padding-3">
      <div class="level-left">

        <div class="level-item">
          <div class="tabs is-toggle is-toggle-rounded ">
            <ul>
              <li class="is-active"><a>Todos</a></li>
              <li><a>Activos</a></li>
              <li><a>En pausa</a></li>
              <li><a>Incompletos</a></li>
            </ul>
          </div>
        </div>


      </div>
      <div class="level-right">
        <div class="level-item">
          <router-link :to="{ name: 'Lyf/Create' } " class=" button is-info is-rounded  ">
            <fa-i icon='plus-circle' class="has-margin-r-2"></fa-i>Crear Lyf
          </router-link>
        </div>
      </div>

    </div>
    <hr>
    <div class="level">
      <div class="level-left">
        <div class="field has-addons ">
          <div class="control"><input class="input is-rounded" type="text" placeholder="Buscar"></div>
          <div class="control">
            <a class=" button is-info is-rounded ">
              <fa-i icon="search"></fa-i>
            </a>
          </div>
        </div>
      </div>
      <div class="level-rigth is-invisible ">
        <div class="level-item">
          <div class="select is-rounded"><select>
              <option>Número de filas </option>
              <option>With options</option>
            </select></div>
        </div>
      </div>
    </div>
    <section>
      <b-table :data="Lyfs" :focusable='true'>
        <template slot-scope="props">

          <b-table-column field="img" label=" ">
            <img :src=" $host + '/thumbs/' + props.row.img " alt="" class="img-25">

          </b-table-column>

          <b-table-column field="cat" label="Categoria" sortable>
            {{ props.row.cat }}
          </b-table-column>

          <b-table-column field="subcat" label="Subcategoria" sortable>
            {{ props.row.subcat }}
          </b-table-column>

          <b-table-column field="date" label="Fecha" centered sortable>
            <span class="tag is-success">
              {{ new Date(props.row.date).toLocaleDateString() }}
            </span>
          </b-table-column>
          <b-table-column field="status" label="Status" sortable>
            <div :v-if=" props.row.status == 'activo' " class="has-text-success">
              <fa-i icon='circle'> </fa-i> <span> {{props.row.status}} </span>
            </div>

          </b-table-column>

        </template>
      </b-table>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // session: this.$parent.session,
        Lyfs: [],
        condition: true,
        columns: [{
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true
          },
          {
            field: 'cat',
            label: 'Categoria',
          },
          {
            field: 'subcat',
            label: 'SubCategoria',
          },
          {
            field: 'date',
            label: 'Date',
            centered: true
          },
          {
            field: 'titulo',
            label: 'titulo',
          }
        ]
      }
    }

    ,
    methods: {
      getLyfs: function () {
        console.log('Geting Lyfs.....');

        this.$http.get('user/Lyfs').then(response => {
            console.log('OK API', response.body.lyfs);
            this.Lyfs = response.body.lyfs;

          }

          , response => {

            console.log('Error:', response);
          }

        );
      }

    }

    ,
    beforeMount() {
      this.getLyfs();
    }
  }

</script>
<style></style>
