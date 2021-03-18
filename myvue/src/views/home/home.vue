<template>
  <div class="box">
    <header>
      <span class="xiangqing">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-detail1"></use>
        </svg>
      </span>
      <div @click="$router.push('/search/'+value)">
         <input type="text"  v-model="value"  :disabled="true" @click="$router.push('/search/'+value)"/>
      </div>
      <!-- 搜索 -->
      <!-- <svg class="icon icon-sousuo" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg> -->
      <svg class="icon icon-login" aria-hidden="true">
        <use xlink:href="#icon-geren"></use>
      </svg>
    </header>

    <!-- 身体 -->
    <!-- ref="main" @scroll="onScroll" 用来设置点击回到顶部 -->
    <main ref="main" @scroll="onScroll">
      <!-- 父组件 轮播图-->
      <!-- <banner :imgs="bannerlist"></banner> -->
      <div class="banner-box">
        <van-swipe
          :autoplay="3000"
          indicator-color="white"
          class="banner-swipe"
        >
          <van-swipe-item
            class="my-swipe"
            v-for="item in bannerlist"
            :key="item.bannerId"
          >
            <van-image
              height="1.6rem"
              width="100vw"
              :src="item.src"
              :alt="item.title"
              :title="item.name"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 格子展示 -->
      <van-grid :border="false" :column-num="5">
        <van-grid-item
          :icon="item.icon"
          v-for="item in kindlist"
          :key="item.id"
          :text="item.title"
        />
      </van-grid>
      <!-- 上拉刷新 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 下拉刷新 -->
        <van-pull-refresh
          v-model="isLoading"
          success-text="刷新成功"
          @refresh="onRefresh"
        >
          <!-- 内容 -->
          <ul >
            <li v-for="item in prolist" :key="item.proId" class="commin-box" @click="godetail(item.proId)">
              <img :src="item.img" />
              <p class="proName">{{ item.proName }}</p>
              <p class="price">￥ {{ item.price }}</p>
            </li>
        <!-- <router-link v-for="item in prolist" :key="item.ptoId" class="commin-box" :to='{}'>
              <img :src="item.img" />
              <p class="proName">{{ item.proName }}</p>
              <p class="price">￥ {{ item.price }}</p>
        </router-link> -->
          </ul>
          <!-- <commain v-on:myeve="getData"></commain> -->
          <!-- 下拉刷新 -->
        </van-pull-refresh>
        <!-- 上拉刷新 -->
      </van-list>
    </main>
    <!-- 点击回到顶部 -->
    <div class="my-back-top" @click="goToTop" ref="toTop">
      <svg class="icon icon-dingbu" aria-hidden="true">
        <use xlink:href="#icon-arrow-up-circle"></use>
      </svg>
    </div>
    <!--  -->
  </div>
</template>
<script>
import Vue from "vue";
import { getpro, getbanner, getKind } from "@/api/request.js";
// import commain from "@/components/commain.vue";
// import banner from "@/components/banner.vue";
import {
  Swipe,
  SwipeItem,
  Image as VanImage,
  Grid,
  GridItem,
  List,
  Toast,
  PullRefresh
} from "vant";

Vue.use(List);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(VanImage);
Vue.use(Toast);
Vue.use(PullRefresh);

