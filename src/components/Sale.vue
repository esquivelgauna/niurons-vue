<template>
  <div class=" container ">
    <div class="column is-full has-background-light notification  ">
      <h3 class="is-size-2"> Venta </h3>
      <div class="level ">
        <div class="level-left">
          <div class="columns">
            <div class="column is-full description ">
              <h3 class=" is-size-3 "> {{ sale.title }} </h3>
              <p class=" description "> <strong> Descripción </strong> {{ sale.description }} </p>
            </div>
          </div>

        </div>
        <div class="level-rigth">
          <div class="columns">
            <div class="column is-full">
              <p> <strong> Paquete : </strong> {{ sale.pack }} </p>
              <p> <strong> Reviciones : </strong> {{ sale.revisions }} </p>
              <p> <strong> Costo : </strong> {{ sale.cost }} </p>
            </div>
          </div>

        </div>
      </div>
      <div class="level">
        <div class="level-item">
          <div class="column is-6">
            <img :src=" $host + sale.img " alt="" class=" img-order ">
          </div>
        </div>
      </div>
      <div class="lavel">
        <input type="text">
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        sale: {},
        condition: true
      }
    },
    methods: {
      getSale: function () {
        console.log('Geting sale..', this.$route.params.id);
        this.$http.get('user/sale', {
          params: {
            id: this.$route.params.id
          }
        }).then(response => {
          console.log('The sale:', response.body.sale);
          this.sale = response.body.sale;
        }, response => {
          console.log('Error:', response);
        });
      }
    },
    beforeMount() {
      this.getSale();
    }
  }

</script>

<style>
  .description {
    word-break: break-all;
  }

</style>
