<template>
  <div class="main">
    <div class="first">
      <div class="first-item">
        <div class="title">
          <div class="title-info">车型对比情况</div>
        </div>
        <div class="chart" id="chart6"></div>
      </div>
      <div class="first-item">
        <div class="title">
          <div class="title-info">车宽、车长情况</div>
        </div>
        <div class="chart" id="chart1"></div>
      </div>
    </div>
    <div class="second">
      <div class="second-item">
        <div class="title">
          <div class="title-info">速度、价格情况</div>
        </div>
        <div class="chart" id="chart3"></div>
      </div>
      <div class="second-item">
        <div class="title" style="position: relative">
          <div class="title-info"></div>
          <div
            style="
              width: 120px;
              position: absolute;
              top: 0;
              right: 0;
              z-index: 1000;
            "
          >
            <el-select
              size="mini"
              style="width: 100%"
              v-model="showType"
              @change="change"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="chart" id="chart4"></div>
      </div>
    </div>
    <div class="third">
      <div class="third-item">
        <div class="title">
          <div class="title-info">载客量对比情况</div>
        </div>
        <div class="chart" id="chart5"></div>
      </div>
      <div class="third-item">
        <div class="title">
          <div class="title-info">供电、驾驶方式情况</div>
        </div>
        <div class="chart" id="chart2"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  trainbar1,
  trainline,
  trainline1,
  trainbar2,
  trainpie,
  trainrader,
  trainbar3,
} from "../assets/js/train-echart";
import echarts from "echarts";
import { request } from "../network/request";
export default {
  name: "ShowTraindata",
  data() {
    return {
      train_width: [],
      train_length: [],
      train_type: [],
      power_type: [],
      driving_type: [],
      speed: [],
      price: [],
      train_name: [],
      passenger_capacity: [],
      train_name1: [],
      train: [],
      options: [
        {
          value: "折线图",
          label: "折线图",
        },
        {
          value: "柱状图",
          label: "柱状图",
        },
      ],
      showType: "",
    };
  },
  watch: {
    train_length() {
      var chart1 = this.echart.init(document.getElementById("chart1"));
      chart1.setOption(
        trainbar1(this.train_width, this.train_length, this.train_type)
      );
    },
  },
  methods: {
    drawLine() {
      var chart1 = this.echart.init(document.getElementById("chart1"));
      chart1.setOption(
        trainbar1(this.train_width, this.train_length, this.train_type)
      );
      var chart2 = this.echart.init(document.getElementById("chart2"));
      chart2.setOption(trainpie(this.driving_type, this.power_type));
      var chart3 = this.echart.init(document.getElementById("chart3"));
      chart3.setOption(trainline());
      var chart4 = this.echart.init(document.getElementById("chart4"));
      chart4.setOption(trainline1());
      var chart5 = this.echart.init(document.getElementById("chart5"));
      chart5.setOption(trainbar2());
      var chart6 = this.echart.init(document.getElementById("chart6"));
      chart6.setOption(trainrader());
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
    getTrainData() {
      request("/api/showTrain/data1").then((res) => {
        this.train_width = this.changeData(res.data, "train_width");
        this.train_length = this.changeData(res.data, "train_length");
        this.train_type = this.changeData(res.data, "train_name");
        var chart1 = this.echart.init(document.getElementById("chart1"));
        chart1.setOption(
          trainbar1(this.train_width, this.train_length, this.train_type)
        );
      });
      request("/api/showTrain/data2").then((res) => {
        this.driving_type = [...res.data.driving_type];
        this.power_type = [...res.data.power_type];
        var chart2 = this.echart.init(document.getElementById("chart2"));
        chart2.setOption(trainpie(this.driving_type, this.power_type));
      });
      request("/api/showTrain/data3").then((res) => {
        this.speed = this.changeData(res.data, "speed");
        this.price = this.changeData(res.data, "price");
        this.train_name = this.changeData(res.data, "train_name");
        var chart3 = this.echart.init(document.getElementById("chart3"));
        chart3.setOption(trainline("速度", this.train_name, this.speed));
        var chart4 = this.echart.init(document.getElementById("chart4"));
        chart4.setOption(trainline1("价格", this.train_name, this.price));
      });
      request("/api/showTrain/data4").then((res) => {
        res.data.sort((a, b) => b.passenger_capacity - a.passenger_capacity);
        this.passenger_capacity = this.changeData(
          res.data,
          "passenger_capacity"
        );
        this.train_name1 = this.changeData(res.data, "train_name");
        var chart5 = this.echart.init(document.getElementById("chart5"));
        chart5.setOption(trainbar2(this.train_name1, this.passenger_capacity));
      });
      request("/api/showTrain/data5").then((res) => {
        res.data.forEach((item) => {
          let obj = {};
          obj.name = item.train_name;
          obj.value = [
            item.train_length,
            item.train_width,
            item.speed,
            item.price,
            item.passenger_capacity,
          ];
          this.train.push(obj);
        });
        var chart6 = this.echart.init(document.getElementById("chart6"));
        chart6.setOption(trainrader(this.train));
      });
    },
    change() {
      if (this.showType == "折线图") {
        var chart3 = this.echart.init(document.getElementById("chart3"));
        chart3.setOption(trainline("速度", this.train_name, this.speed),true);
        var chart4 = this.echart.init(document.getElementById("chart4"));
        chart4.setOption(trainline1("价格", this.train_name, this.price),true);
      } else if (this.showType == "柱状图") {
        var chart3 = this.echart.init(document.getElementById("chart3"));
        chart3.setOption(trainbar3(this.train_name, this.speed));
        var chart4 = this.echart.init(document.getElementById("chart4"));
        chart4.setOption(trainbar3( this.train_name, this.price));
      }
    },
  },
  created() {},
  mounted() {
    this.drawLine();
    this.getTrainData();
  },
};
</script>
<style scoped>
.main {
  padding: 15px;
}
.main .first {
  height: 350px;
  display: flex;
  margin-bottom: 15px;
}
.main .first .first-item:nth-of-type(1) {
  flex: 1;
  margin-right: 15px;
  background-color: #ffffff;
  padding: 25px;
}
.main .first .first-item:nth-of-type(2) {
  flex: 2;
  background-color: #ffffff;
  padding: 25px;
}
.main .second {
  height: 350px;
  margin-bottom: 15px;
  display: flex;
}
.main .second .second-item {
  flex: 1;
  padding: 25px;
  background-color: #ffffff;
}
.main .third {
  height: 320px;
  display: flex;
}
.main .third .third-item:nth-of-type(1) {
  flex: 2;
  margin-right: 15px;
  background-color: #ffffff;
  padding: 25px;
}
.main .third .third-item:nth-of-type(2) {
  flex: 1;
  background-color: #ffffff;
  padding: 10px;
  padding-top: 25px;
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
  height: calc(100% - 36px);
}
</style>