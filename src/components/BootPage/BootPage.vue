<template>
  <div class="bootpage">
    <img class="logo" src="./img/logo.png">
    <span class="close ui-sys-bar1" @click="close">X</span>
    <div class="step1" v-show="showWhichData.step1">
      <p>云客在家是致力于培养专业客服，并为云客赚取收入的平</p>
      <p>台。下面将了解你的一些个人信息，请如实填写，以便</p>
      <p>我们为你安排有针对性的服务。</p>

      <el-button type="success" class="begin ui-sys-bar1" @click="enterStep2">马上开始</el-button>
      <p>本过程预计耗费3分钟</p>
    </div>
    <div class="step2" v-show="showWhichData.step2">
      <p>你是否有过客服工作经验？</p>
      <span @click="enterStep3(true)" class='ui-sys-bar1'>是</span>
      <span @click="enterStep3(false)" class='ui-sys-bar1'>否</span>
    </div>
    <div class="step3" v-show="showWhichData.step3">
      <p class="title" style="margin-bottom:80px">请描述你的工作经验</p>
      <el-row style="margin:0px 100px">
        <el-col :span="4">
          <p class="left">工作年限</p>
        </el-col>
        <el-col :span="18">  
          <el-slider
          class='ui-sys-bar1'
            :min='workTimeMin'
            :max='workTimeMax'
            v-model="data.work_term"
            :step="workTimeStep">
          </el-slider>
        </el-col> 
        <el-col :span="2">
          <p class="left">{{data.work_term}}年</p>
        </el-col> 
      </el-row>
      <el-row style="margin:0px 100px;margin-top:30px">
        <el-col :span="4">
          <p class="left">经验占比</p>
        </el-col>
        <el-col :span="20" style="position:relative">  
          <span style="position:absolute;left:0;top:-20px;color:#666">外呼{{data.work_proportion}}年</span>
          <span style="position:absolute;right:0;top:-20px;color:#666">呼入{{data.work_term-data.work_proportion}}年</span>
          <el-slider
          class='ui-sys-bar1'
            :min="workTimeMinOneMin"
            :max="data.work_term"
            v-model="data.work_proportion"
            :step="workTimeStepOne">
          </el-slider>
        </el-col>  
      </el-row>
      <el-row style="margin:0px 100px">
        <el-col :span="4">
          <p class="left">专长领域</p>
        </el-col>
        <el-col :span="20" class="checkWap ui-sys-bar1" style="margin-top:6px;text-align:left"> 
          <el-checkbox-group v-model="data.work_specialty">
            <el-checkbox label="营销"></el-checkbox>
            <el-checkbox label="调研"></el-checkbox>
            <el-checkbox label="催缴"></el-checkbox>
            <el-checkbox label="回访"></el-checkbox>
            <el-checkbox label="投诉"></el-checkbox>
            <el-checkbox label="质检"></el-checkbox>
            <el-checkbox label="管理"></el-checkbox>
          </el-checkbox-group> 
        </el-col>  
      </el-row>
      <el-button class="back ui-sys-bar1" @click="backToStep2">返回</el-button>
      <el-button type="primary" class="next ui-sys-bar1" @click="enterStep4">下一步</el-button>
    </div>
    <div class="step4" v-show="showWhichData.step4">
      <p>你打算在云客在家兼职还是全职？</p>
      <span @click="enterStep5(true)">兼职</span>
      <span @click="enterStep5(false)">全职</span>
    </div>

    <div class="step3 step5" v-show="showWhichData.step5">
      <p class="title" style="margin-bottom:50px">你的空闲时间是？</p>
      <el-row style="margin:0px 100px" class='ui-sys-bar1'>
        <el-col :span="6">
          <p class="left">一周空闲时间</p>
        </el-col>
        <el-col :span="18" class="checkDayWap ui-sys-bar1" style="margin-top:6px;text-align:left"> 
          <el-checkbox-group v-model="data.week_idle">
            <el-checkbox label="周一"></el-checkbox>
            <el-checkbox label="周二"></el-checkbox>
            <el-checkbox label="周三"></el-checkbox>
            <el-checkbox label="周四"></el-checkbox>
            <el-checkbox label="周五"></el-checkbox>
            <el-checkbox label="周六"></el-checkbox>
            <el-checkbox label="周日"></el-checkbox>
          </el-checkbox-group>  
        </el-col> 
      </el-row>
      <el-row style="margin:0px 100px;margin-top:50px">
        <el-col :span="6">
          <p class="left">一天空闲时间</p>
        </el-col>
        <el-col :span="15">  
          <el-slider
          class='ui-sys-bar1'
            :min="workTimeOneDayMin"
            :max="workTimeOneDayMax"
            v-model="data.day_idle"
            :step="workTimeStepDay">
          </el-slider>
          
        </el-col> 
        <el-col :span="3">
          <span class="left">{{data.day_idle}}h</span>
        </el-col> 
      </el-row> 
      
      <el-button class="back ui-sys-bar1" @click="backToStep4">返回</el-button>
      <el-button type="primary" class="next ui-sys-bar1" @click="enterStep6">下一步</el-button>
    </div>

    <div class="step3 step6" v-show="showWhichData.step6">
      <p class="title" style="margin-bottom:80px">你愿意承接多少金额的项目？</p>
      <el-row style="margin:0px 100px;margin-top:50px;">
        <el-col :span="6">
          <p class="left">平均时薪</p>
        </el-col>
        <el-col :span="15">  
          <el-slider
          class='ui-sys-bar1'
            :min="hourlyWageMin"
            :max="hourlyWageMax"
            v-model="data.hour_expect"
            :step="hourlyWageStep">
          </el-slider>
        </el-col>
        <el-col :span="3">
          <span class="left">{{data.hour_expect}}元</span>
        </el-col>  
      </el-row> 
      <el-row style="margin:0px 100px;margin-top:10px;margin-bottom:90px;">
        <el-col :span="6">
          <p class="left">月收入约</p>
        </el-col>
        <el-col :span="18" class="checkDayWap" style="margin-top:-12px;text-align:left;color:#fe9039">  
          <span>￥</span>
          <span style="font-size:34px;">{{(data.week_idle.length)*data.day_idle*data.hour_expect*4}}</span>         
        </el-col> 
      </el-row>
      
      
      <el-button class="back ui-sys-bar1" @click="backToStep5">返回</el-button>
      <el-button type="primary" class="next ui-sys-bar1" @click="enterStep7">下一步</el-button>
    </div>

    <div class="step3 step7" v-show="showWhichData.step7">
      <p class="title " style="margin-bottom:50px">请填写你的自我评价</p>
      <el-input type="textarea" resize="none" placeholder="你的技能、优点、项目经验" v-model="data.introduce" :rows="rows" style="width:420px;display:block;margin:0 auto;resize:none" class='ui-sys-bar1'></el-input>
      <el-button class="back ui-sys-bar1" @click="backToStep6">返回</el-button>
      <el-button type="primary" class="next ui-sys-bar1" @click="enterStep8">下一步</el-button>
      <el-button type="text" style="color:#999" class='ui-sys-bar1' @click="enterStep8">跳过</el-button>
    </div>


    <div class="step3 step8" v-show="showWhichData.step8">
      <p class="title" style="margin-bottom:50px">感谢你的配合，实名认证后即可开启云客之旅！</p>
      <el-row style="width:620px;margin:0 auto">
        <el-col :span="16">
          <el-form :label-position="labelPosition" label-width="100px" class='ui-sys-bar1' :model="formLabelAlign" :rules="rule1" ref="formLabelAlign">
            <el-form-item label="身份证姓名" prop="name">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="identify_code">
              <el-input v-model="formLabelAlign.identify_code"></el-input>
            </el-form-item>
            <el-form-item class="up" label="手持身份证 上传">
              <el-row style="padding-top:10px">
                <el-col :span="12" style="margin-left:-2px;height:108px;overflow:hidden">
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="Photo_address" alt="">
                  </el-dialog>
                </el-col>
                <el-col :span="12" style="text-align:left!important">
                  <span style="color:#666!important;font-size:12px!important;line-height:20px!important;display:inline-block;width:165px">五官可见、证件全部信息清晰无遮挡、完全露出手臂、图片大小不要超过5M，支持jpg bmp .png .gif格式，我们将妥善保管您的照片</span>  
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="8">
          <img src="./img/demo.png" style="width:170px;height:220px">
        </el-col>

      </el-row>
      
      <el-button type="primary" class="next ui-sys-bar1" style="margin-top:0px;margin-left:-190px" @click="enterStep9">提交</el-button>
      <el-button class="back ui-sys-bar1" @click="backToHome" style="margin-top:0px">稍后认证</el-button>
      
      
    </div>
  </div>                 
