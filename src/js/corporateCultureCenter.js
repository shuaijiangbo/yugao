//在pathmap.json 里面配置了commons.css的alias别名 commonCss
var $ = require("jquery");
var _=require('_')
import URL from '@/api/serviceAPI.config.js'
require('commonCss');
require('../css/corporateCultureCenter.scss');
require("@/js/lib/jquery.jcarousel.min");  //左侧轮播
require("@/js/lib/jquery.pikachoose");  //左侧轮播
require("@/css/lib/jq22.css");  //左侧轮播

require("@/css/lib/planting.css");  //中间轮播
require("@/css/lib/index.css");  //中间轮播
require('@/js/lib/jquery.easing.1.3.js');//轮播
require('@/js/lib/jquery.roundabout.min.js');//轮播

require('@/components/header/header.js')//引入header组件
require('@/components/footer/footer.js')//引入footer组件

$(function () {
    //canvas是对状态进行绘制，就是先定义所有的绘制状态，在进行函数绘制动作。
   /* var canvas = document.getElementById('canvasMap');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

    }*/
    $("#pikame").PikaChoose({carousel:true, carouselVertical:true});

      $('#featured-area2 ul').roundabout({
            minScale: 0.4,						// 最小缩放值
            maxScale: 1.0,
            autoplay: true,
            autoplayDuration: 4000,
            easing: 'easeOutInCirc',
            duration: 600,
            enableDrag: true
      });

   $('.left_content_box').show(200);

   $('.items_lis li').on({
       'click':function(){
           $('.items_lis .active').removeClass('active');
           $(this).find('.item_text').addClass('active');
           $('.center_content_container>div').hide(500);
           $('.center_content_container>div').eq($(this).index()).show(500);
       }
   })
});
