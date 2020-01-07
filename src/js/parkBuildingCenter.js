//在pathmap.json 里面配置了commons.css的alias别名 commonCss
var $ = require("jquery");
var echarts = require("echarts");
require("@/js/lib/echarts-auto-tooltip");  //echart自动tooltip轮播
require("@/js/lib/jquery.mCustomScrollbar");  //滚动条
require("@/css/lib/jquery.mCustomScrollbar.css");  //滚动条
var _=require('_');
import URL from '@/api/serviceAPI.config.js'
require('commonCss');
require('../css/lib/animate.css');
require('../css/parkBuildingCenter.scss');
require('../iconfont/iconfont.css');
require("@/js/lib/jquery.jcarousel.min");  //轮播
require("@/js/lib/jquery.pikachoose");  //轮播
require("@/css/lib/jq22.css");  //轮播
require("@/css/lib/index.css");  //轮播
require("@/css/lib/planting.css");  //轮播
require('@/js/lib/jquery.easing.1.3.js');//轮播
require('@/js/lib/jquery.roundabout.min.js');//轮播
require("@/css/lib/countdown.css");  //翻牌效果
require('@/js/lib/underscore-1.5.2-min');//翻牌效果
require('@/components/header/header.js')//引入header组件
require('@/components/footer/footer.js')//引入footer组件


