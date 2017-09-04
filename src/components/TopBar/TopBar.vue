<template>

  <div class="header">
    <div class="header2">
      <img class="logo" src="./img/logo.png">
      <ul class="nav_list">
        <li @click="go('/index/home')">
        雇主首页
        <span v-show="defaultIndexAction==1"></span>
        </li>
        <li @click="go('/index/projectlist')">
        项目中心
        <span v-show="defaultIndexAction==2"></span>
        </li>
        <li @click="go('/index/wallet')">
        钱包管理
        <span v-show="defaultIndexAction==3"></span>
        </li>
      </ul>

      <div>
        <el-badge :value="mainData.message" class="item">
          <img src="./img/message.png">
        </el-badge>
        
        <img src="./img/set.png">
        <img src="./img/why.png">
        <span class="line"></span>
        <span style="cursor:pointer">
        <i class="el-icon-arrow-left"></i>
        返回官网</span>
      </div>
    </div>
  </div>               
</template>

<script>
     
      export default {
        name:'topbar',
        components:{
        
        },
        data() {
          return {
            mainData:{}
          };
        },
        created(){
          this.getData()
        },
        computed: {
          defaultIndexAction(){
            return this.$store.getters.GetDefaultIndex
          }
        },
        methods: {
          go(path){
            this.$router.push({path})
          },
          getData(){
            let _this=this;
            this.$http('/guzhu/project/master_core').then(function(res){
              if(res.data.code==1000){
                _this.mainData=res.data.data
              }
              
            },function(err){
              console.log(err)
            })
          }
        },
        mounted(){
        }
    }
</script>
 
<style scoped>
  .header{flex: 0 0 95px;width: 100%;background:linear-gradient(to right, #ff9a4c , #ff7a59);height: 95px}
  .header2{display: flex;flex-direction: row;align-items: center;padding: 0px 20px;box-sizing: border-box;justify-content: space-between;width: 1280px;height: 95px;margin:0 auto;}
  .header2 .nav_list{display: flex;font-size: 16px;color: white;width: 330px;justify-content: space-between;}
  .header2 .nav_list li{position: relative;cursor: pointer;}
  .header2 .nav_list li span{position:absolute;width: 30px;height: 2px;background: white;left: 16px;top: 30px}
  .line{display: inline-block;width: 1px;height: 18px;background: white}
  .header2>div{width: 360px;color: white!important;display: flex;justify-content: space-between;align-items: center;}
  .header2>div img{width: 30px;cursor: pointer;}
</style>
<style>
  
</style>

