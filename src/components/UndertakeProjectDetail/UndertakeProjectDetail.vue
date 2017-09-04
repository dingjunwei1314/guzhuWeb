<template>
  <div style="padding:20px 0px;">
   <el-row type="flex" class="row-bg headerTitle" justify="space-between" style="margin-bottom:30px">
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <p style="font-size:20px;color:#333;vertical-align:middle">
            {{project_detail.project_name}}
            <!--
            <img v-if="project_detail.authen=='个人'"  style="vertical-align:middle;margin-left:7px" src="../../assets/business/qi.png">
            <img v-else  style="vertical-align:middle;margin-left:7px" src="../../assets/business/qi.png">
            <span style="width:65px;height:20px;line-height:20px;background:#fe9039;color:white;font-size:12px;border-radius:3px;text-align:center;display:inline-block;margin-top:-1px;margin-left:7px">{{project_detail.type}}</span>  
            -->
            <i class='little_logo'>{{project_detail.authen.slice(0,1)}}</i>
            <i class='little_logo1'>{{project_detail.type}}</i>
            <span class="give_up" @click="give_up">放弃此项目</span>
          </p>
        </div>
      </el-col>
      <el-col :span="8" type="flex" justify="end" class="headerTitleRight" >
        <!-- <el-button type="primary" class="begin" style="float:right">立即抢单</el-button> -->
      </el-col>
    </el-row>

    <el-tabs  v-model="activeName" @tab-click="handleClick" class="detailsTabs">
      <el-tab-pane  label="项目统计" name="first">
        <ul class="tj_list">
          <li>
            <div>
              <p>总呼出</p>
              <p>
                <span>{{project_statistics_data.total}}</span>个
              </p>
            </div>
            <div>
              <p style="margin-top:7px">成功：{{project_statistics_data.success}}</p>
              <p>接通未成功：{{project_statistics_data.total*(project_statistics_data.connect/100)-project_statistics_data.success}}</p>
              <p style="margin-bottom:7px">预约待跟进：{{project_statistics_data.follow}}</p>
            </div>
          </li>
          <li>
            <div>
              <p>预估获得金额</p>
              <p>
                <span>{{detailed_statistics_data.estimated_amount}}</span>元
              </p>
            </div>
            <div>
              <p style="margin-top:7px">接通率：{{project_statistics_data.connect+'%'}}</p>
              <p>成单率：{{project_statistics_data.done+'%'}}</p>
              <p style="margin-bottom:7px">每外呼收入：25元</p>
            </div>
          </li>
          <li>
            <div>
              <p>质检合格率</p>
              <p>
                <span>{{project_statistics_data.success_rate}}%</span>
              </p>
            </div>
            <div>
              <p style="margin-top:7px">已质检：{{project_statistics_data.quality}}</p>
              <p>质检率：{{project_statistics_data.quality_rate}}%</p>
              <p style="margin-bottom:7px">不合格：{{project_statistics_data.unqualified}}</p>
            </div>
          </li>
        </ul>
        <el-form :inline="true" style="margin-top:30px"  @keyup.native.enter="onSearchSubmit" :model="filterForm" class="demo-form-inline">
        
        <el-form-item class="form_item">
          <el-select clearable v-model="filterForm.call_result" placeholder="呼叫结果">
            
            <el-option label="全部" value="0"></el-option>
            <el-option label="接通" value="1"></el-option>
            <el-option label="无人接听" value="2"></el-option>
            <el-option label="拒接" value="3"></el-option>
            <el-option label="关机" value="4"></el-option>
            <el-option label="停机" value="5"></el-option>
            <el-option label="空号" value="6"></el-option>
            <el-option label="其他" value="7"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form_item">
          <el-select clearable v-model="filterForm.settlement_result" placeholder="通话结果">
            <el-option label="全部" value="0"></el-option>
            <el-option label="成功" value="1"></el-option>
            <el-option label="不成功" value="2"></el-option>
            <el-option label="预约跟进" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form_item">
          <el-select clearable v-model="filterForm.quality" placeholder="质检反馈">
            <el-option label="全部" value="0"></el-option>
            <el-option label="合格" value="1"></el-option>
            <el-option label="不合格" value="2"></el-option>
            <el-option label="未质检" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form_item">
          <el-select clearable v-model="filterForm.appeal" placeholder="申诉状态">
            <el-option label="全部" value="0"></el-option>
            <el-option label="可申诉" value="1"></el-option>
            <el-option label="申诉中" value="2"></el-option>
            <el-option label="驳回申诉" value="3"></el-option>
            <el-option label="通过申诉" value="4"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-date-picker
            @change="pickerChange"
            v-model="pickerTime"
            style="width:160px"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>  

        <el-form-item style="margin-left:70px">
          <span style="color:#ff826e;font-size:16px;font-weight:bold">共计{{detailed_statistics_data.total}}条</span>
        </el-form-item>  
        
        
        <el-form-item style="float:right;margin-right:0px">
          <el-button type="primary" class="submit" @click="onSearchSubmit">查看</el-button>
        </el-form-item>

      </el-form>

      <template>
        <el-table
          v-loading.body="loading"
          @row-click='show_right_mask(true)'
          :data="detailed_statistics_data.list"
          stripe
          style="width: 100%;background:#eee;color:#666">
          <el-table-column
            prop="call_date"
            label="通话日期"
            width="170">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="客户电话"
            width="170">
          </el-table-column>
          <el-table-column
            prop="call_result"
            label="呼叫结果">
          </el-table-column>
          <el-table-column
            prop="long"
            label="通话时长">
          </el-table-column>
          <el-table-column
            prop="settlement_result"
            label="结算结果">
          </el-table-column>
          <el-table-column
            prop="settlement"
            label="结算金额">
          </el-table-column>
          <el-table-column
            prop="quality_feedback"
            label="质检反馈">
          </el-table-column>
          <el-table-column
            prop="appeal"
            label="申诉状态">
          </el-table-column>
        </el-table>
      </template>

      <el-pagination
        v-show="detailed_statistics_data.total>0"
        style="margin: 0 auto;text-align:center;margin-top:20px"
        layout="prev, pager, next"
        :page-size=2
        :current-page.sync="currentpage"
        @current-change="currentChange"
        :total="detailed_statistics_data.total">
      </el-pagination>

      </el-tab-pane>
      <el-tab-pane label="项目详情" name="second" style="padding-left:2px">
        <el-col :span="12" type="flex" justify="end" class="font" style="color:#666">
          <p style="margin-top:15px">
            <span style="float:left">项目进度</span>
            <el-progress  
            :show-text="true" 
            :stroke-width="12" 
            :percentage="project_statistics_data.percentage" style="width:314px;float:left;margin-left:10px"></el-progress>
          </p>
          <br>
          <p style="margin-top:30px">
            <span style="float:left">等级要求</span>
            <el-rate
                 v-model="project_detail.grade_ask"
                 disabled
                 text-color="#ff9900"
                 disabled-colors="#FF9900"
                 style="width:220px;float:left;margin-left:10px">
            </el-rate>
          </p>
          <br>
          <p style="margin-top:30px" class="information">
            <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-if="project_detail.guest_ask[0].gender.male==1">男</el-tag>
            <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-else>女</el-tag>
            <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-if="project_detail.guest_ask[0].language.chinese==1">普通话</el-tag>
            <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-else>英语</el-tag>
            <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-if="project_detail.guest_ask[0].certify.junior==1">高中以下</el-tag>
            <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-else-if="project_detail.guest_ask[0].certify.senior==1">高中</el-tag>
            <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-else-if="project_detail.guest_ask[0].certify.college==1">专科</el-tag>
            <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-else-if="project_detail.guest_ask[0].certify.bachelor==1">本科</el-tag>
            <el-tag type="gray" style="background:#e8e8e8;color:#7b7b7b;margin-right:10px;text-align:center" v-else="project_detail.guest_ask[0].certify.master==1">本科以上</el-tag>
          </p>
          <br>
          <p style="margin-top:10px;color:#666">
            <span style="float:left">结算标准：</span>
            <span style="float:left;margin-left:8px">{{project_detail.price_success}}</span>
          </p>
          <br>
          <p style="margin-top:25px;color:#666">
            <span style="float:left">云客上限：</span>
            <span style="float:left;margin-left:8px"><span>{{project_detail.project_schedule}} </span>/<span> {{project_detail.guest_upper_limit}} </span></span>
          </p>
          <br>
          <p style="margin-top:25px"  v-if="project_detail.week_time.length==Math.max(...project_detail.week_time)-Math.min(...project_detail.week_time)+1&&project_detail.week_time.length!=1">
            工作时间：&nbsp&nbsp周
            <span v-if="Math.min(...project_detail.week_time)==1">一</span>
            <span v-else-if="Math.min(...project_detail.week_time)==2">二</span>
            <span v-else-if="Math.min(...project_detail.week_time)==3">三</span>
            <span v-else-if="Math.min(...project_detail.week_time)==4">四</span>
            <span v-else-if="Math.min(...project_detail.week_time)==5">五</span>
            <span v-else="Math.min(...project_detail.week_time)==6">六</span>
            至 周
            <span v-if="Math.max(...project_detail.week_time)==2">二</span>
            <span v-else-if="Math.max(...project_detail.week_time)==3">三</span>
            <span v-else-if="Math.max(...project_detail.week_time)==4">四</span>
            <span v-else-if="Math.max(...project_detail.week_time)==5">五</span>
            <span v-else-if="Math.max(...project_detail.week_time)==6">六</span>
            <span v-else="Math.max(...project_detail.week_time)==7">日</span>  
            </p>
            <p v-else>
              工作时间：&nbsp&nbsp周
              <span v-if="project_detail.week_time.indexOf(1)!=-1">一</span>
              <span v-if="project_detail.week_time.indexOf(2)!=-1">二</span>
              <span v-if="project_detail.week_time.indexOf(3)!=-1">三</span>
              <span v-if="project_detail.week_time.indexOf(4)!=-1">四</span>
              <span v-if="project_detail.week_time.indexOf(5)!=-1">五</span>
              <span v-if="project_detail.week_time.indexOf(6)!=-1">六</span>
              <span v-if="project_detail.week_time.indexOf(7)!=-1">日</span>
          </p>
          <br>
          <p style=";color:#666">
            <span style="float:left">工作时段：</span>
            <span style="float:left;margin-left:8px">{{project_detail.work_time[0].begin_time}} - {{project_detail.work_time[0].end_time}}</span>
          </p>
        </el-col>

        <div style="width:280px;border-radius:3px;float:right;border:1px solid #eee;color:#666;font-size:14px;margin-top:20px;padding-bottom:20px">
          <p style="color:#fe9039;font-size:16px;background:#e8e8e8;height:40px;text-align:center;line-height:40px;margin-bottom:20px">项目规则</p>
          <el-row style="padding:5px 20px" v-for="(item,index) in project_detail.project_rules" :key="index">
            <el-col :span="2" style="line-height:25px">{{index+1}}：</el-col>
            <el-col :span="22" style="line-height:25px">{{item}}</el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="项目问卷" name="third">
        
        <ul class="main_question_answer">
              <li v-for="(item,index) in MainData.survey.list">
                <p style="margin-bottom:15px">{{item.q_title}}<span v-if="item.not_null!=1" style="color:#fe9039;margin-left:3px">*</span></p>
                <div style="margin-bottom:25px;padding-left:33px" v-if="item.q_type>=100&&item.q_type<200">
                  
                  <el-radio-group @change="chosed(item.q_no,item.q_id)">
                    <el-radio disabled  v-for="(item1,index1) in item.answer_list" :key="index1" :label="item1.val">{{item1.title}}</el-radio>
                  </el-radio-group>
                </div>
                <div style="margin-bottom:25px;padding-left:35px" v-else-if="item.q_type>=200&&item.q_type<300">
                  
                  <el-checkbox-group @change="chosed(item.q_no,item.q_id)">
                    <el-checkbox disabled v-for="(item1,index1) in item.answer_list" :key="index1"  :label="item1.val">{{item1.title}}</el-checkbox>
                  </el-checkbox-group>

                </div>
                <div style="margin-bottom:25px;padding-left:35px" v-else>
                  <el-input
                    disabled
                    type="textarea"
                    autosize
                    style="width:400px"
                    resize="none"
                    placeholder="">
                  </el-input>
                </div>
              </li>
            </ul> 

      </el-tab-pane>
      
    </el-tabs>
    <!--侧边栏弹框-->
    <transition name="fade">
      <div class="right_mask" v-show="is_show_right_mask" @click.stop.prevent="show_right_mask_false">
        <transition name="slide">
          <div class="right_mask_content" @click.stop="click_stop()" v-if="is_show_right_mask_content">
            <div class="header">
              质检详情
              <span class="icon" @click="show_right_mask_false">
                <i class="iconfont icon-qianjin3" style="color:white"></i>
              </span>
            </div> 
            <div class="content">
              <audio id="my_audio" src=""></audio>
              <div class="audio" style="padding:10px 0px 10px 20px">
                <div style="float:left;cursor:pointer"  @click.stop="play($event)">
                  <img id="play_icon" src="/static/img/v_pause.png" play="true" width="35">
                </div>
                <div style="float:left;margin-left:10px;">
                  <div style="margin-top:-3px;font-size:14px;color:#666">
                    <span style="float:left;color:#666;font-size:14px;" id="show_states">加载中...</span>
                    
                    <span id="play_alltime" style="float:right">00:00</span>
                    <span style="float:right">/</span>
                    <span id="play_time" style="float:right">00:00</span>
                    
                    <div style="clear:both"></div>
                  </div>
                
                  <span id="progress" style="min-width: 300px;margin-top:10px">
                    <span id="progress-con"></span>
                    <span id="propress-ball"></span>
                  </span>
                
                </div>
                <div style="clear:both"></div>
              </div>
              <!--个人信息-->
              <div style="border-top:1px solid #eee;padding-top:20px;padding-bottom:20px">
                <p style="line-height:24px;font-size14px;color:#333">
                <i class="iconfont icon-ionc--" style="color:#999"></i>
                个人信息
                </p>
                <el-row style="color:#777;margin-top:15px;margin-left:20px">
                  <el-col :span="5">客户电话</el-col>
                  <el-col :span="17" style="position:relative;left:-15px">：{{zj_data.record.phone}}</el-col>
                </el-row>
                <el-row style="color:#777;margin-top:15px;margin-left:20px">
                  <el-col :span="5">通话结果</el-col>
                  <el-col :span="17" style="position:relative;left:-15px">：{{zj_data.record.res}}</el-col>
                </el-row>  
                <el-row style="color:#777;margin-top:15px;margin-left:20px">
                  <el-col :span="5">通话日期</el-col>
                  <el-col :span="17" style="position:relative;left:-15px">：{{zj_data.record.time}}</el-col>
                </el-row>  
                <el-row style="color:#777;margin-top:15px;margin-left:20px">
                  <el-col :span="5">通话时长</el-col>
                  <el-col :span="17" style="position:relative;left:-15px">：{{zj_data.record.duration}}</el-col>
                </el-row>  
                <el-row style="color:#777;margin-top:15px;margin-left:20px">
                  <el-col :span="5">工单备注</el-col>
                  <el-col :span="17" style="position:relative;left:-15px">
                    ：{{zj_data.record.note}}
                  </el-col>
                </el-row>            
              </div>
              <!--质检质疑-->
              <div style="border-top:1px solid #eee;padding-top:20px;padding-bottom:20px">
                <p style="line-height:24px;font-size14px;color:#333;padding-bottom:20px">
                <i class="iconfont icon-activity" style="color:#666;margin-right:2px"></i>
                质检疑义
                </p>
                <ul class="result">
                  <li>
                    <div>
                      <p style="font-size:13px;">
                        <i class="iconfont icon-ionc--" style="color:#999;margin-left:-2px"></i>
                        您的质检结果为
                        <span style="color:#74cf9f" v-if="zj_data.list_qc.qc_res==1">合格</span>
                        <span style="color:#74cf9f" v-else>不合格</span>
                      </p>  
                      <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:100%">
                        不合格原因为：{{zj_data.list_qc.qc_note}}
                      </p>
                      <p>{{zj_data.list_qc.qc_time}}</p>
                    </div>
                  </li>
                  <li v-if="zj_data.list_appeal[0]">
                    <div>
                      <p style="font-size:13px;">
                        <i class="iconfont icon-ionc--" style="color:#999;margin-left:-2px"></i>
                        您发起来申诉
                      </p>  
                      <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:100%">申诉原因为：{{zj_data.list_appeal[0].reason}}</p>
                      <p>{{zj_data.list_appeal[0].time_create}}</p>
                    </div>
                  </li>
                  <li v-if="zj_data.list_appeal[0]&&zj_data.list_appeal[0].time_reply">
                    <div>
                      <p style="font-size:13px;">
                        <i class="iconfont icon-ionc--" style="color:#999;margin-left:-2px"></i>
                        管理员通过了您的申诉
                      </p>  
                      <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:100%">
                        您的申诉及管理员的意见已发送至雇主端，请耐心等待处理结果。
                      </p>
                      <p>{{zj_data.list_appeal[0].time_reply}}</p>
                    </div>
                  </li>
                  <li v-if="zj_data.list_appeal[1]">
                    <div>
                      <p style=";font-size:13px;">
                        <i class="iconfont icon-ionc--" style="color:#999;margin-left:-2px"></i>
                        雇主发起申诉
                      </p>  
                      <p>申诉原因为：{{zj_data.list_appeal[1].reason}}</p>
                      <p>{{zj_data.list_appeal[1].time_create}}</p>
                    </div>
                  </li>
                  <li v-if="zj_data.list_qc.update_time">
                    <div>
                      <p style=";font-size:13px;">
                        <i class="iconfont icon-ionc--" style="color:#999;margin-left:-2px"></i>
                        管理员通过了您的申诉
                      </p>  
                      <p v-if="zj_data.list_qc.qc_res==2">最终质检结果变更为：<span style="color:#74cf9f">合格</span>  </p>
                      <p v-if="zj_data.list_qc.qc_res==1">最终质检结果变更为：<span style="color:#74cf9f">合格</span>  </p>
                      <p>{{zj_data.list_qc.update_time}}</p>
                    </div>
                  </li>
                  
                </ul>
              </div>
  
              <div style="border-top:1px solid #eee;padding-top:20px">
                <p style="line-height:24px;font-size14px;color:#333;padding-bottom:20px;padding-left:20px">
                我要申诉(0/3)
                <el-tooltip content="请听完录音后在进行申诉，当月申 诉失败3次将不可再次发起申诉" placement="top">
                  <img src="./img/wen.png" style="vertical-align:middle;cursor:pointer">
                </el-tooltip>
                </p>
                <el-input type="textarea" resize="none" placeholder="申诉原因，不得小于30字" v-model="introduce" :rows="rows" style="width:380px;display:block;margin:0 auto;margin-left:20px"></el-input>
                <el-button type="primary" class="next begin" style="margin-top:0px;margin-left:20px;margin-top:20px;" @click="updataAppeal">提交</el-button>

              </div>
            </div> 
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'UndertakeProjectDetail',
  components:{
   
  },
  data () {
    return {
      loading:true,
      MainData:{
        survey:{
          list:[]
        }
      },
      filterForm:{
        project_id:'',
        page:'',
        limit:2,
        call_result:'',
        settlement_result:'',
        quality:'',
        appeal:'',
        start:'',
        end:''
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
      project_statistics_data:{
        percentage:20,
        altogether:100,
        total:10,
        connect: 0,
        success: 0,
        done: 0,
        follow: 0,
        quality: 0,
        quality_rate: 0,
        unqualified: 0,
        success_rate: 0
      },
      detailed_statistics_data:{
        total:0,
        page: 0,
        limit:0,
        estimated_amount: 0,
        transcend: 0,
        list: [{
          call_date:"",
          phone: "",
          call_result: 0,
          long: "",
          settlement_result: 0,
          settlement:0,
          quality_feedback: "",
          appeal: "",
        }],
      },
      project_detail:{
        authen:'',  
        type:'', 
        project_schedule:'',
        grade_ask: 1,    
        guest_ask: [{
          certify:'',  
          language:'', 
          gender:'',
        }],
        price_success:'',
        guest_upper_limit:'',
        week_time:[1,2,3], 
        work_time: [{
          begin_time :'',
          end_time : ''
        }],
        project_begin_time: '',
        project_end_time:'',
        project_rules:[],
      },
      activeName:'first',
      currentpage:1,
      pickerTime:'',
      project_id:'',
      is_show_right_mask:false,
      is_show_right_mask_content:false,
      zj_data:{},//质检详情返回的数据
      rows:2,
      introduce:''
    }
  },
  created(){
    this.filterForm.project_id=this.$route.query.project_id
    this.project_id=this.$route.query.project_id
    this.getProject_statisticsData()
    this.getDetailed_statisticsData()
    this.getMainData()
    this.getDetailed(this.filterForm)
  },
  mounted:function(){
    var that=this
    this.$store.dispatch('defaultIndexAction','/index/work');
    document.getElementById('main_content').scrollTop=0;
  },
  methods:{
    getProject_statisticsData(){
      let _this=this;
      this.$http('/project/statistics/survey',{project_id:_this.$route.query.project_id}).then(function(res){
        if(res.data.code==1000){
          _this.project_statistics_data=res.data.data
          _this.project_statistics_data.percentage=Number((_this.project_statistics_data.total/_this.project_statistics_data.altogether*100).toFixed(0))
         
        }
      },function(err){
        console.log(err)
      })
    },
    getDetailed({project_id='',page=1,limit=2,call_result='',settlement_result='',quality='',appeal='',start='',end=''}){

      let _this=this;
      _this.loading=true;
      this.$http('/project/statistics/detailed_statistics',{
        project_id,
        page,
        limit,
        call_result,
        settlement_result,
        quality,
        appeal,
        start,
        end
      }).then(function(res){
        if(res.data.code==1000){
          _this.detailed_statistics_data=res.data.data;
          _this.loading=false;
          _this.$store.dispatch('refreshAction',false);
          _this.$store.dispatch('loadingAction',false);
        }
      },function(err){
        console.log(err)
        _this.$store.dispatch('refreshAction',false);
        _this.$store.dispatch('loadingAction',false);
        _this.loading=false;
      })
    }, 

    getDetailed_statisticsData(){

      let _this=this;
      this.$http('/yunke/project/details',{project_id:_this.$route.query.project_id}).then(function(res){
        if(res.data.code==1000){
          _this.project_detail=res.data.data
          _this.project_detail.grade_ask=Number(_this.project_detail.grade_ask)
          _this.project_detail.project_rules=Object.values(_this.project_detail.project_rules[0])
        }
      },function(err){
        console.log(err)
      })
    },

    getMainData(){
        var _this=this
        this.$http('/yunke/workbench/entering',{project_id:_this.$route.query.project_id}).then(function(res){
          _this.MainData=res.data.data;
          _this.MainData.survey.list.sort(function(previous,latter){
            return previous.q_no-latter.q_no
          })
      
        },function(reject){
          console.log(reject)
         
        })
      },
     init_player(src){
      let my_audio=document.getElementById('my_audio'),
        progress=document.getElementById("progress"),
        propress_ball=document.getElementById("propress-ball"),
        progress_con=document.getElementById("progress-con"),
        play_time_node=document.getElementById("play_time"),
        play_alltime_node=document.getElementById("play_alltime"),
        play_icon=document.getElementById("play_icon"),
        show_states=document.getElementById("show_states"),
        play_time,
        play_alltime;

      my_audio.setAttribute('src',src)
      progress.onmousedown=function(e){
        let ev=e||window.event;
        console.log(ev.pageX)
        my_audio.currentTime = (ev.pageX-850)/330*my_audio.duration;
      }
      propress_ball.onmousedown=function(e){
        let ev=e||window.event;
        my_audio.ontimeupdate=null;
        if(ev.preventDefault()){
          ev.preventDefault();
        }else{
          ev.returnValue = false;
        }
        document.onmousemove=function(e){
          let ev=e||window.event;
          let w_width=ev.pageX-850;
          if(w_width<0){
            w_width=0;
          }else if(w_width>progress.offsetWidth-propress_ball.offsetWidth){
            w_width=progress.offsetWidth-propress_ball.offsetWidth;
          }
          propress_ball.style.left=w_width+"px";
          progress_con.style.width=w_width+"px";
         
          my_audio.currentTime=w_width/330*my_audio.duration;
        

          if(ev.preventDefault()){
              ev.preventDefault();
          }else{
            ev.returnValue = false;
            return false;

          }
        }

        document.onmouseup=function(){
          my_audio.ontimeupdate=function(){
            play_time=my_audio.currentTime;
            play_alltime=my_audio.duration;
            play_time_node.innerHTML=changtime(play_time).toString();
            progress_con.style.width=play_time/play_alltime*330+'px';
           
            if(play_time/play_alltime*330-7<=0){
              propress_ball.style.left='0px';
            }else if(play_time/play_alltime*330-7>=315){
              propress_ball.style.left='315px';
            }else{
               propress_ball.style.left=play_time/play_alltime*330-7+'px';
            }
          }
          document.onmousemove=null;
        }
      }



      my_audio.onloadedmetadata=function(){
        show_states.innerHTML='录音播放'
        play_alltime_node.innerHTML=changtime(my_audio.duration)
      
        
      }

      my_audio.ontimeupdate=function(){
        play_time=my_audio.currentTime;
        play_alltime=my_audio.duration;
        play_time_node.innerHTML=changtime(play_time).toString();
        progress_con.style.width=play_time/play_alltime*330+'px';
       
        if(play_time/play_alltime*330-7<=0){
          propress_ball.style.left='0px';
        }else if(play_time/play_alltime*330-7>=315){
          propress_ball.style.left='315px';
        }else{
           propress_ball.style.left=play_time/play_alltime*330+'px';
        }
      } 
      
      my_audio.addEventListener('pause',function(){
        play_icon.setAttribute('play','true')
        play_icon.setAttribute('src','/static/img/v_pause.png')
      })

      my_audio.addEventListener('play',function(){
        play_icon.setAttribute('play','false')
        play_icon.setAttribute('src','/static/img/v_play.png')
      })

      my_audio.addEventListener('end',function(){
         play_icon.setAttribute('play','true')
         play_icon.setAttribute('src','/static/img/v_pause.png')
       })

      function changtime(atime){
        var a_min=parseInt(atime/60),
            a_min=a_min<10? '0'+a_min:a_min,
            a_sec_yu=atime%60;
        var a_sec=parseInt(a_sec_yu);
          a_sec=a_sec<10? '0'+a_sec:a_sec;
        return a_min+':'+a_sec;
      }
    },

    handleClick(tab,event){
    
    },
    pickerChange(val){
      this.filterForm.start=this.changeDate(this.pickerTime[0])=='1970-01-01'? '': this.changeDate(this.pickerTime[0])
      this.filterForm.end=this.changeDate(this.pickerTime[1])=='1970-01-01'? '': this.changeDate(this.pickerTime[1])  
    },
    onSearchSubmit(){
      this.filterForm.page=1;
      this.currentpage=1;
      this.getDetailed(this.filterForm)
    },
    currentChange(page){
      this.filterForm.page=page;
      this.getDetailed(this.filterForm)
    },
    changeDate(date){
      let joinDate=new Date(date),
      joinDateMonth=(joinDate.getMonth()+1)<10? '0'+(joinDate.getMonth()+1) : (joinDate.getMonth()+1),
      joinDateDay=joinDate.getDate()<10? '0'+joinDate.getDate() : joinDate.getDate(),
      standardJoinDate=joinDate.getFullYear()+'-'+joinDateMonth+'-'+joinDateDay;
      return standardJoinDate;
    },
    give_up(){
      var _this=this
      this.$http('/yunke/project/abandon',{project_id:_this.$route.query.project_id}).then(function(res){
        if(res.data.data.status==1){
          _this.$message({
            message: '项目已放弃',
            type: 'success'
          }); 
        }else{
          _this.$message({
            message: '放弃失败',
            type: 'warning'
          }); 
        }
      },function(reject){
        console.log(reject)
       
      })
    },
    click_stop(){

    },
    updataAppeal(){
      let _this=this
      if(this.introduce.length<30){
        this.$message({
          message: '申诉原因不得小于30字符',
          type: 'warning'
        });
        return;
      }
      this.$http('/project/appeal',{record_id:_this._qc_id,project_id:_this._project_id,reason:_this.introduce}).then(function(res){
        if(res.data.code==1000){
          _this.$message({
            message: res.data.data,
            type: 'success'
          }); 
        }
      },function(err){
        console.log(err)
      })
    },
    show_right_mask(row,event,column,isShow){
      var _this=this;
      this.introduce='';
      this.$http('/project/qc_failure_detail',{record_id:row.id,project_id:this.project_id}).then(function(res){
          
        if(res.data.code==1000){
          _this.zj_data=res.data.data;
          _this.is_show_right_mask=true;
          _this.is_show_right_mask_content=true;
          setTimeout(function(){
            _this.init_player(_this.zj_data.record.record)  
          },1000)

        }
        
      },function(err){
        console.log(err)
      })
    },
    show_right_mask_false(){
      this.is_show_right_mask=false;
      this.is_show_right_mask_content=false;
    },
     play(event){
      
      if(event.target.getAttribute('play')=='true'){
        my_audio.play()
      }else{
        my_audio.pause()
      }
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
        this.getProject_statisticsData()
        this.getDetailed_statisticsData()
        this.getDetailed(this.filterForm)
      }
      
    }
  },
}
</script>
<style scoped>
  .begin:hover{background: #feb339;border-color: #feb339}
  .tj_list{display: flex;flex-direction: row;justify-content:space-between;}
  .tj_list li{width:300px;height:120px;background:#f0f0f0;border-radius:3px;display: flex;}
  .tj_list li>div{width:50%;}
  .tj_list li>div:nth-child(1) p:nth-child(1){color: #ff826e;font-size: 14px;font-weight: bold;margin-top: 15px;margin-left: 15px}
  .tj_list li>div:nth-child(1) p:nth-child(2){margin-left: 10px;margin-top: 25px;color: #666}
  .tj_list li>div:nth-child(1) p:nth-child(2) span{color: #fe9039;font-size: 40px;}
  .tj_list li>div:nth-child(2){display: flex;flex-direction: column;justify-content: space-around;color: #666;font-size: 14px}
  .tj_list li>div:nth-child(2):nth-child(1){margin-top: 7px}
  .tj_list li>div:nth-child(2):nth-child(3){margin-bottom: 7px}
  .form_item{width: 110px}
  .submit{padding: 8px 30px}
  .submit:hover{background: #feb339;border-color: #feb339}
  .submit:focus{background: #fe9039;border-color: #fe9039}
  .main_question_answer{color:#666;font-size:14px;line-height:24px;margin-top: 10px}
  .main_question_answer .el-checkbox+.el-checkbox{margin-left: 40px;}
  .main_question_answer .el-radio+.el-radio{margin-left: 60px}
  .give_up{width:80px;height:20px;line-height:20px;color:#999;font-size:12px;border-radius:3px;text-align:center;display:inline-block;top: -2px;position: relative;border:1px solid #eee;margin-left:7px;cursor:pointer}
  .give_up:hover{border-color:#FE9039;color:#FE9039}
  /*侧边栏样式*/
  .right_mask{position: fixed;left: 200px;right: 0;top: 60px;bottom: 0;z-index: 3;width: 1000px;overflow: hidden;}
  .right_mask_content::-webkit-scrollbar-thumb{background: rgb(255,172,82);width: 3px}
  .right_mask_content::-webkit-scrollbar-track{background: #ccc;width: 3px}
  .right_mask_content::-webkit-scrollbar{width: 5px}
  .right_mask_content{position: absolute;right: 0px;top: 0;bottom: 0;width: 440px;box-shadow: -2px -12px 15px #e1e1e1;background: white;z-index: 4;overflow-y: auto;overflow-x: hidden;}
  .right_mask .header{height: 45px;line-height: 45px;color: #333;font-size: 16px;background-color: #eee;text-align: center;}
  .right_mask .header .icon{width:25px;height:45px;background-color: #fe9039;position: absolute;left: 0px;top: 0;cursor: pointer;}
  .right_mask .content{padding: 20px;}
  .right_mask .result{padding-left: 20px}
  .right_mask .result li{height: 80px;background: #f2f2f2;border-radius: 3px;margin: 0;margin-bottom: 10px;padding: 15px;color: #666}
  .right_mask .result li p{line-height: 27px};
  .slide-enter-active, .slide-leave-active {transition: right .3s ease}
  .slide-enter,.slide-leave-to{right:-440px; }
  .slide-enter-to, .slide-leave{right:0px; }
  .fade-leave-active { transition: opacity .5s}
  .fade-leave-to{opacity: 0}
  #propress-ball{width: 15px;height: 15px;background-color: #fe9039;border-radius: 100%;position: absolute;left: 0;top: -4px;cursor: pointer;}
  #progress{float:left;width: 100%;height: 7px;background-color: #eee;position: relative;cursor: pointer;width: 330px}
  #progress-con{height: 100%;background-color: #fe9039;float: left;width:0px}
</style>
<style type="text/css">
  
  .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{color: #666;font-weight: normal;}
</style>