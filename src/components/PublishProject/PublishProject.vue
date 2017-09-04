<template>
  <div @click="is_show_req_wap_con_con=false" class="publishproject" style="margin-bottom:200px">
    <p class="title">
      <span><span></span>项目发布</span>
      <span>
        <i class="el-icon-arrow-left"></i>
        返回首页
      </span>
    </p>
    <div class="item1">
      <p class="tit">您的项目属于什么类型？</p>
      <span v-for="(item,index) in mainData" v-if="Number(index)" class="cate" :class="{'cate_active' : cate_active==index}" @click="change_cate(index)">{{item}}</span>

      <div class="select_1_wap" v-if="cate_active==1">
        <el-select class="select_1" v-model="updata.industry" clearable placeholder="请选择行业类型">
          <el-option
            v-for="(item,index) in mainData.industry"
            :key="index"
            :label="item"
            :value="index">
          </el-option>
        </el-select>
        <el-select class="select_1" v-model="updata.service" clearable placeholder="请选择业务类型">
          <el-option
            v-for="(item,index) in mainData.service"
            :key="index"
            :label="item"
            :value="index">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="item2">
      <p class="tit">用一句简短的话来描述您的项目</p>

      <el-row type="flex">
        <el-col :span="20" style="width:1020px;">
          <el-input v-model="updata.project_name" icon="close" :on-icon-click="clear_name" placeholder="项目名称"></el-input>
        </el-col>
        <el-col :span="4" style="text-align:right;line-height:48px;">
          <span style="color:#e25745;vertical-align:middle">*</span>
          必填
        </el-col>
      </el-row>

      <el-row type="flex" style="margin-top:20px">
        <el-col :span="20" style="width:1020px;">
          <el-input :rows="5" v-model="updata.project_desc" type="textarea" placeholder="项目描述：" resize="none"></el-input>
        </el-col>
        <el-col :span="4" style="text-align:right;line-height:125px;">
          <span style="color:#e25745;vertical-align:middle">*</span>
          必填
        </el-col>
      </el-row>
    </div>

    <div class="item3">
      <p class="tit">告诉我们更多关于项目的信息</p>
      <div class="clouder_request_wap">
        <div class="req_wap_tit_con" @click.stop="is_show_req_wap">
          <span class="s_tit" v-show="updata.gender==null && updata.certify==null && updata.language==null">您对云客的要求</span>

          <el-tag
            @close.stop="handleClose(1)"
            v-if="updata.gender==index"
            v-for="(item,index) in mainData.guest_ask.gender"
            :key="item"
            :closable="true"
            type="danger">
            {{item}}
          </el-tag>
          <el-tag
            @close.stop="handleClose(1)"
            v-if="updata.gender==''"
            :closable="true"
            type="danger">
            不限性别
          </el-tag>

          <el-tag
            @close.stop="handleClose(2)"
            v-if="updata.certify==index"
            v-for="(item,index) in mainData.guest_ask.certify"
            :key="item"
            :closable="true"
            type="danger">
            {{item}}
          </el-tag>
          <el-tag
            @close.stop="handleClose(2)"
            v-if="updata.certify==''"
            :closable="true"
            type="danger">
            不限学历
          </el-tag>

          <el-tag
            @close.stop="handleClose(3)"
            v-if="updata.language==index"
            v-for="(item,index) in mainData.guest_ask.language"
            :key="item"
            :closable="true"
            type="danger">
            {{item}}
          </el-tag>
          <el-tag
            @close.stop="handleClose(3)"
            v-if="updata.language==''"
            :closable="true"
            type="danger">
            不限语言
          </el-tag>


          <i class="el-icon-caret-bottom"></i>
        </div>
        <transition name="fade">
          <div class="req_wap_con_con" @click.stop="" v-show="is_show_req_wap_con_con">
            <el-row style="margin:20px 0px">
              <el-col :span="6" style="color:#464646;padding-left:10px">
                性别要求
              </el-col>
              <el-col :span="18">
               
                <span @click="change_some(1,index)" v-for="(item,index) in mainData.guest_ask.gender" :class="{'req_wap_con_con_active':updata.gender==index}">{{item}}</span>
                <span @click="change_some(1,'')" :class="{'req_wap_con_con_active':updata.gender==''}">不限</span>

             
              </el-col>
            </el-row>
            <el-row style="margin:20px 0px">
              <el-col :span="6" style="color:#464646;padding-left:10px">
                学历要求
              </el-col>
              <el-col :span="18">

                <span @click="change_some(2,index)" v-for="(item,index) in mainData.guest_ask.certify" :class="{'req_wap_con_con_active':updata.certify==index}">{{item}}</span>
                <span @click="change_some(2,'')" :class="{'req_wap_con_con_active':updata.certify==''}">不限</span>

              </el-col>
            </el-row>
            <el-row style="margin:20px 0px">
              <el-col :span="6" style="color:#464646;padding-left:10px">
                语言要求
              </el-col>
              <el-col :span="18">

                <span @click="change_some(3,index)" v-for="(item,index) in mainData.guest_ask.language" :class="{'req_wap_con_con_active':updata.language==index}">{{item}}</span>
                <span @click="change_some(3,'')" :class="{'req_wap_con_con_active':updata.language==''}">不限</span>

              </el-col>
            </el-row>
          </div>
        </transition>  
      </div>
      <div style="margin-top:100px">
        <el-date-picker
          v-model="date_val"
          type="daterange"
          @change="change_date"
          placeholder="选择项目日期">
        </el-date-picker>

        <el-select v-model="updata.week" multiple placeholder="请选择">
          <el-option
            v-for="item in weekOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-time-picker
          is-range
          v-model="time_val"
          @change="change_time"
          placeholder="选择时间范围">
        </el-time-picker>

        <el-select clearable  v-model="updata.num_people" placeholder="请选择">
          <el-option
            v-for="item in personOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <el-row style="margin-top:20px;cursor:pointer">
        <input type="file" ref="file_input" name="" @change="file_input_change" style="display:none">
        <el-col :span="8" class="upload_left" @click.native="upfile" style="height:100px;background:#f4f4f4;border-radius:5px;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#666">
          <span class="jia">+</span>
          <span>点击添加文件</span>
        </el-col>
        <el-col :span="16" class="upload_right" style="padding-left:40px;display:flex;flex-direction:column;justify-content:center;height:100px">
          <p>外呼号码点击<span style="color:#ff7a59;cursor:pointer">下载Excel</span> 模板。</p>
          <p style="margin-top:5px">其它包括：业务问卷、项目话术、常见问题、录音小样、项目培训视频、云客考核试题等。</p>
        </el-col>
      </el-row>

      <ul>
        <li v-for="(item,index) in updata_list" :key="index" style="display:flex;height:60px;align-items:center">
          <img src="./img/updata_icon.png">
          <span style="font-size:16px;color:#464646;margin-left:5px;margin-right:40px">{{item.file_name}}({{item.file_size}}kb)</span>
          <el-progress style="width:500px" :show-text="false" :percentage="item.file_progress"></el-progress>
          <i class="el-icon-delete" style="color:rgb(255, 122, 89);cursor:pointer;margin-left:30px;font-size:18px"></i>
        </li>
      </ul>
    </div>


    <div class="item4">
      <p class="tit">您的预算是多少？</p>
      <el-select class="select_1" v-model="updata.project_budget" clearable placeholder="请选择行业类型">
        <el-option
          v-for="(item,index) in mainData.budget"
          :key="index"
          :label="item"
          :value="index">
        </el-option>
      </el-select>
    </div>

    <div class="item5">
      <p class="tit">是否需要增值服务？（可多选）</p>
      <ul class="add_list">
        <li v-if="Object.values(mainData.add_service).length>2" style="justify-content:space-between;">
          <span class="square" @click="add_service(1)">
            <img v-show="updata.service_add.indexOf(1)!=-1" style="width:15px;height:15px;margin-left:5px;margin-top:5px;" src="./img/dui.png">  
          </span>
          <img style="margin:0px 10px" src="./img/kd.png">
          <div style="display:flex;flex-direction:column;justify-content:space-around;">
            <span class="name" v-for="(item,index) in add_service_name_arr" :key="index" style="margin:5px 0px">
            {{item}}
            </span>
          </div>
          
          <div class="con" style="margin-right:250px;margin-left:33px">
            <div v-html="Object.values(mainData.add_service)[0]"></div>
          </div>
        </li>
        <li v-for="(item,index) in add_service_name_arr" :key="index">
          <div style="display:flex;align-items:center;width:50px;justify-content:space-between">
            <span class="square" @click="add_service(index+2)">
              <img v-show="updata.service_add.indexOf(index+2)!=-1" style="width:15px;height:15px;margin-left:5px;margin-top:5px;" src="./img/dui.png">  
            </span>
            <img src="./img/k.png">
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;width:700px;margin-left:20px">
            <span class="name">
              {{item}}
            </span>
            <div class="con">
              <div v-html="add_service_content_arr[index]"></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    
    <p class="publish_now" @click="publish_now">立即发布项目</p>
  </div>               
