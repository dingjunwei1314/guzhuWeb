<template>
  <div>
    <!-- <h1>工作台</h1>   -->
    <div class='clear'>
      <h3 class=' myProject'>我的项目</h3>
      <p class='myTotle'>您共记承接了{{count}}个项目</p>
    </div>
    <ul class='ul-1'>
      <li v-for="(data,index) in dataList" :key="index">
        <h1 class='h2 text-gray-6' ><span class='cursor-pointer' @click='intoDetail(data.id)'>{{data.name}}</span>
          <el-tooltip class="item"  effect="light" :content="data.authen_note" placement="bottom-start">
            <i class='h4 little_logo'>{{data.authen_type}}</i>
          </el-tooltip>
           <i class='h4 little_logo1'>{{data.project_type}}</i>
        </h1>
        <ul class='ul-2'>
          <li style='width:179px'>
            <img src="./img/date.jpg" class='lf' alt="">
            <h4 class='h4 lf'><p>截止日期</p><p>{{data.end_time.split(" ")[0]}}</p></h4>
          </li>
           <li style='width:189px'>
            <img src="./img/time.jpg" class='lf' alt="">
            <h4 class='h4 lf'>
            <p v-if="weekDayList[index].length==Math.max(...weekDayList[index])-Math.min(...weekDayList[index])+1&&weekDayList[index].length!=1">
            周
            <span v-if="Math.min(...weekDayList[index])==1">一</span>
            <span v-else-if="Math.min(...weekDayList[index])==2">二</span>
            <span v-else-if="Math.min(...weekDayList[index])==3">三</span>
            <span v-else-if="Math.min(...weekDayList[index])==4">四</span>
            <span v-else-if="Math.min(...weekDayList[index])==5">五</span>
            <span v-else="Math.min(...weekDayList[index])==6">六</span>
            至 周
            <span v-if="Math.max(...weekDayList[index])==2">二</span>
            <span v-else-if="Math.max(...weekDayList[index])==3">三</span>
            <span v-else-if="Math.max(...weekDayList[index])==4">四</span>
            <span v-else-if="Math.max(...weekDayList[index])==5">五</span>
            <span v-else-if="Math.max(...weekDayList[index])==6">六</span>
            <span v-else="Math.max(...weekDayList[index])==7">日</span>  

            </p>
            <p v-else>
              周
              <span v-if="weekDayList[index].indexOf('1')!=-1">一</span>
              <span v-if="weekDayList[index].indexOf('2')!=-1">二</span>
              <span v-if="weekDayList[index].indexOf('3')!=-1">三</span>
              <span v-if="weekDayList[index].indexOf('4')!=-1">四</span>
              <span v-if="weekDayList[index].indexOf('5')!=-1">五</span>
              <span v-if="weekDayList[index].indexOf('6')!=-1">六</span>
              <span v-if="weekDayList[index].indexOf('7')!=-1">日</span>
            </p>
              <p>{{data.work_time}}</p>
            </h4>
          </li>
          <li style='width:207px'>
            <div  class="myProgress-bar">
              <el-progress  :stroke-width="12" :percentage="parseFloat(data.process_rate)"></el-progress>
            </div>
          </li>
          <li style='width:220px'  v-if='data.handler==1||data.handler==2'>
            <h4 class='h4 text-center' style='margin-top:9px;'>正在进行</h4>
          </li>
          <li style='width:220px' v-if='data.handler==3'>
            <h4 class='h4 text-center'>已退出</h4>
            <h4 class='h4 text-center'>等待项目结束</h4>
          </li>
          <li style='width:220px' v-if='data.handler==4'>
            <h4 class='h4 text-center' style='margin-top:9px;'>已结算</h4>
          </li>
           <li style='width:220px' v-if='data.handler==5'>
            <h4 class='h4 text-center' style='margin-top:9px;'>被移除</h4>
          </li>
           <li style='width:220px' v-if='data.handler==6'>
            <h4 class='h4 text-center'>项目结束</h4>
            <h4 class='h4 text-center'>预计结算周期为x天</h4>
          </li>
          <li style='width:100px'  v-if='data.handler==1&&data.clickable==1'>
            <el-button type="primary" class="begin" style="float:right;width:116px" :data-id="data.id" @click='qianru(data.id)'>立即签入</el-button>
          </li>
           <li style='width:100px'  v-if='data.handler==1&&data.clickable==0'>
            <el-button type="primary" class="begin" style="float:right;width:116px" :data-id="data.id" :disabled='true'>立即签入</el-button>
          </li>
          <li style='width:100px'  v-if='data.handler==2'>
            <el-button type="primary" class="begin" style="float:right;width:116px" :data-id="data.id" @click='orderCallBack(data.id)'>预约回拨({{data.callback_count}})</el-button>
          </li>
          <li style='width:100px'  v-if='data.handler==3'>
            <el-button type="primary" class="begin" style="float:right;width:116px" :data-id="data.id"  @click='intoDetail(data.id)'>再次承接</el-button>
          </li>
          <li style='width:100px'  v-if='data.handler==4'>
            <el-button type="primary" class="begin" style="float:right;width:116px" :data-id="data.id" @click='checkAccount(data.id)'>查看对账</el-button>
          </li>
          <li style='width:100px'  v-if='data.handler==5'>
            <el-button type="primary" class="begin" style="float:right;width:116px" :data-id="data.id" :disabled='true'>等待项目结束</el-button>
          </li>
          <li style='width:100px'  v-if='data.handler==6'>
            <el-button type="primary" class="begin" style="float:right;width:116px" :data-id="data.id" :disabled='true'>等待结算</el-button>
          </li>
        </ul>
      </li>
    </ul>
    <div class='text-center'>
      <el-button class='begin1'  v-if='hasMore' style="margin-top:20px;margin-bottom:40px" @click='getList()'>查看更多</el-button>
      <el-button   v-if='!hasMore' style="margin-top:20px;margin-bottom:40px" :disabled='true'>没有更多加载了</el-button>
    </div>
    <AlertDetailCmn :title="alert2.title"  :isshow="alert2.isshow" :AlertWidth='alert2.width' :AlertHeight='alert2.height' @close="close2" >
      <div slot="alert_con">
        <div  v-if='subPage==1||subPage==0'>
          <div class='mgBtm-10 bea_scroll content'   v-html="data.speechcraft_content||data.common_problem" >
            <h1 class='h4'>&lt;开始电话&gt;:</h1>
            <p>1.1:您好，长安福特客户关系中心，工号穆克xfbhdxfbhxdf</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫中心大街通过短信个老师</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫毛膏拉萨市是两个老师</p>
            <h1 class='h4'>&lt;开始任务&gt;:</h1>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫消费你写的是两个老师</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫毛膏拉萨市是两个老师</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫奋斗几年的发现回复不等人团吧是两个老师</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫毛膏拉老师</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫毛膏拉萨市是两个老师</p>
            <h1 class='h4'>&lt;开始电话&gt;:</h1>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉人数大概市是两个老师</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫毛膏拉萨市是两个老师</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫毛膏拉萨市是两个老师</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫市是两个老师</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫毛膏拉萨市是两个老师</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫老师</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫毛膏拉萨市是两个老师</p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫毛膏拉萨/p>
            <p>1.1:您好，长安福特客户关系中心，工号穆克拉睫毛膏拉萨市是两个老师</p>
          </div>
          <div style='text-align:center'>
            <el-button type="primary" class="begin qianRuBtn" @click.prevent='getNext()'>下一步</el-button>
          </div>
        </div>
        <div  v-if='subPage==2'>
          <div class='mgBtm-10 bea_scroll content'   v-html="data.description" >
            
          </div>
          <div style='text-align:center'>
            <el-button type="primary" class="begin qianRuBtn" @click.prevent='getNext()'>下一步</el-button>
          </div>
        </div>
        <div  v-if='subPage==3'>
          <div class='mgBtm-10 bea_scroll content'   v-html="data.audio" >
          </div>
           <div style='text-align:center'>
            <el-button type="primary" class="begin qianRuBtn" @click.prevent='getNext()'>下一步</el-button>
          </div> 
        </div>
        <div  v-if='subPage==4'>
           <div class='mgBtm-10 bea_scroll content'   v-html="data.video" >
          </div>
          <div style='text-align:center'>
            <el-button type="primary" class="begin qianRuBtn" @click.prevent='getNext()'>下一步</el-button>
          </div>
        </div>
        <div  v-if='subPage==5'>
          <div class='mgBtm-10 bea_scroll content' v-if='subPage==5'>
            <ul>
              <li v-for="(exam,index) in data.exam.list" :key="index">
                <p>{{exam.q_title}}
                  <span style='color:#fe5e4b' v-if="exam.showSolution">正确答案为{{solution[index]}}</span>
                </p>
                <p style='padding-left:15px'>
                  <template v-if='exam.q_type==100'>
                    <el-radio class="radio"  v-for='(answer,index1) in exam.answer_list' :key='index1' v-model="radio[index]" :label="index1">{{answer.title}}</el-radio>
                  </template>
                  <template v-else>
                    <el-checkbox-group v-model="radio[index]">
                      <el-checkbox v-for='(answer,index1) in exam.answer_list' :key='index1' :label="answer.title" class='checkBox'></el-checkbox>
                    </el-checkbox-group>
                  </template>
                </p>
              </li>
            </ul>
          </div>
          <div style='text-align:center'  v-show='subPage==5'>
            <el-button class='begin1 qianRuBtnP ' @click='getPrev()'>再复习一下</el-button>
            <el-button type="primary" class="begin qianRuBtn"  @click='submitCeshi()'>提交</el-button>
          </div>
        </div>
      </div>
    </AlertDetailCmn> 

     <Alert  :title="alert.title" :isright="alert.isright" :message="alert.message" :isshow="alert.isshow" :btntext="alert.btntext"  @close="close" @sure="sure"></Alert>

    <AlertDetailCmn :title="alert3.title"  :isshow="alert3.isshow" :AlertWidth='alert2.width' :AlertHeight='alert2.height' @close="close3" >
      <div slot="alert_con"> 
        <div   v-if='subPage==6'>
          <div class='mgBtm-10 bea_scroll content'>
            <ul>
              <li v-for="(rule,index) in data.rules" :key="index">
              {{index+1}} : {{rule}}</li>
            </ul>
          </div>
          <div style='text-align:center'>
            <el-button type="primary" class="begin qianRuBtnP"  @click.prevent='getNext1()'>同意，下一步</el-button>
          </div>
        </div>
        <div   v-if='subPage==7'>
          <div class='mgBtm-10 bea_scroll content'>
           爱上他红色桃花女神热推荐你
          </div>
          <div style='text-align:center'>
            <el-button type="primary" class="begin qianRuBtn"  @click.prevent='close4()'>立即签入</el-button>
          </div>
        </div>
      </div>
    </AlertDetailCmn> 
  </div>
