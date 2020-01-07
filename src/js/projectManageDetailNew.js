//在pathmap.json 里面配置了commons.css的alias别名 commonCss
var $ = require("jquery");
/*window.jQuery = require("jquery");*/

var echarts = require("echarts");
require("@/js/lib/jquery.mCustomScrollbar");  //滚动条
require("@/css/lib/jquery.mCustomScrollbar.css");  //滚动条
import URL from '@/api/serviceAPI.config.js'
/*require("@/js/lib/velocity");  //*/


/*require('velocity-animate');
require("@/js/lib/shutter");  //

import  '@/css/lib/shutter.css'//轮播*/
require('../css/projectManageDetailNew.scss');

//生成数据
var ProjectManageDetailNew=function(){
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

ProjectManageDetailNew.prototype={
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
/*
$.ajax({
           url : URL.fetchEnv24Hours,
           type : "POST",
           data : {projectId:1600157859410611},
           success : function(res) {
               let data=res.data;
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
           },error:function(){
           }
       })*/
    },
    /*劳务管理数据*/
    buildLabourDataPieData:function(numTotal,numNow){
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
                        {value:numTotal, name:'当前工作人员'},
                        {value:numNow, name:'其他人员'},
                    ]
                }
            ]};
        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
        this.makeChart($('#labourDataPieNew')[0],newOption)
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
                    var f=new fetchEnv24Hours(data.data);
                    f.init();
                    window.fetchEnv24Hours=f;
                },5000);
            }
        },"json");
    	this.buildLabourDataPieData(100,10);
    /*    window.leftOne('bebcdae768a3422fab26b6b469774939');*/
    }
}

