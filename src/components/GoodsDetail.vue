<template>
  <div>
    <Search></Search>
    <!-- 隔开商品详情和搜索框 -->
    <GoodsDetailNav></GoodsDetailNav>
    
    <!-- 商品信息展示 -->
    <ShowProduct v-bind:productInfo="productInfo"></ShowProduct>
    <!-- 商品详细展示 -->
    <MessageDetail v-bind:productInfo="productInfo"></MessageDetail>
    
    <Spin size="large" fix v-if="isLoading"></Spin>
  </div>
</template>

<script>
import Search from '@/components/Search';
import GoodsDetailNav from '@/components/nav/GoodsDetailNav';
import ShowProduct from '@/components/goodsDetail/ShowProduct';
import MessageDetail from '@/components/goodsDetail/MessageDetail';
import store from '@/vuex/store';
export default {
  name: 'GoodsDetail',
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  created () {
    this.productInfo = this.$route.query.productInfo
    let parse = JSON.parse(this.productInfo)
    this.productInfo = parse
    this.proId = parse.proId
  },
  data () {
    return {
      isLoading:false,
      id: '1',
      productInfo:{
        id: '',
        title: '',
        sellerId: '',
        type: '',
        price: '',
        imgUrl: '',
        detail: '',
        upTime: '',
        num: '',
      },
      tagsColor: [ 'blue', 'green', 'red', 'yellow' ]
    };
  },
  mounted(){
    if(window.name == ""){
        console.log("首次被加载");
        //location.reload();
        window.name = "isRefresh"; 
      }else if(window.name == "isRefresh"){
        console.log("页面被刷新");
      }
  },
  components: {
    Search,
    GoodsDetailNav,
    ShowProduct,
    MessageDetail
  },
  store
};
</script>

<style scoped>
.shop-item-path {
  height: 38px;
  background-color: rgb(236, 235, 235);
  line-height: 38px;
  color: #2c2c2c;
}
.shop-nav-container {
  margin: 0px auto;
  width: 80%;
}
</style>
