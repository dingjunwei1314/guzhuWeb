<template>
  <div style="width:922px">
    <div class="header"></div>

    <el-row type="flex" class="row-bg headerTitle" justify="space-between">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p style="font-size:22px;color:#333">抢单秒杀</p>
        </div>
      </el-col>
      
      <el-col :span="12" type="flex" justify="end" class="headerTitleRight">
        <span style="margin-right:10px;font-size:14px;color:#333">
          只显示我能承接的
        </span>
        <el-switch
          style="float:right"
          v-model="showCanDo"
          on-text=""
          off-text=""
          @change="switchChange">
        </el-switch>
      </el-col>
    </el-row>

    <ul class="product">
      
      <li class="productList" v-for="(item,index) in list" v-if="item.status!=state" :key="index">
        <div class="item_top" 
        :class="{item_danger_bg:item.status==2,
                  item_success_bg:item.status==1,
                  item_disable_bg:item.status==0}">
          <p style="padding-top:33px;">{{item.price_success}}</p>
          <p style="margin-top:10px">只限{{item.guest_surplus}}个云客加入噢</p>
          <span  class="label" 
          :class="{item_danger_col:item.status==2,
                    item_success_col:item.status==1,
                    item_disable_col:item.status==0}">{{item.type}}业务</span>
        </div>
        <div class="item_main">
          <div style="border-bottom:1px solid #eee;padding-bottom:20px;">
            <p style="margin-top:20px;color:#333">
              {{item.project_name}}
              <img v-if="item.authen=='个人'" style="vertical-align:bottom" src="../../assets/business/qi.png">
              <img v-else style="vertical-align:bottom" src="../../assets/business/qi.png">
            </p>
            <div style="display:flex;align-items:stretch;justify-content:center;margin-top:18px;">
              <span style="font-size:14px;color:#999;margin-top:-1px;">难度系数：</span>
              <el-rate
                v-model="item.difficulty"
                disabled
                text-color="#ffac52">
              </el-rate>
            </div>
            <div style="text-align:center;margin-top:18px;">
              <el-tag type="gray" v-if="item.guest_ask[0].gender.male==1">男</el-tag>
              <el-tag type="gray" v-else>女</el-tag>
              <el-tag type="gray" v-if="item.guest_ask[0].language.chinese==1">普通话</el-tag>
              <el-tag type="gray" v-else>英语</el-tag>
              <el-tag type="gray" v-if="item.guest_ask[0].certify.junior==1">高中以下</el-tag>
              <el-tag type="gray" v-else-if="item.guest_ask[0].certify.senior==1">高中</el-tag>
              <el-tag type="gray" v-else-if="item.guest_ask[0].certify.college==1">专科</el-tag>
              <el-tag type="gray" v-else-if="item.guest_ask[0].certify.bachelor==1">本科</el-tag>
              <el-tag type="gray" v-else="item.guest_ask[0].certify.master==1">本科以上</el-tag>
            </div>
          </div>
          <div class="item_main_bottom">
            <p v-if="item.week_time.length==Math.max(...item.week_time)-Math.min(...item.week_time)+1&&item.week_time.length!=1">
            工作时段：周
            <span v-if="Math.min(...item.week_time)==1">一</span>
            <span v-else-if="Math.min(...item.week_time)==2">二</span>
            <span v-else-if="Math.min(...item.week_time)==3">三</span>
            <span v-else-if="Math.min(...item.week_time)==4">四</span>
            <span v-else-if="Math.min(...item.week_time)==5">五</span>
            <span v-else="Math.min(...item.week_time)==6">六</span>
            至 周
            <span v-if="Math.max(...item.week_time)==2">二</span>
            <span v-else-if="Math.max(...item.week_time)==3">三</span>
            <span v-else-if="Math.max(...item.week_time)==4">四</span>
            <span v-else-if="Math.max(...item.week_time)==5">五</span>
            <span v-else-if="Math.max(...item.week_time)==6">六</span>
            <span v-else="Math.max(...item.week_time)==7">日</span>  

            </p>
            <p v-else>
              周
              <span v-if="item.week_time.indexOf(1)!=-1">一</span>
              <span v-if="item.week_time.indexOf(2)!=-1">二</span>
              <span v-if="item.week_time.indexOf(3)!=-1">三</span>
              <span v-if="item.week_time.indexOf(4)!=-1">四</span>
              <span v-if="item.week_time.indexOf(5)!=-1">五</span>
              <span v-if="item.week_time.indexOf(6)!=-1">六</span>
              <span v-if="item.week_time.indexOf(7)!=-1">日</span>
            </p>
            <p>{{item.work_time[0].begin_time}} -  {{item.work_time[0].end_time}}</p>
            <p>截止时间：{{item.project_end_time}} </p>
            <el-button @click.stop="getrule(item.project_id)" type="danger" class="go" 
            :class="{item_danger_bg:item.status==2,
                     item_success_bg:item.status==1,
                     item_disable_bg:item.status==0,item_disable_col_col:item.status==0}">

                     立即抢单

                     </el-button>
            <div class="why" @mouseover="seeWhyIn(index)" @mouseout="seeWhyLeave(index)">
           
              <img src="../../assets/business/why.png"  v-if="item.status==0">
              
              <div class="showWhyWap" v-if="item.status==0"  v-show="item.ishow">
                <ul class="whyItem">
                  <li v-if="item.Unqualified[1]==1">
                    <span>未完成实名认证</span>  <el-button>实名认证</el-button>
                  </li>
                  <li v-if="item.Unqualified[2]==1">
                    <span>未通过打字测试</span>  <el-button>打字测试</el-button>
                  </li>
                  <li v-if="item.Unqualified[3]==1">
                    <span>未通过普通话测试</span>  <el-button>普通话测试</el-button>
                  </li>
                  <li v-if="item.Unqualified[4]==1">
                    <span>您的技能考试未通过</span>  <el-button>云客学院</el-button>
                  </li>
                  <li v-if="item.Unqualified[5]==1">
                    <span>您的性别不符合项目要求</span> 
                  </li>
                  <li v-if="item.Unqualified[6]==1">
                    <span>您的学历不符合项目要求</span> 
                  </li>
                  <li v-if="item.Unqualified[7]==1">
                    <span>您的等级不符合此项目</span> 
                  </li>
                </ul>
                <div class="triangle"></div>
              </div>
             
            </div>         
            
          </div>
          
        </div>       
      </li>
      
    </ul>
   
    <Alert  :title="alert.title" :isright="alert.isright" :btntext="alert.btntext" :message="alert.message" :isshow="alert.isshow" @close="close" @sure="sure"></Alert>

    <AlertDetail :title="alert2.title"  :btntext="alert2.btntext" :isshow="alert2.isshow" @close="close2" @sure="sure2">
      <div slot="alert_con">
        <el-row style="color:#666;margin-top:5px;padding-left:20px" v-for="(item,index) in rule" :key="index">
          <el-col :span="1">{{index+1}}：</el-col>
          <el-col :span="23" style="padding-left:3px">{{item}}</el-col>
        </el-row>
      </div>
    </AlertDetail> 
  </div> 
