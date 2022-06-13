<template>
  <div class="container">
    <div class ='empty1'>
    </div>
    <div class="title">
      <img src="static/img/csu.jpeg"  align="center" alt="">
    </div> 

    <Search></Search>
    <HomeNav></HomeNav>

    <div class="content">

      <div class="type">
        <!-- 头部 -->
        <div class="electric-head">
          <div class="type-icon">
            <img src="static/img/index/电器.png">
          </div>
          <div class="type-text">
            <span class="type-title">电器专区</span>
          </div>
        </div>
        <!-- 内容 -->
        <div class="type-content">
          <div class="type-item" v-for="(item, index) in electricList" :key="index">
            <div class="type-item-img">
              <img :src="item.imgUrl" @click="prodetail(item)"/>
            </div>
            <div class="type-item-info">
              <p>{{item.title}}</p>
              <p>
                <span class="type-price text-danger"><Icon type="social-yen"></Icon>{{item.price}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <div class="type"> 
        <div class="fruit-head">
          <div class="type-icon">
            <img src="static/img/index/水果.png">
          </div>
          <div class="type-text">
            <span class="type-title">水果专区</span>
          </div>
        </div>
        <div class="type-content">
          <div class="type-item" v-for="(item, index) in fruitList" :key="index">
            <div class="type-item-img">
              <img :src="item.imgUrl" @click="prodetail(item)"/>
            </div>
            <div class="type-item-info">
              <p>{{item.title}}</p>
              <p>
                <span class="type-price text-danger"><Icon type="social-yen"></Icon>{{item.price}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="type">
        <div class="stationery-head">
          <div class="type-icon">
            <img src="static/img/index/文具.png">
          </div>
          <div class="type-text">
            <span class="type-title">文具专区</span>
          </div>
        </div>
        <div class="type-content">
          <div class="type-item" v-for="(item, index) in stationeryList" :key="index">
            <div class="type-item-img">
              <img :src="item.imgUrl" @click="prodetail(item)"/>
            </div>
            <div class="type-item-info">
              <p>{{item.title}}</p>
              <p>
                <span class="type-price text-danger"><Icon type="social-yen"></Icon>{{item.price}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
     
    
    </div>



      <div class ='empty2'>
      </div>
    <Footer/>
  </div>
</template>

<script>
import Search from '@/components/Search';
import HomeNav from '@/components/nav/HomeNav';
import Footer from '@/components/footer/Footer';
import store from '@/vuex/store';
import axios from 'axios';
import qs from 'qs'
export default {
  name: 'Index',
  created () {
    this.getElecticList();
    this.getFruitList();
    this.getStationeryList();
    console.log('localStorage信息：', localStorage.getItem('userName')) 
    console.log('sessionStorage信息：', sessionStorage.getItem('userName')) 
    // this.loadCarouselItems();
    // this.loadShoppingCart();
  },
  data () {
    return {
      setIntervalObj: null,
      electricList:[],
      fruitList:[],
      stationeryList:[],
    };
  },
  methods: {
    getCookieValue(name) {
      let result = document.cookie.match(
        "(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)"
      );
      return result ? result.pop() : "";
    },
    checkLogin(){
      
      return sessionStorage.getItem('isLogin');
    },
    getElecticList(){
      console.log('当前请求地址首页： ',axios.defaults.baseURL)
      var self = this 
      let param = 'type=电器'
      axios.post('/product/get_Product_By_Type',param,
      ).then(function(ret){
          let myStatusCode = ret.data.status
          self.electricList = ret.data.data

          self.electricList.forEach(element => {
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
    getFruitList(){
      var self = this 
      //axios.defaults.baseURL='http://42.193.246.152:9000'
      let param = 'type=水果'
      axios.post('/product/get_Product_By_Type',param,
        ).then(function(ret){
          self.fruitList = ret.data.data
          
          self.fruitList.forEach(element => {
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
    getStationeryList(){
      var self = this 
      //axios.defaults.baseURL='http://42.193.246.152:9000'
      let param = 'type=文具'
      axios.post('/product/get_Product_By_Type',param,).then(function(ret){
          self.stationeryList = ret.data.data
          self.stationeryList.forEach(element => {
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
    
    prodetail(productInfo){
      let para=JSON.stringify(productInfo)
      sessionStorage.setItem('productInfo', JSON.stringify(productInfo));
      this.$router.push({path: '/goodsDetail', query: { productInfo: para}});
    },

  },
  components: {
    Search,
    HomeNav,
    Footer
  },
  destroyed () {
    clearInterval(this.setIntervalObj);
  },
  store
};
</script>

<style scoped>
.container {
  background-color: white;
}
.content {
  width: 1200px;
  margin: 0px auto;
  border: 1px solid 	#2b88e4;
  border-radius: 10px;
  background-color: white;
}

.type {
  width: 95%;
  height: 330px;
  margin: 15px auto;
  background-color: white;
}
.electric-head {
  width: 100%;
  height: 50px;
  background-color: #6da6be;
}
.fruit-head {
  width: 100%;
  height: 50px;
  background-color: #eeb955;
}
.stationery-head {
  width: 100%;
  height: 50px;
  background-color: #f90013;
}

.type-icon {
  width: 68px;
  height: 100%;
  float: left;
}
.type-icon img {
  width: 35px;
  height: 35px;
  margin-top: 6px;
  margin-left: 15px;
  animation-name: shake-clock;
  animation-duration: 0.3s;
  animation-iteration-count: infinite; /*设置无线循环*/
}
.type-text {
  width: 300px;
  height: 100%;
  float: left;
}
.type-text .type-title {
  font-size: 22px;
  line-height: 50px;
  color: #fff;
}
.type-text .type-remarks {
  margin-left: 5px;
  font-size: 10px;
  color: #fff;
}
.type-content {
  width: 100%;
  height: 280px;
}
.type-item {
  width: 183px;
  height: 250px;
  margin-top: 15px;
  margin-left: 15px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
  float: left;
}
.type-item-img {
  width: 160px;
  height: 160px;
  margin: 0px auto;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
.type-item-img img {
  width: 130px;
  height: 130px;
  margin-left: 15px;
  margin-top: 15px;
  transition: margin-top 0.3s;
}
.type-item-img:hover img {
  margin-top: 6px;
  transition: margin-top 0.3s;
}
.type-item-info {
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 12px;
  color: #009688;
}
.type-item-info i:first-child {
  font-size: 14px;
}
.type-price {
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}



.title{
  text-align: center;
  align-items: center;
}
.empty1 {
  width: 100%;
  height: 2vh;
  background-color: white;
  overflow: hidden;
}
.empty2 {
  width: 100%;
  height: 20vh;
  /* background-color: #f4f4f4; */
  background-color: white;
  overflow: hidden;
}
</style>
