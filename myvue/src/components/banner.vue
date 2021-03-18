<template>
  <div class="banner-box">
    <div class="swiper-container">
      <div class="swiper-wrapper" :options="swiperOption">
        <div></div>
        <img
          class="swiper-slide"
          v-for="item in imgs"
          :key="item.bannerId"
          :src="item.src"
          :alt="item.title"
          :title="item.name"
        />
      </div>
      <!-- 如果需要分页器 -->
      <!-- <div class="swiper-pagination"></div> -->
      <!-- 如果需要导航按钮 -->
      <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
      <!-- 如果需要滚动条 -->
      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  name: "bannner",
  props: {
    // 子组件传值
    imgs: {
      required: true,
      type: Array
    },
  },
  components: {},
  data() {
    return {
     
      swiperOption: "",
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
  mounted() {
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: 3000,
      autoplayDisableOnInteraction:false,
    });
  },
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
.swiper-container {
  width: 92%;
  height: 1.8rem;
  border: 1px solid black;
  border-radius: 0.1rem;
}
.banner-box {
  background-color: red;
  width: 100%;
  height: 1rem;
  margin-bottom: 1rem;
  border-radius: 0 0 40% 40%;
}
</style>