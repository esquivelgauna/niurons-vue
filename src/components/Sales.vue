<template>
  <div class=" container ">
    <h3 class="is-size-3"> Ventas </h3>
    <viwe-sale v-for=" sale in sales " :key="sale.id" v-bind:sale="sale">
    </viwe-sale>
    <div class="column is-full has-text-centered has-background-light">
      <a v-if=" condition == true" @click=" getSales() ">
        <span class=" has-text-primary"> Ver más </span>
      </a>
      <span v-else class=" has-text-success"> Fin de las ventas </span>
    </div>

  </div>
</template>


<script>
  import viewSale from '@/components/views/view_sale'
  export default {
    components: {
      'viwe-sale': viewSale,
    },
    data() {
      return {
        sales: [],
        condition: true
      }
    },
    methods: {
      getSales: function () {
        console.log('Geting sales');
        let ls = this.sales.length;
        if (ls > 0) {
          let id = this.sales[ls - 1].id;
          console.log('More :', id);
          this.$http.get('user/sales', {
            params: {
              id
            }
          }).then(response => {
            console.log('More sales:', response.body.sales);
            this.sales = this.sales.concat(response.body.sales);
            if (response.body.sales.length < 10) {
              this.condition = false;
            }
          }, response => {
            console.log('Error:', response);
          });
        } else {
          this.$http.get('user/sales').then(response => {
            console.log('Top sales : ', response.body.sales);
            this.sales = this.sales.concat(response.body.sales);
            if (response.body.sales.length < 10) {
              this.condition = false;
            }
          }, response => {
            console.log('Error:', response);
          });
        }
      }
    },
    beforeMount() {
      this.getSales();
    }
  }

</script>
