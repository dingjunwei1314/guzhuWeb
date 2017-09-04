<template>
  <div class="home">
    <div class="item1">
      <div>
        <p>
          <span><span></span>我的项目</span>
          <span @click="see_all">查看全部
            <i class="el-icon-d-arrow-right"></i>
          </span>
        </p>
        <div class="item1_con" style="cursor:pointer;" @click="enter">
          <div style="display:flex;justify-content:space-between;margin-top:15px">
            <p style="display:flex;align-items:center;">
              <span style="margin-right:15px;">{{mainData.list[0].project_name}}</span>
              <span class="item1_con_icon" v-if="mainData.list[0].authen=='个人'">个</span>
              <span class="item1_con_icon" v-else>企</span>
              <span style="color:#999;margin-left:15px;">{{mainData.list[0].type}}业务</span>
            </p>
            <span  class="enter_btn">
              {{mainData.list[0].project_status}}
            </span>
          </div>
          <el-progress style="margin-right:30px;margin-top:10px" :percentage="mainData.list[0].project_schedule"></el-progress>
          <div class="item2">
            <svg width="200">
              <circle cx="78" cy="75" r="65" stroke="#ff8c51"
              stroke-width="18" fill="white"/>
              <path id="ring" stroke="#ff7fab" fill="#ff0254" />
              <circle cx="78" id="progress" cy="75" r="65" 
              fill="white"/>
              <text x="43" y="70" fill="#464646">{{mainData.list[0].fact_num}}/{{mainData.list[0].num_upper}}</text>
              <text x="36" y="95" fill="#464646">云客数量</text>
            </svg>

            <svg width="200">
              <circle cx="78" cy="75" r="65" stroke="#ff7fab"
              stroke-width="18" fill="white"/>
              <path id="ring2" fill="#ff0254" />
              <circle cx="78" id="progress" cy="75" r="65" 
              fill="white"/>
              <text x="58" y="70" fill="#464646">{{mainData.list[0].call_through_rate}}%</text>
              <text x="48" y="95" fill="#464646">接通率</text>
            </svg>


            <svg width="200">
              <circle cx="78" cy="75" r="65" stroke="#ff9a4c"
              stroke-width="18" fill="white"/>
              <path id="ring3" fill="#ff7a59" />
              <circle cx="78" id="progress" cy="75" r="65" 
              fill="white"/>
              <text x="58" y="70" fill="#464646">{{mainData.list[0].success_rate}}%</text>
              <text x="48" y="95" fill="#464646">成单率</text>
            </svg>
          </div>
          <p style="color:#999;font-size:14px;text-align:right;margin-top:30px">发布日期：{{mainData.list[0].project_begin_time}} / 截止日期：{{mainData.list[0].project_end_time}}</p>
        </div>

        <p v-if="mainData.list.length==0" style="text-align:center;color:#464646;padding-top:100px">还没有发布项目噢</p>
      </div>
      <div>
        <img :src="mainData.user_info[0].icon">  
        <p>{{mainData.user_info[0].mobile}}</p> 
        <p @click="publish">发布项目</p>
      </div>
    </div>


    <div class="item2">
      <div>
        <p>
          <span><span></span>最新消息</span>
          <span>查看全部
            <i class="el-icon-d-arrow-right"></i>
          </span>
        </p>
        <ul class='Mylist'>
          <p v-if="mainData.hot_news.length==0" style="text-align:center;color:#464646;padding-top:100px">还没有消息噢</p>
          <li class='list-style-red-1 text-gray-6' v-for="(item,index) in mainData.hot_news" :key="index">
            <div class='rt text-gray-9 h5' style='width:100px'>
              <p style='text-align:right'>{{item.create_time.slice(0,10)}}</p>
              <p style='text-align:right'>{{item.create_time.slice(10)}}</p>
            </div>
            <div class='rt' style='width:460px;cursor:pointer;margin-right:30px'  @click='getMsgDetail(msg.id,index)'>
              <p><b>{{item.title}}</b></p>
              <p style='height:25px' class='myOverElli'>
             {{item.content}}</p>
            </div>
            <div style='width:160px;' class='radingMsg'>
              <img src="./img/1.jpg" alt="" style='width:38px;height:38px;margin-top:21px;vertical-align:top;border-radius:50%'>
              <span style='padding-left:5px;padding-right:10px;border-right:1px solid #ccc'>{{item.name}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <p>
          <span><span></span>钱包详情</span>
          <span style="cursor:pointer">查看详情
            <i class="el-icon-d-arrow-right"></i>
          </span>
        </p>
        <div style="font-weight:bold;font-size:46px;color:#464646;text-align:center;margin-top:25px;">¥{{mainData.wallet.remain}}</div>
        <div style="color:#ff984d;display:flex;justify-content:center;align-items:center;margin:15px 0px">
          <span style="cursor:pointer">申请提现</span>
          <img style="margin-left:10px;cursor:pointer" src="./img/icon1.png">
          <span style="display:inline-block;height:12px;width:2px;background:#ff984d;margin:0px 50px"></span>
          <span style="cursor:pointer">立即充值</span>
        </div>

        <div class="mon_item">
          <div>
            <img src="./img/icon2.png">
            <p>¥{{mainData.wallet[0].freeze}}</p>
            <p>项目冻结金额</p>
          </div>
          <div>
            <img src="./img/icon3.png">
            <p>¥{{mainData.wallet[0].expenses}}</p>
            <p>累计支出金额</p>
          </div>
          <div>
            <img src="./img/icon4.png">
            <p>¥{{mainData.wallet[0].freeze}}</p>
            <p>提现中的金额</p>
          </div>
        </div>
      </div>
    </div>
  </div>               
</template>
 
<script>
     
      export default {
        name:'home',
        components:{
        
        },
        data() {
          return {
            mainData:{
              list:[{

              }],
              user_info:[
              {

              }],
              wallet:[{}],
              hot_news:[{create_time:''}]
            }
          };
        },
        created(){
          this.getData()
        },
        computed: {

        },
        methods: {
          draw(path,progress,r,t_x,t_y) {
              path.setAttribute('transform', 'translate('+t_x+','+t_y+')');
              var degrees = progress * (360/100);  
              var rad = degrees* (Math.PI / 180);
              var x = (Math.sin(rad) * r).toFixed(2);
              var y = -(Math.cos(rad) * r).toFixed(2);
              var lenghty = window.Number(degrees > 180);
              var descriptions = ['M', 0, 0, 'v', -r, 'A', r, r, 100, lenghty, 1, x, y, 'z'];
              path.setAttribute('d', descriptions.join(' '));
          },
          getData(){
            let _this=this;
            this.$http('/guzhu/project/master_core').then(function(res){
              if(res.data.code==1000){
                _this.mainData=res.data.data
                _this.mainData.list[0].project_schedule=Number(_this.mainData.list[0].project_schedule)


                _this.draw(document.getElementById('ring'),(_this.mainData.list[0].fact_num/_this.mainData.list[0].num_upper)*100,74,78,75)
                _this.draw(document.getElementById('ring2'),_this.mainData.list[0].call_through_rate,74,78,75)
                _this.draw(document.getElementById('ring3'),_this.mainData.list[0].success_rate,74,78,75)
                console.log(_this.mainData)


              }
              
            },function(err){
              console.log(err)
            })
          },
          publish(){
            this.$router.push({path:'/index/publishproject'})
          },
          enter(){
            this.$router.push({path:'/index/projectCenter/statistics?project_id=1&project_status=2'})
          },
          see_all(){
            this.$router.push({path:'/index/projectlist'})
          }
        },
        mounted(){
          this.$store.dispatch('defaultIndexAction','1');
          
        }
    }
</script>
 
<style scoped  type="text/css" lang="scss">
$comcolor1:#ff7a59;

.home{padding: 30px;}
.item1,.item2{display: flex;justify-content: space-between;}
.item1>div:nth-child(1),.item2>div:nth-child(1){width: 740px;height: 385px;background: white;padding: 30px;}
.item1>div:nth-child(2),.item2>div:nth-child(2){width: 400px;height: 445px;background: white}
.item2>div:nth-child(1){height:310px}
.item2>div:nth-child(2){height:310px;width:360px}
.item1>div:nth-child(1)>p,.item2>div:nth-child(1)>p,.item2>div:nth-child(2)>p{border-bottom: 1px solid #eee;font-size: 20px;color: #313131;display: flex;height: 40px;align-items: center;justify-content: space-between;}
.item1>div:nth-child(1)>p>span:nth-child(1)>span,.item2>div:nth-child(1)>p>span:nth-child(1)>span,.item2>div:nth-child(2)>p>span:nth-child(1)>span{display: inline-block;width: 5px;height: 18px;background: #ff944e;margin-right: 10px;vertical-align: center;position: relative;top: 2px}
.item1>div:nth-child(1)>p>span:nth-child(2) i,.item2>div:nth-child(1)>p>span:nth-child(2) i,.item2>div:nth-child(2)>p>span:nth-child(2) i{color: #313131;margin-left: 5px}
.item1>div:nth-child(1)>p>span,.item2>div:nth-child(1)>p>span{cursor: pointer;}
.item1_con{color: #464646;font-size: 20px;}
.item2>div:nth-child(2){padding:30px 20px}
.item1_con>p:nth-child(1){display: flex;align-items: center;height: 80px;justify-content: space-between;}
.item1_con_icon{display: inline-block;width: 20px;height: 20px;background: #dddddd;border-radius: 2px;line-height: 20px;text-align: center;color: white;font-size: 12px;}
.enter_btn{width: 120px;height: 40px;display: inline-block;border: 1px solid $comcolor1;text-align: center;line-height: 40px;color: $comcolor1;font-size: 14px;}
.item2{display:flex;align-items:center;justify-content:space-between;margin-top:40px}


.item1>div:nth-child(2){background:url('./img/bg.png') no-repeat;display:flex;flex-direction:column;align-items:center}
.item1>div:nth-child(2)>img{width:160px;height:160px;border-radius:100%;margin-top:50px}
.item1>div:nth-child(2)>p:nth-child(2){font-weight:bold;font-size:20px;color:#464646;margin-top:5px;}
.item1>div:nth-child(2)>p:nth-child(3){width:115px;height:35px;background:linear-gradient(to right, #ff9a4c , $comcolor1);line-height:35px;text-align:center;color:white;font-size:16px;border-radius:20px;cursor:pointer;margin-top:10px}

.mon_item{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #eee}
.mon_item div{text-align:center;color:#999;padding-top:20px}
.mon_item div img{}
.mon_item div>p:nth-child(2){color:#333}
  .Mylist{
 

    margin-bottom:10px;
  }
  .Mylist li{
    height:80px;
    box-sizing:border-box;
    line-height:80px;
    border-top:1px solid #EEEDED;
    font-size:14px;
    color:#666;
  }
  .Mylist li .rt{
    height:80px;
    padding:15px 0;
    line-height:25px;
    box-sizing:border-box;
    cursor:pointer;
  }
  .Mylist li .rt p,.Mylist li .rt b{
    cursor:pointer;
  }
  .Mylist li .rt b{
    font-weight:normal;
    color:#333;
  }

  .myOverElli{overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;}
</style>
<style>
  .el-progress-bar__inner{background:linear-gradient(to right, #ff9a4c , #ff7a59); }
</style>

