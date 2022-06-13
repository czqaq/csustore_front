<template>
  <div>
    <Search></Search>
    <GoodsDetailNav></GoodsDetailNav>
    <div class="container">
      <div class="goods-box">
        <!-- 侧面广告位 -->
        <div class="item-intro-recommend"> 
        <div class="item-recommend-title">
          <p>商品精选</p>
        </div>
        
        <div class="item-intro-recommend-column">
          <div class="item-recommend-column" v-for="(item, index) in adProList" :key="index"> 
            <div class="item-recommend-img">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="item-recommend-intro">
              <span>
                <span class="item-recommend-top-num">{{index + 1}}</span> {{item.title}}</span>
              <span class="item-recommend-price">￥{{item.price}}</span>
            </div>
            
          </div>
        </div>

      </div>

        <!-- 搜索显示结果 -->
        <div class="goods-list-box">
          <div class="goods-list-empty" v-show="listLength==0">
            当前搜索没有相关商品，试试其他关键字
          </div>
          <!-- 排序方式 -->
          <div class="goods-list-tool" v-show="listLength!=0">         
            <!-- <ul>
              <li v-for="(item,index) in goodsTool" :key="index" @click="orderBy(item.en, index)"><span :class="{ 'goods-list-tool-active': isAction[index]}">{{item.title}} <Icon :type="icon[index]"></Icon></span></li>
            </ul> -->
          </div>
          <!-- 显示结果,填充数据-->
          <div class="goods-list">
            
            <div class="goods-show-info" v-for="(item, index) in searchProductList" :key="index">
              <div class="goods-show-img">
                <img :src="item.imgUrl" style="width: 80%;height: 80%" @click="prodetail(item)"/>
              </div>
              <div class="goods-show-price">
                <span>
                  <Icon type="social-yen text-danger"></Icon>
                  <span class="seckill-price text-danger">{{item.price}}元</span>
                </span>
              </div>
              <div class="goods-show-detail">
                <span>{{item.title}}</span>
              </div>
              <div class="goods-show-seller">
                <span>来自卖家：{{item.sellerId}}</span>
              </div>
            </div>
            <div class="goods-show-info-sup" v-for="item in 5-searchProductList.length%5" :key="item.id"></div>
          </div>
        </div>

      </div>
      <!-- 分页 -->
      <div class="goods-page" align="center">
        <Page :total="1" show-sizer></Page>
      </div>
    </div>
    <Spin size="large" fix v-if="isLoading"></Spin>
  </div>
</template>

<script>
import Search from '@/components/Search';
import GoodsDetailNav from '@/components/nav/GoodsDetailNav';
import store from '@/vuex/store';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import axios from 'axios';
export default {
  name: 'GoodsList',
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  data () {
    return {
      word: 'cc',
      isAction: [ true, false, false ],
      icon: [ 'arrow-up-a', 'arrow-down-a', 'arrow-down-a' ],
      goodsTool: [
        {title: '综合', en: 'sale'},
        {title: '留言数', en: 'remarks'},
        {title: '价格', en: 'price'}
      ],
      imgUrl:'',
      searchProductList: [],
      adProList:[],
      listLength:0,
    };
  },
  computed: {
    ...mapState(['asItems', 'isLoading',]),

  },
  methods: {
    orderBy (data, index) {
      console.log(data);
      this.icon = [ 'arrow-down-a', 'arrow-down-a', 'arrow-down-a' ];
      this.isAction = [ false, false, false ];
      this.isAction[index] = true;
      this.icon[index] = 'arrow-up-a';
      this.SET_GOODS_ORDER_BY(data);
    },
    prodetail(productInfo){
      let para=JSON.stringify(productInfo)
      sessionStorage.setItem('productInfo', JSON.stringify(productInfo));
      this.$router.push({path: '/goodsDetail', query: { productInfo: para}});
    },
    getAdProList(){
      var self = this 
      axios.get('/product/index_Pro_List').then(function(ret){
          self.adProList = ret.data.data
          console.log("导航栏",self.adProList)
          self.adProList.forEach(element => {
            //console.log('遍历'+element.proTitle)
            axios.get('/file/get_img',{
              params:{
                imgUrl:element.imgUrl
              },responseType: 'blob'
            }).then(function(ret){
              //console.log('被调用')
              const blob = new Blob([ret.data], {
                  type: 'application/png;charset=utf-8',
                });
                const url = window.URL.createObjectURL(blob);
                element.imgUrl = url; 
            }).catch(function(error){
              console.log(error);
            })

          });
        }).catch(function(error){
          console.log(error);
        })
    },
  },
  created () {
    this.getAdProList()
    this.word = this.$route.query.searchData;
    var self = this 
    let param = "keyWord=" + self.word
    axios.post('/product/get_Product_By_KeyWord',param).then(function(ret){
        self.searchProductList = ret.data.data
        console.log("搜索结果：", self.searchProductList)
        
        self.listLength = self.searchProductList.length
        console.log("长度：", self.listLength)
        self.searchProductList.forEach(element => {
          //console.log('遍历'+element.proTitle)
          axios.get('/file/get_img',{
            params:{
              imgUrl:element.imgUrl
            },responseType: 'blob'
          }).then(function(ret){
            //console.log('被调用')
            const blob = new Blob([ret.data], {
                type: 'application/png;charset=utf-8',
              });
              const url = window.URL.createObjectURL(blob);
              element.imgUrl = url; 
          }).catch(function(error){
            console.log(error);
          })
          
        });
      }).catch(function(error){
        console.log(error);
      })
  },
  components: {
    Search,
    GoodsDetailNav,
  },
  store
};
</script>

