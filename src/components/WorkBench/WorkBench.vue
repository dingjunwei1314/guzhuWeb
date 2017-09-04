<template>
  <div class="content ui-sys-bar1">
    <div class="header">
      <div class="tit" style='width:23%' >
        <el-tooltip class="item"  effect="light" :content="MainData.name" placement="bottom-start">
            <span class='myOverElli' :title='MainData.name'>{{MainData.name}}</span>
        </el-tooltip>
        <el-tooltip class="item"  effect="light" :content="MainData.authen_note" placement="bottom-start">
            <i class='h4 little_logo'>{{MainData.authen_type}}</i>
        </el-tooltip>
      </div>
      <div class="call_content" style='margin:0;width:27%'>
        <input type="text" name="" placeholder="手机号">
        <img src="./img/phone1.png">
        <span style="color:#666;font-size14px;line-height:24px;">00:01</span>
        <el-button style="height:30px;padding:0px 10px;line-height:30px">挂断重拨</el-button>
      </div>
      <div class="phonenum" style='margin:0;width:27%;'>
        <img src="./img/phone2.png">
        <span>呼出量</span>
        <span>{{MainData.call_count}}</span>
        <img src="./img/phone2.png">
        <span>接通量</span>
        <span>{{MainData.call_answered}}</span>
      </div>
      <div class="state" style='margin:0;width:12% ;text-align:right'>
        <span>自动外呼状态</span>
        <el-switch
          style="width:25px;"
          v-model="value1"
          on-text=""
          off-text="">
        </el-switch>
      </div>
      <div style='margin:0;width:11%;text-align:right'>
        <el-badge :value="3" :max="99" class='myBadge'>
          <el-popover
            class='myBadge'
              ref="popover4"
              placement="bottom"
              width="208"
              trigger="hover"
              >
              <div style='margin-left:-10px' >
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
              </div>
          </el-popover>
          <el-button v-popover:popover4 class="iconfont icon-lingdang myBtn"></el-button>
        </el-badge>
        <i style="margin-left:10px" class="iconfont icon-fankui"  @click="feedback()"></i>
        <b style="margin-left:10px;color:#666666;cursor:not-allowed " v-if='value1==1'>退出</b>
        <b style="margin-left:10px;color:#FE9039" @click="" v-else>退出</b>
      </div>
    </div>
    <div class="con bea_scroll">
      <div class="left bea_scroll">
        <p class="left_tit">用户资料</p>
        <div style="margin-top:40px;font-size:14px;color:#666">
          <ul class="customer_list" v-for="(item,index) in Customer_data._fields" :key="index">
            <li style="line-height:25px">{{Customer_data.record_fields[item]}}：</li>
            <li class="form_item">
              <p @click="change_form_item($event,item)">
                {{Customer_data.record[item]}}
                <i class="el-icon-edit"></i>
              </p>
              <el-input @blur="submit_input($event,item)" style="margin-top:-5px;display:none" v-model="Customer_data.record[item]" placeholder=""></el-input>
            </li>
          </ul>
        </div>
      </div>
      <div class="center bea_scroll" style="display:flex;flex-direction:column">
        <p style="color: #333;font-size: 18px;line-height: 24px;margin-left:15px;position:absolute;">业务问卷</p>
      
          <div style="flex:1;padding:15px;margin-top:20px;color:#666;font-size:14px;line-height:24px;" class='wenjuan'>
            <ul class="main_question_answer">
              <li v-for="(item,index) in MainData.survey.list" v-show="item.is_show">
                <p style="margin-bottom:15px">{{item.q_title}}<span v-if="item.not_null!=1" style="color:#fe9039;margin-left:3px">*</span></p>
                <div style="margin-bottom:25px;padding-left:33px" v-if="item.q_type>=100&&item.q_type<200">
                  
                  <el-radio-group @change="chosed(item.q_no,item.q_id)" v-model="formInline.survey[index].answered">
                    <el-radio v-for="(item1,index1) in item.answer_list" :key="index1" :label="item1.val">{{item1.title}}</el-radio>
                  </el-radio-group>
                </div>
                <div style="margin-bottom:25px;padding-left:35px" v-else-if="item.q_type>=200&&item.q_type<300">
                  
                  <el-checkbox-group @change="chosed(item.q_no,item.q_id)" v-model="formInline.survey[index].answered">
                    <el-checkbox v-for="(item1,index1) in item.answer_list" :key="index1"  :label="item1.val">{{item1.title}}</el-checkbox>
                  </el-checkbox-group>

                </div>
                <div style="margin-bottom:25px;padding-left:35px" v-else>
                  <el-input
                    @change="chosed(item.q_no,item.q_id)"
                    type="textarea"
                    autosize
                    style="width:400px"
                    resize="none"
                    placeholder=""
                    v-model="formInline.survey[index].answered">
                  </el-input>
                </div>
              </li>
            </ul>    
          </div>


          <div style="border-top:1px solid #eee;padding:20px 20px 20px 20px;flex:0 0 100px" >
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="呼叫结果" >
                <el-cascader :options="options" change-on-select v-model='call_status' class='myCc'></el-cascader>
              </el-form-item>
                
              <el-form-item label="预约跟进" v-if="call_status[0]==1&&call_status[1]==3">
                <el-date-picker
                  @change="pickerChange"
                  v-model="formInline.callback_time"
                  align="right"
                  type="datetime"
                  placeholder="请选择"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <div>

                <el-form-item label="工单备注">
                  <el-input style="width:472px" v-model="formInline.note"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button style="width:90px" class="begin" type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
              </div>
              
            </el-form>
          </div>
       
      </div>
      <div class="right bea_scroll">
        <el-tabs  v-model="activeName" class="detailsTabs">
          <el-tab-pane  label="常见问题" name="first">
            <div class='h4 text-gray-6 wenjuan' v-html="MainData.common_problem"></div>
          </el-tab-pane>
          <el-tab-pane label="话术" name="second" style="padding-left:2px">
            <div class='h4 text-gray-6 wenjuan' v-html="MainData.speechcraft_content"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="btn_wap" :class="{'btn_wap_active':is_show_right_mask_content,'btn_wap_not_active':!is_show_right_mask_content}">
      <p :class="{'tab_active':tab_active==1}" @click="show_right_mask(true,1)">通话流水</p>
      <p :class="{'tab_active':tab_active==2}" @click="show_right_mask(true,2)">预约</p>
      <p :class="{'tab_active':tab_active==3}" @click="show_right_mask(true,3)">知识库</p>
    </div>

    <transition name="fade">
    <div class="right_mask" v-show="is_show_right_mask" @click.stop.prevent="show_right_mask(false)">
      <transition name="slide">
        <div class="right_mask_content" @click.stop="click_stop()" v-if="is_show_right_mask_content">
          <div v-if="tab_active==1">
            <p style="margin-top:15px;margin-left:15px;">今日全部通话</p>
            <div>
              <div class="tab_tit">
                <span style="margin-left:15px;">客户电话</span>
                <span>状态</span>
                <span style="margin-right:15px">备注</span>
              </div>

              <el-collapse accordion>
                <el-collapse-item v-for="(item,index) in CdrListTodayData" :key="index">
                  <template slot="title">
                    <div style="display:flex;justify-content:space-between;float:left;width:56%;padding-right:35%;">
                      <span>{{item.phone}}</span>
                      <span>{{item.status}}</span>
                    </div>
                  </template>
                  <div>{{item.note}}</div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>

          <div v-else-if="tab_active==2">
            <p style="margin-top:15px;margin-left:15px;">预约待跟进</p>
            <div>
              <div class="tab_tit">
                <span style="margin-left:15px;">待跟进时间</span>
                <span>回拨</span>
                <span style="margin-right:15px">备注</span>
              </div>

              <el-collapse accordion>
                <el-collapse-item v-for="(item,index) in CallbackData" :key="index">
                  <template slot="title">
                    <div style="display:flex;justify-content:space-between;float:left;width:56%;padding-right:35%;align-items:center">
                      <span>{{item.record.call_back_time}}</span>
                      <img @click.stop="hb()" style="cursor:pointer" src="./img/phone2.png">
                    </div>
                    
                  </template>
                  <div>{{item.record.note}}</div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>

          <div v-else-if="tab_active==3">
            <p style="margin-top:15px;margin-left:15px;">知识库</p>
            <div v-html="faqData.faq_public" style="padding:15px">
              
            </div>
            <div v-html="faqData.faq_private" style="padding:15px">
              
            </div>
          </div>
        </div>
      </transition>
    </div>
    </transition>
    <AlertDetailCmn :title="alert.title"  :isshow="alert.isshow" :AlertWidth='alert.width' :AlertHeight='alert.height' @close="closeAlert" >
      <div slot="alert_con"> 
        <div style='height:240px;padding:30px;box-sizing:border-box'>
          <p class='h4 text-gray-6' style='line-height:30px; text-indent:2em'><b>{{msgDetail.title}}</b>：{{msgDetail.content}}</p>
        </div>
        <div style='text-align:center'>
          <el-button type="primary" class="begin qianRuBtn"  @click.prevent='delMsgDetail(msgDetail.id)'>删除</el-button>
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
          <el-button type="primary" class="begin qianRuBtn"  @click.prevent='feedback_submit'>提交</el-button>
        </div>
      </div>
    </AlertDetailCmn> 
  </div>
