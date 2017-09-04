<template>
  <div style="border-bottom:1px solid #eee;flex:0 0 45px;position:relative;" class="main_header ui-sys-bar">
    <i class="iconfont icon-houtui2" @click="left()"></i>
    <i class="iconfont icon-qianjin3 ui-sys-bar1" @click="right()"></i>
    <i class="iconfont icon-refresh ui-sys-bar1" @click="refresh()"></i>
    <div style="float:right;" >
      <el-badge :value="3" :max="99" class='myBadge'>
        <el-popover
        class='myBadge'
          ref="popover4"
          placement="bottom"
          width="208"
          trigger="hover"
          >
          <div style=';width:228px;margin-left:-10px' >
            <ul class='radingMsg wenjuan' style='max-height:413px;'>
              <li class='list-style-red' v-for='(data,index) in dataList' :key='index' @click='getMsgDetail(data.id,index)'>
                <div class='nextTime'>{{data.time}}</div>
                <div class='text-gray-6 pointer' style='width:152px' >
                  <h1 class='h6'><span></span><b>{{data.title}}</b></h1>
                  <p style='padding-left:9px;' class='myOverElli'>{{data.content}}</p>
                </div>
                <div style='border-bottom:1px solid #EEEDED;margin-top:13px;margin-left:9px;margin-right:9px'></div>
              </li>
              <li v-if='dataList.length==0' style='text-align:center;margin-top:50px'>暂时没有未读消息</li>
            </ul>
            <p style='height:20px;line-height:20px;text-align:center;margin-top:10px'> <span @click="goMessage" class='text-gray-6'>查看全部消息</span></p>
          </div>
        </el-popover>
        <el-button v-popover:popover4 class="iconfont icon-lingdang myBtn"></el-button>
      </el-badge>
      <i class="iconfont icon-fankui ui-sys-bar1" @click="feedback()"></i>
      <i class="iconfont icon-zuixiaohua ui-sys-bar1" @click="small()"></i>
      <i class="iconfont icon-guanbi1 ui-sys-bar1" @click="close"></i>
    </div>
    <AlertDetailCmn :title="alert.title"  :isshow="alert.isshow" :AlertWidth='alert.width' :AlertHeight='alert.height' @close="closeAlert" >
      <div slot="alert_con"> 
        <div style='height:240px;padding:30px;box-sizing:border-box'>
          <p class='h4 text-gray-6' style='line-height:30px; text-indent:2em'><b>{{msgDetail.title}}</b>：{{msgDetail.content}}</p>
        </div>
        <div style='text-align:center'>
          <el-button type="primary" class="begin qianRuBtn"  @click.prevent='delMsgDetail(msgDetail.id)'>删除</el-button>
          <el-button type="primary" class="begin qianRuBtn" v-if="msgDetail.title=='新手单引导'"  @click.prevent=''>去抢单</el-button>
          <el-button type="primary" class="begin qianRuBtnP" v-if="msgDetail.title=='认证提醒'"  @click.prevent=''>重新认证</el-button>
          <el-button type="primary" class="begin qianRuBtnP" v-if="msgDetail.title=='项目开始提醒'"  @click.prevent='checkDetail(msgDetail.project_id)'>查看详情</el-button>
          <el-button type="primary" class="begin qianRuBtnP" v-if="msgDetail.title=='项目结算提醒'"  @click.prevent='checkAccount(msgDetail.project_id)'>查看对账单</el-button>
        </div>
      </div>
    </AlertDetailCmn> 
    <AlertDetailCmn :title="alert1.title"  :isshow="alert1.isshow" :AlertWidth='alert.width' :AlertHeight='alert.height' @close="closeAlert" >
      <div slot="alert_con"> 
        <div style='height:260px;padding:25px 95px;box-sizing:border-box;'>
          <p class='h3 text-gray-6' style='text-align:center'>我们会实时关注您的反馈，为您提供更好的服务</p>
        <textarea name="" id="" v-model='textarea' rows="10" class='textArea'>
        </textarea>
        </div>
        <div style='text-align:center'>
          <el-button type="primary" class="begin qianRuBtn"   @click.prevent='feedback_submit'>提交</el-button>
        </div>
      </div>
    </AlertDetailCmn> 
  </div>               
</template>

