$(function(){
	var openId = $.getCookie('tzOpenId');
	var getTzOpenIdUrl = wx.getTzOpenIdUrl;
	var toUrl = window.location.href;
	if ($.isNull(openId)) {
		getTzOpenIdUrl += '?toUrl='+encodeURIComponent(toUrl);
		var url =   'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wx.appId+'&redirect_uri=' + encodeURIComponent(getTzOpenIdUrl) +' &response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
		window.location.href = url;
	}else{
		window.location.href = wx.desUrl;
	}
});