<template>
   <transition
    name="custom-classes-transition" 
    enter-active-class="animated bounceInDown"
    leave-active-class="animated bounceOutUp"> 
    <div class="successAlert"  v-show="isshow" :style="{width:AlertWidth+'px',height:AlertHeight+'px',marginLeft:'-'+AlertWidth/2+'px',marginTop:'-'+AlertHeight/2+'px'}">
      <div v-show='page==1' class='bg'>
        <p class="tit">
        <img @click="close" src="./img/close.png">
        </p>
        <p style='margin:225px 0 30px 40px;width:389px ;font-size:18px;color:#fff;line-height:30px'>测试时间为90秒，正确率达到90%即可通过测试，<span v-if='!maxRate||maxRate==0'>准备好了吗</span><span v-else>历史最好成绩：正确率{{maxRate+'%'}}(<i v-if='maxRate>90' style='font-style:normal;color:#00b15c'>已通过测试</i><i v-else style='font-style:normal;color:#FB5E4B'>(未通过测试)</i>)</span></p>
        <el-button class='btn' @click='sure'>马上开始</el-button>
        <slot name="alert_con"></slot>
      </div>
      <div v-show='page==2' id='divText' style='overflow: hidden;height:593px;position:relative'>
        <p class="title" style='position:absolute;z-index:100;width:829px;box-sizing:border-box'>
        <img @click="close" src="./img/close.png">
        <span>总数：{{charSum}}</span>
        <span>正确数：{{charSuccess}}</span>
        <span>正确率：{{correctRate}}%</span>
        <span>错误数：{{charError}}</span>
        <span>丢失数：{{charLost}}</span>
        <span class='rt'>剩余时间：{{totleTime1}}</span>
        </p>
      </div>
      <div v-show='page==3' id='success' style='overflow: hidden;height:593px;position:relative'>
        <p class="title" style='position:absolute;z-index:100;width:829px;box-sizing:border-box'>
        <img @click="close" src="./img/close.png">
        <span>总数：{{charSum}}</span>
        <span>正确数：{{charSuccess}}</span>
        <span>正确率：{{correctRate}}%</span>
        <span>错误数：{{charError}}</span>
        <span>丢失数：{{charLost}}</span>
        <span class='rt'>剩余时间：{{totleTime1}}</span>
        </p>
        <h1>恭喜您，打字通过了</h1>
        <div style='text-align:center'>
            <el-button class='btn' style='margin-left:0'  @click.prevent='close'>完成</el-button>
        </div>
      </div>
      <div v-show='page==4' id='error' style='overflow: hidden;height:593px;position:relative'>
        <p class="title" style='position:absolute;top:0;z-index:100;width:829px;box-sizing:border-box'>
        <img @click="close" src="./img/close.png">
        <span>总数：{{charSum}}</span>
        <span>正确数：{{charSuccess}}</span>
        <span>正确率：{{correctRate}}%</span>
        <span>错误数：{{charError}}</span>
        <span>丢失数：{{charLost}}</span>
        <span class='rt'>剩余时间：{{totleTime1}}</span>
        </p>
        <h1 style='color:#FB5E4B'>就差一丢丢，再接再厉</h1>
        <div style='text-align:center'>
            <el-button class='btn1'  @click.prevent='close'>休息一下再测</el-button>
            <el-button class='btn'  @click.prevent='sure1'>不信邪再测一次</el-button>
        </div>
      </div>
    </div>  

  </transition> 
 
</template>
<script>

