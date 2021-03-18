<template>
  <div>
    <van-nav-bar
      title="注册"
      left-arrow
      right-text="登录"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <!-- 用户名 -->
      <van-field
        v-model="username"
        name="username"
        clearable
        :right-icon="untest"
        placeholder="请输入用户名"
      />
      <!-- 手机号 -->
      <van-field
        v-model="tel"
        name="tel"
        clearable
        :right-icon="teltest"
        placeholder="手机号"
      />
      <!-- 短信 -->
      <van-field
        v-model="sms"
        name="sms"
        clearable
        placeholder="请输入短信验证码"
        :right-icon="smstest"
      >
        <!-- 发送验证码 -->
        <template #button>
          <van-button type="primary" size="small" :disabled="telsms" @click="onSendSms">
            {{smsTitle}}
            </van-button>
        </template>
      </van-field>
      <!-- 密码 -->
      <van-field
        v-model="password"
        type="password"
        name="password"
        clearable
        :right-icon="pwtest"
        placeholder="请输入密码"
      />
      <!-- 提交 -->
      <van-button
      round block
        type="info"
        class="but"
        native-type="submit"
        :disabled="alltest"
        >注册</van-button
      >
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon, Form, Field, Button, Toast, NavBar } from "vant";
import { sendSms, register } from '@/api/request.js'

Vue.use(NavBar);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Icon);
Vue.use(Form);

export default {
  name: "register",
  props: [],
  components: {},
  data() {
    return {
      username: "",
      password: "",
      sms: "",
      tel: "",
      smsTitle:'发送验证码'
    };
  },
  //方法 函数写这里
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      this.$router.push("/login");
    },
  // 发送验证码
    onSendSms(){
       // 设置发送验证码间隔事件
      let time = 10
      // 修改按钮的提示文字
      this.smsTitle = time + 's后重新发送'
      // 开启计时器
      const t = setInterval(() => {
        // 判断时间是否走完
        if (time === 1) {
          // 清除计时器
          clearInterval(t)
          // 修改按钮文字
          this.smsTitle = '发送验证码'
        } else {
          // 一秒减1
          time--
          // 修改按钮文字
          this.smsTitle = time + 's后重新发送'
        }
      }, 1000)
      sendSms({
        tel:Number(this.tel)
      }).then(data => {
        switch (data.data.code){
            case 200:
              Toast('验证码发送成功')
              break
            case 201:
              Toast('验证码再次发送成功')
              break
            case 202:
              Toast('手机号已被注册')
              break
            case 203:
              Toast(data.data.title)
              break
        }
      })
    },
  // 提交
    onSubmit (v) {
      const that = this
      // console.log(this.username)
      // console.log(v)
      register({
        username: v.username,
        password: v.password,
        tel: v.tel,
        code: v.sms
      }).then(data => {
        // console.log(data.data)
        switch (data.data.code) {
          case 200:
            Toast({
              message: '注册成功',
              onClose () {
                that.$router.push('/login')
              }
            })
            break
          case 201:
            Toast('用户名重复')
            break
          case 202:
            Toast('请先发送验证码')
            break
          case 203:
            Toast('手机号已被注册')
            break
          case 204:
            Toast('用户名已被注册')
            break
        }
      })
    }
  },
  //计算属性
  computed: {
    // 提交
    alltest() {
       return this.untest === '' || this.pwtest === '' || this.teltest === '' || this.smstest === ''
    },
    // 用户名
    untest() {
      if (/^.{1,8}$/.test(this.username)) {
        return "success";
      }
      return "";
    },
    // 密码
    pwtest() {
      if (/^.{1,8}$/.test(this.password)) {
        return "success";
      } else {
        return "";
      }
    },
    // 电话
    teltest() {
      if (/^1[3-9]\d{9}$/.test(this.tel)) {
        return "success";
      }
      return "";
    },
    // 短信验证码
    smstest() {
      if (/^\d{6}$/.test(this.sms)) {
        return 'success'
      }
      return ''
    },
    telsms () {
     return this.teltest === '' || this.smsTitle !== '发送验证码'
    },
  },
  //侦听器
  watch: {},
  //过滤器
  filters: {},
  //以下是生命周期
  //组件创建之前
  beforeCreate() {},
  //组件创建之后
  created() {},
  //页面渲染之前
  beforeMount() {},
  //页面渲染之后
  mounted() {
    this.eventBus.$emit("comfoot", false);
  },
  //页面视图数据更新之前
  beforeUpdate() {},
  //页面视图数据更新之后
  updated() {},
  //页面销毁之前
  beforeDestroy() {},
  //页面销毁之后
  destroyed() {
    this.eventBus.$emit("comfoot", true);
  }
};
</script>

<style lang="scss" scoped>
.van-field__control {
  height: 1rem;
}
.but {
  width: 90%;
  margin-top: 0.3rem;
  margin-left: 0.2rem;
  border-radius: 0.05rem;
}
</style>
