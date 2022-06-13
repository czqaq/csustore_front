<template>
  <div>
    <div class="product-box" v-for="(item, index) in mySaleList" :key="index">
      <div class="product-header">
        <span>{{item.title}}</span>
        <div class="product-action">
          <span @click="edit(index)"><Icon type="edit"></Icon> 修改</span>
          <span @click="del(index)"><Icon type="trash-a"></Icon> 删除</span>
        </div>
      </div>
      <div class="product-content">
        <p><span class="product-content-title">商品标题:</span> {{item.title}}</p>
        <p><span class="product-content-title">商品价格:</span> {{item.price}}</p>
        <p><span class="product-content-title">商品描述:</span> {{item.detail}}</p>
      </div>

    </div>
    <!-- 修改框 -->
    <Modal v-model="modal" width="530">
        <p slot="header">
          <Icon type="edit"></Icon>
          <span>修改商品信息</span>
        </p>
        <div>
            <Form :model="formData" ref="formInline" label-position="left" :label-width="100" :rules="ruleInline">
              <FormItem label="商品标题" prop="title">
                <i-input v-model="formData.title" size="large"></i-input>
              </FormItem>
              <FormItem label="商品价格" prop="price">
                <i-input v-model="formData.price" size="large"></i-input>
              </FormItem>
              <FormItem label="商品描述" prop="detail">
                <i-input v-model="formData.detail" size="large"></i-input>
              </FormItem>
            </Form>
        </div>
        <div slot="footer">
                <Button type="primary" size="large" long @click="editAction('formInline')">修改</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
export default {
  name: 'MyProduct',
  data () {
    return {
      modal: false,
      formData: { 
        title: '',
        price: '',
        detail: '',
      },
      ruleInline: {
        title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' }
        ],
        price: [
          { required: true,
							message: '必须为大于0的数字，最多2位小数且不能为空',
							pattern: /^[0-9]+(.[0-9]{1,2})?$/, 
							trigger: 'blur' },
        ],
        detail: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
      },
      mySaleList:[],
      index:'',
    };
  },
  created(){
    var that = this 
    let param = "sellerId=" + sessionStorage.getItem('userId')
    axios.post('/product/get_My_Sell',param
    ).then(function(ret){
        that.mySaleList = ret.data.data
      }).catch(function(error){
        console.log(error);
      })
  },
  methods: {
    edit (index) {
      this.modal = true;
      this.index = index;
    },
    editAction (ruleInline) {
      var self = this
      this.$refs[ruleInline].validate((valid) =>{
        if(valid){
        axios.post('/product/update_Product',{
            id:self.mySaleList[self.index].id,
            title:self.formData.title,
            detail:self.formData.detail,
            price:self.formData.price,           
        }).then(function(ret){
            console.log(ret.data);
            if(ret.data.status == 0){
              alert(ret.data.message)
              self.modal = false;
              self.$router.go(0)
            }else if(ret.data.status == 1){
              alert(ret.data.message)
            }                       
        }).catch(function(error){
            console.log(error);
        })      
        }else{
          this.$Message.error('请填写正确的修改信息');
        }
      })
    },
    deleteAction (index) {
      console.log('商品信息：',this.mySaleList[index])
      var self = this
      let param = "proId=" + self.mySaleList[index].id
      axios.post('/product/delete_Product',param
      ).then(function(ret){
            console.log(ret.data);
            if(ret.data.status == 0){
              self.$Message.success(ret.data.message); 
              self.$router.go(0)
            }else if(ret.data.status == 1){
              self.$Message.success(ret.data.message); 
            }                       
        }).catch(function(error){
            console.log(error);
        })   
    },
    del (index) {
      this.$Modal.confirm({
        title: '信息提醒',
        content: '你确定删除这件商品',
        onOk: () => {
          this.deleteAction(index)
        },
        onCancel: () => {
          this.$Message.info('取消删除');
        }
      });
    }
  },

  mounted(){
	if(window.name == ""){
      console.log("首次被加载");
      location.reload();
      window.name = "isRefresh"; 
    }else if(window.name == "isRefresh"){
      console.log("我的商品页面被刷新");
    }
  },
  components: {

  },
  store
};
</script>

<style scoped>
.product-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
}
.product-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}
.product-content {
  font-size: 14px;
}
.product-content-title {
  color: #999;
}
.product-action span{
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>
