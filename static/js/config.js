
var ENV = 'PROD'; // TEST 测试  PROD 正式

// 系统配置
var config = (function(){
    var PARAM = {
        TEST:{
            url:'http://wxdev.hongyancloud.com/',
            appId:'wx203cc78ceb539356'
        },
        PROD:{
            url:'http://wx.hongyancloud.com/',
            appId:'wx80edbe54ff1cd668'
        }
    };
    return {
        PARAM:PARAM[ENV]
    }
})();

// 合成api
function genAPI(apiName,apiAction){
    return config.PARAM.url + apiName;
}

function getAppId() {
    return config.PARAM.appId;
}

/*
$.ajax({
    url:genAPI('getData'),
    success:function(){

    }
});
*/
