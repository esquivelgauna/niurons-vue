<template>
  <div class=" container is-widescreen-mobile ">
    <div class=" has-text-centered has-text-white has-background-primary " v-bind:style="{ 'background-image': 'url(' + $host + '/imgcat/'+ categorie+'/banner.png' + ')' }"
      id="categorie-image">
      <h3 class=" is-size-3 "> Categoría: {{ alias }} </h3>
    </div>
    <!-- <img :src="  " alt=""> -->

    <hr class=" has-margin-y-2 ">
    <div class="columns is-mobile ">
      <div class="column is-4  is-3-tablet is-3-desktop ">
        <ul v-for=" (cat, index ) in orderCats " :key="index" class="columns is-multiline">
          <li class=" column is-full">
            <a class=" has-text-primary is-text   is-fullwidth is-outlined " @click=" ChangeCat( cat.id ) ">
              <div class="level">
                <div class="level-left">

                  <div class="level-item">
                    <i :class=" ' niu-xs niu-icon service_' + cat.url "></i>
                  </div>

                  <div class="level-item">
                    <h5 class=" is-size-5 "> {{ cat.alias }} </h5>
                  </div>

                </div>

                <div class="level-rigth ">
                  <div class="level-item">
                    <button class=" button is-small is-primary is-rounded "> <fa-i icon='caret-down' :class=" { 'caret-down':selectCat != cat.id  }  " > </fa-i></button>
                    
                  </div>
                </div>

              </div>
            </a>

            <hr class="has-margin-y-1">
            <div class="columns columns is-multiline " :class=" { 'has-none':selectCat != cat.id } ">
              <div class="column is-full animated flipInX " v-for=" (subcat,index) in cat.subCats" :key="index">
                {{ subcat.alias }}

              </div>
            </div>

          </li>
        </ul>
      </div>
      <div class="column is-8">
        <h3 class=" is-size-3 "> Subcategorías </h3>

        <div class="columns is-multiline is-variable is-2 ">
          <div class="column is-narrow is-6-tablet is-4-desktop is-12-mobile has-text-centered  " v-for=" (subcat,index) in orderedSubCat "
            :key=" index ">
            <!-- {{ subcat }} -->
            <div class=" has-text-centered  subcat-name ">
              <img :src=" $host + '/imgcat/'+ categorie+'/' + subcat.url +'.png'  " alt="">
              <div class="container has-padding-x-2">
                <h4 class="is-size-6 has-text-white "> {{ subcat.alias }} </h4>
              </div>

            </div>

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
      ChangeCat: function ( idCat ) {
        if( this.selectCat == idCat ){
          this.selectCat = 0 ; 
        }else{
          this.selectCat = idCat ; 
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
