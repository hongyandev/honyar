$(function(){
	var code = $.getCookie('grant_code');
	var state = $.getCookie('code_state');
	var getTzOpenIdUrl = wx.getTzOpenIdUrl;
	var toUrl = window.location.href;
	if ($.isNull(state)) {
		getTzOpenIdUrl += '?toUrl='+encodeURIComponent(toUrl);
		var url =   'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wx.appId+'&redirect_uri=' + encodeURIComponent(getTzOpenIdUrl) +' &response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
		window.location.href = url;
	}else{
		var url = wx.desUrl + code + "&state = " + state;
		window.location.href = wx.desUrl+code+"&state="+state;
	}
});