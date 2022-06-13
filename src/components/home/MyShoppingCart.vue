<template>
  <div>
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
    <div class="go-to">
      <el-button type="danger" @click="chooseDeletePro">移除</el-button>
      &nbsp;&nbsp;&nbsp;
       <el-button type="primary" @click="goTo">去付款</el-button>     
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
export default {
  name: 'MyShoppingCart',
  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 58,
          align: 'center'
        },
        {
          title: '图片',
          key: 'img',
          width: 86,
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.img
                }
              })
            ]);
          },
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '套餐',
          width: 198,
          key: 'package',
          align: 'center'
        },
        {
          title: '数量',
          key: 'count',
          width: 68,
          align: 'center'
        },
        {
          title: '价格',
          width: 68,
          key: 'price',
          align: 'center'
        }
      ]
      ,myShoppingCart:[]
    };
  },
  created () {
    //this.loadShoppingCart();
    var self = this 
    let param = "userId="+sessionStorage.getItem('userId')
    axios.post('/cart/get_cart',param
    ).then(function(ret){
        if(ret.data.data[0] == null){
          console.log('获取数据为空')
        }else{
          self.myShoppingCart = ret.data.data
          self.myShoppingCart.forEach(element => {
            element.upTime = element.upTime.split("T")[0] + ' ' + element.upTime.split("T")[1].substring(0,8)
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
        }      

      }).catch(function(error){
        console.log(error);
      })

  },
  methods: {
    goTo () {
      this.$router.push('/order');
    },
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
        this.totalPrice += parseFloat(element.proPrice)
      });
      this.orderList = val 
    },
    chooseDeletePro(){
      if(this.orderList == null){
        alert('当前购物车中没有商品')
      }
      else if(this.orderList == 0){
        alert('请点击商品前的选择框，选择要移除的商品')
      }else{
        this.deletePro()
      }
    },
    deletePro(){
      var self = this 
      let ids = ''
      self.orderList.forEach(element => {ids += element.id + ','});
      console.log('正在删除',ids)
        let param = 'userId='+sessionStorage.getItem('userId')+'&proId=' + ids
        axios.post('/cart/delete_from_cart',param
        ).then(function(ret){
          console.log(ret.data);
          if(ret.data.status == 0){
            alert('移除成功')
            self.$router.go(0)
          }else if(ret.data.status == 1){
            alert('移除失败')
          }                       
        }).catch(function(error){
            console.log(error);
        }) 
    }
  },
  store
};
</script>

<style scoped>
.go-to {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
