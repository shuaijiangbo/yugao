//在pathmap.json 里面配置了commons.css的alias别名 commonCss
var $ = require("jquery");
var _=require('_');
import URL from '@/api/serviceAPI.config.js';
require('commonCss');
require('../css/lib/style.css');        //3d字体
require('../css/newIndex.scss');
require('../js/index.js');
require('../iconfont/text.css');
require('../js/corporateCultureCenter.js');
require('../js/progressManageCenter.js');
require('../js/projectManageCenter.js');
require('../js/projectManageDetail.js');
require('../js/projectManageDetailNew.js');
require('../js/efficacyMonitor.js');
require('../js/parkBuildingCenter.js');
require('../js/distributionSchedulingCenter.js');
require('@/components/header/header.js')//引入header组件
require('@/components/footer/footer.js')//引入header组件
require('@/components/wave/wave.js')//引入wave组件
require('@/components/canvasLine/canvasLine.js')//引入wave组件
require('@/components/BoxGeometry/BoxGeometry.js')//BoxGeometry

let lunTimer=null;
$(function() {
    $('#contentBox>div:not(:first)').hide().css('visibility','visible');
    $('#headerTop li').on({
        'click':function(){
            $('#contentBox>div').eq(0).css({'opacity':'0'});
            $("#contentBox>div:not(:first)").hide(200);

            $('#contentBox>div').eq($(this).index()).show(200);
            $('#headerTop li').find('img').hide();
            $('#headerTop li').eq($(this).index()).find('img').show();

            if($(this).index()==2){
                $('.single_base_box').addClass('moveIn');
                $('.down_arrows_box').addClass('showIn');
            }

                /********轮播领导人*********/
            /*if($(this).index()==1){
                clearInterval(lunTimer);
                $('#memberItems').css('left',0);
                let memberRun={
                    step:0,
                    duration:6
                }
                lunTimer=setInterval(()=>{
                    /!*if(memberRun.step==0)*!/
                    memberRun.step++;
                    let distance=-0.384*memberRun.step+'rem';
                    $('#memberItems').animate({
                        left:distance
                    },1500,'linear',function(){
                        if(memberRun.step==6){
                            $('#memberItems').css('left',0);
                            memberRun.step=0;
                        }
                    });
                },10000)
            }*/
        }
    })
        /*$('#indexLink').on({
        'click':function(){
            console.log(222)
            $('#contentBox>div').hide(200);
            $('#contentBox>div').eq(1).show(200);
        }
    })*/
    $('body').show();
})

let gchRun={
    step:0
}

setInterval(()=>{
    $('#stateOwned ul li').fadeOut(500).eq(gchRun.step++).fadeIn(500);
    if(gchRun.step==9){
        gchRun.step=0;
    }
},10000)


$('#headerTop').on({
    'click':function(e){
        if($(e.target).hasClass('banner_box')){
            $('#contentBox>div:not(:first)').hide(200);
            $('#contentBox>div').eq(0).css({'opacity':'1'});
        }
    }
})