</template>

<script>
     export default {
        name:'bootpage',
        data() {
            //验证姓名
            var validateName = (rule, value, callback) => {
              var regExp=/^[\u4e00-\u9fa5]{2,4}$/;
                if (value === '') {
                    callback(new Error('请输入名字'));
                }else if(regExp.test(value) === false){
                    callback(new Error('请输入正确的名字'))
                } else {
                    callback();
                }
            };
            //验证身份证号码
            var validateIdentity = (rule, value, callback) => {
            var regExp=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|(3[0-1]))\d{3}(\d|x)$/;
                if (value === '') {
                    callback(new Error('请输入身份证号'));
                }else if (regExp.test(value) === false) {
                    callback(new Error('请输入正确的身份证号码'))
                } else {
                    callback();
                }
            };
          return {
            rows:10,
            showWhichData:{
              step1:true,
              step2:false,
              step3:false,
              step4:false,
              step5:false,
              step6:false,
              step7:false,
              step8:false,
            },
            cheeked:false,
            cheekedDay:'',  
            data:{
              user_token:false,
              work_term:1,
              work_proportion:0,
              work_specialty:[],
              work_divide:'',
              week_idle:[],
              day_idle:1,
              hour_expect:5,
              introduce:'',
              // name: '',
              // identify_code: '',
              // type: '',
              
            },
            workTimeMin:0.5,
            workTimeMax:10,
            workTimeOneDayMin:1,
            workTimeOneDayMax:12,
            hourlyWageMin:5,
            hourlyWageMax:50,
            workTimeStep:.5,
            workTimeMinOneMin:0,
            workTimeStepOne:.5,
            workTimeStepDay:1,
            hourlyWageStep:5,
            labelPosition: 'left',
            formLabelAlign: {
              name: '',
              identify_code: '',
              type: '',
              Photo_address: '',
            },
            rule1:{
              name: [
                  { validator:validateName , trigger: 'blur' }
              ],
              identify_code: [
                  { validator:validateIdentity , trigger: 'blur' }
              ],
            },
            Photo_address: '',
            dialogVisible: false,
          };
        },
        created(){
          //初始化请求
          //
          //客户端尺寸
          // if (typeof hostEditor != 'undefined')
          //   {
          //     hostEditor.southTelWindowSetSize('800','464');
          //   }
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

          showWhich(j){
            for(var i in this.showWhichData){
              if(i=='step'+j){
                this.showWhichData[i]=true;
              }else{
                this.showWhichData[i]=false;
              }  
            }
          },
          enterStep2(){
            this.showWhich(2)
          },
          enterStep3(choice){
            if(choice){
              this.data.user_token=true;
              this.showWhich(3)
            }else{
              this.data.user_token=false;
              this.showWhich(4)
            }
          },
          enterStep4(){
            this.showWhich(4)
          },
          backToStep2(){
            this.showWhich(2)
          },
          enterStep5(choice){
            if(choice){
              this.data.work_divide=true;
              this.showWhich(5)
            }else{
              this.data.work_divide=false;
              this.showWhich(5)
            }
          },
          backToStep5(){
            this.showWhich(5)
          },
          enterStep6(){
            this.showWhich(6)
          },
          backToStep6(){
            this.showWhich(6)
          },
          backToStep4(){
            this.showWhich(4)
          },
          enterStep7(){
            this.showWhich(7)
          },
          enterStep8(){
             var _this = this;
            // this.data.name =this.formLabelAlign.name;
            // this.data.identify_code=this.formLabelAlign.identify_code;
            // this.data.Photo_address=this.Photo_address
            this.$http('/user/first/guide',this.data).then(function(res){
                // if(res.data.code==0){
                //    //_this.$router.push({path:'/index/home'})
                // }
            }).catch(function(error){
              console.log(error)
            })
            this.showWhich(8)
          },
          enterStep9(){
            var _this = this;
            // this.data.name =this.formLabelAlign.name;
            // this.data.identify_code=this.formLabelAlign.identify_code;
            this.formLabelAlign.Photo_address=this.Photo_address
            this.$http('/user/autonym/authentication',this.formLabelAlign).then(function(res){
                if(res.data.code==1000){
                   _this.$router.push({path:'/index/home'})
                }
            }).catch(function(error){
              console.log(error)
            })
            //this.showWhich(8)
          },
          beforeAvatarUpload(file) {
            console.log(9)
            return false
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
            console.log(file)
            this.Photo_address = file.url;
            this.dialogVisible = true;
          },
          backToHome(){
            if (typeof hostEditor != 'undefined'){
              hostEditor.setWindowSize('1202','750');
            }
            this.$router.push({path:'/index/home'})
          }
        },
        mounted(){
        }
    }


