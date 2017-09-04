<template>
	<div>
		<div style="padding-top:30px;padding-bottom:20px">
			<el-row type="flex" class="row-bg headerTitle" justify="space-between">
    	  		<el-col :span="16">
    	  		  <div class="grid-content bg-purple">
    	  		    <p style="font-size:20px;color:#333">
    	  		    	{{data.project_name}}
    	  		    	<span>{{data.authen}}</span>
    	  		    	<span>{{data.type}}业务</span>
    	  		    </p>
    	  		  </div>
    	  		</el-col>
    	  		<el-col :span="8" type="flex" justify="end" class="headerTitleRight" >
    	  		<div>

    	  		  	<el-button @click.stop="getrule(project_id)" v-if="data.status==1" type="primary" class="go begin">
            			立即抢单
                  	</el-button>
                  	<el-button @click.stop="getrule(project_id)" v-if="data.status==2" type="primary" class="go begin" >
            			再次承接
                  	</el-button>
                  	<el-button  v-else-if="data.status==0" class="go" :disabled="true">立即抢单</el-button>
            		<div class="why" @mouseover="seeWhyIn">
             			
              			<img src="../../assets/business/why.png"  v-if="data.status==0" >
              			
              			<div class="showWhyWap" v-if="data.status==0"  v-show="isshow" @mouseout="seeWhyLeave" >
							 <div class="triangle"></div>
              			  <ul class="whyItem">

                  				<li v-if="data.Unqualified[1]==1">
                  				  <span>未完成<span class="red">实名认证</span></span>
                  				  <el-button :plain="true" type="warning">实名认证</el-button>
                  				</li>
                  				<li v-if="data.Unqualified[2]==1">
                  				  <span>未通过<span class="red">打字测试</span></span>  <el-button>打字测试</el-button>
                  				</li>
                  				<li v-if="data.Unqualified[3]==1">
                  				  <span>未通过<span class="red">普通话测试</span></span>  
                  				  <el-button style="max-width:88px;padding:0 8px">普通话测试</el-button>
                  				</li>
                  				<li v-if="data.Unqualified[4]==1">
                  				  <span>您的<span class="red">技能考试</span>未通过</span>  
                  				  <el-button>云客学院</el-button>
                  				</li>
                  				<li v-if="data.Unqualified[5]==1">
                  				  <span>您的<span class="red">性别</span>不符合项目要求</span> 
                  				</li>
                  				<li v-if="data.Unqualified[6]==1">
                  				  <span>您的<span class="red">学历</span>不符合项目要求</span> 
                  				</li>
                  				<li v-if="data.Unqualified[7]==1">
                  				  <span>您的<span class="red">等级</span>不符合此项目</span> 
                  				</li>
                  				<li v-if="data.status==0">
                  				  <span>您已有<span class="red">承接的项目了</span></span> 
                  				  <el-button style="max-width:88px;padding:0 8px">进入工作台</el-button>
                  				</li>
                  				<li v-if="data.guest_upper_limit1==data.guest_upper_limit2">
                  				  <span>项目云客上限<span class="red">已满员</span></span> 
                  				  <el-button >再逛一逛</el-button>
                  				</li>
              			  </ul>
              			 
              			</div>
            		</div> 
    	  		</div>
    	  		</el-col>
    	  	</el-row>

    	  	<template>
  				<el-tabs v-model="activeName" @tab-click="handleClick" class="detailsTabs">
  				  <el-tab-pane label="项目详情" name="first">
  				  	<el-col :span="12" type="flex" justify="end" class="font">
  				  		<p style="margin-top:15px">
        					<span style="float:left">项目进度</span>
       						<el-progress  :show-text="true" :stroke-width="12" :percentage="parseFloat(data.project_schedule)" style="width:314px;float:left;margin-left:10px"></el-progress>
      					</p>
      					<br>
      					<p style="margin-top:15px">
        					<span style="float:left">等级要求</span>
        					<el-rate
							   v-model="data.grade_ask"
							   disabled
							   text-color="#ff9900"
							   style="width:220px;float:left;margin-left:10px">
							</el-rate>
      					</p>
      					<br>
      					<p style="margin-top:28px" class="information" v-for="item in data.guest_ask">
        					<span style="float:left">
        						 <template v-if="item.gender==1">男</template>
								 <template v-else-if="item.gender==2">女</template>
        					</span>
        					<span style="float:left">
        						<template v-if="item.language==1">
       							  普通话
       							</template>
       							<template v-else-if="item.language==2">
       							  英语
       							</template>

        					</span>
        					<span style="float:left">
        						<template v-if="item.certify==1">
       							  高中以下
       							</template>
       							<template v-else-if="item.certify==2">
       							  高中
       							</template>
       							<template v-else-if="item.certify==3">
       							  专科
       							</template>
       							<template v-else-if="item.certify==4">
       							  本科
       							</template>
       							<template v-else-if="item.certify==4">
       							  本科以上
       							</template>

        					</span>
      					</p>
      					<br>
      					<p style="margin-top:39px">
        					<span style="float:left">结算标准 ：</span>
        					<span style="float:left;margin-left:8px">{{data.price_success}}</span>
      					</p>
      					<br>
      					<p style="margin-top:26px">
        					<span style="float:left">云客上限 ：</span>
        					<span style="float:left;margin-left:8px">{{data.guest_upper_limit2}} /<span>{{data.guest_upper_limit1}}</span></span>
      					</p>
      					<br>
      					<p style="margin-top:26px">
        					<span style="float:left">工作时间 ：</span>
        					<span style="float:left;margin-left:8px">
        						<p v-if="data.week_time.length==Math.max(...data.week_time)-Math.min(...data.week_time)+1&&data.week_time.length!=1">
            					周
            						<span v-if="Math.min(...data.week_time)==1">一</span>
            						<span v-else-if="Math.min(...data.week_time)==2">二</span>
            						<span v-else-if="Math.min(...data.week_time)==3">三</span>
            						<span v-else-if="Math.min(...data.week_time)==4">四</span>
            						<span v-else-if="Math.min(...data.week_time)==5">五</span>
            						<span v-else="Math.min(...data.week_time)==6">六</span>
            						至 周
            						<span v-if="Math.max(...data.week_time)==2">二</span>
            						<span v-else-if="Math.max(...data.week_time)==3">三</span>
            						<span v-else-if="Math.max(...data.week_time)==4">四</span>
            						<span v-else-if="Math.max(...data.week_time)==5">五</span>
            						<span v-else-if="Math.max(...data.week_time)==6">六</span>
            						<span v-else="Math.max(...data.week_time)==7">日</span>  
					
            					</p>
            					<p v-else>
            					  周
            					  <span v-if="data.week_time.indexOf(1)!=-1">一</span>
            					  <span v-if="data.week_time.indexOf(2)!=-1">二</span>
            					  <span v-if="data.week_time.indexOf(3)!=-1">三</span>
            					  <span v-if="data.week_time.indexOf(4)!=-1">四</span>
            					  <span v-if="data.week_time.indexOf(5)!=-1">五</span>
            					  <span v-if="data.week_time.indexOf(6)!=-1">六</span>
            					  <span v-if="data.week_time.indexOf(7)!=-1">日</span>
            					</p>
        					</span>
      					</p>
      					<br>
      					<p style="margin-top:26px" v-for="item in data.work_time">
        					<span style="float:left">工作时段 ：</span>
        					<span style="float:left;margin-left:8px">{{item.begin_time}} - <span>{{item.end_time}}</span></span>
      					</p>
      					<br>
      					<p style="margin-top:26px">
        					<span style="float:left">启动时间 ：</span>
        					<span style="float:left;margin-left:8px">{{data.project_begin_time}}</span>
      					</p>
      					<br>
      					<p style="margin-top:26px">
        					<span style="float:left">截止时间 ：</span>
        					<span style="float:left;margin-left:8px">{{data.project_end_time}}</span>
      					</p>
    	  			</el-col>
    	  			<div class="rules">
						<div class="rule-title">项目规则</div>
						<div class="inner-rule" v-for="item in data.project_rules">
							<p v-for="(myRule,index) in item" :key='index'>{{index+':'+myRule}}</p>
						</div>
				  	</div>
  				  </el-tab-pane>
  				  <el-tab-pane label="项目问卷" name="second" style="overflow:auto">
  				  	<div class="wjbox">
  				  		<div class="wjinner">
  				  			<div class="content"  v-for="(myRule,index) in ques.questionnaire">	
  				  	   		    <p>{{index+':'+myRule}}</p>
  				  	   		</div>	
  				  		</div>
  				  	</div>
  				  </el-tab-pane>
  				  <el-tab-pane label="话术" name="third" style="overflow:auto">
  				  	   <div class="hsinner">
  				  	   		<div class="content"  v-for="(myRule,index) in speech.speak">	
  				  	   		    <p>{{index+':'+myRule}}</p>
  				  	   		</div>	
  				  	   		
  				  	   </div>
  				  		
  				  </el-tab-pane>
  				</el-tabs>
			</template>

		</div>
		<Alert :title="alert.title" :isright="alert.isright" :btntext="alert.btntext" :message="alert.message" :isshow="alert.isshow" @close="close" @sure="sure">
		</Alert>
		 <AlertDetail :title="alert2.title"  :btntext="alert2.btntext" :isshow="alert2.isshow" @close="close2" @sure="sure2">
      <div slot="alert_con">
        <el-row style="color:#666;margin-top:5px;padding-left:20px" v-for="(item,index) in rule" :key="index">
          <el-col :span="1">{{index+1}}：</el-col>
          <el-col :span="23" style="padding-left:3px">{{item}}</el-col>
        </el-row>
      </div>
    </AlertDetail> 	
	</div>
