<template>
    <ul class="foot-nav">
      <router-link to='/home' tag="li">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouye"></use>
      </svg>
        <p>首页</p>
      </router-link>

      <router-link to="/kind" tag="li">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-detail"></use>
      </svg>      
        <p>详情</p>
      </router-link>

      <router-link to="/cart" tag="li">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gouwuche"></use>
      </svg>
        <p>购物</p>
      </router-link>

      <router-link to="/my" tag="li">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-geren"></use>
      </svg>
        <p>个人</p>
      </router-link>
    </ul>
</template>
<script>
export default {
  name: "comfoot",
  props: [],
  components: {},
  data() {
    return {
    };
  },
  //方法 函数写这里
  methods: {},
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
  created() {},

  //页面渲染之前
  beforeMount() {},
  //页面渲染之后
  mounted() {},

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

<style lang="scss">
.foot-nav{
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #efefef;
  li{
    height: 100%;
    list-style: none;
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span{
      font-size: 0.3rem;
    }
    &.router-link-active{
      // background: pink;
      color:orangered;
    }
  }
}
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
       font-size: 0.24rem;
       margin-bottom: 0.1rem;
    }
</style>