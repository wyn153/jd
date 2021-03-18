import axios from 'axios'

// axios的全局配置
const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 给每个请求都添加,token
  config.headers.token = sessionStorage.getItem('token')
  // console.log('发送之前的配置对象：', config)
  // 添加loading
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 后台登录状态的验证，不通过，跳转到登录
  // 后台验证登录信息失败后的返回数据一定要统一：code:400
  if (response.data.code === 400) {
    location.href = 'http://localhost:8080/login'
  }
  // 删除loading
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
