<template>

  <div>
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group inset>
      <!-- 输入任意文本 -->
      <van-field v-model="user_info.username" label="用户名" 
       />
      <!-- 输入密码 -->
      <van-field v-model="user_info.password" type="password" label="密码"  
      />
      <!-- 输入手机号，调起手机号键盘 -->

      <van-field v-model="user_info.telephone" type="tel" label="手机号"  />
      <van-field v-model="user_info.gender" type="text" label="性别"  />
      <van-field v-model="user_info.email" type="text" label="邮箱"  />
      <van-button type="primary" id="onupdate" @click="onUpdate">确定</van-button>
    </van-cell-group>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Tabbar from '../components/Tabbar.vue';
import Title from '../components/Title.vue';
import { post } from '../utils/axios';
import { Toast } from 'vant';

export default {
  components: { Tabbar, Title },
  data() {
    return {
      show: true,

    };
  },
  computed: {
    ...mapState(["user_info"]), //解构属性
  },
  methods: {
     onClickLeft() {
      this.$router.go(-1);
    },
    onUpdate(){
      var person={
        // 传递id表示修改，不传id表示保存 或者添加
        id:this.user_info.id,
        username:this.user_info.username,
        password:this.user_info.password,
        telephone:this.user_info.telephone,
        gender:this.user_info.gender,
        email:this.user_info.email,
       
      }
      post('/app/user/saveOrUpdate',person).then((res)=>{
        
        if(res.status==200)
        Toast.success('修改成功！');
        this.$router.push("/user");
        
      })

    }
  },
};
</script>
<style >
#onupdate{
  text-align: center;
  color: #fff;
  border-radius: 22px;
  line-height: 40px;
  margin: 0 auto;
  background-image: linear-gradient(to right, #ff5f6d, #ffc371);
  margin-left: 45%;
}
.van-cell-group{
  margin-top: 10%;
}
.van-button{
  margin: 0 auto;
}

</style>