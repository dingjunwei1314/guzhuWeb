<template>

  <div class="nocall">
    <p class="title">
      <span><span></span>{{infoData.project_name}}</span>
      <span  class="enter_btn_2" v-if="$route.query.project_status==2">
        正在进行
      </span>
      <span  class="enter_btn_2" v-if="$route.query.project_status==6">
        已结算
      </span>
    </p>
    <div class="content1" v-show="is_show_main_con">
      <div class="tit_wap">
        <span class="enter_btn" style="margin-left:0px" @click="clickTab(1)" :class="{'enter_btn_active':active_page==1}">开始质检</span><span  class="enter_btn" @click="clickTab(2)" :class="{'enter_btn_active':active_page==2}" style="border-left:none" >质检结果</span>
      </div>

      <div style="margin-top:30px;color:#4646464;font-size:14px;" v-show="active_page==1">
        <el-date-picker
          style="width:140px"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          @change="change_time"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <el-input style="width:120px" type="number" v-model="qc_filter.dur_begin" placeholder="通话时长 "></el-input>
        <el-input style="width:120px" type="number" v-model="qc_filter.dur_end" placeholder="通话时长 "></el-input>

        <el-select style="width:120px" class="myselect" clearable v-model="qc_filter.call_res" placeholder="通话结果">
          <el-option label="全部" value="0"></el-option>
          <el-option label="接通" value="1"></el-option>
          <el-option label="无人接听" value="2"></el-option>
          <el-option label="拒接" value="3"></el-option>
          <el-option label="关机" value="4"></el-option>
          <el-option label="停机" value="5"></el-option>
          <el-option label="空号" value="6"></el-option>
          <el-option label="其他" value="7"></el-option>
        </el-select>

        <el-select style="width:120px" class="myselect" clearable v-model="qc_filter.standard" placeholder="结算标准">
          <el-option label="全部" value="0"></el-option>
          <el-option label="成功" value="1"></el-option>
          <el-option label="不成功" value="2"></el-option>
          <el-option label="预约跟进" value="3"></el-option>
        </el-select>

        <el-select style="width:120px" class="myselect" clearable v-model="qc_filter.samp" placeholder="抽检比例">
          <el-option label="全部质检" value="0"></el-option>
          <el-option label="抽取每位云客10%的通话记录" value="1"></el-option>
          <el-option label="抽取每位云客30%的通话记录" value="2"></el-option>
          <el-option label="抽取每位云客50%的通话记录" value="3"></el-option>
          <el-option label="抽取每位云客80%的通话记录" value="4"></el-option>
        </el-select>

        <span class="btn11" @click="begin_zj">开始质检</span>
        <span style="float:right;line-height:40px;color:#464646;font-size:14px;">共计0条</span>

        <div style="display:flex;justify-content:space-between;margin-top:20px;min-height:300px">
          <div style="flex:1" v-loading.body="loading_qc_detail">
            <p v-if="!is_show_zq_detail"  style="text-align:center;color:#999;margin-top:120px">无数据哦~</p>
            <div v-if="is_show_zq_detail">
              <audio id="my_audio" src=""></audio>
              <div class="audio" style="padding:10px 0px 10px 0px">
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
              <div style="width:600px;font-size:16px;color:#464646">
                <el-row style="margin-top:20px">
                  <el-col :span="4">客户电话</el-col>
                  <el-col :span="20">{{qc_detail_data.phone}}</el-col>
                </el-row>
                <el-row style="margin-top:20px">
                  <el-col :span="4">结算标准</el-col>
                  <el-col :span="20">{{qc_detail_data.standard}}</el-col>
                </el-row>
                <el-row style="margin-top:20px">
                  <el-col :span="4">通话时间</el-col>
                  <el-col :span="20">{{qc_detail_data.time}}</el-col>
                </el-row>
                <el-row style="margin-top:20px">
                  <el-col :span="4">通话时长</el-col>
                  <el-col :span="20">{{qc_detail_data.duration}}</el-col>
                </el-row>
                <el-row style="margin-top:20px">
                  <el-col :span="4">工单备注</el-col>
                  <el-col :span="20">{{qc_detail_data.note}}</el-col>
                </el-row>
                <el-row style="margin-top:20px">
                  <el-col :span="4">质检结果</el-col>
                  <el-col :span="20">
                    <el-radio-group v-model="updata.qc_res" @change="radio_change">
                    <el-radio :label="1">合格</el-radio>
                    <el-radio :label="2">不合格</el-radio>
                  </el-radio-group>
                </el-col>
                </el-row>
                <div v-if="updata.qc_res==2" style="margin-left:100px;margin-top:20px">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="质检不合格理由"
                    resize="none"
                    v-model="updata.qc_note">
                  </el-input>
                </div>
              </div>
              <div style="text-align:center;margin:50px 0px 0px 0px">
                <span class="enter_btn_2" style="background:linear-gradient(to right, #ff9a4c , #ff7a59);color:white" @click="begin_updata(false)">提交</span>
                <span class="enter_btn_2" style="width:150px" @click="begin_updata(true)">提交并质检下一条</span>
              </div>
            </div>
          </div>
          <div style="width:280px;margin-top:20px;text-align:center;margin-top:80px">
            <el-row style="border-top:1px solid #eee;border-left:1px solid #eee;border-right:1px solid #eee;height:34px;line-height:34px">
              <el-col :span="12">
                当天质检条数                                                           
              </el-col>
              <el-col :span="12">
                {{todayZjData.qc_num_today}}个
              </el-col>
            </el-row>
            <el-row style="border-top:1px solid #eee;border-left:1px solid #eee;border-right:1px solid #eee;height:34px;line-height:34px;background:#f9f9f9">
              <el-col :span="12">
                已质检
              </el-col>
              <el-col :span="12">
                {{todayZjData.qc_total}}个
              </el-col>
            </el-row>
            <el-row style="border-top:1px solid #eee;border-left:1px solid #eee;border-right:1px solid #eee;height:34px;line-height:34px">
              <el-col :span="12">
                质检率                                                                
              </el-col>
              <el-col :span="12">
                {{(todayZjData.qc_num_today/todayZjData.records_num*100).toFixed(0)}}%
              </el-col>
            </el-row>
            <el-row style="border-top:1px solid #eee;border-left:1px solid #eee;border-right:1px solid #eee;height:34px;line-height:34px;;background:#f9f9f9">
              <el-col :span="12">
                合格                                                                
              </el-col>
              <el-col :span="12">
                {{todayZjData.qc_hege_num}}个
              </el-col>
            </el-row>
            <el-row style="border-top:1px solid #eee;border-left:1px solid #eee;border-right:1px solid #eee;border-bottom:1px solid #eee;height:34px;line-height:34px">
              <el-col :span="12">
                合格率                                                                   
              </el-col>
              <el-col :span="12">
                {{(todayZjData.qc_hege_num/todayZjData.records_num*100).toFixed(0)}}%
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div style="margin-top:30px;color:#4646464;font-size:14px;" v-show="active_page==2">
        <div class="content2">
          <p style="color:#464646;font-size:16px">
            <span>全部通话<span style="font-size:20px;font-weight:bold">{{totalData.total}}</span>个</span>
            <span style="margin-left:250px">已质检<span style="font-size:20px;font-weight:bold">{{totalData.quality}}</span>个</span>
            <span style="margin-left:250px">合格<span style="font-size:20px;font-weight:bold">{{totalData.unqualified}}</span></span>
          </p>

          <div class="svg_wap">
            <svg width="200" transform="translate(50,0)">
              <circle cx="78" cy="75" r="65" stroke="#dde8ed"
              stroke-width="18" fill="white"/>
              <path id="ring" stroke="#ff7fab" fill="#ff9a4c" />
              <circle cx="78" id="_progress" cy="75" r="65" 
              fill="white"/>
              <text x="65" y="70" fill="#464646">{{totalData.connect}}%</text>
              <text x="56" y="95" fill="#464646">接通率</text>
            </svg>
            <span class="line"></span>
            <svg width="200" transform="translate(50,0)">
              <circle cx="78" cy="75" r="65" stroke="#dde8ed"
              stroke-width="18" fill="white"/>
              <path id="ring2" stroke="#ff7fab" fill="#ff0254" />
              <circle cx="78" id="_progress" cy="75" r="65" 
              fill="white"/>
              <text x="65" y="70" fill="#464646">{{totalData.quality_rate}}%</text>
              <text x="56" y="95" fill="#464646">质检率</text>
            </svg>
            <span class="line"></span>
            <svg width="200" transform="translate(50,0)">
              <circle cx="78" cy="75" r="65" stroke="#dde8ed"
              stroke-width="18" fill="white"/>
              <path id="ring3" stroke="#ff7fab" fill="#244798" />
              <circle cx="78" id="_progress" cy="75" r="65" 
              fill="white"/>
              <text x="65" y="70" fill="#464646">{{totalData.success_rate}}%</text>
              <text x="56" y="95" fill="#464646">合格率</text>
            </svg>
          </div>

          <div class="tit">
            <el-select style="width:120px" class="myselect" clearable v-model="form.call_result" placeholder="通话结果">
              <el-option label="全部" value="0"></el-option>
              <el-option label="接通" value="1"></el-option>
              <el-option label="无人接听" value="2"></el-option>
              <el-option label="拒接" value="3"></el-option>
              <el-option label="关机" value="4"></el-option>
              <el-option label="停机" value="5"></el-option>
              <el-option label="空号" value="6"></el-option>
              <el-option label="其他" value="7"></el-option>
            </el-select>

            <el-select style="width:120px" class="myselect" clearable v-model="form.settlement_result" placeholder="结算标准">
              <el-option label="全部" value="0"></el-option>
              <el-option label="成功" value="1"></el-option>
              <el-option label="不成功" value="2"></el-option>
              <el-option label="预约跟进" value="3"></el-option>
            </el-select>
            <el-select style="width:120px" class="myselect" clearable v-model="form.quality" placeholder="质检结果">
              <el-option label="全部" value="0"></el-option>
              <el-option label="合格" value="1"></el-option>
              <el-option label="不合格" value="2"></el-option>
            </el-select>
            <el-select style="width:120px" class="myselect" clearable v-model="form.appeal" placeholder="质检结果">
              <el-option label="全部" value="0"></el-option>
              <el-option label="可申诉" value="1"></el-option>
              <el-option label="申诉中" value="2"></el-option>
              <el-option label="驳回申诉" value="3"></el-option>
              <el-option label="通过申诉" value="4"></el-option>
            </el-select>
                    
    
            <span class="btn1" @click="search">查看</span>
            <span style="float:right;line-height:40px;color:#464646;font-size:14px;">共计{{detailed_statistics_data.list.length}}条</span>
          </div>

          <el-table
              v-loading.body="loading"
              :data="detailed_statistics_data.list"
              stripe
              @row-click="enter_row"
              style="width: 100%;background:#eee;color:#666;margin-top:40px;cursor:pointer">

              <el-table-column
                width="170"
                prop="call_time"
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
                prop="call_res"
                label="呼叫结果">
              </el-table-column>

              <el-table-column
                prop="standard"
                label="通话结果">
              </el-table-column>

              <el-table-column
                prop="qc_res"
                label="质检结果">
              </el-table-column>

              <el-table-column
                prop="appeal_status"
                label="申诉状态">
              </el-table-column>
          </el-table>

          <div style="text-align:center;margin:60px 0px">
             <el-pagination 
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="2"
              layout="prev, pager, next, jumper"
              :total="detailed_statistics_data.total">
            </el-pagination>
          </div> 
        </div>
      </div>

    </div>

    <transition enter-active-class="animated fadeInRight">
      <div class="call_detail" v-if="is_show_zj_1">
        <p class="title" @click="hide1" style="border-bottom:1px solid #eee;justify-content:flex-start;cursor:pointer">
          <i  class="el-icon-arrow-left" style=";cursor:pointer" ></i>
          <span style="margin-top:-4px;margin-left:10px;cursor:pointer">详情</span>
        </p>
        <audio id="my_audio" src=""></audio>
        <div class="audio" style="padding:10px 0px 10px 0px">
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
        <div style="width:600px;font-size:16px;color:#464646">
          <el-row style="margin-top:20px">
            <el-col :span="4">客户电话</el-col>
            <el-col :span="20">{{zj_data.record.phone}}</el-col>
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="4">结算标准</el-col>
            <el-col :span="20">{{zj_data.record.res}}</el-col>
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="4">通话时间</el-col>
            <el-col :span="20">{{zj_data.record.time}}</el-col>
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="4">通话时长</el-col>
            <el-col :span="20">{{zj_data.record.duration}}</el-col>
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="4">工单备注</el-col>
            <el-col :span="20">{{zj_data.record.note}}</el-col>
          </el-row>
        </div>

        <div>
            <div style="margin-top:40px;padding-bottom:20px">
             
              <ul class="result">
                <li>
                  <p>{{zj_data.list_qc.qc_time}}</p>
                  <span class="line"></span>
                  <div>
                    <p style="font-size:13px;">
                    此次质检结果为
                      <span style="color:#74cf9f" v-if="zj_data.list_qc.qc_res==1">合格</span>
                      <span style="color:#74cf9f" v-else>不合格</span>
                    </p>  
                    <p style="margin-top:10px">
                      <span style="color:#e72227">不合格原因为：</span>{{zj_data.list_qc.qc_note}}
                    </p>
                    
                  </div>
                </li>
                <li v-if="zj_data.list_appeal[0]">
                  <p>{{zj_data.list_appeal[0].time_create}}</p>
                  <span class="line"></span>
                  <div>
                    <p style="font-size:13px;">
                    云客发起申诉
                    </p>  
                    <p style="margin-top:10px ">
                    <span style="color:#e72227">申诉原因为：</span>
                    {{zj_data.list_appeal[0].reason}}</p>
                  </div>
                </li>
                <li v-if="zj_data.list_appeal[0]&&zj_data.list_appeal[0].time_reply">
                  <p>{{zj_data.list_appeal[0].time_reply}}</p>
                  <span class="line"></span>
                  <div>
                    <p style="font-size:13px;">
                    管理员通过了您的申诉
                    </p>  
                    <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:100%">
                      您的申诉及管理员的意见已发送至雇主端，请耐心等待处理结果。
                    </p>
                  </div>
                </li>
                <li v-if="zj_data.list_appeal[1]">
                  <p>{{zj_data.list_appeal[1].time_create}}</p>
                  <span class="line"></span>
                  <div>
                    <p style=";font-size:13px;">
                    您发起申诉
                    </p>  
                    <p>
                    <span style="color:#e72227">申诉原因为：</span>
                    {{zj_data.list_appeal[1].reason}}</p>
                  </div>
                </li>
                <li v-if="zj_data.list_qc.update_time">
                  <p>{{zj_data.list_qc.update_time}}</p>
                  <span class="line"></span>
                  <div>
                    <p style=";font-size:13px;">
                    管理员驳回了您的申诉，通过了云客的申诉。  
                    </p>  
                    <p v-if="zj_data.list_qc.qc_res==2">最终质检结果变更为：<span style="color:#74cf9f">合格</span>  </p>
                    <p v-if="zj_data.list_qc.qc_res==1">最终质检结果变更为：<span style="color:#74cf9f">合格</span>  </p>
                  </div>
                </li>
                
              </ul>
            </div>
 
            <div style="border-top:1px solid #eee;padding-top:20px;text-align:right">
              <p style="line-height:24px;font-size:18px;color:#333;padding-bottom:20px;color:#e72227;text-align:left">
              我要申诉
              <span style="color:#999;font-size:14px">截止至2017/7/25 14:11如您未进行申诉，系统将判定您认同此申诉意见并更改质检结果。</span>
              </p>
              <el-input type="textarea" resize="none" placeholder="申诉原因，不得小于30字" v-model="introduce" :rows="rows"></el-input>


              <p class="next"  @click="updataAppeal">提交</p>

            </div>
          </div>
       
      </div>
    </transition>

  </div>               
