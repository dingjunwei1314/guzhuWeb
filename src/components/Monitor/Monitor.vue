<template>
	 <div class="content">
		<div class="title">
			<div style="width:50%;float:left">
				<img src="./img/logo1_03.png" height="75" width="248" alt="" class="fl">
				<div class="orderToday ml">
					<div class="fl">今日成交订单量：</div>
					<div class="num" style="color:#00e9ff">
						<span style="margin-right:8px">{{today.split("")[0]}}</span>
						<span style="margin-right:8px">{{today.split("")[1]}}</span>
						<span style="margin-right:8px">{{today.split("")[2]}}</span>
						<span>{{today.split("")[3]}}</span>
					</div>
				</div>
			</div>
			<div style="width:50%;float:left">
				<div class="orderToday fl" style="width:80% ">
					<div class="fl">累计成交订单量：</div>
					<div class="num" style="color:#00e9ff">
						<span style="margin-right:5px">{{totaly.split("")[0]}}</span>
						<span style="margin-right:5px">{{totaly.split("")[1]}}</span>
						<span style="margin-right:5px">{{totaly.split("")[2]}}</span>
						<span  style="margin-right:8px">{{totaly.split("")[3]}}</span>
						<span style="margin-right:8px">{{totaly.split("")[4]}}</span>
						<span>{{totaly.split("")[5]}}</span>
					</div>
				</div>
				<div class="time fl">
					<p class="year">{{currentdate}}</p>
					<p class="timer">{{currenttime}}</p>
				</div>
			</div>
			
		</div>
		<div class="inner" >
			<div class="leftBar fl" style="width:22%;">
				<div class="stat bg">
					<div class="stat-title">云客统计</div>
					<div style="text-align:center">注册云客量：<span class="zcnum">2356</span></div>
					<div class="echartStat">
						<div class="progress hyprogress">
							<el-progress type="circle" :percentage="75"></el-progress>
							<p>活跃云客量：1767</p>
						</div>
						<div style="width:50%"></div>
					</div>
					<div class="echartStat">
						<div class="progress hyprogress" >
							<el-progress type="circle" :percentage="60"></el-progress>
							<p>在线云客量：1413</p>
						</div>
						<div style="width:50%"></div>
					</div>
				</div>
				<div class="stat bg">
					<div class="stat-title">项目订单统计</div>
					<div class="text text1">
						<el-row class="mb-10" >
							<el-col class="test" :span="10">中国移动项目</el-col>
							<el-col :span="14" ><el-progress :percentage="15" :stroke-width="14"></el-progress></el-col>
						</el-row>
						<el-row class="mb-10" >
							<el-col class="test" :span="10">ofo小黄车项目</el-col>
							<el-col :span="14"><el-progress :percentage="45" :stroke-width="14"></el-progress></el-col>
						</el-row>
						<el-row class="mb-10" >
							<el-col class="test" :span="10">百度外卖项目</el-col>
							<el-col :span="14"><el-progress :percentage="12" :stroke-width="14"></el-progress></el-col>
						</el-row>
						<el-row class="mb-10" >
							<el-col class="test" :span="10">乐视项目</el-col>
							<el-col :span="14"><el-progress :percentage="5" :stroke-width="14"></el-progress></el-col>
						</el-row>
						<el-row class="mb-10" >
							<el-col class="test" :span="10">融360项目</el-col>
							<el-col :span="14"><el-progress :percentage="18" :stroke-width="14"></el-progress></el-col>
						</el-row>
					</div>
				</div>
				<div class="stat bg" >
					<div class="stat-title">实时播报</div>
					<div id="colee">
						<div id="colee1" class="textbox">
						<p>武汉87272订单，问题<span class="wrong">未解决。</span></p>
						<p>成都ofo 87275订单，已退款<span class="right">已解决。</span></p>
						<p>移动通知、自2017.8.25，停止办理业务。</span></p>
						<p>百度外卖 87279订单，已退款<span class="right">已解决。</span></p>
						<p>山东87672订单，问题<span class="wrong">未解决。</span></p>
						<p>成都ofo 87275订单，已退款<span class="right">已解决。</span></p>
						<p>百度外卖 87279订单，已退款<span class="right">已解决。</span></p>
						<p>移动通知、自2017.8.20，停止办理业务。</span></p>
						<p>武汉87272订单，问题<span class="wrong">未解决。</span></p>
						<p>成都ofo 87266订单<span class="right">未解决。</span></p>
						<p>百度外卖 87252订单，已退款<span class="right">已解决。</span></p>
						<p>武汉85716订单，问题<span class="wrong">已解决。</span></p>
					</div>
					<div id="colee2"></div>
					</div>
					
				</div>
			</div>
			
			<div class="middleBar fl">
				<div id="map" style="height:100%">
					
				</div>
			</div>
			<div class="rightBar leftBar " style="width:20%;float:right">
				<div class="stat bg">
					<div class="stat-title">近一周成交量统计</div>
					<div id="chat_week" class="chartHeight">
            
         		 	</div>
				</div>
				<div class="stat bg">
					<div class="stat-title">时段成交量统计      </div>
					<div id="chat_time" class="chartHeight">
            
         		 	</div>
				</div>
				<div class="stat bg pd">
					<div class="stat-title">服务之星</div>
					<div style="" class="text_star">
						<div class="star">
							<img src="./img/touxiang_01.png" height="90" width="90" alt="">
							<p class="name">张丽娟</p>
							<p class="company">武汉 ofo小黄车</p>
						</div>
						<div class="star">
							<img src="./img/touxiang_02.png" height="90" width="90" alt="">
							<p class="name">刘涛</p>
							<p class="company">山东 百度外卖</p>
						</div>
						<div class="star">
							<img src="./img/touxiang_03.png" height="90" width="90" alt="">
							<p class="name">王喜燕</p>
							<p class="company">大连 中国移动</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	 </div>
