<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RecommendView",
        props:{
          recommends:{
            type:Array,
            default(){
              return []
            }
          }
        }
    }
</script>

<style scoped>
 .recommend{
    display:flex;
    width:100%;
    text-align: center;
    font-size:12px;
    padding: 0 0 20px;
    border-bottom:10px solid #eeeeee;
 }
  .recommend-item{
    flex:1;
    padding: 0 5px 0;
  }
  .recommend-item img{
    width:100%;
    margin-top: 10px;
  }
</style>
