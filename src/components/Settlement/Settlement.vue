<template>

  <div class="nocall">
    <p class="title">
      <span><span></span>{{infoData.project_name}}</span>
      <span  class="enter_btn">
        正在进行
      </span>
    </p>
    <div class="content12">
      <div class="tit">
        尊敬的**云客，感谢您选择云客平台！本单已完结，结算清单明细如下：
      </div>
      <el-table
          :data="standard_list"
          stripe
          style="width: 100%;background:#eee;color:#666;margin-top:40px">
          <el-table-column
            prop="title"
            label="项目">
          </el-table-column>
          <el-table-column
            prop="gz_commision"
            label="单价">
          </el-table-column>
          <el-table-column
            prop="total"
            label="总数量">
          </el-table-column>
          <el-table-column
            prop="fail_total"
            label="不合格数量">
          </el-table-column>
          <el-table-column
            prop="hege"
            label="有效数量">
          </el-table-column>
          <el-table-column
            prop="heji"
            label="合计（元）">
          </el-table-column>
      </el-table>
      <div class="total_wap">
        <el-row style="margin-bottom:20px">
          <el-col :span="12">
            拨打支出
          </el-col>
          <el-col style="text-align:right" :span="12">
            {{main_data.standard_list.total_fee}}
          </el-col>
        </el-row>
        <el-row style="margin-bottom:20px">
          <el-col :span="12">
            优惠金额
          </el-col>
          <el-col style="text-align:right;color:#ff8355" :span="12">
            <span v-if="main_data.other_fee.discount">
              -￥{{main_data.other_fee.discount}}
            </span>
            
            <span v-else>
              无
            </span>

          </el-col>
        </el-row>
        <el-row style="margin-bottom:20px;">
          <el-col :span="12">
            其它费用
          </el-col>
          <el-col style="text-align:right" :span="12">
            <span v-if="main_data.other_fee.other_fee">
              +￥{{main_data.other_fee.other_fee}}
            </span>
            
            <span v-else>
              无
            </span>
            
          </el-col>
        </el-row>
      </div>

      <div class="total_wap" style="border:none;margin-top:0px;padding-top:10px;margin-bottom:15px">
        <el-row style="margin-bottom:20px;color:#ff8355">
          <el-col :span="12">
            实际支出
          </el-col>
          <el-col style="text-align:right;font-size:24px" :span="12">
            ￥{{main_data.standard_list.total_fee-main_data.other_fee.discount+main_data.other_fee.other_fee}}
          </el-col>
        </el-row>
        <div style="text-align:right" v-if="main_data.countdown">
          <span style="vertical-align:bottom;font-size:12px;">自动结算倒计时：<span style="color:#ff8355;vertical-align:bottom">{{h}}时{{s}}分{{m}}秒</span></span>
          <span class="enter_btn" @click="pay">确定支付</span>
        </div>
      </div>
    </div>

    <div class="content2" style="margin-top:20px">
      <el-table
          v-loading.body="loading"
          @row-click='show_right_mask(true)'
          :data="main_data.content.list"
          stripe
         >
          <el-table-column
            prop="time"
            width="250"
            label="通话日期">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="客户电话">
          </el-table-column>
          <el-table-column
            prop="duration"
            label="通话时长">
          </el-table-column>
          <el-table-column
            prop="res"
            label="呼叫结果">
          </el-table-column>
          
          <el-table-column
            prop="standard"
            label="结算结果">
          </el-table-column>
          <el-table-column
            prop="appeal"
            label="质检结果">
          </el-table-column>
          <el-table-column
            prop="money"
            label="结算金额">
          </el-table-column>
          
        </el-table>

        <el-row style="padding:20px 30px 0px 30px;margin-top:10px;border-top:1px solid #eee">
          <el-col :span="12">合计</el-col>
          <el-col :span="12" style="text-align:right">￥{{main_data.standard_list.total_fee}}</el-col>
        </el-row>
    </div>
    <div style="text-align:center;margin:60px 0px">
         <el-pagination
      
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="main_data.content.total">
        </el-pagination>
    </div> 

     <AlertDetail   :btntext="alert2.btntext" :isshow="alert2.isshow" @close="close2" @sure="sure2">
      <div slot="alert_con">
        <div style="text-align:center;color:#464646;font-size:14px;padding:0px 60px">
          <img src="./img/success_icon.png">
          <p style="margin-top:15px;">确认支付</p>
          <p style="text-align:left;margin-top:15px;">总计：¥ {{main_data.standard_list.total_fee-main_data.other_fee.discount+main_data.other_fee.other_fee}}，请您确定无误后进行支付。支付后，您剩余的¥ {{money.freeze-(main_data.standard_list.total_fee-main_data.other_fee.discount+main_data.other_fee.other_fee)}} 托管资金将退回至您的钱包，请注意查收。</p>
          <p style="margin-top:15px;"> 请为平台服务评星</p>
          <el-rate
            style="margin-top:15px"
            v-model="value2"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
          </el-rate>
        </div>
      </div>
    </AlertDetail>              
    </div>
    

   
</template>

