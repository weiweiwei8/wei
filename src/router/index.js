import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const Home = () => import('../view/home/Home')
const Cart = () => import('../view/cart/Cart')
const Detail = () => import('../view/detail/Detail')
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router=new VueRouter({
  routes,
  mode:'history'
})
export default  router;
