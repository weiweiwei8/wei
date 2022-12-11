<template>
    <div class="button" :class="{'check':isActive}">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
    export default {
        name: "checkButton",
      props:{
          isActive:{
            type:Boolean,
            default:false
          }
      }
    }
</script>

<style scoped>
.button{
   border-radius:50%;
  border:2px solid #aaa;
}
  .check{
    border-color: var(--color-tint);
  }
</style>