<script>
      import AlertDetailCmn from '../Common/AlertDetailCmn.vue'
      import {cloneDeep} from '../../common/cloneDeep'
      export default {
        name:'topbar',
        components:{
          AlertDetailCmn
        },
        data() {
          return {
            is:true,
            limit:3,//请求的条数
            page:1,//当前页数
            dataList:[],//未读消息列表
            alert:{
              title:'云小助',
              isshow:false,
              width:'545',
              height:'390'
            },
            alert1:{
              title:'意见反馈',
              isshow:false,
            },
            textarea:'',//反馈的内容
            msgDetail:{}//消息详情列表
          };
        },
        created(){
          //初始化请求
          this.getData();
        
        },
        computed: {

        },
        methods: {
          close(){
            if (typeof hostEditor != 'undefined')
            {
              hostEditor.southTelWindowClose();
            }
          },
          open(h,type) {
            this.$message({
              message: h,
              type: type
            });
          },
          feedback(){
            this.textarea='';
            this.alert1.isshow=true;
          },
          feedback_submit(){
            var _this=this;
            this.$http('/feedback/submit',{content:this.textarea}).then(function(res){
              var d=res.data;
              if(d.code==1000){
                //已提交反馈
                _this.open("提交成功",'success');
                _this.alert1.isshow=false;
              }
            }).catch(function(err){
              console.log(err);
            }) 
          },
          small(){
            if (typeof hostEditor != 'undefined')
            {
              hostEditor.southTelWindowMinimization();
            }
          },
          left(){
            this.$router.go(-1)
          },
          right(){
            this.$router.go(1)
          },
          refresh(){
            this.$store.dispatch('loadingAction',true);
            this.$store.dispatch('refreshAction',true);
          },
          delMsgDetail(id){
            var  _this=this;
            this.$http('/message/delete',{id:id}).then(function(res){
              var d=res.data;
              if(d.code==1000){
                //已删除
                _this.open("成功删除消息",'success');
                _this.alert.isshow=false;
              }
            }).catch(function(err){
              console.log(err);
            }) 
          },
          closeAlert(){
            this.alert.isshow=false;
            this.alert1.isshow=false;
          },
          getData(){
            var  _this=this;
            this.$http('/message/unread',{page:this.page,limit:this.limit}).then(function(res){
              var d=res.data;
              if(d.code==1000){
                _this.dataList=d.data.list;
                _this.$store.dispatch('refreshAction',false);
                _this.$store.dispatch('loadingAction',false);
              }
            }).catch(function(err){
              console.log(err);
              _this.$store.dispatch('refreshAction',false);
              _this.$store.dispatch('loadingAction',false);
            }) 
          },
          getMsgDetail(msgId,index){
            if(this.alert.isshow==true){
              return ;
            }
            var  _this=this;
            this.$http('/message/show',{id:msgId}).then(function(res){
              var d=res.data;
              if(d.code==1000){
                _this.msgDetail=d.data;
                _this.dataList.splice(index,1);
                _this.alert.isshow=true;
                _this.$store.dispatch('refreshAction',false);
                _this.$store.dispatch('loadingAction',false);
              }
            }).catch(function(err){
              console.log(err);
              _this.$store.dispatch('refreshAction',false);
              _this.$store.dispatch('loadingAction',false);
            }) 
          },
          checkAccount(id){
            //跳转到查看对账
            console.log(id+'查看对账');
            this.alert.isshow=false;
            this.$router.push({path:'/index/checkAccount/'+id})
          },
          checkDetail(id){
            //跳转到查看对账
            console.log(id+'查看详情');
            this.alert.isshow=false;
            this.$router.push({path:'/index/UndertakeProjectDetail',query:{project_id}})
          },
          goMessage(){
            this.$router.push({path:'/index/message'})
          }
        },
        mounted(){
        }
    }


</script>
 
<style scoped>
  .header{background: #20a0ff!important}
  .el-menu-item, .el-submenu__title{color: white!important}
  .main_header{padding: 15px 30px 0px}
  .main_header i{color: rgb(102,102,102)!important;margin-left: 10px;cursor: pointer;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
  }
  .main_header i:nth-child(1){margin-left: 0px}
  .el-menu img{width: 14px;position: relative;top: -1px;margin-right: 5px}
  .el-menu-item{color: #333333!important;border-radius: 5px;height: 35px!important;line-height: 35px!important}
  .el-menu-item.is-active{background: #ffa58c;color: white!important}
  .ui-sys-bar{
    -webkit-app-region: drag;
  }
  .ui-sys-bar1{
      -webkit-app-region: no-drag;
  }
  .icon-houtui2:hover,.icon-qianjin3:hover,.icon-refresh:hover,.icon-lingdang:hover,.icon-fankui:hover,.icon-zuixiaohua:hover{color: #fe9039!important}
  .icon-guanbi1:hover{color:#e7230b!important;}
  .myBadge{
    margin-top:-3px;
  }
  .myBadge .myBtn{
    border:1px solid #fff;
    padding:0;
  }
  .radingMsg li{
    padding:13px 10px 0 10px;
    cursor: pointer;
  }
  .radingMsg li:hover{
    background-color:#F3F3F3;
  }
  /* 距离现在时间的样式 */
  .radingMsg .nextTime{
    width:60px;height:36px;float:right;padding-bottom:10px;line-height:36px;color:#999;
  }
  .pointer h1,.pointer b,.pointer span,.pointer p{
    cursor:pointer;
  }
  /*反馈弹出框的样式*/
  .textArea{
    margin-top:17px;width:355px;color:#666;
  }
  .textArea:focus{
    border-color:#FE9039;
    outline-color:#fe9039;
  }
  /*滚动条的样式*/
  .wenjuan{
    overflow:auto;overflow-y:hidden;
  }
  .wenjuan:hover{
    overflow-y:visible;
  }
  ::-webkit-scrollbar  
  {  
      width: 5px;  
      height: 5px;   
  }  
    
  /*定义滚动条轨道 内阴影+圆角*/  
  ::-webkit-scrollbar-track  
  {  
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
      border-radius: 10px;  
  }  
    
  /*定义滑块 内阴影+圆角*/  
  ::-webkit-scrollbar-thumb  
  {  
      border-radius: 10px;  
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
      background-color:#fe9039;  
  }  
</style>
<style>
  
</style>

