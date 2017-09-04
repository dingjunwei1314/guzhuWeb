<template>
	<div style="padding-top:16px">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="成长" name="first">
    			<div class="echart">
    				<img src="./img/banner.png" height="357" width="941" alt="">
    			</div>
    			<div class="level" style="margin-top:28px">
    				<div class="text-regular" style="margin-bottom: 20px">我的等级
						<div class="upgrade" @click="upgrade">升级条件</div>
    				</div>
    				
					<div class="level_content">
						<p>
							<span style="float:left">当前等级：</span>
        					<span style="float:left;color:#fe9039;font-weight:bold">
        						<template>{{dataGrow.level}}</template>
        					</span>
        					<el-progress :percentage="50" :show-text="false" :stroke-width="12" style="width:220px;float:left;margin-left:10px;margin-top:5px"></el-progress>
        				 	<span style="position:relative;top:-2px;margin-left:44px;color:#999">完成以下任务可升级为LV1云客</span>
						
						</p>
						 <p class="img_wap" style="text-align:center;">
       					 <span>
        					<div   style="line-height:64px;text-align:center;color:#f1f1f1;font-size:12px;">实名认证</div>
        					<img  v-if="dataGrow.list.identify_verify=='0'" src="./img/level1.png" height="64" width="64" alt="">
        					<img v-else="dataGrow.list.identify_verify=='2'" src="./img/level1_active.png" height="64" width="64" alt="">

        				</span><i></i>

        				<span>
        					<div style="line-height:64px;text-align:center;color:#f1f1f1;font-size:12px;">学历认证</div>
        					<img  v-if="dataGrow.list.certify_verify==0" src="./img/level2.png" height="64" width="64" alt="">
        					<img v-else="dataGrow.list.certify_verify==2" src="./img/level2_active.png" height="64" width="64" alt="">
        				</span><i></i>

        				<span>
        					<div style="line-height:64px;text-align:center;color:#f1f1f1;font-size:12px;" @click='openStr'>打字测试</div>
        					<img  v-if="dataGrow.list.typing==0" src="./img/level3.png" height="64" width="64" alt="">
        					<img v-else="dataGrow.list.typing==1" src="./img/level3_active.png" height="64" width="64" alt="" >

        				</span><i></i>

        				<span>
        					<div style=";text-align:center;color:#f1f1f1;font-size:12px;">
          						<p style="margin-top:15px;">普通话</p>
          						<p style="margin-top:0px">测试</p>
        					</div>
        					<img v-if="dataGrow.list.talking==0" src="./img/level4.png" height="64" width="64" alt="">
        					<img v-else="dataGrow.list.talking==1" src="./img/level4_active.png" height="64" width="64" alt="">

        				</span><i></i>

        				<span>
         					<div style=";text-align:center;color:#f1f1f1;font-size:12px;">
            					<p style="margin-top:15px;">基础知识</p>
            					<p style="margin-top:0px">培训考试</p>
          					</div>
        					<img  v-if="dataGrow.list.basic_knowledge==0" src="./img/level5.png" height="64" width="64" alt="">
        					<img v-else="dataGrow.list.basic_knowledge==1" src="./img/level5_active.png" height="64" width="64" alt="">
        
        				</span><i></i>

       					<span>
        					<div style="line-height:64px;text-align:center;color:#f1f1f1;font-size:12px;">首单任务</div>
        					<img v-if="dataGrow.list.neuling_order==0" src="./img/level6.png" height="64" width="64" alt="">
       						<img v-else="dataGrow.list.neuling_order==1" src="./img/level6_active.png" height="64" width="64" alt="">

        				</span>
      				</p>

					</div>
					
    			</div>
    			<div class="privilege" style="margin-top:28px">
    				<div class="text-regular" style="margin-top:8px;margin-bottom: 20px">全部特权</div>
    				<table class="user_table">
    					<tr style="background:#eee">
    						<th class="tlevel" style="width:70px;text-align:center;">等级</th>
    						<th>新手客服</th>
    						<th>普通客服</th>
    						<th>高级客服</th>
    						<th>金牌客服</th>
    					</tr>
    					<tr style="border-top:1px solid #reddd">
    						<td rowspan="3" class="tq" style="text-align:center;background:#eee;font-weight:700">特权</td>
    						<td style="padding-left:20px">接新手订单</td>
    						<td>承接普通订单</td>
    						<td>承接平台所有订单</td>
    						<td>承接平台所有订单</td>
    					</tr>
    					<tr>
    						<!-- <td>特权</td> -->
    						<td style="padding-left:20px">参加新手培训</td>
    						<td>参加高级客服培养计划</td>
    						<td>参加金牌客服培养计划</td>
    						<td>获得增值服务项目收益</td>
    					</tr>
    					<tr>
    						<!-- <td> - </td> -->
    						<td style="padding-left:20px">-</td>
    						<td>-</td>
    						<td>高级客服</td>
    						<td>平台金牌客服奖学金</td>
    					</tr>
    					
    				</table>
    			</div>

    		</el-tab-pane>
    		<el-tab-pane label="动态" name="second">
				<div class="time_machine">
					<div class="time_title">时光机</div>
					<div class="time_content">
						<div class="bubble fl" v-for="(grayImg,index) in grayImgs" :key='index'>
							<img :src="'/static/userCenter/'+imgs[index]" height="74" width="45" alt="" v-if='dataDynamic.yk_time_machine[index]'>
							<img :src="'/static/userCenter/'+grayImg" height="74" width="45" alt="" v-else>
							<div class="first" style="height:17px">{{dataDynamic.yk_time_machine[index]?dataDynamic.yk_time_machine[index].type:''}}</div>
							<div class="timeline"></div>
							<div class="circle"></div>
							<div class="ttime">{{dataDynamic.yk_time_machine[index]?dataDynamic.yk_time_machine[index].log_time:''}}</div>
						</div>
					</div>

				</div>
				<div class="my_dynamic">
					<div class="title">
						我的动态
					</div>
					<div class="content" >
						<div class="inner" v-for="item in dataDynamic.dynamic_record">
							<span>{{item.record_time}}</span>
							<span style="margin-left:26px">{{item.record_title}}</span>
						</div>
					</div>
				</div>
    		</el-tab-pane>
    		<el-tab-pane label="设置" name="third" style="width:920px">
    			<div class="head_img" style="padding:20px;overflow:hidden">
    			<div >	
					<el-upload
    					class="upload_img"
    					style="padding-right:20px;width:115px;overflow:hidden"
  						action="https://jsonplaceholder.typicode.com/posts/"
                    	list-type="picture-card"
                    	:on-preview="handlePictureCardPreview"
  						:on-remove="handleRemove"
  						>
  						<!-- <i class="el-icon-plus"></i> -->
						<el-button size="small begin1 begin" type="primary" @click="getImg">编辑头像</el-button>
					</el-upload>

    			</div>
    				
					<!-- <el-dialog v-model="dialogVisible" size="tiny">
  						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog> -->
    				<div class="xiugai">修改头像，让您更帅气一些</div>
    				
    			</div>
				<div class="bind" style="border-bottom:1px solid #ddd">
					<img src="./img/user01_03.jpg" class="fl" height="37" width="40" alt="">
					<div class="bind_phone fl">
						<p>绑定手机号</p>
						<p>您的手机号是您最重要的信息之一，请慎重变更</p>
					</div>
					<el-button type="primary" class="begin btn" style="max-width:88px;padding:10px" @click.stop="changeCode">修改手机号</el-button>
				</div>
				<div class="bind">
					<img src="./img/user01_07.jpg" class="fl" height="37" width="" alt="">
					<div class="bind_phone fl">
						<p>修改密码</p>
						<p>为了保证您的账号安全，建议您使用安全级别较高的登录密码</p>
					</div>
					<el-button type="primary" class="begin btn" @click.stop="changePass">修改密码</el-button>
				</div>
    		</el-tab-pane>
    		<el-tab-pane label="认证" name="fourth" style="padding-right:0px" >
    			<div v-show="showWhichData.step1">
    				<div class="certification fl" >
					<img src="./img/renzheng_03.jpg" height="90" width="72" alt="">
					<div style="margin-top:20px;">
						<p>请您及时完成实名认证，以便畅游云客在家平台</p>
					</div>
					<el-button :plain="true" type="primary" style="margin-top:22px;margin-left:49px"  @click="enterStep2" >实名认证</el-button>
					<i></i>
				</div>                 
				<div class="certification fl" style="margin-left:70px">
					<img src="./img/renzheng_05.jpg" height="90" width="72" alt="">
					<div style="margin-top:20px;">
						<p>根据项目要求学历不同，请您及时完成学历认证</p>
					</div>
					<el-button :plain="true" type="primary" style="margin-top:22px;margin-left:49px" @click="enterStep3">学历认证</el-button>
					<i class="line"></i>
				</div>       
				<div class="certification fl" style="padding-left:55px">
					<img src="./img/renzheng_07.jpg" height="90" width="72" alt="">
					<div style="margin-top:20px;">
						<p>为了保证高级项目的质量，请您及时完成人脸识别</p>
					</div>
					<el-button :plain="true" type="primary" @click.native="ceshi" style="margin-top:22px;margin-left:49px">人脸识别</el-button>
					<i class="line" style="position:absolute;left:606px"></i>
				</div>  
    			</div>
				   
				<div class="step2" v-show="showWhichData.step2">
     				<el-row style="width:620px;margin-top:10px">
     					 <el-col :span="16" >
     					 	<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" :rules="rule1" ref="formLabelAlign">
     					 		<el-form-item label="身份证姓名" prop="name">
              						<el-input v-if="dataGrow.list.identify_verify==0" v-model="formLabelAlign.name" placeholder="请输入身份证姓名"></el-input>
              						<p v-else-if="dataGrow.list.identify_verify==1||dataGrow.list.identify_verify==2">{{formLabelAlign.name}}</p>
              						<el-input v-else-if="dataGrow.list.identify_verify==3" v-model="formLabelAlign.name" placeholder="请输入身份证姓名"></el-input>
            					</el-form-item>
								
            					<el-form-item label="身份证号码" prop="identify_code">
              						<el-input v-if="dataGrow.list.identify_verify==0" v-model="formLabelAlign.identify_code" placeholder="请输入身份证号码"></el-input>
              						<p v-else-if="dataGrow.list.identify_verify==1||ataGrow.list.identify_verify==2">{{formLabelAlign.identify_code}}</p>
              						<el-input v-else-if="dataGrow.list.identify_verify==3" v-model="formLabelAlign.identify_code" placeholder="请输入身份证姓名"  ></el-input>
            					</el-form-item>
            					<el-form-item class="up" label="手持身份证 上传">
            					 	<el-row  style="overflow:hidden;height:148px">
            					 		<el-col :span="12" v-if="dataGrow.list.identify_verify==1||dataGrow.list.identify_verify==2">
            					 			 <img :src="formLabelAlign.Photo_address" alt=""> 
            					 		</el-col>
            					 		<el-col :span="12" v-else-if="dataGrow.list.identify_verify==0">
            					 			<el-upload
                    							action="https://jsonplaceholder.typicode.com/posts/"
                    							list-type="picture-card"
                    							:before-upload="beforeAvatarUpload"
                    							:on-preview="handlePictureCardPreview"
                    							:on-remove="handleRemove"
                    							>
                    							<i class="el-icon-plus"></i>
                  							</el-upload>
                  							<el-dialog v-model="dialogVisible" size="tiny">
                    							<img width="100%" :src="formLabelAlign.Photo_address" alt="">
                  							</el-dialog>
            					 		</el-col>
            					 		<el-col :span="12" style="text-align:left!important">
                  							<span style="color:#666!important;font-size:12px!important;line-height:20px!important;display:inline-block;width:165px">五官可见、证件全部信息清晰无遮挡、完全露出手臂、图片大小不要超过5M，支持jpg bmp .png .gif格式,我们将妥善保管您的照片</span>  
               							</el-col>
            					 	</el-row>
            					 </el-form-item>
     					 	</el-form>
     					</el-col>
						<el-col :span="8">
          					<img src="../bootpage/img/demo.png" style="width:170px;height:220px;margin-left:20px">
       					</el-col>
     				</el-row>
     				<el-button type="primary" class="next begin" v-if="formLabelAlign.name&&formLabelAlign.identify_code&&dataGrow.list.identify_verify==0"  @click.prevent="getName">提交审核</el-button>
     				<el-button type="primary" class="next begin" v-else-if="dataGrow.list.identify_verify==1"  @click.prevent="getName">撤销提交</el-button>

     				<el-button type="primary" class="next begin" v-else-if="dataGrow.list.identify_verify==2"  @click.prevent="getName"></el-button>
     				<el-button type="primary" class="next begin" v-else-if="dataGrow.list.identify_verify==3"  @click.prevent="getName">重新提交</el-button>
     				<el-button v-else type="primary"  class="next begin" :disabled="true">提交审核</el-button>

     				<!-- <p style="font-size:14px;color:#666;position:absolute;right:500px">如需变更信息，请及时与我们联系：400-888-8888</p> -->
    			</div>
    			<div class="step3" v-show="showWhichData.step3">
     				<el-row style="width:620px;margin-top:14px">
     					 <el-col :span="16">
     					 	<el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign1" :rules="rule2" ref="formLabelAlign1">
	
     					 		<el-form-item label="毕业证姓名" prop="name">
     					 			<el-input v-if="dataGrow.list.certify_verify==0" v-model="formLabelAlign1.name" placeholder="请输入毕业证姓名"></el-input>
     					 			<p v-else-if="dataGrow.list.certify_verify==1||dataGrow.list.certify_verify==2">{{formLabelAlign1.name}}</p>
              						<el-input v-else v-model="formLabelAlign1.name" placeholder="请输入毕业证姓名"></el-input>
            					</el-form-item>
            					<el-form-item label="毕业院校" prop="graduation_yard">
            						<el-input  v-if="dataGrow.list.certify_verify==0" v-model="formLabelAlign1.graduation_yard" placeholder="请输入毕业院校"></el-input>
            						<p v-else-if="dataGrow.list.certify_verify==1||dataGrow.list.certify_verify==2">{{formLabelAlign1.graduation_yard}}</p>
              						<el-input v-else v-model="formLabelAlign1.graduation_yard" placeholder="请输入毕业院校"></el-input>
            					</el-form-item>
            					<el-form-item label="最高学历" prop="highest_education">
              						<el-select v-if="dataGrow.list.certify_verify==0" v-model="formLabelAlign1.highest_education" placeholder="请选择学历" style="width:100%">
      									<el-option label="高中以下" value="gzyx"></el-option>
      									<el-option label="高中" value="gz"></el-option>
      									<el-option label="专科" value="zk"></el-option>
      									<el-option label="本科" value="bk"></el-option>
      									<el-option label="本科以上" value="bkys"></el-option>
    								</el-select>
    								<p v-else-if="dataGrow.list.certify_verify==1||dataGrow.list.certify_verify==2" v-model="formLabelAlign1.highest_education" style="width:100%">
      									{{formLabelAlign1.highest_education}}
    								</p>
    								<!-- <el-select v-if="dataGrow.list.certify_verify==0" v-model="formLabelAlign1.highest_education" placeholder="请选择学历" style="width:100%">
      									<el-option label="高中以下" value="gzyx"></el-option>
      									<el-option label="高中" value="gz"></el-option>
      									<el-option label="专科" value="zk"></el-option>
      									<el-option label="本科" value="bk"></el-option>
      									<el-option label="本科以上" value="bkys"></el-option>
    								</el-select> -->
            					</el-form-item>
            					<el-form-item label="学信网编号" prop="graduation_code" class="xxcode">
              						<el-input v-if="dataGrow.list.certify_verify==0" v-model="formLabelAlign1.graduation_code" placeholder="请输入编号"></el-input>
              						<p v-else-if="dataGrow.list.certify_verify==1||dataGrow.list.certify_verify==2">{{formLabelAlign1.graduation_code}}</p>
              						<el-input v-else v-model="formLabelAlign1.graduation_code" placeholder="请输入编号"></el-input>
            					</el-form-item>
            					 <el-form-item class="up" label="上传毕业 证书" prop="identifier_upload">
            					 	<el-row style="overflow:hidden" v-if="dataGrow.list.certify_verify==0">
            					 		<el-upload
  											action="https://jsonplaceholder.typicode.com/posts/"
  											list-type="picture-card"
  											:on-preview="handlePictureCardPreview"
  											:on-remove="handleRemove">
  											<i class="el-icon-picture"></i>
										</el-upload>
										<el-dialog v-model="dialogVisible1" size="tiny">
										  <img width="100%" :src="formLabelAlign1.Photo_address" alt="">
										</el-dialog>
            					 	</el-row>
            					 	<el-row style="overflow:hidden" v-if="dataGrow.list.certify_verify==1||dataGrow.list.certify_verify==2">
            					 		<img :src="formLabelAlign1.Photo_address" alt="">
            					 	</el-row>
            					 	<el-row>
            					 		<el-col :span="24" style="text-align:left!important">
                  							<span style="color:#666!important;font-size:12px!important;line-height:20px!important;display:inline-block;margin-top:10px">证件全部信息清晰无遮挡图片大小不要超过5M，支持jpg bmp .png .gif格式，我们将妥善保管您的照片</span>  
               							</el-col>
            					 	</el-row>
            					 </el-form-item>
     					 	</el-form>
     					</el-col>
						
     				</el-row>
     				<el-button type="primary" class="begin" style="margin-left:100px;margin-top:26px" @click.prevent="getEducation" v-if="formLabelAlign1.name&&formLabelAlign1.graduation_yard&&formLabelAlign1.highest_education">提交审核</el-button>
     				<el-button type="primary" class="begin" style="margin-left:100px;margin-top:26px" @click.prevent="getEducation" v-else-if="dataGrow.list.certify_verify==1">撤销提交</el-button>
     				
     				<el-button type="primary" class="next begin" v-else-if="dataGrow.list.certify_verify==2"  style="margin-left:100px;margin-top:26px" @click.prevent="getName"></el-button>
     				<el-button type="primary" class="next begin" v-else-if="dataGrow.list.certify_verify==3"  style="margin-left:100px;margin-top:26px" @click.prevent="getName">重新提交</el-button>

     				<el-button type="primary" v-else class="begin" style="margin-left:100px;margin-top:26px" :disabled="true">提交审核</el-button>
     			
    			</div>

    	   </el-tab-pane>


 		</el-tabs>

 		
    <transition name="fade">
      <div class="ceshi_wap" v-if="is_show_ceshi">
        <div class="center_con_wap">
          <p class="tit">人脸识别签入</p>
          <i class="iconfont icon-guanbi1 close" @click="close_ceshi"></i>
          <div class="con">
            
          </div>
          <div class="circle_0">
            <p class="tiao"></p>
            <img :src="src">
          </div>
          <div style="margin-top:35px;padding:20px 0px;cursor:pointer" @click="ceshi_sure">
            <p class="tit2">请直视摄像头</p>
            <p class="tit3">准备好后，点击确认</p>
          </div>
          

        </div>
      </div>
    </transition>

    	<Alert  :title="alert8.title" :isright="alert8.isright" :btntext="alert8.btntext" :message="alert8.message" :isshow="alert8.isshow" @close="close8" @sure="sure9" ></Alert>
		<!-- 绑定手机号 -->
 		<Alert  :title="alert.title" :isright="alert.isright" :btntext="alert.btntext" :message="alert.message" :isshow="alert.isshow" @close="close" @sure="sure" ></Alert>

		<AlertDetailCmn :title="alert2.title"  :btntext="alert2.btntext" :isshow="alert2.isshow" @close="close2" @sure="sure2" class="btns">
			<div slot="alert_con" style="padding-top:70px;padding-right:94px">
				<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2"  class="demo-ruleForm" v-show="showWhichData.step1==true">
					<el-form-item>
						 <el-row style="color:#666;padding-left:20px" >
      		    			<el-col :span="5" style="font-size:14px">原手机号：</el-col>
      		    			<el-col :span="16" style="padding-left:3px">17004158476</el-col>
      		  			</el-row>
					</el-form-item>
					<el-form-item label="" prop="code">
						<el-row style="color:#666;padding-left:20px">
							<el-col :span="5">验证：</el-col>
							<el-col :span="13">
								<el-input v-model="ruleForm2.code" type="tel" placeholder="请输入验证码" class="code"></el-input>
							</el-col>
							<el-col :span="6">
								<el-button type="primary" @click="handleYanzheng" class="codeBtn begin" v-if="!sendMsgDisabled">
          							<span >获取验证码</span>
          						</el-button>
								<el-button type="primary" class="codeBtn " v-if="sendMsgDisabled" :disabled=true>
          							<span >{{time+'秒后获取'}}</span>
          						</el-button>
							</el-col>
						</el-row>
						<el-row style="color:#666;padding-left:20px" >
      		  	  			<span style="margin-left:94px;font-size:12px;color:#bfbfbf">如果您的手机号无法收到信息，请联系客服</span>
      		  			</el-row>
       				</el-form-item>
       				<div style='position:absolute;left:111px;margin-top:33px'>
            			<el-button type="primary" class="begin qianRuBtn" @click.prevent='enterStep4(1)'>下一步</el-button>
          			</div>
      		 	</el-form>
      		 	<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2"  class="demo-ruleForm" v-show="showWhichData.step4">
					<el-form-item label="" prop="mobile">
						 <el-row style="color:#666;padding-left:20px" >
      		    			<el-col :span="5" style="font-size:14px">新手机号：</el-col>
      		    			<el-col :span="19">
								<el-input :span="16" v-model="ruleForm2.mobile" type="tel" placeholder="请输入新手机号" class="code"></el-input>
							</el-col>
      		  			</el-row>
					</el-form-item>
					<el-form-item label="" prop="code">
						<el-row style="color:#666;padding-left:20px">
							<el-col :span="5">验证：</el-col>
							<el-col :span="13">
								<el-input v-model="ruleForm2.code1" type="tel" placeholder="请输入验证码" class="code"></el-input>
							</el-col>
							<el-col :span="6">
								<el-button type="primary" @click="handleYanzheng" class="codeBtn begin" v-if="!sendMsgDisabled">
          							<span >获取验证码</span>
          						</el-button>
								<el-button type="primary" class="codeBtn " v-if="sendMsgDisabled" :disabled=true>
          							<span >{{time+'秒后获取'}}</span>
          						</el-button>
							</el-col>
						</el-row>
						<el-row style="color:#666;padding-left:20px" >
      		  	  			<span style="margin-left:94px;font-size:12px;color:#bfbfbf">如果您的手机号无法收到信息，请联系客服</span>
      		  			</el-row>
						<div style='position:absolute;left:111px;margin-top:53px'>
            				<el-button type="primary" class="begin qianRuBtn" @click.prevent='enterStep4(2)'>确认提交</el-button>
          				</div>
       				 </el-form-item>
      		  </el-form>
      		</div>
    	</AlertDetailCmn>

    	<!-- 修改登录密码 -->
    	<Alert  :title="alert.title" :isright="alert.isright" :btntext="alert.btntext" :message="alert.message" :isshow="alert.isshow" @close="close" @sure="sure"></Alert>

		<AlertDetailCmn :title="alert3.title"  :btntext="alert3.btntext" :isshow="alert3.isshow" @close="close3" @sure="sure3" class="btns">
			<div slot="alert_con" style="padding-top:70px;padding-right:94px">
				<el-form :model="ruleForm" :rules="rules2" ref="ruleForm2"  class="demo-ruleForm" v-show="showWhichData.step1==true">
					<el-form-item>
						 <el-row style="color:#666;padding-left:20px" >
      		    			<el-col :span="5" style="font-size:14px">手机号码</el-col>
      		    			<el-col :span="16" style="padding-left:3px">17004158476</el-col>
      		  			</el-row>
					</el-form-item>
					<el-form-item label="" prop="code">
						<el-row style="color:#666;padding-left:20px">
							<el-col :span="5">验证</el-col>
							<el-col :span="13">
								<el-input v-model="ruleForm.code" type="tel" placeholder="请输入验证码" class="code"></el-input>
							</el-col>
							<el-col :span="6">
								<el-button type="primary" @click="handleYanzheng" class="codeBtn begin" v-if="!sendMsgDisabled">
          							<span >获取验证码</span>
          						</el-button>
								<el-button type="primary" class="codeBtn " v-if="sendMsgDisabled" :disabled="true">
          							<span >{{time+'秒后获取'}}</span>
          						</el-button>
							</el-col>
						</el-row>
						<el-row style="color:#666;padding-left:20px" >
      		  	  			<span style="margin-left:94px;font-size:12px;color:#bfbfbf">如果您的手机号无法收到信息，请联系客服</span>
      		  			</el-row>
       				</el-form-item>
       				<div style='position:absolute;left:111px;margin-top:33px'>
            			<el-button type="primary" class="begin qianRuBtn" @click.prevent='enterStep6(1)'>下一步</el-button>
          			</div>
      		 	</el-form>
      		 	<el-form :model="ruleForm" :rules="rules2" ref="ruleForm"  class="demo-ruleForm" v-show="showWhichData.step4">
					<el-form-item label="" prop="mobile1">
						 <el-row style="color:#666;padding-left:20px" >
      		    			<el-col :span="5" style="font-size:14px">重置密码</el-col>
      		    			<el-col :span="19">
								<el-form-item label="" prop="pass">
          							<el-input type="password" @input="p_len($event)" v-model="ruleForm.	password" auto-complete="off" placeholder="设置密码"></el-input>
        						</el-form-item>
        						<div v-if="reg" class="lnu_container">
            						<p v-bind:class="{ lovercase_valid: contains_lovercase }"></p>
            						<p v-bind:class="{ number_valid: contains_number }"></p>
            						<p v-bind:class="{ uppercase_valid: contains_uppercase }"></p>
       				 			</div>
							</el-col>
      		    			
      		  			</el-row>
					</el-form-item>
					<el-form-item label="" prop="code">
						<el-row style="color:#666;padding-left:20px">
							<el-col :span="5" style="font-size:14px">确认密码</el-col>
      		    			<el-col :span="19">
      		    			 	<el-form-item label="" prop="confirm_psd">
          							<el-input type="password" v-model="ruleForm.confirm_psd" auto-complete="off" placeholder="确认密码"></el-input>
        						</el-form-item>
							</el-col>
						</el-row>
						<div style='position:absolute;left:111px;margin-top:53px'>
            				<el-button type="primary" class="begin qianRuBtn" @click.prevent='enterStep6(2)'>确认提交</el-button>
          				</div>
       				 </el-form-item>
      		  </el-form>
      		</div>
    	</AlertDetailCmn>
		<!-- 实名认证 -->
		<AlertWait  :title="alert4.title" :btntext="alert4.btntext" :btntext1="alert4.btntext1" :message="alert4.message" :isshow="alert4.isshow" @close="close4" @sure="sure4" @sures="sure5">
		</AlertWait>
		<!-- 学历认证 -->
		<AlertWait  :title="alert5.title" :btntext="alert5.btntext" :btntext1="alert5.btntext1" :message="alert5.message" :isshow="alert5.isshow" @close="close5" @sure="sure7" @sures="sure6">
		</AlertWait>
		<!-- 审核失败弹窗 -->
		<AlertResult :title="alert6.title" :btntext="alert6.btntext" :message="alert6.message" :resultMsg="alert6.resultMsg" :isshow="alert6.isshow" @close="close6" @sure="sure8" >
		</AlertResult>	
    <!-- 打字测试 -->
    <typingChar :isshow="alert_8.isshow" :AlertWidth='alert_8.width' :AlertHeight='alert_8.height' @close="closeStr" >
      <!-- <div slot="alert_con"> 
        
      </div> -->
    </typingChar> 
	</div>
