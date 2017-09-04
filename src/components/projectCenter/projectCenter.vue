<template>
  <div class="projectCenter">
    <div class="leftBar">
      <el-menu  @select="select" :default-active="defaultActive" class="el-menu-vertical-demo">
        <el-menu-item index="/index/projectCenter/statistics"><i class="el-icon-menu"></i>统   计</el-menu-item>
        <el-menu-item index="/index/projectCenter/qualityTesting"><i class="el-icon-menu"></i>质   检</el-menu-item>
        <el-menu-item index="/index/projectCenter/hasCalled"><i class="el-icon-setting"></i>已呼叫</el-menu-item>
        <el-menu-item index="/index/projectCenter/noCall"><i class="el-icon-menu"></i>待呼叫</el-menu-item>
        <el-menu-item index="/index/projectCenter/settlement"><i class="el-icon-menu"></i>结   算</el-menu-item>
        <el-menu-item index="/index/projectCenter/briefIntroduction"><i class="el-icon-setting"></i>简   介</el-menu-item>
      </el-menu>
    </div>
    <div style="margin-left:190px">
      <router-view></router-view>
    </div>
  </div>               
</template>

<script>
     
      export default {
        name:'projectCenter',
        components:{
        
        },
        data() {
          return {
            mainData:{},
            index1:'',
            index2:'',
            index3:'',
            index4:'',
            index5:'',
            index6:'',
          };
        },
        created(){
          
        },
        computed: {
          defaultIndexAction(){
            return this.$store.getters.GetDefaultIndex
          },
          defaultActive(){
            return this.$store.getters.GetDefaultActive
          }
        },
        methods: {
          go(path){
            this.$router.push({path})
          },
          select(val){
            let _this=this
            this.$router.push({path:val,query:{project_id:_this.$route.query.project_id,project_status:_this.$route.query.project_status}})
          }
        },
        mounted(){
          this.$store.dispatch('defaultIndexAction','2');
        }
    }
</script>
 
<style scoped>
  .projectCenter{}
  .leftBar{position: fixed;width: 190px;top: 95px;bottom: 0px;background: #faf6f5;border-right: 1px solid #eee}
</style>
<style>
  .el-menu{background: transparent;}
  .el-menu-item, .el-submenu__title{margin-top: 25px;color: #ff8355;font-size: 16px;}
  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{background:linear-gradient(to right, #ff9a4c , #ff7a59);color: white }
</style>

