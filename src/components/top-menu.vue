<template>
  <div class="top-menu">
    <div class="left">
      <i class="iconfont iconshouqi" :class="{'active':isActive}" @click="closeLeftMenu" ></i>
    </div>
    <div class="content"></div>
    <div class="right">
      <span><i class="iconfont " style="font-size:26px"></i></span>
      <span >{{$store.state.userName}}</span>
      <span><i class="icontuichu iconfont" @click="loginOut"></i></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TopMenu",
    data()
    {
      return{
        isActive:false,
        title:''
      }
    },
    methods:{
      closeLeftMenu()
      {
        this.isActive=!this.isActive;
        this.$emit('closeLeftMenu')
      },
      loginOut()
      {
        this.$store.commit("loginOut");
        this.$router.replace('/login')
      }
    },
    created() {
      this.$bus.on('showTitle',(item)=>
      {
        this.title=item;
      })
    }
  }
</script>

<style scoped>
  .top-menu{
    height:48px;
    width:100%;
    background-color:#FFFFFF;
    display: flex;
    align-items: center;
    color: #A4A0A0;
    border-bottom:1px solid #F6F6F6;
    border-top:1px solid #F6F6F6;
  }
  .left{
    width:60px;
    height: 48px;
    border:1px solid #F6F6F6;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left i{
    display: block;
  }
  .content{
    flex:1;
  }
  .right{
    min-width:170px;
    position: relative;
  }
  i{
    font-size: 18px;
    margin-right:10px;
    margin-left:10px;
  }
  .active{
    transform: rotate(180deg);
  }
  .el-dropdown-link{
    font-size: 16px;
    color: #A4A0A0;
  }
</style>