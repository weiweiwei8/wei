import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
        //存放的键值对就是所要管理的状态
        userName:'',
        onlineState:0
    },
    mutations: {
      login(state,payload) {
        state.userName=payload.userName;
        state.onlineState=payload.onlineState;
        console.log(state.onlineState)
      },
      loginOut(state)
      {
        state.userName='';
        state.onlineState=0;
        console.log(state.onlineState)
      }
    }
})

export default store