<template>
    <div id="title1">
         <van-nav-bar title="超伦云点餐"></van-nav-bar>
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
#title1 {
  --van-nav-bar-background-color:  linear-gradient(-45deg, #FFC796 0%, #FF6B95 100%);
  --van-nav-bar-title-text-color: #fff;
  // background-image: linear-gradient(-45deg, #FFC796 0%, #FF6B95 100%);
  position: sticky;
  top: 0px;
z-index: 999;
}
#title1 h4 {
  line-height: 50px;
  margin-left: 20px;
}

</style>