$(function(){
    var intervalTimer1=null;
    var intervalTimer2=null;

/*    var projData=[
        {
            "id": 406,
            "mingcheng": "学堂路延伸段道路及配套工程",
            "touzi": "14931万元",
            "kaigong": "2018.07",
            "jungong": "2020.09",
            "xingzhi": "续建",
            "yezhu": "两江新区土地储备整治中心",
            "guimo": "长1017米，宽28米道路及配套工程"
        },
        {
            "id": 451,
            "mingcheng": "渝高星洲",
            "touzi": "138000万元",
            "kaigong": "2019.03",
            "jungong": "2021.06",
            "xingzhi": "新开工",
            "yezhu": "重庆渝高明嘉房地产开发有限公司",
            "guimo": "地上总建筑规模34.57万㎡，一二、三、期住宅总面积约21.6万㎡"
        }
    ];*/

    window.leftOne=function(projectId) {
        $.ajax({
            url : URL.projectInfo,
            type : "GET",
            data : {projectId:projectId},
            success : function(res) {
                clearInterval(intervalTimer1);
                clearInterval(intervalTimer2);

                let {person,crane,lifter,project,countFieldMan,countAttendance}=res;

                $('#lawuTime').text('数据更新时间：'+res.time);

                // 根据项目id读取配置文件的信息

                $('#mingcheng').text(project.projectName==null?'无':project.projectName);
                $('#xingzhi').text(project.nature==null?'无':project.nature);
                $('#yezhu').text(project.user==null?'无':project.user);
                $('#guimo').text(project.describes==null?'无':project.describes);
                $('#touzi').text(project.amount==null?'无':project.amount);
                $('#kaigong').text(project.startTime==null?'无':project.startTime.split(' ')[0]);
                $('#jungong').text(project.endTime==null?'无':project.endTime.split(' ')[0]);

                let pop={
                    stepPerson:0,
                    stepCrane:0,
                    stepWorker:0,
                }

                if(window.fetchEnv24Hours){
                    var data=[];
                    for(var obj of res.environment) {
                        data.push({timestamp:new Date(obj.monitorTime).getTime(),noiseValue:obj.noise,tempValue:obj.temperature,pm25Value:obj.pm25,pm10Value:obj.pm10});
                    }
                    window.fetchEnv24Hours.newData(data);
                }

                //人员
                $('#peopleLists').empty();
                if(person.length>0) {
                    person.push(person[0]);
                    $.each(person,function (i, item){
                        let {personName,picUrl,idNumber,sex,age,empType,eduction} = item.fieldMan;
                        let template= $('.single_person.hide').clone();
                        if(picUrl){template.find('img').attr('src',picUrl);}
                        template.find('.person_name').text(personName);
                        template.find('.person_id').text(idNumber);
                        template.find('.person_sex').text(sex);
                        template.find('.person_age').text(age);
                        template.find('.person_type').text(empType);
                        template.find('.person_eduction').text(eduction);
                        $('#peopleLists').append(template.removeClass('hide'));
                    })
                    person.pop();
                }
                else{
                    let template= $('.single_person.hide').clone();
                    $('#peopleLists').append(template.removeClass('hide'));
                }


                //出勤
                $('#sumRealNumNew').text(countAttendance);
                $('#sumTotalNumNew').text(countFieldMan);
                pmd.buildLabourDataPieData(countFieldMan,countAttendance);

                $('#peopleLists').css('top',0);

                if(person.length>0){
                    intervalTimer1=setInterval(()=>{
                        if(person.length>0)pop.stepPerson++;
                        else pop.stepPerson==0;

                        /*   if(fieldManAccessLog.length>0)pop.stepWorker++;
                           else pop.stepWorker==0;*/

                        let distancePerson=-0.41*pop.stepPerson+'rem';
                        /*let distanceWork=-0.37*pop.stepWorker+'rem';*/


                        $('#peopleLists').animate({
                            top:distancePerson
                        },1500,'linear',function(){
                            if(pop.stepPerson==person.length){
                                $('#peopleLists').css('top',0);
                                pop.stepPerson=0;
                            }
                        });
                    },3000)
                }

                //塔吊


                $('.tadiao_bg1').show(400);
                $('.tadiao_bg2').hide(400);
                $('.hoist_bg').hide(400);

                $('.height').text('无');
                $('.bearing').text('无');
                $('.angle').text('无');
                $('.torque').text('无');
                $('.deviceCode').text('无');

                $('.operatorId').text('无');
                $('.windSpeed').text('无');
                $('.extent').text('无');
                $('.turn').text('无');
                $('.updateTime').text('无');

                if(crane.length>0){
                    let {height,bearing,angle,torque,deviceCode,operatorId,windSpeed,extent,turn,updateTime} =crane[0];

                    $('.height').text(height||'无');
                    $('.bearing').text(bearing||'无');
                    $('.angle').text(angle||'无');
                    $('.torque').text(torque||'无');
                    $('.deviceCode').text(deviceCode||'无');

                    $('.operatorId').text(operatorId||'无');
                    $('.windSpeed').text(windSpeed||'无');
                    $('.extent').text(extent||'无');
                    $('.turn').text(turn||'无');
                    $('.updateTime').text(updateTime.split(' ')[0]);
                }


                intervalTimer2=setInterval(()=>{
                    /*if(pop.stepCrane==crane.length){
                        pop.stepCrane=0;
                    }else{
                        pop.stepCrane++;
                    }*/
                    if(pop.stepCrane<crane.length){   //塔吊
                        console.log('塔吊');
                        console.log(pop.stepCrane);
                        $('.hoist_bg').hide(400);
                        if(pop.stepCrane%2==0){
                            $('.tadiao_bg1').hide(400);
                            $('.tadiao_bg2').show(400);
                        }else{
                            $('.tadiao_bg1').show(400);
                            $('.tadiao_bg2').hide(400);
                        }
                        let {height,bearing,angle,torque,deviceCode,operatorId,windSpeed,extent,turn,updateTime} =crane[pop.stepCrane];

                        $('.height').text(height||'无');
                        $('.bearing').text(bearing||'无');
                        $('.angle').text(angle||'无');
                        $('.torque').text(torque||'无');
                        $('.deviceCode').text(deviceCode||'无');

                        $('.operatorId').text(operatorId||'无');
                        $('.windSpeed').text(windSpeed||'无');
                        $('.extent').text(extent||'无');
                        $('.turn').text(turn||'无');
                        $('.updateTime').text(updateTime.split(' ')[0]);
                        pop.stepCrane++;
                    }
                    else if((pop.stepCrane==crane.length&&lifter.length>0)||(pop.stepCrane>crane.length&&pop.stepCrane<crane.length+lifter.length)){    //起重机
                        console.log('起重机');
                        console.log(pop.stepCrane);


                        $('.tadiao').hide(400);
                        $('.hoist_bg').show(400);

                        let {serialNo,load,startHeight,stopHeight,speed,status,loadPercent,operatorId,driverName,updateTime}
                        =lifter[pop.stepCrane-crane.length];

                        $('.serialNo').text(serialNo||'无');
                        $('.load').text(load||'无');
                        $('.startHeight').text(startHeight||'无');
                        $('.stopHeight').text(stopHeight||'无');
                        $('.speed').text(speed||'无');
                        $('.status').text(status||'无');

                        $('.loadPercent').text(loadPercent||'无');
                        $('.operatorId').text(operatorId||'无');
                        $('.driverName').text(driverName||'无');
                        $('.updateTime').text(updateTime.split(' ')[0]);

                        $('.hoist_bg>.message_data>span:nth-child(2)').hide().show(400);
                        pop.stepCrane++;
                    }else if(pop.stepCrane==crane.length+lifter.length){
                        pop.stepCrane=0;
                    }
                },10000)
            },error:function(){
            }
        })
    }

    $('#searchResultBox1').mCustomScrollbar({
        scrollButtons:{
            /*enable:true*/
        }
    });
    $("#searchResultBox1").mCustomScrollbar("update");
    var pmd=new ProjectManageDetailNew();
    pmd.init();
    window.pmd=pmd;

});