</script>
 
<style scoped>
  .bootpage{width: 800px;height: 464px;float: left;background: white;position: relative;}
  .bootpage .logo{position: absolute;left: 20px;top: 20px}
  .close{width: 20px;height: 20px;border: 1px solid #ebecee;border-radius: 50%;text-align: center;line-height: 20px;font-size: 9px;color: #999;cursor: pointer;position: absolute;right: 20px;top: 20px;}
  .close:hover{color: white;border: 1px solid #ffac52;background: #ffac52}
  .step1,.step2,.step4{text-align: center;padding-top: 110px;}
  .step2,.step4{margin-top: 15px;}
  .step3{text-align: center;padding-top: 50px;}
  .step1 p{line-height: 36px;font-size: 16px;color: #666}
  .begin,.next,.back{margin-top: 40px;width: 105px;height: 40px;padding: 0;line-height: 40px;background: #fe9039;border: 1px solid #fe9039}
  .back{background: transparent;border: 1px solid #eee}
  .back:hover{color: #fe9039;border-color: #fe9039}
  .begin:hover,.next:hover{background: #feb339;border-color: #feb339}
  .step1 p:last-child{color: #999;font-size: 13px;margin-top: 10px}

  .step2 p,.step4 p{color: #333;font-size: 20px;text-align: center;}
  .step2 span,.step4 span{width: 98px;height: 98px;border-radius: 3px;background: rgb(238,238,238);border:1px solid #ddd;display: inline-block;color: #666;line-height: 98px;font-size: 20px;margin-top: 20px;cursor: pointer;}
  .step2 span:hover,.step4 span:hover{background: #ddd}
  .step2 span:nth-child(1),.step4 span:nth-child(1){margin-left: 10px}

  .step3 p{font-size: 20px;color: #333;}
  .step3 .title{margin-bottom: 90px;}
  .step3 .left{font-size: 16px;line-height: 36px;}
  .checkWap .el-checkbox{margin-left: 34px;margin-bottom: 20px}
  .checkWap .el-checkbox:nth-child(6n+1){margin-left: 0px}
  .checkWap .el-button{width: 85px;height: 35px;padding: 0;line-height: 35px;}
  .checkDayWap .el-checkbox+.el-checkbox{margin-left: 10px}

</style>
<style type="text/css">
  .up .el-form-item__label{line-height: 20px}
  .step8 .el-form-item__label{color: #333}
  .step8 .el-upload--picture-card{height: 108px;line-height: 108px}
  .step8 .el-dialog{left: 29%;top: 5%}
  .step8 .el-upload-list--picture-card .el-upload-list__item{height: 108px;}
</style>