</template>
<script>
	export default {
		name:'Monitor',
		components:{

		},
		data(){
			return{
				// 近一周成交量
				option:{
    				xAxis: {
    				    type: 'category',
    				    nameLocation:'start',
    				     splitLine:{  
    				        show:true,
    				        lineStyle:{
    				            color: ['#002B51'],                   
    				            type:'dashed'
    				        }
    				    },
    				    axisLabel: {        
                            show: true,
                            textStyle: {
                                color: '#029DDB',
                                fontSize:'12'
                            }
                        },
                        axisTick: {
       						show: false
    					},
                        axisLine:{
                        	lineStyle:{
                            color:'#029DDB',
                            width:1,//这里是为了突出显示加上的
                        	},
                        },
    				    data: ['8.21', '8.22', '8.23', '8.24', '8.25', '8.26', '8.27', '8.28', '8.29']
    				},
    				grid: {
    				    left: '20px',
    				    right: '20px',
    				    bottom: '1%',
    				    top:'10%',
    				    containLabel: true,
    				},
    				yAxis: {
    				    type: 'value',
    				    min: 0,
    				    max: 4000,
    				    interval:500,
    				    splitLine:{  
    				        show:false,
    				    },
    				    axisLabel: {        
                            show: true,
                            textStyle: {
                                color: '#029DDB',
                                fontSize:'12'
                            }
                        },
                        axisTick: {
        					show: false
    					},
                        axisLine:{
                        	lineStyle:{
                            color:'#029DDB',
                            width:1,//这里是为了突出显示加上的
                        	},
                        },
    				},
    				series: [
    				    {
    				        name: '3的指数',
    				        type: 'line',
    				        areaStyle: {
    				            normal: {
    				                color:{
    				                    type: 'linear',
    				                    x: 0,
    				                    y: 0,
    				                    x2: 0,
    				                    y2: 1,
    				                    colorStops: [{
    				                        offset: 0, color: 'rgba(225,30,118,1)' // 0% 处的颜色
    				                    }, {
    				                        offset: 1, color: 'rgba(225,30,118,0)' // 100% 处的颜色
    				                    }],
    				                },
    				                opacity:0.5                            
    				            }
    				        },
    				        data:[1500,3000, 2000, 2500, 2550, 3500, 2000, 2800,3355],
    				        symbol: "circle",  
    				        symbolSize : 8,
    				        itemStyle: {
    				            normal: {
    				                color: "#59DD4E",  // 会设置点和线的颜色，所以需要下面定制 line
    				                borderColor: "#009CD3"  // 点边线的颜色
    				            }
    				        },
    				        lineStyle: {
    				            normal: {
    				              color: "#59DD4E"   // 线条颜色
    				            },
    				        },
    				    },
    				]
				},
				//时段成交量
				option1:{
    				xAxis: {
    				    type: 'category',
    				    nameLocation:'start',
    				     splitLine:{  
    				        show:true,
    				        lineStyle:{
    				            color: ['#002B51'],                   
    				            type:'dashed'
    				        }
    				    },
    				    axisLabel: {        
                            show: true,
                            textStyle: {
                                color: '#029DDB',
                                fontSize:'12'
                            }
                        },
                        axisTick: {
       						show: false
    					},
                        axisLine:{
                        	lineStyle:{
                            color:'#029DDB',
                            width:1,//这里是为了突出显示加上的
                        	},
                        },
    				    data: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00','18:00','19:00']
    				},
    				grid: {
    				    left: '20px',
    				    right: '20px',
    				    bottom: '1%',
    				    top:'10%',
    				    containLabel: true,
    				},
    				yAxis: {
    				    type: 'value',
    				    min: 0,
    				    max: 1000,
    				    interval:250,
    				    splitLine:{  
    				        show:false,
    				    },
    				    axisLabel: {        
                            show: true,
                            textStyle: {
                                color: '#029DDB',
                                fontSize:'12'
                            }
                        },
                        axisTick: {
        					show: false
    					},
                        axisLine:{
                        	lineStyle:{
                            color:'#029DDB',
                            width:1,//这里是为了突出显示加上的
                        	},
                        },
    				},
    				series: [
    				    {
    				        name: '3的指数',
    				        type: 'line',
    				        areaStyle: {
    				            normal: {
    				                color:{
    				                    type: 'linear',
    				                    x: 0,
    				                    y: 0,
    				                    x2: 0,
    				                    y2: 1,
    				                    colorStops: [{
    				                        offset: 0, color: 'rgba(225,30,118,1)' // 0% 处的颜色
    				                    }, {
    				                        offset: 1, color: 'rgba(225,30,118,0)' // 100% 处的颜色
    				                    }],
    				                },
    				                opacity:0.5                            
    				            }
    				        },
    				        data:[300, 200, 600, 280, 420, 500, 200, 150, 220,360,125],
    				        symbol: "circle",  
    				        symbolSize : 8,
    				        itemStyle: {
    				            normal: {
    				                color: "#59DD4E",  // 会设置点和线的颜色，所以需要下面定制 line
    				                borderColor: "#009CD3"  // 点边线的颜色
    				            }
    				        },
    				        lineStyle: {
    				            normal: {
    				              color: "#59DD4E"   // 线条颜色
    				            },
    				        },
    				    },
    				]
				},
				//信息滚动
				currentdate:'',
				currenttime:'',
				today:'352',
				totaly:'88999'
			}
		},
		mounted(){
    		this.getEchart()
    		this.getMap()
    		//时间刷新
    		var _this=this
    		setInterval(function(){
    			_this.getDay()
    		},1000)
    		// 数字刷新
    		this.getNum()
    		this.getScroll()

  		},
  		
		methods:{
			//数字滚动
			getNum(){
				var _this=this;
				var today1=parseInt(this.today);
				var totaly1=parseInt(this.totaly)
				setInterval(function(){
					today1+=8;
					totaly1+=32;
					_this.totaly=totaly1+'';
					_this.today=today1+'';
				},3000)
			},
			//时间更新
			getDay(){
				 var date = new Date();
   				 var seperator1 = "年";
   				 var seperator3 = "月";
   				 var seperator4 = "日";
   				 var seperator2 = ": ";
   				 var month = date.getMonth() + 1;
   				 var strDate = date.getDate();
   				 var hours=date.getHours();
   				 var minutes=date.getMinutes();
   				 var seconds=date.getSeconds()
   				 if (month >= 1 && month <= 9) {
   				     month = "0" + month;
   				 }
   				 if (strDate >= 0 && strDate <= 9) {
   				     strDate = "0" + strDate;
   				 }
   				 if (hours >= 0 && hours <= 9) {
   				     hours = "0" + hours;
   				 }
				 if (minutes >= 0 && minutes <= 9) {
   				     minutes = "0" + minutes;
   				 }
   				 if (seconds >= 0 && seconds <= 9) {
   				     seconds = "0" + seconds;
   				 }
   				 this.currentdate= date.getFullYear() + seperator1 + month + seperator3  +strDate+  seperator4
   				 this.currenttime =  hours + seperator2 + minutes+ seperator2 +seconds;
			},
			//文字滚动
			getScroll(){
				var speed=80;
    			var colee2=document.getElementById("colee2");
    			var colee1=document.getElementById("colee1");
    			var colee=document.getElementById("colee");
    			colee2.innerHTML=colee1.innerHTML; //克隆colee1为colee2
    			colee.scrollTop=0;
    			function Marquee1(){
        			if (colee.scrollTop>=colee1.scrollHeight) {
        			//scrollTop属性既是scroll最上端和colee的距离,无缝滚动
 						 colee.scrollTop=0;
 					}else{
  						colee.scrollTop++;
 					} 
    			}
    			var MyMar1=setInterval(Marquee1,speed)//设置定时器
    			//鼠标移上时清除定时器达到滚动停止的目的
    			colee.onmouseover=function() {clearInterval(MyMar1)}
    			//鼠标移开时重设定时器
    			// colee.onmouseout=function(){MyMar1=setInterval(Marquee1,speed)}
			},
			getEchart(){
				this.$echarts.init(document.getElementById('chat_week')).setOption(this.option);
				this.$echarts.init(document.getElementById('chat_time')).setOption(this.option1);
			},
			getMap(data){
				var myChart=this.$echarts.init(document.getElementById('map'))
				var geoCoordMap = {
				    '上海': [121.4648,31.2891],
				    '东莞': [113.8953,22.901],
				    '东营': [118.7073,37.5513],
				    '中山': [113.4229,22.478],
				    '临汾': [111.4783,36.1615],
				    '临沂': [118.3118,35.2936],
				    '丹东': [124.541,40.4242],
				    '丽水': [119.5642,28.1854],
				    '乌鲁木齐': [87.9236,43.5883],
				    '佛山': [112.8955,23.1097],
				    '保定': [115.0488,39.0948],
				    '兰州': [103.5901,36.3043],
				    '包头': [110.3467,41.4899],
				    '北京': [116.4551,40.2539],
				    '北海': [109.314,21.6211],
				    '南京': [118.8062,31.9208],
				    '南宁': [108.479,23.1152],
				    '南昌': [116.0046,28.6633],
				    '南通': [121.1023,32.1625],
				    '厦门': [118.1689,24.6478],
				    '台州': [121.1353,28.6688],
				    '合肥': [117.29,32.0581],
				    '呼和浩特': [111.4124,40.4901],
				    '咸阳': [108.4131,34.8706],
				    '哈尔滨': [127.9688,45.368],
				    '唐山': [118.4766,39.6826],
				    '嘉兴': [120.9155,30.6354],
				    '大同': [113.7854,39.8035],
				    '大连': [122.2229,39.4409],
				    '天津': [117.4219,39.4189],
				    '太原': [112.3352,37.9413],
				    '威海': [121.9482,37.1393],
				    '宁波': [121.5967,29.6466],
				    '宝鸡': [107.1826,34.3433],
				    '宿迁': [118.5535,33.7775],
				    '常州': [119.4543,31.5582],
				    '广州': [113.5107,23.2196],
				    '廊坊': [116.521,39.0509],
				    '延安': [109.1052,36.4252],
				    '张家口': [115.1477,40.8527],
				    '徐州': [117.5208,34.3268],
				    '德州': [116.6858,37.2107],
				    '惠州': [114.6204,23.1647],
				    '成都': [103.9526,30.7617],
				    '扬州': [119.4653,32.8162],
				    '承德': [117.5757,41.4075],
				    '拉萨': [91.1865,30.1465],
				    '无锡': [120.3442,31.5527],
				    '日照': [119.2786,35.5023],
				    '昆明': [102.9199,25.4663],
				    '杭州': [119.5313,29.8773],
				    '枣庄': [117.323,34.8926],
				    '柳州': [109.3799,24.9774],
				    '株洲': [113.5327,27.0319],
				    '武汉': [114.3896,30.6628],
				    '汕头': [117.1692,23.3405],
				    '江门': [112.6318,22.1484],
				    '沈阳': [123.1238,42.1216],
				    '沧州': [116.8286,38.2104],
				    '河源': [114.917,23.9722],
				    '泉州': [118.3228,25.1147],
				    '泰安': [117.0264,36.0516],
				    '泰州': [120.0586,32.5525],
				    '济南': [117.1582,36.8701],
				    '济宁': [116.8286,35.3375],
				    '海口': [110.3893,19.8516],
				    '淄博': [118.0371,36.6064],
				    '淮安': [118.927,33.4039],
				    '深圳': [114.5435,22.5439],
				    '清远': [112.9175,24.3292],
				    '温州': [120.498,27.8119],
				    '渭南': [109.7864,35.0299],
				    '湖州': [119.8608,30.7782],
				    '湘潭': [112.5439,27.7075],
				    '滨州': [117.8174,37.4963],
				    '潍坊': [119.0918,36.524],
				    '烟台': [120.7397,37.5128],
				    '玉溪': [101.9312,23.8898],
				    '珠海': [113.7305,22.1155],
				    '盐城': [120.2234,33.5577],
				    '盘锦': [121.9482,41.0449],
				    '石家庄': [114.4995,38.1006],
				    '福州': [119.4543,25.9222],
				    '秦皇岛': [119.2126,40.0232],
				    '绍兴': [120.564,29.7565],
				    '聊城': [115.9167,36.4032],
				    '肇庆': [112.1265,23.5822],
				    '舟山': [122.2559,30.2234],
				    '苏州': [120.6519,31.3989],
				    '莱芜': [117.6526,36.2714],
				    '菏泽': [115.6201,35.2057],
				    '营口': [122.4316,40.4297],
				    '葫芦岛': [120.1575,40.578],
				    '衡水': [115.8838,37.7161],
				    '衢州': [118.6853,28.8666],
				    '西宁': [101.4038,36.8207],
				    '西安': [109.1162,34.2004],
				    '贵阳': [106.6992,26.7682],
				    '连云港': [119.1248,34.552],
				    '邢台': [114.8071,37.2821],
				    '邯郸': [114.4775,36.535],
				    '郑州': [113.4668,34.6234],
				    '鄂尔多斯': [108.9734,39.2487],
				    '重庆': [107.7539,30.1904],
				    '金华': [120.0037,29.1028],
				    '铜川': [109.0393,35.1947],
				    '银川': [106.3586,38.1775],
				    '镇江': [119.4763,31.9702],
				    '长春': [125.8154,44.2584],
				    '长沙': [113.0823,28.2568],
				    '长治': [112.8625,36.4746],
				    '阳泉': [113.4778,38.0951],
				    '青岛': [120.4651,36.3373],
				    '韶关': [113.7964,24.7028],
                    '辽阳': [123.1212,41.1628]
				};
				
				var BJData = [
				    [{name:'北京'}, {name:'淄博',value:186}],
				    [{name:'北京'}, {name:'大连',value:129}],
				    [{name:'北京'}, {name:'哈尔滨',value:256}],
				    [{name:'北京'}, {name:'成都',value:203}],
				    [{name:'北京'}, {name:'合肥',value:351}],
				    [{name:'北京'}, {name:'武汉',value:332}],
				    [{name:'北京'}, {name:'长沙',value:289}],
				    [{name:'北京'}, {name:'杭州',value:407}],
				    [{name:'北京'}, {name:'辽阳',value:203}]
				];
				
				
				var color = ['#FB5F33'];
				var series = []
    			var convertData = function (data) {
  					var res = [];
  					for (var i = 0; i < data.length; i++) {
  					    var dataItem = data[i];
  					    var fromCoord = geoCoordMap[dataItem[0].name];
  					    var toCoord = geoCoordMap[dataItem[1].name];
  					    if (fromCoord && toCoord) {
  					        res.push([{
  					            coord: fromCoord
  					        }, {
  					            coord: toCoord
  					        }]);
  					    }
  					}
  					return res;
				};
				
				[['高热度', BJData]].forEach(function (item, i) {
    				series.push({
    				    name: item[0],
    				    type: 'lines',
    				    zlevel: 1,
    				    lineStyle: {
            				normal: {
                				color: color[i],
                				width: 0,
                				curveness: 0.2
            				}
        			},
    				    data: convertData(item[1])
    				},
    				{
    				    name: item[0],
    				    type: 'map',
    				    zlevel: 2,
    				    data: convertData(item[1])
    				},
    				{
    				    name: item[0],
    				    type: 'effectScatter',
    				    coordinateSystem: 'geo',
    				    zlevel: 2,
    				    BJData:[],
    				    symbolSize:function(value){
    				  		var v=value[2]
    				   		return 10+v/40
    				   	},
    				   	effect: {
                           	show: true,
                           	shadowBlur: 0
                        },
                        rippleEffect:{
                        	scale:4,
                        	// brushType:'stroke'
                        },

                        itemStyle:{
                    		normal:{
                    		    label:{show:false}
                    		},
                    		emphasis: {
                    		    label:{position:'top'}
                    		}
                		},
    				    label: {
    				        normal: {
    				            show: true,
    				            position: 'left',
    				            distance:24,
    				            formatter: '{b}',
    				            
    				            offset:[0,4],
    				            fontSize:48,

    				        }
    				    },
    				    itemStyle: {
    				        normal: {
    				            color: color[i]
    				        }
    				    },
    				    data: item[1].map(function (dataItem) {
    				        return {
    				            name: [dataItem[1].name,dataItem[1].value],
    				            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),

    				            
    				        }
    				    })
    				})
				})
				myChart.setOption( {
					 title : {
        			text: '云 客 人 员 分 布 图',
        			x:'center',
        			y:'20px',
        			textStyle : {
        			    color: '#029DDB',
        			    fontSize:'24'
        			}
    				},
    				tooltip : {
    				    trigger: 'item',
    				   
    				},
    				geo: {

    				    map: 'china',
    				    label: {
    				        emphasis: {
    				            show: false
    				        }
    				    },
    				    roam: true,
    				    itemStyle: {
    				        normal: {
    				            borderColor: '#00FFFF',
    				            color: {
    				                type: 'linear',
    				                x: 0,
    				                y: 0,
    				                x2: 0,
    				                y2: 1,
    				                colorStops: [{
    				                    offset: 1, color: 'rgba(9,45,82,1)' // 100% 处的颜色
    				                }, {
    				                    offset: 0, color: 'rgba(2,29,64,1)' // 0% 处的颜色
    				                }],
    				                
    				            }
    				            
    				        },
    				        emphasis: {
    				            color: {
    				                type: 'linear',
    				                x: 0,
    				                y: 0,
    				                x2: 0,
    				                y2: 1,
    				                colorStops: [{
    				                    offset: 0, color: 'rgba(9,45,82,1)' // 100% 处的颜色
    				                }, {
    				                    offset: 1, color: 'rgba(2,29,64,1)' // 0% 处的颜色
    				                }],
    				                
    				            }
    				        }
    				    }
    				},
    				series: series
				})
			},
		}
	}