</template>

<script>
     
      export default {
        name:'publishproject',
        components:{
        
        },
        data() {
          return {
            updata_list:[
             
            ],
            is_show_req_wap_con_con:false,
            date_val:'',
            time_val:'',
            personOption:[
              {
                value:'100',
                label:'限100人'
              },
              {
                value:'80',
                label:'限80人'
              },
              {
                value:'60',
                label:'限60人'
              },
              {
                value:'40',
                label:'限60人'
              }
            ],
            weekOptions:[
              {
                value:'1',
                label:'周一'
              },
              {
                value:'2',
                label:'周二'
              },
              {
                value:'3',
                label:'周三'
              },
              {
                value:'4',
                label:'周四'
              },
              {
                value:'5',
                label:'周五'
              },
              {
                value:'6',
                label:'周六'
              },
              {
                value:'7',
                label:'周日'
              }
            ],
            cate_active:'',
            mainData:{
              add_service:[],
              guest_ask:{
                certify:{},
                language:{}
              }
            },
            updata:{
              type_name:'',
              industry:'',
              service:'',
              project_name:'',
              project_desc:'',
              gender:null,
              certify:null,
              language:null,
              date_begin:'',
              date_end:'',
              week:'',
              num_people:'',
              project_budget:'',
              service_add:[],
            },
            add_service_name_arr:[],
            add_service_content_arr:[]
          };
        },
        created(){
          this.getData()
        },
        computed: {

        },
        methods: {
          upfile(){
            this.$refs.file_input.click()
          },
          file_input_change($event){
            if($event.target.files[0]){
              let eve=$event.target.files[0]
              let push_obj={file_name:eve.name,file_size:(eve.size/1024).toFixed(2),file_progress:0}
              this.updata_list.push(push_obj)
            }
          },
          handleClose(tag){
            if(tag==1){
              this.updata.gender=null
            }else if(tag==2){
              this.updata.certify=null
            }else{
              this.updata.language=null
            }
          },
          is_show_req_wap(){
            this.is_show_req_wap_con_con=!this.is_show_req_wap_con_con
          },
          change_cate(cate_active){
            if(cate_active==this.cate_active) return;
            this.updata.type_name=cate_active;
            this.cate_active=cate_active;
            if(cate_active!=1){
              this.updata.industry=''
              this.updata.service=''
            }
          },
          change_some(cate,index){
            if(cate==1){
              this.updata.gender=index;
            }else if(cate==2){
              this.updata.certify=index;
            }else{
              this.updata.language=index;
            }
          },
          add_service(index){
           
            let add_service_set=new Set(this.updata.service_add);

            if(index==1){
              if(add_service_set.has(index)){
                add_service_set.clear();
              }else{
                add_service_set.clear();
                add_service_set.add(1)
              }
              
            }else if(index!=1){
              if(add_service_set.has(1)){
                add_service_set.delete(1)
              }
              if(add_service_set.has(index)){
                add_service_set.delete(index)
              }else{
                add_service_set.add(index)
              }
            }            

            if(Object.keys(this.mainData.add_service).length<2 && add_service_set.size>=1){
              add_service_set.clear();
              add_service_set.add(1)
            }
            this.updata.service_add=Array.from(add_service_set)
          },
          change_date(val){
            this.updata.date_begin=val.slice(0,10);
            this.updata.date_end=val.slice(13);
          },
          change_time(val){
            if(val==undefined){
              this.updata.time_from=''
              this.updata.time_to=''
              return;
            }
            this.updata.time_from=val.slice(0,5);
            this.updata.time_to=val.slice(11,16);
          },
          clear_name(){
            this.updata.project_name=''
          },
          getData(){
            let _this=this;
            this.$http('/guzhu/project/publish_type').then(function(res){
              if(res.data.code==1000){
                _this.mainData=res.data.data;
                _this.add_service_name_arr=Object.keys(_this.mainData.add_service);
                _this.add_service_content_arr=Object.values(_this.mainData.add_service);
               
                if(_this.add_service_name_arr.length>2){
                  _this.add_service_name_arr=_this.add_service_name_arr.slice(1);
                  _this.add_service_content_arr=_this.add_service_content_arr.slice(1);
                }
                console.log(_this.add_service_name_arr)
              }
              
            },function(err){
              console.log(err)
            })
          },
          publish_now(){
            let _this=this;
            if(this.updata.project_name==''){
              this.$message({
                message: '项目名称不能为空',
                type: 'warning'
              });
              return;
            }
            if(this.updata.project_desc==''){
              this.$message({
                message: '项目描述不能为空',
                type: 'warning'
              });
              return;
            }
            if(this.updata.gender==null){
              this.$message({
                message: '性别要求不能为空',
                type: 'warning'
              });
              return;
            }
            if(this.updata.certify==null){
              this.$message({
                message: '学历要求不能为空',
                type: 'warning'
              });
              return;
            }
            if(this.updata.language==null){
              this.$message({
                message: '语言要求不能为空',
                type: 'warning'
              });
              return;
            }

            this.$http('/guzhu/project/project_release',_this.updata).then(function(res){
              if(res.data.code==1000){
                _this.$message({
                  message: '项目发布成功',
                  type: 'success'
                });
                setTimeout(function(){
                  _this.$router.push({path:'/index/projectlist'})
                },1000)
              }else{
                _this.$message({
                  message: res.data.error,
                  type: 'warning'
                });
              }
            },function(err){
              console.log(err)
            })
          }
        },
        mounted(){
          this.$store.dispatch('defaultIndexAction','2');
        }
    }
