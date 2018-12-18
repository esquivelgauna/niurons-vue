<template>
  <div class="container ">
    <div class="columns  is-multiline  is-mobile is-centered has-margin-y-4 is-variable is-5 ">



      <div class="column is-8-desktop is-10-tablet   ">
        <div class="  is-rounded has-shadow">
          <view-lyf :Lyf="myLyf" :Edit='false'></view-lyf>
        </div>
      </div>

      <div class="column is-4-desktop is-10-tablet ">
        <div class="  is-rounded has-shadow ">
          <view-profile :id=" myLyf.generals['id_user'] " :type = 'buy'>

          </view-profile>

        </div>
      </div>

    </div>


  </div>
</template>
<script>
  import view_lyf from '@/components/views/view_buy_lyf.vue';
  import view_profile from '@/components/views/view_profile_user.vue';

  export default {
    data() {
      return {
        myLyf: { 
          questions: [],
          images: {
            temp: [],
            up: [],
          },
          packages: {
            list: [],
            type: 4,
            basic: {
              condition: true,
              package: {},
            },
            standard: {
              condition: true,
              package: {},
            },
            premium: {
              condition: true,
              package: {},
            },
          },
          extras: [],
        },
        questions: {
          question: '',
          answer: '',
        },
        extra: {
          title: '',
          desc: '',
          cost: 7,
        },
        categorie: null,
        subcategorie: null,
        categories: this.$parent.categories,
        subCats: [],
        package: {
          id: null,
          subtitle: '',
          cost: 5,
          time: 1,
          revisions: 1,
          description: '',
        },
        errors: [],
        modalError: false,
        isLoading: false,
        Lyfprogress: 8,
      }
    },
    components: {
      'view-lyf': view_lyf,
      'view-profile': view_profile,

    },
    methods: {

      GetLyf: function () {
        if (this.$route.params.id) {
          console.log('Lyf: ', this.$route.params.id);
          this.$http.get('Lyf', {
            params: {
              idLyf: this.$route.params.id
            }
          }).then(response => {
            console.log(' body :', response.body);
            if (response.body.status) {
              this.myLyf = response.body.lyf;
            }

          }, response => {
            console.log('Error:', response);
          });
        } else {
          alert('Falta el id del lyf')
        }

      },
    },

    computed: {

    },
    watch: {


    },
    beforeMount() {
      this.GetLyf();
    }

  }

</script>



<style>


</style>
