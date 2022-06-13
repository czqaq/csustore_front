<template>
  <div class="info-form">
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
        <FormItem label="用户名" prop="name">
            <i-input v-model="formValidate.name" clearable size="large" placeholder="请输入你的姓名"></i-input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
            <i-input v-model="formValidate.email" clearable size="large" placeholder="请输入你的邮箱"></i-input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <i-input type="password" v-model="formValidate.password" clearable size="large" placeholder="请输入你的密码"></i-input>
        </FormItem>
        <FormItem label="确认密码" prop="repassword">
            <i-input type="password" v-model="formValidate.repassword" clearable size="large" placeholder="请再次输入你的密码"></i-input>
        </FormItem>
        <FormItem label="找回问题" prop="question">
            <i-input v-model="formValidate.question" clearable size="large" placeholder="请输入你的找回问题"></i-input>
        </FormItem>
        <FormItem label="问题答案" prop="answer">
            <i-input v-model="formValidate.answer" clearable size="large" placeholder="请输入找回问题的答案"></i-input>
        </FormItem>
        <Button type="error" size="large" long @click="handleSubmit('formValidate')">注册</Button>
    </Form>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapMutations, mapActions } from 'vuex';
import axios from 'axios';
export default {
  name: 'InputInfo',
  created () {
    this.phone = this.$route.query.phone
  },
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formValidate.password) {
        callback(new Error('两次输入的密码不一样'));
      } else {
        callback();
      }
    };
    
    return {
      phone:'',
      formValidate: {
        name: '',
        email: '',
        password: '',
        repassword: '',
        question:'',
        answer:''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          //  
        ],
        repassword: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        question: [
          { required: true, message: '找回问题不能为空', trigger: 'blur' },
        ],
        answer: [
          { required: true, message: '找回问题的答案不能为空', trigger: 'blur' },
        ],
        
      }
    };
  },
  methods: {
    handleSubmit (name) { 
      var self = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log('调用注册')
          console.log(self.formValidate.name,self.formValidate.password,self.formValidate.email,self.phone,self.formValidate.question)
          axios.post('/user/register',{
          username:self.formValidate.name,
          password:self.formValidate.password,
          email:self.formValidate.email,
          phone:self.phone,
          question:self.formValidate.question,  
          answer:self.formValidate.answer,
          createTime:'',
          updateTime:''
        }).then(function(ret){
          console.log(ret.data);
          if(ret.data.status == 0){
            console.log('注册成功')
            self.$router.push({ path: '/SignUp/signUpDone' });
            //window.location.reload();
          }else if(ret.data.status == 1){
            let mes = ret.data.message
            alert(mes)
          }                       
        }).catch(function(error){
            console.log(error);
        })       
        } else {
          this.$Message.error('注册信息有误，请检查');
        }
      });
    }
  },
  store
};
</script>

<style scoped>
.info-form {
  width: 90% !important;
}
</style>
