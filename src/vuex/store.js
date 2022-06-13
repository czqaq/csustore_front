import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
    isLoading: false, // 是否展示loading动画
    isLogin:false,
    orderBy: 'sale', // 根据什么字段排序

    productInfo: {  //  搜索商品信息 {标题、价格、描述、图片列表、留言列表、所属用户id}
      proTitle: 'xx',
      proPrice: '',
      proDetail: 'xx',
      imgUrl: [],
      message:[{  // 留言用户的用户名，留言内容，留言时间
        userName: 'test-user',
        mesDetail: 'test-mesDetail',
        mesTime: '2021-10-29'
      }],
      userId:''
    },
    myproductsInfo:[{ //  用户在售商品信息
      title:'',
      price:'',
      detail:''
    }],

    mycartlist: [{  //  当前用户的购物车列表
      proId: '',
      proTitle: '',
      proPrice: '',
    }],
    mysalelist: [{  //  当前用户的在售列表
      proId: '',
      proTitle: '',
      proPrice: '',
    }],
    mybuylist: [{   //  当前用户的已购列表
      ordId: '',
      ordTitle: '',
      ordPrice: '',
      ordTime: '',
    }], 

    // ***********************接收参数列表
    searchProductList: [{ //搜索得到的商品列表，包括关键字搜索和种类搜索
      proId: '',
      userName: '',
      typeName: '',
      proTitle: '',
      proPrice: '',
      imageUrl: '',
      proDetail: '',
      proTime: '',
      num: '',
    }],
    myBuyList: [{ //我的已购商品列表，多加一个orderTime
      proId: '',
      userName: '',
      typeName: '',
      proTitle: '',
      proPrice: '',
      imageUrl: '',
      proDetail: '',
      proTime: '',
      num: '',
      orderTime: '',
    }],
    mySaleList: [{  //  我的在售列表
      proId: '',
      userName: '',
      typeName: '',
      proTitle: '',
      proPrice: '',
      imageUrl: '',
      proDetail: '',
      proTime: '',
      num: '',
    }],
    otherSaleList: [{ //  商家的其他在售商品
      proId: '',
      userName: '',
      typeName: '',
      proTitle: '',
      proPrice: '',
      imageUrl: '',
      proDetail: '',
      proTime: '',
      num: '',
    }],
    messageList: [{  //  留言列表
      mesId: '',
      proId: '',
      userName: '',
      mesDetail: '',
      mesTime: '',
    }],
    
    userInfo: { //  当前登录用户信息
      userId: '',
      userName: '',
      password: '',
      place: '',
      userIntro: '',
      userBalance: '',
      isValid: '',
    },
    productInfo: {  //  商品信息
      proId: '',
      userName: '',
      typeName: '',
      proTitle: '',
      imageUrl: '',
      proDetail: '',
      proTime: '',
      num: '',
    },
    
    //  POST请求参数列表
    postRegister: { //  注册信息
      userName: '',
      password: '',
      place: '',
      userIntro: '',
    },
    postLogin: {  //  登录信息
      userName: '',
      password: '',
    },
    PostAdd: {  //  添加购物车
      proId: '',
      userId: '',
    },
    postSubmit: { //  提交购买订单
      proId: '',
      userId: '',
      orderTime: '',
    },
    postPut: {  //  上架商品
      userName: '',
      typeName: '',
      proTitle: '',
      imageUrl: '',
      proDetail: '',
      proTime: '',
      num: '',
    },
    postMes: {  //  留言
      userName: '',
      proId: '',
      mesDetail: '',
      mesTime: '',
    }
    
  },
  getters,
  actions,
  mutations
});
