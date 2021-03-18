import axios from "@/tools/index.js";

// 轮播图
export function getbanner() {
  return axios.get("/banner");
}

// 商品详情分页
export function getpro(ops) {
  return axios.get("/pro/page",{
    params: ops
  });
}
// 分类
export function getKind() {
  return axios.get('/pro/kind')
}

// 详情页
export function getDetail (ops) {
  return axios.get('/pro/detail', {
    params: ops
  })
}
// 短信
export function sendSms (ops) {
  return axios.get('/user/send', {
    params: ops
  })
}
// 注册
export function register (ops) {
  return axios.post('/user/register', ops)
}
// 登录
export function login (ops) {
  return axios.get('/user/login', {
    params: ops
  })
}

export function getUser (ops) {
  return axios.get('/user/msg', {
    params: ops
  })
}

export function addCart (ops) {
  return axios.post('/cart/add', ops)
}


// 购物车
export function getCart (ops) {
  return axios.get('/cart', {
    params: ops
  })
}
export function setFlag (ops) {
  return axios.post('/cart/flag', ops)
}
export function setAllFlag (ops) {
  return axios.post('/cart/allFlag', ops)
}
export function setNum (ops) {
  return axios.post('/cart/num', ops)
}
export function delCart (ops) {
  return axios.post('/cart/del', ops)
}

export function addOrder (ops) {
  return axios.post('/order/add', ops)
}
export function getOrder (ops) {
  return axios.get('/order', {
    params: ops
  })
}
export function pay (ops) {
  return axios.get('/order/pay', {
    params: ops
  })
}
export function getHistorySearch (ops) {
  return axios.get('/search', {
    params: ops
  })
}
export function addHistorySearch (ops) {
  return axios.post('/search/add', ops)
}
export function delHistorySearch (ops) {
  return axios.post('/search/del', ops)
}
// 搜索
export function getSearch (ops) {
  return axios.get('/pro/search', {
    params: ops
  })
}



export function getBrand (ops) {
  return axios.get('/pro/brand', {
    params: ops
  })
}
export function getSearchBrand (ops) {
  return axios.get('/search/brand', {
    params: ops
  })
}
export function setUserAvatar (ops) {
  return axios.post('/user/avatar', ops)
}
export function exit (ops) {
  return axios.get('/user/exit', {
    params: ops
  })
}
export function setUser (ops) {
  return axios.post('/user/set', ops)
}
