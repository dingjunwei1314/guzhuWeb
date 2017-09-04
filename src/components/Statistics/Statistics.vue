<template>

  <div class="statistics">
    <p class="title">
      <span><span></span>{{infoData.project_name}}</span>
      <span  class="enter_btn">
        正在进行
      </span>
    </p>
    <div class="item1">
      <div class="left">
        <p class="tit">当前完成进度</p>
        <div style="width:100%;height:200px;margin-top:20px" id="echart1"></div>
        <p class="tit_lab">
          <span style="background:#da4d57"></span>
          呼出已接通
        </p>
        <p class="tit_lab">
          <span style="background:#ed2a55"></span>
          呼出未接通
        </p>
        <p class="tit_lab">
          <span style="background:#fe8b48"></span>
          未呼出
        </p>
      </div>
      <div class="center">
        <p class="tit">当前通话结果</p>
        <div style="width:100%;height:200px;margin-top:20px" id="echart2"></div>
        <el-row>
          <el-col :span="12">
            <p class="tit_lab">
              <span style="background:#244798"></span>
              成功
            </p>
          </el-col>
          <el-col :span="12">
            <p class="tit_lab">
              <span style="background:#ff0254"></span>
              无人接听
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p class="tit_lab">
              <span style="background:#82a2fa"></span>
              不成功
            </p>
          </el-col>
          <el-col :span="12">
            <p class="tit_lab">
              <span style="background:#fd6178"></span>
              拒接
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p class="tit_lab">
              <span style="background:#ff7a59"></span>
              预约待跟进
            </p>
          </el-col>
          <el-col :span="12">
            <p class="tit_lab">
              <span style="background:#ff7fab"></span>
              关机
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p class="tit_lab">
              <span style="background:#78c8e6"></span>
              停机
            </p>
          </el-col>
          <el-col :span="12">
            <p class="tit_lab">
              <span style="background:#d84258"></span>
              空号
            </p>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <p class="tit">当前预计支出</p>
        <p style="font-size:40px;color:#464646;margin-left:28px;margin-top:5px">￥{{mainData.project.expenditure}}</p>
        <div style="width:90%;height:250px;margin:0 auto;margin-top:20px;" id="echart3"></div>
      </div>
    </div>

    <div class="item2">
      <div class="left">
        <p style="margin-left:220px;margin-top:30px;font-size:16px">云客上限{{mainData.seating.upper_limit}}位</p>
        <div style="margin-left:220px;text-align:center;margin-top:20px">
          <svg width="200">
            <path id="progress1" stroke="#ff7fab" fill="#ff8656" />
            <circle cx="78"  cy="75" r="50" 
            fill="white"/>
            <text x="61" y="80" fill="#464646">{{(mainData.seating.total/mainData.seating.upper_limit*100).toFixed(0)}}%</text>
          </svg>
        </div>
        <p style="margin-left:220px;margin-top:10px">当前共有 {{mainData.seating.total}} 位坐席为您的项目服务</p>
       
      </div>
      <div class="right">
        <p style="font-size:16px;margin-bottom:40px">状态分析65位</p>
        <el-row style="margin:12px 0px;">
          <el-col :span="12">签出状态</el-col>
          <el-col :span="12" style="text-align:right">{{mainData.seating.checkout}}位</el-col>
        </el-row>
        <el-progress class="pro1" :percentage="mainData.seating.checkout" :show-text="false"></el-progress>
        <el-row style="margin:12px 0px;">
          <el-col :span="12">签入状态</el-col>
          <el-col :span="12" style="text-align:right">{{mainData.seating.checkin}}位</el-col>
        </el-row>
        <el-progress class="pro2" :percentage="mainData.seating.checkin" :show-text="false"></el-progress>
        <el-row style="margin:12px 0px;">
          <el-col :span="12">未在线</el-col>
          <el-col :span="12" style="text-align:right">{{mainData.seating.not_online}}位</el-col>
        </el-row>
        <el-progress class="pro3" :percentage="mainData.seating.not_online" :show-text="false"></el-progress>
      </div>
    </div>
    
    <div class="item3">
      <p style="margin-left:20px;padding-top:30px;font-size:16px">业务概况</p>
      <el-select @change="chaneday" class="dayselect" v-model="formData.day_type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.day_type"
          :label="item.label"
          :value="item.day_type">
        </el-option>
      </el-select>

      <div style="height:300px;margin-top:20px" id="echart4"></div>
      <p class="tit_lab" style="margin-top:30px;padding-left:30px">
        <span style="background:#ffdcd3;margin-left:20px;"></span>
        接通量
        <span style="background:#fff0df;margin-left:20px;"></span>
        拨打量
        <span style="background:#78c8e6;margin-left:20px;"></span>
        回拨量
      </p>
    </div>
  </div>               
</template>