function fetchEnv24Hours(data){
	var self = this;
	this.data=data;
	this.index=0;
	this.reData=data;
	this.ub=false;
	this.qualityEcharts=echarts.init(document.getElementById("qualityBar"));
	this.enviromentSuperviseBarEcharts=echarts.init(document.getElementById("enviromentSuperviseBar"));
    this.qualityEcharts2=echarts.init(document.getElementById("enviromentSuperviseBar2"));
    //this.enviromentSuperviseBarEcharts2=echarts.init(document.getElementById("enviromentSuperviseBar2"));
	//每小时后台推送一次环境数据
	this.onMessage=function(msg){
		// 收到消息
		var data=JSON.parse(msg.body);
		if(data.status==200){
			self.data=data.data;
		}
	};
	this.reLoad=function(){
		if(self.qualityBarOption.legend.data.length>2){
			self.qualityBarOption.legend.data.remove(self.qualityBarOption.legend.data[2]);
			self.qualityBarOption.legend.data.remove(self.qualityBarOption.legend.data[3]);
		}
		if(self.qualityBarOption.series.length>2){
			self.qualityBarOption.series.remove(self.qualityBarOption.series[2]);
			self.qualityBarOption.series.remove(self.qualityBarOption.series[3]);
		}
	};
	this.newData=function(data){
        if(self.qualityBarOption.legend.data.length==2){
            self.qualityBarOption.legend.data.push({name: 'PM2.5',icon: 'circle',textStyle: {color: '#2b80ff'}});
            self.qualityBarOption.legend.data.push({name: 'PM10',icon: 'circle',textStyle: {color: '#05ccf3'}});
        }
        console.log(self.qualityBarOption.series.length);
        if(self.qualityBarOption.series.length==2){
            self.qualityBarOption.series.push({name:'PM2.5',type:'line',areaStyle: {normal: {color: new echarts.graphic.LinearGradient(0, 1, 0, 0,[{offset: 0, color: 'rgba(255,255,255,0)'},{offset: 0.5, color: 'rgba(72,212,126,0.2'},{offset: 1, color: 'rgba(72,212,126,0.6'}])}},data:[]});
            self.qualityBarOption.series.push({name:'PM10',type:'line',areaStyle: {normal: {color: new echarts.graphic.LinearGradient(0, 1, 0, 0,[{offset: 0, color: 'rgba(255,255,255,0)'},{offset: 0.5, color: 'rgba(30,219,179,0.2)'},{offset: 1, color: 'rgba(30,219,179,0.6)'}])}},data:[]});
        }
	    if(data.length>0) {
            self.data = data;
        }
    };
	this.auto=function(){
	    console.log("++++++++++++++++++++")
		if(self.data.length!=0&&$("#projectPageDetail").is(":visible")){
            if(self.qualityBarOption.legend.data.length>2){
                self.qualityBarOption.legend.data.remove(self.qualityBarOption.legend.data[2]);
                self.qualityBarOption.legend.data.remove(self.qualityBarOption.legend.data[3]);
            }
            if(self.qualityBarOption.series.length>2){
                self.qualityBarOption.series.remove(self.qualityBarOption.series[2]);
                self.qualityBarOption.series.remove(self.qualityBarOption.series[3]);
            }
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

		}else if(self.data.length!=0&&$("#projectManageDetailNew").is(":visible")){
            self.qualityEcharts2.resize();
           // self.enviromentSuperviseBarEcharts2.resize();
            self.qualityBarOption.xAxis[0].data=[];
            self.qualityBarOption.series[0].data=[];
            self.qualityBarOption.series[1].data=[];
            if(self.qualityBarOption.series.length==4){
            	self.qualityBarOption.series[2].data=[];
            	self.qualityBarOption.series[3].data=[];
            }

            for(var i=0;i<self.index;i++){
                var date=self.transformTime(self.data[i].timestamp);
                self.qualityBarOption.xAxis[0].data.push(date.M+"-"+date.d+"\n"+date.h+":"+date.m);
                self.qualityBarOption.series[0].data.push(self.data[i].noiseValue);
                self.qualityBarOption.series[1].data.push(self.data[i].tempValue);
                if(self.qualityBarOption.series.length==4){
                	self.qualityBarOption.series[2].data.push(self.data[i].pm25Value);
                    self.qualityBarOption.series[3].data.push(self.data[i].pm10Value);
                }
            }
            self.qualityEcharts2.setOption(self.qualityBarOption);
            //self.enviromentSuperviseBarEcharts2.setOption(self.enviromentSuperviseBarOption);
        }
        if(self.index<self.data.length){
            self.index++;
        }else{
            self.index=10;
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






