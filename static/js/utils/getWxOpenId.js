/**
 *	create by GQ
 *	2018.01.24 13:06
 */
$(function(){
	var openId = $.getCookie('open_id');
	var getOpenIdUrl = wxreq.getOpenIdUrl;
	var toUrl = window.location.href;
	if ($.isNull(openId)) {
		getOpenIdUrl += '?toUrl='+encodeURIComponent(toUrl);
		var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wxreq.appId+'&redirect_uri=' + encodeURIComponent(getOpenIdUrl) + '&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect';
		window.location.href = url;
	}//else{
		//window.location.href = wx.removeCookieOpenId;
	//}
});