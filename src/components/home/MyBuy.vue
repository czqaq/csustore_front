<template>
  <div>
    <el-table
      :data="myBuyList"
      border
      empty-text="您还未买过任何商品，快去选购吧"
      style="width: 100%">
      <el-table-column
        prop="proId"
        label="商品号"
        width="100%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="卖家用户名"
        width="300%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="imgUrl"
        label="图片"
        width="100%"
        align="center">
        <template slot-scope="scope">
          <img v-bind:src="scope.row.imgUrl" 
          alt="" style="width: 50px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column
        prop="proTitle"
        label="标题"
        width="600%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量"
        width="100%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ordTime"
        label="购买时间"
        align="center">
      </el-table-column>
    </el-table>

    <!-- <div class="page-size">
      <Page :total="100" show-sizer></Page>
    </div> -->
  </div>
</template>

<script>
import store from '@/vuex/store';
import HomeNav from '@/components/nav/HomeNav';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
export default {
  name: 'MyBuy',
  data () {
    return {
      myBuyList:[],
      //imgUrl:'blob:http://localhost:8080/350a964f-7d97-41b9-882d-365fdd2e70e1'
      imgUrl:'..'
    };
  },
  created () {
    var self = this 
    //axios.defaults.baseURL='http://42.193.246.152:9000'
    let param = "userId=" + sessionStorage.getItem('userId')
    console.log(param)
    axios.post('/product/get_My_Buyed',param
    ).then(function(ret){
        self.myBuyList = ret.data.data
        self.myBuyList.forEach(element => {
            element.ordTime = element.ordTime.split("T")[0] + ' ' + element.ordTime.split("T")[1].substring(0,8)
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
  methods:{
  },
  store
};
</script>

<style scoped>
.page-size {
  margin: 15px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
