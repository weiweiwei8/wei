import Vue from "vue";
import VueRouter from "vue-router";
import FirstPage from "../views/first-page";
import Login from "../views/login";
import Home from "../views/home";
import QueryData from "../views/query-data"
import SaveData from "../views/save-data"
import ProjectData from "../views/show-projectdata"
import TrainData from "../views/show-traindata"
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/',
        redirect: '/first-page'
      },
      {
        path: '/first-page',
        component: FirstPage
      },
      {
        path: '/query-data',
        component: QueryData
      },
      {
        path: '/save-data',
        component: SaveData
      },
      {
        path: '/project-data',
        component: ProjectData
      },
      {
        path: '/train-data',
        component: TrainData
      }]
  },
  {
    path: '/login',
    component: Login
  }

];

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 } // return的结果, 就是 期望滚动到哪个的位置
 }
});
router.beforeEach((to, from, next) => {
  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') return next()
  var tokenStr;
  if (document.cookie.length > 0) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split("=");
      if (arr2[0] === "username") {
         tokenStr = arr2[1];
      } 
    }
  }
  // 没有token，强制跳转到登录页
  if (!tokenStr)
  {
    alert('请进行用户登录！')
    return next('/login')
  }
  next()
  })
  router.afterEach((to,from,next) => {
    Vue.nextTick(()=>
    {
      document.getElementById('main').scrollTo(0,0);
    })
  

 });
export default router;