</template>

<script>
  import {cloneDeep} from '../../common/cloneDeep.js'
  import Alert from '../Common/Alert.vue'
  import AlertDetailCmn from '../Common/AlertDetailCmn.vue'
  export default {
    name: 'hello',
    components:{
      Alert,
      AlertDetailCmn
    },
    data () {
      return {
        images:['../static/banner1.png','../static/banner2.png','../static/banner3.png'],
        count:0,//所有项目的数量
        page:1,//我的项目分页的页数
        subPage:0,//初此签入时的页数
        subPageDel:['speechcraft_content','common_problem','description','audio','video'],//初此签入时每页渲染的data字段
        limit:4,//我的项目里每页的项目数量
        hasMore:true,//有无更多加载
        dataList:[],//有无更多加载
        weekDayList:[],//所有项目的工作日期
        alert:{//弹出的确认框
          title:'测试',
          isright:true,
          message:'消息',
          isshow:false,
          btntext:'确认'
        },
        alert2:{//初次签入时弹出的
          title:'初次签入测试',
          isshow:false,
          width:'829',
          height:'593'
        },
        alert3:{//非初此签入弹出的
          title:'项目规则',
          isshow:false,
        },
        data:{},//立即签入时请求的所有参数对象
        radio:[],//所有考试题的选中的答案的val值的集合/复选框是值
        solution:[],//所有考试题的正确答案的值集合
        now_id:'',//目前项目的id
        workbanchType:''//预约回拨的话 为callback
        }
    },
    created(){
      //初始化请求
      this.getList();
    
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
          this.page=1;          
          this.getList()
        }
        
      }
    },
    methods:{
      intoDetail(project_id){
        this.$router.push({path:'/index/UndertakeProjectDetail',query:{project_id}})
      },
      qianru(id){
        //单击立即签入
        var _this=this;
        this.now_id=id;       
        this.$http('/yunke/workbench/entering',{project_id:id}).then(function(res){
          if(res.data.code==1000){
            var d=res.data;
            _this.data=d.data;
            //判断是否是第一次签入
            if(d.data.require_test==1){
              _this.alert2.title="初次签入测试";
              for(var i=0;i<_this.subPageDel.length;i++){
                var a=_this.subPageDel[i];
                if(_this.data[a]){
                  _this.subPage=i;
                   break;
                }
              }
              if(_this.subPage==0){
                _this.subPage=1;
              }
              _this.alert2.isshow=true;
            }else{
              _this.subPage=6;
              _this.alert3.isshow=true;
            }
            //看考试题有几个
            for(var i=0;i<_this.data.exam.list.length;i++){
              //根据单选框跟复选框的不同，绑定不同的格式
              if(_this.data.exam.list[i].q_type>=100&&_this.data.exam.list[i].q_type<200){
                _this.radio.push('');
              }else{
                 _this.radio.push([]);
              }
              //根据题的个数填充showSolution
              _this.data.exam.list[i].showSolution=false;
              var answer_list=_this.data.exam.list[i].answer_list;
              if(answer_list){
                for(var j=0,solution_sub=[];j<answer_list.length;j++){
                  if(answer_list[j].is_correct){
                    solution_sub.push(answer_list[j].title);
                  }
                }
                _this.solution.push(solution_sub);
              }else{
                _this.solution.push([]);
              }
              
            }
            _this.data=cloneDeep(_this.data)
          }
        }).catch(function(err){
          console.log(err);
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        }) 
      },
      qianru2(id){
      },
      orderCallBack(id){
        //预约回拨
          var _this=this;
        this.now_id=id;       
        this.$http('/yunke/workbench/entering',{project_id:id}).then(function(res){
          if(res.data.code==1000){
            var d=res.data;
            _this.data=d.data;
            _this.subPage=6;
            _this.alert3.isshow=true;
          }
        }).catch(function(err){
          console.log(err);
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        }) 
        this.subPage=6;
        this.alert3.isshow=true;
        this.workbanchType='callback'; 
      },
      checkAccount(id){
        //跳转到查看对账
        this.$router.push({path:'/index/checkAccount/'+id})
      },
      getNext(){
        //下一步
        this.subPage++;
         if(!this.data[this.subPageDel[this.subPage]]){
            for(var i=this.subPage;i<this.subPageDel.length;i++){
                if(this.data[this.subPageDel[i]]){
                  this.subPage=i;
                   break;
                }
            }
            this.subPage=5;
            //初始化页面
            this.radio=[];
            for(var i=0;i<this.data.exam.list.length;i++){
              this.data.exam.list[i].showSolution=false;
              
               if(this.data.exam.list[i].q_type>=100&&this.data.exam.list[i].q_type<200){
                this.radio.push('');
              }else{
                 this.radio.push([]);
              }
            }
            //深拷贝一下（当参数没有及时更新时 在初始化的地方用）
            this.data=cloneDeep(this.data)
          }
      },
      getNext1(){
        //日常签入的下一步
        this.subPage++;
        this.alert3.title="测试麦克风";
      },
      getPrev(){
        //重新复习一遍
        this.subPage=1;
        if(!this.data[this.subPageDel[this.subPage]]){
            for(var i=this.subPage;i<this.subPageDel.length;i++){
                if(this.data[this.subPageDel[i]]){
                  this.subPage=i;
                   break;
                }
            }
        }
      },
      submitCeshi(){
        //考试完提交
        var d=this.data.exam.list;
        var canSub=true;
        for(var i=0;i<d.length;i++){
          if(d[i].q_type>=100&&d[i].q_type<200){
            //单选框以val值相比较
            if(d[i].answer_list){
              for(var j=0;j<d[i].answer_list.length;j++){
                if(d[i].answer_list[j].is_correct){
                  if((this.radio[i].length==0)||(d[i].answer_list[j].val!=this.radio[i]+1)){
                    this.data.exam.list[i].showSolution=true;
                    canSub=false;
                    break;
                  }else{
                    this.data.exam.list[i].showSolution=false;
                  }
                }
              }
            }    
          }else{
            //所有考试题的复选框是值比
            var subSolu=[];
            if(d[i].answer_list){
              for(var j=0;j<d[i].answer_list.length;j++){
                if(d[i].answer_list[j].is_correct){
                  subSolu.push(d[i].answer_list[j].title);
                }
              }
              if(subSolu.length==this.radio[i].length){
                for(var a=0;a<this.radio[i].length;a++){
                  if(subSolu.toString().indexOf(this.radio[i][a])==-1){
                    this.data.exam.list[i].showSolution=true;
                    canSub=false;
                    break;
                  }else{
                    this.data.exam.list[i].showSolution=false;
                  }
                }
              }else{
                this.data.exam.list[i].showSolution=true;
                canSub=false;
              }
            }
          }
        }
        if(canSub){
          this.subPage++;
          this.alert.title="测试成功";
          this.alert.isright=true;
          this.alert.message='恭喜您，您已经通过了小测试，可立即签入了哦';
          this.alert.btntext='立即签入';
          this.alert2.isshow=false;
          var _this=this;
          setTimeout(function(){
            _this.alert.isshow=true;
          },500)
        }
      },
      close(){
        this.alert.isshow=false
      },
      sure(){
        this.subPage=6;
        this.alert3.title="项目规则";
        this.alert3.isshow=true;
        this.alert.isshow=false;
        this.alert2.isshow=false;
      },
      close2(){
        this.alert2.isshow=false
      },
      sure2(){
        this.alert2.isshow=true
      },
      close3(){
        this.alert3.isshow=false
      },
      close4(){
        let _this=this;
        this.$router.push({path:'/WorkBench',query:{id:_this.now_id,workbanchType:this.workbanchType}});
      },
      sure3(){
        this.alert3.isshow=true
      },
      getList(){
        //获取我的项目的参数
        this.$store.dispatch('loadingAction',true);
        var  _this=this;
        this.$http('/yunke/workbench/my_project',{page:this.page,limit:this.limit}).then(function(res){
          var d=res.data;
          if(d.code==1000){
            _this.count=d.data.count;
            if(d.data.list.length<_this.limit){
              _this.hasMore=false;
            }
            _this.dataList.push(...d.data.list);
            for(var i=0;i<_this.dataList.length;i++){
              _this.weekDayList[i]=_this.dataList[i].work_day.split(',');
            }
            _this.page++;
            _this.$store.dispatch('refreshAction',false);
            _this.$store.dispatch('loadingAction',false);
          }
        }).catch(function(err){
          console.log(err);
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        }) 
      }
    }
  }
