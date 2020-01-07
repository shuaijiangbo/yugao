//在pathmap.json 里面配置了commons.css的alias别名 commonCss
var $ = require("jquery");
var _=require('_')
import URL from '@/api/serviceAPI.config.js'
require('commonCss');
require('../css/index.scss');
require('@/components/header/header.js')//引入header组件
require('@/components/header/header.js')//引入header组件
require('@/components/wave/wave.js')//引入wave组件
require('@/components/popBox/popBox.js')//引入wave组件


/*$(function () {
    //canvas是对状态进行绘制，就是先定义所有的绘制状态，在进行函数绘制动作。
    var canvas = document.getElementById('canvasMap');
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;


//[35,28] 公园广场
//[10.32,79] 修筑道路
//[9.52,50] 水电管网
//[28.5,71] 投资总额
//[80,55] 企业性质国有控股
//[86,90] 工程管理经验
    var linePoints=[
        [
            [35,28],[10.32,79],[9.52,50]
        ],
        [
            [35,28],[28.5,71],[10.32,79]
        ],
        [
            [35,28],[9.52,50]
        ],
        [
            [35,28],[61,90]
        ],[
            [61,90],[9.52,50]
        ],[
            [65,20],[61,90]
        ],[
            [65,20],[80.4,55]
        ],[
            [65,20],[86,90]
        ],[
            [80,55],[28.5,71]
        ],
    ];
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        drawLine(ctx,linePoints,1,'#34b9c8',true);
    }
});*/

//画线
function drawLine(canvas,linePoints,lineWidth,lineColor,percent){
    canvas.beginPath();//开始画线
    for(let i in linePoints){
        let singleLine=linePoints[i];
        for(let j in singleLine){
            let singlePoint=percent?disposePercent(singleLine[j]):singleLine[j];
            if(j==0)canvas.moveTo(singlePoint[0],singlePoint[1]);//起始点
            else canvas.lineTo(singlePoint[0],singlePoint[1]);//
        }
    }
    canvas.lineWidth=lineWidth;
    canvas.strokeStyle=lineColor;
    canvas.stroke();
}


//将点处理百分数
function disposePercent(pointObj){
    let point=new Array;
    let _pointX=window.innerWidth*pointObj[0]/100
    let _pointY=window.innerHeight*pointObj[1]/100

    point[0]=_pointX;
    point[1]=_pointY;
    return point;
}
$('.unit').on({
    "click":function(){
        $('.pop_box>div').hide(500);
        pop.step=0;
        var id='#'+$(this).attr('data-name')
          if(id=='#stateOwned'){
                $('#popBoxContainer').addClass('dz_big_dialog_box');
          }else{
                $('#popBoxContainer').removeClass('dz_big_dialog_box');
          }
        $(id).show(500).find('.introduce_text_box').css('top',0);
        $('#popBoxContainer').removeClass('pop_in_animate').addClass('pop_out_animate');
        $('#popBoxContainer .dz_dialog_box').addClass('dz_animated');
        $('#centerContainer').css('opacity','0');
        $('#centerBox').css('opacity','0');
        command.show_park();
    }
})
$('#popBoxContainer').on({
    "click":function(){
        $('#popBoxContainer').removeClass('pop_out_animate').addClass('pop_in_animate');
        $('#centerContainer').css('opacity','1');
        $('#centerBox').css('opacity','1');
        $('#popBoxContainer .dz_dialog_box').removeClass('dz_animated');
    }
})



