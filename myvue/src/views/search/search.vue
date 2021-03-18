<template>
  <div class="box searchBox">
    <van-nav-bar left-arrow @click-left="$router.push('/home')" @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
      <template #title>
        <van-search
          :autofocus="true"
          v-model="value"
          shape="round"
        />
      </template>
    </van-nav-bar>
    <div class="cont">
      <div class="hotSearch">
        <h4>热门搜索：</h4>
        <van-tag plain type="primary" size="large">标签</van-tag>
      </div>
      <div class="seaHis">
        <h4>搜索历史：</h4>
        <van-tag v-for="(item,idx) in searchList" :key="item" closeable size="large" @close="onClose(idx)" @click="onTagClick(idx)" plain type="primary">
          {{item}}
        </van-tag>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Search, Tag } from 'vant'
import { getHistorySearch, delHistorySearch, addHistorySearch } from '@/api/request.js'

Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Search)
Vue.use(Tag)
export default {
  name: "search",
  data () {
    return {
      searchList: [],
      value: this.$route.params.s
    }
  },
  methods: {
    onClose (i) {
      delHistorySearch({
        userId: sessionStorage.getItem('userId'),
        wd: this.searchList[i]
      }).then(data => {
        this.searchList = data.data.msg
      })
    },
    onClickRight () {
      addHistorySearch({
        userId: sessionStorage.getItem('userId'),
        wd: this.value
      }).then(data => {
        console.log(data.data)
      })
      this.$router.push('/searchRes/' + this.value + '/type/n')
    },
    onTagClick (i) {
      this.$router.push('/searchRes/' + this.searchList[i] + '/type/n')
    }
  },
  mounted () {
    getHistorySearch({
      userId: sessionStorage.getItem('userId')
    }).then(data => {
      this.searchList = data.data.msg
      // this.searchList.length = 10
      if (this.searchList.length > 10) {
        this.searchList.length = 10
      }
      console.log(this.searchList)
    })
  }
}
</script>

<style lang="scss">
.searchBox{
  .van-nav-bar__content{
    height: 0.54rem;
    i{
      color: #000;
    }
    .van-nav-bar__title{
      width: 80%;
      max-width: 80%;
    }
  }
  .cont{
    .van-tag{
      margin: 0 0.2rem;
      padding: 0.04rem 0.1rem;
      color: #999;
    }
  }
}
</style>
