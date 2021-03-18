<template>
  <div class="box loginBox">
    <van-nav-bar
      title="登录"
      right-text="去注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-tabs v-model="active" animated>
      <van-tab title="用户名登录">
        <van-form @submit="onSubmit1">
          <van-field
            v-model="username"
            name="username"
            placeholder="用户名"
            :rules="[{ required: true, message: '用户名有误', validator: unTest}]"
          />
          <van-field
            v-model="password1"
            type="password"
            name="password1"
            placeholder="密码"
            :rules="[{ required: true, message: '密码有误', validator: pw1Test}]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">登录</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="手机号登录">
        <van-form @submit="onSubmit2">
          <van-field
            v-model="tel"
            name="tel"
            placeholder="手机号"
          />
          <van-field
            v-model="password2"
            type="password"
            name="password2"
            placeholder="密码"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">登录</van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Tab, Tabs, Form, Field, Button, Toast } from 'vant'
import { login } from '@/api/request.js'

Vue.use(NavBar)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)

export default {
  data () {
    return {
      active: 0,
      username: '',
      password1: '',
      password2: '',
      tel: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      this.$router.push('/register')
    },
    onSubmit1 (v) {
      const that = this
      login({
        username: v.username,
        password: v.password1
      }).then(data => {
        switch (data.data.code) {
          case 200:
            // 存储登录状态:token
            sessionStorage.setItem('token', data.data.token)
            // 存储用户id:msg
            sessionStorage.setItem('userId', data.data.msg)
            // 前端的临时的登录状态：isLogin:ok
            sessionStorage.setItem('isLogin', 'ok')
            Toast({
              message: '登录成功',
              onClose () {
                that.$router.push('/home')
              }
            })
            break
          case 201:
            Toast('用户名不存在')
            break
          case 202:
            Toast('密码错误')
            break
        }
      })
    },
    onSubmit2 () {},
    unTest () {
      return /^.+$/.test(this.username)
    },
    pw1Test () {
      return /^.+$/.test(this.password1)
    }
  }
}
</script>
