<template>
  <div>
    <Search></Search>
    <GoodsDetailNav></GoodsDetailNav>
    <div class="goods-list-container">
      <!-- 提示信息 -->
      <Alert show-icon class="tips-box">
        小提示
        <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
        <template slot="desc">请点击商品前的选择框，选择购物车中的商品，点击付款即可。</template>
      </Alert>
      <!-- 购物车表格 -->
      <el-table
        ref="multipleTable"
        :data="myShoppingCart"
        border
        empty-text="您的购物车中还没有东西，快去选购吧"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="商品号"
          width="100%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sellerName"
          label="卖家用户名"
          width="200%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="imgUrl"
          label="图片"
          width="100%"
          align="center">
          <template slot-scope="scope">
            <img  :src="scope.row.imgUrl" alt="" style="width: 50px;height: 50px">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="400%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="100%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="upTime"
          label="上架时间"
          align="center">
        </el-table-column>
      </el-table>
      <!-- 备注信息，可改 -->
      <div class="remarks-container">
        <h3>备注</h3>
        <i-input v-model="remarks" size="large" placeholder="在这里填写备注信息" class="remarks-input"></i-input>
      </div>
      <!-- 支付操作 -->
      <div class="pay-container">
        <div class="pay-box">
          <p> <span>提交订单应付总额：</span> <span class="money"><Icon type="social-yen"></Icon> {{totalPrice}}</span></p>
          <div class="pay-btn">
            <!-- <router-link to="/pay"><Button type="error" size="large" @click="pay()">支付订单</Button></router-link> -->
            <Button type="error" size="large" @click="pay()">支付订单</Button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Search from '@/components/Search';
import GoodsDetailNav from '@/components/nav/GoodsDetailNav';
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
export default {
  name: 'Order',
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  created () {
    var self = this 
    let param = "userId="+sessionStorage.getItem('userId')
    axios.post('/cart/get_cart',param
    ).then(function(ret){
        self.myShoppingCart = ret.data.data
        self.myShoppingCart.forEach(element => {
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
  data () {
    return {
      myShoppingCart: [],
      multipleSelection: [],
      selectRows:[],
      selectTotal:0,
      price:0,
      remarks: '',
      totalPrice:0,
      orderList:[]
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.totalPrice = 0
      val.forEach(element => {
        this.totalPrice += parseFloat(element.price)
      });
      this.orderList = val 
      //console.log('当前总价格为：',this.totalPrice)
    },
    pay(){
      //console.log('当前已选择商品：',this.orderList)
      if(this.orderList == 0){
        alert('请点击商品前的选择框，选择购物车中的商品')
      }else{
        let para=JSON.stringify(this.orderList)
        console.log(para)
        sessionStorage.setItem('orderList', JSON.stringify(this.orderList));
        this.$router.push({path: '/pay', query: { orderList: para}});
      }
      
    }
  },
  components: {
    Search,
    GoodsDetailNav
  },
  store
};
</script>

<style scoped>
.goods-list-container {
  margin: 15px auto;
  width: 80%;
}
.tips-box {
  margin-bottom: 15px;
}
.address-container {
  margin-top: 15px;
}
.address-box {
  margin-top: 15px;
  padding: 15px;
  border: 1px #ccc dotted;
}
.address-check {
  margin: 15px 0px;
  height: 36px;
  display: flex;
  align-items: center;
}
.address-check-name {
  width: 120px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #ccc;
}
.address-check-name span {
  width: 120px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  background-color: #f90013;
}
.address-detail {
  padding-left: 15px;
  font-size: 14px;
  color: #999999;
}
.remarks-container {
  margin: 15px 0px;
}
.remarks-input {
  margin-top: 15px;
}
.invoices-container p{
  font-size: 12px;
  line-height: 30px;
  color: #999;
}
.pay-container {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}
.pay-box {
  font-size: 18px;
  font-weight: bolder;
  color: #495060;
}
.money {
  font-size: 26px;
  color: #f90013;
}
.pay-btn {
  margin: 15px 0px;
  display: flex;
  justify-content: flex-end;
}
</style>
