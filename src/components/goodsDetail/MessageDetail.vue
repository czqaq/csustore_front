
<template>
  <div>
    <div class="item-intro-show">
      <!-- 左侧推荐栏，可改 -->
      <div class="item-intro-recommend"> 
        <div class="item-recommend-title">
          <p>他还有这些在售</p>
        </div>
        
        <div class="item-intro-recommend-column">
          <div class="item-recommend-column" v-for="(item, index) in otherSaleList" :key="index"> 
            <div class="item-recommend-img">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="item-recommend-intro">
              <span>
                <span class="item-recommend-top-num">{{index + 1}}</span> {{item.title}}</span>
              <span class="item-recommend-price">￥{{item.price}}</span>
            </div>
            
          </div>
        </div>

      </div>
      <!-- 商品下方详细信息/描述，可改 -->
      <div class="item-intro-detail" ref="itemIntroDetail">        
        <div class="item-intro-nav item-tabs">
          <Tabs>
            <TabPane label="留言">
              <div class="remarks-container">
                <!-- 标题 -->
                <div class="remarks-title">
                  <span>卖家信息</span>
                </div>  
                <div class="saler-info-box">
                  <p class="saler-info">用户ID: {{seller}}</p>
                </div>
                <!-- 分割线,留言标题 -->
                <div class="remarks-title">
                  <span>商品留言</span>
                </div>
                <!-- 留言列表 -->
                <div class="remarks-box" v-for="(item,index) in messageList" :key="index">
                  <!-- 留言用户名 -->
                  <div class="remarks-user">
                    <Avatar icon="person" />
                    <span class="remarks-user-name">{{item.userId}} 说：</span>
                  </div>
                  <!-- 留言内容 -->
                  <div class="remarks-content-box">
                    <!-- 留言内容 -->
                    <p class="remarks-content">{{item.content}}</p>
                    <p class="remarks-sub">
                      <span class="remarks-time"> 留言时间: {{item.time.split("T")[0] + ' ' + item.time.split("T")[1].substring(0,8)}}</span>
                    </p>
                  </div>
                </div>
                <!-- 分页 -->
                <!-- <div class="remarks-page">
                  <Page :total="40" size="small" show-elevator show-sizer></Page>
                </div> -->
              </div>
            </TabPane>
          </Tabs>
          <br/>
          <div class="tableTitle"><span class="midText">我要留言</span></div>
          <br/>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入留言内容"
            v-model="mesDetail">
          </el-input>
          <br/>
          <br/>
          <el-button type="primary" icon="el-icon-edit" @click="postMes">留言</el-button>
          <br/>
          <br/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import Footer from '@/components/footer/Footer';
