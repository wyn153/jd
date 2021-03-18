<template>
  <div class="box kindBox">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
    >
      <template #title>
        <van-search
          v-model="value"
          shape="round"
          :disabled="true"
          @click="$router.push('/search/'+value)"
        />
      </template>
    </van-nav-bar>
    <div class="cont">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item :title="item" v-for="item in kindList" :key="item" />
      </van-sidebar>
      <div class="sidebar-cont">
        <van-grid :column-num="3">
          <van-grid-item v-for="item in brandList" :key="item.brandId" :icon="item.logo" :text="item.brand" @click="onSearch(item.brand)" />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Sidebar, SidebarItem, Grid, GridItem , Search} from 'vant'
import { getKind, getBrand } from '@/api/request.js'

Vue.use(NavBar)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Search)

export default {
  data () {
    return {
      value: '手机',
      activeKey: 0,
      kindList: [],
      brandList: []
    }
  },
  methods: {
    onChange (v) {
      getBrand({
        kindKey: this.kindList[v]
      }).then(data => {
        this.brandList = data.data.msg
      })
    },
    onSearch (b) {
      // console.log(b)
      this.$router.push('/searchRes/' + b + '/type/brand')
    }
  },
  mounted () {
    getKind().then(data => {
      this.kindList = data.data.msg
      getBrand({
        kindKey: this.kindList[this.activeKey]
      }).then(data => {
        this.brandList = data.data.msg
        // console.log(this.brandList);
      })
    })
  }
}
</script>

<style lang="scss">
.kindBox{
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  .cont{
    display: flex;
    flex: 1;
    overflow: auto;
    .van-sidebar{
      overflow: auto;
      width: 20vw;
    }
    .sidebar-cont{
      width: 80vw;
    }
  }
}
</style>
