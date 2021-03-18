export default {
  strict: true,
  // 在购物车功能中需要使用到的状态
  state: {
    cartList: []
  },
  // 定义将来在组件对象内修改状态的唯一方法
  mutations: {
    change_cartList (state, payload) {
      state.cartList = payload
    }
  },
  // 开启命名空间
  namespaced: true
}
