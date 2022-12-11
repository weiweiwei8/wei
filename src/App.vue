<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Home from "./views/home";

export default {
  name: "App",
  components: {
    Home,
    HelloWorld,
  },
  data() {
    return {
      isRouterAlive: true,
      userName: "",
      password: "",
    };
  },
  methods: {
    getCookie() {
      if (document.cookie.length > 0) {
        this.checked = true;
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("=");
          if (arr2[0] === "username") {
            this.userName = arr2[1];
          } else if (arr2[0] === "password") {
            this.password = arr2[1];
          }
        }
      }
    },
  },
  created() {
    this.getCookie();
    this.$store.commit("login", {
      userName: this.userName,
      onlineState:0
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
* {
  margin: 0;
  padding: 0;
}
.el-button--primary {
  color: #fff;
  background-color: #34a9ff;
  border-color: #34a9ff;
}
</style>
