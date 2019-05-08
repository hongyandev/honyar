function validateAll() {
	if($("#fwm").val().length != 20) {
		weui.topTips('请输入20位防伪码！');
		$("#fwm").focus();
		return false;
	}
}


jQuery(document).ready(function(){
    //这个是调用微信的jssdk将需要用到的功能进行注入
    weixin.config({
        debug: false,
        jsApiList: ['hideOptionMenu','scanQRCode']
    });
    weixin.ready(function () {
        weixin.hideOptionMenu();
        document.querySelector('#scanQRCode').onclick = function () {
            weixin.scanQRCode(function(res){
                var loading = weui.loading('loading', {
                    className: 'custom-classname'
                });
                jQuery("#fwm").val(res.resultStr);
                submitAntiCode(loading);
            });
        }
    });
    weixin.error(function (res) {
        weui.topTips(res.errMsg, 3000);
    });
});
function submitReset() {
    $("#fwm").val("");
}
//提交
function submitAntiCode(loading) {
    var validResult = validateAll();
    if(validResult == false)
        return;

    var loading = loading ||  weui.loading('loading', {
        className: 'custom-classname'
    });


    var fwm = $("#fwm").val();
    var gs = $("input[name='tmlb']:checked").val();

    $.ajax({
        type: "post",
        url: "https://wxdev.hongyancloud.com/hy/unauth/getQCQuery",
        data: {
            gs: gs, // 1: 鸿雁, 2: 南京鸿雁
            fwtm: fwm
        },
        /*dataType:"json",
        contentType: 'application/json',*/
        success: function(res) {
            if(res.code=='200'){
                loading.hide();
               // console.info(res.data);
                var queryData = JSON.parse(res.data);
                    var queryCount = queryData.data.queryCount;
                    var queryResult = queryData.data.queryResult;

                    var infoFalse = queryResult;
                    var infoTure = queryResult + ", 已被查询" + queryCount + "次！"

                    if(queryCount == 0) {
                        weui.topTips(infoFalse,6000);
                    } else {
                       /* $.alert(infoTure, "查询成功", function() {
                            $("#fwm").val("");
                        });*/
                        weui.toast(infoTure, {
                            duration: 3000,
                            className: 'custom-classname',
                            callback: function() {
                                $("#fwm").val("");
                            }
                        });
                    }
            }


        },
        error: function(data) {
            weui.topTips('访问出错！');
        }
    });
}