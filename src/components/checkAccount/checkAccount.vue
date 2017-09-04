<template>
  <div>
    <div class='clear'>
      <h3 class=' myProject lf'>对账单</h3>
    </div>
    <el-button class='begin1' style="float:right;" @click='getStar()'>为雇主评分</el-button>
    <h1 class='h3 C-color mag-btm-20'><span class='top-Icon'>icon</span>  本单已完结，结算清单明细如下:</h1>
    <table class='myTable'>
        <thead>
            <tr style='height:33px;box-sizing:border-box;'>
                <th style='width:195px'>项目</th>
                <th style='width:159px'>单价</th>
                <th style='width:153px'>总数量</th>
                <th style='width:174px'>不合格数量</th>
                <th style='width:106px'>有效数量</th>
                <th >合计</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data,index) in standard_list" :key="index">
                <td><span>icon</span>{{data.title}}</td>
                <td>￥{{data.yk_commision}}</td>
                <td>{{data.total||0}}</td>
                <td>{{data.fail_total||0}}</td>
                <td>{{data.total-data.fail_total||0}}</td>
                <td >￥{{(data.total-data.fail_total)*data.yk_commision}}</td>
            </tr>
        </tbody>
        <tfoot>
           <tr>
                <td colspan='5' style='text-align:right;position:relative;top:-2px'><span>icon</span>总计</td>
                <td ><b class='C-color h1'>￥{{total}}</b></td>
            </tr> 
        </tfoot>
    </table>
    <h3 class='myProject rt' style='font-size:18px;color:#666'>共有{{count}}条</h3>
    <h3 class=' myProject lf'>通话明细</h3>
    <div class='myTable2'>
      <template>
        <el-table :data="tabDetalData" style="width: 100%">
          <el-table-column prop="time"label="通话日期" width="160"></el-table-column>
          <el-table-column prop="phone" label="客户电话"width="135"></el-table-column>
          <el-table-column prop="res"label="通话结束"  width="132"></el-table-column>
          <el-table-column prop="duration"label="通话时长"  width="134"></el-table-column>
          <el-table-column prop="standard"label="结算结果" width="131"></el-table-column>
          <el-table-column prop="appeal"label="质检反馈" width="132"></el-table-column>
          <el-table-column prop="money"label="结算金额"></el-table-column>
        </el-table>
      </template>
    </div>
    <div style='text-align:center;margin-top:20px'>
      <el-pagination
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        @current-change='getData'
        :total="Math.ceil(count/limit)*10">
      </el-pagination>
    </div>
     <AlertDetailCmn :title="alert.title"  :isshow="alert.isshow" :AlertWidth='alert.width' :AlertHeight='alert.height' @close="close" >
      <div slot="alert_con"> 
        <div style='text-align:center;margin-top:118px;margin-bottom:89px'>
          <span class='h3 text-gray-6'>请为雇主做出评星</span>
          <el-rate v-model="value1" style='display:inline-block;vertical-align:top' show-text></el-rate>
        </div>
         <div style='text-align:center'>
            <el-button type="primary" class="begin qianRuBtn"  @click.prevent='close()'>完成</el-button>
          </div>
      </div>
    </AlertDetailCmn> 
  </div>
</template>

