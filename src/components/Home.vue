// 个人中心界面
<template>
  <div class="container">
    <Layout class="layout">
      <Sider class="side-bar" :style="{height: 'calc(100vh - 35px)', background: '#fff', overflow: 'auto'}" ref="side" :collapsed-width="78">
        <Menu active-name="1-2" theme="light" width="auto" @on-select="onSelect">
          <div class="user-icon">
            <div class="user-img">
              <img src="static/img/head.jpg">
            </div>
            <!-- <p>{{userInfo.username}}}</p> -->
          </div>
          
          <!-- 图标修改todo -->
          <!-- 我的商品 -->
          <Submenu name="1">
            <template slot="title">
                <Icon type="location"></Icon>
                <span>我的商品</span>
            </template>
            <MenuItem name="myProduct">我的在售商品</MenuItem>
            <MenuItem name="addProduct">发布新商品</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
                <Icon type="clipboard"></Icon>
                <span>购物订单</span>
            </template>
            <MenuItem name="myBuy">我的已购</MenuItem>
          </Submenu>
          <!-- 购物车 -->
          <Submenu name="3">
            <template slot="title">
                <Icon type="ios-cart"></Icon>
                <span>购物车</span>
            </template>
            <MenuItem name="myShoppingCart">我的购物车</MenuItem>
          </Submenu>
          <!-- 个人信息 -->
          <Submenu name="4">
            <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>个人信息</span>
            </template>
            <MenuItem name="updateInfo">修改个人信息</MenuItem>
            <MenuItem name="recharge">余额充值</MenuItem>
          </Submenu>
        </Menu>
      </Sider>

      <Layout class="layout">
        <Header :style="{background: '#fff'}">
          <h2>{{activeTitle}}</h2>
        </Header>
        <Content class="content">
          <transition mode="out-in">
            <router-view></router-view>
          </transition>
        </Content>
      </Layout>

    </Layout>
    <Footer/>
  </div>
</template>

<script>
import store from '@/vuex/store';
import Footer from '@/components/footer/Footer';
//import { mapState, mapActions } from 'vuex';
export default {
  name: 'Home',
  data () {
    return {
      activeTitle: '用户主页',
      bar: {
        'myAddress': '我的收货地址',
        'addAddress': '添加收货地址',
        'myBuy': '我的已购',
        'myShoppingCart': '我的购物车',
        'updateInfo':'修改个人信息',
        'recharge':'余额充值'
      }
    };
  },
  created () {
    //console.log('当前登录用户id：'+sessionStorage.getItem('userId'))
    //console.log('当前登录用户名：'+sessionStorage.getItem('userName'))
  },
  methods: {
    onSelect (name) {
      this.activeTitle = this.bar[name];
      this.$router.push(`/home/${name}`);
    },
  },
  store,
  components: {
    Footer
  },
};
</script>

<style scoped>
.side-bar a{
  color: #232323;
}
.user-icon {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.user-icon span {
  font-size: 96px;
}
.user-img {
  margin-bottom: 15px;
  width: 96px;
  height: 96px;
  border-radius: 48px;
  overflow: hidden;
}
.user-img img{
  width: 100%;
}
.content {
  margin: 15px;
  background-color: #fff;
  padding: 15px;
}
.layout-footer-center {
  padding: 0px 15px;
  padding-bottom: 15px;
  text-align: center;
}
</style>
