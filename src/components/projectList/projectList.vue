<template>
  <div class="home">
    <p class="main_tit">
          <span><span></span>项目中心</span>
          <span>
            您共计发布了 {{mainData.project_sum}} 个项目 
          </span>
    </p>

    <div class="item1" style="width:100%;position:relative">

      <div class="list_item"  v-for="(item,index) in mainData.list">
        

        <div style="background:white;width:740px;padding:20px 30px;height:335px;cursor:pointer;" @click="enter(item.project_status,item.project_id)"   v-show="item.project_status==2">
          <div class="item1_con">
            <p>
              <span>{{item.project_name}}</span>
              <span v-if="item.authen=='个人'">个</span>
              <span v-else>企</span>
              <span style="margin-left:-150px;color:#999">{{item.type}}业务</span>
              <span v-if="item.project_status==2"  class="enter_btn">
                正在进行
              </span>
              <span v-else-if="item.project_status==1"  class="enter_btn">
                正在审核
              </span>

              <span v-else-if="item.project_status==5"  class="enter_btn">
                审核失败
              </span>

              <span v-else-if="item.project_status==6"  class="enter_btn">
                等待结算
              </span>

              <span v-else-if="item.project_status==3"  class="enter_btn">
                已结算
              </span>

              <span v-else  class="enter_btn">
                已撤销
              </span>
            </p>
            <el-progress style="margin-right:30px;margin-top:10px" :percentage="item.project_schedule"></el-progress>
            <div class="item2">
              <svg width="200">
                <circle cx="78" cy="75" r="65" stroke="#ff8c51"
                stroke-width="18" fill="white"/>
                <path :id="'progress1'+index" stroke="#ff7fab" fill="#ff0254" />
                <circle cx="78"  cy="75" r="65" 
                fill="white"/>
                <text x="43" y="70" fill="#464646">{{item.fact_num}}/{{item.num_upper}}</text>
                <text x="36" y="95" fill="#464646">云客数量</text>
              </svg>

              <svg width="200">
                <circle cx="78" cy="75" r="65" stroke="#ff7fab"
                stroke-width="18" fill="white"/>
                <path :id=" 'progress2' + index" fill="#ff0254" />
                <circle cx="78"  cy="75" r="65" 
                fill="white"/>
                <text x="58" y="70" fill="#464646">{{item.call_through_rate}}%</text>
                <text x="48" y="95" fill="#464646">接通率</text>
              </svg>


              <svg width="200">
                <circle cx="78" cy="75" r="65" stroke="#ff9a4c"
                stroke-width="18" fill="white"/>
                <path :id=" 'progress3' + index" fill="#ff7a59" />
                <circle cx="78"  cy="75" r="65" 
                fill="white"/>
                <text x="58" y="70" fill="#464646">{{item.success_rate}}%</text>
                <text x="48" y="95" fill="#464646">成单率</text>
              </svg>
            </div>
            <p style="color:#999;font-size:14px;text-align:right;margin-top:15px">发布日期：{{item.project_begin_time}} / 截止日期：{{item.project_end_time}}</p>
          </div>
        </div>

        <div style="background:white;width:740px;padding:20px 30px;height:335px;cursor:pointer;" @click="enter(item.project_status,item.project_id)" v-show="item.project_status==6">
          <div class="item1_con">
            <p>
              <span>{{item.project_name}}</span>
              <span v-if="item.authen=='个人'">个</span>
              <span v-else>企</span>
              <span style="margin-left:-150px;color:#999">{{item.type}}业务</span>
              <span v-if="item.project_status==2"  class="enter_btn">
                正在进行
              </span>
              <span v-else-if="item.project_status==1"  class="enter_btn">
                正在审核
              </span>

              <span v-else-if="item.project_status==5"  class="enter_btn">
                审核失败
              </span>

              <span v-else-if="item.project_status==6"  class="enter_btn">
                等待结算
              </span>

              <span v-else-if="item.project_status==3"  class="enter_btn">
                已结算
              </span>

              <span v-else  class="enter_btn">
                已撤销
              </span>
            </p>
            <el-progress style="margin-right:30px;margin-top:10px" :percentage="item.project_schedule"></el-progress>
            <div class="item2">
              <svg width="200">
                <circle cx="78" cy="75" r="65" stroke="#ff8c51"
                stroke-width="18" fill="white"/>
                <path :id="'progress1'+index" stroke="#ff7fab" fill="#ff0254" />
                <circle cx="78"  cy="75" r="65" 
                fill="white"/>
                <text x="43" y="70" fill="#464646">{{item.fact_num}}/{{item.num_upper}}</text>
                <text x="36" y="95" fill="#464646">云客数量</text>
              </svg>

              <svg width="200">
                <circle cx="78" cy="75" r="65" stroke="#ff7fab"
                stroke-width="18" fill="white"/>
                <path :id=" 'progress2' + index" fill="#ff0254" />
                <circle cx="78"  cy="75" r="65" 
                fill="white"/>
                <text x="58" y="70" fill="#464646">{{item.call_through_rate}}%</text>
                <text x="48" y="95" fill="#464646">接通率</text>
              </svg>


              <svg width="200">
                <circle cx="78" cy="75" r="65" stroke="#ff9a4c"
                stroke-width="18" fill="white"/>
                <path :id=" 'progress3' + index" fill="#ff7a59" />
                <circle cx="78"  cy="75" r="65" 
                fill="white"/>
                <text x="58" y="70" fill="#464646">{{item.success_rate}}%</text>
                <text x="48" y="95" fill="#464646">成单率</text>
              </svg>
            </div>
            <p style="color:#999;font-size:14px;text-align:right;margin-top:15px">发布日期：{{item.project_begin_time}} / 截止日期：{{item.project_end_time}}</p>
          </div>
        </div>

        <div style="background:white;width:740px;padding:20px 30px;height:335px;cursor:pointer"  @click="enter(item.project_status,item.project_id)" v-if="item.project_status==1">
          <div class="item1_con">
            <p>
              <span>{{item.project_name}}</span>
              <span v-if="item.authen=='个人'">个</span>
              <span v-else>企</span>
              <span style="margin-left:-150px;color:#999">{{item.type}}业务</span>
              <span v-if="item.project_status==2"  class="enter_btn">
                正在进行
              </span>
              <span v-else-if="item.project_status==1"  class="enter_btn">
                正在审核
              </span>

              <span v-else-if="item.project_status==5"  class="enter_btn">
                审核失败
              </span>

              <span v-else-if="item.project_status==6"  class="enter_btn">
                等待结算
              </span>

              <span v-else-if="item.project_status==3"  class="enter_btn">
                已结算
              </span>

              <span v-else  class="enter_btn">
                已撤销
              </span>
            </p>
            <el-progress style="margin-right:30px;margin-top:10px" :percentage="0"></el-progress>
            <div class="item2_bg">
              {{item.error}}
            </div>
            <p style="color:#999;font-size:14px;text-align:right;margin-top:15px">发布日期：{{item.project_begin_time}} / 截止日期：{{item.project_end_time}}</p>
          </div>
        </div>


        <div style="background:white;width:740px;padding:20px 30px;height:335px;cursor:pointer"  @click="enter(item.project_status,item.project_id)" v-if="item.project_status==5">
          <div class="item1_con">
            <p>
              <span>{{item.project_name}}</span>
              <span v-if="item.authen=='个人'">个</span>
              <span v-else>企</span>
              <span style="margin-left:-150px;color:#999">{{item.type}}业务</span>
              <span v-if="item.project_status==2"  class="enter_btn">
                正在进行
              </span>
              <span v-else-if="item.project_status==1"  class="enter_btn">
                正在审核
              </span>

              <span v-else-if="item.project_status==5"  class="enter_btn">
                审核失败
              </span>

              <span v-else-if="item.project_status==6"  class="enter_btn">
                等待结算
              </span>

              <span v-else-if="item.project_status==3"  class="enter_btn">
                已结算
              </span>

              <span v-else  class="enter_btn">
                已撤销
              </span>
            </p>
            <el-progress style="margin-right:30px;margin-top:10px" :percentage="0"></el-progress>
            <div class="item2_bg_err">
              {{item.error}}
            </div>
            <p style="color:#999;font-size:14px;text-align:right;margin-top:15px">发布日期：{{item.project_begin_time}} / 截止日期：{{item.project_end_time}}</p>
          </div>
        </div>

        <div style="background:white;width:740px;padding:20px 30px;height:335px;cursor:pointer"  @click="enter(item.project_status,item.project_id)" v-if="item.project_status==4">
          <div class="item1_con">
            <p>
              <span>{{item.project_name}}</span>
              <span v-if="item.authen=='个人'">个</span>
              <span v-else>企</span>
              <span style="margin-left:-150px;color:#999">{{item.type}}业务</span>
              <span v-if="item.project_status==2"  class="enter_btn">
                正在进行
              </span>
              <span v-else-if="item.project_status==1"  class="enter_btn">
                正在审核
              </span>

              <span v-else-if="item.project_status==5"  class="enter_btn">
                审核失败
              </span>

              <span v-else-if="item.project_status==6"  class="enter_btn">
                等待结算
              </span>

              <span v-else-if="item.project_status==3"  class="enter_btn">
                已结算
              </span>

              <span v-else  class="enter_btn">
                已撤销
              </span>
            </p>
            <el-progress style="margin-right:30px;margin-top:10px" :percentage="0"></el-progress>
            <div class="item2_bg_err">
              {{item.error}}
            </div>
            <p style="color:#999;font-size:14px;text-align:right;margin-top:15px">发布日期：{{item.project_begin_time}} / 截止日期：{{item.project_end_time}}</p>
          </div>
        </div>

        <div style="background:white;width:740px;padding:20px 30px;height:335px;cursor:pointer"  @click="enter(item.project_status,item.project_id)" v-if="item.project_status==3">
          <div class="item1_con">
            <p>
              <span>{{item.project_name}}</span>
              <span v-if="item.authen=='个人'">个</span>
              <span v-else>企</span>
              <span style="margin-left:-150px;color:#999">{{item.type}}业务</span>
              <span v-if="item.project_status==2"  class="enter_btn">
                正在进行
              </span>
              <span v-else-if="item.project_status==1"  class="enter_btn">
                正在审核
              </span>

              <span v-else-if="item.project_status==5"  class="enter_btn">
                审核失败
              </span>

              <span v-else-if="item.project_status==6"  class="enter_btn">
                等待结算
              </span>

              <span v-else-if="item.project_status==3"  class="enter_btn">
                已结算
              </span>

              <span v-else  class="enter_btn">
                已撤销
              </span>
            </p>
            <el-progress style="margin-right:30px;margin-top:10px" :percentage="0"></el-progress>
            <div class="item2_bg_over">
              <p style="font-size:40px;line-height:70px;">￥{{item.number}}</p>
              <p style="line-height:20px;font-size:16px;">项目共计支出</p>
            </div>
            <p style="color:#999;font-size:14px;text-align:right;margin-top:15px">发布日期：{{item.project_begin_time}} / 截止日期：{{item.project_end_time}}</p>
          </div>
        </div>

      </div>


      <div class="right_con" style="float:right;position:absolute;right:0px;top:0px">
        <div class="self_info">
          <img :src="mainData.user_info['1']">  
          <p>{{mainData.user_info['2']}}</p> 
          <p>发布项目</p>
        </div>

        <div class="project_total">
          <p>
            <span><span></span>正在进行中的项目 {{mainData.project_info.conduct}} 个</span>
          </p>

          <div class="mon_item">
            <div>
              <img src="./img/icon2.png">
              <p>{{mainData.project_info.no_start}}</p>
              <p>项目冻结金额</p>
            </div>
            <div>
              <img src="./img/icon3.png">
              <p>{{mainData.project_info.wait_settlement}}</p>
              <p>累计支出金额</p>
            </div>
            <div>
              <img src="./img/icon4.png">
              <p>{{mainData.project_info.settlement}}</p>
              <p>提现中的金额</p>
            </div>
          </div>
        </div>


      </div>

      <div style="clear:both"></div>
    </div>

  </div>               
