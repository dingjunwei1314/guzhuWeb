<template>
  <div style="padding:15px 0px;padding-bottom:40px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的钱包" name="first">
          <div class="banner">
            <img v-if="Main_data.month.quite_img" :src="Main_data.month.quite_img">
            <div style="color:white;font-size:20px;height:180px">
              <p style="margin-top:40px;margin-left:20px">你近一个月进账为<span>¥{{Main_data.month.money}}</span></p>
              <p style="width:40px;height:1px;background:#cdcfd4;margin-top:20px;margin-left:22px"></p>
              <p style="font-size:16px;margin-top:20px;margin-left:22px">{{Main_data.month.quite}}</p>
            </div> 
          </div>
          <p style="font-size:20px;line-height:24px;color:#333;margin-top:30px;margin-bottom:15px">我的钱包</p> 
          <el-row style="padding:15px;border:1px solid #eee;height:175px">
            <el-col :span="9" style="border-right:1px solid #eee;height:100%;padding:10px 0px">
              <p style="font-size:16px;color:#666">
                <img style="vertical-align:middle;margin-top:-2px;height:15px" src="./img/icon1.png">
                钱包余额
              </p>
              <p style="margin-top:25px;color:#ff8500">
                <span style="font-size:25px">￥</span><span style="font-size:55px">{{Main_data.money.will}}</span>

                <el-button type="primary" style="float:right;margin-right:50px;margin-top:25px;cursor:pointer;" class="begin" @click="cash">申请提现</el-button>

              </p>

            </el-col>
            <el-col :span="5" style="border-right:1px solid #eee;height:100%;padding:10px 15px;text-align:center">
              <p style="font-size:16px;color:#666">
                <img style="vertical-align:middle;margin-top:-2px;height:15px" src="./img/icon2.png">
                累计收入金额
              </p>

              <p style="margin-top:45px;color:#666">
                <span style="font-size:25px">￥</span><span style="font-size:35px">{{Main_data.money.income}}</span>
              </p>
            </el-col>
            <el-col :span="5" style="border-right:1px solid #eee;height:100%;padding:10px 15px;text-align:center">
              <p style="font-size:16px;color:#666">
                <img style="vertical-align:middle;margin-top:-2px;height:15px" src="./img/icon3.png">
                项目待结算约
              </p>

              <p style="margin-top:45px;color:#666">
                <span style="font-size:25px">￥</span><span style="font-size:35px">{{Main_data.money.will}}</span>
              </p>
            </el-col>
            <el-col :span="5" style="padding: 10px 0px 0px 10px;text-align:center">
              <p style="font-size:16px;color:#666">
                <img style="vertical-align:middle;margin-top:-2px;height:15px;" src="./img/icon4.png">
                提现中的金额
              </p>

              <p style="margin-top:45px;color:#666">
                <span style="font-size:25px">￥</span><span style="font-size:35px">{{Main_data.money.cash}}</span>
              </p>
            </el-col>
          </el-row>

          <p style="font-size:20px;line-height:24px;color:#333;margin-top:30px;margin-bottom:15px">近30天预计收益</p> 

          <div id="chat_me" style="background:white!important;height:250px;left:10px">
            
          </div>


          <p style="font-size:20px;line-height:24px;color:#333;margin-top:30px;margin-bottom:25px">收入明细</p> 

          <div style="margin-bottom:20px">
            <span @click="type_change(0)" :class="{'type_no':filter_con.type!=0,'type_active':filter_con.type==0}">全部记录</span>
            <span @click="type_change(2)" style="margin-left:10px" :class="{'type_no':filter_con.type!=2,'type_active':filter_con.type==2}">提现记录</span>
            <span @click="type_change(4)" style="margin-left:10px" :class="{'type_no':filter_con.type!=4,'type_active':filter_con.type==4}">结算记录</span>


            <el-date-picker
              @change="pickerChange"
              v-model="pickerTime"
              style="width:160px;float:right;"
              type="daterange"
              align="right"
              placeholder="选择日期范围"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>

          <el-table
          :data="income_list.list"
          stripe
          style="width: 100%;background:#eee;color:#666">
            <el-table-column
              prop="order_no"
              label="单据号"
              width="170">
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="日期"
              width="170">
            </el-table-column>
            <el-table-column
              prop="money"
              label="金额">
            </el-table-column>
            <el-table-column
              prop="remain"
              label="余额">
            </el-table-column>
            <el-table-column
              prop="description"
              label="详情">
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
          </el-table>
          <el-pagination
            v-show="income_list.count>0"
            style="margin: 0 auto;text-align:center;margin-top:20px"
            layout="prev, pager, next"
            :page-size=2
            :current-page.sync="currentpage"
            @current-change="currentChange"
            :total="income_list.count">
          </el-pagination>

        </el-tab-pane>
        <el-tab-pane label="绑定银行卡" name="second">
          <p style="color:#333;font-size:20px;margin-top:15px">绑定提现银行卡</p>
          <p style="font-size:13px;color:#999;margin-top:5px">请确保您所要绑定的银行卡预留信息与实名认证时提交的信息相符且为储蓄卡</p>

          <ul class="care_list">
            <li v-if="bank_data.list.length==0" style="cursor:pointer"><img style="width:100%;height:100%" src="./img/no_bind.png" @click="add"></li>
            <li v-for="(item,index) in bank_data.list" style="background: url('/static/img/bind_bg.png') no-repeat;background-size:100% 100%;position:relative;box-shadow:0 0 2px 2px #ccc;border-radius:3px">
              <div>
                <img src="./img/gs.png" style="float:left;margin-top:22px;margin-left:15px">
                <span style="margin-top:20px;float:left;margin-left:10px">{{item.open_bank}}</span>
                <span style="float:right;margin-right:50px;margin-top:20px;font-size:14px">储蓄卡</span>
              </div>
              <p style="text-align:center;color:#666;font-size:14px;margin-top:80px">
                {{item.account}}
              </p>
              <span @click="unbind(item.id,index,item.open_bank,item.account)" style="position:absolute;right:10px;bottom:10px;color:#fe9039;font-size:14px;cursor:pointer">
                解除绑定
              </span>
            </li>
            <li v-if="bank_data.list.length>0" style="cursor:pointer"><img style="width:100%;height:100%" src="./img/bind.png" @click="add"></li>
          </ul>
        </el-tab-pane>
      </el-tabs>

      <AlertDetail :AlertWidth="alert2.AlertWidth"  :AlertHeight="alert2.AlertHeight" :ConHeight="alert2.ConHeight" :title="alert2.title"  :btntext="alert2.btntext" :isshow="alert2.isshow" @close="close2" @sure="sure2">
        <div class="alert_con" slot="alert_con" style="padding:0px 60px;color:#999">
          <el-form :model="form_bank_bind"  ref="ruleForm" label-width="125px" class="demo-ruleForm">
            <el-form-item label="开户人信息" prop="name">
              <span>王明明</span>
              <span>130***********0030</span>
            </el-form-item>
            <el-form-item label="开户银行所属城市">
              <el-select style="float:left;width:130px" v-model="form_bank_bind.open_bank" placeholder="开户银行">
                <el-option
                  v-for="(item,index) in bank_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select style="float:left;width:100px;margin-left:12px" v-model="form_bank_bind.province" placeholder="省" @change="pro_change">
                <el-option v-for="(item,index) in pro_arr" :key="index" :label="item" :value="item"></el-option>
              </el-select>
              <el-select style="float:left;width:100px;margin-left:12px" v-model="form_bank_bind.city" placeholder="市">
                <el-option v-for="(item,index) in c_city_arr" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分行网点">
              <el-input v-model="form_bank_bind.address" placeholder="分行地址"></el-input>
            </el-form-item>
            <el-form-item label="银行卡号" prop="account">
              <el-input v-model="form_bank_bind.account" placeholder="填写银行卡号"></el-input>
            </el-form-item>
            <el-form-item label="预留手机号" prop="mobile">
              <el-input v-model="form_bank_bind.mobile" placeholder="填写手机号"></el-input>
            </el-form-item>
            <el-form-item label="验证" prop="code" style="margin-bottom:0px">
              <el-input type="input" style="width:240px" v-model="form_bank_bind.code" placeholder="请输入验证码"></el-input>
              <el-button type="primary" style="float:right;cursor:pointer;" @click="get_code" class="begin">获取验证码</el-button>
            </el-form-item>
          </el-form>
          
        </div>
      </AlertDetail> 


      <AlertDetail :AlertWidth="alert3.AlertWidth"  :AlertHeight="alert3.AlertHeight" :ConHeight="alert3.ConHeight" :title="alert3.title"  :btntext="alert3.btntext" :isshow="alert3.isshow" @close="close3" @sure="sure3">

        <div class="alert_con" slot="alert_con" style="padding:0px 20px;color:#999">
          <el-form :model="form_cash"  ref="ruleForm2" label-width="125px" class="demo-ruleForm">

            <el-form-item label="提现银行卡" style="margin-top:30px">
              <el-select style="float:left;width:230px" v-model="form_cash.card_id" placeholder="开户银行">
                <el-option
                  v-for="(item,index) in bind_bank_list"
                  :label="item.open_bank"
                  :value="item.account">
                </el-option>
              </el-select>

              <span style="cursor:pointer;margin-left:10px">添加银行卡</span>
            </el-form-item>

            <el-form-item label="输入提现金额">
              <el-input style="width:145px;" v-model="form_cash.money" placeholder="请输入金额"></el-input>
              <span style="cursor:pointer;margin-left:10px">最大提现金额为： <span style="color:#feb339">￥66.66</span></span>
            </el-form-item>
          </el-form>
          
        </div>
      </AlertDetail>
  </div>
