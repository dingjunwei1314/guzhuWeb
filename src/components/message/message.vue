<template>
  <div>
    <h1 class=' myProject'>全部消息</h1>
    <div class='listTitle'>
      <template>
        <el-checkbox v-model="allChecked" @change='allCheckedFun' class='myCheck'></el-checkbox>
      </template>
      <el-button class='begin1 myBtn margin-lf-10' @click="operate('del')">删除</el-button>
      <el-button class='begin1 myBtn margin-lf-5' @click='operate()'>标记已读</el-button>
    </div>
    <ul class='Mylist'>
        <li class='list-style-red-1 text-gray-6' v-for='(msg,index) in msgList' :key='index'>
        <div class='rt text-gray-9 h5' style='width:100px'>
          <p style='text-align:right'>{{msg.create_time[0]}}</p >
          <p style='text-align:right'>{{msg.create_time[1]}}</p >
        </div>
        <div class='rt' style='width:680px;cursor:pointer'  @click='getMsgDetail(msg.id,index)'>
          <p><b>{{msg.title}}</b></p>
          <p style='height:25px' class='myOverElli'>{{msg.content}}</p>
        </div>
        <div style='width:160px;' class='radingMsg'>
          <template>
            <el-checkbox v-model="msg.checked" @change='checkedFun' class='myCheck'></el-checkbox>
          </template>
          <u v-if='msg.status==1'></u>
          <u style='background:transparent' v-else></u>
          <img src="./img/1.jpg" alt="" style='width:38px;height:38px;margin-top:21px;vertical-align:top;border-radius:50%'>
          <span style='padding-left:5px'>云小助</span>
        </div>
      </li>
    </ul>
    <div style='text-align:center'>
        <el-pagination
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          @current-change='getData'
          :total="Math.ceil(count/limit)*10">
        </el-pagination>
    </div>
    <AlertDetailCmn :title="alert.title"  :isshow="alert.isshow" :AlertWidth='alert.width' :AlertHeight='alert.height' @close="close" >
      <div slot="alert_con"> 
        <div style='height:240px;padding:30px;box-sizing:border-box'>
          <p class='h4 text-gray-6' style='line-height:30px; text-indent:2em'><b>{{msgDetail.title}}</b>：{{msgDetail.content}}</p>
        </div>
        <div style='text-align:center'>
          <el-button type="primary" class="begin qianRuBtn"  @click.prevent='delMsgDetail(msgDetail.id,msgDetail.index)'>删除</el-button>
          <el-button type="primary" class="begin qianRuBtn" v-if="msgDetail.title=='新手单引导'"  @click.prevent=''>去抢单</el-button>
          <el-button type="primary" class="begin qianRuBtn" v-if="msgDetail.title=='认证提醒'"  @click.prevent=''>重新认证</el-button>
          <el-button type="primary" class="begin qianRuBtn" v-if="msgDetail.title=='项目开始提醒'"  @click.prevent='checkDetail(msgDetail.project_id)'>查看详情</el-button>
          <el-button type="primary" class="begin qianRuBtn" v-if="msgDetail.title=='项目结算提醒'"  @click.prevent='checkAccount(msgDetail.project_id)'>查看对账单</el-button>
        </div>
      </div>
    </AlertDetailCmn> 
  </div>
</template>

