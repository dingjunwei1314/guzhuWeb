<template>
  <div class="forgetpassword ui-sys-bar">
      <div class="close ui-sys-bar1" @click="close">X</div>
     <div class="content ui-sys-bar1">
       <h2>忘记密码</h2>
       <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="mobile">
          <el-input v-model="ruleForm2.mobile" type="tel" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <el-input v-model="ruleForm2.code" type="tel" placeholder="验证码" class="code"></el-input>
          <el-button type="primary" @click="handleYanzheng" class="codeBtn">
            <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
            <span v-if="!sendMsgDisabled">获取验证码</span>
          </el-button>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <el-input type="password" @input="p_len($event)" v-model="ruleForm2.pass" auto-complete="off" placeholder="设置密码"></el-input>
        </el-form-item>
        <div v-if="reg" class="lnu_container">
            <p v-bind:class="{ lovercase_valid: contains_lovercase }"></p>
            <p v-bind:class="{ number_valid: contains_number }"></p>
            <p v-bind:class="{ uppercase_valid: contains_uppercase }"></p>
        </div>
        <el-form-item label="" prop="confirm_psd">
          <el-input type="password" v-model="ruleForm2.confirm_psd" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" class="registerBtn">重置密码</el-button>
        </el-form-item>
        <el-form-item>
          <span class="forgetLogin"><router-link to="login">直接登陆</router-link></span>
        </el-form-item>
      </el-form>
     </div>
  </div>
</template>

<script>

