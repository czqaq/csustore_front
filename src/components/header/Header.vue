<template>
  <div class="box">
    <div class="nav">
      <!-- <div class="logo">
          <img src="@/assets/images/csu.png" alt=""
          style="width:300px;height:100px;margin-right:0px;float:left">
        </div> -->

      <ul class="detail">
        <li class="first" v-show="!userName">
          你好，请<router-link to="/login">登录 <Icon type="person"></Icon></router-link> |<span class="text-color-red"><router-link to="/SignUp">   注册 <Icon type="person-add"></Icon></router-link></span>
        </li>
        <!-- 登录后显示用户名 -->
        <li v-if="!!userName">
          <Dropdown>
            <p class="username-p">
              <Avatar class="person-icon" icon="person" size="small" /> <span class="username">{{userName}} </span>
            </p>
            <DropdownMenu slot="list">
                <!-- 主页 -->
                <div class="my-page">
                  <div class="my-info" @click="myInfo">
                    <Icon type="home"></Icon>
                    <p>我的主页</p>
                  </div>
                <!-- 退出登录 -->
                  <div class="sign-out" @click="signOutFun">
                    <Icon type="log-out"></Icon>
                    <p>退出登录</p>
                  </div>
                </div>
            </DropdownMenu>
          </Dropdown>
        </li>

        <!-- 购物车下拉框 -->
        <li>
          <Dropdown  placement="bottom-start">
            <a href="javascript:void(0)">
              <Icon type="ios-cart-outline"></Icon> 购物车
            </a>
            <DropdownMenu slot="list">
              <!-- 无商品时 -->
              <div class="shopping-cart-null" v-show="shoppingCart.length <= 0">
                <Icon type="ios-cart-outline" class="cart-null-icon"></Icon>
                <span>你的购物车没有空空哦</span>
                <span>赶快去添加商品吧~</span>
              </div>
              <!-- 有商品时 -->
              <div class="shopping-cart-list" v-show="shoppingCart.length > 0">
                <!-- 购物车中每个商品的信息 -->
                <div class="shopping-cart-box" v-for="(item,index) in shoppingCart" :key="index">
                  <div class="shopping-cart-img">
                    <img :src="item.imgUrl">
                  </div>
                  <div class="shopping-cart-info">
                    <div class="shopping-cart-title">
                      <p>{{item.title.substring(0, 22)}}...</p>
                    </div>
                    <div class="shopping-cart-detail">
                      <p>
                        价钱:
                        <span class="shopping-cart-text">
                          {{item.price}}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <!-- 购物车下方结账 -->
                <div class="go-to-buy">
                  <Button type="error" size="small" @click="goToPay">
                    去结账
                  </Button>
                </div>
              </div>
            </DropdownMenu>

          </Dropdown>
        </li>
        <!-- <li><router-link to="/freeback">意见反馈</router-link></li> -->
        <li><router-link to="/">商城首页</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
export default {
  name: 'M-Header',
  created () {
    this.isLogin = localStorage.getItem('isLogin')
    this.userName = localStorage.getItem('userName')
    this.userId = localStorage.getItem('userId')

    this.isLogin = sessionStorage.getItem('isLogin')
    this.userName = sessionStorage.getItem('userName')
    this.userId = sessionStorage.getItem('userId')
    this.getCart()
  },
  data () {
    return {
      isLogin:false,
      userName:'',
      userId:'',
      shoppingCart:[]
    };
  },
  methods: {
    goToPay () {
      this.$router.push('/order');
    },
    myInfo () {
      this.$router.push('/home');
    },
    signOutFun () {
      this.loginOut();
      this.$router.push('/');
      location.reload();
    },
    loginOut(){
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userName');
      sessionStorage.setItem('isLogin', false);
    },

    getCart(){
      if(sessionStorage.getItem('userId') != null){
        let param = "userId="+sessionStorage.getItem('userId')
        axios.post('/cart/get_cart',param
        ).then((ret) => {
        this.shoppingCart = ret.data.data
        this.shoppingCart.forEach(element => {
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
      }else{

      }
      
      
    }
    
  },
  watch:{
    '$route'(to,from){
      console.log('路由变化')
      this.getCart()
    }
  },
  store
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 60px;
  background-color: #2b88e4;
  overflow: hidden;
}
.detail{
  margin-left:60%;
  margin-top: 15px;
}
.nav {
  margin: 0% auto;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nav ul {
  list-style: none;
}
.nav li {
  float: left;
  font-size: 14px;
  line-height: 35px;
  margin-right: 15px;
  font-weight: bold;
}
.nav a {
  text-decoration: none;
  color: white;
  padding-left: 15px;
  border-left: 1px solid #ccc;
  cursor: pointer;
}
.location a {
  border-left: none;
}
.nav a:hover {
  color: #d9534f;
}
.location {
  color: #999999;
}
.icon {
  color: #d9534f;
}
/* 第一个请登录特殊处理 */
.first {
  color: white;
}
.first a:first-child {
  padding-left: 3px;
  border-left: none;
}

.person-icon {
  color: #d9534f;
  background-color:  #f0cdb2;
}
.username {
  color: white;
}
/* 购物车下拉框 */
.shopping-cart-list {
  padding: 3px 15px;
}
.shopping-cart-box {
  margin: 8px 0px;
  margin-top: 15px;
  padding-bottom: 15px;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px #ccc dotted;
}
.shopping-cart-box:first-child {
  margin-top: 8px;
}
.shopping-cart-img {
  margin-right: 15px;
  width: 40px;
  height: 40px;
}
.shopping-cart-img img {
  width: 100%;
}
.shopping-cart-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  width: 200px;
  overflow: hidden;
  font-size: 12px;
  line-height: 20px;
  color: #999999;
}
.shopping-cart-detail {
  color: #999999;
}
.shopping-cart-text {
  color: #ccc;
}

.go-to-buy {
  display: flex;
  justify-content: flex-end;
}
.shopping-cart-null {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.cart-null-icon {
  font-size: 38px;
  margin-bottom: 15px;
}
.shopping-cart-null span {
  color: #999999;
  font-size: 12px;
  line-height: 16px;
}
.username-p {
  cursor: pointer;
}
.my-page {
  padding: 3px 5px;
  width: 180px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-page a {
  margin: 0px;
  padding: 0px;
  border: none;
}
.my-info {
  padding: 5px;
  width: 50%;
  height: 100%;
  text-align: center;
  cursor: pointer;
}
.my-info:hover {
  box-shadow: 0px 0px 5px #ccc;
}
.my-info i {
  font-size: 28px;
}
.my-info p {
  font-size: 12px;
}
.sign-out {
  padding: 5px;
  width: 50%;
  height: 100%;
  text-align: center;
  cursor: pointer;
}
.sign-out:hover {
  box-shadow: 0px 0px 5px #ccc;
}
.sign-out i {
  font-size: 28px;
}
.sign-out p {
  font-size: 12px;
}
</style>
