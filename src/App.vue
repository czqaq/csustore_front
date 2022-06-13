<template>
  <div id="app">
    <!-- <el-container class="container">
      <el-header class="header"><Header/></el-header>
      <el-main><router-view/></el-main>
      <el-footer><Footer/></el-footer>
    </el-container> -->
      <Header/>
      <router-view :key="$router.currentRoute.fullPath"/>
      
    
  </div>
</template>

<script>
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Index from '@/components/Index'
import '@/assets/css/global.css'

export default {
  name: 'App',
  data () {
    return {
      excludeRoutes: ['HomeIndex', 'MyAddress', 'AddAddress', 'MyOrder', 'MyShoppingCart']
    };
  },
  mounted() {
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState() {
        sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  },
  components: {
    Header,
    Footer,
    Index
  }
};
</script>