//在pathmap.json 里面配置了commons.css的alias别名 commonCss
var $ = require("jquery");
var echarts = require("echarts");
require("@/js/lib/jquery.mCustomScrollbar");  //滚动条
require("@/css/lib/jquery.mCustomScrollbar.css");  //滚动条
var _=require('_');
import URL from '@/api/serviceAPI.config.js'
require('commonCss');
require('../css/distributionSchedulingCenter.scss');
require('../iconfont/iconfont.css');


//生成数据
//
// var distributionSchedulingCenter=function(){
//     this.baseOption={
//         tooltip : {
//             trigger: 'axis',
//             axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//                 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//             }
//         },
//         grid: {
//             left: '3%',
//             right: '4%',
//             bottom: '3%',
//             top:'7%',
//             containLabel: true
//         },
//
//         xAxis : [
//             {
//                 type : 'category',
//                 data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//                 axisLine: {                   //---坐标轴 轴线
//                     lineStyle: {
//                         color: '#152c3e',
//                         width: 1,
//                         type: 'solid',
//                     }
//                 },
//                 axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
//                     rotate:0,                   //---旋转角度
//                     color:'#fff',              //---默认取轴线的颜色
//                 }
//             }
//         ],
//         yAxis : [
//             {
//                 type : 'value',
//                 splitLine:{
//                     show:false
//                 },
//                 axisLine: {                   //---坐标轴 轴线
//                     lineStyle: {
//                         color: '#152c3e',
//                         width: 1,
//                         type: 'solid',
//                     }
//                 },
//                 axisLabel:{                 //---坐标轴 标签(坐标轴刻度文字)
//                     rotate:0,                   //---旋转角度
//                     color:'#fff',              //---默认取轴线的颜色
//                 }
//             }
//         ],
//
//     }
// }
//
// distributionSchedulingCenter.prototype={
//     buildDepartmentBarData:function(){
//         let option={series : [
//                 {
//                     name:'直接访问',
//                     type:'bar',
//                     barWidth: '50%',
//                     label:{
//                         normal:{
//                             show:true,
//                             position:"top",
//                             color:'#12C1EC'
//                         }
//                     },
//                     itemStyle: {
//                         normal: {
//                             color: new echarts.graphic.LinearGradient(
//                                 0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
//                                 [
//                                     {offset: 0, color: 'rgba(255,255,255,0)'},
//                                     {offset: 0.5, color: '#12c1ec'},
//                                     {offset: 1, color: '#12c1ec'}
//                                 ]
//                             )
//                         }
//                     },
//                     data:[10, 52, 200, 334, 390, 330, 220]
//                 }
//             ]};
//         let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
//         this.makeChart($('#departmentBar')[0],newOption)
//     },
//     buildDepartmentPieData:function(){
//         let option={
//             color:['#17eaff','#26cd85','#02b0f7'],
//             legend: {
//                 orient: 'horizontal',
//                 x: 'top',
//                 left:'center',
//                 data:['房建一部','房建二部','房建三部'],
//                 textStyle:{
//                     color:'#fff'
//                 }
//             },
//             xAxis:[{
//                 show:false,
//             }],
//             yAxis:[{
//                 show:false,
//             }],
//             series: [
//                 {
//                     name:'访问来源',
//                     type:'pie',
//                     radius: ['50%', '70%'],
//                     center : ['50%', '65%'],
//                     avoidLabelOverlap: false,
//                     label: {
//                         normal: {
//                             show: true,
//                             formatter: '{b}\n{c}({d}%)',
//                         },
//                         emphasis: {
//                             show: true,
//                             textStyle: {
//                                 fontSize: '15',
//                                 fontWeight: 'bold'
//                             }
//                         }
//                     },
//                     data:[
//                         {value:335, name:'房建一部'},
//                         {value:310, name:'房建二部'},
//                         {value:1134, name:'房建三部'},
//                     ]
//                 }
//             ]};
//         let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
//         this.makeChart($('#departmentPie')[0],newOption)
//     },
//
//     buildAreaData:function(){
//         let option={
//             series : [
//                 {
//                     name:'直接访问',
//                     type:'bar',
//                     barWidth: '50%',
//                     label:{
//                         normal:{
//                             show:true,
//                             position:"top",
//                             color:'#27c686'
//                         }
//                     },
//                     itemStyle: {
//                         normal: {
//                             color: new echarts.graphic.LinearGradient(
//                                 0, 1, 0, 0,   //颜色渐变函数，顺序左下右上
//                                 [
//                                     {offset: 0, color: 'rgba(255,255,255,0)'},
//                                     {offset: 0.5, color: '#27c686'},
//                                     {offset: 1, color: '#27c686'}
//                                 ]
//                             )
//                         }
//                     },
//                     data:[10, 52, 200, 334, 390, 330, 220]
//                 }
//             ]};
//
//         let newOption=Object.assign(JSON.parse(JSON.stringify(this.baseOption)), option||{});
//         console.log(newOption);
//         this.makeChart($('#earaBar')[0],newOption)
//     },
//
//     makeChart:function(element,option){
//         let myEchart=echarts.init(element);
//         myEchart.setOption(option);
//     },
//     init:function(){
//         this.buildDepartmentBarData();
//         this.buildDepartmentPieData();
//         this.buildAreaData();
//     }
// }

$(function(){
    $('#searchResultDistribution1').mCustomScrollbar({
        scrollButtons:{
            /*enable:true*/
        }
    });
    $("#searchResultDistribution1").mCustomScrollbar("update");

//    var canvas=document.getElementById("canvasLine");
//    canvas.height=window.innerHeight;
//    canvas.width=window.innerWidth;
//
//    var ctx=canvas.getContext("2d");
//
//    ctx.beginPath();
//    ctx.setLineDash([10, 10]);
//    let p1=disposePercent('40%','50%');
//    let p2=disposePercent('40%','50%');
//    let p3=disposePercent('40%','50%');
//    ctx.moveTo(1180,490);
//    ctx.quadraticCurveTo(1000,300,650,160);
//    ctx.strokeStyle='#fb5235';
//    ctx.lineWidth=2;
//    ctx.stroke();

    // new distributionSchedulingCenter().init();
});


//将点处理百分数
function disposePercent(pointObj){
    let point=new Array;
    let _pointX=window.innerWidth*pointObj[0]/100
    let _pointY=window.innerHeight*pointObj[1]/100

    point[0]=_pointX;
    point[1]=_pointY;
    return point;
}