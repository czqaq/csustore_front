<template>
    <div>
    <div class="add-container">
      <div class="add-title">
        <h1>修改个人信息</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" ref="formInline" label-position="left" :label-width="100" :rules="ruleInline" >
          <FormItem label="用户名" prop="userName">
            <i-input v-model="formData.userName" size="large"></i-input>
          </FormItem>
          <FormItem label="个人简介" prop="userIntro">
            <i-input v-model="formData.userIntro" size="large"></i-input>
          </FormItem>
          <FormItem label="所在校区" prop="place">
            <i-input v-model="formData.place" size="large"></i-input>
          </FormItem>
          <FormItem label="余额" prop="userBalance">
            <el-input
                v-model="formData.userBalance"
                :disabled="true">
            </el-input>
          </FormItem>
          <div class="add-submit">
            <Button type="primary" @click="update('formInline')">确认修改</Button>
          </div>
        </Form>
      </div>
      
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import axios from 'axios';
export default {
  name: 'UpdateInfo',
  data () {
    return {
      //商品描述信息
      formData: {
        userName: '',
        userIntro: '',
        place: '',
        userBalance:''
      },
      //输入规则
      ruleInline: {
        userName: [
          { required: true, message: '请输入修改信息', trigger: 'blur' }
        ],
        userIntro: [
          { required: true, message: '请输入修改信息', trigger: 'blur' }
        ],
        place: [
          { required: true, message: '请输入修改信息', trigger: 'blur' }
        ]

      },
    };
  },
  created(){
    this.getUserInfo()
  },
  methods: {
    getUserInfo(){
        axios.get('/SERVICE-USER/getUserInfo',{
        params:{
            userId:sessionStorage.getItem('userId')
        }
        }).then((ret) =>{
            console.log(ret.data)
            this.formData.userName = ret.data.userName
            this.formData.place = ret.data.place
            this.formData.userIntro = ret.data.userIntro
            this.formData.userBalance = ret.data.userBalance
        }).catch(function(error){
        console.log(error);
        })
    },
    update(ruleInline){
    var self = this 
    this.$refs[ruleInline].validate((valid) =>{
      if(valid){
        //axios.defaults.baseURL = 'http://42.193.246.152:9000'
        axios.post('/SERVICE-USER/updateUser',{
          userId:sessionStorage.getItem('userId'),
          userName:self.formData.userName,
          userIntro:self.formData.userIntro,
          place:self.formData.place,
        }).then(function(ret){
          console.log('返回数据： '+ret.data);
          if(ret.data == 200){
              alert('修改成功')
              self.$router.go(0)
          }else if(ret.data == 500){
            alert('修改失败，请检查修改内容')
          }                       
        }).catch(function(error){
              console.log(error);
        })                     
      }else{
          this.$Message.error('请填写正确的信息');
        }
    })
    }
  },
  components: {

  }
};
</script>

<style scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.add-container {
  margin: 15px auto;
  width: 60%;
  min-width: 600px;
}
.add-title {
  margin-bottom: 15px;
  text-align: center;
}
.add-submit {
  display: flex;
  justify-content: center;
}
</style>