/**
 *	create by GQ
 *	2018.01.24 13:23
 */
var wx = new Object();
wx.getOpenIdUrl = 'http://wx.hongyancloud.com/wxDev/getOpenId';
wx.getTzOpenIdUrl = 'http://wx.hongyancloud.com/wxDev/getTzOpenId';
wx.removeCookieOpenId = 'http://wx.hongyancloud.com/wxDev/removeCookieOpenId';
wx.desUrl = 'http://h5.charge.zone.hongyancloud.com/WeiXin/OAuth/Callback?code=';
wx.appId = 'wx203cc78ceb539356';
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