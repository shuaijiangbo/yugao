//在pathmap.json 里面配置了commons.css的alias别名 commonCss
var $ = require("jquery");
var echarts = require("echarts");
require("@/js/lib/jquery.mCustomScrollbar");  //滚动条
require("@/css/lib/jquery.mCustomScrollbar.css");  //滚动条
var _=require('_');
import URL from '@/api/serviceAPI.config.js'
require('commonCss');
require('../css/efficacyMonitor.scss');
require('../iconfont/iconfont.css');


//生成数据

var efficacyMonitor=function(){
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
            top:'7%',
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
                    color:'#8dc5d5',              //---默认取轴线的颜色
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
                    color:'#8dc5d5',              //---默认取轴线的颜色
                }
            }
        ],

    },
    this.newTimer21 = null,
        this.newTimer22 = null,
        this.newTimer23 = null,
        this.newTimer24 = null,
        this.newTimer25 = null
}
// var newTimer21="";
// var newTimer2="";
// var newTimer3="";
efficacyMonitor.prototype={
    // 当年每月隐患处理情况
    buildEfficacyBarData:function(){
        let _self=this;

        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), {});
        this.makeChart($('#qualitySafeByMoneycf')[0],newOption);

        $.ajax({
            url: URL.getDiskDealing,
            type: "GET",
            success: function(res){
                let data = res.data.data;
                let xcRateArr = [];
                let jsRateArr = [];
                let totalXAxis = [];

                let startIndex = data.length > 2 ? 2 : 0;
                for(let i = startIndex; i<data.length; i++){
                    if(data[i].yhcount > 0){
                        let xcRate = data[i].xccount/data[i].yhcount;
                        xcRateArr.push(xcRate.toFixed(3));

                        let jsRate = data[i].jscount/data[i].yhcount;
                        jsRateArr.push(jsRate.toFixed(3));

                        totalXAxis.push(data[i].text);
                        continue;
                    }
                    xcRateArr.push(0);
                    jsRateArr.push(0);
                }

                let option={
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#8dc5d5'
                            }
                        },
                        data: ['1','1','1']
                    }],
                    series : [
                        {
                            name:'消除率',
                            type:'line',
                            barWidth: '50%',
                            smooth: true,
                            symbol:'none',
                            label:{
                                normal:{
                                    show:true,
                                    position:"top",
                                    color:'#12C1EC'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                        [
                                            {offset: 0, color: 'rgba(255,255,255,0)'},
                                            {offset: 0.5, color: '#12c1ec'},
                                            {offset: 1, color: '#12c1ec'}
                                        ]
                                    ),
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 2,
                                        type: 'solid',
                                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: 'rgba(7,191,209,0)'
                                        }, {
                                            offset: 0.5,
                                            color: 'rgba(7,191,209,.77)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(7,191,209,1)'
                                        }]),//线条渐变色
                                    }
                                }
                            },
                            areaStyle: {normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: 'rgba(0,255,255,.33)'},
                                            {offset: 1, color: 'rgba(0,255,255,0)'}
                                        ]
                                    )
                                }},
                            data: [0,0,0]
                        },
                        {
                            name:'及时率',
                            type:'line',
                            barWidth: '50%',
                            smooth: true,
                            symbol:'none',
                            label:{
                                normal:{
                                    show:true,
                                    position:"top",
                                    color:'#12C1EC'
                                }
                            },

                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                        [
                                            {offset: 0, color: 'rgba(255,255,255,0)'},
                                            {offset: 0.5, color: '#12c1ec'},
                                            {offset: 1, color: '#12c1ec'}
                                        ]
                                    ),
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 2,
                                        type: 'solid',
                                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: 'rgba(82,252,185,0)'
                                        }, {
                                            offset: 0.5,
                                            color: 'rgba(82,252,185,.77)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(82,252,185,1)'
                                        }]),//线条渐变色
                                    }
                                }
                            },
                            areaStyle: {normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: 'rgba(0,255,255,.33)'},
                                            {offset: 1, color: 'rgba(0,255,255,0)'}
                                        ]
                                    )
                                }},
                            data: [0,0,0]
                        }
                    ]};
                let newOption=Object.assign(JSON.parse(JSON.stringify(_self.baseOption)), option||{});
                //_self.makeChart($('#qualitySafeByMoneycf')[0],newOption)

                newOption.series[0].data=xcRateArr;
                newOption.series[1].data=jsRateArr;
                newOption.xAxis[0].data=totalXAxis;

                _self.makeChart($('#qualitySafeByMoneycf')[0],newOption);

                let _stepIndex=0;
                _self.newTimer21=setInterval(()=>{
                    _self.makeChart($('#qualitySafeByMoneycf')[0],newOption);
                    _stepIndex=_stepIndex==totalXAxis.length-1?0:_stepIndex+1;
                    _self.myEchart.dispatchAction({
                        type: 'showTip',
                        seriesIndex:0,  // 显示第几个series
                        dataIndex: _stepIndex // 显示第几个数据
                    });
                },5000)
            },
            error: function(){}
        });
    },

    // 累计隐患情况
    buildEfficacyPieData:function(){
        let _self=this;

        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), {});
        this.makeChart($('#qualitySafeByDepartmentNumcf')[0],newOption);

        $.ajax({
            url: URL.getTotalDisks,
            type: "GET",
            success: function(res){
                let data=res.data.data;
                let resolvedCount = 0;
                let unResolvedCount = 0;
                data.forEach(item=>{
                    if(item.text=="处理中"){
                        resolvedCount += item.yhcount;
                    }
                    else{
                        unResolvedCount += item.yhcount;
                    }
                });

                let option={
                    color:['#17eaff','#26cd85','#02b0f7'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)",
                        textStyle:{
                            fontFamily:'serif'
                        },
                        padding:[5,10,5,10],
                    },
                    legend: {
                        orient: 'horizontal',
                        x: 'top',
                        left:'center',
                        data:['已消除','处理中'],
                        textStyle:{
                            color:'#fff'
                        }
                    },
                    xAxis:[{
                        show:false,
                    }],
                    yAxis:[{
                        show:false,
                    }],
                    series: [
                        {
                            name:'隐患数目统计',
                            type:'pie',
                            radius: ['35%', '50%'],
                            center : ['50%', '55%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
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
                                {value:[0], name:'已消除'},
                                {value:[0], name:'处理中'},
                            ]
                        }
                    ]};
                let newOption=Object.assign(JSON.parse(JSON.stringify(_self.baseOption)), option||{});
                _self.makeChart($('#qualitySafeByDepartmentNumcf')[0],newOption)

                newOption.series[0].data[0]={value:resolvedCount, name:'已消除'};
                newOption.series[0].data[1]={value:unResolvedCount, name:'处理中'};
                //newOption.xAxis[0].data=totalXAxis;

                _self.makeChart($('#qualitySafeByDepartmentNumcf')[0],newOption);

                let _stepIndex=0
                setInterval(()=>{
                    let tempEchart=echarts.init($('#qualitySafeByDepartmentNumcf')[0]);
                    _self.myEchart=tempEchart;
                    _self.myEchart.dispatchAction({
                        type: 'showTip',
                        seriesIndex:0,  // 显示第几个series
                        name: newOption.series[0].data[_stepIndex].name // 显示第几个数据
                    });
                    // 取消之前高亮的图形
                    _self.myEchart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: _stepIndex==0?1:_stepIndex-1
                    });


                    // 高亮当前图形
                    _self.myEchart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: _stepIndex
                    });
                    _stepIndex=_stepIndex==1?0:++_stepIndex;
                },5000)
            },
            error: function(){}
        });
    },

    // 当年各类型隐患情况
    buildEfficiencyBarDate:function(){
        let _self=this;

        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), {});
        this.makeChart($('#effectivenessMonitoringcf')[0],newOption);

        $.ajax({
            url: URL.getDiskByType,
            type: "GET",
            success: function(res){
                let data=res.data.data;
                let totalXAxis = [];
                let totalData = [];
                let totalRate = [];
                data.forEach(item=>{
                    totalXAxis.push(item.text);
                    totalData.push(item.yhcount);
                    totalRate.push((item.xccount/item.yhcount).toFixed(2));
                });
                let option = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'line',        // 默认为直线，可选为：'line' | 'shadow'
                            lineStyle:{
                                color:'#2e4a71'
                            },
                            animation:true
                        },
                        formatter: function (datas) {
                            var res = '<span style="font-size: 18px">'+datas[0].name +'</span>'+ '<br/>'
                            for (var i = 0, length = datas.length; i < length; i++) {
                                res += datas[i].seriesName + '：'
                                    + datas[i].data + '<br/>'
                            }
                            return res
                        },
                        textStyle:{
                            fontFamily:'serif'
                        },
                        padding:[5,10,5,10],
                        position:function(p){   //其中p为当前鼠标的位置
                            return [p[0] + 10, p[1] - 50];
                        },
                        backgroundColor:'rgba(39,135,221,.6)',
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#8dc5d5'
                                }
                            },
                            data: ['1','2','3','4']
                        },
                        {
                            type: 'category',
                            show:false,
                            boundaryGap: true,
                            data: ['1','2','3','4']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            scale: true,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#8dc5d5'
                                }
                            },
                        },
                        {
                            type: 'value',
                            scale: false,
                            splitLine:{
                                show:false
                            },
                            boundaryGap: [0.2, 0.2],

                        },

                    ],
                    series: [
                        {
                            name:'隐患总数',
                            type:'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 0,
                            barGap:'30%',
                            //barWidth: '35%',
                            //barCategoryGap:'40%',
                            itemStyle: {
                                normal: {
                                    color:'#dd9e36',
                                    label: {
                                        show: true, //开启显示
                                        position: 'top', //在上方显示
                                        textStyle: { //数值样式
                                            color: '#fff',
                                            fontSize: 12
                                        }
                                    }
                                }
                            },
                            data:[0,0,0,0]
                        },
                        {
                            name:'消除率',
                            type:'line',
                            //smooth: true,
                            xAxisIndex: 0,
                            yAxisIndex: 1,
                            //symbol:'circle',
                            barGap:'30%',
                            itemStyle: {
                                normal: {
                                    color: "#77ffff",
                                    lineStyle: {
                                        color: "#77ffff"
                                    }
                                }
                            },
                            areaStyle: {normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: 'rgba(119,255,255,.41)'},
                                            {offset: 0.5, color: 'rgba(119,255,255,.41)'},
                                            {offset: 1, color: 'rgba(119,255,255,0)'}
                                        ]
                                    )
                                }
                            },
                            data:[0,0,0,0]
                        }
                    ]
                };

                let newOption=Object.assign(JSON.parse(JSON.stringify(_self.baseOption)), option||{});
                _self.makeChart($('#effectivenessMonitoringcf')[0],newOption)

                newOption.xAxis[0].data=totalXAxis;
                newOption.xAxis[1].data=totalXAxis;
                newOption.series[0].data=totalData;
                newOption.series[1].data=totalRate;
                _self.makeChart($('#effectivenessMonitoringcf')[0],newOption);

                let _stepIndex=0;
                _self.newTimer23=setInterval(()=>{
                    _self.makeChart($('#effectivenessMonitoringcf')[0],newOption);
                    _stepIndex=_stepIndex==totalXAxis.length-1?0:_stepIndex+1;
                    _self.myEchart.dispatchAction({
                        type: 'showTip',
                        seriesIndex:0,  // 显示第几个series
                        dataIndex: _stepIndex // 显示第几个数据
                    });
                },5000)

                /*let app = {};
                app.count = 8;
                let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
                // this.makeChart($('#effectivenessMonitoringcf')[0],newOption)
                let myEchart=echarts.init($('#effectivenessMonitoringcf')[0]);
                setInterval(function (){
                    if(app.count<32){
                        var i=app.count++;
                    }else{
                        app.count=1;
                        var i=app.count
                    }
                    var data0 = option.series[0].data;
                    var data1 = option.series[1].data;
                    data0.shift();
                    data0.push(Math.round(Math.random() * 1000));
                    data1.shift();
                    data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

                    option.xAxis[0].data.shift();
                    option.xAxis[0].data.push(i+'号楼');
                    option.xAxis[1].data.shift();
                    option.xAxis[1].data.push(i);
                    myEchart.setOption(newOption);
                }, 2100);*/
            },
            error: function(){}
        });
    },

    // 隐患条目发生频次（取前十）
    buildQualitySafetyBarData:function() {
        let _self=this;

        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), {});
        this.makeChart($('#qualitySafetycf')[0],newOption);

        $.ajax({
            url: URL.getDiskByContent,
            type: "GET",
            success: function(res){
                let data = res.data.data.sort((a,b)=>{return b.yhcount-a.yhcount}).slice(0,10);

                let totalXAxis = [];
                let totalData = [];
                let totalContent = {};
                let totalText = {};

                data.forEach(item=>{
                    totalXAxis.push(item.sort);
                    totalData.push(item.yhcount);
                    totalContent[item.sort] = item.f_content;
                    totalText[item.sort] = item.text;
                });

                let option = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#283b56'
                            }
                        },
                        formatter: function (datas) {
                            let res = ''
                            for (let i = 0; i < datas.length; i++) {
                                res += '条目编号：' + datas[i].name + '<br/>';
                                res += '条目分类：' + totalText[datas[i].name] + '<br/>';
                                res += '隐患内容：' + totalContent[datas[i].name] + '<br/>';
                                res += '发生次数：' + datas[i].data + '<br/>';
                            }
                            return res;
                        },
                        textStyle:{
                            fontFamily:'serif'
                        },
                        padding:[5,10,5,10],
                        backgroundColor:'rgba(39,135,221,.6)',
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLabel: {
                                rotate:50,
                                show: true,
                                textStyle: {
                                    color: '#8dc5d5'
                                }
                            },
                            data: ['1','1','1','1','1','1','1','1','1','1']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitLine:{
                                show:false
                            },
                            show: false,
                            axisLabel:{
                                textStyle: {
                                    color: '#8dc5d5'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name:'发生次数',
                            type:'bar',
                            barGap:'30%',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: "#37a4ff" // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: "#25c5fe" // 100% 处的颜色
                                    }], false),
                                    label: {
                                        show: true, //开启显示
                                        position: 'top', //在上方显示
                                        textStyle: { //数值样式
                                            color: '#fff',
                                            fontSize: 12
                                        }
                                    }
                                }
                            },
                            data: [0,0,0,0,0,0,0,0,0,0],
                        }
                    ]
                };
                let newOption=Object.assign(JSON.parse(JSON.stringify(_self.baseOption)), option||{});
                //_self.makeChart($('#qualitySafetycf')[0],newOption)

                newOption.xAxis[0].data = totalXAxis;
                newOption.series[0].data = totalData;
                _self.makeChart($('#qualitySafetycf')[0],newOption)

                let _stepIndex=0;
                _self.newTimer24=setInterval(()=>{
                    _self.makeChart($('#qualitySafetycf')[0],newOption);
                    _stepIndex=_stepIndex==totalXAxis.length-1?0:_stepIndex+1;
                    _self.myEchart.dispatchAction({
                        type: 'showTip',
                        seriesIndex:0,  // 显示第几个series
                        dataIndex: _stepIndex // 显示第几个数据
                    });
                },5000)
            },
            error: function(){}
        })
    },

    // 当年每月隐患趋势
    buildInvestmentOverData:function() {
        let _self=this;

        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), {});
        this.makeChart($('#investmentOver')[0],newOption);

        $.ajax({
            url: URL.getDiskDealing,
            type: "GET",
            success: function(res){
                let data = res.data.data;
                let totalXAxis = [];
                let totalData = [];

                let startIndex = data.length > 2 ? 2 : 0;
                for(let i = startIndex; i<data.length; i++){
                    totalXAxis.push(data[i].text);
                    totalData.push(data[i].yhcount);
                }

                let  option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '2%',
                        top:'3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#8dc5d5'
                            }
                        },
                        data: ['1','1','1','1']
                    }],
                    yAxis: [{
                        type: 'value',
                        splitLine:{
                            show:false
                        },
                        axisLabel:{
                            textStyle: {
                                color: '#8dc5d5'
                            }
                        },
                    }],
                    series: [
                        {
                            name:'每月隐患趋势',
                            type:'line',
                            smooth: true,
                            symbol:'none',
                            itemStyle: {
                                normal: {
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 2,
                                        type: 'solid',
                                        color: '#5a39ce'
                                    }
                                }
                            },
                            data:[0,0,0,0]
                        },
                    ]
                };
                let newOption=Object.assign(JSON.parse(JSON.stringify(_self.baseOption)), option||{});
                _self.makeChart($('#investmentOver')[0],newOption)

                newOption.xAxis[0].data = totalXAxis;
                newOption.series[0].data = totalData;
                _self.makeChart($('#investmentOver')[0],newOption)

                let _stepIndex=0;
                _self.newTimer25=setInterval(()=>{
                    _self.makeChart($('#investmentOver')[0],newOption);
                    _stepIndex=_stepIndex==totalXAxis.length-1?0:_stepIndex+1;
                    _self.myEchart.dispatchAction({
                        type: 'showTip',
                        seriesIndex:0,  // 显示第几个series
                        dataIndex: _stepIndex // 显示第几个数据
                    });
                },5000)
            },
            error: function(){}
        })
      },

    makeChart:function(element,option){
        let myEchart=echarts.init(element);
        this.myEchart=myEchart;
        myEchart.setOption(option);
    },
    init:function(){
        this.buildEfficacyBarData();
        this.buildEfficacyPieData();
        this.buildEfficiencyBarDate();
        this.buildQualitySafetyBarData();
        this.buildInvestmentOverData();
    }
}

$(function(){
    $('#searchResultBoxMonitore').mCustomScrollbar({
        scrollButtons:{
            /*enable:true*/
        }
    });
    $("#searchResultBoxMonitore").mCustomScrollbar("update");
    let monitor = new efficacyMonitor();
    monitor.init();
    $('#effcacyMonitor .tab_data_box .tab_icon').on({
        'click':function(){
            let typesArr=['社会事业项目','生态建设','公检司法','楼宇工程','公司自建'];
            $(this).addClass('active').siblings().removeClass('active');


            clearInterval(monitor.newTimer21);
            clearInterval(monitor.newTimer22);
            clearInterval(monitor.newTimer23);
            clearInterval(monitor.newTimer24);
            clearInterval(monitor.newTimer25);
            // clearInterval(newTimer1);
            // clearInterval(newTimer2);
            // projectManageCenter.projectType=$(this).index()
            // projectManageCenter.init();
        }
    })
});
