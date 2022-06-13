// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.config.productionTip = false;
//element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)
//axios
import Axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, Axios)
//import apiConfig from '../config/api.config.js'
//Axios.defaults.baseURL=apiConfig.baseURL
Axios.defaults.baseURL ='http://119.29.135.129:80/'
// Axios.defaults.baseURL ='http://localhost:8090/'
// Axios.defaults.withCredentials = true

import qs from 'qs'
Vue.prototype.$qs = qs

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start();
//   next();
// });

router.beforeEach((to, from, next) => {
  var flag = to.path.indexOf('/home')>=0
  if(sessionStorage.getItem('isLogin') == null && flag){
    alert('请先登录')
    router.back() 
  }else{
    iView.LoadingBar.start();
    next();
  } 
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
