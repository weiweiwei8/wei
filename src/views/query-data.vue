<template>
  <div class="query-main">
    <el-tabs type="border-card" @tab-click="handleTabClick">
      <el-tab-pane v-for="item1 in tabs" :key="item1" :label="item1">
        <div class="search">
          {{ item }}:
          <el-input v-model="queryName" size="small" placeholder="请输入">
            <i
              slot="suffix"
              class="el-input__icon el-icon-search"
              @click="query(item1)"
            ></i>
          </el-input>
          <el-button size="small" type="primary" @click="queryAll(item1)"
            >查询所有</el-button
          >
        </div>
        <div class="operation">
          <el-upload
            class="upload"
            action=""
            :multiple="false"
            :show-file-list="false"
            accept=".xlsx, .xls"
            :http-request="httpRequest"
          >
            <el-button size="medium" type="text" icon="el-icon-upload"
              >导入</el-button
            >
          </el-upload>
          <el-button
            size="medium"
            type="text"
            @click="exportExcel()"
            icon="el-icon-download"
            >导出本页数据</el-button
          >
          <el-button
            size="medium"
            type="text"
            @click="exportAllExcel()"
            icon="el-icon-download"
            >导出全部</el-button
          >
        </div>
        <div class="select-search" v-if="item == '项目'">
          <el-select
            placeholder="--请选择省份--"
            v-model="province"
            size="small"
          >
            <el-option
              v-for="(item, index) in options6"
              :label="item.label"
              :value="item.label"
              :key="index"
            ></el-option>
          </el-select>
          <el-select
            placeholder="--请选择车型--"
            v-model="train_type"
            size="small"
          >
            <el-option
              v-for="item in options7"
              :label="item.lable"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
          <el-select
            placeholder="--请选择线路状况--"
            v-model="route_type"
            size="small"
          >
            <el-option
              v-for="item in options8"
              :label="item.lable"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
          <el-select
            placeholder="--请选择地理环境--"
            v-model="environment"
            size="small"
          >
            <el-option
              v-for="item in options1"
              :label="item.lable"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
          <el-button
            size="small"
            type="primary"
            @click="selectQuery()"
            style="margin-left: 20px"
            >查询</el-button
          >
          <el-button size="small" @click="reset()">重置</el-button>
        </div>
        <div></div>
        <el-table
          id="table"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          header-align="center"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in tableHeader"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :key="index"
            align="center"
          >
          </el-table-column>
          <el-table-column  label="操作" width="80" align="center">
            <template slot-scope="scope">
              <i
                class="el-icon-edit"
                style="color: #409eff; font-size: 16px; margin-right: 12px"
                @click="handleUpdate(scope.$index, scope.row, item1)"
              ></i>
              <i
                @click="handleDelete(scope.$index, scope.row, item1)"
                class="el-icon-delete"
                style="color: #f56c6c; font-size: 16px"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="total,prev, pager, next"
          style="margin-top: 10px"
          background
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          :total="total"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="编辑项目信息" :visible.sync="dialogVisible1" width="60%" class="dialog">
      <el-form
        ref="projectEditForm"
        label-width="130px"
        :model="projectEditData"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编号" :required="true" prop="project_id">
              <el-input
                v-model="projectEditData.project_id"
                placeholder="请输入编号"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" :required="true" prop="project_name">
              <el-input
                v-model="projectEditData.project_name"
                placeholder="请输入项目名称"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属地区" prop="province" :required="true">
              <el-select
                v-model="projectEditData.province"
                placeholder="请选择省份"
                @change="selectProvince"
                @focus="clickProvince"
              >
                <el-option
                  v-for="(item, index) in selectData"
                  :label="item.label"
                  :value="item.label"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="0" prop="city" :required="true">
              <el-select
                v-model="projectEditData.city"
                placeholder="请选择城市"
                prop="city"
              >
                <el-option
                  v-for="(item, index) in citys"
                  :label="item.label"
                  :value="item.label"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="环境复杂度" prop="environment" :required="true">
              <el-select
                placeholder="请选择环境"
                v-model="projectEditData.environment"
              >
                <el-option
                  v-for="item in options1"
                  :label="item.lable"
                  :value="item.value"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="线路状况" prop="route_type" :required="true">
              <el-select
                placeholder="请选择线路状况"
                v-model="projectEditData.route_type"
              >
                <el-option
                  v-for="item in options2"
                  :label="item.lable"
                  :value="item.value"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="客流量/万人次"
              prop="passenger_flow"
              :required="true"
            >
              <el-input
                v-model="projectEditData.passenger_flow"
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
                v-model="projectEditData.train_type"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编组" prop="train_number" :required="true">
              <el-input
                v-model="projectEditData.train_number"
                placeholder="请输入编组"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
           <el-col :span="12">
          <el-form-item label="客户公司名称" prop="customer" :required="true">
            <el-input
              v-model="projectEditData.customer"
              placeholder="请输入客户公司名称"
            ></el-input>
          </el-form-item>
           </el-col>
           <el-col :span="12">
          <el-form-item label="时间" prop="time" :required="true">
            <el-input
              v-model="projectEditData.time"
              placeholder=""
            ></el-input>
          </el-form-item>
           </el-col>
        </el-row>
        <el-row>
          <el-form-item label="运行路线" prop="route">
            <el-input
              type="textarea"
              :rows="3"
              v-model="projectEditData.route"
              placeholder="请输入路线"
              style="width: 100%; display: block"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitProjectEditData"
            >提交数据</el-button
          >
          <el-button @click="dialogVisible1 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑车型信息" :visible.sync="dialogVisible2" width="50%" class="dialog">
      <el-form ref="trainEditForm" label-width="120px" :model="trainEditData">
        <el-row>
          <el-col :span="12">
            <el-form-item label="列车编号" :required="true" prop="train_id">
              <el-input
                v-model="trainEditData.train_id"
                placeholder="请输入列车编号"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车型" :required="true" prop="train_name">
              <el-input
                placeholder="请输入车型"
                v-model="trainEditData.train_name"
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
                v-model="trainEditData.train_length"
                placeholder="请输入车长"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车宽/米" prop="train_width" :required="true">
              <el-input
                v-model="trainEditData.train_width"
                placeholder="请输入车宽"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="速度(km/h)" prop="speed" :required="true">
              <el-input
                v-model="trainEditData.speed"
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
                v-model="trainEditData.passenger_capacity"
                placeholder="请输入载客量"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="价格" prop="price" :required="true">
              <el-input
                v-model="trainEditData.price"
                placeholder="请输入价格"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="驾驶方式" prop="driving_type" :required="true">
              <el-select
                placeholder="请选择驾驶方式"
                v-model="trainEditData.driving_type"
              >
                <el-option
                  v-for="item in options4"
                  :label="item.lable"
                  :value="item.value"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="供电方式" prop="power_type" :required="true">
              <el-select
                placeholder="请选择供电方式"
                v-model="trainEditData.power_type"
              >
                <el-option
                  v-for="item in options5"
                  :label="item.lable"
                  :value="item.value"
                  :key="item.lable"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="height: 30px">
          <el-button type="primary" @click="submitTrainEditData()"
            >提交数据</el-button
          >
          <el-button @click="dialogVisible2 = false">取消啊</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑客户信息" :visible.sync="dialogVisible3">
      <el-form
        ref="customerEditForm"
        label-width="100px"
        :model="customerEditData"
      >
        <el-form-item label="客户编号" :required="true" prop="customer_id">
          <el-input
            v-model="customerEditData.customer_id"
            placeholder="请输入客户编号"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户名称" :required="true" prop="customer_name">
          <el-input
            v-model="customerEditData.customer_name"
            placeholder="请输入客户公司名称"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="项目名称" prop="project_name">
          <el-input
            v-model="customerEditData.project_name"
            placeholder="请输入项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="车型" prop="train_type">
          <el-input
            placeholder="请输入车型"
            v-model="customerEditData.train_type"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="数量/列" prop="number">
          <el-input
            v-model="customerEditData.number"
            placeholder="请输入数量"
          ></el-input>
        </el-form-item>
        <el-form-item style="height: 30px">
          <el-button type="primary" @click="submitCustomerEditData()"
            >提交数据</el-button
          >
          <el-button @click="dialogVisible3 = false">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { request } from "../network/request";
