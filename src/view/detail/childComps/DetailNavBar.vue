<template>
 <div >
   <nav-bar class="nav-bar">
     <div class="back" slot="left" @click="backClick">
       <img src="~assets/img/common/back.svg" alt="" >
     </div>
     <div slot="center" class="title">
       <div v-for="(item,index) in titles" class="title-item"
            :class="{active:index===currentIndex}"
            @click="titleClick(index)">
         {{item}}
       </div>
     </div>
   </nav-bar>
 </div>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";
    export default {
      name: "DetailNavBar",
      components: {
        NavBar
      },
      data(){
          return {
            titles:['商品','参数','评论'],
            currentIndex:0
          }
        },
      methods:{
        titleClick(index){
          this.currentIndex=index;
          this.$emit('titleClick',index)
        },
        backClick(){
           this.$router.back();
        }
      }
    }
</script>

<style scoped>
  .nav-bar{
    position:relative;
    z-index: 9;
    background-color: #ffffff;
  }
.title{
  display:flex;
}
.title-item{
  flex:1;
}
  .active{
    color: var(--color-tint);
  }
  .back img{
   margin-top:10px;
  }
</style>