</template>

<script>
import AlertDetail from '../Common/AlertDetail.vue'  
import {pro_arr,city_arr} from '../../common/pc.js'

export default {
  name: 'hello',
  components:{
    AlertDetail
  },
  data () {
    return {
      activeName:'first',
      currentpage:1,
      bank_list:[{value: '中国银行',label: '中国银行'},{value: '中国建设银行',label: '中国建设银行'}],
      bind_bank_list:[],
      pro_arr,
      city_arr,
      c_city_arr:[],
      filter_con:{
        type:0,
        page:1,
        limit:2,
        starttime:'',
        endtime:''
      },
      form_bank_bind:{
        type:1,
        account:'',
        province:'',
        city:'',
        address:'',
        open_bank:'',
        mobile:'',
        code:''
      },
      form_cash:{
        card_id:'',
        money:''
      },
      max_money:'',
      Main_data:{
        month:{
          quite_img:'',
          money:'',
          quite:''
        },
        data:{

        },
        money: {
          remain: 0,
          income: 0,
          cash: 0,
          will: 0
        },
      },
      bank_data:{
        list:[]
      },
      income_list:{
        limit: 0,
        count: 1000,
      },
      option : {
        color: ['#ffac52'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'        
            }
        },
        grid: {
            left: '0%',
            right: '1%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                min:0,
                max:200
            }
        ],
        series : [
            {
                name:'收入',
                type:'bar',
                barWidth: '40%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
      },
      pickerOptions:{
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      pickerTime:'',
      alert2:{
        title:'绑定银行卡',
        isshow:false,
        btntext:'立即绑定',
        AlertWidth:'645',
        AlertHeight:'485',
        ConHeight:'325'
      },
      alert3:{
        title:'提现申请',
        isshow:false,
        btntext:'立即申请',
        AlertWidth:'545',
        AlertHeight:'390',
        ConHeight:'225'
      },
    }
  },
  created(){
    let _this=this
    this.getMainData()
    this.getListData(_this.filter_con)
  },
  mounted:function(){
    document.getElementById('main_content').scrollTop=0;
    this.$store.dispatch('defaultIndexAction','/index/wallet');
  },
  methods:{
    pro_change(val){
    
      let _index=this.pro_arr.indexOf(val)
    
      if(_index==-1){
        this.c_city_arr=[]
      }else{
        this.c_city_arr=this.city_arr[_index]
      }
    
    },
    open(h,type) {
      this.$message({
        message: h,
        type: type
      });
    },
    getMainData(){
        var _this=this
        this.$http('/yunke/money/index').then(function(res){
          _this.Main_data=res.data.data;
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);


          _this.option.xAxis[0].data=Object.keys(_this.Main_data.data)
          _this.option.series[0].data=Object.values(_this.Main_data.data)
          _this.$echarts.init(document.getElementById('chat_me')).setOption(_this.option)
        
        },function(reject){
          console.log(reject)
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        })
    },

    getListData({type,page,limit,starttime,endtime}){
      //云客收益明细记录
        var _this=this
        this.$http('/yunke/money/income_list',{type,page,limit,starttime,endtime}).then(function(res){
          _this.income_list=res.data.data;
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        },function(reject){
          console.log(reject)
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        })
    },
    get_bank_data(){
      var _this=this
      this.$http('/money/bank_list').then(function(res){
        _this.bank_data=res.data.content;
        _this.$store.dispatch('refreshAction',false);
        _this.$store.dispatch('loadingAction',false);
      },function(reject){
        console.log(reject)
        _this.$store.dispatch('refreshAction',false);
        _this.$store.dispatch('loadingAction',false);
      })
    },
    cash(){
      var _this=this
      this.$http('/money/bank_list').then(function(res){
        if(res.data.code==1000){
          if(res.data.content.list.length==0){
            _this.$message({
              message: '还未绑定银行卡',
              type: 'warning'
            });
            _this.activeName='second'
          }else{  
            _this.alert3.isshow=true;
            console.log(res.data)
            _this.bind_bank_list=res.data.content.list
          }
        }
        
      },function(reject){
        console.log(reject)
      })
    },
    unbind(id,index,name,account){
      var _this=this
      this.$confirm('此操作会解除'+name+account+'的绑定，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http('/money/unbind',{card_id:id}).then(function(res){
          if(res.data.code==1000){
            _this.open('已解除该银行卡的绑定','success')
            _this.bank_data.list.splice(index,1)
          }
        },function(reject){
          console.log(reject)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解除'
        });          
      });
    },
    currentChange(page){

      let _this=this
      this.filter_con.page=page;
      this.getListData(_this.filter_con)
      
    },
    get_code(){
      let _this=this,
          mobile_reg=/^1[3|4|5|7|8]\d{9}$/
      if(this.form_bank_bind.mobile==''){
        this.$message({
          message: '请输入手机号',
          type: 'warning'
        });
        return false
      }

      if(!mobile_reg.test(_this.form_bank_bind.mobile)){
        this.$message({
          message: '手机号格式不正确',
          type: 'warning'
        });
        return false
      }

      this.$http('/user/sms/send',{mobile:_this.form_bank_bind.mobile,type:6}).then(function(res){
        if(res.data.code==1000){
          _this.$message({
            message: '验证码发送成功',
            type: 'success'
          });
        }else{
          _this.$message({
            message: res.error,
            type: 'warning'
          });
        }
      },function(err){
        console.log(err)
      })
    },
    add(){
      this.alert2.isshow=true;
    },
    add_bind_care({type,account,province,city,address,open_bank,mobile,code}){
      let _this=this,
          mobile_reg=/^1[3|4|5|7|8]\d{9}$/;

      if(this.form_bank_bind.open_bank==''){
        this.$message({
          message: '请选择开户银行',
          type: 'warning'
        });
        return false
      }

      if(this.form_bank_bind.province==''){
        this.$message({
          message: '请选择省份',
          type: 'warning'
        });
        return false
      }

      if(this.form_bank_bind.city==''){
        this.$message({
          message: '请选择城市',
          type: 'warning'
        });
        return false
      }

      if(this.form_bank_bind.address==''){
        this.$message({
          message: '请填写支行地址',
          type: 'warning'
        });
        return false
      }

      if(this.form_bank_bind.account.length<16||this.form_bank_bind.account.length>19){
        this.$message({
          message: '银号卡号格式不正确',
          type: 'warning'
        });
        return false
      }


      if(this.form_bank_bind.mobile==''){
        this.$message({
          message: '请输入手机号',
          type: 'warning'
        });
        return false
      }

      if(!mobile_reg.test(_this.form_bank_bind.mobile)){
        this.$message({
          message: '手机号格式不正确',
          type: 'warning'
        });
        return false
      } 

      if(this.form_bank_bind.code.length!=4){
        this.$message({
          message: '验证码格式错误',
          type: 'warning'
        });
        return false
      }


      this.$http('/money/bank_bind',{type,account,province,city,address,open_bank,mobile,code}).then(function(res){
        if(res.data.code==1000){
          _this.bank_data.list.push({id:res.data.data.care_id,open_bank,account:account.replace(/(\d{5})\d*(\d{4})/,'$1******$2'),type})
          _this.$message({
            message: '绑定成功',
            type: 'success'
          });
        }else{
          _this.$message({
            message: res.error,
            type: 'warning'
          });
        }
      },function(err){
        console.log(err)
      })
    },
    handleClick(val){
      if(this.activeName=='second' && !this.bank_data.isAuth){
        this.get_bank_data()
      }
    },
    pickerChange(){
      this.filter_con.page=1
      this.currentpage=1
      this.filter_con.starttime=this.changeDate(this.pickerTime[0])=='1970-01-01'? '': this.changeDate(this.pickerTime[0])
      this.filter_con.endtime=this.changeDate(this.pickerTime[1])=='1970-01-01'? '': this.changeDate(this.pickerTime[1]) 
      this.getListData(this.filter_con)
      
    },
    changeDate(date){
      let joinDate=new Date(date),
      joinDateMonth=(joinDate.getMonth()+1)<10? '0'+(joinDate.getMonth()+1) : (joinDate.getMonth()+1),
      joinDateDay=joinDate.getDate()<10? '0'+joinDate.getDate() : joinDate.getDate(),
      standardJoinDate=joinDate.getFullYear()+'-'+joinDateMonth+'-'+joinDateDay;
      return standardJoinDate;
    },
    type_change(val){
      this.filter_con.page=1
      this.currentpage=1
      this.filter_con.type=val;
      this.getListData(this.filter_con)
    },
    close2(){
      this.c_city_arr=[];
      for(var i in this.form_bank_bind){
        this.form_bank_bind[i]=''
      }
      this.alert2.isshow=false;
    },
    sure2(){
      this.add_bind_care(this.form_bank_bind)
    },
    close3(){
      this.alert3.isshow=false;
    },
    sure3(){
      let _this=this;

      if(this.form_cash.card_id==''){
        this.$message({
          message: '请选择提现银行',
          type: 'warning'
        });
        return;
      }

      if(this.form_cash.money==''){
        this.$message({
          message: '提现金额输入有误',
          type: 'warning'
        });
        return;
      }


       this.$http('/money/cash',_this.form_cash).then(function(res){
        if(res.data.code==1000){
          _this.$message({
            message: '提现申请已发送',
            type: 'success'
          });
          _this.alert3.isshow=false;
          _this.form_cash.card_id='';
          _this.form_cash.money='';
        }else{
          _this.$message({
            message: res.error,
            type: 'warning'
          });
        }
      },function(err){
        console.log(err)
      })


    }
  },
  computed:{
    refresh(){
      return this.$store.getters.GetRefresh
    }  
  },
  watch:{
    refresh:function(val){
      if(val){
        if(this.activeName=='first'){
          this.currentpage=1
          this.getMainData()
          this.filter_con={
            type:0,
            page:1,
            limit:2,
            starttime:'',
            endtime:''
          };
          this.getListData(this.filter_con)
        }else{
          this.get_bank_data()
        }
        
      }
      
    }
  },
}
</script>
<style scoped>
  .banner{height: 180px;width: 100%}
  .banner img{height: 100%;width: 100%}
  .banner>div{width: 100%;height: 100%;position: absolute;left: 0;top: 0;z-index: 2}
  .begin:hover{background: #feb339;border-color: #feb339}
  .type_no{width:90px;height:34px;line-height:34px;border:1px solid #fe9039;text-align:center;color:#fe9039;font-size:12px;display:inline-block;cursor: pointer;}
  .type_active{width:90px;height:34px;line-height:34px;border:1px solid #fe9039;text-align:center;color:#fff;font-size:12px;display:inline-block;cursor: pointer;background-color: #fe9039;}


  .care_list{display: inline-table;width: 100%}
  .care_list li{float: left;width: 280px;height: 180px;margin-left: 20px;margin-top: 20px}
  .care_list li:nth-child(3n+1){margin-left: 2px;}

  .alert_con .el-form-item__label{color: #999}
  .alert_con .content{padding: 0px 20px !important}
</style>
<style>
  .el-button--primary:focus, .el-button--primary:hover {
     background-color: #FEB339!important;
    border-color: #FEB339!important;
    color: #fff;
  }
</style>
