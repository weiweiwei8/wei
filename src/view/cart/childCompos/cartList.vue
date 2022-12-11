<template>
    <div class="cart-list">
      <scroll class="content" ref="scroll2">
        <cart-list-item v-for="(item,index) in cart" :key="index" :product="item"/>
      </scroll>
    </div>
</template>

<script>
    import Scroll from "../../../components/common/scroll/Scroll";
    import CartListItem from "./cartListItem";
    export default {
        name: "cartList",
      components: {CartListItem, Scroll},
      computed:{
        cart(){
          return this.$store.state.cartList;
        }
      },
      activated() {
        this.$refs.scroll2.scroll.refresh();
      }
    }
</script>

<style scoped>
.cart-list{
  height: calc(100% - 93px);
}
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
