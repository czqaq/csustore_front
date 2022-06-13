<template>
  <div>
      <div class="add-container">
      <el-steps :active="active" align-center>
        <el-step title="步骤1" description="选择充值金额"></el-step>
        <el-step title="步骤2" description="扫描二维码完成充值"></el-step>
      </el-steps>
        <div class="step-content">
            <center v-show="active == 0">
                输入充值金额：  
            <el-input
                placeholder="充值金额"
                v-model="userBalance"
                :disabled="false"
                >
            </el-input>
            </center>

            <center v-show="active == 1">
            <div class="pay-qr-scan">
                <img src="static/img/test/pay/wechat.jpg">
            </div>
            </center>

        </div>

      <center><el-button style="margin-top: 12px;" @click="next" type="primary">{{buttonTip}}</el-button></center>
      </div>
  </div>

</template>

<script>
import store from '@/vuex/store';
import axios from 'axios';
export default {
  name: 'UpdateInfo',
  data(){
      return{
          active:0,
          userBalance:0,
          buttonTip:'前往充值'
      }
  },
  methods: {
      next() {
        if (this.active > 2) this.active = 0;
        this.active++
        if(this.active == 0){
            this.buttonTip = '前往充值'
        }else if (this.active == 1){
            this.buttonTip = '充值完成'
            axios.post('/SERVICE-USER/recharge',{
                userId:sessionStorage.getItem('userId'),
                password:self.userBalance,            
            }).then(function(ret){
            if(ret.data.code == 200){  
                this.active++
            }else if(ret.data == 500){
                console.log('操作有误')
            }                       
            }).catch(function(error){
                console.log(error);
            })
        }else if (this.active == 2){
            this.buttonTip = '查看余额'
            this.$router.push(`/home/updateInfo`);
        }
      }
    },

};
</script>

<style scoped>
.add-container {
  margin: 15px auto;
  width: 100%;
  /* min-width: 600px; */
}
.el-input {
    width: 200px;
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

</style>