<template>
  <div>
    <!-- <Title /> -->
    <Tabbar />
    <van-nav-bar
      title="新增修改地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import Tabbar from "../components/Tabbar.vue";
import Title from "../components/Title.vue";
import { areaList } from "@vant/area-data";
import { post} from "../utils/axios";
import { Toast } from "vant";
import { mapMutations, mapState } from 'vuex';

export default {
  components: { Title, Tabbar },
  data() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
      areaList,
    };
  },
  computed:{
    ...mapState([' sub_address'])
  },
  methods: {
   ...mapMutations(['onSave']),
    onDelete(content) {},
  },
};
</script>
<style lang="">
</style>