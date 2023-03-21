<template>
  <div>
    <Title />
    <Tabbar />
    <van-image
      class="userface"
      round
      width="8rem"
      height="8rem"
      :src="user_info.userFace"
    />
    <!-- <van-button class="btn1" type="primary" @click="show = true"
      >修改头像</van-button
    > -->

    <van-contact-card
      type="edit"
      :tel="user_info.telephone"
      :name="user_info.username"
      @click="onEdit"
    />
  

    <div class="btn" @click="logout">退出登录</div>
    <!-- <van-dialog v-model:show="show" title="头像图片上传" show-cancel-button>
      <van-uploader :after-read="updateFace" v-model="imgs" />
    </van-dialog> -->
  </div>
</template>
<script>
import Tabbar from "../components/Tabbar.vue";
import Title from "../components/Title.vue";
import { ref } from "vue";
import { mapState, mapMutations } from "vuex";
import { get, post } from "../utils/axios";
import { Toast } from "vant";
import { Dialog } from "vant";

export default {
  name: "Home",
  components: {
    Tabbar,
    Title,
  },
  data() {
    return {
      show: false,
      imgs: [],
    };
  },
  computed: {
    ...mapState(["user_info"]), //解构属性
  },
  created() {
    this.getMsg();
  },
  methods: {
    ...mapMutations(["getMsg"]),
    
    updateFace() {
      post("/app/user/alterUserface", { id: 87, userface: this.imgs }).then(
        (res) => {
          console.log(this.imgs);
          if (res.status == 200) {
            Toast.success("头像修改成功！");
            //  this.$router.go(0)
          }
        }
      );
    },
    goOrder() {
      this.$router.push("/notes");
    },
    logout() {
      Dialog.confirm({
        confirmButtonColor: "#7879FF",
        message: "是否退出登录？",
      })
        .then(() => {
          // on confirm
          sessionStorage.setItem("token", " ");
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },
    onEdit(){
       this.$router.push("/Person");
    }
  },
};
</script>
<style lang="less">
.btn {
  width: 53%;
  height: 40px;
  background-image: linear-gradient(to right, #ff5f6d, #ffc371);
  text-align: center;
  color: #fff;
  border-radius: 22px;
  line-height: 40px;
  margin: 0 auto;
  margin-top: 2em;
  cursor: pointer;
}
.btn1 {
  width: 25%;
  height: 30px;
  background-image: linear-gradient(to right, #ff5f6d, #ffc371);
  text-align: center;
  color: #fff;
  border-radius: 22px;
  line-height: 40px;
  margin: 0 139px;
  margin-top: 2em;
  cursor: pointer;
}
.userface {
  margin: 30px 123px;
}
</style>