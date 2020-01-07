//在pathmap.json 里面配置了commons.css的alias别名 commonCss
var $ = require("jquery");
var echarts = require("echarts");
/*require("@/js/lib/echarts-auto-tooltip");*/
require("@/js/lib/jquery.mCustomScrollbar");  //滚动条
require("@/css/lib/jquery.mCustomScrollbar.css");  //滚动条
var _=require('_');
import URL from '@/api/serviceAPI.config.js'
require('commonCss');
require('../css/projectManageCenter.scss');
require('../iconfont/iconfont.css');


//生成数据
let newTimer=null;
let newTimer1=null;
let newTimer2=null;
var ProjectManageCenter=function(){
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
            top:'15%',
            containLabel: true
        },

        xAxis : [
            {
                type : 'category',
                data : [],
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
                // name:'投资(万元)',
                //   nameTextStyle:{
                //     color:'#fff'
                //   },
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
                    color:'#fff',              //---默认取轴线的颜色
                }
            }
        ],
    },
    this.projectType=''
}

ProjectManageCenter.prototype={
    /**********投资管理***********/
    buildDepartmentBarData:function(){
        let option={
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                },
                formatter: function (datas) {
                    var res = '<span style="font-size: 18px">'+datas[0].name +'</span>'+ '<br/>'
                    for (var i = 0, length = datas.length; i < length; i++) {
                        res += datas[i].seriesName + '：'
                            + datas[i].data + '（万元）<br/>'
                    }
                    return res
                },
                textStyle:{
                    fontFamily:'serif'
                },
                padding:[5,10,5,10],
                backgroundColor:'rgba(39,135,221,.6)',
            },
            series : [
                {
                    name:'直接访问',
                    type:'line',
                    barWidth: '40%',
                    label:{
                        normal:{
                            show:true,
                            position:"top",
                            color:'#018ace'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                [
                                    {offset: 0, color: 'rgba(1,138,206,0)'},
                                    {offset: 0.5, color: 'rgba(1,138,206,0.7)'},
                                    {offset: 1, color: 'rgba(1,138,206,1)'}
                                ]
                            )
                        }
                    },
                    data:[310, 152, 200, 334, 390, 330, 220]
                },
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '30%',
                    label:{
                        normal:{
                            show:false,
                            position:"top",
                            color:'#854fbe'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                [
                                    {offset: 0, color: 'rgba(0,0,0,1)'},
                                    {offset: 0.6, color: '#824dba'},
                                    {offset: 1, color: '#824dba'}
                                ]
                            )
                        }
                    },
                    data:[310, 152, 200, 334, 390, 330, 220]
                }
            ],
            xAxis : [
                {
                    type : 'category',
                    data : ['财务部', '行政部', '外联部', '工程部', '后勤部', '研发部', '销售部'],
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
                          /*name:'投资(万元)',*/
                          nameTextStyle:{
                                color:'#fff'
                          },
                          splitLine:{
                                show:false
                          },
                          splitNumber:3,
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
        };
        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
        this.makeChart($('#investBar')[0],newOption);
        //
        let _self=this;
        $.ajax({
            url : URL.getTouZiGuanLi,
            type : "POST",
            data : {projectId:1600157859410611,projectType:_self.projectType},
            success : function(res) {
                let getData={
                    "data": {
                        "code": 200,
                        "data": [
                            {
                                "十二月完成投资": 0,
                                "六月完成投资": 27762,
                                "第三季度完成投资": 60722,
                                "七月完成投资": 57122,
                                "二月完成投资": 10282,
                                "三月完成投资": 39492,
                                "五月完成投资": 18712,
                                "第四季度完成投资": 0,
                                "半年计划产值": 68388,
                                "九月完成投资": 0,
                                "全年计划产值": 154004,
                                "八月完成投资": 3600,
                                "第二季度完成投资": 52294,
                                "第一季度完成投资": 61446,
                                "十一月完成投资": 0,
                                "四月完成投资": 5820,
                                "一月完成投资": 11672,
                                "十月完成投资": 0,
                                "半年完成投资": 60722,
                                "部门名称": "房建一部",
                                "全年完成投资": 174462
                            },
                            {
                                "十二月完成投资": 0,
                                "六月完成投资": 7863,
                                "第三季度完成投资": 9030,
                                "七月完成投资": 7120,
                                "二月完成投资": 6795.764,
                                "三月完成投资": 10470,
                                "五月完成投资": 11250,
                                "第四季度完成投资": 0,
                                "半年计划产值": 75766,
                                "九月完成投资": 0,
                                "全年计划产值": 185358,
                                "八月完成投资": 1910,
                                "第二季度完成投资": 28198.764,
                                "第一季度完成投资": 25885.764,
                                "十一月完成投资": 0,
                                "四月完成投资": 9085.764,
                                "一月完成投资": 8620,
                                "十月完成投资": 0,
                                "半年完成投资": 9030,
                                "部门名称": "房建二部",
                                "全年完成投资": 63114.528
                            },
                            {
                                "十二月完成投资": 0,
                                "六月完成投资": 11625,
                                "第三季度完成投资": 23873,
                                "七月完成投资": 14845,
                                "二月完成投资": 7980,
                                "三月完成投资": 13510,
                                "五月完成投资": 14060,
                                "第四季度完成投资": 0,
                                "半年计划产值": 89007,
                                "九月完成投资": 0,
                                "全年计划产值": 219770,
                                "八月完成投资": 9028,
                                "第二季度完成投资": 37935,
                                "第一季度完成投资": 21490,
                                "十一月完成投资": 0,
                                "四月完成投资": 12250,
                                "一月完成投资": 0,
                                "十月完成投资": 0,
                                "半年完成投资": 23873,
                                "部门名称": "市政工程管理部",
                                "全年完成投资": 83298
                            },
                            {
                                "十二月完成投资": 0,
                                "六月完成投资": 2710,
                                "第三季度完成投资": 2300,
                                "七月完成投资": 1000,
                                "二月完成投资": 1290,
                                "三月完成投资": 4000,
                                "五月完成投资": 1800,
                                "第四季度完成投资": 0,
                                "半年计划产值": 16364,
                                "九月完成投资": 0,
                                "全年计划产值": 40158,
                                "八月完成投资": 1300,
                                "第二季度完成投资": 8345,
                                "第一季度完成投资": 5790,
                                "十一月完成投资": 0,
                                "四月完成投资": 3835,
                                "一月完成投资": 500,
                                "十月完成投资": 0,
                                "半年完成投资": 2300,
                                "部门名称": "装饰景观部",
                                "全年完成投资": 16435
                            },
                            {
                                "十二月完成投资": null,
                                "六月完成投资": null,
                                "第三季度完成投资": null,
                                "七月完成投资": null,
                                "二月完成投资": null,
                                "三月完成投资": null,
                                "五月完成投资": null,
                                "第四季度完成投资": null,
                                "半年计划产值": null,
                                "九月完成投资": null,
                                "全年计划产值": null,
                                "八月完成投资": null,
                                "第二季度完成投资": null,
                                "第一季度完成投资": null,
                                "十一月完成投资": null,
                                "四月完成投资": null,
                                "一月完成投资": null,
                                "十月完成投资": null,
                                "半年完成投资": null,
                                "部门名称": "房产分公司",
                                "全年完成投资": null
                            },
                            {
                                "十二月完成投资": 0,
                                "六月完成投资": 49960,
                                "第三季度完成投资": 95925,
                                "七月完成投资": 80087,
                                "二月完成投资": 26347.764,
                                "三月完成投资": 67472,
                                "五月完成投资": 45822,
                                "第四季度完成投资": 0,
                                "半年计划产值": 249525,
                                "九月完成投资": 0,
                                "全年计划产值": 599290,
                                "八月完成投资": 15838,
                                "第二季度完成投资": 126772.764,
                                "第一季度完成投资": 114611.764,
                                "十一月完成投资": 0,
                                "四月完成投资": 30990.764,
                                "一月完成投资": 20792,
                                "十月完成投资": 0,
                                "半年完成投资": 95925,
                                "部门名称": "各部门合计",
                                "全年完成投资": 337309.52800000005
                            }
                        ],
                        "info": "响应成功"
                    },
                    "message": "操作成功",
                    "timestamp": 1566355367088,
                    "status": 200
                }
                    let data = getData.data.data;
                    let backData = _self.separateData(data, '部门名称', ['全年计划产值', '全年完成投资']);
                    let totalXAxisData = backData.xData;
                    let totalData = backData.全年计划产值;
                    let totalData1 = backData.全年完成投资;

                    newOption.series[0].data = totalData;
                    newOption.series[0].name = '全年计划产值';

                    newOption.series[1].name = '全年完成投资';
                    newOption.series[1].data = totalData1;

                    for (let i = 0; i < totalData.length; i++) {
                        totalData[i] = totalData[i].toFixed(2);
                    }
                    for (let i = 0; i < totalData1.length; i++) {
                        totalData1[i] = totalData1[i].toFixed(2);
                    }

                    console.log(newOption);

                    newOption.xAxis[0].data = totalXAxisData;
                    _self.makeChart($('#investBar')[0], newOption);

                    let _stepIndex = 0

                    clearInterval(newTimer);
                    newTimer = setInterval(() => {
                        _self.makeChart($('#investBar')[0], newOption);
                        _stepIndex = _stepIndex == 5 ? 0 : ++_stepIndex;
                        _self.myEchart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,  // 显示第几个series
                            dataIndex: _stepIndex // 显示第几个数据
                        });
                    }, 5200)

            },error:function(){
            }
        })
    },

    /**********结算数据***********/
     buildSettlementBarData:function(){
            let option={
                  tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                              type: 'cross',
                              label: {
                                    backgroundColor: '#283b56'
                              }
                        }
                  },
                  dataZoom: {
                        show: false,
                        start: 0,
                        end: 100
                  },
                  grid: {
                        left: '3%',
                        right: '0%',
                        bottom: '3%',
                        top:'0%',
                        containLabel: true
                  },
                  xAxis: [
                        {
                              type: 'category',
                              boundaryGap: true,
                              axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                                    rotate:0,                   //---旋转角度
                                    color:'#fff',              //---默认取轴线的颜色
                              },
                              data: ['房建一部','房建二部','房建三部','工程管理部','装饰景观部','公用工程部','房产分公司']
                        },
                        {
                              type: 'category',
                              show:false,
                              boundaryGap: true,
                              data: (function (){
                                    var res = [];
                                    var len = 7;
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
                              max: 20,
                              min: 0,
                              boundaryGap: [0.2, 0.2],
                              axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                                    rotate:0,                   //---旋转角度
                                    color:'#fff',              //---默认取轴线的颜色
                              },
                              splitLine:{
                                    show:true,
                                    lineStyle:{
                                        color:'#093d64',
                                        type:'dashed'
                                    }
                              },
                        },
                        {
                              type: 'value',
                              show:false,
                              scale: true,
                              max: 1200,
                              min: 0,
                              boundaryGap: [0.2, 0.2]
                        }
                  ],
                  series: [
                        {
                              name:'预购队列',
                              type:'bar',
                              barWidth: '30%',
                              label:{
                                    normal:{
                                          show:true,
                                          position:"top",
                                          color:'#fff'
                                    }
                              },
                              itemStyle: {
                                    normal: {
                                          color: new echarts.graphic.LinearGradient(
                                                0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                                [
                                                      {offset: 0, color:'#41a0f2'},
                                                      {offset: 0.5, color:'#41a0f2'},
                                                      {offset: 1, color: '#2647fd'}
                                                ]
                                          )
                                    }
                              },
                              xAxisIndex: 1,
                              yAxisIndex: 1,
                              data:(function (){
                                    var res = [];
                                    var len =7;
                                    while (len--) {
                                          res.push(Math.round(Math.random() * 1000));
                                    }
                                    return res;
                              })()
                        },{
                              name:'最新成交价',
                              type:'line',
                              itemStyle: {
                                    normal: {
                                          color: '#77ffff'
                                    }
                              },
                              data:(function (){
                                    var res = [];
                                    var len = 0;
                                    while (len <7) {
                                          res.push((Math.random()*10 + 5).toFixed(1) - 0);
                                          len++;
                                    }
                                    return res;
                              })()
                        }
                  ]
            };
            let newOption=Object.assign(option);
            this.makeChart($('#settlementBar')[0],newOption);
      },

    /**********招标投资***********/
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
                data:[],
                textStyle:{
                    color:'rgba(255,255,255,.6)'
                }
            },
            series: [
                {
                    name:'招标数',
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
                    data:[]
                },
            ]
        };
        let newOption=Object.assign(option);
        this.makeChart($('#tenderingPieOne')[0],newOption);

        let _self=this;
     /*   $.ajax({
            url : URL.getZhaoBiaoGuanLiGroupByDept,
            type : "POST",
            data : {pageSize: 100, pageNum: 1,projectType:_self.projectType},
            success : function(res) {
                let getData={
                    "data": {
                    "code": 200,
                        "data": [
                        {
                            "cou": 88,
                            "f_fullname": "房建一部",
                            "f_departmentid": "65a7b070-e28c-41ed-b397-ffb4679b7e82",
                            "f_zbprice": 1119217728.479955
                        },
                        {
                            "cou": 147,
                            "f_fullname": "房建二部",
                            "f_departmentid": "e1f99cd0-47ac-4d57-897a-fb17306cf386",
                            "f_zbprice": 1044637071.9799999
                        },
                        {
                            "cou": 2,
                            "f_fullname": "房产分公司",
                            "f_departmentid": "10092bda-0d1f-485d-bf62-2e23fb399704",
                            "f_zbprice": 348750
                        },
                        {
                            "cou": 152,
                            "f_fullname": "市政工程管理部",
                            "f_departmentid": "b0499eb5-df15-4ded-b503-c580ce047470",
                            "f_zbprice": 5526397383.252998
                        },
                        {
                            "cou": 74,
                            "f_fullname": "装饰景观部",
                            "f_departmentid": "07fa99ce-c69c-437d-b40a-a50a7ab6065c",
                            "f_zbprice": 552994975.1000001
                        }
                    ],
                        "info": "响应成功"
                },
                    "message": "操作成功",
                    "timestamp": 1566356113586,
                    "status": 200
                }

                    let data=getData.data.data;
                    let legendData=[];
                    for(var i=0;i<data.length;i++){
                        let item=data[i];
                        item.name=item.f_fullname;
                        item.value=item.cou;
                        legendData.push(item.f_fullname);
                    }

                    newOption.series[0].data=data;

                    newOption.legend.data=legendData;
                    _self.makeChart($('#tenderingPieOne')[0],newOption);

                    let _stepIndex=0
                    newTimer1=setInterval(()=>{
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
                    /!*tools.loopShowTooltip(_self.myEchart, newOption, {loopSeries: true});*!/

            },error:function(){
            }
        })*/
    },

    /**********招标投资***********/
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
                x: '65%',
                y:'10%',
                data:[],
                textStyle:{
                    color:'rgba(255,255,255,.6)'
                }
            },
            series: [{
                name:'招标额',
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
                data:[]
            }
            ]
        };
        let newOption=Object.assign(option);
        this.makeChart($('#tenderingPieTwo')[0],newOption);
        let _self=this;

        $.ajax({
            url : URL.getZhaoBiaoGuanLiGroupByDept,
            type : "POST",
            data : {
                pageSize: 100,
                pageNum: 1,
                projectType:_self.projectType
            },
            success : function(res) {
               let getData={
                    "data": {
                        "code": 200,
                        "data": [
                            {
                                "cou": 88,
                                "f_fullname": "房建一部",
                                "f_departmentid": "65a7b070-e28c-41ed-b397-ffb4679b7e82",
                                "f_zbprice": 1119217728.479955
                            },
                            {
                                "cou": 147,
                                "f_fullname": "房建二部",
                                "f_departmentid": "e1f99cd0-47ac-4d57-897a-fb17306cf386",
                                "f_zbprice": 1044637071.9799999
                            },
                            {
                                "cou": 2,
                                "f_fullname": "房产分公司",
                                "f_departmentid": "10092bda-0d1f-485d-bf62-2e23fb399704",
                                "f_zbprice": 348750
                            },
                            {
                                "cou": 152,
                                "f_fullname": "市政工程管理部",
                                "f_departmentid": "b0499eb5-df15-4ded-b503-c580ce047470",
                                "f_zbprice": 5526397383.252998
                            },
                            {
                                "cou": 74,
                                "f_fullname": "装饰景观部",
                                "f_departmentid": "07fa99ce-c69c-437d-b40a-a50a7ab6065c",
                                "f_zbprice": 552994975.1000001
                            }
                        ],
                        "info": "响应成功"
                    },
                    "message": "操作成功",
                    "timestamp": 1566356113586,
                    "status": 200
                }
                    let data=getData.data.data;
                    let legendData=[];
                    for(var i=0;i<data.length;i++){
                        let item=data[i];
                        item.name=item.f_fullname;
                        item.value=parseInt(item.f_zbprice/10000);

                        legendData.push(item.f_fullname);
                    }

                    newOption.series[0].data=data;
                    newOption.legend.data=legendData;
                    _self.makeChart($('#tenderingPieTwo')[0],newOption);

                    let _stepIndex=0
                    newTimer2=setInterval(()=>{
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

                /*tools.loopShowTooltip(_self.myEchart, newOption, {loopSeries: true});*/
            },error:function(){
            }
        })
      },

        makeChart:function(element,option){
        let myEchart=echarts.init(element);
        this.myEchart=myEchart;
        myEchart.setOption(option);
    },
    timer:function(){
        let _self=this;
        setInterval(()=>{
            _self.baseOption.xAxis.data.push(_self.baseOption.xAxis.data[0]);
            _self.baseOption.xAxis.data.shift();
            let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
            this.makeChart($('#departmentBar')[0],newOption);
        },5000)
    },
    changeData:function(data){
        data.push(data[0]);
        data.shift();
        return data
    },
    changeDataGroup:function(index,totalData,totalXAxisData){
        let backObj={
            totalData:[],
            totalXAxisData:[]
        };
        for(var i=index;i<(index+7);i++){
            backObj.totalData.push(totalData[i]);
            backObj.totalXAxisData.push(totalXAxisData[i]);
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
                backObj[dataParamsObj[j]].push(item[dataParamsObj[j]]||0);
            }
        }
        return backObj;
    },
    init:function(){
        this.buildDepartmentBarData();
        this.buildSettlementBarData();
/*        this.buildPieData();
        this.buildPieData2();*/
    }
}

