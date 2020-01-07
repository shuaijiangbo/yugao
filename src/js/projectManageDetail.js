//在pathmap.json 里面配置了commons.css的alias别名 commonCss
var $ = require("jquery");
window.jQuery = require("jquery");

var echarts = require("echarts");
require("@/js/lib/jquery.mCustomScrollbar");  //滚动条
require("@/css/lib/jquery.mCustomScrollbar.css");  //滚动条
import URL from '@/api/serviceAPI.config.js'
/*require("@/js/lib/velocity");  //*/


require('velocity-animate');
require("@/js/lib/shutter");  //

import  '@/css/lib/shutter.css'//轮播
require('../css/projectManageDetail.scss');

//生成数据
var projectManageDetail=function(){
    this.baseOption={
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:'2%',
            containLabel: true
        },

        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLine: {                   //---坐标轴 轴线
                    lineStyle: {
                        color: '#152c3e',
                        width: 1,
                        type: 'solid',
                    }
                },
                axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                    rotate:0,                   //---旋转角度
                    color:'#fff',              //---默认取轴线的颜色
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine:{
                    show:false
                },
                axisLine: {                   //---坐标轴 轴线
                    lineStyle: {
                        color: '#152c3e',
                        width: 1,
                        type: 'solid',
                    }
                },
                axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                    rotate:0,                   //---旋转角度
                    color:'#5392be',              //---默认取轴线的颜色
                }
            }
        ],

    }
}