</template>
<script>
import {cloneDeep} from '../../common/cloneDeep.js'
 import AlertDetailCmn from '../Common/AlertDetailCmn.vue'
export default {
    name:'workbench',
    components:{
      AlertDetailCmn
    },
    props:{
      
    },
    data() {
      return{
        value1:1,
        activeName:'first',
        is_show_right_mask:false,
        is_show_right_mask_content:false,
        tab_active:0,
        Customer_data:{},
        MainData:{
          survey:{
            list:[]
          }
        },
        CdrListTodayData:'',
        CallbackData:'',
        formInline:{
          project_id:'',
          record_id:'',
          survey:[{q_id:'',q_no:'',answered:''}],
          call_result:'',
          call_status:'',
          callback_time:'',
          note:''
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }]
        },
        faqData:'',
        cur_val:'',
        project_id:'',
        workbanchType:'',//是否显示预约回拨
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
        msgDetail:{},//消息详情列表,
        textarea:'',
        options:[{
            value:'1',
            label: '接通',
            children:[{
              value:'1',
              label: '成功',
              children:[]
            },{
              value:'2',
              label: '不成功',
              children:[]
            }]
        },{
            value:'2',
            label: '无人接听',
        },{
            value:'3',
            label: '拒接',
        },{
            value:'4',
            label: '关机',
        },{
            value:'5',
            label: '停机',
        },{
            value:'6',
            label: '空号',
        },{
            value:'7',
            label: '其他',
        }],
        call_status:[]//呼叫结果绑定的数据
      }
    },
    computed:{
       
    },
    watch:{
     
    },
    methods: {
      change_form_item(event,field){
        this.cur_val=this.Customer_data.record[field]
        event.target.style.display='none'
        event.target.nextElementSibling.style.display='block'
        event.target.nextElementSibling.childNodes[2].focus()
      },
      submit_input(event,field){

        let _this=this;
        let data={
          project_id:_this.$route.query.id,
          record_id:_this.Customer_data.record.id,
          field:this.Customer_data.record_fields[field],
          val:this.Customer_data.record[field]
        }
        event.target.parentElement.style.display='none'
        event.target.parentElement.previousElementSibling.style.display='block'
        
        if(this.cur_val==this.Customer_data.record[field]){
          return;
        }
        //客户资料提交接口
        this.$http('/yunke/workbench/record_customer_update',data).then(function(res){
          if(res.data.code==1000){
            _this.$message({
              message: '修改成功',
              type: 'success'
            }); 
          }else{
             _this.$message({
              message: '修改失败',
              type: 'warning'
            }); 
          }
        },function(err){
          console.log(err)
        })
       
      },
      chosed(q_no,q_id){
        let _this=this

        this.formInline.survey.forEach(function(item_answer){
          if(item_answer.q_no>q_no){
            if(typeof item_answer.answered=='object'){
              item_answer.answered=[]
            }else{
              item_answer.answered=''
            }
          }
        })

        this.MainData.survey.list.forEach(function(item_question){
          if(item_question.q_no>q_no){
            item_question.is_show=false;
          }
        })

        this.MainData.rule.forEach(function(item_rule){
          let rule_arr=item_rule.split(',')
          if(rule_arr[1]==q_id){
            let current_question=_this.MainData.survey.list[q_no-1];
            if(current_question.q_type>=200&&current_question.q_type<300){
              console.log('arr')
              let rule_detail_arr=rule_arr[2].split('|').map(function(item){
                return Number(item)
              })
              
              let len1=_this.formInline.survey[q_no-1].answered.concat(rule_detail_arr).length;
              let len2=new Set(_this.formInline.survey[q_no-1].answered.concat(rule_detail_arr)).size
              if(len2<len1){
                _this.MainData.survey.list.forEach(function(_item_question_){
                  if(_item_question_.q_id==rule_arr[0]){
                    _item_question_.is_show=true;
                  }
                })
              }
             
            }else{
              console.log('str')
              if(_this.formInline.survey[q_no-1].answered==rule_arr[2]){
                _this.MainData.survey.list.forEach(function(_item_question){
                  if(_item_question.q_id==rule_arr[0]){
                    _item_question.is_show=true;
                  }
                })
              }
            }
          }  
        })
      },
      show_right_mask(swi,index){
        if(swi){
          if(index==1&&this.CdrListTodayData==''){
            this.getCdrListTodayData()   
          }else if(index==2&&this.CallbackData==''){
            this.getCallbackData()
          }else if(index==3&&this.faqData==''){
            this.getFaqData()
          }
          this.is_show_right_mask=true
          this.is_show_right_mask_content=true
          this.tab_active=index
        }else{
          this.is_show_right_mask=false
          this.is_show_right_mask_content=false
          this.tab_active=0
        }
      },
      click_stop(){

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
      open(h,type) {
        this.$message({
          message: h,
          type: type
        });
      },
      hb(){

      },
      pickerChange(){

      },
      onSubmit(){
        
        let _this=this
        let swi=true;
        this.formInline.project_id=this.$route.query.id;
        this.formInline.record_id=this.Customer_data.record.id;
        this.formInline.call_status=this.call_status[0];
        this.formInline.call_result=this.call_status[2]?this.call_status[2]:'';
        for(let i=0; i<this.MainData.survey.list.length;i++){
          if(this.MainData.survey.list[i].is_show&&this.MainData.survey.list[i].not_null==0){
            _this.formInline.survey.forEach(function(item){
              if(item.q_id==_this.MainData.survey.list[i].q_id){
                if(item.answered==''||item.answered==[]){
                  swi=false
                }
              }
            })
          }
        }
        if(!swi){
          _this.$message({
            message: '带*的是必答题',
            type: 'warning'
          });
          return  
        }

        
        if(this.formInline.call_status.length==0){
          this.$message({
            message: '请选择呼叫状态',
            type: 'warning'
          });  
          return
        }
        if(this.call_status[0]==1&&(this.call_status[1]!=3&&this.call_status[2].length==0)){
          this.$message({
            message: '请选择呼叫结果',
            type: 'warning'
          });  
          return;
        }
        if(this.call_status[0]==1&&this.call_status[1]==3&&this.formInline.callback_time==''){

          this.$message({
            message: '请选择跟进时间',
            type: 'warning'
          });  
          return
        }
        this.$http('/yunke/workbench/record_submit',_this.formInline).then(function(res){
          if(res.data.code==1000){
            _this.$message({
              message: '提交成功',
              type: 'success'
            });
            _this.formInline.survey=[];
            _this.formInline.call_result='';
            _this.formInline.call_status=[];
            _this.formInline.callback_time='';
            _this.formInline.note='';
            _this.call_status=[];

            for(let i=0;i<_this.MainData.survey.list.length;i++){
              if(i==0){
                _this.MainData.survey.list[i].is_show=true;
              }else{
                _this.MainData.survey.list[i].is_show=false;
              }

              if(_this.MainData.survey.list[i].q_type>=200&&_this.MainData.survey.list[i].q_type<300){
                _this.formInline.survey.push({
                  q_id:_this.MainData.survey.list[i].q_id,
                  q_no:_this.MainData.survey.list[i].q_no,
                  answered:[]
                })
              }else{
                _this.formInline.survey.push({
                  q_id:_this.MainData.survey.list[i].q_id,
                  q_no:_this.MainData.survey.list[i].q_no,
                  answered:''
                })
              }
            
            }
            _this.MainData.survey.list=cloneDeep(_this.MainData.survey.list)
            _this.getCustomerData()             
          }
        },function(reject){
          console.log(reject)
        })
      },
      getCustomerData(){
        var _this=this
        //签入页面获取一条数据
        this.$http('/yunke/workbench/get_record',{project_id:_this.$route.query}).then(function(res){
          _this.Customer_data=res.data.data;
          _this.Customer_data._fields=Object.keys(res.data.data.record_fields)
          console.log(_this.Customer_data)
        },function(reject){
          console.log(reject)
        })
      },
      getMainData(){
        var _this=this
        //立即签入
        this.$http('/yunke/workbench/entering',{project_id:_this.$route.query}).then(function(res){
          _this.MainData=res.data.data;
          if(_this.MainData.authen_type.length==2){
            _this.MainData.authen_type=_this.MainData.authen_type.slice(0,1)
          }
          _this.MainData.survey.list.sort(function(previous,latter){
            return previous.q_no-latter.q_no
          })
          //如果是预约跟进
            if(_this.workbanchType=='callback'){
              _this.options[0].children.push({value:3,label:'预约跟进'})
            }
          //成功的套餐数组
          for(var i=0;i<_this.MainData.call_result.length;i++){
            if(_this.MainData.call_result[i].type==3){
              _this.options[0].children[0].children.push({value:_this.MainData.call_result[i].val,label:_this.MainData.call_result[i].title})
            }else{
              _this.options[0].children[1].children.push({value:_this.MainData.call_result[i].val,label:_this.MainData.call_result[i].title})
            }
          }
          _this.formInline.survey=[];
          _this.formInline.call_result='';
          _this.formInline.call_status='';
          _this.formInline.callback_time='';
          _this.formInline.note='';

          for(let i=0;i<_this.MainData.survey.list.length;i++){
            if(i==0){
              _this.MainData.survey.list[i].is_show=true;
            }else{
              _this.MainData.survey.list[i].is_show=false;
            }

            if(_this.MainData.survey.list[i].q_type>=200&&_this.MainData.survey.list[i].q_type<300){
              _this.formInline.survey.push({
                q_id:_this.MainData.survey.list[i].q_id,
                q_no:_this.MainData.survey.list[i].q_no,
                answered:[]
              })
            }else{
              _this.formInline.survey.push({
                q_id:_this.MainData.survey.list[i].q_id,
                q_no:_this.MainData.survey.list[i].q_no,
                answered:''
              })
            }
            
          }
          _this.MainData.survey.list=cloneDeep(_this.MainData.survey.list)
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        
        },function(reject){
          console.log(reject)
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        })
      },
      getCdrListTodayData(){
        let _this=this
        //当前项目的当前用户的今日通话流水
        this.$http('/yunke/workbench/cdr_list_today',{project_id:_this.$route.query}).then(function(res){
          _this.CdrListTodayData=res.data.data;
        },function(reject){
          console.log(reject)
        })
      },
      getCallbackData(){
        let _this=this
        //预约回拨接口
        this.$http('/yunke/workbench/callback',{project_id:_this.$route.query}).then(function(res){
          _this.CallbackData=res.data.data;
        },function(reject){
          console.log(reject)
        })
      },
      getFaqData(){
        let _this=this
        //知识库
        this.$http('/yunke/workbench/faq',{project_id:_this.$route.query}).then(function(res){
          _this.faqData=res.data.data;
        },function(reject){
          console.log(reject)
        })
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
      this.getCustomerData()//获取号码
      this.getMainData()
      this.getData();//消息列表参数
      console.log(this.$route.query)
      this.project_id=this.$route.query.id;
      this.workbanchType=this.$route.query.workbanchType;
      //最大化
      if (typeof hostEditor != 'undefined')
      {
        hostEditor.southTelWindowMaximization();
      }
    }
  }
</script>

<style scoped>
  .content{background:white;width: 100%;height: 100%;position: relative;display: flex;flex-direction: column;}
  .header{border-bottom: 1px solid #eee;display: flex;align-items: center;justify-content: space-between;padding: 0px 20px;font-size: 14px;color: #666;box-sizing:border-box;flex: 0 0 55px}
  .tit{border-left: 2px solid #fe9039;color: #333;font-size: 18px;line-height: 24px;height: 24px;padding-left: 5px;}
  .tit span{display:inline-block;max-width:85%;vertical-align:top}
  .header img{vertical-align: middle;}
  .call_content{position: relative;}
  .call_content input{width: 150px;height: 30px;border: 1px solid #eee;border-radius: 5px;text-indent: 10px;color: #666;font-size: 14px;line-height: 24px;padding-right: 30px}
  .call_content img{position: absolute;top: 8px;left: 158px;cursor: pointer;}
  .phonenum span:nth-child(3),.phonenum span:nth-child(6){display: inline-block;width: 35px;height: 20px;line-height: 20px;text-align: center;background-color: #fee2cc;color: #fecba7;border-radius:10px;}
  .phonenum img:nth-child(4){margin-left: 10px}
  .state span{vertical-align: middle;margin-right: 5px}
  .con{flex: 1;display: flex;align-items: stretch;box-sizing: border-box;}
  .left,.right{border-right: 1px solid #eee;background-color: #f9f9f9;width: 23%;padding:15px;position: relative;}
  .right{border: none}
  .center{border-right: 1px solid #eee;width: 54%;padding: 15px 0px}
  .left .left_tit,.center .left_tit,.right_mask_content .tit{color: #333;font-size: 18px;line-height: 24px;position: absolute;left: 15px;top: 15px;}
  .customer_list{display: inline-table;width: 100%;margin-top:32px}
  .customer_list:nth-child(1){margin-top:12px}
  .customer_list li{float: left;}
  .form_item{max-width:75%;padding-left:3px;cursor:pointer;line-height: 25px;}
  .form_item>p{position: relative;cursor: pointer;line-height: 25px;}
  .form_item:hover i{display: block}
  .form_item i{color: #666;position: absolute;right: -20px;top: -3px;cursor: pointer;color: #999;display: none}

  .right_mask{position: fixed;left: 0;right: 0;top: 0px;bottom: 0;z-index: 3;overflow: hidden;}
  .right_mask_content::-webkit-scrollbar-thumb{background: rgb(255,172,82);width: 3px}
  .right_mask_content::-webkit-scrollbar-track{background: #ccc;width: 3px}
  .right_mask_content::-webkit-scrollbar{width: 5px}
  .right_mask_content{position: absolute;top: 55px;bottom: 0;width: 25%;background: #f9f9f9;z-index: 4;overflow-y: auto;overflow-x: hidden;border-left: 1px solid #eee;right: 0}
  /*.right_mask_content>div{padding: 15px}*/
  .btn_wap{display: flex;align-items: center;justify-content: center;flex-direction: column;position: absolute;top: 0;z-index: 5;position: fixed;height: 100%;transition: right .5s}
  .btn_wap p{width: 17px;padding: 10px 3px;border:1px solid #fe9039;color: #fe9039;border-radius: 3px;margin-top: 10px;cursor: pointer;}
  .btn_wap_active{right: 25%}
  .btn_wap_not_active{right: 0px}
  .tab_active{background-color: #fe9039;color: #fafafa!important}
  .tab_tit{display: flex;justify-content: space-between;color: #666;font-size: 14px;margin-top: 30px;margin-bottom: 10px}
  .slide-enter-active, .slide-leave-active {
    transition: right .5s
  }
  .slide-enter,.slide-leave-to{
    right:-25%; 
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
  .begin:hover{background: #feb339;border-color: #feb339}
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
  /*反馈弹出框的样式*/
  .textArea{
    margin-top:17px;width:355px;color:#666;
  }
  .textArea:focus{
    border-color:#FE9039;
    outline-color:#fe9039;
  }
  /* 距离现在时间的样式 */
  .radingMsg .nextTime{
    width:60px;height:36px;float:right;padding-bottom:10px;line-height:36px;color:#999;
  }
  .pointer h1,.pointer b,.pointer span,.pointer p{
    cursor:pointer;
  }
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
<style type="text/css">
  .right .el-tabs__header{border-bottom: none;margin-bottom: 25px}
  .right .el-tabs__item:nth-child(1){padding-left: 0px}
  .right_mask_content  .el-collapse{border-left: none;border-right: none}
  
  
  .right_mask_content .el-collapse-item__header{background: #f9f9f9}
  .right_mask_content .el-collapse-item__wrap{background-color: white}

  .main_question_answer .el-checkbox+.el-checkbox{margin-left: 40px;}
  .main_question_answer .el-radio+.el-radio{margin-left: 60px}
  /*三级联动*/
   div.el-cascader-menus{
      top:470px!important;
  } 
   ul.el-cascader-menu{
    height:265px!important;
  }
</style>