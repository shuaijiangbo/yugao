require('./popBox.scss')


pop={
    step:0
}
setInterval(()=>{
    pop.step++;
    let distance=-0.7*pop.step+'rem';
    $('.introduce_text_box:not(:hidden)').animate({
        top:distance
    },1500,'linear',function(){
         if(pop.step==4){
            $('.introduce_text_box:not(:hidden)').css('top',0);
             pop.step=0;
        }
    });
},6000)