//饼状图
function buildPieData2() {
      //学历
      var columLabel = [{
            name:'博士',
            icon:'circle',          //----图例的外框样式'rect',
            itemWidth: 6,  // 设置宽度
            itemHeight: 6, // 设置高度
            textStyle:{
                  color:'#89bccd',       //----单独设置某一个图例的颜色
                  fontSize:'12px'
            }
      },{
            name:'研究生',
            icon:'circle',          //----图例的外框样式
            itemWidth: 6,  // 设置宽度
            itemHeight: 6, // 设置高度
            textStyle:{
                  color:'#89bccd',       //----单独设置某一个图例的颜色
            }
      },{
            name:'本科',
            icon:'circle',          //----图例的外框样式
            itemWidth: 6,  // 设置宽度
            itemHeight: 6, // 设置高度
            textStyle:{
                  color:'#89bccd',       //----单独设置某一个图例的颜色
            }
      },{
            name:'其他',
            icon:'circle',          //----图例的外框样式
            itemWidth: 6,  // 设置宽度
            itemHeight: 6, // 设置高度
            textStyle:{
                  color:'#89bccd',       //----单独设置某一个图例的颜色
            }
      }
      ]
      //党龄
      var ageColumLabel = [{
            name:'20-30',
            icon:'circle',          //----图例的外框样式'rect',
            itemWidth: 6,  // 设置宽度
            itemHeight: 6, // 设置高度
            textStyle:{
                  color:'#89bccd',       //----单独设置某一个图例的颜色
                  fontSize:'12px'
            }
      },{
            name:'30-45',
            icon:'circle',          //----图例的外框样式
            itemWidth: 6,  // 设置宽度
            itemHeight: 6, // 设置高度
            textStyle:{
                  color:'#89bccd',       //----单独设置某一个图例的颜色
            }
      },{
            name:'45-65',
            icon:'circle',          //----图例的外框样式
            itemWidth: 6,  // 设置宽度
            itemHeight: 6, // 设置高度
            textStyle:{
                  color:'#89bccd',       //----单独设置某一个图例的颜色
            }
      },{
            name:'65以上',
            icon:'circle',          //----图例的外框样式
            itemWidth: 6,  // 设置宽度
            itemHeight: 6, // 设置高度
            textStyle:{
                  color:'#89bccd',       //----单独设置某一个图例的颜色
            }
      }
      ]
      //迁入迁出
      var moveColumLabel = [{
            name:'一支部',
            icon:'circle',          //----图例的外框样式'rect',
            itemWidth: 4,  // 设置宽度
            itemHeight: 4, // 设置高度
            textStyle:{
                  color:'#89bccd',       //----单独设置某一个图例的颜色
            }
      },{
            name:'二支部',
            icon:'circle',          //----图例的外框样式
            itemWidth: 4,  // 设置宽度
            itemHeight: 4, // 设置高度
            textStyle:{
                  color:'#89bccd',       //----单独设置某一个图例的颜色
            }
      },{
            name:'三支部',
            icon:'circle',          //----图例的外框样式
            itemWidth: 4,  // 设置宽度
            itemHeight: 4, // 设置高度
            textStyle:{
                  color:'#89bccd',       //----单独设置某一个图例的颜色
            }
      },{
            name:'渝豪仕支部',
            icon:'circle',          //----图例的外框样式
            itemWidth: 4,  // 设置宽度
            itemHeight: 4, // 设置高度
            textStyle:{
                  color:'#89bccd',       //----单独设置某一个图例的颜色
            }
      }
      ]
      var columName = [];
      var ageColumName = [];
      var moveColumName = [];
      var columnValue = new Array();
      var ageColumValue = new Array();
      var moveColumValue = new Array();
      var arrData = new Array();
      //学历
      columnValue=[
            {
                  name:'学历构成',
                  type:'pie',
                  radius : [15, 60],
                  center: ['45%', '50%'],
                  data:[
                        {value:25, name:'研究生'},
                        {value:15, name:'本科'},
                        {value:20, name:'其他'},
                        {value:40, name:'博士'},
                  ].sort(function (a, b) { return a.value - b.value; }),
                  roseType: 'radius',
                  label: {
                        normal: {
                             position:'inside',
                              formatter: '{d}%',
                              textStyle: {
                                    color: "#fff"
                              },
                        }
                  },
                  // lableLine: {
                  //       show: true,
                  //       length:5,
                  //       length2:5,
                  //       lineStyle: {
                  //             color: '#00fff6'
                  //       },
                  //       smooth:0.2,
                  //       emphasis: {
                  //             show: true,
                  //             lineStyle: {
                  //                   color: '#00fff6'
                  //             },
                  //       }
                  // },
                  color: ['#00fff6','#0a4f5b','#51c1ee','#00aeff'],//各个区域颜色
                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function (idx) {
                        return Math.random() * 200;
                  }
            }]
      //党龄
      ageColumValue=[
            {
                  name:'党龄构成',
                  type:'pie',
                  radius : [15, 60],
                  center: ['45%', '50%'],
                  data:[
                        {value:25, name:'20-30'},
                        {value:15, name:'30-45'},
                        {value:20, name:'45-65'},
                        {value:40, name:'65以上'},
                  ].sort(function (a, b) { return a.value - b.value; }),
                  roseType: 'radius',
                  label: {
                        normal: {
                              position:'inside',
                              formatter: '{d}%',
                              textStyle: {
                                    color: "#fff"
                              },
                        }
                  },
                  lableLine: {
                        normal: {
                              length: 0.1,
                              length2: 0,
                              lineStyle: {
                                    color: '#0b5263'
                              }
                        }
                  },
                  color: ['#26cd85','#5a37cc','#2871b5','#51c1ee'],//各个区域颜色
                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function (idx) {
                        return Math.random() * 200;
                  }
            }]
      //党员迁入
      moveColumValue=[
            {
                  name:'渝高积极分子占比',
                  type:'pie',
                  radius : [30, 40],
                  center: ['35%', '45%'],
                  data:[
                        {
                              value:3,
                              name:'一支部',
                              selected:false,
                              label: {
                                    show: false ,
                                    formatter: '{d}%\n党员迁入\n占比',
                                    textStyle: {
                                          color: "#fff",
                                          fontSize:12
                                    },
                              }
                        },
                        {value:5, name:'二支部'},
                      {value:11, name:'三支部'},
                      {value:9, name:'渝豪仕支部'},
                  ].sort(function (a, b) { return a.value - b.value; }),
                  avoidLabelOverlap: false,
                  label: {
                        normal: {
                              position:'center',
                              show:false,
                              formatter: '{d}%',
                              textStyle: {
                                    color: "#fff"
                              },
                        }
                  },
                  color: ['#00fff6','#0a4f5b','#51c1ee','#00aeff'],//各个区域颜色
                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function (idx) {
                        return Math.random() * 200;
                  }
            }]
      var myChartLeft = echarts.init(document.getElementById('educationPie'));
      var myChartCenter = echarts.init(document.getElementById('partyAgePie'));
      var myChartRight = echarts.init(document.getElementById('moveOutPie'));
      buildChart2(myChartLeft,'pie',columLabel,columName,columnValue,1);
      buildChart2(myChartCenter,'pie',ageColumLabel,ageColumName,ageColumValue,2);
      buildChart2(myChartRight,'pie',moveColumLabel,moveColumName,moveColumValue,3);
}
//生成图形
function buildChart2(element,type,columLabel,columName,columnValue,index) {
    console.log(index);
      var option = {
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)",
              textStyle:{
                  fontFamily:'serif'
              },
              padding:[5,10,5,10],
          },
            toolbox: {    //工具栏
                  show : false,
                  feature : {
                        saveAsImage : {show: true}
                  }
            },
            legend: {   //图例
                  data:columLabel,
                  top:'20%',
                  left:index==3?'57%':'70%'
            },
            grid: {    //网格
                  left: '2%',
                  right: '0%',
                  top: '3%',
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
                              /*  show:true,                  //---是否显示
                                inside:false,               //---是否朝内*/
                              rotate:0,                   //---旋转角度
                              /* margin: 8,                  //---刻度标签与轴线之间的距离*/
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
                              /*show:true,                  //---是否显示
                                inside:false,               //---是否朝内*/
                              rotate:0,                   //---旋转角度
                              /* margin: 8,                  //---刻度标签与轴线之间的距离*/
                              color:'#75a3b3',              //---默认取轴线的颜色
                        }
                  }
            ],
            series : columnValue
      };
      element.setOption(option);
      tools.loopShowTooltip(element, option, {loopSeries: true});
}
// 文字滚动
function startmarquee(lh, speed, delay) {
      var t;
      var oHeight = $('.dz_right_small_content').height();/** div的高度 **/
      var p = false;
      var o = document.getElementById("propaganda");
      var preTop = 0;
      o.scrollTop = 0;
      function start() {
            t = setInterval(scrolling, speed);
            o.scrollTop += 1;
      }
      function scrolling() {
            if (o.scrollTop % lh != 0 && o.scrollTop % (o.scrollHeight - oHeight - 1) != 0) {
                  preTop = o.scrollTop;
                  o.scrollTop += 1;
                  if (preTop >= o.scrollHeight || preTop == o.scrollTop) {
                        // o.scrollTop = 0;
                        clearInterval(t);
                  }
            } else if(o.scrollTop==0){
                  clearInterval(t);
                  setTimeout(start, delay);
            }else {
                  clearInterval(t);
                  setTimeout(start, delay);
            }
      }
      setTimeout(start, delay);
}
//图片轮播
function lunbo(){
//定时器返回值
      var time=null;
//记录当前位子
      var nexImg = 0;
//用于获取轮播图图片个数
      var imgLength = $(".c-banner .banner ul li").length;
//当时动态数据的时候使用,上面那个删除
// var imgLength =0;
//设置底部第一个按钮样式
      $(".c-banner .jumpBtn ul li[jumpImg="+nexImg+"]").css("background-color","black");

//页面加载
      $(document).ready(function(){
            // dynamicData();
            //启动定时器,设置时间为3秒一次
            time =setInterval(intervalImg,5000);
      });

//点击上一张
      $(".preImg").click(function(){
            //清楚定时器
            clearInterval(time);
            var nowImg = nexImg;
            nexImg = nexImg-1;
            if(nexImg<0){
                  nexImg=imgLength-1;
            }
            //底部按钮样式设置
            $(".c-banner .jumpBtn ul li").css("background-color","white");
            $(".c-banner .jumpBtn ul li[jumpImg="+nexImg+"]").css("background-color","black");

            //将当前图片试用绝对定位,下一张图片试用相对定位
            $(".c-banner .banner ul img").eq(nowImg).css("position","absolute");
            $(".c-banner .banner ul img").eq(nexImg).css("position","relative");

            //轮播淡入淡出
            $(".c-banner .banner ul li").eq(nexImg).css("display","block");
            $(".c-banner .banner ul li").eq(nexImg).stop().animate({"opacity":1},1000);
            $(".c-banner .banner ul li").eq(nowImg).stop().animate({"opacity":0},1000,function(){
                  $(".c-banner ul li").eq(nowImg).css("display","none");
            });

            //启动定时器,设置时间为3秒一次
            time =setInterval(intervalImg,5000);
      })

//点击下一张
      $(".nexImg").click(function(){
            clearInterval(time);
            intervalImg();
            time =setInterval(intervalImg,5000);
      })

//轮播图
      function intervalImg(){
            if(nexImg<imgLength-1){
                  nexImg++;
            }else{
                  nexImg=0;
            }
            //将当前图片试用绝对定位,下一张图片试用相对定位
            $(".c-banner .banner ul img").eq(nexImg-1).css("position","absolute");
            $(".c-banner .banner ul img").eq(nexImg).css("position","relative");

            $(".c-banner .banner ul li").eq(nexImg).css("display","block");
            $(".c-banner .banner ul li").eq(nexImg).stop().animate({"opacity":1},1000);
            $(".c-banner .banner ul li").eq(nexImg-1).stop().animate({"opacity":0},1000,function(){
                  $(".c-banner .banner ul li").eq(nexImg-1).css("display","none");
            });
            if(nexImg==8){

                  $(".c-banner .banner ul li").eq(0).stop().animate({"opacity":0},1000,function(){
                        $(".c-banner .banner ul li").eq(0).css("display","none");
                  });
            }
            $(".c-banner .jumpBtn ul li").css("background-color","white");
            $(".c-banner .jumpBtn ul li[jumpImg="+nexImg+"]").css("background-color","black");
      }

//轮播图底下按钮
//动态数据加载的试用应放在请求成功后执行该代码,否则按钮无法使用
      $(".c-banner .jumpBtn ul li").each(function(){
            //为每个按钮定义点击事件
            $(this).click(function(){
                  clearInterval(time);
                  $(".c-banner .jumpBtn ul li").css("background-color","white");
                  var jumpImg = $(this).attr("jumpImg");
                  if(jumpImg!=nexImg){
                        var after =$(".c-banner .banner ul li").eq(jumpImg);
                        var befor =$(".c-banner .banner ul li").eq(nexImg);

                        //将当前图片试用绝对定位,下一张图片试用相对定位
                        $(".c-banner .banner ul img").eq(nexImg).css("position","absolute");
                        $(".c-banner .banner ul img").eq(jumpImg).css("position","relative");

                        after.css("display","block");
                        after.stop().animate({"opacity":1},1000);
                        befor.stop().animate({"opacity":0},1000,function(){
                              befor.css("display","none");
                        });
                        nexImg=jumpImg;
                  }
                  $(this).css("background-color","black");
                  time =setInterval(intervalImg,5000);
            });
      });
}
//翻牌效果
var Countdown = function () {
      _(this).bindAll('update', 'executeAnimation', 'finishAnimation');
      this.setVars.apply(this, arguments);
      this.update();
};
Countdown.prototype = {
      duration: 1000,
      setVars: function (time, el, template) {
            this.max = time;
            this.time = time;
            this.el = el;
            this.template = _(template.innerHTML).template();
            this.delta = -1;
      },
      update: function () {
            this.checkTime();
            this.setupAnimation();
            // var execute=setTimeout(this.executeAnimation(),20)
            // var finish=setTimeout(this.finishAnimation(),1000)
            // console.log(_(this.executeAnimation))
            // console.log(this.executeAnimation)
            this.executeAnimation();
            this.finishAnimation();
      },
      checkTime: function () {
            this.delta = 1;
            this.delta === 1 ? this.toggleDirection('up', 'down') : this.toggleDirection('down', 'up');
            // this.nextTime = this.time + this.delta;
      },
      toggleDirection: function (add, remove) {
            for(var i=0;i<this.el.firstElementChild.children.length;i++){
                  this.el.firstElementChild.children[i].classList.add(add);
                  this.el.firstElementChild.children[i].classList.remove(remove);
            }
      },
      setupAnimation: function () {
            for(var i=0;i<this.el.firstElementChild.children.length;i++){
                  this.el.firstElementChild.children[i].classList.remove('changed');
            }
      },
      executeAnimation: function () {
            for(var i=0;i<this.el.firstElementChild.children.length;i++){
                  this.el.firstElementChild.children[i].classList.add('changing');
            }
      },
      finishAnimation: function () {
            for(var i=0;i<this.el.firstElementChild.children.length;i++){
                  this.el.firstElementChild.children[i].classList.add('changed');
                  this.el.firstElementChild.children[i].classList.remove('changing');
            }
      }
};
$(function () {
      // 翻牌效果
      // new Countdown(12, document.querySelector('#count'), document.querySelector('.count-template'));

      buildPieData2();
      $("#pikame2").PikaChoose({carousel:true, carouselVertical:true});
      $('.left_content_box').show(200);

      $('.items_lis li').on({
                  'click':function(){
                  $('.items_lis .active').removeClass('active');
                  $(this).find('.item_text').addClass('active');
                  $('.dz_center_content_box>div').hide(500);
                  $('.dz_center_content_box>div').eq($(this).index()).show(500);
                        if($(this).index()==3){
                              $('.dz_historical_left_box>div').addClass('fadeInLeft');
                              $('.dz_historical_right_box>div').addClass('fadeInRight');
                        }else{
                              $('.dz_historical_left_box>div').removeClass('fadeInLeft');
                              $('.dz_historical_right_box>div').removeClass('fadeInRight');
                        }
            }
      })
      //文字滚动
      startmarquee(30, 20, 1000);
      //
      lunbo();
      $('#featured-area ul').roundabout({
            autoplay: true,
            autoplayDuration:6000,
            easing: 'easeOutInCirc',
            duration: 600,
            enableDrag: true
      });
});
