<template>
  <div class="box">
    <van-nav-bar
      title="修改用户信息"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="userMsg">
      <van-form @submit="onSubmit">
        <van-field
          v-model="userName"
          label="用户名"
          name="userName"
          readonly
        />
        <van-field
          v-model="passWord"
          type="password"
          name="passWord"
          label="密码"
          placeholder="密码"
        />
        <van-field
          v-model="nickName"
          type="text"
          name="nickName"
          label="昵称"
          placeholder="昵称"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
      <div class="btns">
        <van-button round type="info" @click="$router.back()">取消</van-button>
        <van-button round type="info" @click="onExit()">注销</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, exit, setUser } from '@/api/request.js'
import Vue from 'vue'
import { NavBar, Toast, Form, Field, Button } from 'vant'
import { mapState, mapMutations } from 'vuex'

Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.isLogin === 'ok') {
        next()
      } else {
        next('/login')
      }
    })
  },
  data () {
    return {
      avatar: '',
      userMsg: {},
      userName: '',
      passWord: '',
      nickName: ''
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      userId: state => state.user.userId
    })
  },
  mounted () {
    getUser({
      id: this.userId
    }).then(data => {
      this.userMsg = data.data.msg
      this.userName = this.userMsg.userName
      console.log(this.userMsg)
    })
  },
  methods: {
    ...mapMutations({
      change_isLogin: 'user/change_isLogin',
      change_userId: 'user/change_userId',
      change_token: 'user/change_token'
    }),
    onExit () {
      exit({
        id: this.userId
      }).then(data => {
        if (data.data.code === 200) {
          sessionStorage.setItem('userId', '')
          sessionStorage.setItem('isLogin', '')
          sessionStorage.setItem('token', '')
          this.change_isLogin('')
          this.change_userId('')
          this.change_token('')
          this.$router.push('/home')
        }
      })
    },
    onSubmit (v) {
      console.log(v)
      setUser({
        id: this.userId,
        msg: JSON.stringify(v)
      }).then(data => {
        console.log(data.data)
        this.$router.push('/my')
      })
    }
  }
}
</script>

<style lang="scss">
.userMsg{
  text-align: center;
  .van-uploader{
    margin: 0.4rem 0;
  }
  h3{
    margin-bottom: 0.2rem;
  }
}
.btns{
  display: flex;
  justify-content: center;
  .van-button{
    margin:0 0.2rem
  }
}
</style>