</script>
<style scoped>
    .fl{float: left}
	.content{background:url('./img/background.png');background-size:100% 100%;height: 100%;position: relative;display: flex;flex-direction: column;padding:30px 55px}
	.title{padding-top: 30px;border:1px solid #0a4466;height: 100px;border-radius:10px;padding-left: 30px}
	/* .logo{height: 78px;background: url('./img/logo1_03.png') no-repeat left center;box-sizing: border-box;} */
	/* .orderToday{flex: 2;} */
	.orderToday {font-size: 34px;color:#029ddb;height: 78px;line-height: 78px;margin-left: -82px}
	.orderToday .num span{display:inline-block;width: 55px;color:#00e9ff;text-align: center;border-radius:5px;box-shadow: 0px 0px 30px #04406b;font-size: 56px}
	.time{width: 180px;color:#029ddb;margin-left: 50px}
	.year{font-size: 22px;}
	.timer{font-size: 37px}
	.inner{margin-top:27px;}
	.bg{width:370px;height:250px;background: url('./img/small_bg_03.png') no-repeat;background-size: 370px 250px; color:#029ddb;}
	.stat{margin-bottom:18px;}
	.zcnum{font-size:32px;color:#5DDE0F;font-weight:500}
	.stat-title{font-size:24px;font-weight: bold;padding:15px 25px}
	.echartStat{width: 292px;margin:0 auto;margin-top:23px;}
	.wrong{color:#E4007F;}
	.right{color:#5DDE0F;}
	.text{padding-left:26px;margin-top:5px }
	.mb-10{margin-bottom: 10px;}
	.hyprogress{width:50%;float:left;text-align:center}
	#colee{padding-left:26px;margin-top:5px;line-height:25px;height:154px;overflow:hidden}
	.middleBar{width: 55%;height: 786px;margin-left:15px;background: url('./img/map_03.png') no-repeat;background-size:100% 786px;margin-right: 38px}
	.text_star{padding:0 26px;margin-top:5px;text-align:center}
	.star{width:33%;float:left}
	.name{margin-top:12px;margin-bottom:5px}
	.star img{width:90px;height: 90px;border-radius: 50%;border:2px solid #029ddb;}
	.chartHeight{height:176px}
	.stat{ cursor:pointer;transition: all 0.6s; }
	.company{font-size: 14px}
	/* .ml{margin-left:300px;} */
	.stat:hover{transform: scale(1.1)}
	@media(max-width: 1900px) {
		.title{height: 100px;padding-top:30px;box-sizing: border-box}
		.title img{height: 45px}
		.bg{width: 260px;height: 155px;background-size: 260px 150px;}
		.stat-title{font-size: 16px}
		.ml{margin-left: 0;}
		.orderToday{font-size: 24px;height:40px;line-height:40px;}
		.orderToday .num span{width:30px;font-size: 28px;margin-right:5px!important;}
		.time{margin-left: -15px}
		.year{font-size: 18px;}
		.timer{font-size: 25px}
		.zcnum{font-size: 18px}
		.echartStat{width: 212px;margin-top: 5px}
		.hyprogress p{font-size: 12px}
		.mb-10{margin-bottom: 4px;}
		#colee{padding-left:18px;margin-top:5px;line-height:20px;height:80px;overflow:hidden}
		#colee1 p{font-size: 14px}
		.middleBar{width: 55%;height: 500px;margin-left:10px;background-size:100% 500px;margin-right: 10px}
		.star img{width: 45px;height: 45px;margin-top: -16px}
		.name{margin-top:2px;margin-bottom:2px;font-size: 13px}
		.company{font-size: 12px}
		.test{font-size: 12px}
		.text1{margin-top: -8px}
		.chartHeight{height: 100px;margin-top:-10px;}
	}
</style>
<style>
	.echartStat .el-progress-circle{width: 81px !important;height: 81px !important;}
	.echartStat .el-progress__text{color:#3DA6F6}
	.text .el-progress__text{color:#3DA6F6;font-size:14px!important}
	.text1 .el-progress-bar__outer{background-color:#029DDB;box-shadow: 0px 0px 18px #029DDB!important;}
	.text1 .el-progress-bar__inner{background-color:#5DDE0F;}

	@media(max-width:1900px){
		.echartStat .el-progress-circle{width: 40px !important;height: 40px !important;}
		.text1 .el-progress-bar__outer{height:6px !important}
		.text .el-progress__text{font-size:12px!important}
		.hyprogress .el-progress__text{font-size: 12px!important}
	}
</style>