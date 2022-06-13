// 支付验证，调用微信支付接口
<template>
  <div>
    <div class="pay-container">
      <Alert show-icon>
        扫码支付
        <Icon type="qr-scanner" slot="icon"></Icon>
        <template slot="desc">请扫描右边二维码进行支付</template>
      </Alert>
      <div class="pay-box">
        <div class="pay-demo">
          <img src="static/img/pay/pay-demo.png">
        </div>
        <div class="pay-qr-scan">
          <img src="static/img/pay/wechat.jpg">
          <div class="pay-tips">
            <p @click="paydone()">完成支付,点击返回主页</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/vuex/store';
export default {
  name: 'Pay',
  data(){
    return{
      orderList:[]
    }
  },

  created(){
    this.orderList = this.$route.query.orderList
    let parse = JSON.parse(this.orderList)
    this.orderList = parse
    console.log('支付界面: ',this.orderList)
    console.log('接收数据： ',this.orderList)
    console.log('当前登录用户id：'+sessionStorage.getItem('userId'))
  },
  methods:{
    paydone(){
      var self = this 
      self.orderList.forEach(element => {
        console.log('正在购买：',element.id)
        axios.post('/order/pay_Done',{
        buyerId:sessionStorage.getItem('userId'),
        proId:element.id,  
        state:1    
      }).then(function(ret){
        console.log(ret.data);
        if(ret.data.status == 0){
          self.$Message.success('支付成功');
        }else if(ret.data.status == 1){
          alert('支付失败')
        }                       
      }).catch(function(error){
          console.log(error);
      }) 
      });
      self.$router.push('/'); 
    }
  },
  store
};
</script>

<style scoped>
.pay-container {
  margin: 15px auto;
  width: 80%;
  min-width: 1000px;
}
.pay-box {
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pay-demo {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pay-demo img{
  height: 80%;
}
.pay-qr-scan {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pay-qr-scan img{
  width: 50%;
}
.pay-tips {
  width: 50%;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
}
.pay-tips a {
  color: #999999;
}
</style>
