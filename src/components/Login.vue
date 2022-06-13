<template>
<!-- 登录页面 -->
  <div>
    <Row class="container">
      <i-col span="13" offset="2" class="login-img-box">
        <img src="static/img/sale.jpg" alt="">
        <!-- <img src="static/img/test/login-back.jpg" alt=""> -->
      </i-col>
      <i-col span="7" class="login-box">
        <div class="login-container">
          <div class="login-header">
            <p>欢迎登录</p>
          </div>
          <div class="form-box">
            <Form ref="formInline" :model="formDate" :rules="ruleInline">
              <FormItem prop="username">
                  <i-input type="text" v-model="formDate.username" clearable size="large" placeholder="用户名">
                      <Icon type="person" slot="prepend"></Icon>
                  </i-input>
              </FormItem>
              <FormItem prop="password">
                  <i-input type="password" v-model="formDate.password" clearable size="large" placeholder="密码">
                      <Icon type="ios-locked-outline" slot="prepend"> </Icon>
                  </i-input>
              </FormItem>
              <FormItem>
                  <Button type="error" size="large" @click="login('formInline')" long>登录</Button>
              </FormItem>
          </Form>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapMutations, mapActions } from 'vuex';
import axios from 'axios';
export default {
  name: 'Login',
  data () {
    return {
      formDate: {
        username: '',
        password: ''
      },
      ruleInline: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }, 
          { type: 'string', min: 3, message: '密码不能少于3位', trigger: 'blur' }
        ]
      }
    };
  },
  created(){

  },

  methods: {
    login(name){
      // console.log('当前请求地址1： ',axios.defaults.baseURL)
      var self = this
      this.$refs[name].validate((valid) => {
        if(valid){
          let param = "username="+self.formDate.username+"&password="+self.formDate.password
          axios.post('/user/login',param).then(function(ret){
          console.log(ret.data);
          if(ret.data.status == 0){
            console.log('登录成功')
            //用户信息放在session中
            console.log('截取返回信息'+ret.data.data.id)
            localStorage.setItem('loginUser',ret.data.data)
            localStorage.setItem('userId', ret.data.data.id);
            localStorage.setItem('userName', self.formDate.username);
            localStorage.setItem('isLogin', true);

            sessionStorage.setItem('loginUser',ret.data.data)
            sessionStorage.setItem('userId', ret.data.data.id);
            sessionStorage.setItem('userName', self.formDate.username);
            sessionStorage.setItem('isLogin', true);
            self.$Message.success('登录成功');
            self.$router.push('/');
            window.location.reload();
          }else if(ret.data.status == 1){
            alert('登录失败，请检查登录信息')
            console.log('失败')
          }                       
        }).catch(function(error){
            console.log(error);
        }) 
        }else{
          this.$Message.error('请填写正确的用户名或密码');
        }
      });       
    }
  },
  store
};
</script>

<style scoped>
.container {
  margin-top: 30px;
  height: 485px;
  background-color: #fff;
}
.login-img-box {
  height: 485px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-img-box>img {
  width: 68%;
}
.login-box {
  height: 485px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container {
  width: 80%;
  height: 280px;
  border: #ED3F14 solid 1px;
}
.login-header {
  height: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  letter-spacing: 5px;
  color: #fff;
  background-color: #ED3F14;
}
.form-box {
  width: 80%;
  margin: 30px auto;
}
</style>