<script>
     
      export default {
        name:'Statistics',
        components:{
        
        },
        data() {
          return {
            mainData:{
              project:{
                expenditure:'',

              },
              seating:{
                upper_limit:'',
                not_online:0,
                checkout:0,
                checkin:0
              }
            },
            formData:{
              project_id:'',
              type:'',
              day_type:'1'
            },
            options:[
              {
                label:'今日',
                day_type:'1'
              },
              {
                label:'昨日',
                day_type:'2'
              },
              {
                label:'近七日',
                day_type:'3'
              },
              {
                label:'近三十日',
                day_type:'4'
              }
            ],
            dayData:{
            },
            infoData:{},
            option1:{
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              series: [
                  {
                      name:'完成进度',
                      type:'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                          normal: {
                              show: false,
                              position: 'center'
                          },
                          emphasis: {
                              show: true,
                              textStyle: {
                                  fontSize: '18',
                                  fontWeight: 'bold'
                              }
                          }
                      },
                      color:['#da4d57','#ed2a55','#fe8b48'],
                      labelLine: {
                          normal: {
                              show: false
                          }
                      },
                      data:[
                          {value:0, name:'呼出已接通'},
                          {value:0, name:'呼出未接通'},
                          {value:0, name:'未呼出'},
                      ]
                  }
              ]
            },
            option2:{
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              series: [
                  {
                      name:'通话结果',
                      type:'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                          normal: {
                              show: false,
                              position: 'center'
                          },
                          emphasis: {
                              show: true,
                              textStyle: {
                                  fontSize: '18',
                                  fontWeight: 'bold'
                              }
                          }
                      },
                      color:['#244798','#82a2fa','#ff7a59','#78c8e6','#ff0254','#fd6178','#ff7fab','#d84258'],
                      labelLine: {
                          normal: {
                              show: false
                          }
                      },
                      data:[
                          {value:0, name:'成功'},
                          {value:0, name:'不成功'},
                          {value:0, name:'预约待跟进'},
                          {value:0, name:'停机'},
                          {value:0, name:'无人接听'},
                          {value:0, name:'拒接'},
                          {value:0, name:'关机'},
                          {value:0, name:'空号'},
                      ]
                  }
              ]
            },

            option3:{
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross'
                  }
              },
              xAxis:  {
                  type: 'category',
                  boundaryGap: false,
                  data: ['S','M','T','W','T','F','S']
              },
              yAxis: {
                  show:false,
                  type: 'value',
                  axisLabel: {
                      formatter: '{value}'
                  },
                  axisPointer: {
                      snap: true
                  }
              },
              visualMap: {
                  show: false,
                  dimension: 0,
                  pieces: [{
                      lte: 6,
                      color: 'green'
                  }, {
                      gt: 6,
                      lte: 8,
                      color: 'red'
                  }, {
                      gt: 8,
                      lte: 14,
                      color: 'green'
                  }, {
                      gt: 14,
                      lte: 17,
                      color: 'red'
                  }, {
                      gt: 17,
                      color: 'green'
                  }]
              },
              series: [
                  {
                      name:'预计支出',
                      type:'line',
                      smooth: true,
                      data: [300, 280, 250, 260, 270, 300, 100],
                      
                  }
              ]
            },
            option4:{
              tooltip : {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross',
                      label: {
                          backgroundColor: '#6a7985'
                      }
                  }
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis : [
                  {
                      type : 'category',
                      boundaryGap : false,
                      data : [
                        '1:00' , 
                        '2:00' , 
                        '3:00' , 
                        '4:00' , 
                        '5:00' , 
                        '6:00' , 
                        '7:00' , 
                        '8:00' , 
                        '9:00' ,
                        '10:00', 
                        '11:00', 
                        '12:00', 
                        '13:00', 
                        '14:00', 
                        '15:00',
                        '16:00', 
                        '17:00', 
                        '18:00', 
                        '19:00', 
                        '20:00', 
                        '21:00', 
                        '22:00', 
                        '23:00', 
                        '24:00'
                      ]
                  }
              ],
              yAxis : [
                  {
                      type : 'value',
                      maxInterval : 60,
                  }
              ],
              color:['#ffdcd3','#fff0df','#78c8e6'],
              series : [
                  {
                      name:'接通量',
                      type:'line',
                      stack: '总量',
                      smooth:true,
                      areaStyle: {normal: {}},
                      data:[]
                  },
                  {
                      name:'拨打量',
                      type:'line',
                      stack: '总量',
                      smooth:true,
                      areaStyle: {normal: {}},
                      data:[]
                  },
                  {
                      name:'回拨量',
                      type:'line',
                      stack: '总量',
                      smooth:true,
                      areaStyle: {normal: {}},
                      data:[]
                  },
                 
              ]
            },
            daytime:[
              '1:00' , 
              '2:00' , 
              '3:00' , 
              '4:00' , 
              '5:00' , 
              '6:00' , 
              '7:00' , 
              '8:00' , 
              '9:00' ,
              '10:00', 
              '11:00', 
              '12:00', 
              '13:00', 
              '14:00', 
              '15:00',
              '16:00', 
              '17:00', 
              '18:00', 
              '19:00', 
              '20:00', 
              '21:00', 
              '22:00', 
              '23:00', 
              '24:00'
            ]
          };
        },
        created(){
          this.getData()
          this.getinfoData()
          let _this=this;
          this.$store.dispatch('defaultActiveAction','/index/projectCenter/statistics');
        },
        computed: {
          
        },
        methods: {
          go(path){
            this.$router.push({path})
          },
          getData(){
            let _this=this;
            this.$http('/statistics/project_statistics',{project_id:_this.$route.query.project_id}).then(function(res){
              if(res.data.code==1000){
                _this.mainData=res.data.data;


                _this.mainData.project.call_status.forEach(function(item,index){
                  _this.option1.series[0].data[index].value=item
                })

                _this.mainData.project.current_status.forEach(function(item,index){
                  _this.option2.series[0].data[index].value=item
                })

                _this.option3.series[0].data=_this.mainData.project.projected_expenditure

                _this.$echarts.init(document.getElementById('echart1')).setOption(_this.option1)
                _this.$echarts.init(document.getElementById('echart2')).setOption(_this.option2)
                _this.$echarts.init(document.getElementById('echart3')).setOption(_this.option3)
                

                _this.draw('progress1',(_this.mainData.seating.total/_this.mainData.seating.upper_limit*100).toFixed(0)-0.01,74,78,75)

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
                _this.formData.type=_this.infoData.type;
                _this.formData.project_id=_this.$route.query.project_id

                _this.getDayData()
              }
              
            },function(err){
              console.log(err)
            })
          },
          getDayData(){
            let _this=this;
            this.$http('/statistics/business_profile',_this.formData).then(function(res){
              if(res.data.code==1000){
                if(_this.formData.day_type=='3' || _this.formData.day_type=='4'){
                  _this.option4.xAxis[0].data=res.data.data.day
                }else{
                  _this.option4.xAxis[0].data=_this.daytime
                }

                _this.option4.series[0].data=res.data.data.values['1']
                _this.option4.series[1].data=res.data.data.values['2']
                _this.option4.series[2].data=res.data.data.values['3']
                _this.$echarts.init(document.getElementById('echart4')).setOption(_this.option4)

              }
              
            },function(err){
              console.log(err)
            })
          },
          chaneday(){
            this.getDayData()
          },
          draw(path,progress,r,t_x,t_y) {
              var path=document.getElementById(path)
              path.setAttribute('transform', 'translate('+t_x+','+t_y+')');
              var degrees = progress * (360/100);  
              var rad = degrees* (Math.PI / 180);
              var x = (Math.sin(rad) * r).toFixed(2);
              var y = -(Math.cos(rad) * r).toFixed(2);
              var lenghty = window.Number(degrees > 180);
              var descriptions = ['M', 0, 0, 'v', -r, 'A', r, r, 100, lenghty, 1, x, y, 'z'];
              path.setAttribute('d', descriptions.join(' '));
          },
        },
        mounted(){
          
        }
    }
