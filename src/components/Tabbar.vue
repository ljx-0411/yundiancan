<template>
  <van-tabbar
    v-model="active"
    route
    active-color="#f05353"
    inactive-color="#000"
  >
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="notes-o" to="/notes">订单</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/user">个人中心</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
</style>
