<template>
  <div class="data-main">
    <div class="title1">
       数据大屏展示
    </div>
    <div class="display-content">
      <div class="left-content">
        <div class="content-item" >
          <div class="title" ><span>项目</span></div>
          <div class="content" id="left-chart1"></div>
        </div>
        <div class="content-item" >
          <div class="title"><span>地理环境</span></div>
          <div class="content" id="left-chart2"></div>
        </div>
        <div class="content-item" >
          <div class="title" ><span>词云</span></div>
          <div class="content" id="left-chart3"></div>
        </div>
      </div>
      <div class="center-content"></div>
      <div class="right-content">
        <div class="content-item" >
          <div class="title"><span>车型载客量对比图</span></div>
          <div class="content" id="right-chart1"></div>
        </div>
        <div class="content-item" >
          <div class="title"><span>车型使用率</span></div>
          <div class="content" id="right-chart2"></div>
        </div>
        <div class="content-item">
          <div class="title"><span></span></div>
          <div class="content" id="right-chart3"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { roption1, roption2,roption3, loption2, loption1 } from "../assets/js/echart";
import { loption3 } from "../assets/js/echart-cloundwound";
import Js2WordCloud from "js2wordcloud";
export default {
  name: "ShowData",
  methods: {
    pageChange() {
      var rightChart1 = this.echart.init(document.getElementById("right-chart1"));
      rightChart1.setOption(roption1);
      var rightChart2 = this.echart.init(document.getElementById("right-chart2"));
      rightChart2.setOption(roption2);
      var rightChart3 = this.echart.init(document.getElementById("right-chart3"));
      rightChart3.setOption(roption3);
      var leftChart1 = this.echart.init(document.getElementById("left-chart1"));
      leftChart1.setOption(loption1);
      var leftChart2 = this.echart.init(document.getElementById("left-chart2"));
      leftChart2.setOption(loption2);
      var leftChart3 = new Js2WordCloud(document.getElementById("left-chart3"));
      leftChart3.setOption(loption3);
      window.addEventListener("resize", () => {
        rightChart1.resize();
        rightChart2.resize();
        leftChart1.resize();
        leftChart2.resize();
        // leftChart3.resize();
      });
    },
  },
  mounted() {
    this.pageChange();
  },
};
</script>
<style scoped>
.data-main {
  width: 100%;
  height: 100%;
  /* background-color: #0d2349; */
  background: url('../assets/images/bg3.jpeg') no-repeat;
  background-size:100% 100%;
}
.title1 {
  height: 50px;
  width: 100%;
  position: relative;
  background: linear-gradient(to bottom, #46f7f5, #0bb1ff);
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 5px;
  text-align:center;
  line-height:50px;
  font-size: 30px;
  font-weight: 500;
  border-bottom:1px solid #06B7BF;
}
.title1::before{
  content:'';
  width: 100%;
  height: 50px;
  position:absolute;
  left:0;
  top:0;
  opacity: 0.3;
  background:linear-gradient(to bottom, #a2dfde, #06e0fd);
}
.display-content {
  margin-top: 10px;
  width: 100%;
  height: calc(100% - 62px);
  display: flex;
  flex-direction: row;
}
.display-content .left-content {
  flex: 3;
  display: flex;
  flex-direction: column;
}
.display-content .content-item {
  flex: 1;
  margin-bottom: 8px;
  margin-left: 10px;
  margin-right: 10px;
  /* border:1px solid #2d6c83; */
  position: relative;
  background: linear-gradient(#06e0fd, #06e0fd) left top no-repeat,
    linear-gradient(#06e0fd, #06e0fd) left top no-repeat,
    linear-gradient(#06e0fd, #06e0fd) right top no-repeat,
    linear-gradient(#06e0fd, #06e0fd) right top no-repeat,
    linear-gradient(#06e0fd, #06e0fd) left bottom no-repeat,
    linear-gradient(#06e0fd, #06e0fd) left bottom no-repeat,
    linear-gradient(#06e0fd, #06e0fd) right bottom no-repeat,
    linear-gradient(#06e0fd, #06e0fd) right bottom no-repeat;
  background-size: 15px 2px, 2px 15px;
  z-index: 50;
}
.display-content .content-item .title{
  width:100%;
  height: 20px;
  margin:0 auto;
  color: #06e0fd;
  position: relative;
  padding-top:5px;
}
.display-content .content-item .title span{
  position: absolute;
  left:50%;
  transform: translateX(-50%);
}
.display-content .content-item .content{
  height: calc(100% - 25px);
}
.display-content .content-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-color: #06e0fd;
  z-index: -10;
}

.display-content .center-content {
  flex: 5;
  border: 1px solid #2d6c83;
}
.display-content .right-content {
  flex: 3;
  display: flex;
  flex-direction: column;
}
</style>