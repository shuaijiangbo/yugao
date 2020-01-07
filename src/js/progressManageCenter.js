//在pathmap.json 里面配置了commons.css的alias别名 commonCss
var $ = require("jquery");
var echarts = require("echarts");
require("@/js/lib/jquery.mCustomScrollbar");  //滚动条
require("@/css/lib/jquery.mCustomScrollbar.css");  //滚动条
var _=require('_')
import URL from '@/api/serviceAPI.config.js'
require('commonCss');
require('../css/progresstManageCenter.scss');
require('../iconfont/iconfont.css');
require('./lib/circle-progress.js')//引入圆环组件


//生成数据
/*
//柱状图
function buildBarData()
{
    var columLabel = [{
        name:'项目1',
        icon:'circle',          //----图例的外框样式
        textStyle:{
            color:'#fff',       //----单独设置某一个图例的颜色
        }
    },
        {
            name:'项目2',
            icon:'circle',          //----图例的外框样式
            textStyle:{
                color:'#fff',       //----单独设置某一个图例的颜色
            }
        }
]

    var columName = ['1月','2月','3月','4月','5月','6月'];
    var columnValue = new Array();
    var arrData = new Array();

    columnValue=[
       {
        name: '项目1',             //---系列名称
        type: 'bar',                //---类型
        legendHoverLink:true,       //---是否启用图例 hover 时的联动高亮
           label:{
               normal:{
                   show:true,
                   position:"top",
                   color:'#12C1EC'
               }
           },
        itemStyle:{                 //---图形形状
            color:'#327ede',
            shadowColor: '#327ede',
            shadowBlur: 3.5,

        },
        /!*barWidth:'20',              //---柱形宽度
        barCategoryGap:'20%',       //---柱形间距*!/
        data: [302, 480, 360, 605, 432, 620]
    },
        {
            name: '项目2',             //---系列名称
            type: 'bar',                //---类型
            legendHoverLink:true,       //---是否启用图例 hover 时的联动高亮
            label:{
                normal:{
                    show:true,
                    position:"top",
                    color:'#12C1EC'
                }
            },
            itemStyle:{                 //---图形形状
                color:'#51fcb8',
                shadowColor: '#51fcb8',
                shadowBlur: 3.5,
            },
            data: [430, 200,500,800, 480, 360]
        }]
    var myChart = echarts.init(document.getElementById('peojectInvestChart'));
    buildChart(myChart,'bar',columLabel,columName,columnValue);


    let index=0;
    let totalXAxisData=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    let totalData=[302, 480, 360, 605, 432, 620,505,299,467,554,324,278];
    let totalData1=[430, 200,500,800, 480, 360, 605,302, 480, 360, 605, 432];
    setInterval(()=>{
        index=(totalXAxisData.length-6)>index?++index:0;
        let changeDataObj=changeDataGroup(index,totalData,totalXAxisData);
        let changeDataObj1=changeDataGroup(index,totalData1,totalXAxisData);
        columnValue[0].data=changeDataObj.totalData;
        columnValue[1].data=changeDataObj1.totalData;
        columName=changeDataObj.totalXAxisData;
        buildChart(myChart,'bar',columLabel,columName,columnValue);
    },5000)

}
//折线图
function buildLineData()
{
    var columLabel = [{
        name:'项目1',
        icon:'circle',          //----图例的外框样式
        textStyle:{
            color:'#fff',       //----单独设置某一个图例的颜色
        }
    },
        {
            name:'项目2',
            icon:'circle',          //----图例的外框样式
            textStyle:{
                color:'#fff',       //----单独设置某一个图例的颜色
            }
        }
    ]

    var columName = ['7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7',
        '7.8', '7.9', '7.10'];
    var columnValue = new Array();
    var arrData = new Array();

    columnValue=[
        {
            name: '项目1',             //---系列名称
            type: 'line',                //---类型
            smooth: true,
            legendHoverLink:true,       //---是否启用图例 hover 时的联动高亮
            label:{
                normal:{
                    show:false,
                    position: "bottom",
                    color:'#12C1EC'
                }
            },
            itemStyle:{                 //---图形形状
                color:'#327ede',
                shadowColor: '#327ede',
                shadowBlur: 5,
            },
            /!*barWidth:'20',              //---柱形宽度
            barCategoryGap:'20%',       //---柱形间距*!/
            data: [10, 52, 110, 234, 320, 350, 220,
                10, 52, 200],
            areaStyle: {normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#327ede'},
                            {offset: 0.5, color: '#58A3DE'},
                            {offset: 1, color: '#62C5DE'}
                        ]
                    )
                }},
        },
        {
            name: '项目2',             //---系列名称
            type: 'line',                //---类型
            smooth: true,
            legendHoverLink:true,       //---是否启用图例 hover 时的联动高亮
            label:{
                normal:{
                    show:false,
                    position: 'left',
                    color:'#12C1EC'
                }
            },
            itemStyle:{                 //---图形形状
                color:'#51fcb8',
                shadowColor: '#51fcb8',
                shadowBlur: 5,
            },
            data: [ 30, 200,100,300, 480, 360, 405,302, 480, 360],
            areaStyle: {normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#51FCB8'},
                            {offset: 0.5, color: '#4FFCCF'},
                            {offset: 1, color: '#CAFCFA'}
                        ]
                    )
                }},
        }]
    var myChart = echarts.init(document.getElementById('peojectProgressChart'));
    buildChart(myChart,'line',columLabel,columName,columnValue);

    let index=0;
    let totalXAxisData=['7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7',
        '7.8', '7.9', '7.10', '7.11', '7.12', '7.13', '7.14',
        '7.15', '7.16', '7.17', '7.18', '7.19', '7.20', '7.21',
        '7.22', '7.23', '7.24', '7.25', '7.26', '7.27', '7.28',
        '7.29', '7.30', '7.31'];
    let totalData=[10, 52, 110, 234, 320, 350, 220,
        10, 52, 200, 334, 70, 370, 220,
        10, 52, 200, 334, 390, 330, 220,
        10, 52, 200, 334, 390, 330, 220,390, 330, 220];
    let totalData1=[30, 200,100,300, 480, 360, 405,302, 480, 360, 605, 43,250, 370, 220,
        50, 152, 200, 334, 390, 330, 220,
        10, 52, 300, 324, 310, 230, 220,390, 330, 220];
    setInterval(()=>{
        index=(totalXAxisData.length-10)>index?++index:0;
        let changeDataObj=changeLineDataGroup(index,totalData,totalXAxisData);
        let changeDataObj1=changeLineDataGroup(index,totalData1,totalXAxisData);
        columnValue[0].data=changeDataObj.totalData;
        columnValue[1].data=changeDataObj1.totalData;
        columName=changeDataObj.totalXAxisData;
        /!*myChart.clear();*!/
        buildChart(myChart,'line',columLabel,columName,columnValue);
    },5000)
}
//招投标管理
function buildPieData()
{
    var columName = [];
    var columnValue = new Array();
    var arrData = new Array();

    columnValue=[
        {
            name:'招投标管理',
            type:'bar',
            radius : '80%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'市政工程管理'},
                {value:310, name:'装饰景观部'},
                {value:274, name:'房建一部'},
                {value:274, name:'房建二部'},
                {value:274, name:'房建三部'},
                {value:274, name:'房建四部'},
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    formatter: '{d}%',
                    position: 'inside'
                }
            },
            color: ['#5fe8ce','#00daf3','#0390fc'],//各个区域颜色
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }]
    var myChartLeft = echarts.init(document.getElementById('baseDepartment'));
    var myChartRight = echarts.init(document.getElementById('baseMoney'));
    buildChart(myChartLeft,'pie',columLabel,columName,columnValue);
    buildChart(myChartRight,'pie',columLabel,columName,columnValue);
}

//生成图形
function buildChart(element,type,columLabel,columName,columnValue)
{
    var option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {
            type : type=='line'?'line':'shadow',
            }
        },
        toolbox: {    //工具栏
            show : false,
            feature : {
                saveAsImage : {show: true}
            }
        },
        legend: {   //图例
            data:columLabel,
            top:'1%',
        },
        grid: {    //网格
            left: '2%',
            right: '4%',
            top: '20%',
            bottom: '3%',
            containLabel: true,
            show:false,                 //---是否显示直角坐标系网格
        },
        xAxis : [
            {
                min:0,
                show:type!='pie'?true:false,
                type : 'category',
                data : columName,
                axisLine: {                   //---坐标轴 轴线
                    lineStyle: {
                    color: '#062e52',
                    width: 1,
                    type: 'solid',
                    }
                },
                axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                  /!*  show:true,                  //---是否显示
                    inside:false,               //---是否朝内*!/
                    rotate:0,                   //---旋转角度
                   /!* margin: 8,                  //---刻度标签与轴线之间的距离*!/
                    color:'#75a3b3',              //---默认取轴线的颜色
                }
            }
        ],
        yAxis : [
            {
                min: 0,
                type: 'value',
                show:type!='pie'?true:false,
                splitLine: {                 //---grid 区域中的分隔线
                    show: type=='line'?true:false,                  //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                    lineStyle: {
                        color: '#062b55',
                        width: 1,
                        type: 'solid',          //---类型
                    },
                },
                axisLine: {                  //---坐标轴 轴线
                    lineStyle: {
                        color: '#062e52',
                        width: 1,
                        type: 'solid',
                    }
                },
                axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                    /!*show:true,                  //---是否显示
                      inside:false,               //---是否朝内*!/
                    rotate:0,                   //---旋转角度
                    /!* margin: 8,                  //---刻度标签与轴线之间的距离*!/
                    color:'#75a3b3',              //---默认取轴线的颜色
                }
            }
        ],
        series : columnValue
    };
    element.setOption(option);
}
*/



