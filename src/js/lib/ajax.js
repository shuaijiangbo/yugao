$.ajaxSetup({
    contentType:"application/x-www-form-urlencoded;charset=utf-8",
    complete:function(XMLHttpRequest,textStatus){
    },
    statusCode: {
        401: function() {
            console.log(window.location.href);
            if(/\index.html/.test(window.location.href)) {
                window.top.location.href="html/loginBackEnd.html";
            }
            else window.top.location.href="../loginBackEnd.html";
        },
        504: function() {
            alert('数据获取/输入失败，服务器没有响应。504');
        },
        500: function() {
            alert('服务器有误。500');
        }
    }
});