
<template>
  <div>
    <div class="item-detail-show">
      <!-- 左侧用于显示商品图片，暂定一张 -->
      <div class="item-detail-left">
        <!-- 大图 -->
        <div class="item-detail-big-img">
          <img :src="productInfo.imgUrl" alt="">
        </div>
        <!-- 下方选择其他图片 -->
        <!-- <div class="item-detail-img-row">
          <div class="item-detail-img-small" v-for="(item, index) in goodsInfo.goodsImg" :key="index" @mouseover="showBigImg(index)">
            <img :src="item" alt="">
          </div>
        </div> -->

      </div>
      <!-- 右侧用于操作,精简,考虑添加留言,私聊部分 -->
      <div class="item-detail-right">

        <div class="item-detail-title">
          <p>
            <span class="item-detail-express">中南大学</span>  {{productInfo.title}}
          </p>
        </div>
        <div class="item-detail-price-row">
          <!-- 价格 -->
          <div class="item-price-left">
            <div class="item-price-row">
              <p>
                <span class="item-price-title">价 格: <span class="item-price">￥{{productInfo.price}}</span></span>
              </p>
            </div>
          </div>
          <!-- 评价 -->
          <div class="item-price-right">
            <div class="item-remarks-sum">
              <!-- <p>累计评价</p>
              <p>
                <span class="item-remarks-num"> 100条</span>
              </p> -->
            </div>
          </div>
        </div>
        <!-- 商品描述 -->
        <div class="item-select">
          <div class="item-select-title">
            <p>商品描述：{{productInfo.detail}}</p>
          </div>
        </div>
        <br>
        <!-- 选择数量 -->
        
        <div class="add-buy-car-box">
          
          <div class="add-buy-car">
            <InputNumber :min="1" v-model="count" size="large"></InputNumber>
            <Button type="error" size="large" @click="addShoppingCartBtn(productInfo)">加入购物车</Button>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import axios from 'axios'
export default {
  name: 'ShowProduct',
  props:['id','productInfo'],
  data () {
    return {
      price: 0,
      count: 1,
      selectBoxIndex: 0,
      imgIndex: 0,
      imgUrl:'',
    };
  },
  created () {
  },
  methods: {
    // 图片选择
    select (index1, index2) {
      this.selectBoxIndex = index1 * 3 + index2;
      this.price = this.goodsInfo.setMeal[index1][index2].price;
    },
    showBigImg (index) {
      this.imgIndex = index;
    },
    //添加购物车,跳转界面
    addShoppingCartBtn (productInfo) {
      if(sessionStorage.getItem('userName') == null){
        alert('请先登录后再加入购物车')
      }else{
        console.log('加入购物车时获取id',productInfo.id)
        let para=JSON.stringify(productInfo)
        if(this.addCart()){
          sessionStorage.setItem('productInfo', JSON.stringify(productInfo));      
          this.$router.push({path: '/shoppingCart', query: { id: productInfo.id}});
        }
        
      }
    },
    addCart(){
      console.log(sessionStorage.getItem('userId'), this.productInfo.sellerId)
      if(sessionStorage.getItem('userId') == this.productInfo.sellerId){
        
        alert("您不能购买自己的商品")
        return false
      }else{
        var self = this
        let param = "userId=" + sessionStorage.getItem('userId') + "&proId=" + self.productInfo.id
        axios.post('/cart/add_to_cart',param
        ).then(function(ret){
          console.log(' 添加购物车',ret.data);
          if(ret.data.status == 0){       
            
          }else if(ret.data.status == 1){
            alert('添加失败')
          }                       
        }).catch(function(error){
          console.log(error);
        })
        return true
      }
    }
  },
  
  store
};
</script>

<style scoped>
/******************商品图片及购买详情开始******************/
.item-detail-show {
  width: 80%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.item-detail-left {
  width: 350px;
  margin-right: 30px;
}
.item-detail-big-img {
  width: 350px;
  height: 350px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-big-img img {
  width: 100%;
  height: 100%;
}
.item-detail-img-row {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.item-detail-img-small {
  width: 68px;
  height: 68px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-img-small img {
  width: 100%;
  height: 100%;
}
/*商品选购详情*/
.item-detail-right {
  display: flex;
  flex-direction: column;
}
.item-detail-title p {
  color: #666;
  font-size: 20px;
}
.item-detail-express {
  font-size: 14px;
  padding: 2px 3px;
  border-radius: 3px;
  background-color: #e4393c;
  color: #fff;
}
/*商品标签*/
.item-detail-tag {
  font-size: 12px;
  color: #e4393c;
}

/*价格详情等*/
.item-detail-price-row {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f3f3f3;
}
.item-price-left {
  display: flex;
  flex-direction: column;
}
.item-price-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}
.item-price-row {
  margin: 5px 0px;
}
.item-price {
  color: #e4393c;
  font-size: 23px;
  cursor: pointer;
}
.item-price-full-cut {
  margin-right: 5px;
  padding: 3px;
  color: #e4393c;
  font-size: 12px;
  background-color: #ffdedf;
  border: 1px dotted #e4393c;
  cursor: pointer;
}
.item-remarks-sum {
  margin-left: 725px;
  padding-left: 8px;
  border-left: 1px solid #ccc;
}
.item-remarks-sum p {
  color: #999999;
  font-size: 12px;
  line-height: 10px;
  text-align: center;
}
.item-remarks-num {
  line-height: 18px;
  color: #005eb7;
}
.item-select {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}
.item-select-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}
.item-select-column {
  display: flex;
  flex-direction: column;
}
.item-select-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
}
.item-select-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item-select-img {
  width: 36px;
}
.item-select-box {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}
.item-select-box:hover {
  border: 0.5px solid #e3393c;
}
.item-select-box-active {
  border: 0.5px solid #e3393c;
}
.item-select-img img {
  width: 100%;
}
.item-select-intro p {
  margin: 0px;
  padding: 5px;
}
.item-select-class {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}
.item-select-class:hover {
  border: 0.5px solid #e3393c;
}
.add-buy-car-box {
  width: 100%;
  margin-top: 15px;
  border-top: 1px dotted #ccc;
}
.add-buy-car {
  margin-top: 15px;
}
/******************商品图片及购买详情结束******************/
</style>
