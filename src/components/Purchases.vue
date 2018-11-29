<template>
  <div class=" container ">
    <h3 class="is-size-3"> Compras </h3>
    <view-purchase v-for=" purchase in purchases" :key=" purchase " v-bind:Purchase="purchase">
    </view-purchase>

    <div class="column is-full has-text-centered has-background-light">
      <a v-if=" condition == true" @click=" getPurchases() ">
        <span class=" has-text-primary"> Ver más </span>
      </a>
      <span v-else class=" has-text-success"> Fin de las ventas </span>
    </div>

  </div>
</template>


<script>
  import Purchase from '@/components/views/view_purchase'
  export default {
    components: {
      'view-purchase': Purchase,
    },
    data() {
      return {
        purchases: [],
        condition: true
      }
    },
    methods: {
      getPurchases: function () {
        console.log('Geting purchases');
        let ls = this.purchases.length;
        if (ls > 0) {
          let id = this.purchases[ls - 1].id;
          console.log('More purchases, last:', id);
          this.$http.get('user/purchases', {
            params: {
              id
            }
          }).then(response => {
            console.log('More purchases:', response.body.purchases);
            this.purchases = this.purchases.concat(response.body.purchases);
            if (response.body.purchases.length < 10) {
              this.condition = false;
            }
          }, response => {
            console.log('Error:', response);
          });
        } else {
          this.$http.get('user/purchases').then(response => {
            console.log('Top purchases : ', response.body.purchases);
            this.purchases = this.purchases.concat(response.body.purchases);
            if (response.body.purchases.length < 10) {
              this.condition = false;
            }
          }, response => {
            console.log('Error:', response);
          });
        }
      }
    },
    beforeMount() {
      this.getPurchases();
    }
  }

</script>