</script>
<style scoped>
  h1,h2,h3,h4,h5,h6,p{font-weight:normal;padding:0;margin:0}
  .content{
    padding:20px 20px 0px 14px;
    margin-bottom:15px;
    height:426px;
    overflow:auto;
    color:#666;
    font-size:14px;
  }
  .content h1{
    font-weight:bold;
  }
  .content ul li{
    margin-bottom:15px;
  }
  .content ul li .radio,.checkBox{
    width:106px;
  }
  .qianRuBtn{
    width:88px;
    text-align:center;
    font-size:14px;
    margin-top:10px;
  }
  .qianRuBtnP{
    padding-left:10px;
    padding-right:10px;
    font-size:14px;
    margin-top:10px;
  }
  .mgBtm-10 h1,.mgBtm-10 p{
    margin-bottom:10px;
  }
  .myProject{
    margin:30px 0 20px 0;
    font-size:20px;
    float:left;
    color:#333;
  }
  .myTotle{
    margin:34px 0 20px 0;
    font-size:16px;
    float:right;
    color:#333;
  }
  .text-center{
    text-align:center;
  }
  .ul-1>li{
    width:940px;
    height:112px;
    box-sizing:border-box;
    margin-bottom:20px;
    border:1px solid #eee;
    border-radius:4px;
    padding:20px;
    color:#666;
  }
  .ul-1 h1{
    margin-bottom:12px;
  }
  .ul-1 h1>img{
    position:relative;
    top:2px;
    margin-left:10px;
  }
  .ul-2 li{
    float:left;
  }
  .ul-2 li img{
    position:relative;
    top:4px;
    margin-right:10px;
  }
  .myProgress-bar{
    height:14px;
    margin-top:9px;
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
  .gz_BG{
    background:url(./img/gz-bg.jpg) no-repeat center center ;
    overflow-y:hidden;
  }
  .sub_ge_Bg{
    width:292px;
    min-height:350px;
    position:absolute;
    top:50%;
    left:50%;
    background:url(./img/gz_bg_1.jpg) repeat;
    margin-top:-152px;
    margin-left:-146px;
  }
  .sub_ge_Bg ul li{
    line-height:36px;
    font-size:14px;  
    color:#666;
    margin-bottom:0;

  }
  .el-radio ,.el-radio__label{
    cursor:pointer!important;
  }
</style>


<style>
  .myProgress-bar .el-progress-bar__innerText{
    margin-top:-7px;
  }
  .myProgress-bar .el-progress-bar__inner{
    background-color: #ff826e!important;
  }
</style>