</template>

<script>
      
      export default {
        name:'QualityTesting',
        components:{
        
        },
        data() {
          return {
            is_show_zq_detail:false,
            loading_qc_detail:false,
            introduce:'',
            rows:5,
            active_page:1,
            updata:{
              qc_res:1,
              qc_note:'',
              record_id:'',
              project_id:''
            },
            loading:false,
            is_show_zj_1:false,
            is_show_zj_2:false,
            is_show_main_con:true,
            currentPage:1,
            form:{
              page:1,
              limit:2,
              call_result:'',
              settlement_result:'',
              quality:'',
              appeal:''

            },
            qc_filter:{
              time_begin:'',
              time_end:'',
              dur_begin:'',
              dur_end:'',
              call_res:'',
              standard:'',
              samp:''
            },
            qc_detail_data:{
              info_id:'',
              standard_id:''
            },
            infoData:{},
            detailed_statistics_data:{
              list:[]
            },
            show_table_data:{
              list:[]
            },
            totalData:{

            },
            todayZjData:{
              qc_num_today:'',
              qc_total:'',
              qc_hege_num:'',
              records_num:''
            },
            zj_data:{
              record:{
                record:''
              }
            },
            pickerOptions2: {
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

          };
        },
        created(){
          this.updata.project_id=this.$route.query.project_id;
          this.getinfoData();
          this.getMainData();
          this.gettotalData();
          this.getTodayData();  
        },
        computed: {
         
        },
        methods: {
          change_time(val){
            this.qc_filter.time_begin=val.slice(0,10);
            this.qc_filter.time_end=val.slice(13);
          },
          begin_zj(){
            let _this=this;
            _this.loading_qc_detail=true;
            _this.is_show_zq_detail=false;
            
            this.$http('/api/project/qc',{project_id:_this.$route.query.project_id,...this.qc_filter}).then(function(res){
              if(res.data.code==1000){
                _this.qc_detail_data=res.data.data;
                _this.updata.record_id=res.data.data.info_id;
                _this.updata.standard_id=res.data.data.standard_id;
                _this.loading_qc_detail=false;
                _this.is_show_zq_detail=true;
                setTimeout(function(){
                  _this.init_player(_this.qc_detail_data.record);
                },300)
              }
            },function(err){
              console.log(err)
              _this.loading_qc_detail=false;
            })
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
            this.$http('/appeal',{reason:_this.introduce}).then(function(res){
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
          clickTab(index){
            if(this.active_page==index) return;
            this.active_page=index;
          },
          enter_row(row){ 
            console.log(row)
            this.introduce=''
            this.getzjData(row.record_id)
          },
          hide1(){
            this.is_show_main_con=true;
            this.is_show_zj_1=false;
          },
          radio_change(val){
            if(val==1){
              this.updata.qc_note=''
            }
          },
          begin_updata(swi){
            
            if(this.updata.qc_note.length<15 && this.updata.qc_res==2){
              this.$message({
                type: 'warning',
                message: '请输入不合格原因,不少于15字'
              });
              return;
            }

            let _this=this;
            this.$http('/project/qc_save',_this.updata).then(function(res){
              if(res.data.code==1000){
                _this.updata.qc_note=''
                _this.updata.qc_res=1

                _this.$message({
                  type: 'success',
                  message: '提交成功'
                });                

                if(swi){
                  _this.begin_zj()
                }else{
                  _this.is_show_zq_detail=false;
                }
              }else{
                _this.$message({
                  type: 'warning',
                  message: '提交失败'
                });
              }
              
            },function(err){
              console.log(err)
            })
          },
          handleCurrentChange(page){
            this.form.page=page;
            this.getMainData()
          },
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
          play(event){
            if(event.target.getAttribute('play')=='true'){
              my_audio.play()
            }else{
              my_audio.pause()
            }
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
              my_audio.currentTime = (ev.pageX-progress.offsetLeft)/530*my_audio.duration;
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
                let w_width=ev.pageX-progress.offsetLeft;
                if(w_width<0){
                  w_width=0;
                }else if(w_width>progress.offsetWidth-propress_ball.offsetWidth){
                  w_width=progress.offsetWidth-propress_ball.offsetWidth;
                }
                propress_ball.style.left=w_width+"px";
                progress_con.style.width=w_width+"px";
               
                my_audio.currentTime=w_width/530*my_audio.duration;
              

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
                  progress_con.style.width=play_time/play_alltime*530+'px';
                 
                  if(play_time/play_alltime*530-7<=0){
                    propress_ball.style.left='0px';
                  }else if(play_time/play_alltime*530-7>=515){
                    propress_ball.style.left='515px';
                  }else{
                     propress_ball.style.left=play_time/play_alltime*530-7+'px';
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
              progress_con.style.width=play_time/play_alltime*530+'px';
             
              if(play_time/play_alltime*530-7<=0){
                propress_ball.style.left='0px';
              }else if(play_time/play_alltime*530-7>=515){
                propress_ball.style.left='515px';
              }else{
                 propress_ball.style.left=play_time/play_alltime*530+'px';
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
          go(path){
            this.$router.push({path})
          },
          getzjData(record_id){
            let _this=this;
            this.$http('/project/qc_failure_detail',{record_id,project_id:_this.$route.query.project_id}).then(function(res){
          
              if(res.data.code==1000){
                _this.is_show_main_con=false;
                _this.is_show_zj_1=true;
                _this.zj_data=res.data.data;
                setTimeout(function(){
                  _this.init_player(_this.zj_data.record.record)  
                },1000)

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
          getTodayData(){
            let _this=this;
            this.$http('/project/qc_day_sum',{project_id:_this.$route.query.project_id}).then(function(res){
              if(res.data.code==1000){
                _this.todayZjData=res.data.data;
              }
              
            },function(err){
              console.log(err)
            })
          },
          gettotalData(){
            let _this=this;
            this.$http('/project/qc_list_total',{project_id:_this.$route.query.project_id}).then(function(res){
              if(res.data.code==1000){
                _this.totalData=res.data.data;
                _this.draw(document.getElementById('ring'),_this.totalData.connect,74,78,75)
                _this.draw(document.getElementById('ring2'),_this.totalData.quality_rate,74,78,75)
                _this.draw(document.getElementById('ring3'),_this.totalData.success_rate,74,78,75)
              }
              
            },function(err){
              console.log(err)
            })
          },
          getMainData(){
            this.loading=true;
            let _this=this;
            this.$http('/api/project/qc_list',{project_id:_this.$route.query.project_id,..._this.form}).then(function(res){
              if(res.data.code==1000){
                _this.loading=false;
                _this.detailed_statistics_data=res.data.data;
              }
            },function(err){
              console.log(err)
            })
          },
          search(){
            if(this.form.call_result=='' && this.form.settlement_result=='' && this.form.quality_feedback=='' && this.form.phone==''){
              this.$message({
                type: 'warning',
                message: '请输入条件'
              });
              return false;
            }
            let _this=this;
            this.currentPage=1;
            this.getMainData();            
          },
          exportToExcel(){
            for(let i in this.export_data){
              this.export_data[i]=[]
            }
            this.is_show_main_con=false;
            this.is_show_zj_2=true;
          },
        },
        mounted(){
          let _this=this;
          this.$store.dispatch('defaultActiveAction','/index/projectCenter/qualityTesting');
        }
    }
</script>
 
<style scoped>  
  .nocall{padding: 20px;}
  .title{font-size: 20px;color: #313131;display: flex;height: 60px;align-items: center;justify-content: space-between;margin-bottom: 30px}
  .title>span>span{display: inline-block;width: 5px;height: 18px;background: #ff944e;margin-right: 10px;vertical-align: center;position: relative;top: 2px}
  .enter_btn{width: 120px;height: 40px;display: inline-block;border: 1px solid #ff7a59;text-align: center;line-height: 40px;color: #ff7a59;font-size: 14px;border-bottom: none;cursor: pointer;}
  .enter_btn_2{width: 120px;height: 40px;display: inline-block;border: 1px solid #ff7a59;text-align: center;line-height: 40px;color: #ff7a59;font-size: 14px;cursor: pointer;}
  .enter_btn_active{background: #ff7a59;color: white!important}
  .content1{background: white;padding:30px;}
  .tit_wap{border-bottom: 1px solid #ff7a59;}
  
  .content2{background: white;padding:30px;}

  .content2 .tit .btn1,.content2 .tit .btn2,.btn11{display: inline-block;width: 100px;height: 35px;line-height: 35px;border:1px solid #ff7a59;background: linear-gradient(to right, #ff9a4c , #ff7a59);text-align: center;margin-left: 20px;color: white;font-size: 14px;cursor: pointer;border-radius: 2px;float: right;}
  .line{height: 55px;width: 1px;display: inline-block;background: #eee}
  .svg_wap{display:flex;justify-content: space-around;align-items: center;margin-bottom: 30px}


  .call_detail{padding: 30px;background: white;}
  #propress-ball{width: 15px;height: 15px;background-color: #fe9039;border-radius: 100%;position: absolute;left: 0;top: -4px;cursor: pointer;}
  #progress{float:left;width: 100%;height: 7px;background-color: #eee;position: relative;cursor: pointer;width: 530px}
  #progress-con{height: 100%;background:linear-gradient(to right, #ff9a4c , #ff7a59);float: left;width:0px}

  .result li{height: 115px;border-top: 1px solid #eee;display: flex;flex-direction: row;align-items: center;}
  .result li .line{width: 1px;height: 14px;display: inline-block;background: #ddd;margin: 0px 30px}

  .next{display: inline-block;width: 100px;height: 35px;line-height: 35px;border:1px solid #ff7a59;background: linear-gradient(to right, #ff9a4c , #ff7a59);text-align: center;margin-left: 20px;color: white;font-size: 14px;cursor: pointer;border-radius: 2px;margin-top: 30px}
</style>
<style>
 .content1 .el-input__inner{border:none;background: #f3f3f3;}
 .content1 .el-table th>.cell{text-align: center;background: white}
 .content1 .el-table th{background: white}
 .content1 .el-table .cell, .el-table th>div{text-align: center;}
 .el-progress-bar__inner{background: #ff7a59}
</style>

