<template>
  <div class="main">
    <div class="content">
      <div class="map">
        <div
          style="
            height: 30px;
            width: 300px;
            margin-top: 10px;
            margin-left: 10px;
            text-align: left;
          "
        >
          <el-button size="mini" @click="showProjectMap">项目</el-button>
          <el-select size="mini" style="width: 50%" v-model="trainType"  @change="showTrainMap" placeholder="车型">
            <el-option
              v-for="item in options"
              :label="item.lable"
              :value="item.value"
              :key="item.value"
             
            ></el-option>
          </el-select>
        </div>
        <div id="map"></div>
      </div>
      <div class="display-info">
        <span>{{ province }}省轨道交通项目情况</span>
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          header-align="center"
          :cell-style="changeCellStyle"
          @cell-click="handleCellClick"
          style="width: 100%"
        >
          <el-table-column
            v-for="(item, index) in tableHeader"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :key="index"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="项目信息" :visible.sync="dialogVisible1" width="60%">
      <el-form
        ref="projectForm"
        label-width="130px"
        :model="projectData"
        disabled
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编号" :required="true" prop="project_id">
              <el-input
                v-model="projectData.project_id"
                placeholder="请输入编号"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" :required="true" prop="project_name">
              <el-input
                v-model="projectData.project_name"
                placeholder="请输入项目名称"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属地区" prop="province" :required="true">
              <el-input v-model="projectData.province" placeholder="请选择省份">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="0" prop="city" :required="true">
              <el-input v-model="projectData.city" placeholder="请选择城市">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="环境复杂度"
              prop="environment"
              :required="true"
            >
              <el-input
                placeholder="请选择环境"
                v-model="projectData.environment"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="线路状况" prop="route_type" :required="true">
              <el-input
                placeholder="请选择线路状况"
                v-model="projectData.route_type"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="客流量/万人次"
              prop="passenger_flow"
              :required="true"
            >
              <el-input
                v-model="projectData.passenger_flow"
                placeholder="请输入客流量"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车型" prop="train_type" :required="true">
              <el-input
                placeholder="请输入车型"
                v-model="projectData.train_type"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编组" prop="train_number" :required="true">
              <el-input
                v-model="projectData.train_number"
                placeholder="请输入编组"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户公司名称" prop="customer" :required="true">
              <el-input
                v-model="projectData.customer"
                placeholder="请输入客户公司名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间" prop="time" :required="true">
              <el-input
                v-model="projectData.time"
                placeholder="请输入时间"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="运行路线" prop="route">
            <el-input
              type="textarea"
              :rows="3"
              v-model="projectData.route"
              placeholder="请输入路线"
              style="width: 100%; display: block"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="车型信息" :visible.sync="dialogVisible2" width="50%">
      <el-form ref="trainForm" label-width="120px" :model="trainData" disabled>
        <el-row>
          <el-col :span="12">
            <el-form-item label="列车编号" :required="true" prop="train_id">
              <el-input
                v-model="trainData.train_id"
                placeholder="请输入列车编号"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车型" :required="true" prop="train_name">
              <el-input
                placeholder="请输入车型"
                v-model="trainData.train_name"
                :disabled="true"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车长/米" prop="train_length" :required="true">
              <el-input
                v-model="trainData.train_length"
                placeholder="请输入车长"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车宽/米" prop="train_width" :required="true">
              <el-input
                v-model="trainData.train_width"
                placeholder="请输入车宽"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="速度(km/h)" prop="speed" :required="true">
              <el-input
                v-model="trainData.speed"
                placeholder="请输入速度"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="载客量(人/组)"
              prop="passenger_capacity"
              :required="true"
            >
              <el-input
                v-model="trainData.passenger_capacity"
                placeholder="请输入载客量"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="价格" prop="price" :required="true">
              <el-input
                v-model="trainData.price"
                placeholder="请输入价格"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="驾驶方式" prop="driving_type" :required="true">
              <el-input
                placeholder="请选择驾驶方式"
                v-model="trainData.driving_type"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="供电方式" prop="power_type" :required="true">
              <el-input
                placeholder="请选择供电方式"
                v-model="trainData.power_type"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china";
