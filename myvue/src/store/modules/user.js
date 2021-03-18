export default {
  strict: true,
  // 在用户信息管理功能中需要使用到的状态
  state: {
    isLogin: sessionStorage.getItem('isLogin') || '',
    userId: sessionStorage.getItem('userId') || '',
    token: sessionStorage.getItem('token') || ''
  },
  // 定义将来在组件对象内修改状态的唯一方法
  mutations: {
    change_isLogin (state, payload) {
      state.isLogin = payload
    },
    change_userId (state, payload) {
      state.userId = payload
    },
    change_token (state, payload) {
      state.token = payload
    }
  },
  // 开启命名空间
  namespaced: true
  // 将来在组件中就可以通过以下形式找到当前模块的方法
  // 'user/change_isLogin'
  // 'cart/change_cartList'
}
