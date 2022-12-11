<template>
  <div class="cart-bottom">
    <div class="check-content">
      <check-button class="check1" :is-active="isSelectall" @click.native="checkClick"/>
      <span>全选</span>
      <span class="total-price">合计: ¥{{totalPrice}}</span>
      <span class="buy-product">去计算({{$store.getters.cartCount}})</span>
    </div>

  </div>
</template>

<script>
    import CheckButton from "../../../components/content/checkButton";
    export default {
        name: "CartBottomBar",
      computed:{
          totalPrice(){

            return this.$store.state.cartList.filter(item => {
              return item.checked
            }).reduce((preValue, item) => {
              return preValue + item.count * item.price;
            }, 0).toFixed(2)
          },
        isSelectall(){
            if(this.$store.state.cartList.length===0)
              return false;
            return !this.$store.state.cartList.find(item=>!item.checked);
        }
      },
      components: {CheckButton},
      methods:{
        checkClick(){
          if(this.isSelectall)
          {
            this.$store.commit('isSelectall')

            } else {
            this.$store.commit('isunSelectall')
            }
          }
          }


    }
</script>

<style scoped>
.cart-bottom{
  height: 40px;

  position: relative;
  bottom: 40px;
  background-color: #eeeeee;
  display: flex;
}

  .check-content{
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 10px;

  }
  .total-price{
    flex: 1;


  }
  .buy-product{
    flex: 1;
    height: 40px;
    background-color: var(--color-tint);
    padding-top: 10px;
    text-align: center;

  }
.check1{
  width:20px;
  height: 20px;
  line-height: 20px;
}
</style>
