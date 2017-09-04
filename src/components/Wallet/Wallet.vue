<template>
  <div>
    <div class="item1">
      <p class="tit">
        <span></span>
        <span>钱包管理</span>
        <span>获取发票</span>
        <span>提现设置</span>
      </p>
      <el-row style="margin-top:25px">
        <el-col style="height:300px;border-right:1px solid #eee" :span="12">
          <div style="color:#ff984d;display:flex;align-items:center;margin:15px 0px;margin-bottom:0px">
            <span style="color:#464646;margin-right:260px;margin-left:20px">钱包余额</span>
            <span style="cursor:pointer">申请提现</span>
            <img style="margin-left:10px;cursor:pointer" src="./img/icon1.png">
            <span style="display:inline-block;height:12px;width:2px;background:#ff984d;margin:0px 40px"></span>
            <span style="cursor:pointer">立即充值</span>
          </div>
          <svg height="190" width="100%">
            <circle cx="319" cy="100" r="62" 
              stroke-width="15" style="stroke:url(#orange_red);fill:white"/>
            <text x="275" y="115" fill="#464646" style="font-size:30">￥{{mainData.money.remain}}</text>
              <defs>
                <linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ff9a4c;
                stop-opacity:1"/>
                <stop offset="100%" style="stop-color:#da505c;
                stop-opacity:1"/>
                </linearGradient>
              </defs>
          </svg>
          <div class="num_wap">
            <div>
              <p>￥{{mainData.money.expenses}}</p>
              <p>累计支出金额</p>
            </div>
            <div>
              <p>￥{{mainData.money.freeze}}</p>
              <p>项目托管金额</p>
            </div>
            <div>
              <p>￥{{mainData.money.cash}}</p>
              <p>提现中的金额</p>
            </div>
          </div>
        </el-col>
        <el-col style="height:300px" :span="12">
          <div class="banner">
            <p style="color:#fefefe;margin-left:60px;padding-top:30px;font-size:12px;">预估待结算</p>
            <p style="font-size:42px;color:#fefefe;margin-left:52px;margin-top:40px;">￥{{mainData.month.money}}</p>
            <p style="font-size:14px;color:#fefefe;margin-left:60px;font-weight:light">{{mainData.month.quite}}</p>
            <p style="font-size:12px;color:#fefefe;position:absolute;left:350px;top:250px">
              <span style="display:inline-block;width:5px;height:12px;background:white;"></span>
              您近一个月日均支出为 ￥{{mainData.month.money}}
            </p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="item2">
      <p style="color:#464646;margin-left:40px;padding-top:50px">近三十日支出</p>
      <div style="width:100%;height:400px;" id="echart1"></div>
    </div>
  </div>               
</template>

<script>
     
      export default {
        name:'wallet',
        components:{
        
        },
        data() {
          return {
            mainData:{
              money:{
                  "remain": 0,
                  "freeze": 0,
                  "cash": 0,
                  "expenses": 0
              },
              month:{
                money:'',
                quite:''
              }
            },
            option1:{
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
                  top: '8%',
                  containLabel: true
              },
              xAxis : [
                  {
                      type : 'category',
                      boundaryGap : false,
                      data : []
                  }
              ],
              yAxis : [
                  {
                      type : 'value',
                      maxInterval : 60,
                  }
              ],
              color:['#ffdcd3'],
              series : [
                  {
                      name:'支出',
                      type:'line',
                      stack: '总量',
                      smooth:true,
                      areaStyle: {normal: {}},
                      data:[]
                  },
                 
              ]
            },
          };
        },
        created(){
          this.getinfoData()
        },
        computed: {

        },
        methods: {
          getinfoData(){
            let _this=this;
            this.$http('/guzhu/money/index',{project_id:_this.$route.query.project_id},{},{},'get').then(function(res){
              if(res.data.code==1000){
                _this.mainData=res.data.data;
                _this.option1.xAxis[0].data=Object.keys(_this.mainData.data)
                _this.option1.series[0].data=Object.values(_this.mainData.data)
                _this.$echarts.init(document.getElementById('echart1')).setOption(_this.option1)
              }
              
            },function(err){
              console.log(err)
            })
          },
        },
        mounted(){
          this.$store.dispatch('defaultIndexAction','3');
        }
    }
</script>
 
<style scoped>
  .item1{height: 395px;padding:20px 20px 30px 30px;background: white;margin-top: 30px;}
  .item1 .tit{font-size: 20px;color: #464646;border-bottom: 1px solid #eee;height: 45px;}
  .item1 .tit>span:nth-child(1){display: inline-block;width: 5px;height: 18px;background: #ff944e;margin-right: 10px;vertical-align: center;position: relative;top: 4px}
  .item1 .tit>span:nth-child(2){vertical-align: middle;}
  .item1 .tit>span:nth-child(3),.item1 .tit>span:nth-child(4){display: inline-block;width: 100px;height: 35px;line-height: 35px;border:1px solid #ff7a59;background: linear-gradient(to right, #ff9a4c , #ff7a59);text-align: center;margin-left: 20px;color: white;font-size: 14px;cursor: pointer;float: right;}
  .item1 .tit>span:nth-child(4){background: transparent;color: #ff7a59}
  .banner{background: url('./img/bg.png') no-repeat; background-size: cover;height: 100%;margin-left: 5%;width: 95%;position: relative;}
  .num_wap{display: flex;align-items: center;justify-content: space-between;margin-right: 30px;margin-left: 20px}
  .num_wap>div{text-align: center;}
  .num_wap>div>p:nth-child(1){color: #999999;font-size: 32px;}
  .num_wap>div>p:nth-child(2){color: #464646;font-size: 16px;}

  .item2{height: 470px;background:white;margin-top: 30px;margin-bottom: 30px}
</style>
<style>
  
</style>