projectManageDetail.prototype={
      // 每月安全数据
    buildMonthSafeLineData:function(){
          var app={};
          app.xData=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
          app.yData1=[0.4,0.3,0.7,0.8,0.2,0.9,0.5,0.7,0.2,0.1,0.4,1];
          app.yData2=[0.6,0.3,0.8,0.4,0.2,0.1,0.9,0.4,0.8,0.3,0.9,0.3];
          let option={
                color:['#0c7b99','#47dd8a'],
                legend: {
                      data:[
                            {name:'安全问题优先级别',textStyle:{color:'#47dd8a'}},
                            {name:'安全问题类别',textStyle:{color:'#0c7b99'}}
                      ],
                },
                tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                            type: 'cross',
                            label: {
                                  backgroundColor: '#283b56'
                            }
                      }
                },
                xAxis: [
                      {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {                   //---坐标轴 轴线
                                  lineStyle: {
                                        color: '#152c3e',
                                        width: 1,
                                        type: 'solid',
                                  }
                            },
                            axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                                  rotate:0,                   //---旋转角度
                                  color:'#8dc5d5',              //---默认取轴线的颜色
                            },
                            data: (function(){
                                  var res=[];
                                  var len=6;
                                  while(len--){
                                        res.unshift(app.xData[len]);
                                  }
                                  return res;
                            })()
                      },
                      {
                            type: 'category',
                            show:false,
                            boundaryGap: false,
                            data: (function (){
                                  var res = [];
                                  var len = 6;
                                  while (len--) {
                                        res.push(10 - len - 1);
                                  }
                                  return res;
                            })()
                      }
                ],
                yAxis: [
                      {
                            type: 'value',
                            scale: true,
                            max: 1,
                            min: 0,
                            boundaryGap: false,
                            splitLine:{
                                  show:true,
                                  lineStyle:{
                                        color:'rgba(101,190,231,.2)'
                                  }
                            },
                            axisLine: {                   //---坐标轴 轴线
                                  lineStyle: {
                                        color: '#152c3e',
                                        width: 1,
                                        type: 'solid',
                                  }
                            },
                            axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                                  rotate:0,                   //---旋转角度
                                  color:'#8dc5d5',              //---默认取轴线的颜色
                            }
                      },
                      {
                            type: 'value',
                            show:false,
                            scale: true,
                            max: 1200,
                            min: 0,
                            boundaryGap: false,
                      }
                ],
                series: [
                      {
                            name:'安全问题类别',
                            type:'line',
                            smooth: true,
                            symbol:'none',
                            itemStyle: {
                                  normal: {
                                        lineStyle: {        // 系列级个性化折线样式
                                              width: 2,
                                              type: 'solid',
                                              color:"#47dd8a"
                                        }
                                  }
                            },
                            areaStyle: {normal: {
                                        color: 'rgba(71,221,138,.6)'
                                  }},
                            data:(function (){
                                  var res = [];
                                  var len = 6;
                                  while (len--) {
                                        res.unshift(app.yData1[len]);
                                  }
                                  return res;
                            })()
                      },
                      {
                            name:'安全问题优先级别',
                            type:'line',
                            smooth: true,
                            symbol:'none',
                            itemStyle: {
                                  normal: {
                                        lineStyle: {        // 系列级个性化折线样式
                                              width: 2,
                                              type: 'solid',
                                              color:"#0c7b99"
                                        }
                                  }
                            },
                            areaStyle: {normal: {
                                        color: 'rgba(12,123,161,.6)'
                                  }},
                            data:(function (){
                                  var res = [];
                                  var len = 6;
                                  while (len--) {
                                        res.unshift(app.yData2[len]);
                                  }
                                  return res;
                            })()
                      }
                ]
          }
          app.count = 6;
          let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
          // this.makeChart($('#monthlySafetyLine')[0],newOption)
          let myEchart=echarts.init($('#monthlySafetyLine')[0]);
          setInterval(function (){
                var i;
                if(app.count<12){
                      i=app.count++;
                }else{
                      app.count=0;
                      i=app.count++;
                }
                var data0 = option.series[0].data;
                var data1 = option.series[1].data;
                data0.shift();
                data0.push(app.yData1[i]);
                data1.shift();
                data1.push(app.yData2[i]);

                option.xAxis[0].data.shift();
                option.xAxis[0].data.push(app.xData[i]);
                option.xAxis[1].data.shift();
                option.xAxis[1].data.push(i);
                myEchart.setOption(newOption);
          }, 3000);
    },

    /**********每月安全数据1***********/
    buildPieData:function(){
        let option=option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                textStyle:{
                    fontFamily:'serif'
                },
                padding:[5,10,5,10],
            },
            legend: {
                orient: 'vertical',
                x: '65%',
                y:'10%',
                data:['卢文','广联达-王云蕾','徐勇','白皓文','祝明友','罗杨','郭彬翔'],
                textStyle:{
                    color:'rgba(255,255,255,.6)'
                }
            },
            series: [
                {
                    name:'安全问题责任人分布',
                    type:'pie',
                    radius: ['50%', '70%'],
                    center:['30%','45%'],
                    avoidLabelOverlap: false,
                    color:['#054baa','#e4a224','#0e99c0','#0cbd51','#07def2'],
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle:{
                        borderWidth:2, //设置border的宽度有多大
                        borderColor:'#000',
                    },
                    data:[{
                        name:'卢文',
                        value:'3'
                    },{
                        name:'广联达-王云蕾',
                        value:'1'
                    },{
                        name:'徐勇',
                        value:'3'
                    },{
                        name:'白皓文',
                        value:'4'
                    },{
                        name:'祝明友',
                        value:'1'
                    },{
                        name:'罗杨',
                        value:'6'
                    },{
                        name:'郭彬翔',
                        value:'1'
                    },]
                },
            ]
        };
        let newOption=Object.assign(option);
        this.makeChart($('#tenderingPieOne')[0],newOption);
        let _self=this;
        let _stepIndex=0
       setInterval(()=>{
            let myEchart=echarts.init($('#tenderingPieOne')[0]);
            _self.myEchart=myEchart;
            _self.myEchart.dispatchAction({
                type: 'showTip',
                seriesIndex:0,  // 显示第几个series
                name: newOption.series[0].data[_stepIndex].name // 显示第几个数据
            });
            // 取消之前高亮的图形
            _self.myEchart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: _stepIndex==0?4:_stepIndex-1
            });


            // 高亮当前图形
            _self.myEchart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: _stepIndex
            });
            _stepIndex=_stepIndex==4?0:++_stepIndex;
        },3000)
    },

    /**********每月安全数据2***********/
    buildPieData2:function(){
        let option={
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                textStyle:{
                    fontFamily:'serif'
                },
                padding:[5,10,5,10],
            },
            legend: {
                orient: 'vertical',
                x: '60%',
                y:'10%',
                data:['祝明友','罗杨','郭彬翔'],
                textStyle:{
                    color:'rgba(255,255,255,.6)'
                }
            },
            series: [{
                name:'质量问题责任人分布',
                type:'pie',
                radius: ['50%', '70%'],
                center:['30%','45%'],
                avoidLabelOverlap: false,
                color:['#054baa','#e4a224','#0e99c0','#0cbd51','#07def2'],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle:{
                    borderWidth:2, //设置border的宽度有多大
                    borderColor:'#000',
                },
                data:[{
                    name:'祝明友',
                    value:'3'
                },{
                    name:'罗杨',
                    value:'9'
                },{
                    name:'郭彬翔',
                    value:'4'
                }]
            }
            ]
        };
        let newOption=Object.assign(option);
        this.makeChart($('#tenderingPieTwo')[0],newOption);
        let _self=this;

        let _stepIndex=0
        setInterval(()=>{
            let myEchart=echarts.init($('#tenderingPieTwo')[0]);
            _self.myEchart=myEchart;
            _self.myEchart.dispatchAction({
                type: 'showTip',
                seriesIndex:0,  // 显示第几个series
                name: newOption.series[0].data[_stepIndex].name // 显示第几个数据
            });
            // 取消之前高亮的图形
            _self.myEchart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: _stepIndex==0?4:_stepIndex-1
            });


            // 高亮当前图形
            _self.myEchart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: _stepIndex
            });
            _stepIndex=_stepIndex==4?0:++_stepIndex;
        },3020)
    },
      //进度
    buildGanttData:function(){
          var app={};
          app.xData1=["施工准备完成", "船匣主体结构完成", "土方工程完成", "上游导航段完成", "开工"];
          app.xData2=["2016-1-1", "2016-2-20", "2016-3-30", "2016-4-12", "2016-5-1"];
            let option={
                  color: ['#52f390','#65c6e7'],

                  tooltip: {
                        trigger: 'item',
                        axisPointer:{
                              type:'none'
                        },
                        backgroundColor:'#00b7b8',
                        textStyle:{
                            color:'#fff'
                        },
                        formatter: function (params) {
                              var res='';
                              if(params.value>0){
                                    res=app.xData2[params.dataIndex]+'</br>'+app.xData1[params.dataIndex]+'-滞后'+params.value+'天'
                              }else if(params.value<0) {
                                    res = app.xData2[params.dataIndex] + '</br>' + app.xData1[params.dataIndex]+'-提前'+Math.abs(params.value)+'天'
                              }else{
                                    res = app.xData2[params.dataIndex] + '</br>' + app.xData1[params.dataIndex]
                              }
                              return res;
                        }
                  },
                  legend: {
                        data:[ {name:'计划节点',icon:'circle',textStyle:{color:'#65c6e7'}},{name:'实际节点',textStyle:{color:'#52f390'}}],
                        right:5,
                        top:0
                  },
                  xAxis: [
                        {
                              type: 'category',
                              axisTick: {
                                    alignWithLabel: false
                              },
                              axisLine: {
                                    onZero: false,
                                    lineStyle: {
                                          color: '#65c6e7'
                                    }
                              },
                              axisLabel: {                 //---坐标轴 标签(坐标轴刻度文字)
                                    rotate: 30,
                              },
                              data: app.xData1
                        },
                        {
                              type: 'category',
                              data: app.xData2,
                              show:false
                        }
                  ],
                  yAxis: [
                        {
                              type: 'value',
                              max:6,
                              min:-6,
                              axisLine: {
                                    onZero: false,
                                    lineStyle: {
                                          color: '#65c6e7'
                                    }
                              },
                              splitLine:{
                                    show:true,
                                    lineStyle:{
                                          color:'rgba(101,190,231,.2)'
                                    }
                              },
                        }
                  ],
                  series: [
                        {
                              name:'实际节点',
                              type:'scatter',
                              xAxisIndex: 1,
                              smooth: true,
                              data: [0, -2, 0, 0, 6]
                        },
                        {
                              name:'计划节点',
                              type:'line',
                              smooth: true,
                              data: [0,0,0,0,0]
                        }
                  ]};
            let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
            this.makeChart($('#ganttBox')[0],newOption)
      },
    /*环境数据监测*/
      buildEnviromentBarData:function(){
            let option={
                  color:['#2b80ff','#05ccf3'],
                  grid: {    //网格
                        left: '2%',
                        right: '4%',
                        top: '20%',
                        bottom: '0%',
                        containLabel: true,
                        show:false,                 //---是否显示直角坐标系网格
                  },
                  tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                              type : 'line',        // 默认为直线，可选为：'line' | 'shadow'
                              lineStyle:{
                                    color:'#2e4a71'
                              }
                        },
                        formatter: function (datas) {
                              var res = '<span style="font-size: 18px">'+datas[0].name +'</span>'+ '<br/>'
                              for (var i = 0, length = datas.length; i < length; i++) {
                                    res += datas[i].seriesName + '：'
                                          + datas[i].data + 'pg/m³<br/>'
                              }
                              return res
                        },
                        textStyle:{
                              fontFamily:'serif'
                        },
                        padding:[5,10,5,10],
                        backgroundColor:'rgba(39,135,221,.6)',
                  },
                  legend: {
                        orient: 'horizontal',
                        top: '0',
                        left:'right',
                        data:[{
                              name: 'PM2.5',
                              // 强制设置图形为圆。
                              icon: 'circle',
                              // 设置文本为红色
                              textStyle: {
                                    color: '#2b80ff'
                              }
                        },{
                              name: 'PM10',
                              // 强制设置图形为圆。
                              icon: 'circle',
                              // 设置文本为红色
                              textStyle: {
                                    color: '#05ccf3'
                              }
                        }],
                        textStyle: {
                              fontSize:'14'
                        }
                  },
                  yAxis : [
                        {
                              type : 'value',
                              splitLine:{
                                    show:false
                              },
                              min:20,
                              splitLine:{
                                    show:true,
                                    lineStyle:{
                                          color:'#1c353c',
                                          width: 1
                                    }
                              },
                              axisLine: {                   //---坐标轴 轴线
                                    lineStyle: {
                                          color: '#152c3e',
                                          width: 1,
                                          type: 'solid',
                                    }
                              },
                              axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                                    rotate:0,                   //---旋转角度
                                    color:'#5392be',              //---默认取轴线的颜色
                              }
                        }
                  ],
                  xAxis : [
                        {
                              data : ['7月1日', '7月2日', '7月3日', '7月4日', '7月5日', '7月6日'],
                              boundaryGap:false,
                              axisLine: {                   //---坐标轴 轴线
                                    lineStyle: {
                                          color: '#152c3e',
                                          width: 1,
                                          type: 'solid',
                                    }
                              },
                              axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                                    rotate:0,                   //---旋转角度
                                    color:'#5392be',              //---默认取轴线的颜色
                              }
                        }
                  ],
                  series : [
                        {
                              name:'PM2.5',
                              type:'line',
                              areaStyle: {
                                    normal: {
                                          color: new echarts.graphic.LinearGradient(
                                                0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                                [
                                                      {offset: 0, color: 'rgba(255,255,255,0)'},
                                                      {offset: 0.5, color: 'rgba(72,212,126,0.2'},
                                                      {offset: 1, color: 'rgba(72,212,126,0.6'}
                                                ]
                                          )
                                    }
                              },
                              data:[50, 72, 100, 234, 350, 130]
                        }, {
                              name:'PM10',
                              type:'line',
                              areaStyle: {
                                    normal: {
                                          color: new echarts.graphic.LinearGradient(
                                                0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                                [
                                                      {offset: 0, color: 'rgba(255,255,255,0)'},
                                                      {offset: 0.5, color: 'rgba(30,219,179,0.2)'},
                                                      {offset: 1, color: 'rgba(30,219,179,0.6)'}
                                                ]
                                          )
                                    }
                              },
                              data:[10, 52, 200, 334, 390, 330]
                        }
                  ]};
            let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
            this.makeChart($('#enviromentSuperviseBar')[0],newOption)

            let _self=this;
            let index=0;

          let getData={
              "data": [
                  {
                      "timestamp": 1566267003000,
                      "pm25Value": "51.0",
                      "noiseValue": "56.0",
                      "tempValue": "38.0",
                      "windSpeedValue": "0.4",
                      "pm10Value": "64.0"
                  },
                  {
                      "timestamp": 1566270603000,
                      "pm25Value": "46.0",
                      "noiseValue": "55.0",
                      "tempValue": "38.0",
                      "windSpeedValue": "1.9",
                      "pm10Value": "55.0"
                  },
                  {
                      "timestamp": 1566274203000,
                      "pm25Value": "50.0",
                      "noiseValue": "56.0",
                      "tempValue": "39.0",
                      "windSpeedValue": "2.1",
                      "pm10Value": "61.0"
                  },
                  {
                      "timestamp": 1566277803000,
                      "pm25Value": "47.0",
                      "noiseValue": "46.0",
                      "tempValue": "40.0",
                      "windSpeedValue": "1.8",
                      "pm10Value": "58.0"
                  },
                  {
                      "timestamp": 1566281403000,
                      "pm25Value": "47.0",
                      "noiseValue": "54.0",
                      "tempValue": "41.0",
                      "windSpeedValue": "0.9",
                      "pm10Value": "57.0"
                  },
                  {
                      "timestamp": 1566285003000,
                      "pm25Value": "45.0",
                      "noiseValue": "51.0",
                      "tempValue": "43.0",
                      "windSpeedValue": "0.1",
                      "pm10Value": "55.0"
                  },
                  {
                      "timestamp": 1566288603000,
                      "pm25Value": "42.0",
                      "noiseValue": "54.0",
                      "tempValue": "42.0",
                      "windSpeedValue": "1.3",
                      "pm10Value": "50.0"
                  },
                  {
                      "timestamp": 1566292203000,
                      "pm25Value": "42.0",
                      "noiseValue": "57.0",
                      "tempValue": "44.0",
                      "windSpeedValue": "1.0",
                      "pm10Value": "51.0"
                  },
                  {
                      "timestamp": 1566295804000,
                      "pm25Value": "41.0",
                      "noiseValue": "55.0",
                      "tempValue": "44.0",
                      "windSpeedValue": "0.4",
                      "pm10Value": "49.0"
                  },
                  {
                      "timestamp": 1566299403000,
                      "pm25Value": "45.0",
                      "noiseValue": "54.0",
                      "tempValue": "40.0",
                      "windSpeedValue": "0.4",
                      "pm10Value": "55.0"
                  },
                  {
                      "timestamp": 1566303004000,
                      "pm25Value": "65.0",
                      "noiseValue": "47.0",
                      "tempValue": "37.0",
                      "windSpeedValue": "0.5",
                      "pm10Value": "76.0"
                  },
                  {
                      "timestamp": 1566306604000,
                      "pm25Value": "120.0",
                      "noiseValue": "48.0",
                      "tempValue": "34.0",
                      "windSpeedValue": "0.4",
                      "pm10Value": "141.0"
                  },
                  {
                      "timestamp": 1566310203000,
                      "pm25Value": "72.0",
                      "noiseValue": "45.0",
                      "tempValue": "33.0",
                      "windSpeedValue": "0.4",
                      "pm10Value": "77.0"
                  },
                  {
                      "timestamp": 1566313803000,
                      "pm25Value": "69.0",
                      "noiseValue": "41.0",
                      "tempValue": "32.0",
                      "windSpeedValue": "0.8",
                      "pm10Value": "76.0"
                  },
                  {
                      "timestamp": 1566321003000,
                      "pm25Value": "63.0",
                      "noiseValue": "37.0",
                      "tempValue": "31.0",
                      "windSpeedValue": "0.2",
                      "pm10Value": "71.0"
                  },
                  {
                      "timestamp": 1566324603000,
                      "pm25Value": "57.0",
                      "noiseValue": "40.0",
                      "tempValue": "31.0",
                      "windSpeedValue": "0.1",
                      "pm10Value": "67.0"
                  },
                  {
                      "timestamp": 1566328203000,
                      "pm25Value": "56.0",
                      "noiseValue": "37.0",
                      "tempValue": "30.0",
                      "windSpeedValue": "0.1",
                      "pm10Value": "67.0"
                  },
                  {
                      "timestamp": 1566331803000,
                      "pm25Value": "56.0",
                      "noiseValue": "38.0",
                      "tempValue": "30.0",
                      "windSpeedValue": "0.1",
                      "pm10Value": "67.0"
                  },
                  {
                      "timestamp": 1566335403000,
                      "pm25Value": "58.0",
                      "noiseValue": "42.0",
                      "tempValue": "30.0",
                      "windSpeedValue": "0.1",
                      "pm10Value": "68.0"
                  },
                  {
                      "timestamp": 1566339003000,
                      "pm25Value": "61.0",
                      "noiseValue": "39.0",
                      "tempValue": "29.0",
                      "windSpeedValue": "0.1",
                      "pm10Value": "72.0"
                  },
                  {
                      "timestamp": 1566342603000,
                      "pm25Value": "57.0",
                      "noiseValue": "37.0",
                      "tempValue": "29.0",
                      "windSpeedValue": "0.1",
                      "pm10Value": "69.0"
                  },
                  {
                      "timestamp": 1566346203000,
                      "pm25Value": "60.0",
                      "noiseValue": "38.0",
                      "tempValue": "29.0",
                      "windSpeedValue": "0.2",
                      "pm10Value": "70.0"
                  },
                  {
                      "timestamp": 1566349803000,
                      "pm25Value": "63.0",
                      "noiseValue": "37.0",
                      "tempValue": "29.0",
                      "windSpeedValue": "0.1",
                      "pm10Value": "72.0"
                  }
              ],
              "message": "操作成功",
              "timestamp": 1566350958482,
              "status": 200
          }
          let data=getData.data;
          let backData=_self.separateData(data,'timestamp',['pm25Value','pm10Value']);
          let totalXAxisData=backData.xData;

          for(let i=0;i<totalXAxisData.length;i++){
              totalXAxisData[i]=_self.transformTime(totalXAxisData[i]).h+':00';
          }
          let totalData=backData.pm25Value;
          let totalData1=backData.pm10Value;
          setInterval(()=>{
              index=(totalXAxisData.length-1)>index?++index:0;
              let changeDataObj=_self.changeDataGroup(index,totalData,totalXAxisData,8);
              let changeDataObj1=_self.changeDataGroup(index,totalData1,totalXAxisData,8);
              newOption.series[0].data=changeDataObj.totalData;
              newOption.series[1].data=changeDataObj1.totalData;
              newOption.xAxis[0].data=changeDataObj.totalXAxisData;
              _self.makeChart($('#enviromentSuperviseBar')[0],newOption);

              setTimeout(function(){
                  _self.myEchart.dispatchAction({
                      type: 'showTip',
                      seriesIndex:0,  // 显示第几个series
                      dataIndex: 2 // 显示第几个数据
                  });
              })
          },5000)
            $.ajax({
                  url : URL.fetchEnv24Hours,
                  type : "POST",
                  data : {projectId:1600157859410611},
                  success : function(res) {
                        let data=res.data;
                        let backData=_self.separateData(data,'timestamp',['pm25Value','pm10Value']);
                        let totalXAxisData=backData.xData;

                        for(let i=0;i<totalXAxisData.length;i++){
                              totalXAxisData[i]=_self.transformTime(totalXAxisData[i]).h+':00';
                        }
                        let totalData=backData.pm25Value;
                        let totalData1=backData.pm10Value;
                        setInterval(()=>{
                              index=(totalXAxisData.length-1)>index?++index:0;
                              let changeDataObj=_self.changeDataGroup(index,totalData,totalXAxisData,8);
                              let changeDataObj1=_self.changeDataGroup(index,totalData1,totalXAxisData,8);
                              newOption.series[0].data=changeDataObj.totalData;
                              newOption.series[1].data=changeDataObj1.totalData;
                              newOption.xAxis[0].data=changeDataObj.totalXAxisData;
                              _self.makeChart($('#enviromentSuperviseBar')[0],newOption);

                              setTimeout(function(){
                                    _self.myEchart.dispatchAction({
                                          type: 'showTip',
                                          seriesIndex:0,  // 显示第几个series
                                          dataIndex: 2 // 显示第几个数据
                                    });
                              })
                        },5000)
                  },error:function(){
                  }
            })
      },
    /*质量数据监测*/
    buildQualityBLineData:function(){
        let option={
            color:['#2b80ff','#05ccf3'],
            grid: {    //网格
                left: '2%',
                right: '4%',
                top: '20%',
                bottom: '0%',
                containLabel: true,
                show:false,                 //---是否显示直角坐标系网格
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'line',        // 默认为直线，可选为：'line' | 'shadow'
                    lineStyle:{
                        color:'#2e4a71'
                    }
                },
                formatter: function (datas) {
                    var res = '<span style="font-size: 18px">'+datas[0].name +'</span>'+ '<br/>'
                    for (var i = 0, length = datas.length; i < length; i++) {
                        let unit=i==0?'dB':'℃'
                        res += datas[i].seriesName + '：'
                            + datas[i].data + unit +'<br/>'
                    }
                    return res
                },
                textStyle:{
                    fontFamily:'serif'
                },
                padding:[5,10,5,10],
                backgroundColor:'rgba(39,135,221,.6)',
            },
            legend: {
                orient: 'horizontal',
                top: '0',
                left:'right',
                data:[{
                    name: '噪音',
                    // 强制设置图形为圆。
                    icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none

                    itemWidth: 10,  // 设置宽度

                    itemHeight: 10, // 设置高度

                    // 设置文本为红色
                    textStyle: {
                        color: '#2b80ff'
                    }
                },{
                    name: '温度',
                    // 强制设置图形为圆。
                    icon: 'circle',
                    itemWidth: 20,  // 设置宽度

                    itemHeight: 50, // 设置高度
                    // 设置文本为红色
                    textStyle: {
                        color: '#05ccf3'
                    }
                }],
                textStyle: {
                    fontSize:'14'
                }
            },
            yAxis : [
                {
                    type : 'value',
                    splitLine:{
                        show:false
                    },
                    min:20,
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'#1c353c',
                            width: 1
                        }
                    },
                    axisLine: {                   //---坐标轴 轴线
                        lineStyle: {
                            color: '#152c3e',
                            width: 1,
                            type: 'solid',
                        }
                    },
                    axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                        rotate:0,                   //---旋转角度
                        color:'#5392be',              //---默认取轴线的颜色
                    }
                }
            ],
            xAxis : [
                {
                    data : ['7月1日', '7月2日', '7月3日', '7月4日', '7月5日', '7月6日'],
                    boundaryGap:false,
                    axisLine: {                   //---坐标轴 轴线
                        lineStyle: {
                            color: '#152c3e',
                            width: 1,
                            type: 'solid',
                        }
                    },
                    axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                        rotate:0,                   //---旋转角度
                        color:'#5392be',              //---默认取轴线的颜色
                    }
                }
            ],

            series : [
                {
                    name:'噪音',
                    type:'line',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                [
                                    {offset: 0, color: 'rgba(255,255,255,0)'},
                                    {offset: 0.5, color: 'rgba(72,212,126,0.2'},
                                    {offset: 1, color: 'rgba(72,212,126,0.6'}
                                ]
                            )
                        }
                    },
                    data:[50, 72, 100, 234, 350, 130]
                }, {
                    name:'温度',
                    type:'line',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                [
                                    {offset: 0, color: 'rgba(255,255,255,0)'},
                                    {offset: 0.5, color: 'rgba(30,219,179,0.2)'},
                                    {offset: 1, color: 'rgba(30,219,179,0.6)'}
                                ]
                            )
                        }
                    },
                    data:[10, 52, 200, 334, 390, 330]
                }
            ]};
        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
        this.makeChart($('#qualityBar')[0],newOption)

        let _self=this;
        let index=0;

        let getData={
            "data": [
                {
                    "timestamp": 1566267003000,
                    "pm25Value": "51.0",
                    "noiseValue": "56.0",
                    "tempValue": "38.0",
                    "windSpeedValue": "0.4",
                    "pm10Value": "64.0"
                },
                {
                    "timestamp": 1566270603000,
                    "pm25Value": "46.0",
                    "noiseValue": "55.0",
                    "tempValue": "38.0",
                    "windSpeedValue": "1.9",
                    "pm10Value": "55.0"
                },
                {
                    "timestamp": 1566274203000,
                    "pm25Value": "50.0",
                    "noiseValue": "56.0",
                    "tempValue": "39.0",
                    "windSpeedValue": "2.1",
                    "pm10Value": "61.0"
                },
                {
                    "timestamp": 1566277803000,
                    "pm25Value": "47.0",
                    "noiseValue": "46.0",
                    "tempValue": "40.0",
                    "windSpeedValue": "1.8",
                    "pm10Value": "58.0"
                },
                {
                    "timestamp": 1566281403000,
                    "pm25Value": "47.0",
                    "noiseValue": "54.0",
                    "tempValue": "41.0",
                    "windSpeedValue": "0.9",
                    "pm10Value": "57.0"
                },
                {
                    "timestamp": 1566285003000,
                    "pm25Value": "45.0",
                    "noiseValue": "51.0",
                    "tempValue": "43.0",
                    "windSpeedValue": "0.1",
                    "pm10Value": "55.0"
                },
                {
                    "timestamp": 1566288603000,
                    "pm25Value": "42.0",
                    "noiseValue": "54.0",
                    "tempValue": "42.0",
                    "windSpeedValue": "1.3",
                    "pm10Value": "50.0"
                },
                {
                    "timestamp": 1566292203000,
                    "pm25Value": "42.0",
                    "noiseValue": "57.0",
                    "tempValue": "44.0",
                    "windSpeedValue": "1.0",
                    "pm10Value": "51.0"
                },
                {
                    "timestamp": 1566295804000,
                    "pm25Value": "41.0",
                    "noiseValue": "55.0",
                    "tempValue": "44.0",
                    "windSpeedValue": "0.4",
                    "pm10Value": "49.0"
                },
                {
                    "timestamp": 1566299403000,
                    "pm25Value": "45.0",
                    "noiseValue": "54.0",
                    "tempValue": "40.0",
                    "windSpeedValue": "0.4",
                    "pm10Value": "55.0"
                },
                {
                    "timestamp": 1566303004000,
                    "pm25Value": "65.0",
                    "noiseValue": "47.0",
                    "tempValue": "37.0",
                    "windSpeedValue": "0.5",
                    "pm10Value": "76.0"
                },
                {
                    "timestamp": 1566306604000,
                    "pm25Value": "120.0",
                    "noiseValue": "48.0",
                    "tempValue": "34.0",
                    "windSpeedValue": "0.4",
                    "pm10Value": "141.0"
                },
                {
                    "timestamp": 1566310203000,
                    "pm25Value": "72.0",
                    "noiseValue": "45.0",
                    "tempValue": "33.0",
                    "windSpeedValue": "0.4",
                    "pm10Value": "77.0"
                },
                {
                    "timestamp": 1566313803000,
                    "pm25Value": "69.0",
                    "noiseValue": "41.0",
                    "tempValue": "32.0",
                    "windSpeedValue": "0.8",
                    "pm10Value": "76.0"
                },
                {
                    "timestamp": 1566321003000,
                    "pm25Value": "63.0",
                    "noiseValue": "37.0",
                    "tempValue": "31.0",
                    "windSpeedValue": "0.2",
                    "pm10Value": "71.0"
                },
                {
                    "timestamp": 1566324603000,
                    "pm25Value": "57.0",
                    "noiseValue": "40.0",
                    "tempValue": "31.0",
                    "windSpeedValue": "0.1",
                    "pm10Value": "67.0"
                },
                {
                    "timestamp": 1566328203000,
                    "pm25Value": "56.0",
                    "noiseValue": "37.0",
                    "tempValue": "30.0",
                    "windSpeedValue": "0.1",
                    "pm10Value": "67.0"
                },
                {
                    "timestamp": 1566331803000,
                    "pm25Value": "56.0",
                    "noiseValue": "38.0",
                    "tempValue": "30.0",
                    "windSpeedValue": "0.1",
                    "pm10Value": "67.0"
                },
                {
                    "timestamp": 1566335403000,
                    "pm25Value": "58.0",
                    "noiseValue": "42.0",
                    "tempValue": "30.0",
                    "windSpeedValue": "0.1",
                    "pm10Value": "68.0"
                },
                {
                    "timestamp": 1566339003000,
                    "pm25Value": "61.0",
                    "noiseValue": "39.0",
                    "tempValue": "29.0",
                    "windSpeedValue": "0.1",
                    "pm10Value": "72.0"
                },
                {
                    "timestamp": 1566342603000,
                    "pm25Value": "57.0",
                    "noiseValue": "37.0",
                    "tempValue": "29.0",
                    "windSpeedValue": "0.1",
                    "pm10Value": "69.0"
                },
                {
                    "timestamp": 1566346203000,
                    "pm25Value": "60.0",
                    "noiseValue": "38.0",
                    "tempValue": "29.0",
                    "windSpeedValue": "0.2",
                    "pm10Value": "70.0"
                },
                {
                    "timestamp": 1566349803000,
                    "pm25Value": "63.0",
                    "noiseValue": "37.0",
                    "tempValue": "29.0",
                    "windSpeedValue": "0.1",
                    "pm10Value": "72.0"
                }
            ],
            "message": "操作成功",
            "timestamp": 1566350958482,
            "status": 200
        }
        let data=getData.data;
        let backData=_self.separateData(data,'timestamp',['noiseValue','tempValue']);
        let totalXAxisData=backData.xData;

        for(let i=0;i<totalXAxisData.length;i++){
            totalXAxisData[i]=_self.transformTime(totalXAxisData[i]).h+':00';
        }
        let totalData=backData.noiseValue;
        let totalData1=backData.tempValue;

        setInterval(()=>{
            index=totalXAxisData.length-1>index?++index:0;
            let changeDataObj=_self.changeDataGroup(index,totalData,totalXAxisData,8);
            let changeDataObj1=_self.changeDataGroup(index,totalData1,totalXAxisData,8);
            newOption.series[0].data=changeDataObj.totalData;
            newOption.series[1].data=changeDataObj1.totalData;
            newOption.xAxis[0].data=changeDataObj.totalXAxisData;
            _self.makeChart($('#qualityBar')[0],newOption);

            setTimeout(function(){
                _self.myEchart.dispatchAction({
                    type: 'showTip',
                    seriesIndex:0,  // 显示第几个series
                    dataIndex: 2 // 显示第几个数据
                });
            })
        },5100)


