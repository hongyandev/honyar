$(document).ready(function() {
	$('#scanIcon').click(function() {
		wx.scanQRCode({
			needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			success: function(res) {
				var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			}
		});
		alert('a');
	});
});

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
                $.ajax({
                    type: "get",
                    url:genAPI('wxDev/verificate/uidAuthority?uid='+res.resultStr),
                    //url: "	http://wx.hongyancloud.com/wxDev/verificate/uidAuthority?uid="+res.resultStr,
                    dataType:"json",
                    success: function(data) {
                        loading.hide();
                        if(data.code == "00000") {
                            jQuery(".sCodeInput").val(res.resultStr);
                        }else {
                            weui.topTips(data.msg, 2000);
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        loading.hide();
                        weui.topTips('网络异常', 2000);
                    }
                });
            });
        }
    });
    weixin.error(function (res) {
        weui.topTips(res.errMsg, 3000);
    });
});

