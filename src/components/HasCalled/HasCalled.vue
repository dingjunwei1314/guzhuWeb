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
    <div class="content2" v-show="is_show_main_con">
      <p style="color:#464646;font-size:16px">
        <span>全部通话<span style="font-size:20px;font-weight:bold">{{totalData.total}}</span>个</span>
        <span style="margin-left:250px">已质检<span style="font-size:20px;font-weight:bold">{{totalData.quality}}</span>个</span>
        <span style="margin-left:250px">合格<span style="font-size:20px;font-weight:bold">{{totalData.unqualified}}</span></span>
      </p>

      <div class="svg_wap">
        <svg width="200">
          <circle cx="78" cy="75" r="65" stroke="#dde8ed"
          stroke-width="18" fill="white"/>
          <path id="ring" stroke="#ff7fab" fill="#ff9a4c" />
          <circle cx="78" id="_progress" cy="75" r="65" 
          fill="white"/>
          <text x="65" y="70" fill="#464646">{{totalData.connect}}%</text>
          <text x="56" y="95" fill="#464646">接通率</text>
        </svg>
        <span class="line"></span>
        <svg width="200">
          <circle cx="78" cy="75" r="65" stroke="#dde8ed"
          stroke-width="18" fill="white"/>
          <path id="ring2" stroke="#ff7fab" fill="#ff0254" />
          <circle cx="78" id="_progress" cy="75" r="65" 
          fill="white"/>
          <text x="65" y="70" fill="#464646">{{totalData.quality_rate}}%</text>
          <text x="56" y="95" fill="#464646">质检率</text>
        </svg>
        <span class="line"></span>
        <svg width="200">
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
          <el-option label="接通" value="1"></el-option>
          <el-option label="无人接听" value="2"></el-option>
          <el-option label="拒接" value="3"></el-option>
          <el-option label="关机" value="4"></el-option>
          <el-option label="停机" value="5"></el-option>
          <el-option label="空号" value="6"></el-option>
          <el-option label="其他" value="7"></el-option>
        </el-select>

        <el-select style="width:120px" class="myselect" clearable v-model="form.settlement_result" placeholder="结算标准">
          
          <el-option label="成功" value="1"></el-option>
          <el-option label="不成功" value="2"></el-option>
          <el-option label="预约跟进" value="3"></el-option>
        </el-select>

        <el-select style="width:120px" class="myselect" clearable v-model="form.quality_feedback" placeholder="质检结果">
         
          <el-option label="合格" value="1"></el-option>
          <el-option label="不合格" value="2"></el-option>
          <el-option label="未质检" value="3"></el-option>
        </el-select>
        <el-input
          class="myinput"
          style="width:200px"
          placeholder="搜索客户号码"
          icon="search"
          v-model="form.phone">
        </el-input>
        <span class="btn2" @click="exportToExcel">导出数据</span>
        <span class="btn1" @click="search">查看</span>
        <span style="float:right;line-height:40px;color:#464646;font-size:14px;">共计{{detailed_statistics_data.list.length}}条</span>
      </div>      
      <el-table
          v-loading.body="loading"
          :data="detailed_statistics_data.list"
          stripe
          @row-click="enter_row"
          style="width: 100%;background:#eee;color:#666;margin-top:40px">

          <el-table-column
            prop="call_date"
            label="通话日期">
          </el-table-column>

          <el-table-column
            prop="phone"
            label="客户电话">
          </el-table-column>

          <el-table-column
            prop="long"
            label="通话时长">
          </el-table-column>

          <el-table-column
            prop="call_result"
            label="通话结果">
          </el-table-column>

          <el-table-column
            prop="settlement_result"
            label="结算标准">
          </el-table-column>

          <el-table-column
            prop="quality_feedback"
            label="质检结果">
          </el-table-column>

          <el-table-column
            prop="note"
            label="工单备注">
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
        <div style="text-align:center;margin:50px 0px">
          <span class="enter_btn_2" @click="begin_updata">提交</span>
        </div>
      </div>
    </transition>

    <transition enter-active-class="animated fadeInRight">
      <div class="call_detail" v-if="is_show_zj_2">
        <p class="title" @click="hide2" style="border-bottom:1px solid #eee;justify-content:flex-start;cursor:pointer">
          <i  class="el-icon-arrow-left" style=";cursor:pointer" ></i>
          <span style="margin-top:-4px;margin-left:10px;cursor:pointer">导出数据</span>
        </p>
        <div style="font-size:16px;color:#464646">
          <el-row style="margin-top:20px">
            <el-col :span="4">通话结果</el-col>
            <el-col :span="20">
              <el-checkbox-group v-model="export_data.call_result">
                <el-checkbox label="0">全部</el-checkbox>
                <el-checkbox label="1">接通</el-checkbox>
                <el-checkbox label="2">无人接听</el-checkbox>
                <el-checkbox label="3">拒接</el-checkbox>
                <el-checkbox label="4">关机</el-checkbox>
                <el-checkbox label="5">停机</el-checkbox>
                <el-checkbox label="6">空号</el-checkbox>
                <el-checkbox label="7">其他</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="4">结算标准</el-col>
            <el-col :span="20">
              <el-checkbox-group v-model="export_data.settlement_result">
                <el-checkbox label="0">全部</el-checkbox>
                <el-checkbox label="1">成功</el-checkbox>
                <el-checkbox label="2">不成功</el-checkbox>
                <el-checkbox label="3">预约待跟进</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="4">质检结果</el-col>
            <el-col :span="20">
              <el-checkbox-group v-model="export_data.quality">
                <el-checkbox label="0">全部</el-checkbox>
                <el-checkbox label="1">合格</el-checkbox>
                <el-checkbox label="2">不合格</el-checkbox>
                <el-checkbox label="3">未质检</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="4">呼出数据</el-col>
            <el-col :span="20">
              <el-checkbox-group v-model="export_data.call_1">
                <el-checkbox label="0">全部</el-checkbox>
                <el-checkbox label="1">通话时间</el-checkbox>
                <el-checkbox label="2">通话时长</el-checkbox>
                <el-checkbox label="3">工单备注</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>

          <el-row style="margin-top:20px">
            <el-col :span="4">导入数据</el-col>
            <el-col :span="20">
              <el-checkbox-group v-model="export_data.call_2">
                <el-checkbox label="0">全部</el-checkbox>
                <el-checkbox label="1">客户号码</el-checkbox>
                <el-checkbox label="2">客户名称</el-checkbox>
                <el-checkbox label="3">客户公司</el-checkbox>
                <el-checkbox label="4">客户性别</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>

          <div style="text-align:center;margin:150px 0px 50px 0px">
            <span class="enter_btn_2" @click="begin_export">提交</span>
          </div>
        </div>
      </div>
    </transition>
  </div>               
