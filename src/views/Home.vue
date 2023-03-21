<template>
<Title title="超伦云点餐"></Title>
  <div class="home">
    
    <Tabbar />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="i in imageList" :key="i.url"
        ><van-image fit="cover" :src="i.url"
      /></van-swipe-item>
    </van-swipe>
    <van-notice-bar
      left-icon="volume-o"
      text=" 米袋虽空——樱花开哉！"
    ></van-notice-bar>

    <router-link to="/product_List">
      <van-button type="primary" color="#f05353" plain block
        ><van-icon name="qr" />全部商品</van-button
      >
    </router-link>
 
    <h4>推荐菜品</h4>
    <van-card
      v-for="item in list"
      :key="item.id"
      :price="item.price"
      :desc="item.description"
      :title="item.name"
      :thumb="item.photo"
      >
      <template #tags>
        <van-tag plain type="danger">推荐</van-tag>
      </template>
      <template #footer>
        <van-stepper
          v-model="item.num"
          min="0"
          @change="addCart(item)"
          theme="round"
        />
      </template>
    </van-card>

    <van-submit-bar
      :price="sum"
      :disabled="cart_list.length == 0"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-button type="danger" size="mini" @click="show = true"
        ><van-icon name="cart-o" color="#fff" />购物车</van-button
      >
    </van-submit-bar>
    <van-action-sheet v-model:show="show" title="我的购物车">
      <div class="content">
        <van-card
          :num="item.num"
          v-for="item in cart_list"
          :key="item.id"
          :price="item.price"
          :desc="item.description"
          :title="item.name"
          :thumb="item.photo"
        />
        
       <van-button type="danger" size="mini" @click="clearCart"
        ><van-icon name="cart-o" color="#fff" />清空购物车</van-button
      >
        <!-- 地址栏 -->
        <!-- <van-address-list
          v-model="addressId"
          :list="address"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          ></van-address-list
        > -->
      </div>
    </van-action-sheet>
    
  </div>
</template>

<script>
import Tabbar from "../components/Tabbar.vue";
import Title from "../components/Title.vue";
import { get, post, post_json } from "../utils/axios";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  
  data() {
    
    return {
     
      value: 0,
      imageList: {},
      ListQuery: {
        page: 1,
        pageSize: 5,
      },
      // cart: {}, //购物车（共享）
      // cart_list:[],//购物车数组
      // sum: 0, //总价
      show: false, //控制面板显示
      addressId: null,
      newAddress: {},
      show_address: false, //新增地址显示
    };
  },
  computed: {
    ...mapState([
      "cart",
      "cart_list",
      "sum",
      "user_info",
      "productCategoryList",
      "list",
      "usermsg",
      "address",
      "addressId",
    ]), //解构属性
  },
  created() {
    this.getMsg();
    // this.getAddress();
    this.getImage();
    this.getProduct();
    this.getproductCategory();
  },
  methods: {
    ...mapMutations([
      "addCart",
      "clearCart",
      "getproductCategory",
      "getProduct",
      "getMsg",
      "getAddress",
      "onSubmit",
      "message_list"
    ]), //从仓库解出来
    getImage() {
      //首页轮播图的图片
      get("/carousel/findAll", this.imageList).then((res) => {
        // console.log(res);
        this.imageList = res.data;
      });
    },
    goPath() {
      this.$router.push({
        path: "/pathAbout",
      });
    },
    onAdd() {
      //新增地址按钮
      this.show = false;
      this.$router.push('/pathAbout')
    },
    onEdit(){
       this.show = false;
      this.$router.push('/pathAbout')
    }
    // onSave() {//新增地址
    //   post_json("/app/address/saveOrUpdate", newAddress).then((res) => {
    //     if (res.status == 200) {
    //     }
    //   });
    // },
  },
  components: {
    Tabbar,
    Title,
  },
};
</script>
<style lang="less">
.home h4 {
  line-height: 50px;
  margin-left: 20px;
}
.home .van-swipe {
  width: 90%;
  height: 160px;
  position: absolute;
  top: 136px;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 0 #aaaaaa;
  border-radius: 8px;
}
.home .van-swipe .van-image {
  height: 160px;
  width: 100%;
  border-radius: 8px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.van-notice-bar{
  margin-top: 180px;
}
.home .van-button {
    margin-top: 0px;
}

.home .block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.home .my-swipe .van-swipe-item {
  line-height: 13px;
}

.van-submit-bar {
  margin-bottom: 50px;
}
.content {
  padding: 16px 16px;
}
.van-button__content {
  width: 100%;
}
</style>
