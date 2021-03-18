<template>
  <div class="app">
    <!-- 没有添加name 则默认为default-->
    <router-view></router-view>
     <!-- <router-view name='foot'><router-view/> -->
    <!-- 底部 -->
     <router-view name="foot"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'app',
    props:[],
    components: {

    },
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
    created() {
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
  }
  </script>

<style lang="scss">
.app{
  display: flex;
  flex-direction: column;
  height: 100%;
  .box{
    flex: 1;
  }
}
input button{
outline:none;
border-color: #d3d7d4;
}
</style>