</script>
 
<style scoped>
  .statistics{padding: 20px;}
  .item1,.item2{display: flex;align-items: center;justify-content: space-between;}
  .item1>div{width: 335px;height: 415px;background: white;}
  .item1>div>.tit{font-size: 16px;color: #464646;margin-top: 35px;margin-left: 35px;}
  .title{font-size: 20px;color: #313131;display: flex;height: 60px;align-items: center;justify-content: space-between;margin-bottom: 30px}
  .title>span>span{display: inline-block;width: 5px;height: 18px;background: #ff944e;margin-right: 10px;vertical-align: center;position: relative;top: 2px}
  .enter_btn{width: 120px;height: 40px;display: inline-block;border: 1px solid #ff7a59;text-align: center;line-height: 40px;color: #ff7a59;font-size: 14px;}
  .item1 .left .tit_lab,.center .tit_lab{color: #464646;font-size: 14px;margin-left: 55px;margin-top: 10px}
  .item1 .left .tit_lab span{display: inline-block;width: 10px;height: 10px;border-radius: 100%;}
  .item1 .center .tit_lab span{display: inline-block;width: 10px;height: 10px;border-radius: 100%;}

  .item2{margin-top: 20px}
  .item2 .left{width: 515px;height: 280px;background: white;background: url('./img/bg4.png') no-repeat;background-size: cover;font-size: 16px;color: #464646}
  .item2 .right{width: 475px;height: 220px;background: white;padding: 30px 20px}
  .item3{height: 470px;background: white;margin-top: 20px;position: relative;}
  .item3 .tit_lab span{display: inline-block;width: 10px;height: 10px;border-radius: 100%;}

  .dayselect{width: 150px;position: absolute;right: 20px;top: 30px;}
</style>
<style>
  .pro1 .el-progress-bar__inner{background:linear-gradient(to right, #ff9a4c , #ff7a59)}
  .pro2 .el-progress-bar__inner{background:linear-gradient(to right, #a04bc9 , #2081c5)}
  .pro3 .el-progress-bar__inner{background:linear-gradient(to right, #b849aa , #d44768)}
  .el-select-dropdown__item.selected.hover{background: #ffac52}
  .el-select-dropdown__item.selected{background: #ffac52}
  .el-select .el-input__inner:focus{border-color: #ffac52}
</style>

