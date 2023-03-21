<template>
  <div id="content">
    <Title title="订单"></Title>
    <Tabbar />
    <van-collapse v-model="orderList" v-for="i in orderList" :key="i.id">
      <van-collapse-item
        :title="'订单编号' + i.id + '     总价:' + i.total + '   '+i.orderTime"
        :name="i.id"
      >
        <van-card
          v-for="item in i.orderLines"
          :key="item.id"
          :price="item.product.price"
          :desc="item.product.description"
          :title="item.product.name"
          :thumb="item.product.photo"
          :num="item.num"
          >、
          <template #tags>
            <van-tag plain type="success">{{ i.status }}</van-tag>
          </template>
          
        </van-card>

        <van-button type="danger" @click="deleteOrder(i.id)"
          >删除订单</van-button
        >
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import Tabbar from "../components/Tabbar.vue";
import Title from "../components/Title.vue";
import moment from 'moment'
import { get, post } from "../utils/axios";
import { Toast } from "vant";

export default {
  name: "Home",
  data() {
    const onSubmit = () => Toast("点击按钮");
    return {
      onSubmit,
      orderList: [],
      orderLines: [],
    };
  },
  components: {
    Tabbar,
    Title,
  },
  computed: {
    ...mapState(["user_info", "usermsg"]), //解构属性
  },
  created() {
    this.getOrder();
  },
  methods: {
    ...mapMutations(["SET_USER_INFO"]),
    getOrder() {
      get("/app/order/pageQuery", {
        page: 1,
        pageSize: 9999,
        customerId: this.user_info.id,
      }).then((res) => {
        // console.log(res);
        this.orderList = res.data.list;
        this.orderList.forEach((item)=>{
           item.orderTime = moment(parseInt(item.orderTime)).format(
            "YYYY-MM-DD HH:mm:ss"
          );

        })
        console.log(this.orderList);
      });
    },
    deleteOrder(id) {
      get("/app/order/deleteById", { id }).then((res) => {
        console.log(id);
        if (res.status == 200) {
          Toast.success("订单删除成功！");
          this.getOrder();
        }
      });
    },
  },
};
</script>
<style>
.van-button {
  float: right;
}
</style>