<template>
  <div class="box">
    <!-- <div class="copyright">
        <p style="color:white">Copyright © 2022 by CZQ</p>
      </div> -->
    <footer class="footer">
      <div class ='empty'>
      </div>
      <div class="copyright">
        <p style="color:white">Copyright © 2022 by CZQ</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {

    };
  }
};
</script>

<style scoped>
/*****************************底 部 开 始*****************************/

.empty {
  width: 100%;
  height: 0vh;
  background-color: white;
  overflow: hidden;
}
.copyright {
  background:#2b88e4;
  line-height: 30px;
  text-align: center;
  font-size:15px;
  overflow: hidden;
}
/*****************************底 部 结 束*****************************/
</style>