</script>
 
<style scoped>
  .title{font-size: 20px;color: #313131;display: flex;height: 85px;align-items: center;justify-content: space-between;background: white;padding: 0px 30px;}
  .title>span:nth-child(1)>span{display: inline-block;width: 5px;height: 18px;background: #ff944e;margin-right: 10px;vertical-align: center;position: relative;top: 2px}
  .title>span:nth-child(2) i{color: #313131;margin-left: 5px}
  .title>span{cursor: pointer;}

  .item1,.item2,.item3,.item4,.item5{padding: 30px 30px 30px;margin-top: 20px;background: white;position: relative;}
  .item1 .tit,.item2 .tit,.item3 .tit,.item4 .tit,.item5 .tit{font-size: 16px;color: #464646;border-bottom: 1px solid #ddd;padding-bottom: 15px;margin-bottom: 30px;}
  .item1 .cate,.req_wap_con_con span{width: 90px;height: 35px;line-height: 35px;border: 1px solid #eee;font-size: 16px;color: #999;line-height: 35px;text-align: center;display: inline-block;margin-left: 15px;cursor: pointer;}
  .item1 .cate:nth-child(2){margin-left: 0px!important;}
  .req_wap_con_con span{border-color: #ddd}
  .cate_active,.req_wap_con_con_active{color: white!important;background: #ff944e;border:1px solid #ff944e!important;}


  .select_1_wap{margin-top:40px}
  .select_1{width: 1020px;margin-bottom: 25px;border-radius: 0px;}
  .select_1:nth-child(2){margin-bottom: 0px}

  .jia{width:25px;height:25px;background:#ffac52;display:inline-block;border-radius:100%;text-align:center;line-height:25px;color:white;margin-bottom: 5px;}

  .add_list .square{width:25px;height:25px;display:flex;border:1px solid #ddd;border-radius:2px;cursor:pointer}
  .add_list li{display: flex;width: 1020px;height: 100px;align-items: center;}
  .add_list .kh{color: #999}
  .add_list .name{display: inline-block;border: 1px solid #eee;color: #999;padding: 5px 20px}
  .add_list .con{background: #f4f4f4;border: 1px solid #ddd;width: 500px;padding: 20px;}

  .publishproject .clouder_request_wap{width: 1020px;margin-bottom: 20px;border: 1px solid #bfcbd9;position: absolute;left: 31px;top: 100px;z-index: 2}
  .clouder_request_wap .req_wap_tit_con{height: 35px;background:#f4f4f4;cursor: pointer;padding-left: 10px;padding-top: 10px;}
  .clouder_request_wap .req_wap_tit_con .s_tit{color: #999;}
  .clouder_request_wap .req_wap_tit_con i{color: #bfcbd9;transition: all .3s;float: right;margin-right: 10px;line-height: 35px;}
  .clouder_request_wap .req_wap_con_con{border-top: 1px solid #bfcbd9;background: #f4f4f4;overflow:hidden;}
  .publish_now{width: 150px;height: 42px;line-height: 42px;border:1px solid #ff7a59;background: linear-gradient(to right, #ff9a4c , #ff7a59);text-align: center;margin-left: 20px;color: white;font-size: 14px;cursor: pointer;border-radius: 2px;margin: 60px auto 0px;}


  .fade-enter-active, .fade-leave-active {
    transition: height .3s
  }
  .fade-enter, .fade-leave-to {
    height: 0
  }
  .fade-leave, .fade-enter-to {
    height: 193px
  }
</style>

<style type="text/css">
  .publishproject .select_1_wap .el-input__inner,.item2 .el-input__inner,.item4 .el-input__inner{border-radius: 0px;height: 48px;background: #f4f4f4;color: #999}
  .publishproject .item2 .el-textarea__inner{background: #f4f4f4;border-radius: 0px}
  .publishproject .item3 .el-input__inner{background: #f4f4f4;border: none}
</style>
