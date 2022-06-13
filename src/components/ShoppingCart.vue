<template>
  <div>
    <Search></Search>
    <GoodsDetailNav></GoodsDetailNav>
    <!-- 添加成功提示 -->
    <div class="add-info-box-container">
      <div class="add-info-box">
        <!-- 商品 -->
        <div class="add-info-detail">
          <!-- 提示加入成功 -->
          <div class="add-info-title">
            <p>
              <i class="fa fa-check-circle"></i> 商品已成功加入购物车！</p>
          </div>

          <!-- 商品信息 -->
          <div class="add-info-box-row">
            <!-- 商品图片，可改 -->
            <div class="add-info-img">
              <img :src="imgUrl" alt="">
            </div>
            <!-- 商品简略信息，可改 -->
            <div class="add-info-intro">
              <p>{{productInfo.title}} {{productInfo.detail}}...</p>
              <p class="add-info-intro-detail">数量：1</p>
            </div>
          </div>
        </div>

        <div class="car-btn-group">
          <div></div>
          <div class="car-btn-row">
            <!-- 查看商品详情带参路由，可去 -->
              <button class="btn-car btn-car-to-detail" @click="gotopro(productInfo)">查看商品详情</button>
            <router-link to="/order">
              <button class="btn-car btn-car-to-pay">去购物车结算 > </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车下方推荐，可改 -->
    <div class="other-user-buy-box">
      <div class="other-user-buy-title">
        <p>可以顺便看下其他商品哦 ~</p>
      </div>
      <!-- <div class="other-user-buy-row" v-for="(items,index1) in recommend" :key="index1">
        <div class="other-user-buy-item-box" v-for="(item,index2) in items" :key="index2">
          <div class="other-user-buy-item-img">
            <a href="item_detail.html"><img :src="item.img" alt=""></a>
          </div>
          <div class="other-buy-detail-box">
            <div class="other-buy-title">
              <a href="item_detail.html">
                <p>{{item.intro}}</p>
              </a>
            </div>
            <div class="other-buy-price">
              <p>￥{{item.price}}</p>
            </div>
            <div class="other-buy-btn-box">
              <router-link to="/goodsDetail">
                <button class="other-buy-btn"><Icon type="ios-cart"></Icon> 加入购物车</button>
              </router-link>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search';
import GoodsDetailNav from '@/components/nav/GoodsDetailNav';
import store from '@/vuex/store';
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'ShoppingCart',
  props:['id'],
  data (){
    return{
      productInfo:{},
      imgUrl:'',
    }
  },
  created () {  
    let id = this.$route.query.id   
    var self = this
    //axios.defaults.baseURL='http://42.193.246.152:9000' 
    let param = 'proId=' + id
    axios.post('/product/get_Product_Info_By_Id',param
    ).then(function(ret){
      console.log('返回数据：',ret.data)
      self.productInfo = ret.data.data
      axios.get('/file/get_img',{
        params:{
          imgUrl:ret.data.data.imgUrl
        },responseType: 'blob'
      }).then(function(ret){
        //console.log('被调用')
        const blob = new Blob([ret.data], {
            type: 'application/png;charset=utf-8',
          });
          const url = window.URL.createObjectURL(blob);
          self.imgUrl = url; 
      }).catch(function(error){
        console.log(error);
      })
    }).catch(function(error){
      console.log(error);
    })
  },
  mounted(){
	if(window.name == ""){
      console.log("首次被加载");
      location.reload();
      window.name = "isRefresh"; 
    }else if(window.name == "isRefresh"){
      console.log("页面被刷新");
    }
  },
  methods: {
    gotopro(productInfo){
      let para=JSON.stringify(productInfo)
      sessionStorage.setItem('productInfo', JSON.stringify(productInfo));
      this.$router.push({path: '/goodsDetail', query: { productInfo: para}});
    },
  },
  components: {
    Search,
    GoodsDetailNav
  },
  store
};
</script>

<style scoped>
/****************************加入购物车页面开始*****************************/
.add-info-box-container{
  width: 100%;
  background-color: #F5F5F5;
}
.add-info-box{
  width: 90%;
  margin: 0px auto;
  padding: 15px 0px;
  display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.add-info-detail{
  display: flex;
    flex-direction: column;
}
.add-info-title{
  font-size: 25px;
  color: #71b247;
}
.add-info-box-row{
  display: flex;
    flex-direction: row;
    margin-top: 15px;
}
.add-info-img{
  width: 56px;
  height: 56px;
  margin-right: 15px;
}
.add-info-img img{
  width: 100%;
  height: 100%;
}
.add-info-intro{
  display: flex;
    flex-direction: column;
    justify-content: center;
}
.add-info-intro-detail{
  font-size: 12px;
  color: #999999;
}
.car-btn-group{
  display: flex;
    flex-direction: column;
    justify-content: space-between;
}
/*按钮*/
.btn-car{
  padding: 8px 10px;
  font-size: 16px;
  border-radius: 0px;
  border:none;
  margin-right: 15px;
}
.btn-car-to-detail{
  background-color: #fff;
  color: #e4393c;
  border:1px solid #fff;
}
.btn-car-to-detail:hover{
border:1px solid #e4393c;
}
.btn-car-to-pay{
  background-color: #e4393c;
  color: #fff;
  border:1px solid #e4393c;
}
.btn-car-to-pay:hover{
  background-color: #c91623;
  border:1px solid #c91623;
}
/*其他用户购买*/
.other-user-buy-box{
  width: 90%;
  margin: 0px auto;
  display: flex;
    flex-direction: column;
}
.other-user-buy-title{
  margin-top: 25px;
  font-size: 14px;
  color: #666;
  font-weight: bold;
}
.other-user-buy-row{
  margin-top: 25px;
  display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.other-user-buy-item-box{
  display: flex;
    flex-direction: row;
}
.other-user-buy-item-img{
  width: 96px;
  height: 96px;
}
.other-user-buy-item-img img{
  width: 100%;
}
.other-buy-detail-box{
  width: 160px;
  margin-left: 15px;
  display: flex;
    flex-direction: column;
}
.other-buy-title{
  font-size: 12px;
}
.other-buy-title a{
  color: #2c2c2c;
  text-decoration: none;
}
.other-buy-price{
  font-size: 12px;
  font-weight: bold;
  color: #E4393C;
}
.other-buy-btn{
  padding: 3px 10px;
  color: #E4393C;
  font-size: 12px;
  border: 1px solid #E4393C;
  border-radius: 0px;
  background-color: #fff;
}
.other-buy-btn:hover{
  color: #c91623;
  border: 1px solid #c91623;
}
/****************************加入购物车页面结束*****************************/
</style>
