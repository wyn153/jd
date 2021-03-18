import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import cart from './modules/cart.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    num () {
      return cart.state.cartList.reduce((start, val) => {
        return start + val.num
      }, 0)
    },
    flagNum () {
      return cart.state.cartList.reduce((start, val) => {
        return val.flag ? start + val.num : start
      }, 0)
    }
  },
  modules: {
    user,
    cart
  }
})
