require('./canvasLine.scss');
var lineCanvas = document.getElementById("canvasDrawLineBox");
var ctx = lineCanvas.getContext("2d");
var linePoints = [
    {x:55,y:48},
    {x:80,y:70},
    {x:105,y:20},
    {x:135,y:80},
    {x:165,y:30},
    {x:200,y:75},
    {x:240,y:40},
    {x:260,y:85},
    {x:290,y:32},
    {x:310,y:76},
    {x:328,y:22},
    {x:360,y:83},
    /*  {x:600,y:400},
      {x:300,y:600},*/
];

var _show=false;
function go() {
    if (linePoints.length>1)
        line(linePoints[0],linePoints[1]);
}
function go1() {
    console.log(333333333333333333333333333333333);
    _show=!_show;
    if (linePoints.length>1)
        line(linePoints[0],linePoints[1]);
}

function line(p1,p2) {
    var vx = p2.x-p1.x, vy = p2.y-p1.y;
    var size = Math.max(Math.abs(vx),Math.abs(vy));
    vx /= size;
    vy /= size;
    var x = p1.x, y = p1.y;
    function run() {
        ctx.beginPath();
        ctx.moveTo(x,y);
        x += vx;
        y += vy;
        ctx.lineTo(x,y);
        ctx.strokeStyle=_show?'rgba(255,251,.3)':'rgba(253,126,2,.3)';
        ctx.stroke();
        if (--size>0) {
            setTimeout(run, 3);
        } else {
            linePoints.shift();
            go();
        }
    }
    run();
}
go1();
setInterval(function(){
    linePoints=[
        {x:55,y:48},
        {x:80,y:70},
        {x:105,y:20},
        {x:135,y:80},
        {x:165,y:30},
        {x:200,y:75},
        {x:240,y:40},
        {x:260,y:85},
        {x:290,y:32},
        {x:310,y:76},
        {x:328,y:22},
        {x:360,y:83},
    ];
    go1();
},30000)