import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCart(state, payload) {
      console.log(payload);
      // 1.查看是否添加过
      const oldProduct = state.cartList.find(item => item.iid === payload.iid)
      payload.checked = false;
      // 2.+1或者新添加
      if (oldProduct) {
        oldProduct.count += 1
      } else {
        payload.count = 1
        //payload.checked = true;
        state.cartList.push(payload)
      }
    },
    isSelectall(state)
      {
        state.cartList.forEach(item => {
          item.checked = false;
        });
      },
    isunSelectall(state)
    {
      state.cartList.forEach(item => {
        item.checked = true;
      });
    }

  },
    actions: {}
})
export default  store;