</template>
 
<script>
     
      export default {
        name:'projectlist',
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
              project_info:[{}]

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
          getData(){
            let _this=this;
            this.$http('/guzhu/project/project_center').then(function(res){
              if(res.data.code==1000){
                _this.mainData=res.data.data
                console.log(_this.mainData)

                for(let i in _this.mainData.list){
                  if(_this.mainData.list[i].project_schedule){
                    _this.mainData.list[i].project_schedule=Number(_this.mainData.list[i].project_schedule)
                  }
                  

                  if(_this.mainData.list[i].project_status==2||_this.mainData.list[i].project_status==6){

                    _this.$nextTick(function(){
                     
                        _this.draw('progress1'+i,(_this.mainData.list[i].fact_num/_this.mainData.list[i].num_upper)*100,74,78,75)
                        _this.draw('progress2'+i,_this.mainData.list[i].call_through_rate,74,78,75)
                        _this.draw('progress3'+i,_this.mainData.list[i].success_rate,74,78,75)
                     
                    })
                    
                  }
                }                
                console.log(_this.mainData)
              }
              
            },function(err){
              console.log(err)
            })
          },
          enter(state,id){
            if(state==2 || state==6){
              this.$router.push({path:'/index/projectCenter/statistics',query:{project_id:id,project_status:state}})
            }
          }
        },
        mounted(){
          this.$store.dispatch('defaultIndexAction','2');
        }
    }
