<template>
  <div class="box searchResBox">
    <van-nav-bar
      :title="s"
      left-arrow
      @click-left="$router.push(t==='brand' ? '/kind' : '/search/'+s)"
    />
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value" :options="option" @change="onSort" />
        <van-dropdown-item title="筛选" ref="item">
          请输入价格区间：
          <van-field v-model="minPrice" type="digit"/>
          -
          <van-field v-model="maxPrice" type="digit"/>
          <div style="padding: 5px 16px;">
            <van-button type="danger" round @click="onConfirm">
              确认
            </van-button>
            <van-button type="danger" round @click="onReset">
              重置
            </van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    <div class="proCont">
      <transition-group name="fade">
        <div v-for="(item,idx) in renderList" :key="idx" @click="toDetail(item.proId)">
          <van-card
            :num="item.num"
            :price="item.price"
            :title="item.proName"
            :thumb="item.img"
          />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { getSearch, getSearchBrand } from '@/api/request.js'
import Vue from 'vue'
import { NavBar, DropdownMenu, DropdownItem, Field, Card, Sticky, Toast } from 'vant'

Vue.use(NavBar)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Field)
Vue.use(Sticky)
Vue.use(Card)
Vue.use(Toast)

export default {
  props: ['s', 't'],
  data () {
    return {
      value: 0,
      option: [
        { text: '默认排序', value: 0 },
        { text: '价格升序', value: 1 },
        { text: '价格降序', value: 2 }
      ],
      minPrice: 0,
      maxPrice: 0,
      searchList: [],
      renderList: []
    }
  },
  mounted () {
    if (this.t === 'brand') {
      getSearchBrand({
        sKey: this.s
      }).then(data => {
        console.log(data.data)
        this.searchList = data.data.msg
        this.renderList = [...this.searchList]
      })
    } else {
      getSearch({
        sKey: this.s
      }).then(data => {
        if (data.data.code === 200) {
          console.log(data.data)
          this.searchList = data.data.msg
          this.renderList = [...this.searchList]
        } else {
          Toast('搜索不到想要的数据')
        }
      })
    }
  },
  methods: {
    onConfirm () {
      // 点击确定之后隐藏下拉菜单
      this.$refs.item.toggle()
      console.log(this.minPrice, this.maxPrice)
      const [min, max] = this.minPrice > this.maxPrice ? [this.maxPrice, this.minPrice] : [this.minPrice, this.maxPrice]
      // 前端筛选：简
      this.renderList = this.searchList.filter(val => {
        return val.price >= min && val.price <= max
      })
      // 后端筛选
      // node中:中等
      // mongo中:复杂
    },
    onReset () {
      this.$refs.item.toggle()
      this.renderList = [...this.searchList]
    },
    onSort () {
      console.log(this.value)
      switch (this.value) {
        case 0:
          this.renderList = [...this.searchList]
          break
        case 1:
          this.renderList = [...this.searchList]
          this.renderList.sort((a, b) => {
            return a.price - b.price
          })
          break
        case 2:
          this.renderList = [...this.searchList]
          this.renderList.sort((a, b) => {
            return b.price - a.price
          })
          break
      }
      // 前端排:searchList：中等
      // 后端排:新接口
      // node中:麻烦
      // mongo中:简
    },
    toDetail (id) {
      this.$router.push('/detail/' + id)
    }
  }
}
</script>

<style lang="scss">
.fade-move{
  transition: all 0.5s;
}
// 进入之前的状态
.fade-enter{
  transform: translateX(-100vw);
}
// 正在进入的状态
.fade-enter-active{
  transition: all 0.5s;
}
// 进入结束后的状态
.fade-enter-to{
  transform: translateX(0);
}
// 离开之前的状态
.fade-leave{
  transform: translateX(0);
}
// 正在离开的状态
.fade-leave-active{
  transition: all 0.5s;
}
// 离开结束后的状态
.fade-leave-to{
  transform: translateX(100vw);
}
</style>
