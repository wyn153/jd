<template>
  <div class="detail-box" @scroll="onScroll" ref="detailBox">
    <header>
      <!-- 1 -->
      <div id="detail-header-top" ref="mintop">
        <svg class="icon icon-icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-icon-"></use>
        </svg>
        <svg class="icon icon-gengduo" aria-hidden="true">
          <use xlink:href="#icon-gengduo"></use>
        </svg>
      </div>

      <!-- 2 -->
      <div id="detail-header" ref="mins">
        <svg class="icon icon-icon" aria-hidden="true">
          <use xlink:href="#icon-icon-"></use>
        </svg>
        <span>商品</span>
        <span>评价</span>
        <span>详情</span>
        <span>推荐</span>
        <svg class="icon icon-gengduo" aria-hidden="true">
          <use xlink:href="#icon-gengduo"></use>
        </svg>
      </div>
    </header>
    <main>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in imgList" :key="item">
          <van-image width="100vw" height="3rem" fit="contain" :src="item" />
        </van-swipe-item>
      </van-swipe>
<h1>a</h1>
<h1>a</h1>
<h1>a</h1>
<h1>a</h1>
<h1>a</h1>
<h1>a</h1>
<h1>a</h1>
<h1>a</h1>
<h1>a</h1>
<h1>a</h1>
<h1>a</h1>
<h1>a</h1>
      <!-- <h3>{{ data.proName }}</h3>
      <p>
        原价：<del>{{ data.price }}</del>
      </p>
      <p>折扣：{{ data.discount }}</p>
      <p>
        现价：<span>{{ (data.price * data.discount) / 10 }}</span>
      </p>
      <p>销量：{{ data.sales }}</p>
      <p>库存：{{ data.stock }}</p>
      <p>评分：{{ data.tip }}</p>
      <p>分类：{{ data.kind }}</p> -->
    </main>

    <footer>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon icon="shop-o" text="店铺" badge="0" />
        <van-goods-action-icon icon="star-o" text="收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </footer>
  </div>
</template>
<script>
import Vue from "vue";
import { getDetail } from "@/api/request.js";
import {
  Sidebar,
  SidebarItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Swipe,
  SwipeItem,
} from "vant";

Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Swipe);
Vue.use(SwipeItem);

export default {
  name: "detail",
  props: [],
  components: {},
  data() {
    return {
      fixed: false,
      activeKey: 0,
      data: [],
      imgList: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
    };
  },
  //方法 函数写这里
  methods: {
    onScroll() {
      let top = this.refs.detailBox.scrollTop
      console.log(top);
      // if (top > 30) {
         
      //     this.$refs.mins.style.display = "block";
      //   } else {
      //     this.$refs.mins.style.display = "none";
      //   }
        // if (top < 30) {
        //   this.$refs.mintop.style.display = "block";
        // } else {
        //   this.$refs.mintop.style.display = "none";
        // } 
    },
  },
  //计算属性
  computed: {},
  //侦听器
  watch: {},
  //过滤器
  filters: {},

  //以下是生命周期
  //组件创建之前
  beforeCreate() {},
  //组件创建之后
  async created() {
    console.log(this.$route.query.id);
    // 获取详情页的数据
    getDetail({
      // 商品列表传递的id值
      id: this.$route.query.id,
    }).then((data) => {
      this.imgList.unshift(data.data.msg.img);
      this.data = data.data.msg;
      // console.log(this.data);
    });
  },

  //页面渲染之前
  beforeMount() {},
  //页面渲染之后
  async mounted() {
    this.eventBus.$emit("comfoot", false);

    // this.$refs.box.addEventListener(
    //   "scroll",
    //   (e) => {
    //     let top = document.documentElement.scrollTop;
    //     console.log(top);
    //     if (top > 30) {
    //       console.log(this.$refs.mins);
    //       this.$refs.mins.style.display = "block";
    //     } else {
    //       this.$refs.mins.style.display = "none";
    //     }
    //     if (top < 30) {
    //       this.$refs.mintop.style.display = "block";
    //     } else {
    //       this.$refs.mintop.style.display = "none";
    //     }
    //   },
    //   true
    // );
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
  },
};
</script>
<style lang="scss" scoped>
#detail-header {
  height: 0.5rem;
  width: 100vw;
  background-color: #fff;
  display: none;
  position: fixed;
  z-index: 111;

  //   transition: all 3s;
  span {
    margin: 0.2rem;
    line-height: 0.45rem;
  }
}
.detail-header-top {
  height: 0.5rem;
  width: 100vw;
  padding-top: 0.09rem;
  //   transition: all 3s;
}
.icon-icon {
  float: left;
  margin-left: 0.1rem;
  padding-top: 0.09rem;
}
.icon-gengduo {
  float: right;
  margin-right: 0.1rem;
  padding-top: 0.09rem;
}
header {
  margin-bottom: 0.45rem;
  transition: all 0.3s;
}
.detail-box {
  height: 10rem;
}
</style>