//生成数据

var ProgressManageCenter=function(){
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
            top:'5%',
            containLabel: true
        },

        xAxis : [
            {
                type : 'category',
                data : [],
                axisLine: {                   //---坐标轴 轴线
                    lineStyle: {
                        color: '#00dcea',
                        width: 1,
                        type: 'solid',
                    }
                },
                axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                    rotate:0,                   //---旋转角度
                    color:'#00dcea',              //---默认取轴线的颜色
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
                        color: '#00dcea',
                        width: 1,
                        type: 'solid',
                    }
                },
                axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                    rotate:0,                   //---旋转角度
                    color:'#00dcea',              //---默认取轴线的颜色
                }
            }
        ],
    },
    this.projectType='',
    this.newTimer1=null,
    this.newTimer2=null,
    this.newTimer3=null,
    this.newTimer4=null
}

ProgressManageCenter.prototype={
    /*项目投资管理*/
    buildDepartmentBarData:function(){
        let _self=this;

        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), {});
        this.makeChart($('#peojectInvestChart')[0],newOption);

        $.ajax({
            url : URL.getProjInvestMgmt,
            type : "GET",
            //data : {pageSize: 100, pageNum: 1,projectType:this.projectType},
            success : function(res) {
                let data=res.data.data;
                let deptSeries = [];

                let colors = ['#0e99c0','#054baa','#0cbd51','#e4a224','#07def2','#317cd7','#0e99c0','#054baa','#0cbd51','#e4a224','#07def2','#317cd7'];
                let colIndex=0;
                data.forEach(item=>{
                    deptSeries.push({
                        name:item.text,
                        type:'bar',
                        label:{
                            normal:{
                                show:true,
                                position:"top",
                                color:colors[colIndex]
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                    [
                                        {offset: 0, color: 'rgba(255,255,255,1)'},
                                        {offset: 0.6, color: colors[colIndex]},
                                        {offset: 1, color: colors[colIndex]}
                                    ]
                                )
                            }
                        },
                        data:[0,0,0,0,0,0]
                    },);
                    colIndex ++;
                });
                let totalXAxisData=['拟建', '在建', '完工'];

                let option={
                    color:colors,
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top:'15%',
                        containLabel: true
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                            lineStyle:{
                                color:'#2e4a71'
                            }
                        },
                        formatter: function (datas) {
                            var res = '<span style="font-size: 18px">'+datas[0].name +'</span>'+ '<br/>'
                            for (var i = 0, length = datas.length; i < length; i++) {
                                res += datas[i].seriesName + '：'
                                    + datas[i].data +'(万元)<br/>'
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
                        data:[],
                        textStyle: {
                            fontSize:'14'
                        }
                    },

                    series : deptSeries,
                    xAxis : [
                        {
                            type : 'category',
                            data : ['1','2','3'],
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
                    ]
                };
                newOption=Object.assign(JSON.parse(JSON.stringify(_self.baseOption)), option||{});
                _self.makeChart($('#peojectInvestChart')[0],newOption);

                let index=0;

                for(let i=0; i<=data.length-1; i++){
                    let arr=[];
                    let deptData = JSON.parse(data[i].f_depts);

                    totalXAxisData.forEach(item=>{
                        let selectData = deptData.filter(d=>d.name == item);
                        let F_Investment = selectData.length==0?0:selectData[0].F_Investment;
                        arr.push(F_Investment);
                    })

                    newOption.series[i].data=arr;
                    newOption.series[i].name=data[i].text;
                    newOption.legend.data.push({
                        name: data[i].text,
                        icon: 'circle',
                        textStyle: {
                            color: colors[i]
                        }
                    });
                }

                newOption.xAxis[0].data=totalXAxisData;
                _self.makeChart($('#peojectInvestChart')[0],newOption);

                let _stepIndex=0
                _self.newTimer1=setInterval(()=>{
                    _self.makeChart($('#peojectInvestChart')[0],newOption);
                    _stepIndex=_stepIndex==totalXAxisData.length-1?0:++_stepIndex;
                    _self.myEchart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,  // 显示第几个series
                        dataIndex: _stepIndex // 显示第几个数据
                    });
                },5000)
            },error:function(){
            }
        })
    },

    /*招投标管理*/
    buildDepartmentPieData:function(){
        let _self=this;

        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), {});
        this.makeChart($('#peojectProgressChart')[0],newOption);

        $.ajax({
            url:URL.getTendersMgmt,
            type:"GET",
            success: function(res){
                let data=res.data.data;
                let typeSeries = ['公开招标（资格后审）', '公开招标（资格预审）', '有条件公开招标', '竞争性比选', '随机抽取', '网上竞价', '其他'];
                let dataXAxis = ['勘察', '设计', '施工', '监理', '材料设备（供货）', '材料设备（安装）', '试验检测', '造价咨询', '评估', '跟审', '其他'];
                let colors = ['#0e99c0','#054baa','#0cbd51','#e4a224','#07def2','#317cd7','#e4332d','#0e99c0','#054baa','#0cbd51','#e4a224','#07def2','#317cd7'];

                let colIndex=0;

                let option={
                    color:['#0e99c0','#054baa','#0cbd51','#e4a224','#07def2','#317cd7','#e4332d'],
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
                            },
                            animation:true
                        },
                        formatter: function (datas) {
                            var res = '<span style="font-size: 18px">'+datas[0].name +'</span>'+ '<br/>'
                            for (var i = 0, length = datas.length; i < length; i++) {
                                res += datas[i].seriesName + '：'
                                    + datas[i].data + '份<br/>'
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
                    legend: {
                        orient: 'horizontal',
                        top: '0',
                        left:'right',
                        data:[{
                            name: '公开招标（资格后审）',
                            icon: 'circle',
                            textStyle: {
                                color: '#0e99c0'
                            }
                        },{
                            name: '公开招标（资格预审）',
                            icon: 'circle',
                            textStyle: {
                                color: '#054baa'
                            }
                        },{
                            name: '有条件公开招标',
                            // 强制设置图形为圆。
                            icon: 'circle',
                            textStyle: {
                                color: '#0cbd51'
                            }
                        },{
                            name: '竞争性比选',
                            icon: 'circle',
                            textStyle: {
                                color: '#e4a224'
                            }
                        },{
                            name: '随机抽取',
                            icon: 'circle',
                            textStyle: {
                                color: '#317cd7'
                            }
                        },{
                            name: '网上竞价',
                            icon: 'circle',
                            textStyle: {
                                color: '#e4332d'
                            }
                        },{
                            name: '其他',
                            icon: 'circle',
                            textStyle: {
                                color: '#07def2'
                            }
                        }],
                        textStyle: {
                            fontSize:'14'
                        }
                    },
                    yAxis : [
                        {
                            type : 'value',
                            /*splitLine:{
                                show:false
                            },*/
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
                            data : ['1','2','3','4','5','6','7','8','9'],
                            boundaryGap:false,
                            axisLine: {                   //---坐标轴 轴线
                                lineStyle: {
                                    color: '#152c3e',
                                    width: 1,
                                    type: 'solid',
                                }
                            },
                            axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                                rotate:30,                   //---旋转角度
                                color:'#5392be',              //---默认取轴线的颜色
                            }
                        }
                    ],
                    series : [
                        {
                            name:'公开招标（资格后审）',
                            type:'line',
                            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        }, {
                            name:'公开招标（资格预审）',
                            type:'line',
                            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        }, {
                            name:'有条件公开招标',
                            type:'line',
                            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        }, {
                            name:'竞争性比选',
                            type:'line',
                            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        }, {
                            name:'随机抽取',
                            type:'line',
                            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        }, {
                            name:'网上竞价',
                            type:'line',
                            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        }, {
                            name:'其他',
                            type:'line',
                            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        }
                    ]};

                newOption=Object.assign(JSON.parse(JSON.stringify(_self.baseOption)), option||{});
                _self.makeChart($('#peojectProgressChart')[0],newOption);

                let index=0;

                let totalData=[[],[],[],[],[],[],[]];

                for(let i=0; i<typeSeries.length; i++){
                    let arr=[];
                    for(let j=0; j<=data.length-1; j++){
                        if(data[j].text==typeSeries[i]){
                            let typeData = JSON.parse(data[j].xftypes);
                            dataXAxis.forEach(item=>{
                                let selectData = typeData.filter(td=>{return td.name == item;});
                                let zbCount = selectData.length>0?selectData[0].zbCount:0;
                                arr.push(zbCount);
                            })
                            break;
                        }
                    }
                    if(arr.length == 0){
                        dataXAxis.forEach(item=>{
                            arr.push(0);
                        })
                    }
                    newOption.series[i].data=arr;
                    newOption.series[i].name=typeSeries[i];
                    newOption.legend.data[i].name=typeSeries[i];
                    newOption.xAxis[0].data=typeSeries[i];
                    totalData[i]=arr;
                }

                newOption.xAxis[0].data=dataXAxis;
                _self.makeChart($('#peojectProgressChart')[0],newOption);

                let _stepIndex=0
                _self.newTimer2=setInterval(()=>{
                    index=dataXAxis.length-1>index?++index:0;
                    let changeDataObj1=_self.changeDataGroup(index,totalData[0],dataXAxis,5);
                    let changeDataObj2=_self.changeDataGroup(index,totalData[1],dataXAxis,5);
                    let changeDataObj3=_self.changeDataGroup(index,totalData[2],dataXAxis,5);
                    let changeDataObj4=_self.changeDataGroup(index,totalData[3],dataXAxis,5);
                    let changeDataObj5=_self.changeDataGroup(index,totalData[4],dataXAxis,5);
                    let changeDataObj6=_self.changeDataGroup(index,totalData[5],dataXAxis,5);
                    let changeDataObj7=_self.changeDataGroup(index,totalData[6],dataXAxis,5);
                    newOption.xAxis[0].data=changeDataObj1.totalXAxisData;

                    newOption.series[0].data=changeDataObj1.totalData;
                    newOption.series[1].data=changeDataObj2.totalData;
                    newOption.series[2].data=changeDataObj3.totalData;
                    newOption.series[3].data=changeDataObj4.totalData;
                    newOption.series[4].data=changeDataObj5.totalData;
                    newOption.series[5].data=changeDataObj6.totalData;
                    newOption.series[6].data=changeDataObj7.totalData;

                    _self.makeChart($('#peojectProgressChart')[0],newOption);
                    //setTimeout(function(){
                        _self.myEchart.dispatchAction({
                            type: 'showTip',
                            seriesIndex:0,  // 显示第几个series
                            dataIndex: 2 // 显示第几个数据
                        });
                    //})
                },5000)
             },
            error: function(){}
        })
    },

    /*合同管理*/
    buildContractData:function(){
        let option={
            color:[],
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
                        let unit=i==1?'份':'（万元）';
                        res += datas[i].seriesName + '：'
                            + datas[i].data + unit+'<br/>'
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
                    name:'合同总额',
                    type:'bar',
                    barWidth: '35%',
                    label:{
                        normal:{
                            show:true,
                            position:"top",
                            color:'#1d6ef1'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                [
                                    {offset: 0, color: 'rgba(255,255,255,1)'},
                                    {offset: 0.6, color: '#1d6ef1'},
                                    {offset: 1, color: '#1d6ef1'}
                                ]
                            )
                        }
                    },
                    data:[335, 80, 1020, 1034, 790, 130]
                },
                {
                    name:'合同总数',
                    type:'line',
                    yAxisIndex:1,
                    /*barWidth: '35%',*/
                    barGap: '10%',
                    label:{
                        normal:{
                            show:true,
                            position:"top",
                            color:'#27c686'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                [
                                    {offset: 0, color: 'rgba(255,255,255,1)'},
                                    {offset: 0.6, color: '#3eb86d'},
                                    {offset: 1, color: '#3eb86d'}
                                ]
                            )
                        }
                    },
                    data:[335, 80, 1020, 1034, 790, 130]
                },
            ],
            yAxis: [
                {
                    name:'合同总额',
                    type : 'value',
                    splitLine:{
                        show:false
                    },
                    axisLine: {                   //---坐标轴 轴线
                        lineStyle: {
                            color: '#00dcea',
                            width: 1,
                            type: 'solid',
                        }
                    },
                    splitNumber:3,
                    axisLabel:{
                        min:100,
                        color:'#00dcea',              //---默认取轴线的颜色
                    }
                },
                {
                    name:'合同总数',
                    type : 'value',
                    splitLine:{
                        show:false
                    },
                   /* inverse: true,//反转*/
                    axisLine: {                   //---坐标轴 轴线
                        lineStyle: {
                            color: '#00dcea',
                            width: 1,
                            type: 'solid',
                        }
                    },
                    splitNumber:2,
                    axisLabel:{
                        min:100,
                        color:'#00dcea',              //---默认取轴线的颜色
                    }
                }
            ],
            xAxis : [
                {
                    type : 'category',
                    data : ['执行中', '已结束', '中止', '未生效'],
                    axisLine: {                   //---坐标轴 轴线
                        lineStyle: {
                            color: '#00dcea',
                            width: 1,
                            type: 'solid',
                        }
                    },
                    axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                        rotate:20,                   //---旋转角度
                        color:'#00dcea',              //---默认取轴线的颜色
                    }
                }
            ]};

        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
        this.makeChart($('#contractManage')[0],newOption);

        let _self=this;

        $.ajax({
            url : URL.getContractMgmt,
            type : "GET",
            //data : {pageSize: 100, pageNum: 1,projectType:this.projectType},
            success : function(res) {
                let data=res.data.data.filter(item=>{return item.text != '';});
                data.forEach(item=>item.f_htamt=item.f_htamt/10000);
                let backData=_self.separateData(data,'text',['f_htamt','htcount']);
                let totalXAxisData=backData.xData;
                let totalData=backData.f_htamt;
                let totalData1=backData.htcount;

                for(let i=0;i<totalData.length;i++){
                    totalData[i]=parseInt(totalData[i]);
                }
                newOption.series[0].data=totalData;
                newOption.series[1].data=totalData1;

                newOption.xAxis[0].data=totalXAxisData;
                _self.makeChart($('#contractManage')[0],newOption);

                let _stepIndex=0
                _self.newTimer3=setInterval(()=>{
                    _self.makeChart($('#contractManage')[0],newOption);
                    _stepIndex=_stepIndex==totalXAxisData.length-1?0:++_stepIndex;
                    _self.myEchart.dispatchAction({
                        type: 'showTip',
                        seriesIndex:0,  // 显示第几个series
                        dataIndex: _stepIndex // 显示第几个数据
                    });
                },5000)
            },error:function(){
            }
        })
    },
    /*结算数据*/
    buildAccountData:function(){
        let option={
            color:[],
            series : [
                {
                    name:'结算数据',
                    type:'bar',
                    barWidth: '50%',
                    label:{
                        normal:{
                            show:true,
                            position:"top",
                            color:'#27c686'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
                                [
                                    {offset: 0, color: 'rgba(255,255,255,1)'},
                                    {offset: 0.6, color: '#1d6ef1'},
                                    {offset: 1, color: '#1d6ef1'}
                                ]
                            )
                        }
                    },
                    data:[]
                }
            ],
            yAxis: [{
                type : 'value',
                splitLine:{
                    show:false
                },
                axisLine: {                   //---坐标轴 轴线
                    lineStyle: {
                        color: '#00dcea',
                        width: 1,
                        type: 'solid',
                    }
                },
                splitNumber:2,
                axisLabel:{
                    min:100,
                    color:'#00dcea',              //---默认取轴线的颜色
                }
            }],
            xAxis : [
                {
                    type : 'category',
                    data : ['政府代建类项目', '基础设施项目', '平场工程', '道路及配套工程', '立交及节点改造', '排水及能源管线工程', '其他'],
                    axisLine: {                   //---坐标轴 轴线
                        lineStyle: {
                            color: '#00dcea',
                            width: 1,
                            type: 'solid',
                        }
                    },
                    axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
                        rotate:20,                   //---旋转角度
                        color:'#00dcea',              //---默认取轴线的颜色
                    }
                }
            ]};

        let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
        let _self=this;
        _self.makeChart($('#accountDataBar')[0],newOption);

        $.ajax({
            url : URL.getSettleData,
            type : "GET",
            success : function(res) {
                let data=res.data.data;
                data.forEach(item=>item.f_amt=item.f_amt/10000);
                let backData=_self.separateData(data,'text',['f_amt']);
                let totalXAxisData=backData.xData;
                let totalData=backData.f_amt;

                for(let i=0;i<totalData.length;i++){
                    totalData[i]=parseInt(totalData[i]);
                }
                newOption.series[0].data=totalData;
                newOption.xAxis[0].data=totalXAxisData;

                _self.makeChart($('#accountDataBar')[0],newOption);

                let _stepIndex=0
                _self.newTimer4=setInterval(()=>{
                    _stepIndex=_stepIndex==totalXAxisData.length-1?0:++_stepIndex;

                    var changeData=_self.changeDataGroup(_stepIndex,totalData,totalXAxisData,5);;
                    newOption.series[0].data=changeData.totalData;
                    newOption.xAxis[0].data=changeData.totalXAxisData;

                    _self.makeChart($('#accountDataBar')[0],newOption);

                    _self.myEchart.dispatchAction({
                        type: 'showTip',
                        seriesIndex:0,  // 显示第几个series
                        dataIndex: 2 // 显示第几个数据
                    });
                },5000)
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
                backObj[dataParamsObj[j]].push(item[dataParamsObj[j]]||0);
            }
        }
        return backObj;
    },
    init:function(){
        this.buildDepartmentBarData();
        this.buildDepartmentPieData();
        /*this.buildAreaData();*/
        this.buildContractData();
        this.buildAccountData();
    }
}


