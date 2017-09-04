<template>

  <div class="nocall">
    <p class="title">
      <span><span></span>{{infoData.project_name}}</span>
      <span  class="enter_btn" v-if="$route.query.project_status==2">
        正在进行
      </span>
      <span  class="enter_btn" v-if="$route.query.project_status==6">
        已结算
      </span>
    </p>
    <div class="content11">
      <div class="tit">
        <el-input
          style="width:200px"
          placeholder="搜索客户号码"
          icon="search"
          @change="change"
          v-model="form.searchnum">
        </el-input>

        
        <span class="btn2" @click="exportToExcel">导出数据</span>
        <span class="btn1" @click="search">搜索</span>
        <span style="float:right;line-height:40px;color:#464646;font-size:14px;">共计{{show_table_data.list.length}}条</span>
      </div>

      <el-table
          :data="show_table_data.list"
          stripe
          style="width: 100%;background:#eee;color:#666;margin-top:40px">
          <el-table-column
            prop="phone"
            label="客户电话">
          </el-table-column>
          <el-table-column
            prop="import_date"
            label="通话日期">
          </el-table-column>
          
        </el-table>
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
            form:{
              searchnum:''
            },
            infoData:{},
            detailed_statistics_data:{
              list:[]
            },
            show_table_data:{
              list:[]
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
          go(path){
            this.$router.push({path})
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
            this.$http('/statistics/to_call',{project_id:_this.$route.query.project_id}).then(function(res){
              if(res.data.code==1000){
                _this.detailed_statistics_data=res.data.data;
                _this.show_table_data.list=_this.detailed_statistics_data.list;
              }
              
            },function(err){
              console.log(err)
            })
          },
          search(){
            if(this.form.searchnum==''){
              this.$message({
                message: '请输入要查找的手机号码',
                type: 'warning'
              });
              return;
            }
            this.show_table_data.list=[];
            for(let i in this.detailed_statistics_data.list){
              if(this.detailed_statistics_data.list[i].phone==this.form.searchnum){
                this.show_table_data.list.push(this.detailed_statistics_data.list[i])
              }
            }
          },
          change(){
            if(this.form.searchnum==''){
              this.show_table_data.list=this.detailed_statistics_data.list;
            }
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
          this.$store.dispatch('defaultActiveAction','/index/projectCenter/noCall');
        }
    }
</script>
 
<style scoped>  
  .nocall{padding: 20px;}
  .title{font-size: 20px;color: #313131;display: flex;height: 60px;align-items: center;justify-content: space-between;margin-bottom: 30px}
  .title>span>span{display: inline-block;width: 5px;height: 18px;background: #ff944e;margin-right: 10px;vertical-align: center;position: relative;top: 2px}
  .enter_btn{width: 120px;height: 40px;display: inline-block;border: 1px solid #ff7a59;text-align: center;line-height: 40px;color: #ff7a59;font-size: 14px;}
  .content11{background: white;padding:30px;}

  .content11 .tit .btn1,.content11 .tit .btn2{display: inline-block;width: 100px;height: 35px;line-height: 35px;border:1px solid #ff7a59;background: linear-gradient(to right, #ff9a4c , #ff7a59);text-align: center;margin-left: 20px;color: white;font-size: 14px;cursor: pointer;border-radius: 2px}
  .content11 .tit .btn2{float: right;}
 
</style>
<style>
 .content11 .el-input__inner{border:none;background: #f3f3f3;padding-left: 35px;padding-right: 50px}
 .content11 .el-input__icon{color: #ff7a59;right: 20px;font-size: 20px}
 .content11 .el-table th>.cell{text-align: center;background: white}
 .content11 .el-table th{background: white}
 .content11 .el-table .cell, .el-table th>div{text-align: center;}
</style>

