<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>发布新商品</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" ref="formInline" label-position="left" :label-width="100" :rules="ruleInline" >
          <FormItem label="商品标题" prop="title">
            <i-input v-model="formData.title" size="large"></i-input>
          </FormItem>
          <FormItem label="商品价格" prop="price">
            <i-input v-model="formData.price" size="large"></i-input>
          </FormItem>
          <FormItem label="商品类型" prop="type">
            <el-select v-model="formData.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </FormItem>
          <FormItem label="商品描述" prop="detail">
            <i-input v-model="formData.detail" size="large"></i-input>
          </FormItem>


          <FormItem label="商品图片" prop="img">
          
          <el-upload
            class="upload-demo"
            ref="upload"
            action=" "
            :http-request="uploadImg"         
            :multiple="true"
            :limit="1"
            :auto-upload="false"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :on-success="uploadImgSuccess"
            :on-error="uploadImgError"
            :file-list="fileList"
            list-type="picture">
            <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
            <div slot="tip" class="el-upload__tip">只上传一张图片为JPG/PNG格式且不超过2MB，请上传图片后再发布新商品</div>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submit">
              上传商品图片
            </el-button>
          </el-upload>
          </FormItem>
          <div class="add-submit">
            <Button type="primary" @click="put('formInline')">发布新商品</Button>
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
  name: 'AddProduct',
  data () {
    return {
      //商品描述信息
      formData: {
        title: '',
        price: '',
        detail: '',
        type:'',
        imgUrl: '',
      },
      options:[{
        value:'电器',
        label:'电器'
        },{
        value:'文具',
        label:'文具'
        },{
        value:'水果',
        label:'水果'
        },{
        value:'其他',
        label:'其他'
        }
      ],
      value:'',
      //上传图片列表
      fileList: [],
      //输入规则
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
        type: [
          { required: true, message: '请选择商品类型', trigger: 'blur' }
        ]

      },
    };
  },
   
  methods: {
    handleChange(file,fileList){
      this.fileList = fileList
      //console.log('赋值',this.fileList)
      fileList.forEach(item =>{      
          //console.log('当前列表内文件名：'+item.name)
      })
      //console.log('新添加文件名：',file.name)
    },
    handleRemove(file,fileList){
      this.fileList = fileList
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    uploadImgSuccess(){
      alert('上传成功')
    },
    uploadImgError(){
      alert('上传失败')
    },
    uploadImg(file){
      console.log('整合文件列表')         
    },
    submit(){
      this.$refs.upload.submit();
      console.log("准备上传",this.fileList[0].raw)
      var self = this 
      const fileFormData = new FormData()
      let config = {
	        timeout: 30000,
	        headers: {
	          "Content-Type": "multipart/form-data",//设置headers
	        }
      }
      fileFormData.append('file',this.fileList[0].raw)
      axios.post('/file/upload_img',
                  fileFormData,
                  config
                  ).then(function(ret){
                    console.log("上传图片测试:", ret.data)
              if(ret.data.status == 0){
                  self.formData.imgUrl = ret.data.data
                  alert(ret.data.message)
              }else if(ret.data.status == 1){
                alert(ret.data.message)
              }                       
        }).catch(function(error){
              console.log(error);
        })   
    },
    put(ruleInline){
    var self = this 
    this.$refs[ruleInline].validate((valid) =>{
      if(valid){
        //axios.defaults.baseURL = 'http://42.193.246.152:9000'
        axios.post('/product/put_Product',{
          sellerId:sessionStorage.getItem('userId'),
          type:self.formData.type,
          title:self.formData.title,   
          price:self.formData.price,
          imgUrl:self.formData.imgUrl,
          detail:self.formData.detail,
          num:'1'
        }).then(function(ret){
          console.log('返回数据： '+ret.data.status);
          if(ret.data.status == 0){
              alert(ret.data.message)
              self.$router.go(0)
          }else if(ret.data.status == 1){
            alert(ret.data.message)
          }                       
        }).catch(function(error){
              console.log(error);
        })                     
      }else{
          this.$Message.error('请填写正确的信息');
        }
    })
    },
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
