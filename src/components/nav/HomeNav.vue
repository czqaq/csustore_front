<template>
  <div>
    <div class="nav-body">

      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item class="carousel-item" v-for="(item, index) in carouselList" :key="index">
          <img :src="item.imgUrl" @click="prodetail(item)"/>
        </el-carousel-item>
      </el-carousel>

    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import axios from 'axios';
export default {
  name: 'HomeNav',
  data () {
    return {
      carouselList:['','',''],
    };
  },
  created(){
    this.getCarouselList();
  },
  methods:{
    getCarouselList(){
      var self = this 
      axios.get('/product/index_Pro_List').then(function(ret){
          self.carouselList = ret.data.data
          self.carouselList.forEach(element => {
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
    prodetail(productInfo){
      let para=JSON.stringify(productInfo)
      sessionStorage.setItem('productInfo', JSON.stringify(productInfo));
      this.$router.push({path: '/goodsDetail', query: { productInfo: para}});
    },
  },
  store
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/* .carousel-item {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
} */
.carousel-item img{
  width: 100%;
  height: 100%;
}
/*大的导航信息，包含导航，幻灯片等*/
.nav-body {
  width: 1020px;
  height: 320px;
  margin: 0px auto;
}
/*导航内容*/
.nav-content {
  width: 1008px;
  margin-left: 15px;
  overflow: hidden;
  float: left;
}
/*导航图片*/
.nav-show-img {
  margin-top: 10px;
  float: left;
}
.nav-show-img:nth-child(2) {
  margin-left: 12px;
}
/*显示商品*/
.content {
  width: 100%;
}

</style>