</template>

<script>
import {cloneDeep} from '../../common/cloneDeep.js'
import Alert from '../Common/Alert.vue'
import AlertDetail from '../Common/AlertDetail.vue'  
export default {
  name: 'business',
  components:{
    Alert,
    AlertDetail
  },
  data () {
    return {
      showCanDo:false,
      state:3,
      list:[],
      alert:{
        title:'测试',
        isright:true,
        message:'消息',
        isshow:false,
        btntext:'确认'
      },
      alert2:{
        title:'项目规则',
        isshow:false,
        btntext:'我同意，立即抢单'
      },
      rule:[],
      curr_id:'',
    }
  },
  filters:{

  },
  created(){
    this.getData()
  },
  mounted:function(){
    var that=this
    this.$store.dispatch('defaultIndexAction','/index/business');
    document.getElementById('main_content').scrollTop=0
  },
  methods:{
    close(){
      this.alert.isshow=false
    },
    sure(){
      this.alert.isshow=false
    },
    close2(){
      this.alert2.isshow=false
    },
    sure2(){
      this.get(this.curr_id)
      this.alert2.isshow=false
    },
    getData(){
      var _this=this
      this.$http('/yunke/project/accept').then(function(res){
        _this.list=res.data.data.list;
        for(var i in _this.list){
          _this.list[i].ishow=false;
          _this.list[i].difficulty=parseInt(_this.list[i].difficulty)
        }
        _this.list=cloneDeep(_this.list)
        
        _this.$store.dispatch('refreshAction',false);
        _this.$store.dispatch('loadingAction',false);
       
        
        
      },function(reject){
        _this.$store.dispatch('refreshAction',false);
        _this.$store.dispatch('loadingAction',false);
      })
    },
    getrule(project_id){
      
      var _this=this
      this.curr_id=project_id;
      this.$http('/yunke/project/quick_accept',{project_id}).then(function(res){
        if(res.data.code==1000){
          _this.rule=Object.values(res.data.data.project_rules[0])
          _this.alert2.isshow=true;
        }
      },function(err){
        console.log(err)
      })
    },
    get(project_id){
      var _this=this
      this.$http('/yunke/project/rob_success',{project_id}).then(function(res){
        setTimeout(function(){
          if(res.data.code==1000){
            if(res.data.data.status==1){
              _this.alert.title='抢单成功';
              _this.alert.isright=true;
              _this.alert.message='恭喜您抢单成功，点击下面按钮，开始工作 或者从左侧“工作台”进入执行此订单。';
              _this.alert.btntext='进入工作台，立即工作';
              _this.alert.isshow=true;
            }else{
              _this.alert.title='抢单失败';
              _this.alert.isright=false;
              _this.alert.message='亲，您手慢了，单子已被别人抢光';
              _this.alert.btntext='确认';
              _this.alert.isshow=true;
            }
          }
        },1000)
      },function(err){
        console.log(err)
      })
    },
    switchChange(){
      console.log(this.showCanDo)
      if(this.showCanDo){
        this.state=3
      }else{
        this.state=0
      }
    },
    seeWhyIn(index){
      this.list[index].ishow=true
    },
    seeWhyLeave(index){
      this.list[index].ishow=false
    },
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
}
</script>
<style scoped>
  .header{height: 145px;background: url('../../assets/business/header_back.png') no-repeat center;margin-top: 5px;border-radius: 3px;}
  .headerTitle{height:60px;line-height:60px;margin-top: -10px;padding: 0px 3px}
  .headerTitleRight{display: flex;align-items: center;justify-content: flex-end;}
  .el-tag--gray{background: rgba(238,241,241,.5);color: #999;border:none;min-width: 50px;height: 30px;line-height: 30px;padding: 0px 10px;margin-right: 10px;}
  .el-tag--gray:last-child{margin-right: 0px;}
  .item_main_bottom{color:#999;font-size:14px;padding-top: 10px;}
  .item_main_bottom p{margin-top: 10px;}
  
  .el-rate__icon{font-size: 12px;} 
  .product{display: inline-table;width: 100%}
  .productList{width: 294px;height: 475px;border-radius: 3px;margin-bottom: 30px;float: left;margin-right: 2%;position: relative;}
  .productList:nth-child(3n){margin-right: 0px}
  .item_top{height:140px;border-top-left-radius:5px;border-top-right-radius:5px;text-align:center;position: relative;}
  .item_top p{color: #aaa;font-size: 16px;}
  .item_top .label{position:absolute;width:130px;height:25px;background:white;border-top-left-radius:5px;border-top-right-radius:5px;bottom:-1px;left:84px;line-height:30px;}
  .item_main{height:315px;border: 1px solid #eee; border-bottom-left-radius:5px;border-bottom-right-radius:5px;padding:10px;background:white;text-align: center;}
  .go{width:225px;height:35px;line-height:35px;padding:0;font-size:14px;margin-top:20px;border:none}
  .item_danger_col{color: rgb(255,141,124)}
  .item_danger_bg{background: rgb(255,141,124)}
  .item_success_col{color: rgb(253,192,111)}
  .item_success_bg{background: rgb(253,192,111)}
  .item_disable_col{color:#aaa}
  .item_disable_bg{background: rgb(238,241,241)}
  .item_disable_col_col{color: #ccc}
  .why{position: absolute;right: 16px;bottom: 27px;cursor: pointer;}
  .showWhyWap{height: 435px;position: absolute;left: -267px;top: -432px;border-top-left-radius:5px;border-top-right-radius:5px;width: 295px;z-index: 2;overflow:hidden;}
  .triangle{position:absolute;bottom: 5px;right: 17px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba(0,0,0,.6);}
  .whyItem{width: 100%;padding-top: 10px;height: 415px;background: rgba(0,0,0,.6)}
  .whyItem span{line-height: 60px}
  .whyItem li{display: flex;align-items: center;justify-content: space-between;height: 60px;width: 100%;color: #f3f3f3;box-sizing: border-box;padding: 0px 20px;cursor: pointer;}
  .whyItem .el-button{height: 35px;line-height: 35px;padding: 0px 15px;background: transparent;color: #f3f3f3;border-color: #f3f3f3}


  .slide-enter-active, .slide-leave-active {
    transition: top 1s
  }
  .slide-enter,.slide-leave-to{
    top: 0px
  }
  .slide-enter-to, .slide-leave{
    top: -432px
  }
</style>
<style type="text/css">
  .el-switch.is-checked .el-switch__core{border-color:rgb(255,190,125);background-color: rgb(255,190,125);}
</style>