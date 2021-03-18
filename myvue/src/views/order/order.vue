<template>
  <div class="box">
    <van-nav-bar
      title="我的订单"
      right-text="购物车"
      left-arrow
      @click-left="$router.back()"
      @click-right="$router.push('/cart')"
    />
    <van-tabs v-model="active" animated swipeable>
      <van-tab title="待支付" >
        <div class="orderList" v-for="(item,idx) in tobePaid" :key="item.orderId">
          <h4>订单号：{{item.time}}</h4>
          <div class="orderPro">
            <van-card
              v-for="data in item.proData"
              :key="data.proID"
              :num="data.num"
              :price="data.price"
              :title="data.proName"
              :thumb="data.img"
            />
          </div>
          <van-submit-bar
            :price="orderPricePay(idx)"
            button-text="去支付"
            @submit="onSubmit(0,idx)"
          />
        </div>
      </van-tab>
      <van-tab title="待发货">
        <div class="orderList" v-for="item in tobeDelivered" :key="item.orderId">
          <h4>订单号：{{item.time}}</h4>
          <div class="orderPro">
            <van-card
              v-for="data in item.proData"
              :key="data.proID"
              :num="data.num"
              :price="data.price"
              :title="data.proName"
              :thumb="data.img"
            />
          </div>
        </div>
      </van-tab>
      <van-tab title="待收货">内容 3</van-tab>
      <van-tab title="待评价">内容 4</van-tab>
      <van-tab title="已完成">内容 5</van-tab>
      <van-tab title="售后">内容 6</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getOrder, pay } from '@/api/request.js'
import Vue from 'vue'
import { NavBar, Tab, Tabs, Card, SubmitBar } from 'vant'

Vue.use(NavBar)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Card)
Vue.use(SubmitBar)

export default {
  beforeRouteEnter (to, from, next) {
    if (sessionStorage.getItem('isLogin') === 'ok') {
      next()
    } else {
      next('/login?from=' + from.name)
    }
  },
  data () {
    return {
      active: 0,
      orderList: [],
      tobePaid: [],
      tobeDelivered: [],
      tobeReceived: [],
      tobeEvaluated: [],
      completed: [],
      afterSales: []
    }
  },
  mounted () {
    this.getOrderData()
  },
  methods: {
    getOrderData () {
      this.orderList = []
      this.tobePaid = []
      this.tobeDelivered = []
      this.tobeReceived = []
      this.tobeEvaluated = []
      this.completed = []
      this.afterSales = []
      getOrder({
        userId: sessionStorage.getItem('userId')
      }).then(data => {
        // 将所有数据直接渲染
        this.orderList = data.data.msg
        this.orderList.forEach(val => {
          switch (val.state) {
            case 0:
              this.tobePaid.push(val)
              break
            case 1:
              this.tobeDelivered.push(val)
              break
            case 2:
              this.tobeReceived.push(val)
              break
            case 3:
              this.tobeEvaluated.push(val)
              break
            case 4:
              this.completed.push(val)
              break
            case 5:
              this.afterSales.push(val)
              break
          }
        })
      })
    },
    orderPricePay (i) {
      const arr = this.tobePaid[i].proData
      // console.log(arr)
      return arr.reduce((start, val) => {
        return start + val.num * val.price * 100
      }, 0)
    },
    onSubmit (t, i) {
      switch (t) {
        case 0:
          console.log('去支付', this.tobePaid)
          pay({
            userId: sessionStorage.getItem('userId'),
            orderId: this.tobePaid[i].orderId
          }).then(data => {
            console.log(data.data)
            this.active++
            this.getOrderData()
          })
          break
        case 2:
          console.log(this.tobePaid)
          break
        case 3:
          console.log(this.tobePaid)
          break
        case 4:
          console.log(this.tobePaid)
          break
        case 5:
          console.log(this.tobePaid)
          break
      }
    }
  }
}
</script>

<style>
.van-submit-bar{
  position: static;
}
</style>