</script>
 
<style scoped  type="text/css">

.home{padding: 30px;}
.main_tit{;font-size: 20px;color: #313131;display: flex;height: 40px;align-items: center;justify-content: space-between;width:800px;float:left;margin-bottom:15px}
.main_tit>span:nth-child(1)>span{display: inline-block;width: 5px;height: 18px;background: #ff944e;margin-right: 10px;vertical-align: center;position: relative;top: 2px}

.item2>div:nth-child(1){width: 740px;height: 335px;background: white;padding: 20px 30px}
.right_con,.project_total{width: 400px;height: 445px;background: white}
.item2>div:nth-child(1){height:310px}
.project_total{height:190px;width:360px;margin-top:20px}
.list_item>p,.item2>div:nth-child(1)>p,.project_total>p{border-bottom: 1px solid #eee;font-size: 20px;color: #313131;display: flex;height: 40px;align-items: center;justify-content: space-between;}
.list_item>p>span:nth-child(1)>span,.item2>div:nth-child(1)>p>span:nth-child(1)>span,.project_total>p>span:nth-child(1)>span{display: inline-block;width: 5px;height: 18px;background: #ff944e;margin-right: 10px;vertical-align: center;position: relative;top: 2px}
.list_item>p>span:nth-child(2) i,.item2>div:nth-child(1)>p>span:nth-child(2) i,.project_total>p>span:nth-child(2) i{color: #313131;margin-left: 5px}
.list_item>p>span,.item2>div:nth-child(1)>p>span{cursor: pointer;}
.item1_con{color: #464646;font-size: 20px;}
.project_total{padding:30px 20px}
.item1_con>p:nth-child(1){display: flex;align-items: center;height: 80px;justify-content: space-between;}
.item1_con>p:nth-child(1)>span:nth-child(2){display: inline-block;width: 20px;height: 20px;background: #dddddd;border-radius: 2px;line-height: 20px;text-align: center;color: white;font-size: 12px;margin-left: -150px;}
.enter_btn{width: 120px;height: 40px;display: inline-block;border: 1px solid #ff7a59;text-align: center;line-height: 40px;color: #ff7a59;font-size: 14px;}
.item2{display:flex;align-items:center;justify-content:space-between;margin-top:40px}

.list_item{float:left;position:relative;margin-top:20px;margin-right:400px}
.list_item:nth-child(1){margin-top:0px}

.self_info{background:url('./img/bg.png') no-repeat;display:flex;flex-direction:column;align-items:center;height:445px}
.self_info>img{width:160px;height:160px;border-radius:100%;margin-top:50px}
.self_info>p:nth-child(2){font-weight:bold;font-size:20px;color:#464646;margin-top:5px;}
.self_info>p:nth-child(3){width:115px;height:35px;background:linear-gradient(to right, #ff9a4c , #ff7a59);line-height:35px;text-align:center;color:white;font-size:16px;border-radius:20px;cursor:pointer;margin-top:10px}
.item2_bg,.item2_bg_over{height:100px;width:100%;background:url('./img/bg2.png') no-repeat;margin: 50px 0px;line-height: 100px;text-align: center;color: white;cursor: pointer;}
.item2_bg_err{height:100px;width:100%;margin: 50px 0px;line-height: 100px;text-align: center;color: white;cursor: pointer;color: #464646;background: #f4f4f4}
.item2_bg_over{background: url('./img/bg3.png');background-size:100% 100% }
.mon_item{display:flex;justify-content:space-between;align-items:center;margin-top:15px}
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

