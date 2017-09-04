<template>
  <div>
    <el-button @click="click1">尺寸</el-button>
    <el-button @click="click2">位置</el-button>
    <el-button @click="click3">最大化</el-button>
    <el-button @click="click4">最小化</el-button>
    <el-button @click="click5">恢复正常化</el-button>
    <el-button @click="click6">关闭</el-button>
    <el-button @click="click7">可以放缩</el-button>
    <el-button @click="click77">不可以放缩</el-button>
    <el-button @click="click8">最小尺寸</el-button>
    <el-button @click="click9">边框颜色</el-button>
    <el-button @click="click14" style="margin-left:0px">阴影颜色</el-button>
    <el-button @click="click13">通过默认浏览器打开网址</el-button>
    
    <div style="margin-top:20px"></div>
    <el-button @click="click16">注册用户</el-button>
    <el-button @click="click17">移除注册用户</el-button>
    <el-button @click="click19">打电话</el-button>
    <el-button @click="click20">挂电话</el-button>
    <el-tag type="danger">{{state}}</el-tag>

    <div>
        <el-row style="width:600px;margin-top:40px;margin-bottom:60px">
          <el-col :span="4">
            <div style="text-align:center;line-height:35px">
              扬声器：
            </div>
            
          </el-col>
          <el-col :span="20">
            <el-slider @change="changeSpeaker" v-model="vol_value1"></el-slider>
          </el-col>
        </el-row>

        <el-row style="width:600px;margin-top:40px;margin-bottom:60px">
          <el-col :span="4">
            <div style="text-align:center;line-height:35px">
              麦克风：
            </div>
            
          </el-col>
          <el-col :span="20">
            <el-slider @change="changeMicrophone" v-model="vol_value2"></el-slider>
          </el-col>
        </el-row>
      </div>
    

    <div style="margin-top:20px"></div>
    <el-button @click="click15">打开谷歌调试器窗口</el-button>
    <div style="margin-top:20px"></div>
    <el-button @click="click22">使能屏幕截图功能</el-button>


    <div style="margin-top:20px;">
      <div style="min-height:200px">
        <img style="max-width:640px;display:block" :src="src"> 
      </div>
       
      <el-button @click="videotest(true)">打开视频测试</el-button>
      <el-button @click="videotest(false)">关闭视频测试</el-button>
      <el-button @click="change3(true)">加边框</el-button>
      <el-button @click="change3(false)">去边框</el-button>
      <el-button @click="change4">抓取</el-button>
      <!-- <div style="display:flex;align-item:center">
        <span style="line-height:36px;margin-right:20px">帧率</span>
        <el-slider style="width:200px" v-model="value1" :min="min" :max="max" @change="change"></el-slider>
      </div>

      <div style="display:flex;align-item:center">
        <span style="line-height:36px;margin-right:20px">尺寸</span>
        <el-slider style="width:200px" v-model="value2" :step="step" :min="min2" :max="max2" @change="change2"></el-slider>
      </div> -->
      <input ref='img_input1' style="display:none" type="file" id="file" accept="image/png,image/jpeg" @change="update1($event)"/>
      <input ref='img_input2' style="display:none" type="file" id="file" accept="image/png,image/jpeg" @change="update2($event)"/>
      <div style="margin-top:20px">
        <el-button @click="changeday1(true)">打开图片对比</el-button>
        <el-button @click="changeday1(false)">关闭图片对比</el-button>
      </div>
      
      <div style="margin-top:20px;padding:20px;border:1px dashed #eee" v-if="is_show_db">
        
        <el-row style="width:600px;margin-top:40px;margin-bottom:60px">
          <el-col :span="12">
            <div style="text-align:center">
              <el-button @click="choose1">第一张图片</el-button>
              <img style="width:250px;height:200px;margin-top:20px;" :src="db_src1">
            </div>
            
          </el-col>
          <el-col :span="12">
            <div style="text-align:center">
              <el-button @click="choose2">第二张图片</el-button>
              <img style="width:250px;height:200px;margin-top:20px" :src="db_src2">
            </div>
            
          </el-col>
        </el-row>
        <el-button @click="begin_contrast">开始对比</el-button>
        <p>相似度：{{ss}}%</p>
      </div>
      <div style="margin-top:20px;">
        <el-button @click="test_m">开启测试麦克风</el-button>
        <el-button @click="close_test_m">关闭测试麦克风</el-button>
        <el-row style="width:600px;margin-top:40px;margin-bottom:60px">
          <el-col :span="4">
            <div style="text-align:center;line-height:35px">
              麦克风：
            </div>
            
          </el-col>
          <el-col :span="20">
            <el-slider disabled="true" v-model="vol_value3"></el-slider>
          </el-col>
        </el-row>
      </div>
      <AlertDetail :title="alert.title" :isright="alert.isright" :btntext="alert.btntext" :isshow="alert.isshow" @close="close" @sure="sure">
      <div slot="alert_con">
        <el-row>
          <el-col :span="4">
            眼睛：
          </el-col>
          <el-col :span="20">
            {{eye}}
          </el-col>
        </el-row>  
        <el-row>
          <el-col :span="4">
            嘴巴：
          </el-col>
          <el-col :span="20">
            {{mouse}}
          </el-col>
        </el-row>
        <img style="width:200px;margin-top:20px"  :src="a_src">      
      </div>
    </AlertDetail> 
    </div>
  </div>
