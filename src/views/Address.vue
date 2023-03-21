<template>
  <div class="address">11
    <!-- 顶部导航栏 -->
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="常用地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <!-- 地址列表 -->
    <div v-for="item in addressData" :key="item.id">
      <!-- 左滑删除 -->
      <van-swipe-cell>
        <van-cell size="large">
          <template #title> {{ item.realname }} {{ item.telephone }} </template>
          <template #label>
            {{ item.province + item.city + item.area + item.address }}
          </template>
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="edit" size="22px" @click="onEditAddress(item)" />
          </template>
        </van-cell>
        <template #right>
          <van-button @click="deleteAddress(item.id)" square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
    <div style="height: 7em"></div>
    <!-- 新增按钮 -->
    <van-button class="addBtn" round type="info" @click="onAddAddress"
      >新增地址</van-button
    >
    <!-- 测试 新增地址 后期这里可以自己写-->
    <van-action-sheet v-model="show" :title="title">
      <van-form @submit="onSave">
        <!-- 姓名 -->
        <van-field
          v-model="addressObj.realname"
          name="姓名"
          label="姓名"
          placeholder="请输入收货人姓名"
          :rules="[{ required: true, message: '请填写收货人姓名' }]"
        />
        <!-- 电话 -->
        <van-field
          v-model="addressObj.telephone"
          name="电话"
          label="电话"
          placeholder="请输入手机号码"
          :rules="[{ pattern, message: '请输入正确的手机号' }]"
        />
        <!-- 省市区选择 -->
        <van-field
          readonly
          clickable
          name="area"
          :value="pcaAddress"
          label="地区选择"
          placeholder="点击选择省市区"
          @click="showArea = true"
          :rules="[{ required: true, message: '请选择省市区' }]"
        />
        <van-field
          v-model="addressObj.address"
          name="详细地址"
          label="详细地址"
          placeholder="请输入详细地址"
          :rules="[{ required: true, message: '请输入详细地址' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
      <!-- 省市区选择器 -->
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
    </van-action-sheet>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { areaList } from "@vant/area-data";
import {get} from '../utils/axios'
import {Dialog} from 'vant'
export default {
  data() {
    return {
      // 面板弹出控制
      show: false,
      // 区域选择级联数据
      areaList,
      // 上传地址对象
      addressObj: {
        id: "",
        realname: "",
        telephone: "",
        province: "",
        city: "",
        area: "",
        address: "",
      },
      // 省市区选择
      pcaAddress: '',
      // 省市区选择原始数据
      pcaList:[],
      // 省市区选择器显示控制
      showArea: false,
      // 新增或编辑 标题
      title: '',
      pattern: /^1\d{10}$/
    };
  },
  created() {
    this.getAddressData(this.userInfo.id);
  },
  computed: {
    // 获取地址列表
    ...mapState("address", ["addressData"]),
    // 获取用户信息
    ...mapState("user",['userInfo'])
  },
  methods: {
    // 获取地址数据
    ...mapActions("address", ["getAddressData", "saveOrUpdateAddress"]),
    //省市区选择
    onConfirm(values) {
      this.pcaAddress = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('-');
      this.pcaList = values
      this.showArea = false;
    },
    // 返回上一级页面
    onClickLeft() {
      this.$router.go(-1);
    },
    // 新增地址
    onAddAddress() {
      this.title = '新增地址'
      // 新增之前 对象置空
      this.addressObj = {};
      this.show = true;
    },
    // 编辑地址 传入当前每一个地址的对象
    onEditAddress(addressItem) {
      this.title = '编辑地址'
      // 拿到当前对象进行赋值
      this.addressObj = {...addressItem}
      this.pcaAddress = addressItem.province + '-' + addressItem.city + '-' + addressItem.area
      this.show = true;
    },
    // 删除地址
    async deleteAddress(addressId){
      let res = await get('/app/address/deleteById?id='+addressId)
      // console.log(res);
      if (res.data.message == '删除成功') {
        this.$notify({
          type:'success',
          message:res.data.message
        });
        this.getAddressData(this.userInfo.id);
      }else{
        this.$notify({
          type:'danger',
          message:res.data.message
        });
      }
    },
    // 新增地址保存
    onSave() {
      if (this.title === '新增地址') {
        // id字段
        this.addressObj.userId = this.userInfo.id
        // 将级联选择器的地址进行拆分 赋值给对应的字段
        this.addressObj.province = this.pcaList[0].name
        this.addressObj.city = this.pcaList[1].name
        this.addressObj.area = this.pcaList[2].name
        this.saveOrUpdateAddress(this.addressObj).then(r => {
          if (r.data.status == 200) {
            // 提示成功
            this.$notify({
              type:'success',
              message:'新增地址成功'
            });
            // 刷新数据
            this.getAddressData(this.userInfo.id);
            // 关闭actionsheet
            this.show = false
          }else{
            // 提示异常
            this.$notify({
              type:'danger',
              message:res.data.message
            });
          }
        })
      }else{
        this.saveOrUpdateAddress(this.addressObj).then(r => {
          if (r.data.status == 200) {
            // 提示成功
            this.$notify({
              type:'success',
              message:'编辑地址成功'
            });
            // 刷新数据
            this.getAddressData(this.userInfo.id);
            // 关闭actionsheet
            this.show = false
          }else{
            // 提示成功
            this.$notify({
              type:'danger',
              message:res.data.message
            });
          }
        })
      }
    },
  },
};
</script>

<style scoped>
.content {
  padding: 16px 16px 160px;
}
/* cell样式 */
.van-cell {
  box-shadow: 2px 2px 2px rgba(247, 248, 249, 0.8);
  background-color: white;
  width: 98%;
  border-radius: 5px;
  margin: 5px auto;
  padding: 10px;
}
/* 新增按钮样式 */
.addBtn {
  background-image: linear-gradient(to right, #7579ff, #bf73ff);
  border: none;
  width: 70%;
  position: fixed;
  bottom: 4em;
  left: 15%;
}
/* 左滑删除按钮 */
.delete-button {
  height: 100%;
}
</style>