import axios from 'axios'
export default {
  name: 'MessageDetail',
  props:['proId','productInfo'],
  data () {
    return {
      tagsColor: [ 'blue', 'green', 'red', 'yellow' ],
      mesDetail:'',
      messageList:[],
      otherSaleList:[],
      seller:''
    };
  },
  created () {
    var self = this 
    //axios.defaults.baseURL='http://42.193.246.152:9000'
    //该商品的留言列表
    let mesParam = 'proId=' + self.productInfo.id
    this.seller = self.productInfo.sellerId
    axios.post('/message/get_mes_list',mesParam,
    ).then(function(ret){
        self.messageList = ret.data.data
      }).catch(function(error){
        console.log(error);
      })
    
    //该商品卖家的其他在售列表
    let otherSaleParam = 'sellerId=' + self.productInfo.sellerId
    axios.post('/product/get_My_Sell',otherSaleParam
    ).then(function(ret){
        self.otherSaleList = ret.data.data
        self.otherSaleList.forEach(element => {
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
  methods: {
    postMes(){
      if(sessionStorage.getItem('userId') == null){
        alert('请先登录后再留言')
      }else if(this.mesDetail.match(/^[ ]*$/)){
        alert('请输入留言内容')
      }else{
        console.log('留言用户： '+sessionStorage.getItem('userName'))
        console.log(this.mesDetail)
        var self = this 
        console.log('留言用户名： '+sessionStorage.getItem('userName'))
        console.log('留言用户名： '+sessionStorage.getItem('isLogin'))
        //axios.defaults.baseURL='http://42.193.246.152:9000'
        axios.post('/message/leave_mes',{
          userId:sessionStorage.getItem('userId'),
          proId:self.productInfo.id,
          content:self.mesDetail            
        }).then(function(ret){
          console.log(ret.data);
          if(ret.data.status == 0){
            alert('留言成功')
            self.$router.go(0)
          }else if(ret.data.status == 1){
            alert('留言失败，请检查留言内容')
          }                       
        }).catch(function(error){
              console.log(error);
        })                     
      }
      //this.$router.go(0)
    }
  },
  
  components: {
    Footer
  },
  store
};
</script>

<style scoped>
/***************商品详情介绍和推荐侧边栏开始***************/
.tableTitle {
    position: relative;
    margin: 0 auto;
    width: 600px;
    height: 1px;
    background-color: #d4d4d4;
    text-align: center;
    font-size: 16px;
    color: rgba(101, 101, 101, 1);
  }
 .midText {
    position: absolute;
    left: 50%;
    background-color: #ffffff;
    padding: 0 15px;
    transform: translateX(-50%) translateY(-50%);
  }
.item-intro-show{
  width: 80%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.item-intro-recommend{
  width: 200px;
  display: flex;
  flex-direction: column;
}
.item-intro-recommend-column{
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px #999;
}
.item-recommend-title{
  width: 100%;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  color: #fff;
  background-color: #E4393C;
  box-shadow: 0px 0px 5px #E4393C;
  text-align: center;
}
.item-recommend-column{
  margin-top: 15px;
}
.item-recommend-intro{
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
.item-recommend-img{
  width: 80%;
  margin: 0px auto;
  cursor: pointer;
}
.item-recommend-img img{
  width: 100%;
}
.item-recommend-top-num{
  color: #fff;
  margin: 0px 2px;
  padding: 1px 5px;
  border-radius: 12px;
  background-color: #E4393C;
}
.item-recommend-price{
  color: #E4393C;
  font-weight: bolder;
}
.item-intro-detail{
  margin-left: 30px;
  width: calc(80vw - 300px);
}
.item-intro-nav{
  width: 100%;
  height: 38px;
  background-color: #F7F7F7;
  border-bottom: 1px solid #E4393C;
}
.item-intro-nav ul{
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.item-intro-nav li{
  float: left;
  height: 100%;
  width: 120px;
  line-height: 38px;
  text-align: center;
  color: #E4393C;
}
.item-intro-nav li:first-child{
  background-color: #E4393C;
  color: #fff;
}
.item-intro-img{
  width: 100%;
}
.item-intro-img img{
  width: 100%;
}
/************* 商品参数 *************/
.item-param-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}
.item-param-box {
  padding: 5px;
  padding-left: 30px;
  width: 240px;
  height: 36px;
  font-size: 14px;
  /* text-align: center; */
  /* background-color: #ccc; */
}
.item-param-title {
  color: #232323;
}
.item-param-content {
  color: #999;
}
.remarks-title {
  padding-left: 15px;
  height: 36px;
  font-size: 16px;
  font-weight: bolder;
  line-height: 36px;
  color: #666666;
  background-color: #F7F7F7;
}
.remarks-analyse-box {
  padding: 15px;
  display: flex;
  align-items: center;
}
.remarks-analyse-goods {
  margin-left: 15px;
  margin-right: 15px;
}
.remarks-analyse-num {
  font-size: 26px;
}
.remarks-analyse-title {
  font-size: 12px;
  line-height: 20px;
}
.remarks-bar {
  padding-left: 15px;
  height: 36px;
  line-height: 36px;
  color: #666666;
  background-color: #F7F7F7;
}
.remarks-bar span {
  margin-right: 15px;
}
.remarks-box {
  padding: 15px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px #ccc dotted;
}
.remarks-user {
  width: 180px;
}
.saler-info{
  padding-left: 15px;
  height: 36px;
  font-size: 20px;
}
.remarks-user-name {
  padding-left: 15px;
  font-size: 20px;
}
.remarks-content-box {
  width: calc(100% - 180px);
}
.remarks-star {
  background-color: #fff;
}
.remarks-content {
  font-size: 15px;
  color: #232323;
  line-height: 28px;
}
.remarks-sub {
  margin-top: 15px;
  color: #ccc;
}
.remarks-time {
  margin-right: 500px;
}
.remarks-page {
  margin: 15px;
  display: flex;
  justify-content:flex-end;
}
/***************商品详情介绍和推荐侧边栏结束***************/
</style>

<style>
/* 改变便签页样式 */
.ivu-tabs-ink-bar {
  background-color: #E4393C !important;
}
.item-tabs > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab{
  border-radius: 0px;
  color: #999;
  height: 38px;
  background: #F7F7F7;
}
.item-tabs > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab-active{
  color: #fff;
  background-color: #E4393C;
}
.item-tabs > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab-active:before{
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  color: #fff;
  background: #F7F7F7;
  position: absolute;
  top: 0;
  left: 0;
}
.ivu-rate-star-full:before, .ivu-rate-star-half .ivu-rate-star-content:before {
  color: #E4393C;
}
</style>