<script>
      import AlertDetail from '../Common/AlertDetail.vue' 
      import exportExcel from '../../common/exportExcel'
      export default {
        name:'noCall',
        components:{
          AlertDetail
        },
        data() {
          return {
            alert2:{
              isshow:false,
              btntext:'确认支付'
            },
            value2:0,
            currentPage:1,
            loading:false,
            form:{
              searchnum:''
            },
            infoData:{},
            main_data:{
              standard_list:{
                total_fee:''
              },
              other_fee:{
                discount:'',
                other_fee:''
              },
              content:{
                list:[]
              }
            },
            standard_list:[
            ],
            h:0,
            s:0,
            m:0,
            inter:null,
            money: {
              remain: 0,
              freeze: 0,
              cash: 0,
              expenses: 0
        },
          };
        },
        created(){
          this.getinfoData();
          this.getMainData()
        },
        computed: {
         
        },
        methods: {
          close2(){
            this.alert2.isshow=false;
          },
          sure2(){
            let _this=this;
            let data={project_id:_this.$route.query.project_id,fee:_this.main_data.standard_list.total_fee-_this.main_data.other_fee.discount+_this.main_data.other_fee.other_fee};
            this.$http('/project/manual_settle',data).then(function(res){
              if(res.data.code==1000){
                _this.alert2.isshow=false;
                setTimeout(function(){
                  _this.$message({
                    message: '支付成功',
                    type: 'success'
                  });
                },1200)
              }else{
                _this.$message({
                  message: res.data.err,
                  type: 'warning'
                });
              }
              
            },function(err){
              console.log(err)
            })
          },
          go(path){
            this.$router.push({path})
          },
          pay(){
            let _this=this;
            this.$http('/project/master_core2').then(function(res){
              if(res.data.code==1000){
                _this.money=res.data.data.money;
                _this.alert2.isshow=true;
              }
              
            },function(err){
              console.log(err)
            })
          },
          getinfoData(){
            let _this=this;
            this.$http('/yunke/project/details',{project_id:_this.$route.query.project_id}).then(function(res){
              if(res.data.code==1000){
                _this.infoData=res.data.data;
              }
              
            },function(err){
              console.log(err)
            })
          },
          getMainData(){
            let _this=this;
            this.$http('/project/settle_gz',{project_id:_this.$route.query.project_id,page:_this.currentPage,limit:10}).then(function(res){
              if(res.data.code==1000){
                _this.main_data=res.data.data;
                _this.standard_list=[];
                for(let i in _this.main_data.standard_list){
                  if(i!='total_fee'){
                    _this.standard_list.push(_this.main_data.standard_list[i])
                  }
                }
                if(_this.main_data.countdown){
                  _this.changetime(_this.main_data.countdown)
                }
                console.log(_this.standard_list)
              }
              
            },function(err){
              console.log(err)
            })
          },
          handleCurrentChange(){
            this.getMainData()
          },
          changetime(number){
            let _this=this

            if(this.inter!=null){
              clearInterval(_this.inter)
            }
            this.inter=setInterval(function(){
                number--;
                var house=parseInt(number/3600)<10? '0'+parseInt(number/3600):parseInt(number/3600)
                var min_s=number-parseInt(number/3600)*3600;
                var min=parseInt(min_s/60)<10? '0'+parseInt(min_s/60):parseInt(min_s/60)
                var sec=parseInt(min_s-parseInt(min_s/60)*60)<10? '0'+parseInt(min_s-parseInt(min_s/60)*60):parseInt(min_s-parseInt(min_s/60)*60);
                _this.h=house;
                _this.s=min;
                _this.m=sec;
            },1000)
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
          this.$store.dispatch('defaultActiveAction','/index/projectCenter/settlement');
        }
    }
</script>
 
<style scoped>  
  .nocall{padding: 20px;}
  .title{font-size: 20px;color: #313131;display: flex;height: 60px;align-items: center;justify-content: space-between;margin-bottom: 30px}
  .title>span>span{display: inline-block;width: 5px;height: 18px;background: #ff944e;margin-right: 10px;vertical-align: center;position: relative;top: 2px}
  .enter_btn{display: inline-block;width: 100px;height: 35px;line-height: 35px;border:1px solid #ff7a59;background: linear-gradient(to right, #ff9a4c , #ff7a59);text-align: center;margin-left: 20px;color: white;font-size: 14px;cursor: pointer;border-radius: 2px;}
  .content12,.content2{background: white;padding:30px;}

  .content12 .tit .btn1,.content12 .tit .btn2{display: inline-block;width: 100px;height: 35px;line-height: 35px;border:1px solid #ff7a59;background: linear-gradient(to right, #ff9a4c , #ff7a59);text-align: center;margin-left: 20px;color: white;font-size: 14px;cursor: pointer;border-radius: 2px}
  .content12 .tit .btn2{float: right;}
  .total_wap{padding: 20px 60px;color: #464646;border-top: 1px solid #eee;margin-top: 20px;border-bottom: 1px solid #eee;padding-bottom: 0px}
</style>
<style>
 .content12 .el-input__icon,.content2 .el-input__icon{color: #ff7a59;right: 20px;font-size: 20px}
 .content12 .el-table th>.cell,.content2 .el-table th>.cell{text-align: center;background: white}
 .content12 .el-table th,.content2 .el-table th{background: white}
 .content12 .el-table .cell, .el-table th>div,.content2 .el-table .cell, .el-table th>div{text-align: center;}
 .el-pager li.active{background: #ff7a59;border-color:#ff7a59;}
 .el-pager li{height: 33px;line-height: 32px;}
 .el-pager li:hover{color: #464646}
 .el-pagination__editor :focus{border-color: #ff7a59}
 .el-pagination__editor{line-height: 23px;}
 .el-pagination button, .el-pagination span{height: 33px;line-height: 33px;}
</style>

