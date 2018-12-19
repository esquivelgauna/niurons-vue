<template>
  <div class=" container is-mobile  ">
    <div class=" has-text-centered has-text-white has-background-primary has-shadow " v-bind:style="{ 'background-image': 'url(' + $host + '/imgcat/'+ categorie+'/banner.png' + ')' }"
      id="categorie-image">
      <h3 class=" is-size-3 is-size-3-desktop  is-size-4-mobile "> Categoría: {{ alias }} </h3>
    </div>
    <!-- <img :src="  " alt=""> -->

    <hr class=" has-margin-y-2 ">
    <div class="columns is-mobile is-multiline ">

      <div class="column is-hidden-mobile is-6-mobile  is-4-tablet is-4-desktop ">
        <ul v-for=" (cat, index ) in orderCats " :key="index" class="columns is-multiline">
          <li class=" column is-full">
            <a class=" has-text-primary is-text   is-fullwidth is-outlined " @click=" ChangeCat( cat.id ) ">
              <div class="level is-mobile ">
                <div class="level-left">

                  <div class="level-item">
                    <i :class=" ' niu-xs niu-xxs-mobile niu-icon service_' + cat.url "></i>
                  </div>

                  <div class="level-item">
                    <h5 class=" is-size-5 is-size-5-desktop  is-size-6-mobile "> {{ cat.alias }} </h5>
                  </div>

                </div>

                <div class="level-rigth ">
                  <div class="level-item">
                    <small>
                      <a>
                        <div v-if=" selectCat != cat.id ">
                          <fa-i icon='caret-down'> </fa-i>
                        </div>
                        <div v-else>
                          <fa-i icon='caret-up'> </fa-i>
                        </div>

                      </a>
                    </small>
                  </div>
                </div>

              </div>
            </a>

            <hr class="has-margin-y-1">
            <div class="columns columns is-multiline " :class=" { 'has-none':selectCat != cat.id } ">

              <div class="column is-full animated flipInX " v-for=" (sub,index) in cat.subCats" :key="index">
                <!-- {{ subcat.alias }} -->
                <router-link :to="{ name: 'SubCategorie', params: { cat:  $route.params.cat , subCat: sub.url } }">
                {{sub.alias}} </router-link>

              </div>
            </div>

          </li>
        </ul>
      </div>

      <div class="column is-12-mobile is-8-tablet is-8-desktop has-text-centered  ">
        <h3 class=" is-size-3 is-size-3-desktop  is-size-4-mobile "> Subcategorías </h3>

        <div class="columns is-mobile is-multiline is-variable is-2-desktop is-12-mobile ">
          <div class="column is-4-mobile is-4-tablet is-3-desktop  has-text-centered  " v-for=" (subcat,index) in orderedSubCat "
            :key=" index ">

            <router-link :to="{ name: 'SubCategorie', params: { cat: $route.params.cat , subCat: subcat.url }}">
              <div class=" has-text-centered  subcat-name ">
                <img :src=" $host + '/imgcat/'+ categorie+'/' + subcat.url +'.png'  " alt=" " class=" has-shadow is-rounded">
                <div class="container has-padding-x-2">
                  <h4 class="is-size-5-tablet is-size-6-mobile  has-text-white "> {{ subcat.alias }} </h4>
                </div>

              </div>

            </router-link>



          </div>
        </div>
      </div>


    </div>
  </div>
</template>


<script>
  import Lyfv from '@/components/views/view_lyf.vue'

  export default {
    components: {
      'niu-lyf': Lyfv
    },
    data() {
      return {
        selectCat: 0,
        categorie: null,
        alias: null,
        Data: {},
        Lyfs: [],
        noLyfs: false,
        condition: false,
        subCategories: [],
        checkboxGroup: [],
        idCat: null,
      }
    },
    methods: {
      GetSubCategories: function () {
        this.checkboxGroup = [];
        // console.log(JSON.stringify(this.$parent.categories));
        for (let index in this.$parent.categories) {
          //   console.log(this.$route.params);
          // console.log(this.$parent.categories[index]['url'])
          if (this.$route.params.cat == this.$parent.categories[index]['url']) {
            console.log(this.$parent.categories[index]);
            this.alias = this.$parent.categories[index].alias;
            this.categorie = this.$parent.categories[index].url;
            this.idCat = this.$parent.categories[index]['id']
            this.subCategories = this.$parent.categories[index]['subCats'];
            break;
          }
        }
      },
      ChangeCat: function (idCat) {
        if (this.selectCat == idCat) {
          this.selectCat = 0;
        } else {
          this.selectCat = idCat;
        }

      },
      GetLyfs: function () {
        this.$http.get('Lyfs/Categorie', {
          params: {
            id: this.idCat
          }
        }).then(response => {

          if (response.body.lyfs.length > 0) {
            console.log('Lyfs-Categorie:', response.body.lyfs);
            this.Lyfs = response.body.lyfs;
            this.condition = true;
          } else {
            this.noLyfs = true;
          }
        }, response => {
          console.log('Error:', response);
        });
      },
      SearchLyfs: function () {
        this.$http.get('Lyfs/Categorie', {
          params: {
            id: this.idCat
          }
        }).then(response => {

          if (response.body.lyfs.length > 0) {
            console.log('Lyfs-Categorie:', response.body.lyfs);
            this.Lyfs = response.body.lyfs;
            this.condition = true;
          } else {
            this.noLyfs = true;
          }
        }, response => {
          console.log('Error:', response);
        });
      }

    },
    computed: {
      orderedSubCat: function () {
        return _.sortBy(this.subCategories, 'alias');
      },
      orderCats: function () {
        return _.sortBy(this.$parent.categories, 'alias');
      }
    },
    mounted() {
      this.GetSubCategories();
      // this.GetLyfs();
    },
    watch: {
      '$route'(to, from) {
        this.GetSubCategories();
      }
    }


  }

</script>

<style>
  #categorie-image {
    /* background-color: white; */
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .subcat-name {
    position: relative;
  }

  .subcat-name>.container {
    position: absolute;
    bottom: 50px;
    width: 100%;
  }

</style>