import { request } from "../network/request";
export default {
  name: "FirstPage",
  data() {
    return {
      mapData: [],
      tableData: [],
      tableHeader: [
        { label: "项目名称", prop: "project_name", width: "100px" },
        { label: "城市", prop: "city" },
        { label: "车型", prop: "train_type" },
        { label: "编组", prop: "train_number" },
        { label: "时间", prop: "time" },
      ],
      province: "",
      dialogVisible1: false,
      dialogVisible2: false,
      projectData: {},
      trainData: {},
      options: [],
      trainType:''
    };
  },
  methods: {
    drawLine(title) {
      var myChart = this.echart.init(document.getElementById("map"));
      let option = {
        title: {
          text: title,
          subtext: "",
          itemGap: 30,
          left: "center",
          top: "5%",
          textStyle: {
            color: "#000",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: 25,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (e) {
            console.log(e);
            var name = e.name ? e.name : "获取中";
            var value = e.value ? e.value : "暂无数据";
            return `${name}:${value} `;
          },
        },
        visualMap: {
          min: 0,
          max: 6,
          left: "left",
          top: "bottom",
          text: ["高", "低"],
          calculable: true,
          inRange: {
            color: [
              "#ffffff",
              "#E0DAFF",
              "#ADBFFF",
              "#9CB4FF",
              "#6A9DFF",
              "#3889FF",
            ],
          },
        },
        toolbox: {
          show: false,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: {
              readOnly: false,
            },
            restore: {},
            saveAsImage: {},
          },
        },
        geo: {
          map: "china",
          zoom: 1.2,
          label: {
            normal: {
              show: true,
              color: "#c1c4c8",
            },
            emphasis: {
              show: false,
              color: "#292929",
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#fbfbfb",
              borderColor: "#b9b4b7",
            },
            emphasis: {
              areaColor: "yellow",
            },
          },
        },
        series: [
          {
            type: "map",
            mapType: "china",
            geoIndex: 0,
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
            data: this.mapData,
          },
        ],
      };
      myChart.setOption(option);
      myChart.on("click", (params) => {
        this.province = params.name;
        request("/api/index/mapList", { province: this.province }).then(
          (res) => {
            this.tableData = res.data;
          }
        );
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    changeCellStyle(row, column, rowIndex, columnIndex) {
      console.log(row.column);
      if (row.column.label === "车型" || row.column.label === "项目名称") {
        return { color: "#34A9FF" }; // 修改的样式
      } else {
        return "";
      }
    },
    handleCellClick(row, column, cell, event) {
      if (column.label == "项目名称") {
        request("api/project/query1", { project_name: row.project_name }).then(
          (res) => {
            this.projectData = res.data.content[0];
            this.dialogVisible1 = true;
          }
        );
      } else if (column.label == "车型") {
        request("api/train/query1", { train_name: row.train_type }).then(
          (res) => {
            this.trainData = res.data.content[0];
            this.dialogVisible2 = true;
          }
        );
      }
    },
    showTrainMap() {
      request("/api/index/trainmap",{train_type:this.trainType}).then((res) => {
        this.mapData = res.data;
        this.drawLine('全国轨道交通'+this.trainType+'分布情况');
        this.tableData=[];
         this.province=''
      });
    },
    showProjectMap()
    {
      request("/api/index/map").then((res) => {
      this.mapData = res.data;
      this.drawLine('全国轨道交通项目分布情况');
      this.tableData=[];
      this.province=''
    });
    }
  },
  created() {
    request("/api/index/trainType").then((res) => {
      this.options = res.data;
      console.log(res, "res");
    });
  },
  mounted() {
    this.showProjectMap();
  },
};
</script>

<style scoped>
.main {
  padding: 15px;
  height: calc(100% - 30px);
}
.main .content {
  height: 100%;
  display: flex;
  background-color: #fff;
  border-radius: 15px;
}
.main .content .map {
  flex: 1;
}
#map {
  width: 100%;
  height: calc(100% - 30px);
}
.main .content .display-info {
  color: #34a9ff;
  font-size: 18px;
  font-weight: 600;
  width: 420px;
  padding: 20px;
  padding-top: 60px;
}
.el-form {
  padding-right: 50px;
}
.el-dialog__wrapper /deep/ .el-dialog .el-dialog__header .el-dialog__title {
  font-weight: 600;
  font-size: 20px;
}
</style>