$(function(){
    $('#searchResultBox1').mCustomScrollbar({
        scrollButtons:{
            /*enable:true*/
        }
    });
    $("#searchResultBox1").mCustomScrollbar("update");
    let projectManageCenter=new ProjectManageCenter;
    projectManageCenter.init()
    changeProgress();

    $('#projectManageCenter .tab_data_box .tab_icon').on({
        'click':function(){
            let typesArr=['社会事业项目','生态建设','公检司法','楼宇工程','公司自建'];
            $(this).addClass('active').siblings().removeClass('active');


            clearInterval(newTimer);
            clearInterval(newTimer1);
            clearInterval(newTimer2);
            projectManageCenter.projectType=$(this).index()
            projectManageCenter.init();
        }
    })
});


/****进度条****/
function changeProgress(){
    // setInterval(()=>{
    //     let random1=Math.ceil(Math.random()*10)/10;
    //     let random2=Math.ceil(Math.random()*10)/10;
    //     let random3=Math.ceil(Math.random()*10)/10;
    //     let random4=Math.ceil(Math.random()*10)/10;
    //     let random5=Math.ceil(Math.random()*10)/10;
    //     let random6=Math.ceil(Math.random()*10)/10;
    //     let random7=Math.ceil(Math.random()*10)/10;

        count($('#projectOverviewItems').find('li').eq(0),2000,1506);
        count($('#projectOverviewItems').find('li').eq(1),2000,1088);
        count($('#projectOverviewItems').find('li').eq(2),2000,1560);
        count($('#projectOverviewItems').find('li').eq(3),2000,1060);
        count($('#projectOverviewItems').find('li').eq(4),2000,1500);
        count($('#projectOverviewItems').find('li').eq(5),2000,1260);
        count($('#projectOverviewItems').find('li').eq(6),2000,1360);
    // },5000)
}

function count(element,baseNum,proportion){
    element.find('p.text_describe').find('span').eq(1).text(proportion+"万元");
    var str=Number(proportion/baseNum*100).toFixed(1);
    str+="%";
    element.find('p.progress_bright_bar').css('width',str);
}