</template>

<script>
import Alert from '../Common/Alert.vue'
import AlertWait from '../Common/AlertWait.vue'
import AlertDetailCmn from '../Common/AlertDetailCmn.vue'
import typingChar from '../Common/typingChar.vue'
import AlertResult from '../Common/AlertResult.vue'
	export default{
		name:'usercenter',
		components:{
			Alert,
      AlertDetailCmn,
			typingChar,
			AlertWait,
			AlertResult
		},
		data(){
			// 验证手机号
			var validateTel = (rule, value, callback) => {
          		var regExp = /^1[3|5|8|7][0-9]{9}$/;
       			if (value === '') {
       			  callback(new Error('请输入手机号码'));
       			}else if (regExp.test(value) === false) {
       			  callback(new Error('请输入正确手机号码'))
       			} else {
       			  callback();
       			}
      		}; 
      		// 验证验证码
      		var validateCode = (rule, value, callback) => {
        		var regExp = /^[0-9a-zA-Z]{4}$/;
        		if (value === '') {
        		  callback(new Error('请输入验证码'));
        		}else if (regExp.test(value) === false) {
        		  callback(new Error('验证码输入错误'))
        		} else {
        		  callback();
        		}
      		};
      		// 验证密码
      		var validatePass = (rule, value, callback) => {
      		  var regExp=/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\_\?\!]{6,16}$/; 
      		  if (value === '') {
      		    callback(new Error('请输入密码'));
      		  } else if(regExp.test(value) === false){
      		    callback(new Error('密码输入错误'))
      		    if (this.ruleForm.confirm_psd !== '') {
      		      this.$refs.ruleForm.validateField('confirm_psd');
      		    }
      		    callback();
      		  }
      		};
      		var validatePass2 = (rule, value, callback) => {
      		  if (value === '') {
      		    callback(new Error('请再次输入密码'));
      		  } else if (value !== this.ruleForm.password) {
      		    callback(new Error('两次输入密码不一致!'));
      		  } else {
      		    callback();
      		  }
      		};
      		// 验证身份证号码
      		var validateIdentity = (rule, value, callback) => {
            	var regExp=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|(3[0-1]))\d{3}(\d|x)$/;
                if (value === '') {
                    callback(new Error('请输入身份证号'));
                }else if (regExp.test(value) === false) {
                    callback(new Error('请输入正确的身份证号码'))
                } else {
                    callback();
                }
            };
            // 验证姓名
            var validateName = (rule, value, callback) => {
              var regExp=/^[\u4e00-\u9fa5]{2,4}$/;
                if (value === '') {
                    callback(new Error('请输入姓名'));
                }else if(regExp.test(value) === false){
                    callback(new Error('请输入正确的名字'))
                } else {
                    callback();
                }
            };
			return {
        src:'/static/person.png',
        		is_show_ceshi:false,
				reg:false,
				activeName:'first',
				imageUrl: '',
				labelPosition: 'left',
				contains_lovercase: false,
          		contains_number: false,
          		contains_uppercase: false,
				showWhichData:{
              		step1:true,
              		step2:false,
              		step3:false,
              		step4:false,
              		step5:false,
              		step6:false,
            	},
            	dataGrow:{
            		"level":'',
            		"list":{
            			"id": 1,
            			"user_id": 35,
            			"typing": 1,            //打字
            			"talking": 0,          //普通话
            			"basic_knowledge": 0,  //基础知识
            			"skill_test": null,    //话务模拟拨测
            			"neuling_order": null, //新手订单
            			"identify_verify": 0,  //身份认证   2为成功
            			"certify_verify": 0    //学历认证   2为成功其他为失败
            		}
            	},
            	dataDynamic:{
            		"yk_time_machine":[],
            		"dynamic_record": []
            	},
            	// 身份认证
            	formLabelAlign: {
              		name: '',
              		identify_code: '',
              		type: '',
              		Photo_address: '',
            	},
            	rule1:{
          			name: [
                  	{  validator:validateName , trigger: 'blur' }
              		],
          			identify_code: [
                  	{ validator:validateIdentity , trigger: 'blur' }
              		],
            	},
            	// 学历认证
            	formLabelAlign1:{
            		graduated_name:'',
            		graduation_yard:'',
            		highest_education:'',
            		graduation_code:'',
            		identifier_upload:'',
            		Photo_address:''
            	},
            	rule2:{
            		name: [
                  	{ required:true , validator:validateName , trigger: 'blur' }
              		],
					graduation_yard: [
            		{ required: true, message: '请输入毕业院校', trigger: 'blur' },
          			],
          			highest_education: [
            		{ required: true, trigger: 'blur' },
          			],
          			identifier_upload: [
            		{ required: true, trigger: 'change' },
          			],
            	},
            	// 修改登录密码
            	ruleForm:{
            		page:1,
            		password:'',
            		confirm_psd:'',
            		code:''
            	},
            	// 绑定手机号
            	ruleForm2: {
          			pass: '',
          			mobile:'',
          			code:'',
          			password:'',
        		},
            	rules2:{
            		pass: [
            		{ validator: validatePass, trigger: 'blur' }
          			],
          			confirm_psd: [
          			{ validator: validatePass2, trigger: 'blur' }
          			],
          			mobile: [
          			{ validator:validateTel , trigger: 'blur' }
          			],
          			code: [
          			{ validator:validateCode , trigger: 'blur' }
          			],
          			code1: [
          			{ validator:validateCode , trigger: 'blur' }
          			],
            	},
            	img:'',
            	dialogVisible: false,
            	dialogVisible1: false,
            	alert:{
        			title:'修改手机号',
        			isright:true,
        			message:'恭喜您，更改成功',
        			isshow:false,
        			btntext:'点击重新登录'
     			},
          		alert8:{
             		title:'测试结果',
             		isright:false,
             		message:'人脸识别失败,  请保证五官清晰可见且确认是您本人识别',
             		isshow:false,
             		btntext:'重新识别'
          		},
            	alert2:{
        			title:'修改手机号',
        			isshow:false,
        			btntext:'下一步'
      			},
      			alert3:{//修改登录密码
          			title:'登录密码',
          			isshow:false,
        		},
        		alert4:{
        			title:'实名认证',
        			isshow:false,
        			btntext:'点击重新登录',
        			btntext1:'点击重新登录'
        		},
        		alert5:{
        			title:'实名认证',
        			isshow:false,
        			btntext:'撤销审核',
        			btntext1:'完成'
        		},
        		
        		alert6:{
        			title:'实名认证',
        			isshow:false,
        			btntext:'重新上传',
        		},
            alert_8:{
              isshow:false
            },
        		isshowAlert:true,
      			time: 60, // 发送验证码倒计时
        		sendMsgDisabled: false,
        		wrong:'',
        		// 循环图片
        		imgs:['bg_01.png','bg_02.png','bg_03.png','bg_04.png','bg_05.png','bg_06.png','bg_07.png'],//时光机有色图片的集合
        		grayImgs:['graybg_01.png','graybg_02.png','graybg_03.png','graybg_04.png','graybg_05.png','graybg_06.png','graybg_07.png']
        		//时光机置灰图片的集合
			}
		},

		created(){
			 this.getGrow();
			 this.getDynamic()
		},
    mounted(){
      let that=this;
      Bus.$on('southTelVideoCaptureEnable',function(val){
        that.src=val
      });
    },
	methods: {
    ceshi_sure(){
      let _this=this
      this.videotest(false);
      this.is_show_ceshi=false;
      setTimeout(function(){
        _this.$message({
          message: '人脸识别成功',
          type: 'success'
        });
      },1000)
      
    },
     videotest(swi){
      if(swi){
        if (typeof hostEditor != 'undefined')
        {
          hostEditor.southTelVideoCaptureEnable('1');
        }
      }else{
        if (typeof hostEditor != 'undefined')
        {
          hostEditor.southTelVideoCaptureEnable('0');
        }
        this.src="/static/person.png"
      }
      
    },
    openStr(){
      this.alert_8.isshow=true;
    },
    closeStr(){
      this.alert_8.isshow=false;
    },
		p_len(e){
       		if(this.contains_lovercase = /[a-zA-Z]/.test(this.ruleForm.password)||/[0-9]/.test(this.ruleForm.password)||/[\@\!\#\$\%\^\&\*\.\~\_\?\!]/.test(this.ruleForm.password)){
            this.reg = true
         	};
         	if(this.contains_number = /[0-9]/.test(this.ruleForm.password)&&/[a-zA-Z]/.test(this.ruleForm.password)||/[\@\!\#\$\%\^\&\*\.\~\_\?\!]/.test(this.ruleForm.password)){
            this.reg = true
        	};
        	if(this.contains_uppercase = /[0-9]/.test(this.ruleForm.password)&&/[a-zA-Z]/.test(this.ruleForm.password)&&/[\@\!\#\$\%\^\&\*\.\~\_\?\!]/.test(this.ruleForm.password)){
            	this.reg = true
        	};
		},
		ceshi(){
        this.is_show_ceshi=true;  
        this.videotest(true);
        },
     	close_ceshi(){
     	  this.is_show_ceshi=false; 
        this.videotest(false);
     	},
     	close8(){
     	  this.alert8.isshow=false;
     	},
     	sure9(){
     	  this.alert8.isshow=false;
     	  this.is_show_ceshi=true;
     	},
			
		handleYanzheng(e){
			this.$http('/user/sms/send').then(function(res){
            	var d=res.data;
            	if(d.code==1000){
                	console.log(222);
            	}
        	}).catch(function(err){
          		console.log(err);
        	}) 
        		console.log(e.target.parentNode.parentNode)
        		let me = this;
        		me.sendMsgDisabled = true;
        		let interval = window.setInterval(function() {
        		  if ((me.time--) <= 0) {
        		    me.time = 60;
        		    me.sendMsgDisabled = false;
        		    window.clearInterval(interval);
        		  }
        		}, 1000);
      	},
		close(){
      		this.alert.isshow=false
    	},
    	sure(){
     		this.alert.isshow=false;
     		this.$router.push({path:'/login'})
    	},
		close2(){
              this.alert2.isshow=false
          },
    	sure2(){
    	    this.alert2.isshow=false
    	},
    	close3(){
              this.alert3.isshow=false
          },
    	sure3(){
    	    this.alert3.isshow=false
    	},
    	close4(){
              this.alert4.isshow=false
        },
    	sure4(){
    	    this.alert4.isshow=false;
    	},
    	sure5(){
    		this.showWhichData.step2=false;
    		this.showWhichData.step1=true;
    		this.alert4.isshow=false
    	},
    	sure6(){
    		this.showWhichData.step3=false;
    		this.showWhichData.step1=true;
    		this.alert5.isshow=false
    	},
    	sure7(){
    		this.alert5.isshow=false;
    	},
    	close5(){
    		this.alert5.isshow=false
    	},
    	close6(){
    		this.alert6.isshow=false
    	},
    	sure8(){
    		this.alert6.isshow=false;
    	},
		handleAvatarSuccess(res, file) {
        	this.imageUrl = URL.createObjectURL(file.raw);
      	},
      	handleClick(tab, event) {
        	console.log(tab, event);
      	},
      	beforeAvatarUpload(file) {
        	const isJPG = file.type === 'image/jpeg';
        	const isLt2M = file.size / 1024 / 1024 < 2;

        	if (!isJPG) {
          		this.$message.error('上传头像图片只能是 JPG 格式!');
        	}
        	if (!isLt2M) {
          		this.$message.error('上传头像图片大小不能超过 2MB!');
        	}
       		return isJPG && isLt2M;
      	},
      	showWhich(j){
            for(var i in this.showWhichData){
              if(i=='step'+j){
                this.showWhichData[i]=true;
              }else{
                this.showWhichData[i]=false;
              }  
            }
        },
        enterStep2(){
          this.showWhich(2)
        },
        enterStep3(){
          this.showWhich(3)
        },
          // 修改手机号
        enterStep4(a){
          	var _this=this;

          	if(this.ruleForm2.code!=''){
          		if(a==1){
          			this.$http('/user/pinless/mobile',{code:_this.ruleForm2.code,page:1}).then(function(res){
          				console.log(res)
           				_this.showWhich(4)
        			}).catch(function(err){
          				console.log(err);
        			}) 
          		}else{
          			if(this.ruleForm2.mobile!='' &&this.ruleForm2.code!=''){
          				this.$http('/user/pinless/mobile',{mobile:_this.ruleForm2.mobile,password:_this.ruleForm.password,code:_this.ruleForm2.code,page:2}).then(function(res){
  							console.log(res)
           					var d=res.data;
           					if(d.code==1000){
           						_this.alert.isright=true;
              					_this.alert.message='恭喜您，更改成功。';
           					}else{
           						_this.alert.isright=false;
              					_this.alert.message='抱歉，更改失败。';
           					}
        				}).catch(function(err){
          				   console.log(err);
        				}) 
            			this.alert.isshow=true;
            			this.alert2.isshow=false
            		}
          		}
          	}
        },
        enterStep5(){
           this.showWhich(5)
        },
          // 修改密码
        enterStep6(mm){
          	var  _this=this;
          	if(this.ruleForm.code!=''){
          		if(mm==1){
          			this.$http('/user/loginpwd/edit',{code:_this.ruleForm.code,page:1}).then(function(res){
          				_this.showWhich(4)
        			}).catch(function(err){
          				console.log(err);
        			}) 
          		}else{
          			if(this.ruleForm.password!='' &&this.ruleForm.confirm_psd!=''){
          				this.$http('/user/loginpwd/edit',{password:_this.ruleForm.password,confirm_psd:_this.ruleForm.confirm_psd,page:2}).then(function(res){
           					var d=res.data;
           					if(d.code==1000){
           						_this.alert.isright=true;
              					_this.alert.message='恭喜您，更改成功。';
           					}else{
           						_this.alert.isright=false;
              					_this.alert.message='抱歉，更改失败。';
           					}
        				}).catch(function(err){
          					console.log(err);
        				}) 
            			this.alert3.isshow=false;
     	  				this.alert.isshow=true
            		}
          		}
          	}
        },
          // 头像设置
        getImg(){
          	this.$http('/user/headimg/edit',this.img).then(function(res){
            	 var d=res.data;
            	 if(d.code==1000){
            	 	 _this.dataGrow=d.data
            	 }
            	 console.log(res)
              }).catch(function(error){
                   console.log(error)
              })
        },	
        upgrade(){
          	this.$router.push({path:'/index/upgrade'})
        },
        // 个人中心成长
        getGrow(){
          	var _this=this;
          	this.$http('/yunke/user/growth/list').then(function(res){
            	 var d=res.data;
            	 if(d.code==1000){
            	 	 _this.dataGrow=d.data
            	 }
            	 console.log(res)
              _this.$store.dispatch('refreshAction',false);
              _this.$store.dispatch('loadingAction',false);
            }).catch(function(error){
                 console.log(error)
              _this.$store.dispatch('refreshAction',false);
              _this.$store.dispatch('loadingAction',false);
            })
        },
        // 个人中心动态
        getDynamic(){
          	//获取时光机动态
          	var _this=this;
          	this.$http('/user/user/dynamic').then(function(res){
            	 var d=res.data;
            	 if(d.code==1000){
            	 	_this.dataDynamic=d.data;
            	 }
            	 console.log(res)
            }).catch(function(error){
                 console.log(error)
            })
        },
        //云客雇主实名认证
        getName(){
          	var _this=this;
          	this.$http('/user/autonym/authentication',this.formLabelAlign).then(function(res){
            	 var d=res.data;
            	 var wrong=d.data
            	 if(d.code==1000){
            	 	_this.alert4.isshow=true;
            	 	_this.alert4.message="审核中，您的认证信息已成功提交，请您耐心等待 我们会在24小时内为您进行审核";
            	 	_this.alert4.btntext="撤销审核";
            	 	_this.alert4.btntext1="完成"
					// _this.alert2.isshow=true;
            	 }else{
					_this.alert6.isshow=true;
            	 	_this.alert6.resultMsg=wrong;
            	 	_this.alert6.message="您现在处于未认证状态，请及时完善您的认证信息。"
            	 
            	 }
            	 console.log(res)
            }).catch(function(error){
                console.log(error)
            })
        },
          // 学历认证
        getEducation(){
          	var _this=this;
          	this.$http('/user/education/authentication',this.formLabelAlign1).then(function(res){
          		var wrong=res.data.data;
          		console.log(wrong)
          		console.log(res)
            	 var d=res.data;
            	 if(d.code==1000){
					_this.alert5.isshow=true;
					_this.alert5.message="审核中，您的认证信息已成功提交，请您耐心等待 我们会在24小时内为您进行审核";
            	 }else{
					_this.alert6.isshow=true;
            	 	_this.alert6.resultMsg=wrong;
            	 	_this.alert6.message="您现在处于未认证状态，请及时完善您的认证信息。"
            	 }
            	 console.log(res)
            }).catch(function(error){
                 console.log(error)
            })
        },
        changeCode(){
        	this.ruleForm2.mobile='';
        	this.ruleForm2.code1='';
        	this.ruleForm2.code='';
        	this.showWhich(1);
        	this.alert2.isshow=true;
        },
        changePass(){
          	this.ruleForm2.code='';
          	this.showWhich(1);
          	this.alert3.isshow=true;
        },
        handleRemove(file, fileList) {
           console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.formLabelAlign.Photo_address = file.url;
            // this.formLabelAlign1.Photo_address = file.url;
            this.dialogVisible = true;
        },
          
    }
}
</script>
<style scoped>
	.level{margin-top:30px}
	.fl{float: left}
	.upgrade{float:right;cursor: pointer}
	.level p:nth-of-type(1) span:nth-of-type(1){margin-left: 2px}
	.level p:nth-of-type(1) span:nth-of-type(2){color: #ffac52}
	.level p:nth-of-type(1) span:nth-of-type(3){color: #999;font-size: 14px;margin-left: 40px}
	.level p:nth-of-type(2){margin:34px 0 0px 0px}
	.level p:nth-of-type(2) i{display: inline-block;width: 100px;height: 1px;background: #fe9039;position: relative;top: -29px}
	.level_content{border:1px solid #DDDDDD;height: 166px;padding:20px;font-size: 14px;box-sizing: border-box}
	.img_wap span{display: inline-block;position: relative;width: 64px;height: 64px;margin-left: -5px;cursor: pointer;}
	.img_wap span:hover div{display: block;}
	.img_wap span:nth-child(1){margin-left: 0px!important}
	.img_wap span div{position:absolute;left:0;top:0px;width:64px;height:64px;border-radius:100%;background:rgba(0,0,0,.5);z-index: 2;display: none;}
	.img_wap span img{position: absolute;left: 0;top: 0;width: 64px;height: 64px;margin-left: 0px!important}
	.user_table{width: 100%;height: 165px;font-size: 14px;border-collapse:collapse;color:#666;box-sizing: border-box;border:1px solid #ddd}
	.tlevel{border-right: 1px solid #ddd;border-bottom: 1px solid #ddd}
	.tq{border-right: 1px solid #ddd}
	.user_table tr{height: 41px;text-align: left}
	.user_table td{border-bottom: 1px solid #ddd;}
	.user_table tr th:nth-child(2){width: 200px;padding-left: 20px}
	.user_table tr th:nth-child(3){width: 246px}
	.user_table tr th:nth-child(4){width: 235px}
	.head_img{height: 155px;background-color: #F5F5F5; margin-top: 18px;padding:20px;box-sizing: border-box}
	
	.begin:hover,.next:hover{background: #feb339;border-color: #feb339}
	.begin1{width: 88px;height: 36px;position: absolute;right: 40px;top:77px}
	.xiugai{color:#999;font-size:14px;position:absolute;top:80px;left: 152px}
	.bind{width: 100%;padding: 27px 20px;position: relative;height: 96px;box-sizing: border-box}
	.bind_phone{margin-left:18px}
	.bind_phone p:first-child{font-size:14px;color: #666}
	.bind_phone p:nth-child(2){font-size: 14px;color:#999}
	.btn{position: absolute;right: 20px}
	.certification{width: 269px;height: 500px}
	.certification img{margin-left: 58px;margin-top: 18px}
	.certification p{width: 196px;height: 36px;text-align: center;font-size: 14px;color:#666;line-height: 24px}
	.el-button--primary.is-plain{border-color: #FE9039;color:#FE9039}
	.el-button--primary.is-plain:hover{background: #FE9039;color:#fff}
	.line{display:inline-block;width: 1px;height:211px;background: #ddd;position: absolute;top:17px;left:266px}
	.next{margin-top: 79px;margin-left: 97px}
	.time_title{margin-top: 13px}
	.time_content{height: 210px;background: #D6F9FF;margin-top:30px;padding: 25px 20px;box-sizing: border-box}
	.time_content :first-child .circle{background: #FFAAB6;}
	.time_content :nth-child(2) .circle{background: #FCE36F;}
	.time_content :nth-child(3) .circle{background: #F1B380;}
	.time_content :nth-child(4) .circle{background: #50E0E0;}
	.time_content :nth-child(5) .circle{background: #D8E056;}
	.time_content :nth-child(6) .circle{background: #A1EF4B;}
	.time_content :nth-child(7) .circle{background: #FF626B;}
	.bubble{width: 14.28%;text-align: center;position: relative}
	.first, .ttime{font-size: 13px;color:#666;margin-top: 10px}
	.timeline{width: 100%;height: 1px;background: #B3B3B3;margin-top: 15px}
	.circle{width: 5px;height: 5px;border-radius: 50%;background: #ccc;position: absolute;top:118px;margin-left: 50%;margin-right: -2px}
	.ttime{margin-top: 15px}
	.my_dynamic .title{margin-top: 30px;margin-bottom: 30px;}
	.my_dynamic .content{height: 249px;border:1px solid #ddd;padding: 20px 20px;box-sizing: border-box;font-size: 14px;color: #666;}
	.my_dynamic .content .inner{margin-bottom:22px;}
	.codeBtn{margin-left: 10px}
	.lnu_container {display: block;margin: 10px auto;width: 320px; height: auto;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-pack: justify;-ms-flex-pack: justify;justify-content: space-between}
	.lnu_container p {width: 100px;height: 10px;border-radius: 2px;color: rgba(71, 87, 98, 0.8);background: -webkit-linear-gradient(left, #ffac52 50%, #fff 50%);background: linear-gradient(to right, #ffac52 50%, #fff 50%);background-size: 201% 100%;background-position: right;-webkit-transition: background .3s;transition: background .3s}
	.lovercase_valid,
	.number_valid,
	.uppercase_valid {
  		background-position: left !important;
  		color: rgba(255, 255, 255, 0.9) !important;
	}
	

  .ceshi_wap{position: fixed;left: 0;right: 0;top: 0;bottom: 0;background: rgba(0,0,0,.4);z-index: 1000}
  .center_con_wap{position: absolute;left: 50%;top: 50%;width: 830px;height: 590px;margin-left: -415px;margin-top: -295px;background: url('./img/ceshi_bg.png') no-repeat;background-size: cover;border-radius: 10px;overflow: hidden;}
  .center_con_wap .tit{float:left;font-size:20px;font-weight:bold;color:#fefefe;margin-left:20px;margin-top:20px}
  .center_con_wap .close{float:right;color:#fefefe;font-size:20px;margin-right:20px;margin-top:20px;cursor: pointer;}

  .center_con_wap .tit2{text-align: center;color: #fefefe;font-size: 14px;cursor: pointer;}
  .center_con_wap .tit3{text-align: center;color: #fefefe;font-size: 14px;cursor: pointer;}
  .center_con_wap .con{width:320px;height:320px;background: url('./img/ceshi_bg2.png') no-repeat;background-size: cover;margin:80px auto 0px;animation: ceshianimat 6s linear infinite;padding: 20px}
  .center_con_wap .circle_0{border:20px solid #0dcaff;border-radius: 100%;width: 280px;height: 280px;position: absolute;left: 255px;top: 100px;overflow: hidden;}
  .center_con_wap .circle_0 img{width: 100%;height: 100%;border-radius: 100%}
  .center_con_wap .circle_0 .tiao{width: 600px;position: absolute;height: 15px;background: linear-gradient(to bottom, #24ecf0 , rgba(0,199,255,.1));left: -150px;bottom: 0px;animation: ceshianimat2 3s linear infinite}
  @keyframes ceshianimat {
    0% {transform: rotate(0deg);}
    /*45%{transform: rotate(180deg);}*/
    50% {transform: rotate(180deg);}
    100% {transform: rotate(360deg);}
  }

  @keyframes ceshianimat2 {
    0% {transform: translate(0px,0px)}
    50% {transform: translate(0px,-150px)}
    100% {transform: translate(0px,-300px)}
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
<style>
	.head_img .el-upload--picture-card{width: 115px;height: 115px;border-radius: 50%}
	.up .el-form-item__label{line-height: 20px}
  	.step2 .el-form-item__label, .step2 .el-form-item__label{color: #333;text-align: left}
  	.head_img .el-upload-list--picture-card .el-upload-list__item{width: 115px;height: 115px;border-radius:50%;overflow: hidden}
  	/* .step2 .el-row{height: 148px;overflow: hidden}  */
  	/* .step2 .el-upload-list--picture-card .el-upload-list__item{width: 151px} */
	.btns .btn{position: absolute;left:114px;margin-top:34px !important;}
	.btns .el-form-item__error{position: absolute;left:114px;}
	.xxcode .el-form-item__label{padding-left: 9px;}
</style>