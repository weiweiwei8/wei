<template>
  <div class="login-main">
    <div class="content">
      <div class="left">
        <p style="font-size: 30px">Welcome!</p>
        <p>面向轨道交通产品需求分析系统</p>
      </div>
      <div class="right">
        <div class="title">欢迎登陆</div>
        <el-form
          ref="form"
          style="margin: 50px 40px 60px 40px"
          :model="loginData"
          :rules="rules"
        >
          <el-form-item prop="userName">
            <el-input
              prefix-icon="el-icon-user"
              v-model="loginData.userName"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="loginData.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="6">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="login" round
              >登陆</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "../network/request";
export default {
  name: "Login",
  data() {
    return {
      loginData: {
        userName: "",
        password: "",
      },
      checked: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.checked) {
            this.setCookie(this.loginData.userName, this.loginData.password, 7);
          } else {
            this.clearCookie();
          }
          request("/api/user/login", {
            userName: this.loginData.userName,
            password: this.loginData.password,
            onlineState:1
          }).then((res) => {
            console.log(res)
            if (res.data.success == 1) {
              this.$store.commit("login", {
                userName: this.loginData.userName,
              });
              this.$router.push("/home");
            } else if (res.data.success == 0) {
              alert("用户不存在！");
            } else if (res.data.success == 2) {
              alert("密码不正确！");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setCookie(c_name, c_pwd, exdays) {
      var date = new Date();
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * exdays);
      window.document.cookie =
        "username" + "=" + c_name + ";path=/;expires=" + date.toGMTString();
      window.document.cookie =
        "password" + "=" + c_pwd + ";path=/;expires=" + date.toGMTString();
    },
    getCookie() {
      if (document.cookie.length > 0) {
        this.checked = true;
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("=");
          if (arr2[0] === "username") {
            this.loginData.userName = arr2[1];
          } else if (arr2[0] === "password") {
            this.loginData.password = arr2[1];
          }
        }
      }
    },
    clearCookie() {
      this.setCookie("", "", -1);
    },
  },
  mounted() {
    this.getCookie();
  },
};
</script>
<style scoped>
.login-main {
  width: 100%;
  height: 100%;
  background-color: #34a9ff;
  position: relative;
}
.login-main .content {
  height: 400px;
  width: 750px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}
.login-main .content .left {
  flex: 1;
  font-size: 22px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.login-main .content .left::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #ffffff;
  opacity: 0.2;
}
.login-main .content .right {
  flex: 1;
  background-color: #ffffff;
}
.login-main .content .right .title {
  margin-top: 20px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 30px;
  font-weight: 600;
}
.el-input /deep/ .el-input__prefix /deep/ i {
  font-size: 20px;
}
</style>