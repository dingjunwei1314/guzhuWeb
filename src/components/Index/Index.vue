<template>
    <el-row style="height:100%;overflow:hidden" class="ui-sys-bar1">       
      <LeftNav></LeftNav>
      <el-col :span="20" class="right_content">
        <TopBar></TopBar>
        <div v-if="isshowfacerecognition" class="faceRecognition">
          <span class="close" @click="close">X</span>
          <div>
            <img :src="face_src" style="width:640px;height:480px;">
          </div>                                        
        </div>
        <div class="main_content" id="main_content" v-loading.body="loading">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
</template>
<script>
import TopBar from '../TopBar/TopBar'
import LeftNav from '../LeftNav/LeftNav'
import Bus from '../../main';
export default {
  data(){
    return {
      face_src:'',
      isshowfacerecognition:false,
    };
  },
  components:{
    TopBar,
    LeftNav
  },
  created(){
    //初始化请求
   
  },
  computed: {
    loading(){
      return this.$store.getters.GetLoading
    },    
  },
  methods: {
    close(){
      this.isshowfacerecognition=false
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowClose();
      }
    },
    showFaceRecognitionForm(){
      this.isshowfacerecognition=true;

      setTimeout(function(){
        if (typeof hostEditor != 'undefined')
        {
          hostEditor.openFaceRecognitionEmbedded();
        }
      },2000)
    },
    setImg(src){
      console.log(3)
      console.log(src);
      this.face_src=src;
    }
  },
  mounted(){
    var _this=this
    Bus.$on('openFaceRecognitionForm',function(){
      _this.showFaceRecognitionForm()
    });
    Bus.$on('changeFaceSrc',function(img_str){
      _this.setImg(img_str)  
    })
    //改变客户端的尺寸
   if (typeof hostEditor != 'undefined')
    {
      hostEditor.southTelWindowSetSize('1200','665');
    }
  }
}


</script>
 
<style scoped>
  .main_content{padding: 0px 30px;flex:1;overflow-x:hidden;overflow-y:auto;background:white;position: relative;}
  .main_content::-webkit-scrollbar-thumb{background: rgb(255,172,82);width: 3px}
  .main_content::-webkit-scrollbar-track{background: #ccc;width: 3px}
  .main_content::-webkit-scrollbar{width: 5px}
  .right_content{width:1000px;height:100%;background:#fefefe;border-left:1px solid #eee;display:flex;flex-direction:column;align-items:stretch;position:absolute;left: 200px;top: 0px}
  .faceRecognition{position: absolute;left: 0;right: 0;top: 0;bottom: 0;background: white;z-index: 99;text-align: center;}
  .faceRecognition img{width: 400px;margin-top: 100px;}
  /*.ui-sys-bar{
    -webkit-app-region: drag;
  }
  .ui-sys-bar1{
    -webkit-app-region: no-drag;
  }*/
  .close{width: 19px;height: 19px;border: 1px solid #ebecee;border-radius: 50%;text-align: center;line-height: 20px;font-size: 9px;color: #999;cursor: pointer;position: absolute;right: 30px;top: 30px;}
  .close:hover{color: white;border: 1px solid #ffac52;background: #ffac52}
</style>

