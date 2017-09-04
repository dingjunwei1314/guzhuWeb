<template>
    <el-row class="content">
      
        <TopBar></TopBar>
        <div style="flex:1;overflow-y:auto;background:#f3f3f3;height:100%;overflow-x:hidden" class="bea_scroll">
          <div style="width:1280px;margin:0 auto;height:100%">
            <router-view></router-view>
          </div>
        </div>
     
    </el-row>
</template>
<script>
import TopBar from '../TopBar/TopBar'
export default {
  data(){
    return {
     
    }
  },
  components:{
    TopBar
  },
  computed: {
    
  },
  methods: {
  }
}


</script>
 
<style scoped>
  .content{margin: 0 auto;background: white;height: 100%;overflow: hidden;display: flex;flex-direction: column;height: 100%}
  .bea_scroll::-webkit-scrollbar-thumb{background: rgb(255,172,82);width: 3px}
  .bea_scroll::-webkit-scrollbar-track{background: #ccc;width: 3px}
  .bea_scroll::-webkit-scrollbar{width: 3px}
</style>

