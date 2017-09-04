<template>
  <div class="login ui-sys-bar">
     <div class="block" style="width:388px;height:464px">
     <img src="/static/img/logo.png" height="27" width="120" alt="" class="logo">
      <el-carousel :interval='3000' trigger="click" height="464px" arrow="never">
        <el-carousel-item v-for="item in images" :key="item">
          <img :src="item">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="login-container">
      <div class="close ui-sys-bar1" @click="close">X</div>
      <form>
        <p><span>登录</span><router-link to="register" class="register ui-sys-bar1">马上注册</router-link></p>
        <p>手机号<input type="text" v-model="ruleForm2.account" auto-complete="off" class='ui-sys-bar1'>
          <span style='font-size:12px;color:#ff4949' >{{phErrMsg}}</span>
        </p>
        <p>密码<input type="password" v-model="ruleForm2.checkPass" auto-complete="off" class='ui-sys-bar1'>
          <span style='font-size:12px;color:#ff4949' >{{psdErrMsg}}</span>
        </p>
        
        <el-checkbox v-model="checked"  class="remember ui-sys-bar1" style="color:#999">记住密码</el-checkbox><router-link to="forgetpassword" class="forgetpassword ui-sys-bar1" style="">忘记密码</router-link>
        <p><button @click.prevent="handleSubmit" class='ui-sys-bar1'>登录</button></p>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  components:{
   
  },
  data () {
    return {
     images:['/static/img/login1.png','/static/img/login2.png','/static/img/login3.png'],
     logining: false,
     phErrMsg:'',
     psdErrMsg:'',
     ruleForm2: {
       account: '',
       checkPass: ''
     },
    checked: false

    }
  },
  created(){
    //初始化请求
    //
    // if (typeof hostEditor != 'undefined')
    //   {
    //     hostEditor.southTelWindowSetSize('800','464');
    //   }
  },
  mounted:function(){
    //初始化操作DOM 
    //初始时如果cookie里有账号密码则填充
    if(this.getCookie('username')&&this.getCookie('password')){
      this.ruleForm2.account=this.getCookie('username');
      this.ruleForm2.checkPass=this.getCookie('password');
      this.checked=true;
    }
  }, 
  methods:{
      handleSubmit(){
        // if (typeof hostEditor != 'undefined'){
        //   hostEditor.setWindowSize('1202','750');
        // }
        //登录
        var  _this=this;
        var accountReg=/^1[3|5|8|7][0-9]{9}$/;
        var checkPassReg=/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\_\?\!]{6,16}$/;
        if(!this.ruleForm2.account){
          this.phErrMsg='请输入手机号';
          return false;
        }else if(!accountReg.test(this.ruleForm2.account)){
          this.phErrMsg='手机号格式不正确';
          return false;
        }else if(!this.ruleForm2.checkPass){
            this.phErrMsg='';
            this.psdErrMsg='请输入密码';
          return false;
        }else if(!checkPassReg.test(this.ruleForm2.checkPass)){
            this.phErrMsg='';
            this.psdErrMsg='密码格式不正确';
          return false;
        }else{
          this.phErrMsg='';
          this.psdErrMsg='';
          this.$http('/user/user/login',{mobile:this.ruleForm2.account,password:this.ruleForm2.checkPass}).then(function(res){
            var d=res.data;
            if(d.code==1000){
              localStorage.token = d.data.user_token;
              //记住密码
              if(_this.checked){
                console.log(111);
                _this.remember();
              }else{
                _this.noRemember();
              }
              //如果是第一次登陆的话(例如第一次登type==4)
              if(d.data.guide_status=='0'){
                _this.$router.push({path:'/bootpage'});
              }else{
                _this.$router.push({path:'/index/home'});
              }
            }
          }).catch(function(err){
            console.log(err);
          }) 
        }
      },
      remember(){
        if(this.checked){
          this.setCookie('username',this.ruleForm2.account,7); //保存帐号到cookie，有效期7天
          this.setCookie('password',this.ruleForm2.checkPass,7); //保存密码到cookie，有效期7天
        }
      },
      noRemember(){
        this.delCookie('username');
        this.delCookie('password');
      },
      setCookie(name,value,day){
        //设置cookie
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = name + '=' + value + ';expires='+ date;
      },
      getCookie(name){
        //获取cookie
        var reg = RegExp(name+'=([^;]+)');
        var arr = document.cookie.match(reg);
        if(arr){
          return arr[1];
        }else{
          return '';
        }
      },
      delCookie(name){
        //删除cookie
        this.setCookie(name,null,-1);
      },
      close(){
        if (typeof hostEditor != 'undefined')
          {
            hostEditor.southTelWindowClose();
          }
      }
  },
  componentUpdated:function(){
    console.log('componentUpdated')
  }
}
</script>
<style scoped>
.login{width: 800px;height: 464px;background: white}
.logo{position: absolute;z-index: 10;left: 20px;top: 20px}
.el-carousel__button{height: 5px;width: 5px!important}
.block{float: left;}
.login-container{float: left;}
.close{width: 19px;height: 19px;border: 1px solid #ebecee;border-radius: 50%;text-align: center;line-height: 20px;font-size: 9px;color: #999;margin: 20px 0 0 369px;cursor: pointer;}
.close:hover{color: white;border: 1px solid #ffac52;background: #ffac52}
form{margin: 76px 0 0 53px;color: #666}
form p:nth-of-type(1) span{font-size: 20px;color:#666666;}
form p:nth-of-type(1) a{text-decoration: none;color: #666;font-size: 14px;margin-left: 219px}
form p:nth-of-type(2),form p:nth-of-type(3){width: 316px;height: 38px;line-height:38px;border-bottom: 1px solid #e6eaed}
form p:nth-of-type(2){margin-top: 31px}
form p:nth-of-type(3){margin: 11px 0 18px 0}
form p:nth-of-type(2) input,form p:nth-of-type(3) input{border: none;outline:none}
form p:nth-of-type(2) input{padding-left: 10px}
form p:nth-of-type(3) input{padding-left: 27px}
.forgetpassword{color: #666;font-size: 14px;text-decoration: none;margin-left: 182px}
form p:nth-of-type(4) button{background: white;width: 100%;border: none;height: 34px;line-height: 33px;text-align: center;color: #ffac52;font-size: 14px;border-radius: 3px;outline: none;margin-top: 23px;border:1px solid #ffac52;font-size: 14px;}
form p:nth-of-type(4) button:hover{background: #ffac52;color: white}
form p:nth-of-type(4) button a{color: #fff;font-size: 14px;text-decoration: none}
.el-checkbox__inner{background: #ffac52}
.register:hover{color: #ffac52}
.forgetpassword:hover{color: #ffac52}
form p input:focus{border:none}
.ui-sys-bar{
    -webkit-app-region: drag;
}
.ui-sys-bar1{
    -webkit-app-region: no-drag;
}
</style>
<style>
  .el-checkbox__input.is-checked .el-checkbox__inner {background-color: #fe9039!important;border-color: #ffe9d7!important;}
  .el-checkbox__inner:hover{border-color: #ffe9d7!important;}
  .el-checkbox__input.is-focus .el-checkbox__inner{border-color: #ffe9d7!important;}
</style>
