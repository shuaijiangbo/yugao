var data = require('@/data/data.js');
var inc = function(name, sendData){
    var newData= {
        list:[
            {
                name:'首页',
                url:'index.html'
            },{
                name:'企业文化中心',
                url:'corporateCultureCenter.html'
            },{
                name:'项目进度管控',
                url:'progressManageCenter.html'
            },
        ],
        index:sendData
    };
return require('@/components/' + name + '.ejs')({data:newData});
};
module.exports=inc
