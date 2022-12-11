<template>
  <div class="main">
    <div class="first">
      <div class="first-item">
        <div class="title">
          <div class="title-info">车型使用情况</div>
        </div>
        <div id="chart1" class="chart"></div>
      </div>
      <div class="first-item">
        <div class="title" style="display: flex; position: relative">
          <div class="title-info">客流量对比情况</div>
          <el-popover
            title="轨道交通项目客流量对比"
            placement="right"
            width="400"
            trigger="click"
            @show="showPopover"
            style="position: absolute; right: 0"
            v-if="isShow"
          >
            <div id="chart22" style="width: 400px; min-height: 500px">111</div>
            <el-button slot="reference" size="mini">加载更多</el-button>
          </el-popover>
        </div>
        <div id="chart2" class="chart"></div>
      </div>
    </div>
    <div class="second">
      <div class="second-item">
        <div class="title">
          <div class="title-info">线路状况分布情况</div>
        </div>
        <div style="position: absolute; top: 60px; left: 50%; z-index: 1000">
          <el-select
            size="mini"
            style="width: 40%"
            v-model="queryData"
            @change="getRouteData"
          >
            <el-option
              v-for="(item, index) in option"
              :value="item.value"
              :label="item.label"
              :key="index"
            >
            </el-option>
          </el-select>
        </div>
        <div class="display-second">
          <div class="second-content">
            <div id="chart3" class="chart1"></div>
          </div>
          <div class="second-content">
            <div class="content">
              <div id="chart5" class="chart1"></div>
            </div>
            <div class="content">
              <div id="chart4" class="chart1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="third">
      <div class="third-item">
        <div class="title">
          <div class="title-info">地理环境分布情况</div>
        </div>
        <div id="chart6" class="chart"></div>
      </div>
      <div class="third-item">
        <div class="title">
          <div class="title-info">客户公司所占比例情况</div>
        </div>
        <div id="chart7" class="chart"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  project1,
  project2,
  pie1,
  pie2,
  pie3,
  bar1,
  bar2,
} from "../assets/js/project-echart";
import { request } from "../network/request";
export default {
  name: "ShowProjectdata",
  data() {
    return {
      queryData: "地面",
      isShow: false,
      option: [],
      data1: [],
      data2: {},
      data22: {},
      data3: {},
      data4: [],
      data5: {},
      data6: [],
      data7: [],
    };
  },
  watch: {
    data1() {
      this.$nextTick(() => {
        var Chart1 = this.echart.init(document.getElementById("chart1"));
        Chart1.setOption(pie1(this.data1));
      });
    },
    data2() {
      this.$nextTick(() => {
        var Chart2 = this.echart.init(document.getElementById("chart2"));
        Chart2.setOption(bar1(this.data2));
      });
    },
    data3() {
      var Chart3 = this.echart.init(document.getElementById("chart3"));
      Chart3.setOption(bar2(this.data3));
    },
    data4() {
      var Chart4 = this.echart.init(document.getElementById("chart4"));
      Chart4.setOption(pie3(this.data4));
    },
    data5() {
      var Chart5 = this.echart.init(document.getElementById("chart5"));
      Chart5.setOption(bar2(this.data5));
    },
    data6() {
      var Chart6 = this.echart.init(document.getElementById("chart6"));
      Chart6.setOption(pie2(this.data6));
    },
    data7() {
      var Chart7 = this.echart.init(document.getElementById("chart7"));
      Chart7.setOption(pie2(this.data7));
    },
  },
  methods: {
    drawLine() {
      var Chart1 = this.echart.init(document.getElementById("chart1"));
      Chart1.setOption(pie1(this.data1));
      var Chart2 = this.echart.init(document.getElementById("chart2"));
      Chart2.setOption(bar1(this.data2));
      var Chart3 = this.echart.init(document.getElementById("chart3"));
      Chart3.setOption(bar2(this.data3));
      var Chart4 = this.echart.init(document.getElementById("chart4"));
      Chart4.setOption(pie3(this.data4));
      var Chart5 = this.echart.init(document.getElementById("chart5"));
      Chart5.setOption(bar2(this.data5));
      var Chart6 = this.echart.init(document.getElementById("chart6"));
      Chart6.setOption(pie2(this.data6));
      var Chart7 = this.echart.init(document.getElementById("chart7"));
      Chart7.setOption(pie2(this.data7));
      window.addEventListener("resize", (e) => {
        Chart1.resize();
        Chart2.resize();
        Chart3.resize();
        Chart4.resize();
        Chart5.resize();
        Chart6.resize();
        Chart7.resize();
      });
    },
    changeData(arr, index) {
      let Arr = [];
      arr.forEach((element) => {
        for (let i in element) {
          if (i == index) {
            Arr.push(element[i]);
          }
        }
      });
      return Arr;
    },
    changePieData(arr, index1, index2) {
      arr.map((element) => {
        for (let i in element) {
          if (i == index1) {
            i = "value";
          } else if (i == index2) {
            i = "name";
          }
        }
      });
      return arr;
    },
    getRouteData() {
      request("/api/showProject/data5", { queryData: this.queryData }).then(
        (res) => {
          let x = this.changeData(res.data, "name");
          let vlaue = this.changeData(res.data, "value");
          this.data5 = {
            x: x,
            value: vlaue,
          };
        }
      );
    },
    getEchartData() {
      request("/api/showProject/querydata").then((res) => {
        this.option = res.data;
      });
      request("/api/showProject/data1").then((res) => {
        this.data1 = res.data;
      });
      request("/api/showProject/data2").then((res) => {
        res.data.sort((a, b) => b.value - a.value);
        this.isShow = res.data.length > 10 ? true : false;
        let data = res.data.slice(0, 10);
        let y = this.changeData(res.data, "y");
        let vlaue = this.changeData(res.data, "value");
        let y1 = this.changeData(data, "y");
        let vlaue1 = this.changeData(data, "value");
        this.data2 = {
          y: y1,
          value: vlaue1,
        };
        this.data22 = {
          y: y,
          value: vlaue,
        };
        console.log(this.data2, "2");
      });
      request("/api/showProject/data5", { queryData: this.queryData }).then(
        (res) => {
          let x = this.changeData(res.data, "name");
          let vlaue = this.changeData(res.data, "value");
          this.data5 = {
            x: x,
            value: vlaue,
          };
        }
      );
      request("/api/showProject/data3").then((res) => {
        let x = this.changeData(res.data, "name");
        let vlaue = this.changeData(res.data, "value");
        this.data3 = {
          x: x,
          value: vlaue,
        };
        this.data4 = res.data;
      });
      request("/api/showProject/data7").then((res) => {
        this.data6 = res.data;
      });
      request("/api/showProject/data8").then((res) => {
        this.data7 = res.data;
      });
    },
    showPopover() {
      this.$nextTick(() => {
        var Chart22 = this.echart.init(document.getElementById("chart22"));
        Chart22.setOption(bar1(this.data22));
        window.addEventListener("resize", (e) => {
          Chart22.resize();
        });
      });
    },
  },
  created() {
    this.getEchartData();
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine();
    });
  },
};
</script>
<style scoped>
.main {
  padding: 15px;
}
.first {
  height: 350px;
  display: flex;
  margin-bottom: 15px;
}
.first .first-item {
  flex: 1;
  padding: 25px;
  background-color: #ffffff;
}
.first .first-item:nth-of-type(1) {
  margin-right: 15px;
}
.second {
  height: 350px;
  display: flex;
  margin-bottom: 15px;
}
.second .second-item {
  flex: 1;
  position: relative;
  padding: 25px;
  background-color: #ffffff;
}
.second .second-item .display-second {
  height: calc(100% - 42px);
  display: flex;
}
.second .second-item .display-second .second-content:nth-of-type(1) {
  flex: 2;
}
.second .second-item .display-second .second-content:nth-of-type(2) {
  flex: 4;
  display: flex;
}
.content {
  flex: 1;
}
.third {
  height: 320px;
  display: flex;
}
.third .third-item {
  flex: 1;
  padding: 25px;
  background-color: #fff;
}
.third .third-item:nth-of-type(1) {
  margin-right: 15px;
}
.title {
  height: 21px;
  text-align: left;
  margin-bottom: 15px;
}
.title .title-info {
  line-height: 21px;
  padding-left: 5px;
  border-left: 4px solid #027aff;
  color: #101010;
  font-weight: 600;
}
.chart {
  height: calc(100% - 42px);
}
.chart1 {
  height: 100%;
}
.chart2 {
  height: 50%;
}
</style>