<style scoped>

.container {
  margin: 15px auto;
  width: 93%;
  min-width: 1000px;
}
.text-danger {
  color: #A94442;
}
.seckill-price{
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}
.goods-box {
  display: flex;
}

/* ---------------侧边广告栏开始------------------- */
.as-box {
  width: 200px;
  border: 1px solid #ccc;
}
.item-as-title{
  width: 100%;
  height: 36px;
  color: #B1191A;
  line-height: 36px;
  font-size: 18px;
}
.item-as-title span:first-child{
  margin-left: 20px;
}
.item-as-title span:last-child{
  float: right;
  margin-right: 15px;
  font-size: 10px;
  color: #ccc;
}
.item-as{
  width: 160px;
  margin: 18px auto;
}
.item-as-img{
  width: 160px;
  height: 160px;
  margin: 0px auto;
}
.item-as-price span{
  font-size: 18px;
}
.item-as-intro{
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled{
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled span{
  color: #005AA0;
}
/* ---------------侧边广告栏结束------------------- */

/* ---------------商品栏开始------------------- */
.goods-list-box {
  margin-left: 15px;
  width: calc(100% - 215px);
}
.goods-list-empty{
  font-size: 50px;
  text-align: center;
}
.goods-list-tool{
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  background-color: #F1F1F1;
}
.goods-list-tool ul{
  padding-left: 15px;
  list-style: none;
}
.goods-list-tool li{
  cursor: pointer;
  float: left;
}
.goods-list-tool span{
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 36px;
  background-color: #fff;
}
.goods-list-tool span:hover{
  border: 1px solid #E4393C;
}
.goods-list-tool i:hover{
  color: #E4393C;
}
.goods-list-tool-active {
  color: #fff;
  border-left: 1px solid #ccc;
  background-color: #E4393C !important;
}

.goods-list {
  display: flex;
  /* float:left; */
  flex-wrap: wrap;
  justify-content: space-between;
}
.goods-list:after{
  content:'';
  display: block;
  visibility: hidde;
}
.goods-show-info-sup{
  width: 240px;
  padding: 10px;
  margin: 15px 0px;
  border: 1px solid #fff;
  cursor: pointer;
}
.goods-show-info{
  width: 240px;
  padding: 10px;
  margin: 15px 0px;
  border: 1px solid #fff;
  cursor: pointer;
}
.goods-show-img{

  height: 50%;
}

.goods-show-info:hover{
  border: 1px solid rgb(240, 236, 236);
  box-shadow: 0px 0px 15px #ccc;
}
.goods-show-price{
  margin-top: 6px;
}
.goods-show-detail{
  font-size: 12px;
  margin: 6px 0px;
}
.goods-show-num{
  font-size: 12px;
  margin-bottom: 6px;
  color: #009688;
}
.goods-show-num span{
  color: #005AA0;
  font-weight: bold;
}
.goods-show-seller{
  font-size: 12px;
  color:#E4393C;
}
.goods-page {
  width: 300px;
  height: 50px;
  position: absolute;
  left: 50%;
  right: 50%;
}

.item-intro-recommend{
  width: 200px;
  display: flex;
  flex-direction: column;
}
.item-intro-recommend-column{
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px #999;
}
.item-recommend-title{
  width: 100%;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  color: #fff;
  background-color: #E4393C;
  box-shadow: 0px 0px 5px #E4393C;
  text-align: center;
}
.item-recommend-column{
  margin-top: 15px;
}
.item-recommend-intro{
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
.item-recommend-img{
  width: 80%;
  margin: 0px auto;
  cursor: pointer;
}
.item-recommend-img img{
  width: 100%;
}
.item-recommend-top-num{
  color: #fff;
  margin: 0px 2px;
  padding: 1px 5px;
  border-radius: 12px;
  background-color: #E4393C;
}
.item-recommend-price{
  color: #E4393C;
  font-weight: bolder;
}
/* ---------------商品栏结束------------------- */
</style>