export default {
  name: "home",
  props: [],
  components: {
    // banner,
    // commain,
  },
  data() {
    return {
      bannerlist: [],
      prolist: "",
      kindlist: [],
      ifshow: false,
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      num: 10,
      b: "",
      index:0,
      value: '搜索',
      icon: [
        "fire-o",
        "coupon-o",
        "gem-o",
        "logistics",
        "brush-o",
        "smile-o",
        "shop-collect-o",
        "gift-card-o",
        "discount",
        "qr-invalid",
      ],
    };
  },
  //方法 函数写这里
  methods: {
    godetail(proId){
      console.log(proId);
      this.$router.push({ name:'detail',query:{id:proId}})
    },
    // 子传父 传过来的商品详情数据
    // getData(v) {
    //   this.b = v;
    //   console.log(this.b);
    // },

    // 上拉刷新
    onLoad() {
      // 开始异步请求数据
      this.loading = true;
      // 本次数据更新成功后，将loading设置为false
      getpro({
        num: this.num,
        index: this.index++,
      }).then((data) => {
        this.loading = false;
        this.prolist = [...this.prolist, ...data.data.msg];
        // 判断数据是否加载完毕
        if (data.data.msg.length < 1) {
          // 将finished设置为true,表示所有数据加载完毕
          this.finished = true;
        }
      });
    },
    // 下拉刷新
    onRefresh() {
      // this.$router.go(0)
      getpro({
        num: this.num,
        index: this.index,
      }).then((data) => {
        this.prolist = data.data.msg;
        this.isLoading = false;
        this.index = 0;
        this.finished = false
        console.log(this.prolist);
      })
    },
    onScroll() {
      // top 页面的滚动条值
      let top = this.$refs.main.scrollTop;
      // console.log(top);
      if (top > 500) {
        // top大于 500 再显示，否则 隐藏
        this.$refs.toTop.style.display = "block";
      } else {
        this.$refs.toTop.style.display = "none";
      }
    },
    // 点击回到顶部
    goToTop() {
      // 点击后,滚动条距离为0
      this.$refs.main.scrollTop = 0;
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
  mounted() {
    // getpro().then((data) => {
    //   this.prolist = data.data.msg;
    //   // this.$emit('myeve',this.prolist)
    //   console.log(this.prolist);
    // });
    getbanner().then((data) => {
      // console.log(data.data.msg);
      this.bannerlist = data.data.msg;
    });
    getKind().then((data) => {
      data.data.msg.forEach((val, index) => {
        this.kindlist.push({
          title: val,
          id: index,
          icon: this.icon[index],
        });
      });
      this.kindlist.length = 10;
      // console.log(this.kindlist);
    });
   
  },
  //页面渲染之前
  beforeMount() {},
  //页面渲染之后
  // mounted() {
  // },
  //页面视图数据更新之前
  beforeUpdate() {},
  //页面视图数据更新之后
  updated() {},
  //页面销毁之前
  beforeDestroy() {},
  //页面销毁之后
  destroyed() {},
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  overflow: auto;
  header {
    display: flex;
    justify-content: space-evenly;
    height: 0.5rem;
    // background: #efefef;
    padding-top: 0.13rem;
    background-color: red;
  }
  main {
    flex: 1;
    overflow: auto;
  }
}
input {
  width: 2.5rem;
  // width: 70%;
  height: 0.3rem;
  border-radius: 0.08rem;
  background-color: #fff;
}

.icon {
  font-size: 0.35rem;
}
.icon-sousuo {
  position: absolute;
  margin-left: -1.1rem;
  margin-top: 0.1rem;
  font-size: 0.15rem;
  color: #a1a3a6;
}

.icon-dingbu {
  //.sticky{
  position: absolute;
  bottom: 0.9rem;
  // top: 35rem;
  right: 0.3rem;
  z-index: 11;
}
.banner-box {
  background-color: red;
  // width: 94%;
  height: 1.1rem;
  margin-bottom: 0.6rem;
  border-radius: 0 0 40% 40%;
}

.banner-swipe {
  width: 96%;
  margin: 0 auto;
  border-radius: 0.1rem;
}
.my-swipe {
  overflow: hidden;
  // padding: 0.1rem;
}
// 详情页
.commin-box {
  width: 44%;
  height: 2.5rem;
  //   border: 1px solid black;
  float: left;
  margin-left: 0.09rem;
  border-radius: 0.15rem;
  overflow: hidden;
  margin-bottom: 0.06rem;
}
.commin-box img {
  width: 100%;
  height: 70%;
}
.proName {
  overflow: hidden;
  height: 0.4rem;
  font-size: 0.14rem;
  width: 98%;
  margin-left: 0.02rem;
}
.price {
  font-size: 0.14rem;
  margin-left: 0.05rem;
  color: red;
  line-height: 0.14rem;
}

// 点击回到顶部
.my-back-top {
  display: none;
}
.icon-login{
  font-size: 0.3rem;
}
</style>