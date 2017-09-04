<template>
         
    <el-col :span="4" style="width:200px;height:100%;padding:10px;position:relative;overflow:hidden;background:url(/static/img/indexLeft.png);background-size:100% 100%;">
      <div style="text-align:center;padding-top:35px;padding-bottom:30px;" @click="useFace">
        <img :src="data.icon" style="width:50px;height:50px;border-radius:100%;margin-bottom:10px;cursor:pointer">
        <p style="color:#fff;font-size:13px">{{data.name||data.mobile.replace(/(\d{3})\d{4}(\d{4})/g,'$1****$2')}}</p>
        <div style="text-align:center">
          <img style="width:15px" v-if="data.identify_verify==0||data.identify_verify==1||data.identify_verify==3" src="./img/rz.png" >
          <img style="width:15px" v-else="data.identify_verify==2" src="./img/rz_active.png" >
          <img src="./img/v5.png" height="13" width="17">
        </div>
      </div>
      <img src="/static/img/indexlogo.png" height="34" width="143" alt="" class="indexlogo">
      <el-menu :default-active="default_active" class="el-menu-vertical-demo" :router=is style="height:350px;overflow-x:hidden">
        <el-menu-item index="/index/home">
        <i class="iconfont icon-dianzan"></i>
        <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/index/business">
        <i class="iconfont icon-shouzhi"></i>
        <span class="qiangdan">抢单</span>
        </el-menu-item>
        <el-menu-item index="/index/work">
        <i class="iconfont icon-diannao"></i>
        <span>工作台</span>
        </el-menu-item>
        <el-menu-item index="/Monitor">
        <i class="iconfont icon-qianbao"></i>
        <span>监测</span>
        </el-menu-item>
        <el-menu-item index="/index/wallet">
        <i class="iconfont icon-qianbao"></i>
        <span>钱包</span>
        </el-menu-item>
        <div class="fengge"></div>
        

        <!-- <el-menu-item index="/index/TheLadder">
        <i class="iconfont icon-xueli"></i>
        <span>云梯</span>
        </el-menu-item>

        <el-menu-item index="/index/MyCollection">
        <i class="iconfont icon-xueli"></i>
        <span>我的收藏</span>
        </el-menu-item> -->

        <el-menu-item index="/index/ceshi">
        <i class="iconfont icon-xueli"></i>
        <span>测试</span>
        </el-menu-item>
      </el-menu>
    </el-col>
      
</template>

<script>
import Bus from '../../main';
export default {
    name:'leftnav',
    data() {
      return {
        is:true,
        data:{
          icon: "",
          mobile: "",
          name: "",
          identify_verify: "",  
          certify_verify:'',     
          level: "",  
        }
      };
    },
    created(){
      this.getData()
    },
    computed: {
      default_active(){
        return this.$store.getters.GetDefaultIndex
      }
    },
    methods: {
      useFace(){
        // Bus.$emit('openFaceRecognitionForm');
        this.$router.push({path:'/index/usercenter'}) 
      },
      getData(){
      var _this=this
      this.$http('/user/user/homepage').then(function(res){
        _this.data=res.data.data.info;
      },function(reject){
      
      })
    },
    },
    mounted(){
    }
}


</script>
 
<style scoped>
  .header{background: #20a0ff!important}
  .el-menu-item, .el-submenu__title{color: white!important}
  .el-menu img{width: 14px;position: relative;top: -1px;margin-right: 5px}
  .el-menu-item{color: rgba(255,255,255,.8)!important;border-radius: 5px;height: 35px!important;line-height: 35px!important;margin-top: 5px;}
  .el-menu-item.is-active{background: rgba(255,255,255,.3);color: white!important}
  .icon-shouzhi{font-size: 30px;margin-left: -10px}
  .qiangdan{position: absolute;}
  .fengge{width: 170px;height: 1px;background: #ffaf8c;margin: 22px 0 21px 0}
  /*.ui-sys-bar{
    -webkit-app-region: drag;
  }
  .ui-sys-bar1{
      -webkit-app-region: no-drag;
  }*/
  .el-menu-item:hover{background-color: rgba(255,255,255,.3)!important}
  .indexlogo{position: absolute;left: 29px;bottom: 20px;}
</style>

