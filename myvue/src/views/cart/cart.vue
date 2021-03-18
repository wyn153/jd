<template>
  <div class="box cartBox">
    <!-- 导航栏 -->
    <header>
      <van-nav-bar title="购物车" @click-left="onClickLeft" left-arrow>
        <template #right>
          <!--  -->
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
    </header>
    <!-- 空 -->
    <van-empty
      description="当前购物车为空,快去挑选几件宝贝"
      v-if="cartList.length < 1"
    >
      <van-button
        round
        type="danger"
        class="bottom-button"
        @click="$router.push('/home')"
        >去挑选</van-button
      >
    </van-empty>
    <!-- 地址 -->
    <div class="cont" v-else>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @edit="onEdit"
      />
      <!-- 购物车 -->
  
      <main class="cartCont">
    <transition-group name="fade">        
        <van-swipe-cell v-for="(item, idx) in cartList" :key="item.proId">
          <van-card :price="item.price" class="goods-card">
            <template #title>
                 <div
                :to="'/detail/' + item.proId"
                tag="div"
                class="van-card__title van-multi-ellipsis--l2"
                >
                {{ item.proName }}
              </div>
            </template>
            <!-- 多选框 -->
            <template #thumb>
              <van-checkbox
                v-model="item.flag"
                shape="square"
                @input="onSetFlag(idx)"
              />
              <!-- <router-link :to="'/detail/' + item.proId"> -->
                <van-image fit="contain" :src="item.img" />
              <!-- </router-link> -->
            </template>
        <!-- 数量按钮 -->    
            <template #num>
              <van-stepper
                v-model="item.num"
                theme="round"
                button-size="22"
                disable-input
                @change="onSetNum(idx)"
              />
            </template>
          </van-card>
        <!-- 删除 -->
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="onDel(idx)"
            />
          </template>
        </van-swipe-cell>
 </transition-group>

      </main>
      
      <!-- 提交订单栏 -->
      <footer>
        <van-submit-bar
          :price="allP"
          button-text="提交订单"
          @submit="onSubmit"
        >
          <van-checkbox v-model="allFlag">全选</van-checkbox>
          <template #tip>
            商品总件数
            <span class="allNum"
              >{{ allNum }} 件</span
            >
          </template>
        </van-submit-bar>
      </footer>
    </div>
  </div>
</template>
<script>
import gsap from 'gsap'
import {
 getCart, setFlag, setAllFlag, setNum, delCart, addOrder
} from "@/api/request.js";
import Vue from "vue";
import {
  NavBar,
  Toast,
  Icon,
  AddressList,
  SubmitBar,
  Checkbox,
  SwipeCell,
  card,
  button,
  Popover,
  CheckboxGroup,
  Image as VanImage,
  Stepper,
  Empty,
} from "vant";
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Icon);
Vue.use(AddressList);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(SwipeCell);
Vue.use(card);
Vue.use(button);
Vue.use(Popover);
Vue.use(CheckboxGroup);
Vue.use(Empty);
Vue.use(Stepper);
Vue.use(VanImage);

export default {
  name: "cart",
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("isLogin") === "ok") {
      next();
    } else {
      next("/login?from=");
    }
  },
  data() {
    return {
      cartList: [],
      animateP: 0,
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
      ],
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [
        { text: "首页", path: "/home" },
        { text: "分类", path: "/kind" },
        { text: "我的", path: "/my" },
        { text: "搜索" },
        { text: "分享" },
      ],
    };
  },
  //方法 函数写这里
  methods: {
    //导航栏左
    onClickLeft() {
      this.$router.back();
    },
    // 提交订单
    onSubmit() {
       const proData = []
      this.cartList.forEach(val => {
        if (val.flag) {
          proData.push({
            proId: val.proId,
            num: val.num
          })
        }
      })
      // 前端打包数据,直接发给后端(不推荐)
      // const proData = this.cartList.filter(val => val.flag)
      // console.log(proData)
      addOrder({
        userId: sessionStorage.getItem('userId'),
        proData: JSON.stringify(proData)
      }).then(data => {
        // console.log(data.data)
        this.$router.push('/order')
      })
    },
    // 导航栏 右跳转
    onSelect(i) {
      this.$router.push(i.path);
    },
    // 修改地址
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    // 购物车数据 多选框
    onSetFlag(i) {
      setFlag({
        userId: sessionStorage.getItem("userId"),
        proId: this.cartList[i].proId,
        flag: this.cartList[i].flag ? 1 : 0,
      })
        .then((data) => {
          console.log(data.data);
        })
        .catch((err) => console.log(err));
    },
    // 
    onSetNum(i) {
      setNum({
        userId: sessionStorage.getItem("userId"),
        proId: this.cartList[i].proId,
        num: this.cartList[i].num,
      }).then((data) => {
        console.log(data.data);
      });
    },
    // 删除
    onDel(i) {
      delCart({
        userId: sessionStorage.getItem("userId"),
        proId: this.cartList[i].proId,
      }).then((data) => {
        this.cartList = data.data.msg.proData;
      });
    },
  },
  //计算属性
  computed: {
    // 全选 every() 所有的都为true，才为true
    allFlag: {
      get() {
        return this.cartList.every((val) => val.flag);
      },
      set(v) {
        setAllFlag({
          userId: sessionStorage.getItem("userId"),
          flag: v,
        }).then((data) => {
          console.log(data.data);
        });
        this.cartList.forEach((val) => {
          val.flag = v;
        });
      },
    },
    // 总价
    allPrice() {
      // 利用数组的归并方法,快速计算总价
      return this.cartList.reduce((start, val) => {
        if (val.flag) {
          return start + val.price * val.num * 100;
        } else {
          return start;
        }
      }, 0);
    },
    allNum () {
          return this.cartList.reduce((start, val) => {
        if (val.flag) {
          return start + val.num
        } else {
          return start
        }
      }, 0)
    },
    allP () {
      return this.animateP
    }
    // 总件数
  },
  //侦听器
  watch: {
    allPrice (v) {
      gsap.to(this.$data, { duration: 0.5, animateP: v })
    }
  },
  mounted() {
    // 购物车
    getCart({
      userId: sessionStorage.getItem("userId"),
    }).then((data) => {
      console.log(data.data);
      this.cartList = data.data.msg.proData;
    });
  },
};
</script>
  
<style scoped lang="scss">
.cartBox {
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.cartCont {
  overflow: auto;
  flex: 1;
  padding-bottom: 1rem;
  .goods-card {
    margin: 0;
    background-color: white;
    .van-card__thumb {
      width: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .van-checkbox {
        width: 0.25rem;
        height: 0.2rem;
      }
      .van-image {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
  }
  .delete-button {
    height: 100%;
  }
}
.van-address-list {
  height: 1rem;
  padding: 0 12px;
  .van-address-list__bottom {
    display: none;
  }
}


// 离开之前的状态
.fade-leave{
  transform: translateX(0);
}
// 正在离开的状态
.fade-leave-active{
  transition: all 0.3s;
}
// 离开结束后的状态
.fade-leave-to{
  transform: translateX(100vw);
}


</style>