<script>
  import AlertDetailCmn from '../Common/AlertDetailCmn.vue'
  export default {
    name: 'checkAccount',
    components:{
      AlertDetailCmn
    },
    data () {
      return {
        images:['../static/banner1.png','../static/banner2.png','../static/banner3.png'],
        project_id:'',//项目ID
        standard_list:[],//项目明细
        tabDetalData: [],//通话明细
        total:0,//项目价钱总计
        alert:{//弹出的确认框
          title:'雇主评分',
          isshow:false,
          width:'545',
          height:'390'
        },
        value1:null,
        page:1,
        count:0,//通话总数
        limit:10,//每页通话数
        currentPage:1,
      }
    },
    created(){
      //初始化请求
      this.project_id=this.$route.params.id;
      this.getData();
    
    },
    mounted:function(){
      document.getElementById('main_content').scrollTop=0;
      this.$store.dispatch('defaultIndexAction','/index/work');
    },
    computed:{
      refresh(){
        return this.$store.getters.GetRefresh
      }  
    },
    watch:{
      refresh:function(val){
        if(val){
          this.getData()
        }
      }
    },
    methods:{
      getData(){
        var  _this=this;
        this.$http('/project/settle_yk',{project_id:this.project_id,page:this.page,limit:this.limit}).then(function(res){
            var d=res.data;
            if(d.code==1000){
              console.log(d.data);
              if(d.data){
                _this.standard_list=d.data.standard_list;
                _this.tabDetalData=d.data.cdr_list;
                _this.count=d.data.cdr_list.length;
                for(var i=0;i<_this.standard_list.length;i++){
                  var data=_this.standard_list[i];
                  _this.total+=(data.total-data.fail_total)*data.yk_commision;
                }
                if(_this.tabDetalData){
                  for(var i=0;i<_this.tabDetalData.length;i++){
                    _this.tabDetalData[i].money='￥'+_this.tabDetalData[i].money;
                  }
                }
              }
              _this.$store.dispatch('refreshAction',false);
              _this.$store.dispatch('loadingAction',false);
            }
          }).catch(function(err){
            console.log(err);
            _this.$store.dispatch('refreshAction',false);
            _this.$store.dispatch('loadingAction',false);
          })
    
      },
      close(){
        console.log(this.value1)//提交评分内容
        this.alert.isshow=false
      },
      sure(){
        this.alert.isshow=false
      },
      getStar(){
        this.alert.isshow=true;
      }
    }
  }
</script>
<style scoped>
  h1,h2,h3,h4,h5,h6,p{font-weight:normal;padding:0;margin:0}
  ul,li,tr,td,th{margin:0;padding:0}
  .myProject{
    margin:25px 0 20px 0;
    font-size:20px;
    color:#333;
  }
  .C-color{
      color:#fe9039;
  }
  .top-Icon{
      display:inline-block;
      width:40px;
      height:38px;
       background:#ccc; 
      vertical-align:middle
  }
  .mag-btm-20{
      margin-bottom:20px;
  }
  .myTable{
      background-color:#F4F4F4;
      padding:25px 20px 20px 20px;
      width:100%;
      border-bottom:5px dotted #fff;
  }
  .myTable tr td:last-child,.myTable tr th:last-child{
    text-align:right;
  }
  .myTable th,.myTable>tbody>tr:last-child>td{
      border-bottom:1px dashed #BFBFBF;
  }
  .myTable>tbody>tr>td{
      height:48px;
      vertical-align:middle;

  }
  .myTable>tfoot>tr>td{
    height:35px;vertical-align:bottom;
  }
  .myTable th,.myTable td{
      font-size:14px;
      color:#666;
      font-weight:normal;
      vertical-align:top;
  }
  .myTable th:not(:last-child),.myTable td:not(:last-child){
      text-align:left;
  }
  .el-table th{
    background-color:red!important;
  }
  .begin1{
  border-color: #feb339;
  color:#feb339;
  transition:all .2s linear;
  }
  .begin1:hover{
    border-color: #feb339;
    background-color:#feb339;
    color:#fff;
  } 
  .qianRuBtn{
    width:88px;
    text-align:center;
    font-size:14px;
    margin-top:10px;
  }
  </style>
  <style>
    .myTable2 .el-table{
      border: 1px solid #ddd!important;
    }
    .myTable2 .el-table th{
    background-color:#eee!important;
  } 
  .myTable2 .el-table__footer-wrapper thead div, .myTable2 .el-table__header-wrapper thead div,.myTable2 tbody div{
    background-color:transparent!important;
    font-weight:normal;
    font-size:14px;
    color:#666!important;
    border-color:#ddd;
  }
  .myTable2 .el-table .cell,.myTable2 .el-table th>div{
    padding-right:0!important;
  }
  .myTable2 .el-table td,.myTable2 .el-table th.is-leaf{
    border-bottom:1px solid #ddd!important;
  }
  .myTable2 .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color:#FAFAFA!important;
  }
</style>
