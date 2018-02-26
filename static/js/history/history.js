
$(document).ready(function(){
	$.ajax({
		type:'get',
		url:'http://wx.hongyancloud.com/wxDev/file/getBillAndDetails',
		data : {
			openId : 'oZIooxJ_MT0M1ApB_4caa_gvXgWc',//$.getCookie('open_id')
		},
		success:function(data){
			if (data.code == "00000") {
				var address = $('#address');
				$(data.data).each(function(i,o){
					address.append("<li>"+o.address+"</li>");
				});
			}else{
				weui.topTips(data.msg);
			}
		},
		error:function(data){
			weui.topTips('网络异常,请检查您的网络');
		}
	});
});