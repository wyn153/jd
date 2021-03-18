<template>
<!-- 此页面为 顶部 鼠标移动显示另一个顶部  -->
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
    </van-nav-bar>
<main>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
<h1>撑开页面内容</h1>
</main>
</div>
</template>
<script>
import Vue from "vue";
import {
  Icon,
  NavBar,
  Popover,
} from "vant";
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Popover);

export default {
  name: "detail",

  data() {
    return {
      showPopover: false,
      actions: [
        { text: "首页", path: "/home" },
        { text: "分类", path: "/kind" },
        { text: "购物车", path: "/cart" },
        { text: "我的", path: "/my" },
      ],
    };
  },
  //方法 函数写这里
  methods: {
    onScroll() {
      // console.log(this.$refs.detailBox.scrollTop)
      document.querySelector(".detail-nav-bar2").style.opacity =
        this.$refs.detailBox.scrollTop / 100;
    },
    onClickLeft() {
      this.$router.back();
    },
    onSelect(v) {
      // console.log(v.path)
      this.$router.push(v.path);
    },
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
    background: rgb(216, 213, 213);
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

main p{
    font-size: 0.2rem;
    margin-top: 0.05rem;
}
footer{
    margin-top: 0.8rem;
}
</style>