//        $.ajax({
//            url : URL.fetchEnv24Hours,
//            type : "POST",
//            data : {projectId:1600157859410611},
//            success : function(res) {
//                let data=res.data;
//                let backData=_self.separateData(data,'timestamp',['noiseValue','tempValue']);
//                let totalXAxisData=backData.xData;
//
//                for(let i=0;i<totalXAxisData.length;i++){
//                    totalXAxisData[i]=_self.transformTime(totalXAxisData[i]).h+':00';
//                }
//                let totalData=backData.noiseValue;
//                let totalData1=backData.tempValue;
//
//                setInterval(()=>{
//                    index=totalXAxisData.length-1>index?++index:0;
//                    let changeDataObj=_self.changeDataGroup(index,totalData,totalXAxisData,8);
//                    let changeDataObj1=_self.changeDataGroup(index,totalData1,totalXAxisData,8);
//                    newOption.series[0].data=changeDataObj.totalData;
//                    newOption.series[1].data=changeDataObj1.totalData;
//                    newOption.xAxis[0].data=changeDataObj.totalXAxisData;
//                    _self.makeChart($('#qualityBar')[0],newOption);
//
//                    setTimeout(function(){
//                        _self.myEchart.dispatchAction({
//                            type: 'showTip',
//                            seriesIndex:0,  // 显示第几个series
//                            dataIndex: 2 // 显示第几个数据
//                        });
//                    })
//                },5100)
//            },error:function(){
//            }
//        })
    },
    /*劳务管理数据*/
    buildLabourDataPieData:function(){
        let option={
            color:['#0a8cfe','#53f391'],
            xAxis:[{
                show:false,
            }],
            yAxis:[{
                show:false,
            }],
            series: [
                {
                    name:'按部门概项目数统计',
                    type:'pie',
                    radius: ['55%', '80%'],
                    center : ['50%', '55%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            formatter: '{d}%',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine:{
                        show: true,
                        length:5,
                        length2:2,
                    },
                    data:[
                        {value:529, name:'当前工作人员'},
                        {value:33, name:'其他人员'},
                    ]
                }
            ]};
        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
        this.makeChart($('#labourDataPie')[0],newOption)
    },
    makeChart:function(element,option){
        let myEchart=echarts.init(element);
        this.myEchart=myEchart;
        myEchart.setOption(option);
    },
    changeDataGroup:function(index,totalData,totalXAxisData,showNum){
        let doubleTotalData=totalData.concat(totalData);
        let doubleTotalXAxisData=totalXAxisData.concat(totalXAxisData);
        let backObj={
            totalData:[],
            totalXAxisData:[]
        };
        for(var i=index;i<(index+showNum);i++){
            backObj.totalData.push(doubleTotalData[i]);
            backObj.totalXAxisData.push(doubleTotalXAxisData[i]);
        }
        return backObj
    },
    separateData:function(allData,xData,dataParamsObj){
        let backObj={
            xData:[],
        };
        let _self=this;
        for(let i=0;i<allData.length;i++){
            let item=allData[i];
            backObj.xData.push(item[xData]);
            for(let j=0;j<dataParamsObj.length;j++){
                if(i==0){
                    backObj[dataParamsObj[j]]=[];
                }
                backObj[dataParamsObj[j]].push(item[dataParamsObj[j]]);
            }
        }
        return backObj;
    },
    transformTime:function(timestamp){
            if (timestamp) {
                var time = new Date(timestamp);
                var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
                var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
                var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
                var h = time.getHours()>=10?time.getHours():'0'+time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
                var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
                var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
                return {
                    y:y,
                    M:M,
                    d:d,
                    h:h,
                    m:m,
                    s:s,
                }
            } else {
                return '';
            }
    },
    init:function(){
        //this.buildEnviromentBarData();

      /*  this.buildMonthSafeLineData();//每月安全数据*/
         /*this.buildGanttData();//进度*/

        //this.buildQualityBLineData();
    	
        $.post(URL.fetchEnv24Hours,{"projectId":1600157859410611},function(data){
        	if(data.status==200){
        		setTimeout(function(){
        			//var f=new fetchEnv24Hours(data.data);
        			//f.init();
        			//window.fetchEnv24Hours=f;
        			$.post("/api/fetchLabourInfo",{"projectId":1600157859410611},function(re){
        				if(re.status==200){
        					var d=JSON.parse(re.data);
        					if(d.data.sumRealNum){
        						$("#sumRealNum").text(d.data.sumRealNum);
        					}
        					if(d.data.sumTotalNum){
        						$("#sumTotalNum").text(d.data.sumTotalNum);
        					}
        				}
        			},"json");
        		},5000);
        	}
        },"json");
        
        this.buildLabourDataPieData();
        this.buildPieData();
        this.buildPieData2();
    }
    
}

