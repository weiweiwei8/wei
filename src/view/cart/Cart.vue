<template>
<div class="cart">
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{cartLen}})</div>
  </nav-bar>
    <cart-list/>
   <cart-bottom-bar/>
</div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import CartList from "./childCompos/cartList";
    import Scroll from "../../components/common/scroll/Scroll";
    import CartBottomBar from "./childCompos/CartBottomBar";
    export default {
        name: "Cart",
      components: {CartBottomBar, Scroll, CartList, NavBar},
      computed:{
          cartLen(){
            return this.$store.state.cartList.length;
          }
      },

    }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  top:0;

}
</style>
