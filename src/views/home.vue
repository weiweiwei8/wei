<template>
  <el-container>
    <el-aside width="199px" v-if="isLeftMenu&&isAllMenu">
      <LeftMenu />
    </el-aside>
    <el-container>
      <el-header v-if="isAllMenu" style="    height: 50px;">
        <TopMenu @closeLeftMenu="closeLeftMenu" />
      </el-header>
      <el-main id="main"> 
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import LeftMenu from "../components/left-menu";
  import TopMenu from "../components/top-menu";
  export default {
    name: "Home",
    components: {TopMenu, LeftMenu},
    data()
    {
      return{
        isLeftMenu:true,
        isAllMenu:true
      }
    },
    methods:{
      closeLeftMenu()
      {
        this.isLeftMenu=!this.isLeftMenu;
      }
    }
  }
</script>

<style scoped>
  .el-container{
    height:100%;
    background:#F0F2F7;
  }
  .el-aside{
  }
  .el-header{
    padding: 0;
  }
  .el-main{
    padding:0;
    background:#F0F2F7;
    height: calc(100% - 52px);
  }

</style>