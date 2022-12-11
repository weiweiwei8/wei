import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import './assets/iconfont/iconfont.css';
import router from './router/router';
import store from './store/index'
import VueBus from 'vue-bus';
import echart from 'echarts'
Vue.prototype.echart=echart;
Vue.use(VueBus);
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
