<template>

    <div class="pro_msg">
    <van-nav-bar
      title="菜品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-image
    id="pro_img"
      round
      width="11rem"
      height="11rem"
      fit="cover"
      :src="productMessage.photo"
    />
    <div class="pro_content">
      <p>菜名:{{ productMessage.name }}</p>
      <p>价格:{{ productMessage.price }}元/份</p>
      <p>菜品描述:<br>{{ productMessage.description }}</p>
    </div>
  </div>
 
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["productMessage"]), //解构属性
  },
  created() {
    this.message_list();
  },
  methods: {
    ...mapMutations(["message_list"]), //从仓库解出来
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style >
#pro_img {
  margin-left: 6%;
  margin-top: 8%;
}
p {
  font: 1em sans-serif;
  color: rgb(255, 255, 255);
  line-height: 35px;
   letter-spacing:2px;
   margin-left: 8px;
}
.pro_msg {
  width: 100%;
  height: 667px;
  background:url('https://img2.baidu.com/it/u=2330646640,2578510698&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888') no-repeat ;;
  overflow: hidden;
  background-size:100% 100%;
  position: relative;

}


.van_nav_bar{
  background-color:#ffa99f ;
}
.pro_content{
  margin:55px 32px;
}
</style>