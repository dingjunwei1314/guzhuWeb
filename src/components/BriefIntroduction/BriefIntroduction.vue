<template>

  <div class="nocall">
    <p class="title" style="font-size:20px!important">
      <span><span></span>{{infoData.project_name}}</span>
      <span  class="enter_btn" style="border-bottom:1px solid #ff7a59" v-if="$route.query.project_status==2">
        正在进行
      </span>
      <span  class="enter_btn" v-if="$route.query.project_status==6">
        已结算
      </span>
    </p>
    <div class="content1">
      <div class="tit_wap">
        <span class="enter_btn" @click="clickTab(1)" :class="{'enter_btn_active':active_page==1}">项目简介</span><span class="enter_btn" @click="clickTab(2)" :class="{'enter_btn_active':active_page==2}" style="border-left:none" >项目问卷</span><span style="border-left:none" class="enter_btn" @click="clickTab(3)" :class="{'enter_btn_active':active_page==3}" >项目话术</span>
      </div>

      <div style="margin-top:30px;color:#4646464;font-size:14px;" v-show="active_page==1">
        <p>项目进度</p>
        <el-progress  
        :show-text="true" 
        :stroke-width="12" 
        :percentage="infoData.percentage" style="width:680px;margin-top:5px"></el-progress>
        <p style="margin-top:30px;margin-bottom:15px">云客要求</p>

        <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-if="infoData.guest_ask[0].gender.male==1">男</el-tag>
        <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-else>女</el-tag>
        <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-if="infoData.guest_ask[0].language.chinese==1">普通话</el-tag>
        <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-else>英语</el-tag>
        <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-if="infoData.guest_ask[0].certify.junior==1">高中以下</el-tag>
        <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-else-if="infoData.guest_ask[0].certify.senior==1">高中</el-tag>
        <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-else-if="infoData.guest_ask[0].certify.college==1">专科</el-tag>
        <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-else-if="infoData.guest_ask[0].certify.bachelor==1">本科</el-tag>
        <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-else="infoData.guest_ask[0].certify.master==1">本科以上</el-tag>
        <div style="width:650px;text-indent:100px!important;margin-top:20px">
          <el-row style="border-top:1px solid #eee;border-left:1px solid #eee;border-right:1px solid #eee;height:34px;line-height:34px">
            <el-col :span="12">
              结算标准                                                           
            </el-col>
            <el-col :span="12">
              {{infoData.price_success}}
            </el-col>
          </el-row>
          <el-row style="border-top:1px solid #eee;border-left:1px solid #eee;border-right:1px solid #eee;height:34px;line-height:34px;background:#f9f9f9">
            <el-col :span="12">
              云客上限
            </el-col>
            <el-col :span="12">
              {{infoData.project_schedule}} </span>/<span> {{infoData.guest_upper_limit}} </span>
            </el-col>
          </el-row>
          <el-row style="border-top:1px solid #eee;border-left:1px solid #eee;border-right:1px solid #eee;height:34px;line-height:34px">
            <el-col :span="12">
              工作时间                                                                
            </el-col>
            <el-col :span="12">
              <p style="margin-bottom:0px"   v-if="infoData.week_time.length==Math.max(...infoData.week_time)-Math.min(...infoData.week_time)+1&&infoData.week_time.length!=1">
              周
              <span v-if="Math.min(...infoData.week_time)==1">一</span>
              <span v-else-if="Math.min(...infoData.week_time)==2">二</span>
              <span v-else-if="Math.min(...infoData.week_time)==3">三</span>
              <span v-else-if="Math.min(...infoData.week_time)==4">四</span>
              <span v-else-if="Math.min(...infoData.week_time)==5">五</span>
              <span v-else="Math.min(...infoData.week_time)==6">六</span>
              至 周
              <span v-if="Math.max(...infoData.week_time)==2">二</span>
              <span v-else-if="Math.max(...infoData.week_time)==3">三</span>
              <span v-else-if="Math.max(...infoData.week_time)==4">四</span>
              <span v-else-if="Math.max(...infoData.week_time)==5">五</span>
              <span v-else-if="Math.max(...infoData.week_time)==6">六</span>
              <span v-else="Math.max(...infoData.week_time)==7">日</span>  
              </p>
              <p v-else>
                周
                <span v-if="infoData.week_time.indexOf(1)!=-1">一</span>
                <span v-if="infoData.week_time.indexOf(2)!=-1">二</span>
                <span v-if="infoData.week_time.indexOf(3)!=-1">三</span>
                <span v-if="infoData.week_time.indexOf(4)!=-1">四</span>
                <span v-if="infoData.week_time.indexOf(5)!=-1">五</span>
                <span v-if="infoData.week_time.indexOf(6)!=-1">六</span>
                <span v-if="infoData.week_time.indexOf(7)!=-1">日</span>
            </p>
            </el-col>
          </el-row>
          <el-row style="border-top:1px solid #eee;border-left:1px solid #eee;border-right:1px solid #eee;height:34px;line-height:34px;;background:#f9f9f9">
            <el-col :span="12">
              启动时间                                                                
            </el-col>
            <el-col :span="12">
              {{infoData.project_begin_time}} 
            </el-col>
          </el-row>

          <el-row style="border-top:1px solid #eee;border-left:1px solid #eee;border-right:1px solid #eee;border-bottom:1px solid #eee;height:34px;line-height:34px">
            <el-col :span="12">
              截止时间                                                                   
            </el-col>
            <el-col :span="12">
               {{infoData.project_end_time}}
            </el-col>
          </el-row>
        </div>
        <p style="margin-top:30px;margin-bottom:15px">  云客要求</p>
        <el-row style="padding:5px 20px;width:680px;color:#999" v-for="(item,index) in infoData.project_rules" :key="index">
          <el-col :span="2" style="line-height:25px">{{index+1}}：</el-col>
          <el-col :span="22" style="line-height:25px">{{item}}</el-col>
        </el-row>
      </div>

      <div style="margin-top:30px;color:#4646464;font-size:14px;" v-show="active_page==2">
        <div class="wjbox">
          <div class="wjinner">
            <div class="content"  v-for="(myRule,index) in ques.questionnaire"> 
              <p>{{index+'&nbsp:&nbsp'+myRule}}</p>
            </div>  
          </div>
        </div>  
      </div>

      <div style="margin-top:30px;color:#4646464;font-size:14px;" v-show="active_page==3">
        <div class="hsinner">
          <div class="content"  v-for="(myRule,index) in speech.speak"> 
            <p>{{index+'&nbsp:&nbsp'+myRule}}</p>
          </div>  
        </div>
      </div>
    </div>
  </div>               
