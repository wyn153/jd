<template>
  <div class="detailBox box" @scroll="onScroll" ref="detailBox">
    <van-nav-bar left-arrow @click-left="onClickLeft" class="detail-nav-bar1">
      <template #right>
        <van-popover
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
          placement="bottom-end"
        >
          <template #reference>
            <van-icon name="ellipsis" size="18" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
    <!-- 2 -->
    <van-nav-bar
      title="商品详情"
      left-arrow
      @click-left="onClickLeft"
      class="detail-nav-bar2"
    >
      <template #right>
        <van-popover
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
          placement="bottom-end"
        >
          <template #reference>
            <van-icon name="ellipsis" size="18" />
          </template>
        </van-popover>
      </template>
<!--  -->
      <template #title>
        <van-tabbar v-model="active" @change="onChangeFloor">
          <van-tabbar-item > 信息 </van-tabbar-item>
          <van-tabbar-item > 评价 </van-tabbar-item>
          <van-tabbar-item > 推荐 </van-tabbar-item>
        </van-tabbar>
      </template>   
   </van-nav-bar>


    <main>
      <!-- 轮播图 -->
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        :initial-swipe="index"
        @change="onChange"
        ref="mySwipe"
      >
        <van-swipe-item
          v-for="item in imgList"
          :key="item"
          @click="onImgPreView"
        >
          <van-image width="100vw" height="3rem" fit="contain" :src="item" />
        </van-swipe-item>
      </van-swipe>
      <!-- 内容 -->
      <h2>* {{ data.proName }}</h2>
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
      <p>分类：{{ data.kind }}</p>
      <p>品牌：{{ data.brand }}</p>
      <h1 ref="tip">商品评价</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1>评价内容</h1>
      <h1 ref="anli">推荐商品</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
      <h1>推荐内容</h1>
    </main>
    <footer>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :badge="$store.getters.num" 
          @click="$router.push('/cart')"
        />
        <van-goods-action-icon icon="star-o" text="收藏" color="#ff5000" />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="onAddCart"
        />
        <van-goods-action-button type="danger" text="立即购买" @click="$router.push('/order')"/>
      </van-goods-action>
    </footer>
  </div>
</template>
<script>
import Vue from "vue";
import { getDetail, addCart, getCart } from '@/api/request.js'
import { mapMutations } from 'vuex'
import {
  Sidebar,
  SidebarItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Swipe,
  SwipeItem,
  ImagePreview,
  Icon,
  Toast,
  NavBar,
  Popover, Tabbar, TabbarItem
} from "vant";

Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Popover);
Vue.use(Toast);
Vue.use(ImagePreview);
Vue.use(Tabbar)
Vue.use(TabbarItem)

export default {
  name: "detail",
  props: [],
  components: {},
  data() {
    return {
      imgList: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
      index: 0,
      data: {},
      active: 0,
      showPopover: false,
      actions: [
        { text: "首页", path: "/home" },
        { text: "分类", path: "/kind" },
        { text: "购物车", path: "/cart" },
        { text: "我的", path: "/my" },
        { text: "搜索" },
        { text: "分享" },
      ],
    };
  },
  //方法 函数写这里
  methods: {
       ...mapMutations({
      change_cartList: 'cart/change_cartList'
    }),
    onScroll () {
      const t = this.$refs.detailBox.scrollTop
      document.querySelector('.detail-nav-bar2').style.opacity = t / 100
      if (t >= this.$refs.tip.offsetTop - 46 && t < this.$refs.anli.offsetTop - 46) {
        this.active = 1
      } else if (t >= this.$refs.anli.offsetTop - 46) {
        this.active = 2
      } else {
        this.active = 0
      }
    },
    // 导航栏左边
    onClickLeft() {
      this.$router.back();
    },
    // 导航栏右边   跳转路由
    onSelect(v) {
      // console.log(v.path)
      this.$router.push(v.path);
    },

    // 放大图片
    onImgPreView() {
      // 点击轮播图时,通过数据拿到当前索引,根据当前索引创建图片预览,设置默认图片
      const that = this;
      ImagePreview({
        images: this.imgList,
        startPosition: this.index,
        onChange(i) {
          // 当图片预览切换时,根据切换后的索引,设置轮播图的位置
          that.$refs.mySwipe.swipeTo(i);
        },
      });
    },
    onChange(index) {
      // 在轮播图切换时,将索引保存到数据中
      this.index = index;
    },
    // 加入购物车
    onAddCart() {
      addCart({
        userId: sessionStorage.getItem("userId"),
        proId: this.$route.query.id,
        num: 1,
      }).then((data) => {
        if (data.data.code !== 202) {
          Toast("添加购物车成功");
          // 获取购物车数据，更新状态管理器中的购物车数据
          this.updateCartList()
        } else {
          Toast("添加购物车失败!");
        }
      });
    },
    // 购物车实时数据
      updateCartList () {
      getCart({
        userId: sessionStorage.getItem('userId')
      }).then(data => {
        this.change_cartList(data.data.msg.proData)
      })
    },
    // 顶部
      onChangeFloor (v) {
      switch (v) {
        case 0:
          this.$refs.detailBox.scrollTop = 0
          break
        case 1:
          this.$refs.detailBox.scrollTop = this.$refs.tip.offsetTop - 46
          break
        case 2:
          this.$refs.detailBox.scrollTop = this.$refs.anli.offsetTop - 46
          break
      }
      this.active = v
    }
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
 created() {
 
  },

  //页面渲染之前
  beforeMount() {},
  //页面渲染之后
 mounted() {
   this.updateCartList()
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

  //页面视图数据更新之前
  beforeUpdate() {},
  //页面视图数据更新之后
  updated() {},

  //页面销毁之前
  beforeDestroy() {},
  //页面销毁之后
  destroyed() {
  },
};
</script>
<style lang="scss">
.detailBox {
  overflow: auto;
}
.detail-nav-bar1,
.detail-nav-bar2 {
  width: 100vw;
  position: fixed;
  &::after {
    border-bottom: none;
  }
  .van-nav-bar__left,
  .van-nav-bar__right {
    border-radius: 50%;
    background: rgb(131, 129, 129);
    padding: 0;
    width: 0.4rem;
    height: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: static;
    i {
      color: #fff;
    }
  }
}
.detail-nav-bar1 {
  background: none;
}
.detail-nav-bar2 {
  background: #fff;
  opacity: 0;
  .van-nav-bar__left,
  .van-nav-bar__right {
    background: none;
    i {
      color: #000;
    }
  }
}

main p {
  font-size: 0.2rem;
  margin-top: 0.05rem;
}
footer {
  margin-top: 0.8rem;
}
.van-nav-bar__title{
    width: 80%;
    .van-tabbar{
      position: static;
      width: 100%;
      height: 46px;
    }
  }



</style>


