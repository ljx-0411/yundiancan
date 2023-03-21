<template>
  <div class="login">
    <div class="content">
      <h1>超伦云点餐</h1>
    <van-cell-group inset>
      <!-- 输入任意文本 -->
      <van-field v-model="temp.username" label="用户名" />
      <!-- 输入密码 -->
      <van-field v-model="temp.password" type="password" label="密码" />
    </van-cell-group>
    <van-button plain type="success" block @click="login">登录</van-button>
    <div class="signUp" >
      <span  @click="toRegister">没有账号？点击注册</span>
    </div>
    <p>username:customer3<br />password:123321</p>
    </div>
  </div>
</template>
<script>
import { get, post_json } from "../utils/axios.js";
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      temp: {
        username: null,
        password: null,
      },
    };
  },
  computed:{
      ...mapState(['user_info'])

  },
  methods: {
    ...mapMutations(["SET_USER_INFO"]),
    login() {
      post_json("/user/login", this.temp).then((res) => {
        // console.log(res);
        if (res.status == 200) {
          // 保存token
          // setToken(res.data.token);
          sessionStorage.setItem("token", res.data.token);
          get("/user/info", { token: res.data.token }).then((res) => {
            // console.log(res);
            this.SET_USER_INFO(res.data); //获取用户信息
          });
          // 跳转首页
          this.$router.push("/");
        }
      });
    },
    toRegister() {
      this.$router.push("/register");
    
    },
  },
};
</script>
<style lang="less" >

.login h1 {
  text-align: center;
  line-height: 60px;
  color: #fff;
}
.signUp {
  color: #fff;
  text-align: center;
}
.login {
  display: flex;
  width: 100%;
  height: 100%;
  background: url("~@/assets/ms.jpg") no-repeat;
  justify-content: center;
  align-items: center;
  background-size:100% 100%;
// background-attachment:fixed;
}
.login .content{
  margin: 164px auto;
}
p {
  margin-left: 100px;
  font-size: 12px;
  color: #ccc;
}
.van-field {
  margin-top: 15px;
}
.van-button {
  margin-top: 50px;
}
</style>