</template>

<script>
      import exportExcel from '../../common/exportExcel'
      export default {
        name:'HasCalled',
        components:{
        
        },
        data() {
          return {
            updata:{
              qc_res:1,
              qc_note:'',
              record_id:'',
              project_id:''
            },
            export_data:{
              call_result:[],
              settlement_result:[],
              quality:[],
              call_1:[],
              call_2:[]
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
              quality_feedback:'',
              phone:'',

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
            zj_data:{
              record:{
                record:''
              }
            }
          };
        },
        created(){
          
          this.getinfoData();
          this.getMainData();
          this.gettotalData(); 
        },
        computed: {
         
        },
        methods: {
          enter_row(row){
            console.log(row)
            for(var i in this.updata){
              if(i=='qc_res'){
                this.updata[i]=1
              }else{
                this.updata[i]=''
              }
            }
            this.updata.project_id=this.$route.query.project_id
            this.updata.record_id=row.record_id
            this.getzjData(row.record_id)
          },
          hide1(){
            this.is_show_main_con=true;
            this.is_show_zj_1=false;
          },
          hide2(){
            this.is_show_main_con=true;
            this.is_show_zj_2=false;
          },
          radio_change(val){
            if(val==1){
              this.updata.qc_note=''
            }
          },
          begin_updata(){
            
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
                _this.$message({
                  type: 'success',
                  message: '提交成功'
                });
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
          begin_export(){
            let leg1=this.export_data.call_result.length,
                leg2=this.export_data.settlement_result.length,
                leg3=this.export_data.quality.length;
            if(leg1==0 && leg2==0 && leg3==0){
              this.$message({
                type: 'warning',
                message: '请输入条件'
              });
              return;
            }


            let _this=this;
            this.$http('/project/statistics/export_already',_this.export_data).then(function(res){
              if(res.data.code==1000){
                _this.$message({
                  type: 'success',
                  message: '导出成功'
                });
              }else{
                _this.$message({
                  type: 'warning',
                  message: '导出失败'
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
            this.$http('/statistics/have_outbound',{project_id:_this.$route.query.project_id,..._this.form}).then(function(res){
              if(res.data.code==1000){
                _this.loading=false;
                _this.detailed_statistics_data=res.data.data;
              }
            },function(err){
              console.log(err)
            })
          },
          search(){
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
          this.$store.dispatch('defaultActiveAction','/index/projectCenter/hasCalled');
        }
    }
</script>
 
<style scoped>  
  .nocall{padding: 20px;}
  .title{font-size: 20px;color: #313131;display: flex;height: 60px;align-items: center;justify-content: space-between;margin-bottom: 30px}
  .title>span>span{display: inline-block;width: 5px;height: 18px;background: #ff944e;margin-right: 10px;vertical-align: center;position: relative;top: 2px}
  .enter_btn_2{width: 120px;height: 40px;display: inline-block;border: 1px solid #ff7a59;text-align: center;line-height: 40px;color: #ff7a59;font-size: 14px;}
  .content2{background: white;padding:30px;}

  .content2 .tit .btn1,.content2 .tit .btn2{display: inline-block;width: 100px;height: 35px;line-height: 35px;border:1px solid #ff7a59;background: linear-gradient(to right, #ff9a4c , #ff7a59);text-align: center;margin-left: 20px;color: white;font-size: 14px;cursor: pointer;border-radius: 2px;float: right;}
  .line{height: 55px;width: 1px;display: inline-block;background: #eee}
  .svg_wap{display:flex;justify-content: space-around;align-items: center;margin-bottom: 30px}


  .call_detail{padding: 30px;background: white;}
  #propress-ball{width: 15px;height: 15px;background-color: #fe9039;border-radius: 100%;position: absolute;left: 0;top: -4px;cursor: pointer;}
  #progress{float:left;width: 100%;height: 7px;background-color: #eee;position: relative;cursor: pointer;width: 530px}
  #progress-con{height: 100%;background:linear-gradient(to right, #ff9a4c , #ff7a59);float: left;width:0px}

</style>
<style>

.enter_btn_2{display: inline-block;width: 100px;height: 35px;line-height: 35px;border:1px solid #ff7a59;background: linear-gradient(to right, #ff9a4c , #ff7a59);text-align: center;margin-left: 20px;color: white;font-size: 14px;cursor: pointer;border-radius: 2px;color: white!important}

 .myinput .el-input__icon{color: #ff7a59;right: 20px;font-size: 20px}
 .myinput .el-table th>.cell{text-align: center;background: white}
 .myinput .el-table th{background: white}
 .myinput .el-table .cell, .el-table th>div{text-align: center;}

 .content2 .el-input__inner{border:none;background: #f3f3f3;}

 .el-select-dropdown__item.selected.hover{background: #ff9a4c}
 .el-select-dropdown__item.selected{background: #ff9a4c}
 .el-table tr{cursor: pointer;}
 .el-pager li.active{background: #ff7a59;border-color:#ff7a59;}
 .el-pager li{height: 33px;line-height: 32px;}
 .el-pager li:hover{color: #464646}
 .el-pagination__editor :focus{border-color: #ff7a59}
 .el-pagination__editor{line-height: 23px;}
 .el-pagination button, .el-pagination span{height: 33px;line-height: 33px;}

</style>

