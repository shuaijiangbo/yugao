let BASEURL="../../"
let REALBASEURL="http://222.180.168.215:9104";

if(DEVELEPMENT){    //开发
    BASEURL = 'http://192.168.3.222:8080'
/*   BASEURL = '../../'*/
}else{
    BASEURL = '../../'
}
const URL={
    testhttp:BASEURL+'/api/main?string=sdsadad',

    /*项目管控中心详情-old*/
    fetchEnv24Hours:BASEURL+'/api/fetchEnv24Hours',     //环境数据监测
    fetchPicComplete:BASEURL+'/api/fetchPicComplete',     //获取项目效果图
    projectInfo:BASEURL+'/api/projectInfo',     //项目人员塔吊

    /*项目管控中心-old*/
    getZhaoBiaoGuanLiGroupByDept:BASEURL+'/api/getZhaoBiaoGuanLiGroupByDept',     //招标投标

    /*进度管控中心*/
    getTouZiGuanLi:BASEURL+'/api/getTouZiGuanLi',     //项目投资管理
    getJinDuGuanKong:BASEURL+'/api/getJinDuGuanKong',     //项目进度管理
    getJieSuanShuJu:BASEURL+'/api/getJieSuanShuJu',    //合同管理


    /*项目管控中心-RealData*/
    getProjInvestMgmt: REALBASEURL+'/learun/adms/yugao/totalInvestmentByDept',   //项目投资管理
    getTendersMgmt: REALBASEURL+'/learun/adms/yugao/ZTBCountByZhaoBiaoType',   //招投标管理
    getContractMgmt: REALBASEURL+'/learun/adms/yugao/ContractCountByHtStatus',   //合同管理
    getSettleData: REALBASEURL+'/learun/adms/yugao/ContractPaySumByxmType',    //结算数据
    getTotalDisks: REALBASEURL+'/learun/adms/yugao/YinHuanCountByStatus',    //累计隐患
    getDiskDealing: REALBASEURL+'/learun/adms/yugao/YinHuanCountByDate',    //隐患处理情况
    getDiskByType: REALBASEURL+'/learun/adms/yugao/YinHuanCountByFirType',     //当年各类型隐患情况
    getDiskByContent: REALBASEURL+'/learun/adms/yugao/YinHuanCountByContent',     //隐患条目发生频次
}

module.exports = URL;