</template>

<script>
      import exportExcel from '../../common/exportExcel'
      export default {
        name:'noCall',
        components:{
        
        },
        data() {
          return {
            active_page:1,
            infoData:{
              authen:'',  
              type:'', 
              project_schedule:'',
              grade_ask: 1,    
              guest_ask: [{
                certify:'',  
                language:'', 
                gender:'',
              }],
              price_success:'',
              guest_upper_limit:'',
              week_time:[1,2,3], 
              work_time: [{
                begin_time :'',
                end_time : ''
              }],
              project_begin_time: '',
              project_end_time:'',
              project_rules:[],
            },
            speech:{
            "speak":[]
            },
            ques:{
              "questionnaire":[]
            },
          };
        },
        created(){
          this.getinfoData();
        },
        computed: {
         
        },
        methods: {
          clickTab(index){
            if(this.active_page==index) return;
            this.active_page=index;
            if(index==2 && this.ques.questionnaire.length==0){
              this.getQues();
            }else if(index==3 && this.speech.speak.length==0){
              this.getSpeech();
            }
          },
          getinfoData(){
            let _this=this;
            this.$http('/yunke/project/details',{project_id:_this.$route.query.project_id}).then(function(res){
              if(res.data.code==1000){
                _this.infoData=res.data.data;
                _this.infoData.grade_ask=Number(_this.infoData.grade_ask)
                _this.infoData.project_rules=Object.values(_this.infoData.project_rules[0])
              }
              
            },function(err){
              console.log(err)
            })
          },
          getTab1Data(){
            let _this=this;
            this.$http('/project/details',{project_id:_this.$route.query.project_id}).then(function(res){
              if(res.data.code==1000){
                _this.tab1Data=res.data.data
                _this.tab1Data.grade_ask=Number(_this.tab1Data.grade_ask)
                _this.tab1Data.project_rules=Object.values(_this.tab1Data.project_rules[0])
              }
            },function(err){
              console.log(err)
            })
          },
        
          //项目问卷
          getSpeech(project_id){
            var _this = this;
            this.$http('/guzhu/project/speak',{project_id}).then(function(res){
             
             var d=res.data
              if(d.code==1000){
                 _this.speech.speak=d.data.speak;
               
                }
            }).catch(function(error){
                 console.log(error)
            })
          },
          //话术
          getQues(project_id){
            var _this = this;
            this.$http('/yunke/project/survey',{project_id}).then(function(res){
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
        
          exportToExcel(){
            var name='数据表',
                theader=['客户电话', '导入日期'],
                filterVal=['phone', 'import_date'],
                data='';
        
              data=this.show_table_data.list;
              if(this.show_table_data.list.length>0){
                exportExcel(name,theader,filterVal,data)
              }else{
                this.$message({
                  type: 'info',
                  message: '没有数据'
                });
              }
            
            
          },
        },
        mounted(){
          let _this=this;
          this.$store.dispatch('defaultActiveAction','/index/projectCenter/briefIntroduction');
        }
    }
</script>
 
<style scoped>  
  .nocall{padding: 20px;}
  .title{font-size: 20px;color: #313131;display: flex;height: 60px;align-items: center;justify-content: space-between;margin-bottom: 30px}
  .title>span>span{display: inline-block;width: 5px;height: 18px;background: #ff944e;margin-right: 10px;vertical-align: center;position: relative;top: 2px}
  .enter_btn{width: 120px;height: 40px;display: inline-block;border: 1px solid #ff7a59;text-align: center;line-height: 40px;color: #ff7a59;font-size: 14px;border-bottom: none;cursor: pointer;}
  .enter_btn_active{background: #ff7a59;color: white!important}
  .content1{background: white;padding:30px;}

  .tit_wap{border-bottom: 1px solid #ff7a59;}
  .wjbox, .hsinner{width: 100%;height: 461px;box-sizing: border-box;border-radius: 5px;margin-top: 16px;padding-top: 21px;padding-left: 21px}
  .content p{font-size: 14px;color:#666;line-height: 30px;margin-bottom: 19px}
</style>
<style>
 /*.content1 .el-input__icon{color: #ff7a59;right: 20px;font-size: 20px}*/
 .content1 .el-table th>.cell{text-align: center;background: white}
 .content1 .el-table th{background: white}
 .content1 .el-table .cell, .el-table th>div{text-align: center;}
 .el-progress-bar__inner{background: #ff7a59}
</style>

