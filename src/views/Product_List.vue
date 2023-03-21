<template>
  <div id="content">
    <div id="title_bar">
      <van-nav-bar
      title="全部商品"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    </div>
    <van-grid v-for="item in productCategoryList" :key="item.id">
      <van-grid-item
        :icon="item.icon"
        :text="item.name"
        @click="getCategoryById(item.id)"
      />
    </van-grid>
    <van-grid >
      <van-grid-item icon="qr" text="全部商品" @click="getCategoryById()" />
    </van-grid>
    <van-card
      v-for="item in CategoryList"
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
    <p @click="message_list(item.id)">查看详情</p>

        <van-stepper v-model="item.num" default-value="0" min="0" @change="addCart(item)" />
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
        >
        </van-card>
        <van-address-list
          v-model="addressId"
          :list="address"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
        />
      </div>
    </van-action-sheet>
    <!-- <router-link v-for=" i in productCategoryList"  :key="i.id" "></router-link> -->
  </div>
  <Tabbar />
</template>
<script>
import Tabbar from "../components/Tabbar.vue";
import { mapState, mapMutations } from "vuex";
import { get, post } from "../utils/axios";

export default {
  components: { Tabbar },
  data() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
      CategoryList: [],
     
      show:false,
      addressId:null
    };
  },
  computed: {
    ...mapState(["productCategoryList", "list","cart_list","sum","address","addressId"]), //解构属性
  },
  created() {
    this.getCategoryById();
    this.getproductCategory()
    this.getProduct()
    this.getAddress()
  },
  methods: {
    ...mapMutations(["getproductCategory", "getProduct","addCart","getAddress","onSubmit","message_list"]), //从仓库解出来
    getCategoryById(id) {
      get("/product/pageQuery", {
        page: 1,
        pageSize: 9999,
        productCategoryId: id,
      }).then((res) => {
        this.CategoryList = res.data.list;
      });
        this.getProduct()

    },
    

  },
};
</script>
<style lang="less">
.van-sidebar-item--select {
  padding: 10px;
  margin: 5px;
  width: 100px;
}
#content {
  padding-bottom: 100px;
}
.van-grid.van-hairline--top {
  display: inline-grid;
  margin-left: 5px;
  width: 85px;
  height: 85px;
  background-color: #ccc;
}
.van-nav-bar__text {
    color:#fff;
}
.van-nav-bar__title{
  color: #fff;
}
.van-nav-bar{
  --van-nav-bar-background-color:  linear-gradient(-45deg, #FFC796 0%, #FF6B95 100%);
}
#title_bar{
  position: sticky;
  top: 0;
  z-index: 999;
}
.van-icon-arrow-left:before {
    content: "\e668";
    color: #fff;
}
#content p{
  color: #ccc;
}
.van-submit-bar {
  margin-bottom: 50px;
}
</style>