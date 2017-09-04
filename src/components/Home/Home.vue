<template>
  <div style="padding-top:30px;padding-bottom:20px">
    <template>
    <el-carousel :interval="4000" type="card" height="210px" indicator-position="none">
      <el-carousel-item  v-for="(item,index) in data.data.banner" :key="index" @click.native="enterBanner(item.real_uri)">
        <img :src="item.path" style="width:100%;height:100%" :title="item.title">
      </el-carousel-item>
    </el-carousel>
    </template>
    <div class="level">
      <p style="margin-top:15px">
        <span style="float:left">当前等级：</span>
        <span style="float:left;color:#fe9039">
        <template v-if="data.data.level.level==1">
          新手客服
        </template>
        <template v-else-if="data.data.level.level==2">
          普通客服
        </template>
        <template v-else-if="data.data.level.level==3">
          高级客服
        </template>
        <template v-else-if="data.data.level.level==4">
          金牌客服
        </template>
        </span>
        <el-progress :percentage="data.data.level.finish_count/6*100" :show-text="false" style="width:220px;float:left;margin-left:10px;margin-top:5px" v-if="data.data.level.level==1"></el-progress>
        <el-progress :percentage="data.data.level.finish_count/3*100" :show-text="false" style="width:220px;float:left;margin-left:10px;margin-top:5px" v-else></el-progress>
        <span style="position:relative;top:-2px" v-if="data.data.level.level==1">完成以下任务可升级为LV1云客</span>
        <span style="position:relative;top:-2px" v-else-if="data.data.level.level==2">完成以下任务可升级为高级客服</span>
        <span style="position:relative;top:-2px" v-else-if="data.data.level.level==3">完成以下任务可升级为金牌客服</span>
        <span style="position:relative;top:-2px" v-else-if="data.data.level.level==4">您已升至最高级别</span>
      </p>
      <p class="img_wap" style="text-align:center;" v-if="data.data.level.level!=1">
        <span>
        <div style="line-height:64px;text-align:center;color:#f1f1f1;font-size:12px;">实名认证</div>

        <img v-if="data.data.level.upgrade_condition.identify_verify=='0'" src="./img/level1.png" height="64" width="64" alt="">
        <img v-else="data.data.level.upgrade_condition.identify_verify=='1'" src="./img/level1_active.png" height="64" width="64" alt="">

        </span><i></i>

        <span>
        <div style="line-height:64px;text-align:center;color:#f1f1f1;font-size:12px;">学历认证</div>
        
        <img v-if="data.data.level.upgrade_condition.certify_verify=='0'" src="./img/level2.png" height="64" width="64" alt="">
        <img v-else="data.data.level.upgrade_condition.certify_verify=='1'" src="./img/level2_active.png" height="64" width="64" alt="">

        
        </span><i></i>

        <span>
        <div style="line-height:64px;text-align:center;color:#f1f1f1;font-size:12px;">打字测试</div>
        <img v-if="data.data.level.upgrade_condition.rapidtyping=='0'" src="./img/level3.png" height="64" width="64" alt="">
        <img v-else="data.data.level.upgrade_condition.rapidtyping=='1'" src="./img/level3_active.png" height="64" width="64" alt="">

        </span><i></i>

        <span>
        <div style=";text-align:center;color:#f1f1f1;font-size:12px;">
          <p style="margin-top:15px;">普通话</p>
          <p style="margin-top:0px">测试</p>
        </div>
        <img v-if="data.data.level.upgrade_condition.mandarin=='0'" src="./img/level4.png" height="64" width="64" alt="">
        <img v-else="data.data.level.upgrade_condition.mandarin=='1'" src="./img/level4_active.png" height="64" width="64" alt="">

        </span><i></i>

        <span>
          <div style=";text-align:center;color:#f1f1f1;font-size:12px;">
            <p style="margin-top:15px;">基础知识</p>
            <p style="margin-top:0px">培训考试</p>
          </div>
        <img v-if="data.data.level.upgrade_condition.exam=='0'" src="./img/level5.png" height="64" width="64" alt="">
        <img v-else="data.data.level.upgrade_condition.exam=='1'" src="./img/level5_active.png" height="64" width="64" alt="">
        
        </span><i></i>

        <span>
        <div style="line-height:64px;text-align:center;color:#f1f1f1;font-size:12px;">首单任务</div>
        <img v-if="data.data.level.upgrade_condition.novice_task=='0'" src="./img/level6.png" height="64" width="64" alt="">
        <img v-else="data.data.level.upgrade_condition.novice_task=='1'" src="./img/level6_active.png" height="64" width="64" alt="">

        </span>
      </p>
      <p class="img_wap clear" style="text-align:center;" v-else>
        <span class='span'>
          <img v-if="data.data.level.upgrade_condition.basic_knowledges==1" src="./img/level5_active.png" height="64" width="64" alt="" @click='toYKcollege'>
          <img v-else src="./img/level5.png" height="64" width="64" alt="">
          <h4 class='text-gray-6'>技能考核</h4>
          <h6 class='text-gray-9'>云客学院专业考试</h6>
        </span>
        <span class='span'>
          <img v-if="data.data.level.upgrade_condition.call_count==1" src="./img/level6_active.png" height="64" width="64" alt="" @click='toWork'>
          <img v-else src="./img/level6.png" height="64" width="64" alt="">
          <h4 class='text-gray-6'>接通电话数</h4>
          <h6 class='text-gray-9'>接通电话数>3000</h6>
        </span>
        <span class='span' style='width:34%' >
          <img v-if="data.data.level.upgrade_condition.quality_checking==1" src="./img/userGrade_3.png" height="64" width="64" alt="" @click='toWork'>
          <img v-else src="./img/userGrade_4.png" height="64" width="64" alt="">
          <h4 class='text-gray-6'>通话质量</h4>
          <h6 class='text-gray-9'>近30天通话大于3000，质检合格率>99%</h6>
        </span>
      </p>
    </div>
    <el-row style="height:330px;margin-top:20px;" :gutter="20">
      
      <el-col :span="12" style="height:100%;padding-left:10px;padding-right:0;padding-right:20px">
            <div style="background:white;height:422px;padding:10px 10px 0px">
              <p class="zhijian">
                <span>质检反馈</span>
              </p>
              <p class="zhijianTop">质检不合格可申诉 {{data.data.Feedback.nopass}} 个 <span>合格率：{{(data.data.Feedback.nopass/data.data.Feedback.total*100).toFixed(0)+'%'}}</span></p>
              <ul class="zhijianscroll">
                <li @click="show_right_mask(true,item.qc_id,item.project_id)" v-for="item in data.data.Feedback.data">
                  <i>{{item.time}}</i>
                  <i>{{item.standard}}</i>
                  <i>{{item.result}}</i>
                </li>
                <li v-if='data.data.Feedback.data.length<1'></li>
                <li v-if='data.data.Feedback.data.length<2'></li>
                <li v-if='data.data.Feedback.data.length<3'></li>
                <li v-if='data.data.Feedback.data.length<4'></li>
                <li v-if='data.data.Feedback.data.length<5'></li>                
                <li v-if='data.data.Feedback.data.length<6'></li>                
              </ul>
            </div>
      </el-col>
      <el-col :span="12" style="height:100%;padding-left:0px;height:432px;background:white;width:466px;">
        <div style="background:white;width:430px;height:422px;padding:10px 10px 0px">
          <h4 style="margin:20px 0 0 20px;color:#333333">预计收入</h4>
          <p class="shouru">
            <span>预计累计收入</span>
            <span>预计昨日收入</span>
            <span>预计本周收入</span>
          </p>
          <p class="shouru-con">
            <span><i>￥</i>{{data.data.Income.estimate_total}}<i>元</i></span>
            <span><i>￥</i>{{data.data.Income.estimate_yesterday}}<i>元</i></span>
            <span><i>￥</i>{{data.data.Income.estimate_week}}<i>元</i></span>
          </p>
          <div id="chat_me" style="background:white!important;height:250px;left:10px">
            
          </div>
        </div>        
      </el-col>
    </el-row>
    <el-row :gutter="20" style="background:white;margin-top:120px;padding:10px;margin-left:0px;margin-right:0px">
        <h4 style="margin:0px 0 0 10px;padding-top:10px">推荐项目</h4>
        <div class="tuijian">
          <span @click="enterProduct(item.id)" style="cursor:pointer" v-for="item in data.data.Featured_project">
            <img :src="item.img" height="141" width="205" alt="">
            <p style='text-align:center'>{{item.name}}</p>
          </span>
        </div>
    </el-row>
    <transition name="fade">
    <div class="right_mask" v-show="is_show_right_mask" @click.stop.prevent="show_right_mask(false)">
      <transition name="slide">
        <div class="right_mask_content" @click.stop="click_stop()" v-if="is_show_right_mask_content">
          <div class="header">
            质检详情
            <span class="icon" @click="show_right_mask(false)">
              <i class="iconfont icon-qianjin3" style="color:white"></i>
            </span>
          </div> 
          <div class="content">
            <audio id="my_audio" src=""></audio>
            <div class="audio" style="padding:10px 0px 10px 20px">
              <div style="float:left;cursor:pointer"  @click.stop="play($event)">
                <img id="play_icon" src="/static/img/v_pause.png" play="true" width="35">
              </div>
              <div style="float:left;margin-left:10px;">
                <div style="margin-top:-3px;font-size:14px;color:#666">
                  <span style="float:left;color:#666;font-size:14px;" id="show_states">加载中...</span>
                  
                  <span id="play_alltime" style="float:right">00:00</span>
                  <span style="float:right">/</span>
                  <span id="play_time" style="float:right">00:00</span>
                  
                  <div style="clear:both"></div>
                </div>
               
                <span id="progress" style="min-width: 300px;margin-top:10px">
                  <span id="progress-con"></span>
                  <span id="propress-ball"></span>
                </span>
               
              </div>
              <div style="clear:both"></div>
            </div>
             <!--个人信息-->
            <div style="border-top:1px solid #eee;padding-top:20px;padding-bottom:20px">
              <p style="line-height:24px;font-size14px;color:#333">
              <i class="iconfont icon-ionc--" style="color:#999"></i>
              个人信息
              </p>
              <el-row style="color:#777;margin-top:15px;margin-left:20px">
                <el-col :span="5">客户电话</el-col>
                <el-col :span="17" style="position:relative;left:-15px">：{{zj_data.record.phone}}</el-col>
              </el-row>
              <el-row style="color:#777;margin-top:15px;margin-left:20px">
                <el-col :span="5">通话结果</el-col>
                <el-col :span="17" style="position:relative;left:-15px">：{{zj_data.record.res}}</el-col>
              </el-row>  
              <el-row style="color:#777;margin-top:15px;margin-left:20px">
                <el-col :span="5">通话日期</el-col>
                <el-col :span="17" style="position:relative;left:-15px">：{{zj_data.record.time}}</el-col>
              </el-row>  
              <el-row style="color:#777;margin-top:15px;margin-left:20px">
                <el-col :span="5">通话时长</el-col>
                <el-col :span="17" style="position:relative;left:-15px">：{{zj_data.record.duration}}</el-col>
              </el-row>  
              <el-row style="color:#777;margin-top:15px;margin-left:20px">
                <el-col :span="5">工单备注</el-col>
                <el-col :span="17" style="position:relative;left:-15px">
                  ：{{zj_data.record.note}}
                </el-col>
              </el-row>            
            </div>
            <!--质检质疑-->
            <div style="border-top:1px solid #eee;padding-top:20px;padding-bottom:20px">
              <p style="line-height:24px;font-size14px;color:#333;padding-bottom:20px">
              <i class="iconfont icon-activity" style="color:#666;margin-right:2px"></i>
              质检疑义
              </p>
              <ul class="result">
                <li>
                  <div>
                    <p style="font-size:13px;">
                      <i class="iconfont icon-ionc--" style="color:#999;margin-left:-2px"></i>
                      您的质检结果为
                      <span style="color:#74cf9f" v-if="zj_data.list_qc.qc_res==1">合格</span>
                      <span style="color:#74cf9f" v-else>不合格</span>
                    </p>  
                    <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:100%">
                      不合格原因为：{{zj_data.list_qc.qc_note}}
                    </p>
                    <p>{{zj_data.list_qc.qc_time}}</p>
                  </div>
                </li>
                <li v-if="zj_data.list_appeal[0]">
                  <div>
                    <p style="font-size:13px;">
                      <i class="iconfont icon-ionc--" style="color:#999;margin-left:-2px"></i>
                      您发起来申诉
                    </p>  
                    <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:100%">申诉原因为：{{zj_data.list_appeal[0].reason}}</p>
                    <p>{{zj_data.list_appeal[0].time_create}}</p>
                  </div>
                </li>
                <li v-if="zj_data.list_appeal[0]&&zj_data.list_appeal[0].time_reply">
                  <div>
                    <p style="font-size:13px;">
                      <i class="iconfont icon-ionc--" style="color:#999;margin-left:-2px"></i>
                      管理员通过了您的申诉
                    </p>  
                    <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:100%">
                      您的申诉及管理员的意见已发送至雇主端，请耐心等待处理结果。
                    </p>
                    <p>{{zj_data.list_appeal[0].time_reply}}</p>
                  </div>
                </li>
                <li v-if="zj_data.list_appeal[1]">
                  <div>
                    <p style=";font-size:13px;">
                      <i class="iconfont icon-ionc--" style="color:#999;margin-left:-2px"></i>
                      雇主发起申诉
                    </p>  
                    <p>申诉原因为：{{zj_data.list_appeal[1].reason}}</p>
                    <p>{{zj_data.list_appeal[1].time_create}}</p>
                  </div>
                </li>
                <li v-if="zj_data.list_qc.update_time">
                  <div>
                    <p style=";font-size:13px;">
                      <i class="iconfont icon-ionc--" style="color:#999;margin-left:-2px"></i>
                       管理员通过了您的申诉
                    </p>  
                    <p v-if="zj_data.list_qc.qc_res==2">最终质检结果变更为：<span style="color:#74cf9f">合格</span>  </p>
                    <p v-if="zj_data.list_qc.qc_res==1">最终质检结果变更为：<span style="color:#74cf9f">合格</span>  </p>
                    <p>{{zj_data.list_qc.update_time}}</p>
                  </div>
                </li>
                
              </ul>
            </div>
 
            <div style="border-top:1px solid #eee;padding-top:20px">
              <p style="line-height:24px;font-size14px;color:#333;padding-bottom:20px;padding-left:20px">
              我要申诉(0/3)
              <el-tooltip content="请听完录音后在进行申诉，当月申 诉失败3次将不可再次发起申诉" placement="top">
                <img src="./img/wen.png" style="vertical-align:middle;cursor:pointer">
              </el-tooltip>
              </p>
              <el-input type="textarea" resize="none" placeholder="申诉原因，不得小于30字" v-model="introduce" :rows="rows" style="width:380px;display:block;margin:0 auto;margin-left:20px"></el-input>
              <el-button type="primary" class="next" style="margin-top:0px;margin-left:20px;margin-top:20px;" @click="updataAppeal">提交</el-button>

            </div>
          </div> 
        </div>
      </transition>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'home',
  components:{
  },
  data () {
    return {
      data:{
        data:{
          banner:[],
          level:{
            level:'',
            finish_count:'',
            upgrade_condition:
              {
              identify_verify:'0',   
              rapidtyping:'0',   
              mandarin:'0',   
              exam:'0',   
              novice_task:'0',   
             }
          },
          Featured_project:[],
          Feedback:{ 
            "total":'', 
            "nopass":'',  
            "data":[
            ]  
          },
          Income:{
            estimate_total:'',
            estimate_yesterday:'',
            estimate_week:'',
            rank:[],
          }
        }
      },
      option:{
        color: ['#ffac52'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top:'5%',
            containLabel: true
        },
        xAxis:[
            {
                show:true,
                position:{
                  top:30,
                },
                type : 'category',
                data : ["08-01", "08-02", "08-03", "08-04", "08-05", "08-06", "08-07"],
                axisTick: {
                    alignWithLabel: true
                },
                nameTextStyle:{
                  color:'#000',
                  fontSize:20
                },
                splitLine:{  
            　　　　show:false  
            　　}  
            }
        ],
        yAxis :[
            {
                type : 'value',
                splitLine:{  
                  show:false  
                }  
            }
        ],
        series : [
            {
                name:'收入',
                type:'bar',
                barWidth: '40%',
                data:["10", "20", "30", "40", "50", "60", "70"]
            },
        ],
        backgroundColor:["#fff"]
      },
      is_show_right_mask:false,
      is_show_right_mask_content:false,
      rows:2,
      introduce:'',
      zj_data:{},
      _project_id:'',
      _qc_id:''
    }
  },
  beforeCreate(){
  
  },
  created(){
    this.getData()
  },
  filters: {
    data:function (input){
      var d = new Date(input);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
      var hour = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      return year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    }
  },
  computed:{
    refresh(){
      return this.$store.getters.GetRefresh
    }  
  },
  watch:{
    refresh:function(val){
      if(val){
        this.getData()
      }
      
    }
  },
  mounted:function(){
    document.getElementById('main_content').scrollTop=0;
    this.$store.dispatch('defaultIndexAction','/index/home');
  },
  methods:{
    play(event){
      
      if(event.target.getAttribute('play')=='true'){
        my_audio.play()
      }else{
        my_audio.pause()
      }
    },
    getData(){
      var _this=this
      this.$http('/user/user/homepage').then(function(res){
        _this.data=res.data;
        console.log(_this.data)
        _this.option.xAxis[0].data=Object.keys(_this.data.data.Income.rank)
        if(_this.option.xAxis[0].data[_this.option.xAxis[0].data.length-1]){
          _this.option.xAxis[0].data[_this.option.xAxis[0].data.length-1]='昨天'
        }
        _this.option.series[0].data=Object.values(_this.data.data.Income.rank)
        _this.$echarts.init(document.getElementById('chat_me')).setOption(_this.option)
        _this.$store.dispatch('refreshAction',false);
        _this.$store.dispatch('loadingAction',false);
        
      },function(reject){
        _this.$store.dispatch('refreshAction',false);
        _this.$store.dispatch('loadingAction',false);
      })
    },
    enterBanner(url){
      console.log(url)
      this.$router.push({path:url})
    },
    enterProduct(project_id){
      this.$router.push({path:'/index/Details',query:{project_id}})
    },
    show_right_mask(swi,record_id,project_id){

      if(swi){
        var _this=this;
        this.introduce=''
        this._qc_id=record_id
        this._project_id=project_id
        this.$http('/project/qc_failure_detail',{record_id:record_id,project_id:project_id}).then(function(res){
          
          if(res.data.code==1000){
            _this.zj_data=res.data.data;
            _this.is_show_right_mask=true;
            _this.is_show_right_mask_content=true;
            setTimeout(function(){
              _this.init_player(_this.zj_data.record.record)  
            },1000)

          }
          
        },function(err){
          console.log(err)
        })

        
        
      }else{
        this.is_show_right_mask=false;
        this.is_show_right_mask_content=false;
      }
    },
    click_stop(){

    },
    updataAppeal(){
      let _this=this
      if(this.introduce.length<30){
        this.$message({
          message: '申诉原因不得小于30字符',
          type: 'warning'
        });
        return;
      }
      this.$http('/project/appeal',{record_id:_this._qc_id,project_id:_this._project_id,reason:_this.introduce}).then(function(res){
        if(res.data.code==1000){
          _this.$message({
            message: res.data.data,
            type: 'success'
          }); 
        }
      },function(err){
        console.log(err)
      })
    },
    init_player(src){
      let my_audio=document.getElementById('my_audio'),
        progress=document.getElementById("progress"),
        propress_ball=document.getElementById("propress-ball"),
        progress_con=document.getElementById("progress-con"),
        play_time_node=document.getElementById("play_time"),
        play_alltime_node=document.getElementById("play_alltime"),
        play_icon=document.getElementById("play_icon"),
        show_states=document.getElementById("show_states"),
        play_time,
        play_alltime;

      my_audio.setAttribute('src',src)
      progress.onmousedown=function(e){
        let ev=e||window.event;
        console.log(ev.pageX)
        my_audio.currentTime = (ev.pageX-850)/330*my_audio.duration;
      }
      propress_ball.onmousedown=function(e){
        let ev=e||window.event;
        my_audio.ontimeupdate=null;
        if(ev.preventDefault()){
          ev.preventDefault();
        }else{
          ev.returnValue = false;
        }
        document.onmousemove=function(e){
          let ev=e||window.event;
          let w_width=ev.pageX-850;
          if(w_width<0){
            w_width=0;
          }else if(w_width>progress.offsetWidth-propress_ball.offsetWidth){
            w_width=progress.offsetWidth-propress_ball.offsetWidth;
          }
          propress_ball.style.left=w_width+"px";
          progress_con.style.width=w_width+"px";
         
          my_audio.currentTime=w_width/330*my_audio.duration;
        

          if(ev.preventDefault()){
              ev.preventDefault();
          }else{
            ev.returnValue = false;
            return false;

          }
        }

        document.onmouseup=function(){
          my_audio.ontimeupdate=function(){
            play_time=my_audio.currentTime;
            play_alltime=my_audio.duration;
            play_time_node.innerHTML=changtime(play_time).toString();
            progress_con.style.width=play_time/play_alltime*330+'px';
           
            if(play_time/play_alltime*330-7<=0){
              propress_ball.style.left='0px';
            }else if(play_time/play_alltime*330-7>=315){
              propress_ball.style.left='315px';
            }else{
               propress_ball.style.left=play_time/play_alltime*330-7+'px';
            }
          }
          document.onmousemove=null;
        }
      }



      my_audio.onloadedmetadata=function(){
        show_states.innerHTML='录音播放'
        play_alltime_node.innerHTML=changtime(my_audio.duration)
      
        
      }

      my_audio.ontimeupdate=function(){
        play_time=my_audio.currentTime;
        play_alltime=my_audio.duration;
        play_time_node.innerHTML=changtime(play_time).toString();
        progress_con.style.width=play_time/play_alltime*330+'px';
       
        if(play_time/play_alltime*330-7<=0){
          propress_ball.style.left='0px';
        }else if(play_time/play_alltime*330-7>=315){
          propress_ball.style.left='315px';
        }else{
           propress_ball.style.left=play_time/play_alltime*330+'px';
        }
      } 
      
      my_audio.addEventListener('pause',function(){
        play_icon.setAttribute('play','true')
        play_icon.setAttribute('src','/static/img/v_pause.png')
      })

      my_audio.addEventListener('play',function(){
        play_icon.setAttribute('play','false')
        play_icon.setAttribute('src','/static/img/v_play.png')
      })

      my_audio.addEventListener('end',function(){
         play_icon.setAttribute('play','true')
         play_icon.setAttribute('src','/static/img/v_pause.png')
       })

      function changtime(atime){
        var a_min=parseInt(atime/60),
            a_min=a_min<10? '0'+a_min:a_min,
            a_sec_yu=atime%60;
        var a_sec=parseInt(a_sec_yu);
          a_sec=a_sec<10? '0'+a_sec:a_sec;
        return a_min+':'+a_sec;
      }
    },
    toYKcollege(){
      console.log('去云客学院');
    },
    toWork(){
      this.$router.push({path:'/index/work'});
    }
  }
}
</script>
<style scoped>
.el-table__body-wrapper{overflow-x: hidden!important}
.level{margin-top: 30px;background: white;height: 185px;padding: 20px;}
.level p:nth-of-type(1) span:nth-of-type(1){margin-left: 2px}
.level p:nth-of-type(1) span:nth-of-type(2){color: #ffac52}
.level p:nth-of-type(1) span:nth-of-type(3){color: #999;font-size: 14px;margin-left: 40px}
.level p:nth-of-type(2){margin:50px 0 0px 0px}
.level p:nth-of-type(2) i{display: inline-block;width: 100px;height: 1px;background: #fe9039;position: relative;top: -29px}
.level p:nth-of-type(2) img{margin-left: -5px}
.shouru{margin:37px 0 0 20px;font-size: 14px;color: #666666;}
.shouru span{margin-right: 56px}
.shouru-con{color: #fe9039;font-size: 20px;margin:16px 0 20px 20px;font-weight: 900}
.shouru-con i{ font-style:normal;font-size: 14px}
.shouru-con span{display: inline-block;width: 100px;}
.shouru-con span:nth-child(1){margin-left: -2px;}
.shouru-con span:nth-child(2){margin-left: 40px;}
.shouru-con span:nth-child(3){margin-left: 37px;}
.zhijian{margin: 21px 0 0 10px;color: #333333;font-weight: 600}
.zhijianTop span{margin-left: 130px}
.zhijianTop{margin:37px 0 0 10px;font-size: 14px;color: #666}
ul li{list-style: none;color: #b3b3b3;font-size: 14px}
li{height: 45px;border-bottom: 1px solid #f5f5f5;line-height: 48px;margin-left: 10px}
/*li:nth-last-child(1){border:0;}*/
li:nth-of-type(1){margin-top: 10px}
li i{font-style: normal}
li i:nth-of-type(2){margin-left: 54px}
li i:nth-of-type(3){margin-left: 51px}
li i:nth-of-type(4){margin-left: 30px}
li:nth-of-type(1) i:nth-of-type(4){color: #31c27c}
li:nth-of-type(2) i:nth-of-type(4){color:#ff6e57}
.tuijian{margin: 37px 0 0 10px}
.tuijian span{float: left;width:226px;position:relative;
  transition: all 2s linear;
  transition: all 2s linear;
  -moz-transition:all 2s linear; /* Firefox 4 */
  -webkit-transition: all 2s linear; /* Safari 和 Chrome */
  -o-transition: all 2s linear; /* Opera */
}
.tuijian span:nth-of-type(1){margin-left: 0}
.tuijian p{color: #666;font-size: 14px;margin-top: 19px;width:205px}
.tuijian span:hover{
  top:-5px;
}
/*.ui-sys-bar{
    -webkit-app-region: drag;
}
.ui-sys-bar1{
    -webkit-app-region: no-drag;
}*/
.img_wap span{display: inline-block;position: relative;width: 64px;height: 64px;margin-left: -5px;cursor: pointer;}
.img_wap span:hover div{display: block;}
.img_wap span:nth-child(1){margin-left: 0px!important}
.img_wap span div{position:absolute;left:0;top:0px;width:64px;height:64px;border-radius:100%;background:rgba(0,0,0,.5);z-index: 2;display: none;}
.img_wap span img{position: absolute;left: 0;top: 0;width: 64px;height: 64px;margin-left: 0px!important}
.img_wap span.span{width:32%;display:block;float:left;}
.img_wap span.span h4,.img_wap span.span h6{font-weight:normal;text-align:left;margin-left:80px;margin-top:5px;}
.img_wap span.span h4{margin-top:10px;}
.right_mask{position: fixed;left: 200px;right: 0;top: 60px;bottom: 0;z-index: 3;width: 1000px;overflow: hidden;}
.right_mask_content::-webkit-scrollbar-thumb{background: rgb(255,172,82);width: 3px}
.right_mask_content::-webkit-scrollbar-track{background: #ccc;width: 3px}
.right_mask_content::-webkit-scrollbar{width: 5px}
.right_mask_content{position: absolute;right: 0px;top: 0;bottom: 0;width: 440px;box-shadow: -2px -12px 15px #e1e1e1;background: white;z-index: 4;overflow-y: auto;overflow-x: hidden;}
.right_mask .header{height: 45px;line-height: 45px;color: #333;font-size: 16px;background-color: #eee;text-align: center;}
.right_mask .header .icon{width:25px;height:45px;background-color: #fe9039;position: absolute;left: 0px;top: 0;cursor: pointer;}
.right_mask .content{padding: 20px;}
.right_mask .result{padding-left: 20px}
.right_mask .result li{height: 80px;background: #f2f2f2;border-radius: 3px;margin: 0;margin-bottom: 10px;padding: 15px;color: #666}
.right_mask .result li p{line-height: 27px}
.slide-enter-active, .slide-leave-active {
  transition: right .3s ease
}
.slide-enter,.slide-leave-to{
  right:-440px; 
}
.slide-enter-to, .slide-leave{
  right:0px; 
}

.fade-leave-active {
  transition: opacity .5s
}
.fade-leave-to{
  opacity: 0
}
.el-button--primary:hover{background: #fea660;border-color: #fea660}
.el-button--primary:focus{background: #f0822a;border-color: #f0822a}
.zhijianscroll{height: 290px;overflow-y: auto;overflow-x: hidden;}
.zhijianscroll li{cursor: pointer;padding-left: 10px}
.zhijianscroll li:hover{background: #f2f2f2}
.zhijianscroll::-webkit-scrollbar-thumb{background: rgb(255,172,82);width: 3px}
.zhijianscroll::-webkit-scrollbar-track{background: #ccc;width: 3px}
.zhijianscroll::-webkit-scrollbar{width: 5px}

#propress-ball{width: 15px;height: 15px;background-color: #fe9039;border-radius: 100%;position: absolute;left: 0;top: -4px;cursor: pointer;}
#progress{float:left;width: 100%;height: 7px;background-color: #eee;position: relative;cursor: pointer;width: 330px}
#progress-con{height: 100%;background-color: #fe9039;float: left;width:0px}


</style>
<style type="text/css">
  .el-carousel__item--card{width: 75%;}
  .el-carousel__item{left: -120px;}
  .el-progress-bar__inner{background: #fe9039}
  .el-progress-bar__outer{height: 10px!important;}
  .el-tooltip__popper.is-dark{background: white;color: #666;box-shadow: 0px 0px 10px #ddd}
  .el-tooltip__popper[x-placement^=top] .popper__arrow::after{border-top-color:white;}
</style>