export default {
   data() {
       var validateTel = (rule, value, callback) => {
          var regExp = /^1[3|5|8|7][0-9]{9}$/;
        if (value === '') {
          callback(new Error('请输入手机号码'));
        }else if (regExp.test(value) === false) {
          callback(new Error('请输入正确手机号码'))
        } else {
          callback();
        }
      }; 
      var validateCode = (rule, value, callback) => {
        var regExp = /^[0-9a-zA-Z]{4}$/;
        if (value === '') {
          callback(new Error('请输入验证码'));
        }else if (regExp.test(value) === false) {
          callback(new Error('验证码输入错误'))
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        var regExp=/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\_\?\!]{6,16}$/; 
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(regExp.test(value) === false){
          callback(new Error('密码输入错误'))
          if (this.ruleForm2.confirm_psd !== '') {
            this.$refs.ruleForm2.validateField('confirm_psd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        reg:false,
        password: null,
        password_length: 0,
        typed: false,
        contains_lovercase: false,
        contains_number: false,
        contains_uppercase: false,
        valid_password_length: false,
        valid_password: false,
        time: 60, // 发送验证码倒计时
        sendMsgDisabled: false,
        checked:true,
        ruleForm2: {
          pass: '',
          confirm_psd: '',
          mobile:'',
          code:'',
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          confirm_psd: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          mobile: [
          { validator:validateTel , trigger: 'blur' }
          ],
          code: [
          { validator:validateCode , trigger: 'blur' }
          ],
        }
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
    methods: {
      handleFoc(e){
        console.log(e)
        // e.target.parentNode.parentNode.parentNode.nextSibling.nextSibling.firstChild.style.background = '#000'
      },
      p_len(e){
        // this.password_length = this.ruleForm2.pass.length;
        // if (this.password_length > 7) {
        //   this.valid_password_length = true;
        // } else {
        //   this.valid_password_length = false;
        // }

        // if (this.password_length > 0) {
        //   this.typed = true;
        // } else {
        //   this.typed = false;
        // }

       if(this.contains_lovercase = /[a-zA-Z]/.test(this.ruleForm2.password)||/[0-9]/.test(this.ruleForm2.password)||/[\@\!\#\$\%\^\&\*\.\~\_\?\!]/.test(this.ruleForm2.password)){
            this.reg = true
         };
        if(this.contains_number = /[0-9]/.test(this.ruleForm2.password)&&/[a-zA-Z]/.test(this.ruleForm2.password)||/[\@\!\#\$\%\^\&\*\.\~\_\?\!]/.test(this.ruleForm2.password)){
            this.reg = true
        };
        if(this.contains_uppercase = /[0-9]/.test(this.ruleForm2.password)&&/[a-zA-Z]/.test(this.ruleForm2.password)&&/[\@\!\#\$\%\^\&\*\.\~\_\?\!]/.test(this.ruleForm2.password)){
            this.reg = true
        };
        /* console.log(this.ruleForm2.password) */
        if(this.ruleForm2.password=""){
          this.reg = false
        }
        // Check if the password is valid
        // if (this.contains_lovercase == true && this.contains_number == true) {
        //   this.valid_password = false;
        //   if (
        //     this.contains_uppercase == true &&
        //     this.valid_password_length == true
        //   )
        //     this.valid_password = true;
        // } else {
        //   this.valid_password = false;
        // }
      },
      submitForm(formName) {
        var  _this=this;
        var cango=true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          
          } else {
            cango=false;
            console.log('error submit!!');
            return false;
          }
        });
        if(!cango){
            return false;
          }
        this.ruleForm2.password=this.ruleForm2.pass;
        console.log(this.ruleForm2);
        this.$http('/user/forgetpwd/edit',this.ruleForm2).then(function(res){
                var d=res.data;
                if(d.code==1000){
                  localStorage.token = d.data.user_token;
                  console.log('重置密码成功');
                    _this.$router.push({path:'/index/home'});
                }
          }).catch(function(err){
                console.log(err);
          }) 
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      close(){
        if (typeof hostEditor != 'undefined')
        {
          hostEditor.southTelWindowClose();
        }
      },
      handleYanzheng(e){
        console.log(e.target.parentNode.parentNode)
        let me = this;
         //发送验证码
        var regExp = /^1[3|5|8|7][0-9]{9}$/;
        if (this.ruleForm2.mobile&&regExp.test(this.ruleForm2.mobile) === true){
          this.$http('/user/sms/send',{mobile:this.ruleForm2.mobile,type:3}).then(function(res){
              var d=res.data;
              if(d.code==201){
                  console.log(222);
              }
           
          }).catch(function(err){
            console.log(err);
          }) 
          e.target.parentNode.parentNode.style.cssText = 'background:#ccc;border:1px solid #ccc'
          me.sendMsgDisabled = true;
          let interval = window.setInterval(function() {
            if ((me.time--) <= 0) {
              me.time = 60;
              me.sendMsgDisabled = false;
              e.target.parentNode.parentNode.style.cssText = 'background:#fe9039;border:1px solid #fe9039'
              window.clearInterval(interval);
            }
          }, 1000);
        } 
      }
    }
  }
</script>
<style scoped>
.forgetpassword{width: 800px;height: 464px;overflow: hidden;background: white}
/*.ui-sys-bar{
    -webkit-app-region: drag;
}
.ui-sys-bar1{
    -webkit-app-region: no-drag;
}*/
.close{width: 19px;height: 19px;border: 1px solid #ebecee;border-radius: 50%;text-align: center;line-height: 20px;font-size: 9px;color: #999;margin: 20px 0 0 757px;cursor: pointer;}
.close:hover{color: white;border: 1px solid #ffac52;background: #ffac52}
.content{width: 316px;height: 100%;margin: 0 auto;text-align: center;margin-top: 12px}
.content h2{font-size: 20px;color:#333;margin-bottom: 34px;}
.el-input__inner{padding-left: 20px}
.code{width: 65%}
.codeBtn{background: #fe9039;border:1px solid #fe9039;}
.registerBtn{width: 100%;background: #fe9039;border:1px solid #fe9039;}
.clause{color:#fe9039;}
.clause:hover{cursor: pointer}
.login a{color: #c6c6c6}
.login a:hover{color: #fe9039}
.forgetLogin{position: absolute;left: 260px;top: -15px}
.forgetLogin a{color: #b3b3b3}
.forgetLogin a:hover{color: #fe9039}
.lnu_container {
  display: block;
  margin: 10px auto;
  width: 320px;
  height: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.lnu_container p {
  width: 100px;
  height: 10px;
  border-radius: 2px;
  color: rgba(71, 87, 98, 0.8);
  background: -webkit-linear-gradient(left, #ffac52 50%, #fff 50%);
  background: linear-gradient(to right, #ffac52 50%, #fff 50%);
  background-size: 201% 100%;
  background-position: right;
  -webkit-transition: background .3s;

  transition: background .3s;
}

.lovercase_valid,
.number_valid,
.uppercase_valid {
  background-position: left !important;
  color: rgba(255, 255, 255, 0.9) !important;
}

.valid_password_container {
  display: block;
  margin: 10px auto;
  border-radius: 4px;
  position: relative;
  background: #00AD7C;
  width: 20px;
  height: 20px;
  visibility: hidden;
  opacity: 0;
}

.show_valid_password_container {
  visibility: visible;
  opacity: 1;
}

.tick {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: white;
  stroke-width: 25;
  stroke-linecap: round;
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
}

.checked {
  -webkit-animation: draw 0.5s ease forwards;
  animation: draw 0.5s ease forwards;
}

@-webkit-keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
<style>
.el-form-item__content{margin-left: 0!important;color:#c6c6c6}
.el-checkbox__input.is-checked .el-checkbox__inner{background-color: #fe9039!important;border-color: #ffe9d7!important;}
input:focus{border:1px solid #fe9039!important}
.el-input__icon{display: none}
</style>