import XLSX from "xlsx";
import FileSaver from "file-saver";
import { export_json_to_excel } from "../plugins/Export2Excel";
import { datas } from "../assets/js/province-data";
export default {
  name: "QueryData",
  data() {
    return {
      position: 0,
      rowSpanArr: [],
      item: "项目",
      activeName: "first",
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      queryName: "",
      tabs: ["项目", "车型", "客户"],
      tableData: [],
      tableHeader: [],
      tableHeader1: [
        { label: "项目编号", prop: "project_id" },
        { label: "项目名称", prop: "project_name", width: "120px" },
        { label: "省份", prop: "province" },
        { label: "城市", prop: "city" },
        { label: "运行路线", prop: "route", width: "250px" },
        { label: "客户公司名称", prop: "customer", width: "120px" },
        { label: "环境复杂度", prop: "environment" ,width: "100px" },
        { label: "线路状况", prop: "route_type",width: "130px" },
        { label: "客流量/万人次", prop: "passenger_flow", width: "120px" },
        { label: "车型", prop: "train_type" },
        { label: "编组", prop: "train_number" },
        { label: "时间", prop: "time" },
      ],
      tableHeader2: [
        { label: "编号", prop: "train_id" },
        { label: "车型", prop: "train_name" },
        { label: "车长(m)", prop: "train_length" },
        { label: "车宽(m)", prop: "train_width" },
        { label: "速度(km/h)", prop: "speed" },
        { label: "载客量(组)", prop: "passenger_capacity" },
        { label: "价格(万)", prop: "price" },
        { label: "驾驶方式", prop: "driving_type" },
        { label: "供电方式", prop: "power_type" },
      ],
      tableHeader3: [
        { label: "客户编号", prop: "customer_id" },
        { label: "客户名称", prop: "customer_name" },
        { label: "项目名称", prop: "project_name" },
        { label: "车型", prop: "train_type" },
        { label: "数量/列", prop: "number" },
      ],
      projectEditData: {
        project_id: "",
        project_name: "",
        province: "",
        city:'',
        route: "",
        customer: "",
        environment: "",
        route_type: "",
        passenger_flow: "",
        train_type: "",
        train_number: "",
        time:""
      },
      trainEditData: {
        train_id: "",
        train_name: "",
        train_length: "",
        train_width: "",
        speed: "",
        price: "",
        passenger_capacity: "",
        driving_type: "",
        power_type: "",
      },
      customerEditData: {
        customer_id: "",
        customer_name: "",
        project_name: "",
        train_type: "",
        number: "",
      },
      projectTable: {
        project_id: "项目编号",
        project_name: "项目名称",
        province: "省份",
        city: "城市",
        route: "运行路线",
        customer: "客户",
        environment: "环境复杂度",
        route_type: "线路状况",
        passenger_flow: "客流量",
        train_type: "车型",
        train_number: "编组",
        time:"时间"
      },
      trainTable: {
        train_id: "编号",
        train_name: "车型",
        train_length: "车长",
        train_width: "车宽",
        speed: "速度",
        price: "价格",
        passenger_capacity: "载客量",
        driving_type: "驾驶方式",
        power_type: "供电方式",
      },
      customerTable: {
        customer_id: "客户公司编号",
        customer_name: "客户公司名称",
        project_name: "项目名称",
        train_type: "车型",
        number: "数量",
      },
      importData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
       options1: [
        { value: "简单", lable: "简单" },
        { value: "中等", lable: "中等" },
        { value: "复杂", lable: "复杂" },
      ],
      options2: [
        { value: "地下", lable: "地下" },
        { value: "地面", lable: "地面" },
        { value: "高架", lable: "高架" },
        { value: "高架、地下", lable: "高架、地下" },
        { value: "高架、地下、地面", lable: "高架、地下、地面" },
      ],
      options3: [
        { value: "B型车", lable: "B型车" },
        { value: "动车组", lable: "动车组" },
        { value: "市域车", lable: "市域车" },
        { value: "As型车", lable: "As型车" },
        { value: "有轨电车", lable: "有轨电车" },
      ],
      options4: [
        { value: "自动", lable: "自动" },
        { value: "人工", lable: "人工" },
        { value: "自动、人工", lable: "自动、人工" },
      ],
      options5: [
        { value: "接触网", lable: "接触网" },
        { value: "第三轨", lable: "第三轨" },
        { value: "蓄电池", lable: "蓄电池" },
        { value: "蓄电池、第三轨", lable: "蓄电池、第三轨" },
        { value: "接触网、第三轨、蓄电池", lable: "接触网、第三轨、蓄电池" },
      ],
      options6:[],
      options7:[],
      options8:[],
      selectData: [],
      citys: "",
      province: "",
      train_type: "",
      environment: "",
      route_type: "",
    };
  },
  methods: {
    clickProvince() {
      this.projectEditData.city = "";
    },
    selectProvince() {
      for (let item of this.selectData) {
        if (item.label === this.projectEditData.province) {
          this.citys = item.children;
        }
      }
    },
    getPage(url, currentPage) {
      request(url, {
        currentPage: currentPage,
        pageSize: this.pageSize,
      }).then((res) => {
        this.total = res.data.total;
        this.currentPage = res.data.currentPage;
        this.tableData = res.data.content;
      });
    },
    deleteData(url, data, url1) {
      request(url, data).then((res) => {
        console.log(res);
        if (res.data.success === 1) {
          this.$message({
            showClose: true,
            message: "删除成功！",
            type: "success",
          });
           const totalPage = Math.ceil((this.total - 1) / this.pageSize) // 总页数
           this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
           this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
           this.getPage(url1, this.currentPage);
        }
      });
    },
    handleTabClick(tab, event) {
      this.queryName = "";
      this.item = tab.label;
      if (tab.label === "项目") {
        this.getPage("api/project/query", 1);
        this.tableHeader = this.tableHeader1;
      } else if (tab.label === "车型") {
        this.getPage("api/train/query", 1);
        this.tableHeader = this.tableHeader2;
      } else if (tab.label === "客户") {
        this.getPage("api/customer/query", 1);
        this.tableHeader = this.tableHeader3;
      }
    },
    handleCurrentChange(val) {
      if (this.item === "项目") {
        if (this.province != ""||this.environment!=""||this.train_type!=""||this.route_type!="") {
          request("/api/project/selectdata", {
            province: this.province,
            environment: this.environment,
            train_type: this.train_type,
            currentPage: val,
            route_type: this.route_type,
          }).then((res) => {
            this.total = res.data.total;
            this.currentPage = res.data.currentPage;
            this.tableData = res.data.content;
          });
        } else {
           request("/api/project/query", {
            currentPage: val,
            pageSize: this.pageSize,
          }).then((res) => {
            console.log(res);
            this.total = res.data.total;
            this.currentPage = res.data.currentPage;
            this.tableData = res.data.content;
          });
        }
      } else if (this.item === "车型") {
        request("/api/train/query", {
          currentPage: val,
          pageSize: this.pageSize,
        }).then((res) => {
          console.log(res);
          this.total = res.data.total;
          this.currentPage = res.data.currentPage;
          this.tableData = res.data.content;
        });
      } else if (this.item === "客户") {
        request("/api/customer/query", {
          currentPage: val,
          pageSize: this.pageSize,
        }).then((res) => {
          console.log(res);
          this.total = res.data.total;
          this.currentPage = res.data.currentPage;
          this.tableData = res.data.content;
        });
      }
    },
    handleDelete(index, row, item) {
      console.log(index, row, item,'11');
      if (item === "项目") {
        this.deleteData(
          "api/project/delete",
          { project_id: row.project_id },
          "api/project/query"
        );
      } else if (item === "车型") {
        this.deleteData(
          "api/train/delete",
          { train_id: row.train_id },
          "api/train/query"
        );
      } else if (item === "客户") {
        this.deleteData(
          "api/customer/delete",
          { customer_id: row.customer_id },
          "api/customer/query"
        );
      }
    },
    handleUpdate(index, row) {
      if (this.item === "项目") {
        this.dialogVisible1 = true;
        request("/api/project/updatedata", {
          project_id: row.project_id,
        }).then((res) => {
          console.log(res);
          this.projectEditData = res.data.content[0];
        });
      } else if (this.item === "车型") {
        this.dialogVisible2 = true;
        request("/api/train/updatedata", {
          train_id: row.train_id,
        }).then((res) => {
          console.log(res);
          this.trainEditData = res.data.content[0];
        });
      } else if (this.item === "客户") {
        this.dialogVisible3 = true;
        request("/api/customer/updatedata", {
          customer_id: row.customer_id,
        }).then((res) => {
          console.log(res);
          this.customerEditData = res.data.content[0];
        });
      }
    },
    query(item) {
      if (item === "项目") {
        request("/api/project/query1", { project_name: this.queryName }).then(
          (res) => {
            this.total = 1;
            this.currentPage = 1;
            this.tableData = res.data.content;
          }
        );
      } else if (item === "车型") {
        request("/api/train/query1", { train_name: this.queryName }).then(
          (res) => {
            this.total = 1;
            this.currentPage = 1;
            this.tableData = res.data.content;
          }
        );
      } else if (item === "客户") {
        request("/api/customer/query1", { customer_name: this.queryName }).then(
          (res) => {
            this.total = 1;
            this.currentPage = 1;
            this.tableData = res.data.content;
          }
        );
      }
    },
    queryAll(item) {
      if (item === "项目") {
        this.getPage("api/project/query");
        this.tableHeader = this.tableHeader1;
      } else if (item === "车型") {
        this.getPage("api/train/query");
        this.tableHeader = this.tableHeader2;
      } else if (item === "客户") {
        this.getPage("api/customer/query");
        this.tableHeader = this.tableHeader3;
      }
    },
    //导入
    httpRequest(e) {
      const file = e.file; // 文件信息
      if (!file) {
        // 没有文件
        return false;
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
        return false;
      }
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = () => {
        try {
          const data = fileReader.result;
          const workbook = XLSX.read(data, {
            type: "binary", // 以字符编码的方式解析
          });
          console.log(workbook,'workbook')
          const exlname = workbook.SheetNames[0]; // 取第一张表
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]); // 生成json表格内容
          console.log(exl, "excel");
          var title;
          var url;
          var url1;
          if (this.item === "项目") {
            title = this.projectTable;
            url = "api/project/add";
            url1 = "api/project/query";
          } else if (this.item === "车型") {
            title = this.trainTable;
            url = "api/train/add";
            url1 = "api/train/query";
          } else if (this.item === "客户") {
            title = this.customerTable;
            url = "api/customer/add";
            url1 = "api/customer/query";
          }
          exl.forEach((item) => {
            let obj = {};
            for (var key in title) {
              if (item[title[key]] === undefined) {
                obj[key] = "";
              } else {
                obj[key] = item[title[key]];
              }
            }
            this.importData.push(obj);
          });
          console.log(this.importData)
          request(url, { formData: this.importData }).then((res) => {
            if (res.data.success == 1) {
              this.getPage(url1);
              this.$message({
                showClose: true,
                message: "导入成功！",
                type: "success",
              });
            } else {
              this.$message({
                showClose: true,
                message: "未导入成功！",
                type: "error",
              });
            }
            this.importData = [];
          });
        } catch (e) {
          console.log("出错了：：");
        }
      };
    },
    //导出本页数据
    exportExcel() {
      var table = document.querySelector("#table");
      var xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      var wb;
      wb = XLSX.utils.table_to_book(table, xlsxParam);
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          this.item + "信息.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    getExportData(url) {
      var excelHeader = [];
      var excelData = [];
      var excelName = this.item + "信息表";
      request(url).then((res) => {
        console.log(res.data,'data')
        for (let index in this.tableHeader) {
          excelHeader.push(this.tableHeader[index].label);
        }
        res.data.content.forEach((item) => {
          let arr = [];
          for (let i in item) {
            arr.push(item[i]);
          }
          console.log(arr)
          excelData.push(arr);
        });
        export_json_to_excel(excelHeader, excelData, excelName);
      });
      excelData = [];
    },
    //导出所有数据
    exportAllExcel() {
      if (this.item === "项目") {
        this.getExportData("api/project/queryAll");
      } else if (this.item === "车型") {
        this.getExportData("api/train/queryAll");
      } else if (this.item === "客户") {
        this.getExportData("api/customer/queryAll");
      }
    },
    submitProjectEditData() {
      request("/api/project/update", { editData: this.projectEditData }).then(
        (res) => {
          console.log(res);
          if (res.data.success === 1) {
            this.$message({
              showClose: true,
              message: "修改成功！",
              type: "success",
            });
            this.getPage("api/project/query", 1);
            this.dialogVisible1 = false;
          }
        }
      );
    },
    submitTrainEditData() {
      request("/api/train/update", { editData: this.trainEditData }).then(
        (res) => {
          console.log(res);
          if (res.data.success === 1) {
            this.$message({
              showClose: true,
              message: "修改成功！",
              type: "success",
            });
            this.getPage("api/train/query", 1);
            this.dialogVisible2 = false;
          }
        }
      );
    },
    submitCustomerEditData() {
      request("/api/customer/update", { editData: this.customerEditData }).then(
        (res) => {
          console.log(res);
          if (res.data.success === 1) {
            this.$message({
              showClose: true,
              message: "修改成功！",
              type: "success",
            });
            this.getPage("api/customer/query", 1);
            this.dialogVisible3 = false;
          }
        }
      );
    },
    getProvinceData() {
      this.train_type = "";
      this.route_type = "";
      this.environment = "";
      this.queryName = "";
      request("/api/project/selectdata1", { province: this.province }).then(
        (res) => {
          this.total = res.data.total;
          this.currentPage = res.data.currentPage;
          this.tableData = res.data.content;
        }
      );
    },
    selectQuery() {
      request("/api/project/selectdata", {
        province: this.province,
        environment: this.environment,
        train_type: this.train_type,
        route_type: this.route_type,
      }).then((res) => {
        console.log(res,'res')
        this.total = res.data.total;
        this.currentPage = res.data.currentPage;
        this.tableData = res.data.content;
      });
    },
    reset() {
      this.province = "";
      this.environment = "";
      this.train_type = "";
      this.route_type = "";
      this.queryName = "";
    },
  },
  created() {
    this.getPage("api/project/query", 1);
    this.tableHeader = this.tableHeader1;
    this.selectData = datas;
    request("/api/project/queryData", { queryData: "route_type" }).then(
      (res) => {
        this.options8 = res.data;
      }
    );
    request("/api/project/queryData", { queryData: "train_type" }).then(
      (res) => {
        this.options7 = res.data;
      }
    );
    request("/api/project/queryData", { queryData: "province" }).then(
      (res) => {
        this.options6 = res.data;
      }
    );
  },
};
</script>
<style scoped>
.query-main {
  padding: 20px 10px 20px 10px;
}
.tel-tab-pane {
  position: relative;
}
.search {
  height: 40px;
  margin-top: 15px;
  margin-bottom: 10px;
  position: relative;
  text-align: left;
  line-height: 40px;
}
.search .el-input {
  width: 200px;
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
}
.search .el-button {
  position: absolute;
  left: 250px;
  top: 50%;
  transform: translateY(-50%);
}
.operation {
  position: absolute;
  right: 15px;
  top: 30px;
  display: flex;
}
.operation .upload {
  margin-right: 10px;
}
.select-search {
  text-align: left;
  margin-left: 40px;
  margin-bottom: 10px;
  display: flex;
}
.select-search .el-select {
  margin-right: 20px;
}
.el-select {
  width: 100%;
}
.el-form {
  padding-right: 50px;
}
 .dialog /deep/ .el-dialog .el-dialog__header .el-dialog__title
  {
  font-weight: 600;
  font-size: 20px;
}
</style>