import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/home.vue'
import comfoot from '@/components/comfoot.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/home',
    components:{
      default:home,
      foot:comfoot
    }
  },
  {
    path: '/kind',
    name: 'kind',
    components:{
      default:() => import(
      /* webpackChunkName: "kind" */'../views/kind/kind.vue'
      ),
      foot:comfoot
    }
  },
  {
    path: '/cart',
    name: 'cart',
    components:{
      default:() => import(
    /* webpackChunkName: "pro" */'../views/cart/cart.vue'
    ),
    foot:comfoot
   }
  },
  {
    path: '/my',
    name: 'my',
    components:{
        default:() => import(
      /* webpackChunkName: "pro" */'../views/my/my.vue'
      ),
      foot:comfoot
     }
    ,
     // 单个路由守卫
     beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('isLogin') === 'ok') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "user" */'../views/login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "user" */'../views/login/register.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "pro" */'../views/detail/detail.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import(/* webpackChunkName: "kind" */'../views/order/order.vue')
  },
  {
    path: '/search/:s',
    name: 'search',
    components: {
      default: () => import(/* webpackChunkName: "search" */ '../views/search/search.vue')
    },
    props: true
  }, {
    path: '/searchRes/:s/type/:t',
    name: 'searchRes',
    components: {
      default: () => import(/* webpackChunkName: "search" */ '../views/searchRes/searchRes.vue')
    },
    props: {
      default: true
    }
  }, {
    path: '/setting',
    name: 'Setting',
    components: {
      default: () => import(/* webpackChunkName: "user" */ '../views/setting/setting.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 全局路由守卫(所有)
// router.beforeEach((to, from, next) => {
//   if (sessionStorage.getItem('isLogin') === 'ok' || to.name === 'Login' || to.name === 'Register') {
//     next()
//   } else {
//     next('/login')
//   }
// })

export default router