$(function(){
    $('#searchResultBox1').mCustomScrollbar({
        scrollButtons:{
            /*enable:true*/
        }
    });
    $("#searchResultBox1").mCustomScrollbar("update");
    new projectManageDetail().init();
    $('.shutter').shutter({
        isAutoPlay: true, // 是否自动播放
        playInterval: 3000, // 自动播放时间
        curDisplay: 3, // 当前显示页
        fullPage: false // 是否全屏展示
    });
    $.ajax({
        url : URL.fetchPicComplete,
        type : "POST",
        data : {projectId:1600157859410611},
        success : function(res) {
            /*$('#shutterImgBox').empty();*/

            let data=JSON.parse(res.data).data;

            for(let i=0;i<data.length;i++){
                let _src=data[i];
                /*var _a='<a href="#" data-shutter-title="Iron Man"></a>'
                var _img=$('<img>').attr('src',_src);
                $('#shutterImgBox').append($(_a).append(_img));*/

                /*线上只需放出这个*/
                $('#shutterImgBox a').eq(i).find('img').attr('src',_src);
                console.log(_src);
            }
           },error:function(){
        }
    })
});

function fetchEnv24Hours(data){
	var self = this;
	this.data=data;
	this.index=0;
	this.reData=data;
	this.ub=false;
	this.qualityEcharts=echarts.init(document.getElementById("qualityBar"));
	this.enviromentSuperviseBarEcharts=echarts.init(document.getElementById("enviromentSuperviseBar"));
	//每小时后台推送一次环境数据
	this.onMessage=function(msg){
		// 收到消息
		var data=JSON.parse(msg.body);
		if(data.status==200){
			self.data=data.data;
		}
	};
	this.reLoad=function(){
		self.data=self.reData;
	};
	this.auto=function(){
		if(self.data.length!=0&&$("#projectPageDetail").is(":visible")){
			self.qualityEcharts.resize();
			self.enviromentSuperviseBarEcharts.resize();
			self.qualityBarOption.xAxis[0].data=[];
			self.qualityBarOption.series[0].data=[];
			self.qualityBarOption.series[1].data=[];
			
			self.enviromentSuperviseBarOption.xAxis[0].data=[];
			self.enviromentSuperviseBarOption.series[0].data=[];
			self.enviromentSuperviseBarOption.series[1].data=[];
			for(var i=0;i<self.index;i++){
				var date=self.transformTime(self.data[i].timestamp);
				self.qualityBarOption.xAxis[0].data.push(date.M+"-"+date.d+"\n"+date.h+":"+date.m);
				self.qualityBarOption.series[0].data.push(self.data[i].noiseValue);
				self.qualityBarOption.series[1].data.push(self.data[i].tempValue);
				
				self.enviromentSuperviseBarOption.xAxis[0].data.push(date.M+"-"+date.d+"\n"+date.h+":"+date.m);
				self.enviromentSuperviseBarOption.series[0].data.push(self.data[i].pm25Value);
				self.enviromentSuperviseBarOption.series[1].data.push(self.data[i].pm10Value);
			}
			self.qualityEcharts.setOption(self.qualityBarOption);
			self.enviromentSuperviseBarEcharts.setOption(self.enviromentSuperviseBarOption);
			if(self.index<self.data.length){
				self.index++;
			}else{
				self.index=10;
			}
		}
		setTimeout(self.auto,1000);
		if(!self.ub){
			websocket.subscribe("topic/fetchEnv24Hours",self.onMessage);
			self.ub=true;
		}
	}
	this.init=function(){
		if(websocket.isConnection){
			websocket.subscribe("topic/fetchEnv24Hours",self.onMessage);
			self.ub=true;
		}
		if(self.data.length<10){
			self.index=(self.data.length)-1;
		}else{
			self.index=10;
		}
		self.auto();
	};
    this.transformTime=function(timestamp){
        if (timestamp) {
            var time = new Date(timestamp);
            var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
            var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
            var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
            var h = time.getHours()>=10?time.getHours():'0'+time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
            var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
            var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
            return {
                y:y,
                M:M,
                d:d,
                h:h,
                m:m,
                s:s,
            }
        } else {
            return '';
        }
    };
	this.qualityBarOption={
	        color:['#2b80ff','#05ccf3'],
	        grid: {    //网格
	            left: '2%',
	            right: '4%',
	            top: '20%',
	            bottom: '0%',
	            containLabel: true,
	            show:false,                 //---是否显示直角坐标系网格
	        },
	        tooltip : {
	            trigger: 'axis',
	            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	                type : 'line',        // 默认为直线，可选为：'line' | 'shadow'
	                lineStyle:{
	                    color:'#2e4a71'
	                }
	            },
	            formatter: function (datas) {
	                var res = '<span style="font-size: 18px">'+datas[0].name +'</span>'+ '<br/>'
	                for (var i = 0, length = datas.length; i < length; i++) {
	                    let unit=i==0?'dB':'℃'
	                    res += datas[i].seriesName + '：'
	                        + datas[i].data + unit +'<br/>'
	                }
	                return res;
	            },
	            textStyle:{
	                fontFamily:'serif'
	            },
	            padding:[5,10,5,10],
	            backgroundColor:'rgba(39,135,221,.6)',
	        },
	        legend: {
	            orient: 'horizontal',
	            top: '0',
	            left:'right',
	            data:[{
	                name: '噪音',
	                // 强制设置图形为圆。
	                icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
	
	                itemWidth: 10,  // 设置宽度
	
	                itemHeight: 10, // 设置高度
	
	                // 设置文本为红色
	                textStyle: {
	                    color: '#2b80ff'
	                }
	            },{
	                name: '温度',
	                // 强制设置图形为圆。
	                icon: 'circle',
	                itemWidth: 20,  // 设置宽度
	
	                itemHeight: 50, // 设置高度
	                // 设置文本为红色
	                textStyle: {
	                    color: '#05ccf3'
	                }
	            }],
	            textStyle: {
	                fontSize:'14'
	            }
	        },
	        yAxis : [
	            {
	                type : 'value',
	                splitLine:{
	                    show:false
	                },
	                min:20,
	                splitLine:{
	                    show:true,
	                    lineStyle:{
	                        color:'#1c353c',
	                        width: 1
	                    }
	                },
	                axisLine: {                   //---坐标轴 轴线
	                    lineStyle: {
	                        color: '#152c3e',
	                        width: 1,
	                        type: 'solid',
	                    }
	                },
	                axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
	                    rotate:0,                   //---旋转角度
	                    color:'#5392be',              //---默认取轴线的颜色
	                }
	            }
	        ],
	        xAxis : [
	            {
	                data : [],
	                boundaryGap:false,
	                axisLine: {                   //---坐标轴 轴线
	                    lineStyle: {
	                        color: '#152c3e',
	                        width: 1,
	                        type: 'solid',
	                    }
	                },
	                axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
	                    rotate:0,                   //---旋转角度
	                    color:'#5392be',              //---默认取轴线的颜色
	                }
	            }
	        ],
	
	        series : [
	            {
	                name:'噪音',
	                type:'line',
	                areaStyle: {
	                    normal: {
	                        color: new echarts.graphic.LinearGradient(
	                            0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
	                            [
	                                {offset: 0, color: 'rgba(255,255,255,0)'},
	                                {offset: 0.5, color: 'rgba(72,212,126,0.2'},
	                                {offset: 1, color: 'rgba(72,212,126,0.6'}
	                            ]
	                        )
	                    }
	                },
	                data:[]
	            }, {
	                name:'温度',
	                type:'line',
	                areaStyle: {
	                    normal: {
	                        color: new echarts.graphic.LinearGradient(
	                            0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
	                            [
	                                {offset: 0, color: 'rgba(255,255,255,0)'},
	                                {offset: 0.5, color: 'rgba(30,219,179,0.2)'},
	                                {offset: 1, color: 'rgba(30,219,179,0.6)'}
	                            ]
	                        )
	                    }
	                },
	                data:[]
	            }
	        ]};
	this.enviromentSuperviseBarOption={
            color:['#2b80ff','#05ccf3'],
            grid: {    //网格
                  left: '2%',
                  right: '4%',
                  top: '20%',
                  bottom: '0%',
                  containLabel: true,
                  show:false,                 //---是否显示直角坐标系网格
            },
            tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'line',        // 默认为直线，可选为：'line' | 'shadow'
                        lineStyle:{
                              color:'#2e4a71'
                        }
                  },
                  formatter: function (datas) {
                        var res = '<span style="font-size: 18px">'+datas[0].name +'</span>'+ '<br/>'
                        for (var i = 0, length = datas.length; i < length; i++) {
                              res += datas[i].seriesName + '：'
                                    + datas[i].data + 'pg/m³<br/>'
                        }
                        return res
                  },
                  textStyle:{
                        fontFamily:'serif'
                  },
                  padding:[5,10,5,10],
                  backgroundColor:'rgba(39,135,221,.6)',
            },
            legend: {
                  orient: 'horizontal',
                  top: '0',
                  left:'right',
                  data:[{
                        name: 'PM2.5',
                        // 强制设置图形为圆。
                        icon: 'circle',
                        // 设置文本为红色
                        textStyle: {
                              color: '#2b80ff'
                        }
                  },{
                        name: 'PM10',
                        // 强制设置图形为圆。
                        icon: 'circle',
                        // 设置文本为红色
                        textStyle: {
                              color: '#05ccf3'
                        }
                  }],
                  textStyle: {
                        fontSize:'14'
                  }
            },
            yAxis : [
                  {
                        type : 'value',
                        splitLine:{
                              show:false
                        },
                        min:20,
                        splitLine:{
                              show:true,
                              lineStyle:{
                                    color:'#1c353c',
                                    width: 1
                              }
                        },
                        axisLine: {                   //---坐标轴 轴线
                              lineStyle: {
                                    color: '#152c3e',
                                    width: 1,
                                    type: 'solid',
                              }
                        },
                        axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                              rotate:0,                   //---旋转角度
                              color:'#5392be',              //---默认取轴线的颜色
                        }
                  }
            ],
            xAxis : [
                  {
                        data : [],
                        boundaryGap:false,
                        axisLine: {                   //---坐标轴 轴线
                              lineStyle: {
                                    color: '#152c3e',
                                    width: 1,
                                    type: 'solid',
                              }
                        },
                        axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                              rotate:0,                   //---旋转角度
                              color:'#5392be',              //---默认取轴线的颜色
                        }
                  }
            ],
            series : [
                  {
                        name:'PM2.5',
                        type:'line',
                        areaStyle: {
                              normal: {
                                    color: new echarts.graphic.LinearGradient(
                                          0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                          [
                                                {offset: 0, color: 'rgba(255,255,255,0)'},
                                                {offset: 0.5, color: 'rgba(72,212,126,0.2'},
                                                {offset: 1, color: 'rgba(72,212,126,0.6'}
                                          ]
                                    )
                              }
                        },
                        data:[]
                  }, {
                        name:'PM10',
                        type:'line',
                        areaStyle: {
                              normal: {
                                    color: new echarts.graphic.LinearGradient(
                                          0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                          [
                                                {offset: 0, color: 'rgba(255,255,255,0)'},
                                                {offset: 0.5, color: 'rgba(30,219,179,0.2)'},
                                                {offset: 1, color: 'rgba(30,219,179,0.6)'}
                                          ]
                                    )
                              }
                        },
                        data:[]
                  }
            ]};
	return this;
}