</template>

<script>
import Alert from '../Common/Alert.vue'
import AlertDetail from '../Common/AlertDetail.vue'
	export default{
		name:'details',
		components:{
			Alert,
			AlertDetail
		},
		data(){
		   return{
		   	//tab切换
		   	  activeName:'first',
		   	  isshow:false,
		   	  //返回数据
		   	  data:{
		   	  	"status":"",
		   	  	"project_name": "",
        		"authen":1,   //1:个人 2：企业
        		"type":1, //2 呼入 3 网页 4 APP 5 视频
        		"project_schedule": 0,
          		"grade_ask": 1,      //1表示1级 2 为2级 以此类推
          		"guest_ask": [],
          		"price_success": "" ,
          		"guest_upper_limit1": "",
          		"guest_upper_limit2": "",
          		"week_time":[], // 1 周一  2 周二 以此类推
           		"work_time": [] ,
           		"project_begin_time": " " ,
           		"project_end_time": "2017\/07\/10 " ,
           		"project_rules":[],
           		"Unqualified":[]
		   	  },
		   	  speech:{
		   	  	"speak":""
		   	  },
		   	  ques:{
		   	  	"questionnaire":[]
		   	  },
		   	  showCanDo:false,
      		  state:2,
		   	   alert:{
        		title:'测试',
        		isright:true,
        		message:'消息',
        		isshow:false,
        		btntext:'确认'
      			},
      		  alert2:{
        		title:'项目规则',
        		isshow:false,
        		btntext:'我同意，立即抢单'
      		},
      		 rule:[],
      		 curr_id:''
			}
		},
		created(){
    		this.getMessage();
    		this.getSpeech();
    		this.getQues();
  		},
     mounted:function(){
        console.log(1)
        var that=this
        this.$store.dispatch('defaultIndexAction','/index/work');
        setTimeout(function(){
          that.$store.dispatch('loadingAction',false);
          console.log(that.$store.getters.GetLoading)
        },1000)
        document.getElementById('main_content').scrollTop=0;
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
		 methods:{
		 	handleClick(val){
              console.log(val)
            },
		 	close(){
      			 this.alert.isshow=false
    		},
    		sure(){
    			 this.$router.push({path:'/index/business'})
     			 this.alert.isshow=false
    		},
    		close2(){
                 this.alert2.isshow=false
            },
    		sure2(){
    		  this.get(this.curr_id)
    		  this.alert2.isshow=false
    		},
		 	handleClick(tab,event){
		 		console.log(tab,event)
		 	},
		 	
		 	//项目详情
		 	getMessage(project_id){
		 		var _this = this;
            	this.$http('/yunke/project/details',{project_id}).then(function(res){
            		console.log(res)
            	var d=res.data
                if(d.code==1000){
                   _this.data.status=d.data.status;
                   _this.data.project_name=d.data.project_name;
                   _this.data.authen=d.data.authen;
                   _this.data.type=d.data.type;
                   _this.data.project_schedule=d.data.project_schedule;
                   _this.data.grade_ask=parseFloat(d.data.grade_ask);
                   _this.data.price_success=d.data.price_success;
                   _this.data.guest_upper_limit1=d.data.guest_upper_limit1
                   _this.data.guest_upper_limit2=d.data.guest_upper_limit2
                   _this.data.guest_ask=d.data.guest_ask;
                   _this.data.week_time=d.data.week_time;
                   _this.data.work_time=d.data.work_time;
                   _this.data.project_begin_time=d.data.project_begin_time;
                   _this.data.project_rules=d.data.project_rules;
                   _this.data.Unqualified=d.data.Unqualified;
                   console.log(res.data.data.Unqualified)
                   console.log(res.data.data.status)
                  }
              }).catch(function(error){
                   console.log(error)
              })
		 	},
		 	//项目问卷
		 	getSpeech(project_id){
		 		var _this = this;
            	this.$http('/yunke/project/survey',{project_id}).then(function(res){
            	 
            	 var d=res.data
                if(d.code==1000){
                   _this.speech.speak=d.data.speak;
                 
                  }
              }).catch(function(error){
                   console.log(error)
              })
		 	},
		 	//项目话术
		 	getQues(project_id){
		 	    var _this = this;
            	this.$http('/guzhu/project/speak',{project_id}).then(function(res){
            		console.log(res)
            	 var d=res.data
                if(d.code==1000){
                   _this.ques.questionnaire=d.data.questionnaire;
                  console.log(d.data.questionnaire)
                  }
              }).catch(function(error){
                   console.log(error)
              })
		 	},
      // 云客抢单规则
		 	getrule(project_id){
      			var _this=this;
      			 this.curr_id=project_id;
      			this.$http('/yunke/project/quick_accept',{project_id}).then(function(res){
      			  if(res.data.code==1000){
      			    _this.rule=Object.values(res.data.data.project_rules[0])
      			    _this.alert2.isshow=true;
      			  }
      			},function(err){
      			  console.log(err)
      			})
    		},

    		get(project_id){
      			var _this=this
      			this.$http('/yunke/project/quick_accept',{project_id}).then(function(res){
	        		setTimeout(function(){
	          			if(res.data.code==1000){
	          			  if(res.data.data.status==1){
	          			    _this.alert.title='抢单成功';
	          			    _this.alert.isright=true;
	          			    _this.alert.message='恭喜您抢单成功，点击下面按钮，开始工作 			或者从左侧“工作台”进入执行此订单。';
	          			    _this.alert.btntext='进入工作台，立即工作';
	          			    _this.alert.isshow=true;
	          			  }else{
	          			    _this.alert.title='抢单失败';
	          			    _this.alert.isright=false;
	          			    _this.alert.message='亲，您手慢了，单子已被别人抢光';
	          			    _this.alert.btntext='再逛逛';
	          			    _this.alert.isshow=true;

	          			  }
	          			}
	        		},1000)
      			},function(err){
        				console.log(err)
      			})
    	   },
        seeWhyIn(){
      			this.isshow=true
    		},
    		seeWhyLeave(){
    		  this.isshow=false
    		},
		 }


  }
	

</script>

<style scoped>
	.headerTitleRight{display: flex;align-items: center;justify-content: flex-end;}
	.grid-content span{height: 20px;background-color: #FE9039;border-radius: 3px;font-size: 12px;color:#fff;display: inline-block;text-align: center;line-height: 20px;vertical-align: middle;}
	.grid-content p span:first-child{width: 20px}
	.grid-content p span:nth-child(2){width: 56px}
	.ask{float: right;display: inline-block;width: 12px;height: 12px;line-height: 12px;text-align: center;vertical-align: middle;margin-left:5px;margin-top:10px;border: 1px solid #ccc;font-size: 12px;color: #fff;background: #999;border-radius: 50%;}
	.begin:hover{background: #feb339;border-color: #feb339}
	.font{color: #666}
	.el-rate__icon{color:#FE9039 !important}
	.font span{font-size: 14px}
	.information>span{display: inline-block;color:#7b7b7b;padding: 6px 11px;background-color: #E8E8E8}
	.information span:first-child {margin-right: 10px}
	.information span:last-child {margin-left: 10px}
	.rules{width: 277px;height: 367px;box-sizing: border-box;border:1px solid #E8E8E8;border-radius: 5px;position: absolute;right: 0px;top:15px;}
	.rule-title{height: 38px;background-color: #E8E8E8;text-align: center;line-height:38px;color:#FE9039}
	.inner-rule{width: 233px;height: 254px;margin:37px auto}
	.inner-rule, .wjinner p{font-size: 14px;color: #666;line-height: 28px;padding-right: 20px }
	.wjbox, .hsinner{width: 100%;height: 461px;box-sizing: border-box;border:1px solid #DDD;border-radius: 5px;margin-top: 16px;padding-top: 21px;padding-left: 21px}
	.content p{font-size: 14px;color:#666;line-height: 30px;margin-bottom: 19px}
	.item_danger_col{color: rgb(255,141,124)}
  	.item_danger_bg{background: rgb(255,141,124)}
  	.item_success_col{color: rgb(253,192,111)}
  	.item_success_bg{background: rgb(253,192,111)}
  	.item_disable_col{color: rgb(238,241,241)}
  	.item_disable_bg{background: rgb(238,241,241)}
  	.item_disable_col_col{color: #ccc}
  	.why{position: absolute;right: -15px;bottom: 10px;cursor: pointer;}
    .showWhyWap{height: 562px;position: absolute;left: -270px;top:50px;border-top-left-radius:5px;border-top-right-radius:5px;width: 295px;z-index: 2;background-color: #fff;box-shadow: -2px 0px  3px #EFEEEC,-2px -2px  3px #EFEEEC,2px 2px  3px #EFEEEC}
  	 .triangle{position:absolute;top: -8px;right: 15px;
   			width: 0;
   			height: 0;
   			border-left: 5px solid transparent;
   			border-right: 5px solid transparent;
   			border-bottom: 5px solid #EFEEEC}
   
  	.whyItem{width: 100%;padding-top: 10px;height: 415px;background: #fff;}
  	.whyItem span{line-height: 60px}
  	.whyItem li{display: flex;align-items: center;justify-content: space-between;height: 60px;	width: 100%;color:#9A9691;box-sizing: border-box;padding: 0px 20px;cursor: pointer;}
  	.whyItem .el-button{height: 35px;line-height: 35px;padding: 0px 15px;background: transparent;	color: #9A9691;border-color: #9A9691}
  	.whyItem .el-button:hover{border-color: #FFA65F;color:#FFA65F;}
	.red{color:#FF4F3C;}
</style>