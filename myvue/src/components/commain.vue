<template>
  <div class="box">
    <ul>
      <li v-for="item in prolist" :key="item.ptoId" class="commin-box">
        <img :src="item.img"/>
        <p class="proName">{{ item.proName }}</p>
        <p class="price"> ￥ {{ item.price }}</p>
      </li>
    </ul>
  </div>
</template>
  <script>
import axios from "axios";
import { getpro } from "@/api/request.js";
export default {
  name: "Home",
  props: {
  },
  components: {},
  data() {
    return {
      prolist:'',
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
  created() {
    getpro().then((data) => {
      this.prolist = data.data.msg;
      // this.prolist.length = 16
      // this.$emit('myeve',this.prolist)
      // console.log(this.prolist);
    });
  },
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
  <style lang="scss" scoped>
.commin-box {
  width: 45%;
  height: 2rem;
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
.proName{
    overflow: hidden;
    height: 0.4rem;
    font-size: 0.14rem;
    width: 98%;
     margin-left: 0.02rem;
}
.price{
    font-size: 0.14rem;
    margin-left: 0.05rem;
    color: red;
    line-height: 0.14rem;
}

</style>