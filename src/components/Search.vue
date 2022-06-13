<template>
  <div>
    <div class="container">
      <i-input v-model="searchData" size="large" class="search" placeholder="输入你想查找的商品">
        <Button slot="append" icon="ios-search" @click="search"></Button>
      </i-input>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Search',
  data () {
    return {
      searchData: '',
    };
  },
  methods: {
    closeTags (index) {
      this.promotionTags.splice(index, 1);
    },
    selectTags (index) {
      this.searchData = this.promotionTags[index];
    },
    search () {
      if(this.searchData .match(/^[ ]*$/)){
        alert('请输入搜索词')
      }else{
        this.$router.push({path: '/goodsList', query: { searchData: this.searchData }});
        if(this.$route.path != '/' && this.$route.path){
          //window.location.reload();
        }
      }
      
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 15px;
  margin: 0px auto;
  margin-bottom: 15px;
  width: 460px;
}
.search {
  margin: 5px 0px;
}
</style>
