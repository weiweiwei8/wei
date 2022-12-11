<template>
  <div class="main">
    <el-tabs type="border-card">
      <el-tab-pane label="项目">
        <div class="title">基本信息</div>
        <el-form ref="projectForm" label-width="130px" :model="projectData">
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目编号" :required="true" prop="project_id">
                <el-input
                  v-model="projectData.project_id"
                  placeholder="请输入编号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="项目名称"
                :required="true"
                prop="project_name"
              >
                <el-input
                  v-model="projectData.project_name"
                  placeholder="请输入项目名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属地区" prop="province">
                <el-select
                  v-model="projectData.province"
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
              <el-form-item label-width="0" prop="city">
                <el-select
                  v-model="projectData.city"
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
              <el-form-item label="环境复杂度" prop="environment">
                <el-select
                  placeholder="请选择环境"
                  v-model="projectData.environment"
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
              <el-form-item label="线路状况" prop="route_type">
                <el-select
                  placeholder="请选择线路状况"
                  v-model="projectData.route_type"
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
              <el-form-item label="客流量" prop="passenger_flow">
                <el-input
                  v-model="projectData.passenger_flow"
                  placeholder="请输入客流量"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="车型" prop="train_type">
                <el-input
                  placeholder="请输入车型"
                  v-model="projectData.train_type"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编组" prop="train_number">
                <el-input
                  v-model="projectData.train_number"
                  placeholder="请输入编组"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             <el-col :span="12">
            <el-form-item label="客户公司名称" prop="customer">
              <el-input
                v-model="projectData.customer"
                placeholder="请输入客户公司名称"
              ></el-input>
            </el-form-item>
             </el-col>
             <el-col :span="12">
            <el-form-item label="时间" prop="time">
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
          <el-form-item >
            <el-button type="primary" @click="submitProjectData('projectForm')"
              >提交数据</el-button
            >
            <el-button @click="resetForm('projectForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="车型">
       <div class="title">基本信息</div>
        <el-form ref="trainform" label-width="130px" :model="trainData">
          <el-row>
            <el-col :span="12">
              <el-form-item label="列车编号" :required="true" prop="train_id">
                <el-input
                  v-model="trainData.train_id"
                  placeholder="请输入列车编号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车型" :required="true" prop="train_name">
                <el-input
                  placeholder="请输入车型"
                  v-model="trainData.train_name"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="车长" prop="train_length">
                <el-input
                  v-model="trainData.train_length"
                  placeholder="请输入车长"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车宽" prop="train_width">
                <el-input
                  v-model="trainData.train_width"
                  placeholder="请输入车宽"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="速度" prop="speed">
                <el-input
                  v-model="trainData.speed"
                  placeholder="请输入速度"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="载客量" prop="passenger_capacity">
                <el-input
                  v-model="trainData.passenger_capacity"
                  placeholder="请输入载客量"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="价格" prop="price">
                <el-input
                  v-model="trainData.price"
                  placeholder="请输入价格"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="驾驶方式" prop="driving_type">
                <el-select
                  placeholder="请选择驾驶方式"
                  v-model="trainData.driving_type"
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
              <el-form-item label="供电方式" prop="power_type">
                <el-select
                  placeholder="请选择供电方式"
                  v-model="trainData.power_type"
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
            <el-button type="primary" @click="submitTrainData('trainform')"
              >提交数据</el-button
            >
            <el-button @click="resetForm('trainform')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="客户">
        <div class="title">基本信息</div>
        <el-form
          ref="customerForm"
          label-width="100px"
          :model="customerData"
          style="padding-right: 300px; padding-left: 300px"
        >
          <el-form-item label="客户编号" :required="true" prop="customer_id">
            <el-input
              v-model="customerData.customer_id"
              placeholder="请输入客户编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户名称" :required="true" prop="customer_name">
            <el-input
              v-model="customerData.customer_name"
              placeholder="请输入客户公司名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="项目名称" prop="project_name">
            <el-input
              v-model="customerData.project_name"
              placeholder="请输入项目名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="车型" prop="train_type">
            <el-input
                  placeholder="请输入车型"
                  v-model="customerData.train_type"
                >
                </el-input>
          </el-form-item>
          <el-form-item label="数量/列" prop="number">
            <el-input
              v-model="customerData.number"
              placeholder="请输入数量"
            ></el-input>
          </el-form-item>
          <el-form-item style="height: 30px">
            <el-button
              type="primary"
              @click="submitCustomerData('customerForm')"
              >提交数据</el-button
            >
            <el-button @click="resetForm('customerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { request } from "../network/request";
import { datas } from "../assets/js/province-data";
export default {
  name: "SaveData",
  data() {
    return {
      selectData: [],
      citys:'',
      projectData: {
        project_id: "",
        project_name: "",
        province: "",
        city: "",
        route: "",
        customer: "",
        environment: "",
        route_type: "",
        passenger_flow: "",
        train_type: "",
        train_number: "",
        time:''
      },
      trainData: {
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
      customerData: {
        customer_id: "",
        customer_name: "",
        project_name: "",
        train_type: "",
        number: "",
      },
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
    };
  },
  methods: {
    submitProjectData(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(valid);
          request("/api/project/add", { formData: [this.projectData] }).then(
            (res) => {
              console.log(res);
              if (res.data.success === 1) {
                this.$message({
                  showClose: true,
                  message: "添加成功！",
                  type: "success",
                });
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitTrainData(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(valid);
          request("/api/train/add", { formData: [this.trainData] }).then(
            (res) => {
              console.log(res);
              if (res.data.success === 1) {
                this.$message({
                  showClose: true,
                  message: "添加成功！",
                  type: "success",
                });
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitCustomerData(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(valid);
          request("/api/customer/add", { formData: [this.customerData] }).then(
            (res) => {
              console.log(res);
              if (res.data.success === 1) {
                this.$message({
                  showClose: true,
                  message: "添加成功！",
                  type: "success",
                });
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    clickProvince() {
      this.projectData.city = "";
    },
    selectProvince() {
      for (let item of this.selectData) {
        if (item.label === this.projectData.province) {
          this.citys = item.children;
        }
      }
    },
  },
  created() {
    this.selectData = datas;
  },
};
</script>
<style scoped>
.main {
  padding: 20px 10px 20px 10px;
}
.title{
  width:80px;
  font-weight: 600;
  text-align: center;
  line-height: 15px;
  box-shadow: 4px 0px  #34A9FF inset;
}
.el-form {
  padding: 10px 60px 0 20px;
}
.el-select {
  width: 100%;
}
</style>