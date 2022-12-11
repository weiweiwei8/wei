<template>
    <div class="left-menu">
      <div class="title">
        <p class="title-info">轨道交通产品分析系统</p>
      </div>
      <div class="menu-content">
        <div v-for="(item,index) in title" class="menu-item"  @mouseover="mouseOver(index)"
             @mouseleave="mouseLeave(index)" @click="clickMenu(item,index)" :key="index"
             :class="[index===currentIndex||isActive[index]?'active':'no-active']">
          <div class="menu">
            <i :class="icon[index]" class="iconfont"></i>
            <p>{{item}}</p>
            <i v-show="!isActive[index]&&index!==currentIndex" class="iconfont iconaright"></i>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "LeftMenu",
      data()
      {
        return {
          title:['首页','项目数据展示','车型数据展示','数据存储','全域数据查询'],
          icon:['iconyiliaohangyedeICON-','iconxiangmushenbaoguanli','iconly_liecheshike','iconzhanshi','iconchaxun'],
          isActive:[false,false,false,false],
          currentIndex:0
        }
      },
      methods:{
        mouseOver(index)
        {
          this.isActive.splice(index,1,true)
        },
        mouseLeave(index)
        {
          this.isActive.splice(index,1,false)
        },
        clickMenu(item,index)
        {
          this.currentIndex=index;
          this.$bus.emit('showTitle',item);
          if(item==='首页')
          {
            this.$router.push('/first-page')
          }else if(item==='车型数据展示')
          {
            this.$router.push('/train-data')
          }else if(item==='全域数据查询')
          {
            this.$router.push('/query-data')
          }else if(item==='项目数据展示')
          {
            this.$router.push('/project-data')
          }else if(item==='数据存储')
          {
            this.$router.push('/save-data')
          }
        }
      },
      created()
      {
         if(this.$route.path==='/project-data')
          {
            this.currentIndex=1;
          }else if(this.$route.path==='/first-page')
          {
            this.currentIndex=0;
          }else if(this.$route.path==='/train-data')
          {
            this.currentIndex=2;
          }else if(this.$route.path==='/save-data')
          {
            this.currentIndex=3;
          }else if(this.$route.path==='/query-data')
          {
            this.currentIndex=4;
          }
      }
    }
</script>

<style scoped>
.left-menu{
  width: 199px;
  height: 100%;
  background:#F0F2F7;
  color: #000;
}
.title{
  width: 199px;
  height: 48px;
  color:#000;
  font-weight: 600;
  background-color: #fff;
  border-bottom:1px solid  #F6F6F6;
  /*overflow: hidden;*/
  padding-top: 1px;
}
.title .title-info{
  height: 20px;
  font-size: 15px;
  margin:12px 0;
  font-weight: 600;
}
.menu-content{
  height: calc(100% - 50px);
  background-color: #fff;
}
.menu-content .menu-item{
  height: 52px;
  position:relative;
}
.menu-content .menu-item .menu{
  width:155px;
  height:40px;
  border-radius: 4px;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  display:flex;
  align-items: center;
}
.menu-content .menu-item:hover{
  border-left:4px solid #34A9FF;
}
.menu-content .menu-item .menu i{
  font-size:16px;
}
.menu-content .menu-item .menu i:nth-of-type(1){
  margin-left:6px
}
.menu-content .menu-item .menu i:nth-of-type(2){
  position:absolute;
  right:0;
}
.menu-content .menu-item p{
  margin-left: 12px;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 14px;
  font-weight: 500;
}
.active{
  background-color:#E7EDFE;
  border-left:4px solid #34A9FF;
  color:#34A9FF;
}
.no-active{

}

</style>