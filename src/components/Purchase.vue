<template>
  <div class=" container ">
    <div class="column is-full has-background-light notification  ">
      <h3 class="is-size-2"> Compra </h3>
      <div class="level ">
        <div class="level-left">
          <div class="columns">
            <div class="column is-full">
              <h3 class=" is-size-3 "> {{ purchase.title }} </h3>
              <p> <strong> Descripción </strong> {{ purchase.description }} </p>
            </div>
          </div>

        </div>
        <div class="level-rigth">
          <div class="columns">
            <div class="column is-full">
              <p> <strong> Paquete : </strong> {{ purchase.pack }} </p>
              <p> <strong> Reviciones : </strong> {{ purchase.revisions }} </p>
              <p> <strong> Costo : </strong> {{ purchase.cost }} </p>
            </div>
          </div>

        </div>
      </div>
      <div class="level">
        <div class="level-item">
          <div class="column is-6">
            <img :src=" $host + purchase.img " alt="" class=" img-order ">
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
        purchase: {},
        condition: true
      }
    },
    methods: {
      getPurchase: function () {
        console.log('Geting purchase..', this.$route.params.id);
        this.$http.get('user/purchase', {
          params: {
            id: this.$route.params.id
          }
        }).then(response => {
          console.log('The Purchase:', response.body.purchase);
          this.purchase = response.body.purchase;
        }, response => {
          console.log('Error:', response);
        });
      }
    },
    beforeMount() {
      this.getPurchase();
    }
  }

</script>

<style>
  .img-order {
    max-height: 200px !important;
    width: 100%;
    object-position: center;
    object-fit: cover;
  }

</style>
