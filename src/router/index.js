import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
const Login = resolve => require(['@/components/Login'], resolve);
const SignUp = resolve => require(['@/components/SignUp'], resolve);
const CheckPhone = resolve => require(['@/components/signUp/CheckPhone'], resolve);
const InputInfo = resolve => require(['@/components/signUp/InputInfo'], resolve);
const SignUpDone = resolve => require(['@/components/signUp/SignUpDone'], resolve);
const GoodsList = resolve => require(['@/components/GoodsList'], resolve);
const GoodsDetail = resolve => require(['@/components/GoodsDetail'], resolve);
const ShoppingCart = resolve => require(['@/components/ShoppingCart'], resolve);
const Order = resolve => require(['@/components/Order'], resolve);
const Pay = resolve => require(['@/components/Pay'], resolve);
const PayDone = resolve => require(['@/components/PayDone'], resolve);

const Home = resolve => require(['@/components/Home'], resolve);
const MyProduct = resolve => require(['@/components/home/MyProduct'], resolve);
const AddProduct = resolve => require(['@/components/home/AddProduct'], resolve);
const MyBuy = resolve => require(['@/components/home/MyBuy'], resolve);
const MyShoppingCart = resolve => require(['@/components/home/MyShoppingCart'], resolve);
const UpdateInfo = resolve => require(['@/components/home/UpdateInfo'], resolve);
const Recharge = resolve => require(['@/components/home/Recharge'], resolve);

//const Merchant = resolve => require(['@/components/Merchant'], resolve);

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', // 首页
      name: 'Index',
      component: Index
    },
    {
      path: '/Login', // 登录
      name: 'Login',
      component: Login
    },
    {
      path: '/SignUp', // 注册
      name: 'SignUp',
      component: SignUp,
      children: [
        {
          path: '/',
          name: 'index',
          component: CheckPhone
        },
        {
          path: 'checkPhone',
          name: 'CheckPhone',
          component: CheckPhone
        },
        {
          path: 'inputInfo',
          name: 'InputInfo',
          component: InputInfo
        },
        {
          path: 'signUpDone',
          name: 'SignUpDone',
          component: SignUpDone
        }
      ]
    },
    {
      path: '/goodsList', // 商品列表
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/goodsDetail', // 商品详情
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/shoppingCart', // 商品详情
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/order', // 订单页面
      name: 'Order',
      component: Order
    },
    {
      path: '/pay', // 支付页面
      name: 'Pay',
      component: Pay
    },
    {
      path: '/payDone', // 支付成功页面
      name: 'PayDone',
      component: PayDone
    },

    {
      path: '/home', // 主页
      name: 'Home',
      component: Home,
      meta:{
        requireAuth:true,
      },
      children: [
        {
          path: '/',
          name: 'HomeIndex',
          component: MyProduct
        },
        {
          path: 'MyProduct',
          name: 'MyProduct',
          component: MyProduct
        },
        {
          path: 'addProduct',
          name: 'AddProduct',
          component: AddProduct
        },
        {
          path: 'myBuy',
          name: 'MyBuy',
          component: MyBuy
        },
        {
          path: 'myShoppingCart',
          name: 'MyShoppingCart',
          component: MyShoppingCart
        },
        {
          path: 'updateInfo',
          name: 'UpdateInfo',
          component: UpdateInfo
        },
        {
          path: 'recharge',
          name: 'Recharge',
          component: Recharge,
        }

      ]
    },

    // {
    //   path: '/merchant',
    //   name: 'Merchant',
    //   component: Merchant
    // }
  ]
});
