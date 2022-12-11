<template>
   <div class="wrapper" ref="wrapper1">
     <div class="content">
       <slot></slot>
     </div>
   </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      name: "Scroll",
      props:{
         probeType: {
           type:Number,
           default:0
         },
        pullUpLoad:{
           type:Boolean,
           default:true,
         }
      },
        data(){
          return {
            scroll:null
          }
        },
      mounted(){
        this.scroll=new BScroll(this.$refs.wrapper1,{
            click:true,
           // 是否实时侦测滚动位置  0: 1:不侦测   2：侦测  3：
            probeType:this.probeType,
          //是否监听上拉加载
            pullUpLoad:this.pullUpLoad
        })
        //监听滚动位置
        this.scroll.on('scroll',(position)=>{
           this.$emit('scroll',position)
        })
        //监听滚动到底部
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp');
        })
      }
    }
</script>

<style scoped>

</style>
