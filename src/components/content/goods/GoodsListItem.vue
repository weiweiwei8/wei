<template>
 <div class="goods" @click="itemClick">
   <img :src="goodsitem.show.img" alt="" @load="imageLoad" >
   <div class="goodsinfo">
     <p>{{goodsitem.title}}</p>
     <span class="price">{{goodsitem.price}}</span>
     <span class="collcet">{{goodsitem.cfav}}</span>
   </div>
 </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
      props:{
          goodsitem:{
            type:Object,
            default(){
              return []
            }
          }},
        methods:{
          imageLoad(){
            //GoodsListItem.ve与Home.vue非父子关系，通过事件总线$bus发送事件
              this.$bus.$emit('itemImageLoad')
            },
          itemClick(){
            this.$router.push('/detail/'+this.goodsitem.iid)
          }
        }

    }
</script>

<style scoped>
  .goods {
     padding-bottom: 44px;
     position: relative;
     width: 48%;
     height:300px;

  }
  .goods img {
     width: 100%;
     border-radius: 5px;
  }

  .goodsinfo {
     font-size: 13px;
     position:absolute;
     bottom:5px;
     left:0;
     right:0;
     overflow: hidden;
     text-align: center;

  }
  .goodsinfo p {
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
     margin-bottom: 3px;
  }

  .goodsinfo .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goodsinfo .collcet {
    position: relative;
  }

  .goodsinfo .collcet::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