function changeDataGroup(index,totalData,totalXAxisData){
    let backObj={
        totalData:[],
        totalXAxisData:[]
    };
    for(var i=index;i<(index+6);i++){
        backObj.totalData.push(totalData[i]);
        backObj.totalXAxisData.push(totalXAxisData[i]);
    }
    return backObj
}

function changeLineDataGroup(index,totalData,totalXAxisData){
    let backObj={
        totalData:[],
        totalXAxisData:[]
    };
    for(var i=index;i<(index+10);i++){
        backObj.totalData.push(totalData[i]);
        backObj.totalXAxisData.push(totalXAxisData[i]);
    }
    return backObj
}

$(function(){
    let progressManageCenter=new ProgressManageCenter();
    progressManageCenter.init();
    $('#searchResultBox').mCustomScrollbar({
        scrollButtons:{
            /*enable:true*/
        }
    });
    $("#searchResultBox").mCustomScrollbar("update");

    drawCircleProgress($('#firstCircle'),.4,{ gradient: ["#48c8e5","#19c0f7"] },1000);
    drawCircleProgress($('#secondCircle'),.8,{ gradient: ["#21d9ff","#4186e1"] },150);
    drawCircleProgress($('#thirdCircle'),.6,{ gradient: ["#19c57b", "#16b2e5"]},300);

    setInterval(()=>{
        let random1=Math.ceil(Math.random()*10)/10;
        let random2=Math.ceil(Math.random()*10)/10;
        let random3=Math.ceil(Math.random()*10)/10;

        drawCircleProgress($('#firstCircle'),random1,{ gradient: ["#48c8e5","#19c0f7"]},1000);
        drawCircleProgress($('#secondCircle'),random2,{ gradient: ["#21d9ff","#4186e1"]},150);
        drawCircleProgress($('#thirdCircle'),random3,{ gradient: ["#19c57b", "#16b2e5"]},300);
    },5000)



    function drawCircleProgress(element,value,fill,baseNum) {
        element.circleProgress({
            value: value,
            animation: true,
            emptyFill:'rgba(10, 31, 50, .8)',
            startAngle: -Math.PI/4*2,
            thickness:12,
            lineCap:'round',
            size:'120',
            fill: fill
        }).on('circle-animation-progress', function(event, progress) {
            $(this).find('strong').html(baseNum*value);
        });
    };

    $('#progressManageCenter .tab_data_box .tab_icon').on({
        'click':function(){
            let typesArr=['基础设施','社会事业项目','生态建设','公检法司','楼宇工程','公司自建'];
            $(this).addClass('active').siblings().removeClass('active');

            clearInterval(progressManageCenter.newTimer1);
            clearInterval(progressManageCenter.newTimer2);
            clearInterval(progressManageCenter.newTimer3);
            clearInterval(progressManageCenter.newTimer4);

            progressManageCenter.projectType=typesArr[$(this).index()];
            progressManageCenter.init();
        }
    })
});
