<template>
  <div class="box">
    <header>
      <svg
        class="icon icon-fanhui"
        aria-hidden="true"
        @click="$router.push('/home')"
      >
        <use xlink:href="#icon-icon-"></use>
      </svg>
      <span class="yemian">我的页面</span>
      <svg class="icon icon-gengduo" aria-hidden="true">
        <use xlink:href="#icon-gengduo" @click="$router.push('/setting')"></use>
      </svg>
    </header>
    <main>
      <div class="my-top">
        <div class="userMsg">
          <van-uploader
            :max-size="500 * 500"
            :max-count="1"
            :after-read="readOk"
            @oversize="onOversize"
          >
            <van-image width="100" height="100" :src="avatar" />
          </van-uploader>
          <h3>{{ userMsg.nickName }}</h3>
          <p>账号：{{ userMsg.userName }}</p>
        </div>
        <!-- 商品收藏 -->
        <div class="my-shouchang">
          <van-grid>
            <van-grid-item
              icon="photo-o"
              text="订单"
              @click="$router.push('/order')"
            />
            <van-grid-item
              icon="photo-o"
              text="购物车"
              @click="$router.push('/cart')"
            />
            <van-grid-item icon="photo-o" text="优惠券" />
            <van-grid-item icon="photo-o" text="地址" />
          </van-grid>
        </div>
      </div>
    </main>
  </div>
</template>
  <script>
import { getUser, setUserAvatar } from "@/api/request.js";
import Vue from "vue";
import {
  NavBar,
  Uploader,
  Toast,
  Grid,
  GridItem,
  Image as VanImage,
} from "vant";

Vue.use(NavBar);
Vue.use(Uploader);
Vue.use(Toast);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$store.state.user.isLogin === "ok") {
        next();
      } else {
        console.log("my");
        next({
          replace: true,
          path: "/login",
          query: {
            from: "my",
          },
        });
      }
    });
  },
  data() {
    return {
      avatar: "",
      userMsg: {},
    };
  },
  mounted() {
    getUser({
      id: this.$store.state.user.userId,
    }).then((data) => {
      this.avatar = data.data.msg.avatar;
      this.userMsg = data.data.msg;
    });
  },
  methods: {
    onOversize(f) {
      Toast("请上传 500 x 500 像素的图片");
    },
    readOk(f) {
      setUserAvatar({
        id: sessionStorage.getItem("userId"),
        avatar: f.content,
      }).then((data) => {
        this.avatar = data.data.msg;
      });
    },
  },
};
</script>
<style lang="scss">
header {
  height: 0.25rem;
  display: flex;
  justify-content: space-between;
  padding: 0.1rem;
}
.my-top {
  background: wheat;
}

.userMsg {
  text-align: center;
  .van-uploader {
    margin: 0.4rem 0;
  }
  h3 {
    margin-bottom: 0.2rem;
  }
}
</style>