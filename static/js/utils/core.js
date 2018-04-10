/**
 *	create by GQ
 *	2018.01.24 13:23
 */
var req = new Object();
req.getOpenIdUrl = genAPI('wxDev/getOpenId');
req.getTzOpenIdUrl = genAPI('wxDev/getTzOpenId');
req.removeCookieOpenId = genAPI('wxDev/removeCookieOpenId');
req.desUrl = 'http://h5.charge.zone.hongyancloud.com/WeiXin/OAuth/Callback?code=';
req.appId = getAppId();
(function($){
	//获取指定名称的cookie的值
	$.getCookie = function(objname){
		var arr,reg = new RegExp("(^| )"+objname+"=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return arr[2];
		else
			return null;
	},
	$.isNull = function(str) {
		if (str == undefined || str == null || str == "undefined" || str == "null" || str == "") {
			return true;
		}else{
			return false;
		}
	}
})($);