</template>
<script>
import AlertDetail from '../Common/AlertDetail.vue'
export default {
  name: 'hello',
  components:{
    AlertDetail
  },
  data () {
    return {
      eye:'睁开',
      mouse:'张开',
      state:'空闲',
      src:'/static/img/t.jpg',
      value1:5,
      min:1,
      max:10,
      value2:.5,
      min2:.1,
      max2:1,
      step:.1,
      alert:{
        title:'人脸测试结果',
        isright:true,
        isshow:false,
        btntext:'关闭'
      },
      a_src:'',
      db_src1:'/static/img/t.jpg',
      db_src2:'/static/img/t.jpg',
      db_send_src1:'',
      db_send_src2:'',
      is_show_db:false,
      ss:0,
      vol_value1:0,
      vol_value2:0,
      vol_value3:0
    }
  },
  mounted:function(){
    var that=this
    this.$store.dispatch('defaultIndexAction','/index/ceshi');
    setTimeout(function(){
      that.$store.dispatch('loadingAction',false);
    },1000)
    document.getElementById('main_content').scrollTop=0;
    //注册成功
    Bus.$on('southTelSoftphoneRegisterStatus',function(val){
      if(val=='0'){
        alert('注册成功')
        
        if (typeof hostEditor != 'undefined')
        {
          hostEditor.southTelSoftphoneRegisterStatusPushEnable('0');
        }
      }else{
        alert('注册失败')
      
        if (typeof hostEditor != 'undefined')
        {
          hostEditor.southTelSoftphoneRegisterStatusPushEnable('0');
        }
      }
    }); 

    Bus.$on('southTelSoftphoneCallingStatus',function(val){
    
      if(val=='0'){
        that.state='空闲'
      }else if(val=='1'){
        that.state='振铃'
      }else if(val=='2'){
        that.state='通话中'
      }
    });  

    //视频测试
    Bus.$on('southTelVideoCaptureEnable',function(val){
      that.src=val
    });

    //人脸测试

    Bus.$on('southTelFaceDetectedRealPersonStatusPush',function(val){
      that.alert.isshow=true
      console.log(val)
      let [a,b]=val;
      console.log(a)
      console.log(b)
      if(a=='1'){
        that.eye='睁开'
      }else{
        that.eye='闭合'
      }
      if(b=='1'){
        that.mouse='张开'
      }else{
        that.mouse='闭合'
      }

      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelFaceDetectResultPushEnable('0');
        hostEditor.southTelVideoCaptureEnable('0');
      }
    
    });
    //图像对比

    Bus.$on('southTelFaceDetectedFaceComparePossibility',function(val){
      console.log(val)
      that.ss=val
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelFaceDetectCompareResultPushEnable('0');
      }
    })
    //测试音量

    Bus.$on('southTelAudioVolumePush',function(val){
      console.log(val)

      that.vol_value1=Number(val.slice(0,val.indexOf('/')))
      that.vol_value2=Number(val.slice(val.indexOf('/')+1))
      console.log(that.vol_value1)
      console.log(that.vol_value2)
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelSoftphoneAudioCurrentVolumePushTimer('0');
      }
    })
    //

    Bus.$on('southTelAudioMicrophoneTestValuePush',function(val){
      console.log(val)
      that.vol_value3=Number(val)
    })
  },
  methods:{
    test_m(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelAudioMicrophoneTestEnable('1');
      }
    },
    close_test_m(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelAudioMicrophoneTestEnable('0');
      }
    },
    changeSpeaker(val){
      console.log(val.toString())
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelSoftphoneAudioSetSpeakerVolume(val.toString());
      }
    },
    changeMicrophone(val){
      console.log(val.toString())
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelSoftphoneAudioSetMicrophoneVolume(val.toString());
      }
    },
    // begin_test_v(){
    //   if (typeof hostEditor != 'undefined')
    //   {
    //     hostEditor.southTelSoftphoneAudioGetVolume('1');
    //   }
    // },
    begin_contrast(){
      let _this=this
      if(this.db_src1=='/static/img/t.jpg'){
        return;
      }
      if(this.db_src2=='/static/img/t.jpg'){
        return;
      }
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelFaceDetectFaceCompare(_this.db_send_src1,_this.db_send_src2);
      }
    },
    choose1(){
      this.$refs.img_input1.click()
    },
    choose2(){
      this.$refs.img_input2.click()
    },
    update1(event){
      console.log(event.target.files)
      var that=this
      var file=event.target.files;
      if (file.length != 0) {
          
          var reader = new FileReader();
          if (!reader) {
              console.log('不支持fileReader')
          }
          reader.readAsDataURL(file[0]);
          reader.onload = function(e) {
            that.db_src1=e.target.result
            that.db_send_src1=e.target.result.replace(/data:image\/[a-z]*;base64,/,'');
          };
          
      }
    },
    update2(event){
      console.log(event.target.files)
      var that=this
      var file=event.target.files;
      if (file.length != 0) {
          var reader = new FileReader();
          if (!reader) {
              console.log('不支持fileReader')
          }
          reader.readAsDataURL(file[0]);
          reader.onload = function(e) {
            that.db_src2=e.target.result
            that.db_send_src2=e.target.result.replace(/data:image\/[a-z]*;base64,/,'');
          };
          
      }
    },
    changeday1(is){
      this.is_show_db=is
      if(!is){
        this.db_src1='/static/img/t.jpg';
        this.db_src2='/static/img/t.jpg';
        this.db_send_src1='';
        this.db_send_src2='';
        this.ss=0
      }
    },
    close(){
      this.alert.isshow=false
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelVideoCaptureEnable('1');
      }
    },
    sure(){
      this.alert.isshow=false
      if (typeof hostEditor != 'undefined')
      {
        
        hostEditor.southTelVideoCaptureEnable('1');
      }
    },
    change(val){
     
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelVideoCaptureSetFrameRate(val.toString());
      }
    },
    change2(val){
     
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelVideoCaptureSetImageScale(val.toString());
      }
    },
    change3(swi){
      if(swi){
        if (typeof hostEditor != 'undefined')
        {
          hostEditor.southTelVideoCaptureSetRoundMaskEnable('1');
        }
      }else{
        if (typeof hostEditor != 'undefined')
        {
          hostEditor.southTelVideoCaptureSetRoundMaskEnable('0');
        }
      }
      
    },
    change4(){
      this.a_src=this.src;
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelFaceDetectIfRealPerson(this.a_src);
      }

      
    },
    videotest(swi){
      if(swi){
        if (typeof hostEditor != 'undefined')
        {
          hostEditor.southTelVideoCaptureEnable('1');
        }
      }else{
        if (typeof hostEditor != 'undefined')
        {
          hostEditor.southTelVideoCaptureEnable('0');
        }
        this.src="/static/img/t.jpg"
      }
      
    },
    click1(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowSetSize('1300','400');
      }
    },
    click2(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowSetLocation('0','0');
      }
    },
    click3(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowMaximization();
      }
    },
    click4(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowMinimization();
      }
    },
    click5(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowRestore();
      }
    },
    click6(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowClose();
      }
    },
    click7(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowIfCanResize('1');
      }
    },
    click77(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowIfCanResize('0');
      }
    },
    click8(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowMinimumSize('400','200');
      }
    },
    click9(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowBorderColor('255','0','0');
      }
    },
    click10(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowBorderWidth('10');
      }
    },
    click11(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowShadowColor('0','0','255');
      }
    },
  
    click13(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowOpenUrlUsingDefaultExplorer('https://www.baidu.com/');
      }
    },
    click14(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowShadowColor('0','255','0');
      }
    },
  
    click15(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelExplorerOpenDebugWindow();
      }
    },
    click16(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelSoftphoneRegister('80000002','f6aea2f86018054bace3696d9fbde0be','47.93.126.111','6677');
      }
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelSoftphoneRegisterStatusPushEnable('1');
      }
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelSoftphoneCallingStatusPushEnable('1');
      }


      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelSoftphoneAudioGetVolume('1');
      }

    },
    click17(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelSoftphoneUnregister();
      }
      alert('移除成功')
    },
    click19(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelSoftphoneMakeCall('17839359913');
      }
    },
    click20(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelSoftphoneReleaseCall();
      }
    },
    click21(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelSoftphoneCallingStatusPushEnable('1');
      }
    },
    click22(){
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelScreenCaptureActive();
      }
    },

  },
  computed:{
    refresh(){
      return this.$store.getters.GetRefresh
    }
  },
  watch:{
    refresh:function(val){
      if(val){
        var that=this
        setTimeout(function(){
          that.$store.dispatch('refreshAction',false);
          that.$store.dispatch('loadingAction',false);
        },1000)
      }
      
    }
  },
}
</script>
<style scoped>

</style>