export default {
    name:'AlertDetailCmn',
    props:{
      isshow:{
        required:true,
        type:Boolean,
        default:false
      },
      AlertWidth:{
        required:false,
        type:String,
        default:'829'
      },
      AlertHeight:{
        required:false,
        type:String,
        default:'593'
      }
    },
    data() {
      return{
        page:1,
        totleTime:60,//测试总时间,按秒计
        totleTime1:60,//测试显示时间,按秒计
        strChrList: ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'],
        charSum:0,//生成字符的总数量
        charError:0,//失败的数量
        charSuccess:0,//成功的数量
        charLost:0,//丢失的字符的数量
        correctRate:0,//正确率
        maxRate:0,//最高通过率
        autoStr:[],//随机生成的字符
        autoLeft:0,//随机生成的字符距离左边的距离
        INtime:500,//产生字符所需时间
        Downtime:40,//每次下移的间隔时间
        step:10,//每次向下移动的距离
        blocks:[],//所有的小方块
        width:56,
        height:56,
        autoMove:'',//下降定时器
        score:0//最终得分
      }
    },
    created(){
      //初始化请求
      this.maxRate=this.getCookie('maxRate')
       var _this = this;
        window.onkeydown = function(e){
           var chr = String.fromCharCode(e.keyCode).toLocaleLowerCase();
            _this.txtKeyDown(chr);
        }
    },
    computed:{
      
    },
    methods: {
      InitialSet(){
        //初始化变量
        this.totleTime1=60;
        this.charSum=0;
        this.charError=0;
        this.charSuccess=0;
        this.charLost=0;
        this.correctRate=0;
        this.autoStr=[];
        this.score=0;
        this.blocks=document.getElementsByClassName('block');
        var _this=this;
        var totleTimer=setInterval(function(){
            _this.totleTime1--;
            if(_this.totleTime1<=0){
              clearInterval(totleTimer);
            }
        },1000)
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
      close(){
        this.$emit('close')
      },
      sure1(){
        this.page=1;
      },
      sure(){
        this.page=2;
        this.startTest();
      },
      bg3(){
        //随机生成颜色
         var r=Math.floor(Math.random()*150);
         var g=Math.floor(Math.random()*150);
         var b=Math.floor(Math.random()*150);
         return "rgb("+r+','+g+','+b+")";//所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
       },        
      CharRandom(){
        //随机生成字符，距离
        var i=Math.round(Math.random()*25);
        while(true){
          var autoLeft1=Math.round(Math.random()*(829-this.width));
          if(autoLeft1<this.autoLeft-this.width||autoLeft1>this.autoLeft+this.width){
            this.autoLeft=autoLeft1;
            break;
          }
        }
        var chrObj = document.createElement('div');
        var color=this.bg3();
        this.autoStr.push(this.strChrList[i]);
        chrObj.innerHTML =this.strChrList[i];
        chrObj.style.color =color;
        chrObj.className+='block';
        chrObj.style.border='1px solid '+color;
        // chrObj.style.width=this.width+'px';
        // chrObj.style.height=this.height+'px';
        // chrObj.style.lineHeight=this.height+'px';
        // chrObj.style.textAlign='center';
        // chrObj.style.fontSize='46px';
        // chrObj.style.position='absolute';
        chrObj.style.left=this.autoLeft+'px';
        chrObj.style.top='0px';
        chrObj.style.backgroundColor='#fff';
        var divText = document.getElementById('divText');
        divText.appendChild(chrObj);
      },
      setInt(){
        var _this=this;
        this.autoStr=[];
        this.CharRandom();
        _this.charSum++;
        var timer=setInterval(function(){
          _this.CharRandom();
          _this.charSum++;
          if(_this.charSum*_this.INtime>=_this.totleTime*1000){
            if(_this.correctRate>=80){
              _this.page=3;
            }else{
              _this.page=4;
            }
            // _this.page=3;
            clearInterval(timer);
            this.page=3;
          }
        },this.INtime)
      },
      txtKeyDown(chr) {
        var divText = document.getElementById('divText');
        var list = divText.getElementsByTagName('div');
        var isSuccess = false;
        //当定时器停止时，不在让错误数上涨
       if(this.charSum*this.INtime>=this.totleTime*1000){
        isSuccess = true;
         }
        for (var i = 0; i < list.length; i++) {
            if (list[i].style.opacity == '0') {
                continue;
            }
            if (list[i].innerHTML == chr) {
                isSuccess = true;
                this.charSuccess++;
                list[i].className+= '  block1';
                list[i].style.opacity= '0';
                list[i].style.backgroundColor='#FF826E';
                break;
            }
        }

        if (!isSuccess) {
            this.charError++;
        }
        this.correctRate=parseInt(this.charSuccess/this.charSum*100);
        if(this.correctRate>this.maxRate){
            this.maxRate=this.correctRate;
        }
        this.setCookie('maxRate',this.maxRate,7); //保存帐号到cookie，有效期7天
      },
      startTest() {
        //初始化变量
        this.InitialSet();
        //定时生成方块
        this.setInt();
        var main=this;
        var autoMove = window.setInterval(function(){
          main.move();
          if(main.charSum*main.INtime>=main.totleTime*1000){
            clearInterval(autoMove);
          }
        },this.Downtime);
      },
      move() {
        //向下移动的距离
        var divText = document.getElementById('divText');
        var list = divText.getElementsByTagName('div');
        for (var i = 0; i < list.length; i++) {
            var top = parseFloat(list[i].style.top) + this.step;
            if (top> parseFloat(this.AlertHeight)) {
              if(list[i].style.opacity!='0'){
                this.charLost++;
              }
                divText.removeChild(list[i]); 
            }
            else {
                list[i].style.top = top + 'px'; 
                
            }
        }
        
        
      }
    }
  }
</script>

<style scoped>
  .successAlert{position: fixed;z-index: 9999;left: 50%;top: 50%;box-shadow:0 0 4px 2px #ccc;background: white;border-radius: 8px;}
  .bg{background-image:url(./img/strCeshi.png);height:100%;border-radius: 8px;}
  .tit{height: 47px;line-height: 47px;font-size: 20px;color: #333;font-weight: bold;padding: 0px 20px;position: relative;}
  .title{height: 60px;line-height: 60px;font-size: 15px;color: #aaa;position: relative;background:#112f3f;border-top-right-radius: 8px;border-top-left-radius: 8px;padding-left:20px;padding-right:40px;}
  .title span{display:inline-block;width:110px;}
  .tit img,.title img{position: absolute;right: 20px;top: 17px;cursor: pointer;display:none}
  .tit:hover img,.title:hover img{
    display:block;
  }
  .content{height: 71%;padding: 20px;overflow-x: hidden;overflow-y: auto;}
  .content p{color: #666;flex: 1;align-items: center;display: flex;padding-left: 15px;}
  .btn{
    width:188px;height:40px;font-size:18px;color:#fff;background:#112f3f;margin-left:40px;border-radius:6px;border-color:transparent;
  }
  .btn:hover{
    background: #24485D;
  }
  .btn1{
    width:188px;height:40px;font-size:18px;color:#112f3f; border-color:#112f3f;
  }
  .btn1:hover{
    color:#fff;background:#112f3f
  }
  .block{border:1px solid #c468cf; line-height:56px;text-align:center;font-size:46px;font-weight:bold;position:absolute;top:0;left:10px;width:56px;height:56px;}
  #error h1,#success h1{
    text-align:center;
    font-size:30px;
  }
  #success h4{
    margin-top:120px;
    font-weight:normal;
    color:#666;
  }
  #success h4 span{
    color:#31c27c;
    font-size:50px;
    font-weight: bold;
  }
  #success h1,#error h1{
    margin:255px 0 100px 0;
    color:#31c27c;
  }
</style>
<style>
  #divText .block{width:56px;height:56px;line-height:56px;text-align:center;font-size:46px;font-weight:bold;position:absolute;
  transition: all .2s linear;
  -moz-transition: all .2s linear; /* Firefox 4 */
  -webkit-transition: all .2s linear; /* Safari 和 Chrome */
  -o-transition: all .2s linear; /* Opera */}
  #divText div.block1{
    width:100px;height:100px;line-height: 100px;font-size:56px;
  }
</style>