<script>
  import AlertDetailCmn from '../Common/AlertDetailCmn.vue'
  import {cloneDeep} from '../../common/cloneDeep'
  export default {
    name: 'checkAccount',
    components:{
      AlertDetailCmn
    },
    data () {
      return {
        images:['../static/banner1.png','../static/banner2.png','../static/banner3.png'],
        alert:{//弹出的确认框
          title:'云小助',
          isshow:false,
          width:'545',
          height:'390'
        },
        page:1,//页数
        limit:6,//每页的条数
        allChecked:false,//全选的复选框是否选中
        msgList:[],//后台请求返回的消息列表
        msgCheckList:[],//所有选中的列表
        currentPage:1,
        count:0,//消息的总条数
        msgDetail:{}//消息详情的参数

      }
    },
    created(){
      //初始化请求
      this.getData(1);
    
    },
    mounted:function(){
      document.getElementById('main_content').scrollTop=0;
      this.$store.dispatch('defaultIndexAction','/index/work');
    },
    computed:{
      refresh(){
        return this.$store.getters.GetRefresh
      }  
    },
    watch:{
      refresh:function(val){
        if(val){
          this.currentPage=1;
          this.page=1;
          this.getData()
        }
      }
    },
    methods:{
      getData(page){
        //请求消息列表的数据
       var  _this=this;
        this.$http('/message/list',{page:page,limit:this.limit}).then(function(res){
          var d=res.data;
          if(d.code==1000){
            _this.count=d.data.count;
            _this.msgList=d.data.list;
            for(var i=0;i<_this.msgList.length;i++){
              _this.msgList[i].checked=false;
              //把后台的时间变成日期+时间
              _this.msgList[i].create_time=_this.msgList[i].create_time.split(' ');
            }
            _this.msgList=cloneDeep(_this.msgList)
            _this.$store.dispatch('refreshAction',false);
            _this.$store.dispatch('loadingAction',false);
          }
        }).catch(function(err){
          console.log(err);
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        }) 
      },
      allCheckedFun(){
        for(var i=0;i<this.msgList.length;i++){
          if(this.allChecked==true){
            this.msgList[i].checked=true;
          }else{
            this.msgList[i].checked=false;
          }  
        }
      },
      checkedFun(index){
         for(var i=0;i<this.msgList.length;i++){
            if(this.msgList[i].checked==false){
              this.allChecked=false;
              return;              
            } 
          } 
        this.allChecked=true;
      },
      close(){
          this.alert.isshow=false
      },
      open(h,type) {
        this.$message({
          message: h,
          type: type
        });
      },
      operate(a){
        var delID=[],readID=[],delIndex=[],readIndex=[];
        for(var i=0;i<this.msgList.length;i++){
          if(this.msgList[i].checked==true){
            if(this.msgList[i].status==1){
              readID.push(this.msgList[i].id);
              readIndex.push(i);
            }
            delID.push(this.msgList[i].id);
            delIndex.push(i);
          } 
        }
        if(delID.length==0){
          //没有选中
          this.open("没有选择任何消息，请重新选择",'warning')
        }else if(a=='del'){
          //删除选中消息
          this.delMsg(delID,delIndex);
        }else{
          //标记已读
          this.toRead(readID,readIndex);
        }
      },
      delMsg(id,index){
        //id 为数组或数字
        var  _this=this;
        this.$http('/message/delete',{id:id}).then(function(res){
          var d=res.data;
          if(d.code==1000){
            //已删除
            _this.open("成功删除消息",'success');
            for(var i=index.length-1;i>=0;i--){
              _this.msgList.splice(index[i],1);
            }
            _this.$store.dispatch('refreshAction',false);
            _this.$store.dispatch('loadingAction',false);
          }
        }).catch(function(err){
          console.log(err);
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        }) 

      },
      toRead(id,index){
        //id 为数组或数字
        if(id.length==0){
          this.open("选择的消息均是已读，无需再设置",'warning');
          return;
        }
        var  _this=this;
        this.$http('/message/read',{id:id}).then(function(res){
          var d=res.data;
          if(d.code==1000){
            //已标记
            _this.open("成功设置消息为已读",'success');
            for(var j=0;j<_this.msgList.length;j++){
                _this.msgList[j].checked=false;
            }
            for( var i=index.length-1;i>=0;i--){
              _this.msgList[index[i]].status=2;
            }
            _this.$store.dispatch('refreshAction',false);
            _this.$store.dispatch('loadingAction',false);
          }
        }).catch(function(err){
          console.log(err);
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        }) 

      },
      delMsgDetail(id,index){
         var  _this=this;
        this.$http('/message/delete',{id:id}).then(function(res){
          var d=res.data;
          if(d.code==1000){
            //已删除
            _this.open("成功删除消息",'success');
            _this.msgList.splice(index,1);
            _this.alert.isshow=false;
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
        var  _this=this;
        this.$http('/message/show',{id:msgId}).then(function(res){
          var d=res.data;
          if(d.code==1000){
            _this.msgDetail=d.data;
            //标记为已读
            _this.msgList[index].status=2;
            _this.msgDetail.index=index;
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
        this.$router.push({path:'/index/checkAccount/'+id})
      },
      checkDetail(id){
        //跳转到查看对账
        console.log(id+'查看详情');
        this.$router.push({path:'/index/UndertakeProjectDetail',query:{project_id}})
      }
    }
  }
</script>
<style scoped>
  h1,h2,h3,h4,h5,h6,p{font-weight:normal;padding:0;margin:0}
  ul,li,tr,td,th{margin:0;padding:0}
  div{
    box-sizing:border-box;
  }
  .C-color{
      color:#fe9039;
  }
  .mag-btm-20{
    margin-bottom:20px;
  }
  .myProject{
    margin:25px 0 0 0;
    font-size:20px;
    color:#333;
  }
  .listTitle{
    height:70px;
    line-height:70px;
  }
  .Mylist{
    height:480px;
<<<<<<< .mine
    /*background:#eee;*/
||||||| .r123
    background:#eee;
=======
>>>>>>> .r125
    margin-bottom:10px;
  }
  .Mylist li{
    height:80px;
    box-sizing:border-box;
    line-height:80px;
    border-top:1px solid #EEEDED;
    font-size:14px;
    color:#666;
  }
  .Mylist li .rt{
    height:80px;
    padding:15px 0;
    line-height:25px;
    box-sizing:border-box;
    cursor:pointer;
  }
  .Mylist li .rt p,.Mylist li .rt b{
    cursor:pointer;
  }
  .Mylist li .rt b{
    font-weight:normal;
    color:#333;
  }
  .radingMsg .myOverElli{
    display:inline-block;
    width:65px;
    vertical-align:top;
  }
  .myCheck{
    width:23px;
  }
  .begin1{
  border-color: #feb339;
  color:#feb339;
  transition:all .2s linear;
  }
  .begin1:hover{
    border-color: #feb339;
    background-color:#feb339;
    color:#fff;
  } 
  .myBtn{
    width:76px;
    height:30px;
    line-height:30px;
    text-align:center;
    font-size:14px;
    padding:0;
  }
  .margin-rt-10{
    margin-right:10px;
  }
  .margin-lf-5{
    margin-left:5px;
  }
  .margin-lf-10{
    margin-left:10px;
  }
  .list-style-red-1 u{
  display:inline-block;margin-right:3px;background:#FB5E4B;width:6px;height:6px;border-radius:50%;position:relative;top:-1px;
}
  </style>

